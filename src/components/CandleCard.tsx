import CandleFlame from './CandleFlame'

interface CandleCardProps {
  name: string
  city?: string | null
  message?: string | null
  createdAt: Date
  index?: number
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export default function CandleCard({
  name,
  city,
  message,
  createdAt,
  index = 0,
}: CandleCardProps) {
  const delay = (index % 8) * 0.3

  return (
    <div
      className="memorial-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1.5rem 1rem',
        gap: '1rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        animation: `fade-in-up 0.6s ease forwards`,
        animationDelay: `${(index % 6) * 0.08}s`,
        opacity: 0,
      }}
    >
      {/* Ambient glow background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '120px',
          height: '80px',
          background: 'radial-gradient(ellipse, rgba(251,191,36,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Candle */}
      <CandleFlame size="sm" delay={delay} />

      {/* Info */}
      <div style={{ flex: 1, width: '100%' }}>
        <p
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1rem',
            color: 'var(--ivory)',
            marginBottom: '0.2rem',
            fontWeight: 500,
          }}
        >
          {name}
        </p>

        {city && (
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.7rem',
              color: 'var(--gold)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
              opacity: 0.8,
            }}
          >
            {city}
          </p>
        )}

        {message && (
          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
              marginBottom: '0.75rem',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            &ldquo;{message}&rdquo;
          </p>
        )}

        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.65rem',
            color: 'var(--text-secondary)',
            opacity: 0.5,
            letterSpacing: '0.05em',
          }}
        >
          {formatDate(createdAt)}
        </p>
      </div>
    </div>
  )
}
