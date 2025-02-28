"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { 
  Calendar, 
  LayoutDashboard, 
  Users, 
  Settings, 
  Menu, 
  X, 
  LogOut,
  FileText,
  Star,
  Scissors,
  Home,
  User,
  ChevronRight,
  AlertTriangle
} from 'lucide-react'
import { signOut, getSession } from '@/lib/supabase'

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authError, setAuthError] = useState(null)
  const router = useRouter()
  const pathname = usePathname() || ''

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        console.log('Checking authentication...')
        
        // Check if we're in development mode with bypass enabled
        const isDev = process.env.NODE_ENV === 'development'
        const bypassAuth = process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true'
        
        if (isDev && bypassAuth) {
          console.log('Development mode with auth bypass enabled - allowing access')
          setIsAuthenticated(true)
          setIsLoading(false)
          return
        }
        
        // Check if Supabase credentials are available
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          console.error('Supabase credentials are missing')
          setAuthError('Supabase credentials are missing. Please check your .env.local file.')
          setIsLoading(false)
          return
        }
        
        const { session, error } = await getSession()
        
        if (error) {
          console.error('Error getting session:', error)
          setAuthError(error.message || 'Error checking authentication')
          setIsLoading(false)
          router.push('/admin/login')
          return
        }
        
        if (!session) {
          console.log('No session found, redirecting to login')
          router.push('/admin/login')
          return
        }
        
        console.log('Session found, user is authenticated')
        setIsAuthenticated(true)
        setIsLoading(false)
      } catch (err) {
        console.error('Error checking authentication:', err)
        setAuthError(err.message || 'Unexpected error checking authentication')
        setIsLoading(false) // Set loading to false even on error
        router.push('/admin/login')
      }
    }
    
    // Add a timeout to prevent infinite loading
    const authTimeout = setTimeout(() => {
      if (isLoading) {
        console.log('Authentication check timed out')
        setAuthError('Authentication check timed out. Please try again.')
        setIsLoading(false)
        router.push('/admin/login')
      }
    }, 5000) // 5 seconds timeout
    
    checkAuth()
    
    return () => clearTimeout(authTimeout)
  }, [router, isLoading])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/admin/login')
    } catch (err) {
      console.error('Error signing out:', err)
      // Even if there's an error, redirect to login
      router.push('/admin/login')
    }
  }

  const getBreadcrumbTitle = () => {
    if (pathname === '/admin') return 'Dashboard'
    if (pathname === '/admin/bookings') return 'Bookings'
    if (pathname === '/admin/barbers') return 'Barbers'
    if (pathname === '/admin/services') return 'Services'
    if (pathname === '/admin/customers') return 'Customers'
    if (pathname === '/admin/settings') return 'Settings'
    if (pathname === '/admin/testimonials') return 'Testimonials'
    return 'Admin'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }
  
  if (authError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-center text-red-500 mb-4">
            <AlertTriangle size={48} />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Authentication Error</h2>
          <p className="text-gray-600 text-center mb-6">{authError}</p>
          <div className="flex flex-col space-y-4">
            <Link 
              href="/admin/login" 
              className="w-full py-2 px-4 bg-primary text-white rounded-md text-center hover:bg-primary-700 transition-colors"
            >
              Return to Login
            </Link>
            <Link 
              href="/" 
              className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-md text-center hover:bg-gray-300 transition-colors"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // If not authenticated and not loading, render the children anyway
  // The middleware will handle redirecting to login if needed

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="bg-primary text-white p-4 md:hidden flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Clipper<span className="text-secondary">Cuts</span> Admin
        </Link>
        <button onClick={toggleSidebar} className="p-2">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex h-screen">
        {/* Sidebar */}
        <div
          className={`bg-primary text-white w-64 flex-shrink-0 fixed inset-y-0 left-0 z-50 transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 transition-transform duration-300 ease-in-out`}
        >
          <div className="p-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <Link href="/admin" className="text-xl font-bold">
                Clipper<span className="text-secondary">Cuts</span> Admin
              </Link>
              <button onClick={toggleSidebar} className="p-1 md:hidden">
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/admin"
                    className={`flex items-center p-2 rounded-md ${
                      pathname === '/admin' ? 'bg-primary-700' : 'hover:bg-primary-700'
                    } transition-colors`}
                  >
                    <LayoutDashboard className="mr-3 h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/bookings"
                    className={`flex items-center p-2 rounded-md ${
                      pathname === '/admin/bookings' ? 'bg-primary-700' : 'hover:bg-primary-700'
                    } transition-colors`}
                  >
                    <Calendar className="mr-3 h-5 w-5" />
                    <span>Bookings</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/barbers"
                    className={`flex items-center p-2 rounded-md ${
                      pathname === '/admin/barbers' ? 'bg-primary-700' : 'hover:bg-primary-700'
                    } transition-colors`}
                  >
                    <Users className="mr-3 h-5 w-5" />
                    <span>Barbers</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/services"
                    className={`flex items-center p-2 rounded-md ${
                      pathname === '/admin/services' ? 'bg-primary-700' : 'hover:bg-primary-700'
                    } transition-colors`}
                  >
                    <Scissors className="mr-3 h-5 w-5" />
                    <span>Services</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/customers"
                    className={`flex items-center p-2 rounded-md ${
                      pathname === '/admin/customers' ? 'bg-primary-700' : 'hover:bg-primary-700'
                    } transition-colors`}
                  >
                    <User className="mr-3 h-5 w-5" />
                    <span>Customers</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/settings"
                    className={`flex items-center p-2 rounded-md ${
                      pathname === '/admin/settings' ? 'bg-primary-700' : 'hover:bg-primary-700'
                    } transition-colors`}
                  >
                    <Settings className="mr-3 h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/testimonials"
                    className={`flex items-center p-2 rounded-md ${
                      pathname === '/admin/testimonials' ? 'bg-primary-700' : 'hover:bg-primary-700'
                    } transition-colors`}
                  >
                    <FileText className="mr-3 h-5 w-5" />
                    <span>Testimonials</span>
                  </Link>
                </li>
              </ul>

              <div className="mt-8 pt-4 border-t border-primary-700">
                <button
                  onClick={handleLogout}
                  className="flex items-center p-2 w-full rounded-md hover:bg-primary-700 transition-colors"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </nav>

            <div className="mt-auto pt-4 border-t border-primary-700">
              <Link
                href="/"
                className="flex items-center p-2 rounded-md hover:bg-primary-700 transition-colors"
              >
                <Home className="mr-3 h-5 w-5" />
                <span>Back to Website</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 md:ml-64">
          {/* Breadcrumb */}
          <div className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-4">
                <div className="flex items-center">
                  <Link href="/admin" className="text-primary hover:text-primary-600">
                    Admin
                  </Link>
                  {pathname !== '/admin' && (
                    <>
                      <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
                      <span className="text-gray-700">{getBreadcrumbTitle()}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
