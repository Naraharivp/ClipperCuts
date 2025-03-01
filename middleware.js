import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Skip middleware for login and register pages
  if (
    pathname === '/admin/login' || 
    pathname.startsWith('/admin/register')
  ) {
    return NextResponse.next()
  }
  
  // For other admin routes, bypass authentication completely
  if (pathname.startsWith('/admin')) {
    console.log('Authentication bypass enabled - direct access to admin allowed')
    return NextResponse.next()
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
