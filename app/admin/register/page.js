'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import { signUp, getSession } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log('Checking for existing session...')
        
        // Check if authentication is disabled
        if (process.env.NEXT_PUBLIC_DISABLE_AUTH === 'true') {
          console.log('Authentication is disabled - showing register form')
          setIsCheckingAuth(false)
          return
        }
        
        // Check for mock session in localStorage first (faster than Supabase check)
        if (typeof window !== 'undefined') {
          const mockSessionData = localStorage.getItem('mock_session');
          if (mockSessionData) {
            try {
              console.log('Mock session found, redirecting to admin dashboard')
              router.push('/admin')
              return
            } catch (err) {
              console.error('Error parsing mock session:', err);
              localStorage.removeItem('mock_session');
            }
          }
        }
        
        const { session, error } = await getSession()
        
        if (error) {
          console.error('Error checking session:', error)
          setIsCheckingAuth(false)
          return
        }
        
        if (session) {
          console.log('Session found, redirecting to admin dashboard')
          router.push('/admin')
        } else {
          console.log('No session found, showing register form')
          setIsCheckingAuth(false)
        }
      } catch (err) {
        console.error('Error checking session:', err)
        setIsCheckingAuth(false)
      }
    }
    
    checkSession()
  }, [router])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    console.log('Submitting registration form...')
    
    // Validate form
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required')
      return
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    
    setIsLoading(true)
    
    try {
      console.log('Registering with email:', email)
      
      // Register with Supabase
      const { data, error } = await signUp(email, password, {
        name,
        role: 'admin' // Default role for admin panel users
      })
      
      if (error) {
        console.error('Registration error:', error)
        setError(error.message || 'Failed to create account')
        setIsLoading(false)
        return
      }
      
      console.log('Registration response:', data)
      
      if (!data || !data.user) {
        console.error('No user returned from registration')
        setError('No user returned from registration')
        setIsLoading(false)
        return
      }
      
      // For test accounts, redirect directly to admin
      if (email === 'ryouma@gmail.com' || email === 'prasad@gmail.com') {
        console.log('Test account registered, redirecting to admin')
        router.push('/admin')
        return
      }
      
      // Check if email confirmation is required
      const emailConfirmationRequired = data.user && data.user.identities && data.user.identities.length === 0
      
      if (emailConfirmationRequired) {
        console.log('Email confirmation required, redirecting to confirmation page')
        setIsLoading(false)
        // Navigate to a confirmation page
        router.push('/admin/register/confirmation?email=' + encodeURIComponent(email))
        return
      }
      
      console.log('Registration successful, user:', data.user)
      
      // Store session data for this user
      if (typeof window !== 'undefined') {
        localStorage.setItem('registered_user', JSON.stringify({
          email: email,
          name: name,
          timestamp: new Date().toISOString()
        }))
      }
      
      // Wait a moment to ensure cookies are set
      setTimeout(() => {
        console.log('Redirecting to admin dashboard')
        router.push('/admin')
      }, 1000)
    } catch (err) {
      console.error('Unexpected registration error:', err)
      setError('An unexpected error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  // Clear all cookies function
  const clearAllCookies = () => {
    try {
      // Get all cookies
      const cookies = document.cookie.split(';');
      
      // Remove each cookie
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      }
      
      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('mock_session');
      }
      
      // Refresh page
      window.location.reload();
    } catch (err) {
      console.error('Error clearing cookies:', err);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800">Create Admin Account</h2>
              <p className="text-gray-600 mt-2">Register for ClipperCuts Admin Panel</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-500 text-sm rounded-md border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    placeholder="Full Name"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="pl-10 block w-full pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    className="pl-10 pr-10 block w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    className="pl-10 block w-full pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-6 flex items-center justify-center">
              <span className="text-gray-600 text-sm">Already have an account?</span>
              <Link
                href="/admin/login"
                className="ml-1 text-primary text-sm font-medium hover:text-primary-700"
              >
                Log in
              </Link>
            </div>
            
            <div className="mt-6 flex items-center justify-center">
              <span className="text-gray-600 text-sm">Having trouble?</span>
              <button
                onClick={clearAllCookies}
                className="ml-1 text-primary text-sm font-medium hover:text-primary-700"
              >
                Clear Cookies
              </button>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-500 text-xs text-center">
                Note: For testing, you can also use the test accounts:
                <br />
                Email: ryouma@gmail.com or prasad@gmail.com
                <br />
                (Use any password)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
