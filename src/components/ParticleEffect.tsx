'use client'

import { useEffect, useState } from 'react'

interface Particle {
  id: number
  left: number
  size: number
  duration: number
  delay: number
  drift: number
}

export default function ParticleEffect({ count = 12 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 4 + 5,
      delay: Math.random() * 8,
      drift: (Math.random() - 0.5) * 60,
    }))
    setParticles(generated)
  }, [count])

  return (
    <div className="particles-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={
            {
              left: `${p.left}%`,
              bottom: '10%',
              width: p.size,
              height: p.size,
              '--duration': `${p.duration}s`,
              '--delay': `${p.delay}s`,
              '--drift': `${p.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
