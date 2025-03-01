"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Lock, Mail, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signIn, getSession } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(false)

  // Redirect directly to admin dashboard
  useEffect(() => {
    console.log('Bypassing authentication - redirecting to admin dashboard')
    router.push('/admin')
  }, [router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      console.log('Attempting to sign in with:', email)
      
      // Hapus semua cookie terlebih dahulu untuk memastikan tidak ada konflik
      clearAllCookies();
      
      // Untuk akun test, langsung buat mock session tanpa memanggil Supabase
      if (email === 'ryouma@gmail.com' || email === 'prasad@gmail.com') {
        console.log('Using test account direct login for:', email);
        
        // Buat mock user
        const mockUser = {
          id: email === 'ryouma@gmail.com' ? 'a24bbcbc-f697-4aec-b368-f4bd9b5cd818' : 'a3537cae-cb36-4070-ab5e-6adf5307fb7b',
          email: email,
          user_metadata: {
            name: email === 'ryouma@gmail.com' ? 'Ryouma' : 'Prasad',
            role: 'admin'
          }
        };
        
        // Buat mock session
        const mockSession = {
          access_token: `mock_token_${Math.random().toString(36).substring(2)}`,
          refresh_token: `mock_refresh_${Math.random().toString(36).substring(2)}`,
          user: mockUser,
          expires_at: Math.floor(Date.now() / 1000) + 86400 // Expires in 24 hours
        };
        
        // Simpan di localStorage
        localStorage.setItem('mock_session', JSON.stringify(mockSession));
        
        // Set cookies untuk middleware authentication dengan domain yang benar
        document.cookie = `sb-access-token=${mockSession.access_token};path=/;max-age=86400;SameSite=Lax`;
        document.cookie = `sb-refresh-token=${mockSession.refresh_token};path=/;max-age=86400;SameSite=Lax`;
        document.cookie = `supabase-auth-token=${JSON.stringify({
          access_token: mockSession.access_token,
          refresh_token: mockSession.refresh_token,
          expires_at: mockSession.expires_at
        })};path=/;max-age=86400;SameSite=Lax`;
        
        // Verifikasi cookie telah diset
        console.log('Cookies after setting:', document.cookie);
        
        // Tunggu sebentar untuk memastikan cookies sudah diset
        setTimeout(() => {
          // Periksa lagi apakah cookie sudah diset
          const hasCookies = document.cookie.includes('sb-access-token') || 
                            document.cookie.includes('supabase-auth-token');
          
          console.log('Cookie check before redirect:', { hasCookies, cookies: document.cookie });
          
          if (hasCookies) {
            console.log('Login successful, redirecting to admin dashboard');
            router.push('/admin');
          } else {
            console.error('Cookies not set properly');
            setError('Authentication error: Cookies could not be set. Please try again or check your browser settings.');
            setIsLoading(false);
          }
        }, 1000);
        
        return;
      }
      
      // Tampilkan informasi credentials Supabase
      if (typeof window !== 'undefined') {
        console.log('NEXT_PUBLIC_SUPABASE_URL available in browser?', 
          !!process.env.NEXT_PUBLIC_SUPABASE_URL);
        console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY available in browser?',
          !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
      }
      
      // Untuk akun non-test, gunakan Supabase authentication
      console.log('Calling signIn function with:', email);
      const { data, error } = await signIn(email, password)
      
      if (error) {
        console.error('Sign in error:', error)
        setError(error.message || 'Invalid email or password')
        setIsLoading(false)
        return
      }
      
      if (!data || !data.user) {
        console.error('No user returned from authentication')
        setError('No user returned from authentication. Please try using a test account.')
        setIsLoading(false)
        return
      }
      
      // Login successful, add a small delay to ensure cookies are set
      console.log('Login successful, redirecting to admin dashboard')
      
      // Add a small delay to ensure cookies are properly set before redirecting
      setTimeout(() => {
        // Verify cookies are set
        const hasCookies = document.cookie.includes('sb-access-token') || 
                          document.cookie.includes('supabase-auth-token');
        
        console.log('Cookie check before redirect:', { hasCookies, cookies: document.cookie });
        
        if (!hasCookies) {
          console.error('Auth cookies not found after login');
          
          // Try to set cookies manually as a fallback
          if (data.session && data.session.access_token) {
            console.log('Setting cookies manually as fallback');
            document.cookie = `sb-access-token=${data.session.access_token};path=/;max-age=86400;SameSite=Lax`;
            if (data.session.refresh_token) {
              document.cookie = `sb-refresh-token=${data.session.refresh_token};path=/;max-age=86400;SameSite=Lax`;
            }
            document.cookie = `supabase-auth-token=${JSON.stringify({
              access_token: data.session.access_token,
              refresh_token: data.session.refresh_token || '',
              expires_at: Math.floor(Date.now() / 1000) + 86400
            })};path=/;max-age=86400;SameSite=Lax`;
          } else {
            setError('Authentication failed. Please try using a test account.');
            setIsLoading(false);
            return;
          }
        }
        
        // Redirect to admin dashboard
        router.push('/admin');
      }, 1000); // Increased delay to ensure cookies are set
    } catch (err) {
      console.error('Unexpected login error:', err)
      setError('An unexpected error occurred. Please try again or use a test account.')
      setIsLoading(false)
    }
  }

  // Fungsi untuk menghapus semua cookies
  const clearAllCookies = () => {
    try {
      // Dapatkan semua cookies
      const cookies = document.cookie.split(';');
      
      // Hapus setiap cookie dengan mengatur expired date ke masa lalu
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
        
        // Hapus cookie dengan berbagai path dan domain untuk memastikan terhapus
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/admin`;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/admin;domain=${window.location.hostname}`;
      }
      
      // Hapus juga localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('mock_session');
        localStorage.removeItem('supabase.auth.token');
      }
      
      console.log('All cookies cleared:', document.cookie);
      
      // Tidak perlu refresh halaman secara otomatis
      // window.location.reload();
    } catch (err) {
      console.error('Error clearing cookies:', err);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <span className="text-3xl font-bold text-primary">
              Clipper<span className="text-secondary">Cuts</span>
            </span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Admin Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to access the admin dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 p-4 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
              <span className="text-red-800">{error}</span>
            </div>
          )}
          
          <div className="mb-4 bg-blue-50 p-4 rounded-md">
            <p className="text-blue-800 text-sm">
              You can use one of these accounts to login:
              <br />• Email: <strong>ryouma@gmail.com</strong>
              <br />• Email: <strong>prasad@gmail.com</strong>
              <br />(Use any password for testing)
            </p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="admin@clippercuts.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-primary-700">
                  Forgot your password?
                </a>
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
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </Button>
            </div>
              
            <div className="mt-6 text-center">
              <span className="text-gray-600 text-sm">Don't have an account?</span>
              <Link
                href="/admin/register"
                className="ml-1 text-primary text-sm font-medium hover:text-primary-700"
              >
                Create Account
              </Link>
            </div>
          </form>

          <div className="mt-4">
            <Button
              type="button"
              className="w-full flex justify-center py-2 px-4"
              onClick={() => {
                clearAllCookies();
                // Tunggu sebentar setelah menghapus cookie
                setTimeout(() => {
                  console.log('Cookies after clearing:', document.cookie);
                  // Arahkan kembali ke halaman login
                  window.location.href = '/admin/login';
                }, 500);
              }}
            >
              Clear Cookies & Return to Login
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-600">
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4 text-left">
          <h3 className="text-blue-800 font-medium mb-2">Login Options:</h3>
          <ol className="list-decimal pl-5 text-blue-800 text-sm space-y-1">
            <li>Use a test account: ryouma@gmail.com or prasad@gmail.com (with any password)</li>
            <li>Create a new account by clicking "Create Account" above</li>
            <li>Use your existing Supabase account credentials</li>
          </ol>
        </div>
        
        <p>
          By logging in, you agree to ClipperCuts' Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}
