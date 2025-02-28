import { createClient } from '@supabase/supabase-js'
import { getDayOfWeek } from './utils'

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Authentication helper functions
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
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
