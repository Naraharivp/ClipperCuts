'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Check, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ConfirmationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''
  
  const [countdown, setCountdown] = useState(30)
  
  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return
    
    const timer = setTimeout(() => {
      setCountdown(prev => prev - 1)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [countdown])
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Check your email</h2>
            
            <p className="text-gray-600 mb-6">
              We've sent a confirmation email to:
              <br />
              <span className="font-medium">{email}</span>
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6 text-left">
              <h3 className="text-blue-800 font-medium mb-2">Follow these steps:</h3>
              <ol className="list-decimal pl-5 text-blue-800 text-sm space-y-1">
                <li>Open the email in your inbox</li>
                <li>Click the confirmation link in the email</li>
                <li>You'll be redirected back to log in</li>
              </ol>
            </div>
            
            <div className="mb-6">
              <Link href="/admin/login">
                <Button className="w-full">
                  Go to Login Page
                </Button>
              </Link>
            </div>
            
            <div className="text-sm text-gray-500">
              Didn't receive the email? Check your spam folder or 
              {countdown > 0 ? (
                <span> resend in {countdown} seconds</span>
              ) : (
                <Link 
                  href={`/admin/register?email=${encodeURIComponent(email)}&resend=true`}
                  className="text-primary hover:text-primary-700 ml-1"
                >
                  resend now
                </Link>
              )}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                For testing purposes, you can also use our test accounts:
                <br />
                <span className="font-medium">
                  ryouma@gmail.com or prasad@gmail.com 
                  <br />
                  (with any password)
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
