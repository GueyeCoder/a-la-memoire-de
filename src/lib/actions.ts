'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from './prisma'
import { requireAdmin } from './auth'

// ─── Candle Actions ───────────────────────────────────────────────────────────

export async function lightCandle(formData: FormData) {
  const name = (formData.get('name') as string)?.trim() || 'Anonyme'
  const city = (formData.get('city') as string)?.trim() || null
  const message = (formData.get('message') as string)?.trim() || null

  if (!name) {
    return { error: 'Le nom est requis.' }
  }

  try {
    await prisma.candle.create({
      data: {
        name,
        city: city || undefined,
        message: message || undefined,
      },
    })

    // Track page view
    await prisma.pageView.create({ data: { page: '/allumer' } })

    revalidatePath('/bougies')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Error lighting candle:', error)
    return { error: 'Une erreur est survenue. Veuillez réessayer.' }
  }
}

export async function submitTribute(formData: FormData) {
  const name = (formData.get('name') as string)?.trim()
  const relation = (formData.get('relation') as string)?.trim()
  const message = (formData.get('message') as string)?.trim()

  if (!name || !relation || !message) {
    return { error: 'Tous les champs sont requis.' }
  }

  if (message.length > 2000) {
    return { error: 'Le message ne doit pas dépasser 2000 caractères.' }
  }

  try {
    await prisma.tribute.create({
      data: {
        name,
        relation,
        message,
        status: 'PENDING',
      },
    })

    revalidatePath('/temoignages')
    return { success: true }
  } catch (error) {
    console.error('Error submitting tribute:', error)
    return { error: 'Une erreur est survenue. Veuillez réessayer.' }
  }
}

// ─── Public Data Fetchers ─────────────────────────────────────────────────────

export async function getCandles(search?: string) {
  return prisma.candle.findMany({
    where: search
      ? {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        }
      : undefined,
    orderBy: { createdAt: 'desc' },
  })
}

export async function getCandleCount() {
  return prisma.candle.count()
}

export async function getApprovedTributes() {
  return prisma.tribute.findMany({
    where: { status: 'APPROVED' },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getGalleryImages() {
  return prisma.galleryImage.findMany({
    orderBy: { order: 'asc' },
  })
}

export async function getFuneralInfo() {
  return prisma.funeralInfo.findFirst({
    orderBy: { updatedAt: 'desc' },
  })
}

export async function trackPageView(page: string) {
  try {
    await prisma.pageView.create({ data: { page } })
  } catch {
    // Silently fail - don't break page for analytics
  }
}

// ─── Admin Actions ────────────────────────────────────────────────────────────

export async function approveTribute(id: string) {
  await requireAdmin()
  await prisma.tribute.update({
    where: { id },
    data: { status: 'APPROVED' },
  })
  revalidatePath('/temoignages')
  revalidatePath('/admin/dashboard')
}

export async function rejectTribute(id: string) {
  await requireAdmin()
  await prisma.tribute.update({
    where: { id },
    data: { status: 'REJECTED' },
  })
  revalidatePath('/admin/dashboard')
}

export async function deleteTribute(id: string) {
  await requireAdmin()
  await prisma.tribute.delete({ where: { id } })
  revalidatePath('/temoignages')
  revalidatePath('/admin/dashboard')
}

export async function deleteCandle(id: string) {
  await requireAdmin()
  await prisma.candle.delete({ where: { id } })
  revalidatePath('/bougies')
  revalidatePath('/')
  revalidatePath('/admin/dashboard')
}

export async function updateFuneralInfo(formData: FormData) {
  await requireAdmin()

  const date = (formData.get('date') as string)?.trim()
  const time = (formData.get('time') as string)?.trim()
  const venue = (formData.get('venue') as string)?.trim()
  const address = (formData.get('address') as string)?.trim()
  const mapsUrl = (formData.get('mapsUrl') as string)?.trim() || null
  const program = (formData.get('program') as string)?.trim() || null

  if (!date || !time || !venue || !address) {
    return { error: 'Les champs date, heure, lieu et adresse sont requis.' }
  }

  try {
    const existing = await prisma.funeralInfo.findFirst()
    if (existing) {
      await prisma.funeralInfo.update({
        where: { id: existing.id },
        data: { date, time, venue, address, mapsUrl, program },
      })
    } else {
      await prisma.funeralInfo.create({
        data: { date, time, venue, address, mapsUrl: mapsUrl || undefined, program: program || undefined },
      })
    }

    revalidatePath('/obseques')
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (error) {
    console.error('Error updating funeral info:', error)
    return { error: 'Une erreur est survenue.' }
  }
}

export async function addGalleryImage(formData: FormData) {
  await requireAdmin()

  const url = (formData.get('url') as string)?.trim()
  const caption = (formData.get('caption') as string)?.trim() || null
  const orderStr = formData.get('order') as string
  const order = orderStr ? parseInt(orderStr, 10) : 0

  if (!url) {
    return { error: "L'URL de l'image est requise." }
  }

  try {
    await prisma.galleryImage.create({
      data: { url, caption: caption || undefined, order },
    })
    revalidatePath('/galerie')
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (error) {
    console.error('Error adding gallery image:', error)
    return { error: 'Une erreur est survenue.' }
  }
}

export async function deleteGalleryImage(id: string) {
  await requireAdmin()
  await prisma.galleryImage.delete({ where: { id } })
  revalidatePath('/galerie')
  revalidatePath('/admin/dashboard')
}

export async function getAdminStats() {
  await requireAdmin()

  const [candleCount, pendingTributes, approvedTributes, totalViews] = await Promise.all([
    prisma.candle.count(),
    prisma.tribute.count({ where: { status: 'PENDING' } }),
    prisma.tribute.count({ where: { status: 'APPROVED' } }),
    prisma.pageView.count(),
  ])

  return {
    candleCount,
    pendingTributes,
    approvedTributes,
    totalViews,
  }
}

export async function getPendingTributes() {
  await requireAdmin()
  return prisma.tribute.findMany({
    where: { status: 'PENDING' },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getAllTributes() {
  await requireAdmin()
  return prisma.tribute.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export async function getAllCandles() {
  await requireAdmin()
  return prisma.candle.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export async function getAllGalleryImages() {
  await requireAdmin()
  return prisma.galleryImage.findMany({
    orderBy: { order: 'asc' },
  })
}
