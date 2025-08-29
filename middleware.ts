// middleware.ts
import { auth } from '@/lib/auth.server'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  // Define protected routes
  const isAdminRoute = nextUrl.pathname.startsWith('/admin')
  const isAuthRoute = nextUrl.pathname.startsWith('/auth')
  const isBlogRoute = nextUrl.pathname.startsWith('/blog')

  // Redirect logged-in users away from auth pages
  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(new URL('/', nextUrl))
  }

  // Protect admin routes
  if (isAdminRoute) {
    if (!isLoggedIn) {
      return Response.redirect(new URL('/auth/login', nextUrl))
    }
    
    // Check if user has admin role
    if (req.auth?.user?.role !== 'ADMIN') {
      return Response.redirect(new URL('/', nextUrl))
    }
  }

  // Protect blog routes
  if (isBlogRoute && !isLoggedIn) {
    return Response.redirect(new URL('/auth/login', nextUrl))
  }

  return null
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}