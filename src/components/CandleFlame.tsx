'use client'

interface CandleFlameProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  delay?: number
}

const sizes = {
  sm: {
    wax: { width: 20, height: 30 },
    flame: { width: 10, height: 16 },
    inner: { width: 4, height: 8 },
    glow: { size: 30 },
  },
  md: {
    wax: { width: 28, height: 44 },
    flame: { width: 14, height: 22 },
    inner: { width: 6, height: 11 },
    glow: { size: 44 },
  },
  lg: {
    wax: { width: 36, height: 56 },
    flame: { width: 18, height: 28 },
    inner: { width: 8, height: 14 },
    glow: { size: 60 },
  },
  xl: {
    wax: { width: 48, height: 80 },
    flame: { width: 26, height: 42 },
    inner: { width: 12, height: 20 },
    glow: { size: 90 },
  },
}

export default function CandleFlame({ size = 'md', delay = 0 }: CandleFlameProps) {
  const s = sizes[size]
  const animDelay = `${delay}s`

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: s.wax.width,
      }}
    >
      {/* Flame glow (ambient light) */}
      <div
        style={{
          position: 'absolute',
          top: -s.glow.size / 3,
          left: '50%',
          transform: 'translateX(-50%)',
          width: s.glow.size,
          height: s.glow.size,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251,191,36,0.2) 0%, rgba(251,140,0,0.1) 40%, transparent 70%)',
          animation: `flicker-glow 2.5s ease-in-out infinite`,
          animationDelay: animDelay,
          pointerEvents: 'none',
        }}
      />

      {/* Flame outer */}
      <div
        style={{
          width: s.flame.width,
          height: s.flame.height,
          background: 'linear-gradient(to bottom, #fff9c4 0%, #fbbf24 30%, #f97316 65%, rgba(239,68,68,0.6) 100%)',
          borderRadius: `${s.flame.width / 2}px ${s.flame.width / 2}px ${s.flame.width * 0.3}px ${s.flame.width * 0.3}px`,
          animation: `flicker 2.5s ease-in-out infinite`,
          animationDelay: animDelay,
          transformOrigin: 'bottom center',
          position: 'relative',
          zIndex: 2,
          filter: 'blur(0.3px)',
        }}
      >
        {/* Flame inner */}
        <div
          style={{
            position: 'absolute',
            bottom: '15%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: s.inner.width,
            height: s.inner.height,
            background: 'linear-gradient(to bottom, white, #fef9c3)',
            borderRadius: `${s.inner.width / 2}px ${s.inner.width / 2}px ${s.inner.width * 0.2}px ${s.inner.width * 0.2}px`,
            opacity: 0.9,
          }}
        />
      </div>

      {/* Wick */}
      <div
        style={{
          width: 2,
          height: 4,
          background: '#292524',
          zIndex: 3,
          position: 'relative',
        }}
      />

      {/* Wax body */}
      <div
        style={{
          width: s.wax.width,
          height: s.wax.height,
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 30%, #d97706 70%, #92400e 100%)',
          borderRadius: `${s.wax.width * 0.1}px ${s.wax.width * 0.1}px ${s.wax.width * 0.15}px ${s.wax.width * 0.15}px`,
          position: 'relative',
          zIndex: 1,
          boxShadow: 'inset -3px 0 6px rgba(0,0,0,0.2)',
        }}
      >
        {/* Wax drip effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '20%',
            width: '25%',
            height: '30%',
            background: 'rgba(254, 243, 199, 0.4)',
            borderRadius: '0 0 50% 50%',
          }}
        />
      </div>

      {/* Base */}
      <div
        style={{
          width: s.wax.width * 1.3,
          height: 4,
          background: 'linear-gradient(135deg, #92400e, #78350f)',
          borderRadius: '2px',
        }}
      />
    </div>
  )
}
