import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { createSessionToken, setSessionCookie } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Identifiant et mot de passe requis.' },
        { status: 400 }
      )
    }

    // Find admin
    const admin = await prisma.admin.findUnique({
      where: { username: username.trim() },
    })

    if (!admin) {
      // Prevent timing attacks
      await bcrypt.compare('dummy', '$2a$12$dummy.hash.to.prevent.timing.attacks')
      return NextResponse.json(
        { error: 'Identifiants incorrects.' },
        { status: 401 }
      )
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, admin.passwordHash)
    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Identifiants incorrects.' },
        { status: 401 }
      )
    }

    // Create session
    const token = await createSessionToken({
      adminId: admin.id,
      username: admin.username,
    })

    await setSessionCookie(token)

    // Track page view
    await prisma.pageView.create({ data: { page: '/admin/login' } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Erreur serveur. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}
