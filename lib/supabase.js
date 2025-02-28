import { createClient } from '@supabase/supabase-js'
import { getDayOfWeek } from './utils'

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if Supabase credentials are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials are missing. Please check your .env.local file.')
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
)

// Authentication helper functions
export const signIn = async (email, password) => {
  try {
    // Check if credentials are available
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase credentials are missing. Cannot sign in.')
      return { 
        data: null, 
        error: { message: 'Authentication service is not configured properly. Please contact the administrator.' } 
      }
    }
    
    console.log('Signing in with Supabase:', email)
    
    // For development/testing - allow specific test accounts to bypass Supabase auth
    // This is useful when Supabase is not properly configured or for demo purposes
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
        user: mockUser
      }
      
      // Store the mock session in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('mock_session', JSON.stringify(mockSession));
        
        // Also set cookies for middleware authentication
        document.cookie = `sb-access-token=mock_token;path=/;max-age=86400`;
        document.cookie = `supabase-auth-token=mock_token;path=/;max-age=86400`;
      }
      
      return { 
        data: { user: mockUser, session: mockSession },
        error: null
      }
    }
    
    // Otherwise use actual Supabase authentication
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      console.error('Supabase sign in error:', error)
    } else {
      console.log('Supabase sign in successful')
    }
    
    return { data, error }
  } catch (err) {
    console.error('Unexpected error during sign in:', err)
    return { data: null, error: { message: 'An unexpected error occurred' } }
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
      
      // Remove auth cookies
      document.cookie = 'sb-access-token=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = 'supabase-auth-token=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT';
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
  try {
    // Check if credentials are available
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase credentials are missing. Cannot get session.')
      return { 
        session: null, 
        error: { message: 'Authentication service is not configured properly. Please contact the administrator.' } 
      }
    }
    
    // Check for mock session in localStorage (for test accounts)
    if (typeof window !== 'undefined') {
      const mockSessionData = localStorage.getItem('mock_session');
      if (mockSessionData) {
        try {
          const mockSession = JSON.parse(mockSessionData);
          console.log('Mock session found for test account');
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
      console.log('Session found')
    } else {
      console.log('No session found')
    }
    
    return { session: data.session, error }
  } catch (err) {
    console.error('Unexpected error getting session:', err)
    return { session: null, error: { message: 'An unexpected error occurred getting session' } }
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
