"use client"

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
  ChevronRight
} from 'lucide-react'
import { signOut } from '@/lib/supabase'

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = router.pathname

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleLogout = async () => {
    try {
      const { error } = await signOut()
      if (error) {
        console.error('Error logging out:', error)
        return
      }
      
      // Redirect to login page after successful logout
      router.push('/admin/login')
    } catch (err) {
      console.error('Unexpected error during logout:', err)
    }
  }

  const getBreadcrumbTitle = () => {
    switch (pathname) {
      case '/admin':
        return 'Dashboard'
      case '/admin/appointments':
        return 'Appointments'
      case '/admin/services':
        return 'Services'
      case '/admin/barbers':
        return 'Barbers'
      case '/admin/customers':
        return 'Customers'
      case '/admin/settings':
        return 'Settings'
      default:
        return 'Dashboard'
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden bg-primary text-white p-4 flex justify-between items-center">
        <Link href="/admin" className="font-bold text-xl">
          <span>Clipper<span className="text-secondary">Cuts</span> Admin</span>
        </Link>
        <button onClick={toggleSidebar} className="focus:outline-none">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex h-[calc(100vh-64px)] lg:h-screen">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-primary text-white transition-transform duration-300 ease-in-out lg:transition-none`}
        >
          <nav className="p-4 h-full flex flex-col">
            <div className="hidden lg:block mb-8">
              <Link href="/admin" className="font-bold text-xl">
                <span>Clipper<span className="text-secondary">Cuts</span> Admin</span>
              </Link>
            </div>

            <ul className="space-y-1 flex-1">
              <li>
                <Link
                  href="/admin"
                  className={`flex items-center p-2 rounded-md ${
                    pathname === '/admin' ? 'bg-primary-700' : 'hover:bg-primary-700'
                  } transition-colors`}
                >
                  <Home className="mr-3 h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/appointments"
                  className={`flex items-center p-2 rounded-md ${
                    pathname === '/admin/appointments' ? 'bg-primary-700' : 'hover:bg-primary-700'
                  } transition-colors`}
                >
                  <Calendar className="mr-3 h-5 w-5" />
                  <span>Appointments</span>
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
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto bg-gray-100">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {getBreadcrumbTitle()}
              </h1>
              <div className="flex items-center text-sm text-gray-500">
                <Link href="/admin" className="hover:text-primary">
                  Dashboard
                </Link>
                {pathname !== '/admin' && (
                  <>
                    <ChevronRight className="mx-2 h-4 w-4" />
                    <span className="capitalize">{getBreadcrumbTitle()}</span>
                  </>
                )}
              </div>
            </div>
            
            {/* Page Content */}
            <div className="bg-white shadow-sm rounded-lg p-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
