import { NextResponse } from 'next/server'

export async function middleware(request) {
  // Get the pathname from the URL
  const { pathname } = request.nextUrl

  // Only run this middleware for admin routes, excluding the login page
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // Check for any Supabase auth cookies
    const hasAuthCookie = request.cookies.has('sb-access-token') || 
                          request.cookies.has('sb-refresh-token') ||
                          request.cookies.has('supabase-auth-token')
    
    // Check if we're in development mode and allow bypass for testing
    const isDev = process.env.NODE_ENV === 'development'
    const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true'
    
    if (isDev && bypassAuth) {
      console.log('Development mode with auth bypass enabled - allowing access')
      return NextResponse.next()
    }
    
    if (!hasAuthCookie) {
      console.log('No auth cookie found, redirecting to login')
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }
  
  // For all other routes, continue
  return NextResponse.next()
}

// Configure the middleware to run only for admin routes
export const config = {
  matcher: ['/admin/:path*'],
}
