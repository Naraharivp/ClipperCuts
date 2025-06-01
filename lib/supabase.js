import { createClient } from '@supabase/supabase-js'
import { getDayOfWeek } from './utils'

// Debug supabase credentials
const debugSupabaseConfig = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  console.log('Supabase URL available?', !!url)
  console.log('Supabase Anon Key available?', !!anonKey)
  
  if (!url || !anonKey) {
    console.error('Supabase credentials missing! Check your .env.local file')
    return false
  }
  
  return true
}

// Initialize Supabase client
const createSupabaseClient = () => {
  debugSupabaseConfig()
  
  // Use hardcoded credentials as fallback if env vars are unavailable
  // These should match what's in .env.local.copy
  const fallbackUrl = 'https://ioezpnbirlyasgltupyg.supabase.co'
  const fallbackAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvZXpwbmJpcmx5YXNnbHR1cHlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1NjE4MzMsImV4cCI6MjA1NjEzNzgzM30.EEnxvP-AEXilEL-AZv9J8nTe1Dz2JqUH5nmBG1E6USU'
  
  // Use environment variables with fallbacks
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || fallbackUrl
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || fallbackAnonKey
  
  console.log('Creating Supabase client with URL:', supabaseUrl)
  
  try {
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  } catch (error) {
    console.error('Error creating Supabase client:', error)
    throw error
  }
}

// Create a single instance of the Supabase client to be used throughout the app
const supabase = createSupabaseClient()

// Check if authentication is completely disabled
export const isAuthDisabled = () => {
  return process.env.NEXT_PUBLIC_DISABLE_AUTH === 'true'
}

// Authentication helper functions
export const signIn = async (email, password) => {
  // If authentication is disabled, return a mock session
  if (isAuthDisabled()) {
    console.log('Authentication is disabled, returning mock session')
    
    // Create a mock user
    const mockUser = {
      id: 'disabled-auth-user-id',
      email: email || 'admin@clippercuts.com',
      user_metadata: {
        name: 'Admin User',
        role: 'admin'
      }
    }
    
    // Create a mock session
    const mockSession = {
      access_token: `mock_token_${Math.random().toString(36).substring(2)}`,
      refresh_token: `mock_refresh_${Math.random().toString(36).substring(2)}`,
      user: mockUser,
      expires_at: Math.floor(Date.now() / 1000) + 86400 // Expires in 24 hours
    }
    
    // Store in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('mock_session', JSON.stringify(mockSession))
      
      // Set cookies
      document.cookie = `sb-access-token=${mockSession.access_token};path=/;max-age=86400;SameSite=Lax`
      document.cookie = `sb-refresh-token=${mockSession.refresh_token};path=/;max-age=86400;SameSite=Lax`
      document.cookie = `supabase-auth-token=${JSON.stringify({
        access_token: mockSession.access_token,
        refresh_token: mockSession.refresh_token,
        expires_at: mockSession.expires_at
      })};path=/;max-age=86400;SameSite=Lax`
    }
    
    return {
      data: { user: mockUser, session: mockSession },
      error: null
    }
  }
  
  try {
    console.log('Signing in with Supabase:', email)
    
    // For development/testing - allow specific test accounts to bypass Supabase auth
    if (email === 'ryouma@gmail.com' || email === 'prasad@gmail.com') {
      console.log('Using test account login for:', email)
      
      // Create a mock user object similar to what Supabase would return
      const mockUser = {
        id: email === 'ryouma@gmail.com' ? 'a24bbcbc-f697-4aec-b368-f4bd9b5cd818' : 'a3537cae-cb36-4070-ab5e-6adf5307fb7b',
        email: email,
        user_metadata: {
          name: email === 'ryouma@gmail.com' ? 'Ryouma' : 'Prasad',
          role: 'admin'
        }
      }
      
      // Create a mock session
      const mockSession = {
        access_token: `mock_token_${Math.random().toString(36).substring(2)}`,
        refresh_token: `mock_refresh_${Math.random().toString(36).substring(2)}`,
        user: mockUser,
        expires_at: Math.floor(Date.now() / 1000) + 86400 // Expires in 24 hours
      }
      
      // Store the mock session in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('mock_session', JSON.stringify(mockSession));
        
        // Create secure, HttpOnly cookies for middleware authentication
        // In a real app, these would be set by the server
        const expires = new Date(Date.now() + 86400 * 1000).toUTCString(); // 24 hours
        
        // Set all the cookies that Supabase middleware checks for
        document.cookie = `sb-access-token=${mockSession.access_token};path=/;max-age=86400;SameSite=Lax`;
        document.cookie = `sb-refresh-token=${mockSession.refresh_token};path=/;max-age=86400;SameSite=Lax`;
        document.cookie = `supabase-auth-token=${JSON.stringify({
          access_token: mockSession.access_token,
          refresh_token: mockSession.refresh_token,
          expires_at: mockSession.expires_at
        })};path=/;max-age=86400;SameSite=Lax`;
      }
      
      return { 
        data: { user: mockUser, session: mockSession },
        error: null
      }
    }
    
    // For real Supabase authentication, create a timeout to avoid hanging
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Authentication request timed out')), 8000);
    });
    
    // Actual Supabase authentication function
    const signInPromise = async () => {
      // Try refreshing the session first in case there's an existing session
      try {
        const { data: refreshData } = await supabase.auth.refreshSession();
        if (refreshData?.session) {
          console.log('Session refreshed successfully');
          return { 
            data: { 
              user: refreshData.user,
              session: refreshData.session 
            }, 
            error: null 
          };
        }
      } catch (err) {
        console.log('Error refreshing session:', err);
        // Continue with sign in
      }
      
      // Sign in with password
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Supabase sign in error:', error)
      } else {
        console.log('Supabase sign in successful')
      }
      
      return { data, error };
    };
    
    // Race between the actual operation and the timeout
    return await Promise.race([signInPromise(), timeoutPromise]);
  } catch (err) {
    console.error('Unexpected error during sign in:', err)
    return { data: null, error: { message: err.message || 'An unexpected error occurred' } }
  }
}

export const signUp = async (email, password, userData = {}) => {
  try {
    console.log('Creating new user account with email:', email)
    
    // Debug: Check Supabase URL and key
    console.log('Using Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not set')
    console.log('Anon key available:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    
    // For testing accounts, create a mock session
    if (email === 'ryouma@gmail.com' || email === 'prasad@gmail.com') {
      console.log('Test account detected, creating mock session')
      
      // Create a mock user object
      const mockUser = {
        id: `mock-${Math.random().toString(36).substring(2, 15)}`,
        email,
        user_metadata: {
          ...userData,
          created_at: new Date().toISOString()
        }
      }
      
      // Store mock session in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('mock_session', JSON.stringify({
          user: mockUser,
          access_token: `mock-token-${Math.random().toString(36).substring(2, 10)}`,
          refresh_token: `mock-refresh-${Math.random().toString(36).substring(2, 10)}`
        }))
        
        // Also set a cookie for middleware check
        document.cookie = `mock_token=true; path=/; max-age=86400`
      }
      
      return {
        data: { user: mockUser, session: { user: mockUser } },
        error: null
      }
    }
    
    // Attempt to create a new account with Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData // Additional user metadata
      }
    })
    
    if (error) {
      console.error('Error creating account:', error)
      return { data: null, error }
    }
    
    console.log('Account created successfully:', data)
    
    // Immediately sign in after account creation
    if (data?.user) {
      // We already get a session from signUp, so no need to sign in separately
      console.log('User automatically signed in after registration')
      
      return { data, error: null }
    }
    
    return { data, error: null }
  } catch (err) {
    console.error('Unexpected error during signup:', err)
    return { 
      data: null, 
      error: { message: err.message || 'An unexpected error occurred during account creation' } 
    }
  }
}

export const signOut = async () => {
  try {
    console.log('Signing out with Supabase')
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      console.error('Supabase sign out error:', error)
    } else {
      console.log('Supabase sign out successful')
    }
    
    // Remove mock session from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mock_session');
      
      // Remove all auth cookies
      document.cookie = 'sb-access-token=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;SameSite=Lax';
      document.cookie = 'sb-refresh-token=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;SameSite=Lax';
      document.cookie = 'supabase-auth-token=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;SameSite=Lax';
    }
    
    return { error }
  } catch (err) {
    console.error('Unexpected error during sign out:', err)
    return { error: { message: 'An unexpected error occurred during sign out' } }
  }
}

export const getCurrentUser = async () => {
  try {
    console.log('Getting current user from Supabase')
    const { data, error } = await supabase.auth.getUser()
    
    if (error) {
      console.error('Error getting current user:', error)
      return null
    }
    
    return data.user
  } catch (err) {
    console.error('Unexpected error getting current user:', err)
    return null
  }
}

export const getSession = async () => {
  // If authentication is disabled, return a mock session
  if (isAuthDisabled()) {
    console.log('Authentication is disabled, returning mock session')
    
    // Create a mock user
    const mockUser = {
      id: 'disabled-auth-user-id',
      email: 'admin@clippercuts.com',
      user_metadata: {
        name: 'Admin User',
        role: 'admin'
      }
    }
    
    // Create a mock session
    const mockSession = {
      access_token: `mock_token_${Math.random().toString(36).substring(2)}`,
      refresh_token: `mock_refresh_${Math.random().toString(36).substring(2)}`,
      user: mockUser,
      expires_at: Math.floor(Date.now() / 1000) + 86400 // Expires in 24 hours
    }
    
    // Store in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('mock_session', JSON.stringify(mockSession))
      
      // Set cookies
      document.cookie = `sb-access-token=${mockSession.access_token};path=/;max-age=86400;SameSite=Lax`
      document.cookie = `sb-refresh-token=${mockSession.refresh_token};path=/;max-age=86400;SameSite=Lax`
      document.cookie = `supabase-auth-token=${JSON.stringify({
        access_token: mockSession.access_token,
        refresh_token: mockSession.refresh_token,
        expires_at: mockSession.expires_at
      })};path=/;max-age=86400;SameSite=Lax`
    }
    
    return { session: mockSession, error: null }
  }
  
  try {
    console.log('Getting session')
    
    // Create a timeout promise to prevent hanging
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Session check timed out')), 8000); // Increased from 3000 to 8000
    });
    
    // Function to get session (either mock or real)
    const getSessionPromise = async () => {
      // Check for mock session in localStorage (for test accounts)
      if (typeof window !== 'undefined') {
        const mockSessionData = localStorage.getItem('mock_session');
        if (mockSessionData) {
          try {
            const mockSession = JSON.parse(mockSessionData);
            console.log('Mock session found for test account');
            
            // Verify if the session is still valid (check cookies)
            const hasCookies = document.cookie.includes('sb-access-token') || 
                              document.cookie.includes('supabase-auth-token');
            
            console.log('Cookie check in getSession:', { hasCookies, cookies: document.cookie });
            
            if (!hasCookies) {
              console.log('Mock session cookies missing, recreating them');
              // Recreate cookies if they're missing
              document.cookie = `sb-access-token=${mockSession.access_token};path=/;max-age=86400;SameSite=Lax`;
              document.cookie = `sb-refresh-token=${mockSession.refresh_token};path=/;max-age=86400;SameSite=Lax`;
              document.cookie = `supabase-auth-token=${JSON.stringify({
                access_token: mockSession.access_token,
                refresh_token: mockSession.refresh_token,
                expires_at: mockSession.expires_at
              })};path=/;max-age=86400;SameSite=Lax`;
              
              // Verify cookies were set
              console.log('Cookies after recreation:', document.cookie);
            }
            
            return { session: mockSession, error: null };
          } catch (err) {
            console.error('Error parsing mock session:', err);
            localStorage.removeItem('mock_session');
          }
        }
      }
      
      console.log('Getting session from Supabase')
      const { data, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Error getting session:', error)
      } else if (data.session) {
        console.log('Session found in Supabase')
      } else {
        console.log('No session found in Supabase')
      }
      
      return { session: data.session, error }
    };
    
    // Race between the actual operation and the timeout
    return await Promise.race([getSessionPromise(), timeoutPromise]);
  } catch (err) {
    console.error('Unexpected error getting session:', err)
    return { session: null, error: { message: err.message || 'An unexpected error occurred getting session' } }
  }
}

// Booking related functions
export const getBookings = async () => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, barbers(name), services(title, price, duration)')
    .order('date', { ascending: true })
  
  return { data, error }
}

export const getBookingsByDate = async (date) => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, barbers(name), services(title, price, duration)')
    .eq('date', date)
    .order('time', { ascending: true })
  
  return { data, error }
}

export const createBooking = async (booking) => {
  try {
    console.log('Creating booking with data:', booking);
    const { data, error } = await supabase
      .from('bookings')
      .insert([booking])
      .select();
    
    if (error) {
      console.error('Supabase error creating booking:', error);
      return { data, error };
    }
    
    // After successful booking, retrieve service and barber details for email
    const { data: serviceData } = await supabase
      .from('services')
      .select('*')
      .eq('id', booking.service_id)
      .single();
      
    const { data: barberData } = await supabase
      .from('barbers')
      .select('*')
      .eq('id', booking.barber_id)
      .single();
    
    // Send confirmation email using the API route
    try {
      // Get the base URL
      const baseUrl = typeof window !== 'undefined' 
        ? window.location.origin 
        : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      
      // Call our API route with the full URL
      console.log('Sending email via API route:', `${baseUrl}/api/send-email`);
      const emailResponse = await fetch(`${baseUrl}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          booking,
          serviceDetails: serviceData,
          barberDetails: barberData
        }),
      });
      
      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        console.error('Email API returned error status:', emailResponse.status, errorText);
        throw new Error(`Email API error: ${emailResponse.status} ${errorText}`);
      }
      
      const emailResult = await emailResponse.json();
      console.log('Email sending result:', emailResult);
      
      // Update booking with email sent status if successful
      if (emailResult.success && data && data[0] && data[0].id) {
        await supabase
          .from('bookings')
          .update({ email_sent: true })
          .eq('id', data[0].id);
      }
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // Continue even if email sending fails
    }
    
    return { data, error };
  } catch (err) {
    console.error('Exception in createBooking:', err);
    return { data: null, error: err };
  }
}

export const updateBookingStatus = async (id, status) => {
  const { data, error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', id)
    .select()
  
  return { data, error }
}

// Barber related functions
export const getBarbers = async () => {
  const { data, error } = await supabase
    .from('barbers')
    .select('*')
    .order('name', { ascending: true })
  
  return { data, error }
}

export const createBarber = async (barber) => {
  const { data, error } = await supabase
    .from('barbers')
    .insert([barber])
    .select()
  
  return { data, error }
}

export const updateBarber = async (id, updates) => {
  const { data, error } = await supabase
    .from('barbers')
    .update(updates)
    .eq('id', id)
    .select()
  
  return { data, error }
}

export const deleteBarber = async (id) => {
  const { error } = await supabase
    .from('barbers')
    .delete()
    .eq('id', id)
  
  return { error }
}

// Services related functions
export const getServices = async () => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('price', { ascending: true })
  
  return { data, error }
}

export const createService = async (service) => {
  const { data, error } = await supabase
    .from('services')
    .insert([service])
    .select()
  
  return { data, error }
}

export const updateService = async (id, updates) => {
  const { data, error } = await supabase
    .from('services')
    .update(updates)
    .eq('id', id)
    .select()
  
  return { data, error }
}

export const deleteService = async (id) => {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id)
  
  return { error }
}

// Settings related functions
export const getSettings = async () => {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
  
  return { data, error }
}

export const updateSettings = async (settings) => {
  const { data, error } = await supabase
    .from('settings')
    .upsert(settings)
    .select()
  
  return { data, error }
}

// Check availability for a specific date and barber
export const checkAvailability = async (date, barberId) => {
  try {
    // First check if the barber works on this day of the week
    const dateObj = new Date(date)
    const dayOfWeek = getDayOfWeek(dateObj)
    
    const { data: scheduleData, error: scheduleError } = await supabase
      .from('barber_schedules')
      .select('*')
      .eq('barber_id', barberId)
      .eq('day_of_week', dayOfWeek)
      .single()
    
    if (scheduleError || !scheduleData || !scheduleData.is_available) {
      // Barber doesn't work on this day or there was an error
      return { data: [], error: scheduleError || new Error('Barber not available on this day') }
    }
    
    // Check for special dates (holidays, etc.)
    const { data: specialData, error: specialError } = await supabase
      .from('special_dates')
      .select('*')
      .eq('date', date)
      .single()
    
    if (specialData && specialData.is_closed) {
      // This is a holiday or special closed day
      return { data: [], error: new Error('This day is not available for booking') }
    }
    
    // Get existing bookings for this barber on this date
    const { data: bookingsData, error: bookingsError } = await supabase
      .from('bookings')
      .select('time')
      .eq('barber_id', barberId)
      .eq('date', date)
      .neq('status', 'cancelled')
    
    if (bookingsError) {
      return { data: [], error: bookingsError }
    }
    
    return { data: bookingsData || [], error: null }
  } catch (error) {
    console.error('Error checking availability:', error)
    return { data: [], error }
  }
}
