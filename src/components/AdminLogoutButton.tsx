'use client'

export default function AdminLogoutButton() {
  return (
    <form action="/api/admin/logout" method="POST">
      <button
        type="submit"
        style={{
          background: 'none',
          border: '1px solid var(--border-subtle)',
          color: 'var(--text-secondary)',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.75rem',
          padding: '0.4rem 0.875rem',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'color 0.2s, border-color 0.2s',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget
          el.style.color = '#f87171'
          el.style.borderColor = 'rgba(239,68,68,0.3)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget
          el.style.color = 'var(--text-secondary)'
          el.style.borderColor = 'var(--border-subtle)'
        }}
      >
        Déconnexion
      </button>
    </form>
  )
}
