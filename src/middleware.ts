import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COMING_SOON = process.env.COMING_SOON === 'true'

export function middleware(request: NextRequest) {
  if (!COMING_SOON) return NextResponse.next()

  const { pathname } = request.nextUrl

  // Allow the coming-soon page itself through
  if (pathname === '/coming-soon') return NextResponse.next()

  return NextResponse.redirect(new URL('/coming-soon', request.url))
}

export const config = {
  matcher: ['/((?!_next|favicon|.*\\.png|.*\\.jpg|.*\\.svg|.*\\.ico|.*\\.mp4).*)'],
}
