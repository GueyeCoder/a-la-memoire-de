interface PhotoPlaceholderProps {
  size?: number
  className?: string
}

export default function PhotoPlaceholder({ size = 280, className = '' }: PhotoPlaceholderProps) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: '2px solid var(--border-gold)',
        background: 'radial-gradient(circle at 35% 35%, #1a1a2e 0%, #0d0d1a 60%, #0a0a0f 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 0 40px rgba(201, 169, 110, 0.12), 0 0 80px rgba(201, 169, 110, 0.06)',
      }}
    >
      {/* Inner ring */}
      <div
        style={{
          position: 'absolute',
          inset: '8px',
          borderRadius: '50%',
          border: '1px solid rgba(201, 169, 110, 0.15)',
          pointerEvents: 'none',
        }}
      />

      {/* Initials */}
      <p
        style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: size * 0.22,
          color: 'var(--gold)',
          opacity: 0.7,
          fontWeight: 300,
          letterSpacing: '0.08em',
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        KA
      </p>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: size * 0.04,
          color: 'var(--text-secondary)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginTop: size * 0.03,
          opacity: 0.5,
        }}
      >
        Commissaire
      </p>

      {/* Subtle radial glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(201, 169, 110, 0.05) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
