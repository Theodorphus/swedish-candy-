'use client'

import { logout } from '@/app/login/actions'

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        style={{
          background: 'transparent',
          border: '0.5px solid var(--border)',
          color: 'var(--text-secondary)',
          padding: '8px 18px',
          borderRadius: 6,
          fontSize: 13,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        Sign out
      </button>
    </form>
  )
}
