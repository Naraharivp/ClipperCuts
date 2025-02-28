import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, isToday, isPast, addDays, isBefore, isAfter } from "date-fns"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatTime(time) {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

export const timeSlots = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
]

// Format date for database (YYYY-MM-DD)
export function formatDateForDB(date) {
  return format(date, 'yyyy-MM-dd')
}

// Check if date is valid for booking (not in the past and within booking window)
export function isValidBookingDate(date, maxAdvanceDays = 14) {
  if (!date) return false
  
  // Convert to start of day to ignore time
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  // Check if date is today or in the future
  if (isPast(date) && !isToday(date)) return false
  
  // Check if date is within booking window (e.g., next 14 days)
  const maxDate = addDays(today, maxAdvanceDays)
  return !isAfter(date, maxDate)
}

// Check if time slot is valid for booking (not in the past if today)
export function isValidTimeSlot(date, timeSlot) {
  if (!date || !timeSlot) return false
  
  // Only need to check for today
  if (!isToday(date)) return true
  
  const now = new Date()
  const [hours, minutes] = timeSlot.split(':').map(Number)
  
  const slotTime = new Date()
  slotTime.setHours(hours, minutes, 0, 0)
  
  // Add buffer time (e.g., 1 hour)
  const bookingBuffer = 60 // minutes
  const bufferTime = new Date()
  bufferTime.setMinutes(bufferTime.getMinutes() + bookingBuffer)
  
  return isAfter(slotTime, bufferTime)
}

// Get day of week from date (0 = Sunday, 1 = Monday, etc.)
export function getDayOfWeek(date) {
  return date.getDay()
}

// Format status for display
export function formatStatus(status) {
  switch (status) {
    case 'pending':
      return { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' }
    case 'confirmed':
      return { label: 'Confirmed', color: 'bg-green-100 text-green-800' }
    case 'completed':
      return { label: 'Completed', color: 'bg-blue-100 text-blue-800' }
    case 'cancelled':
      return { label: 'Cancelled', color: 'bg-red-100 text-red-800' }
    default:
      return { label: status, color: 'bg-gray-100 text-gray-800' }
  }
}
