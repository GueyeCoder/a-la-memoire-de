interface TributeCardProps {
  name: string
  relation: string
  message: string
  createdAt: Date
  index?: number
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export default function TributeCard({
  name,
  relation,
  message,
  createdAt,
  index = 0,
}: TributeCardProps) {
  return (
    <div
      className="memorial-card"
      style={{
        padding: '1.75rem',
        animation: `fade-in-up 0.6s ease forwards`,
        animationDelay: `${(index % 8) * 0.1}s`,
        opacity: 0,
      }}
    >
      {/* Quote mark */}
      <div
        style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '4rem',
          color: 'var(--gold)',
          opacity: 0.2,
          lineHeight: 0.8,
          marginBottom: '0.75rem',
          userSelect: 'none',
        }}
      >
        &ldquo;
      </div>

      {/* Message */}
      <p
        style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic',
          fontSize: '1.05rem',
          color: 'var(--ivory-dim)',
          lineHeight: 1.65,
          marginBottom: '1.25rem',
        }}
      >
        {message}
      </p>

      {/* Divider */}
      <div className="gold-divider mb-4" />

      {/* Author info */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1rem',
              color: 'var(--ivory)',
              fontWeight: 500,
              marginBottom: '0.2rem',
            }}
          >
            {name}
          </p>
          <span className="relation-badge">{relation}</span>
        </div>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.7rem',
            color: 'var(--text-secondary)',
            opacity: 0.6,
          }}
        >
          {formatDate(createdAt)}
        </p>
      </div>
    </div>
  )
}
