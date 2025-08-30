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
  const isApiRoute = nextUrl.pathname.startsWith('/api')
  
  // Skip middleware for API routes and static files
  if (isApiRoute || nextUrl.pathname.includes('.')) {
    return NextResponse.next()
  }

  console.log('Middleware:', {
    pathname: nextUrl.pathname,
    isLoggedIn,
    userRole: req.auth?.user?.role
  })

  // Redirect logged-in users away from auth pages
  if (isLoggedIn && isAuthRoute) {
    console.log('Redirecting logged-in user from auth page')
    return NextResponse.redirect(new URL('/', nextUrl))
  }

  // Protect admin routes
  if (isAdminRoute) {
    if (!isLoggedIn) {
      console.log('Redirecting to login for admin route')
      return NextResponse.redirect(new URL('/auth/login', nextUrl))
    }
    
    // Check if user has admin role
    if (req.auth?.user?.role !== 'ADMIN') {
      console.log('Redirecting non-admin user')
      return NextResponse.redirect(new URL('/', nextUrl))
    }
  }

  // Protect blog routes (optional - remove if blog should be public)
  if (isBlogRoute && !isLoggedIn) {
    console.log('Redirecting to login for blog route')
    return NextResponse.redirect(new URL('/auth/login', nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}