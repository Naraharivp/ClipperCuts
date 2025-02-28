import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function middleware(request) {
  // Get the pathname from the URL
  const { pathname } = request.nextUrl

  // Only run this middleware for admin routes, excluding the login page
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // Get the auth token from the cookies
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    // Create a Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        detectSessionInUrl: false,
      }
    })

    // Get the auth cookie
    const authCookie = request.cookies.get('sb-auth-token')?.value
    
    if (!authCookie) {
      // No auth cookie, redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    
    try {
      // Set the auth cookie for the Supabase client
      supabase.auth.setSession({
        access_token: authCookie,
        refresh_token: request.cookies.get('sb-refresh-token')?.value || '',
      })
      
      // Get the user
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        // Invalid auth cookie or no user, redirect to login
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
      
      // User is authenticated, allow access
      return NextResponse.next()
    } catch (error) {
      console.error('Auth middleware error:', error)
      // Error occurred, redirect to login
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
