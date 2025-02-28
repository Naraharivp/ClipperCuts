"use client"

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { timeSlots, formatTime } from '@/lib/utils'
import { supabase, getBarbers, getServices, createBooking, checkAvailability } from '@/lib/supabase'

export default function BookingPage() {
  const [date, setDate] = useState(null)
  const [timeSlot, setTimeSlot] = useState("")
  const [barber, setBarber] = useState("")
  const [service, setService] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  })
  const [bookingComplete, setBookingComplete] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [barbers, setBarbers] = useState([])
  const [services, setServices] = useState([])
  const [availableTimeSlots, setAvailableTimeSlots] = useState(timeSlots)

  // Fetch barbers and services from Supabase
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch barbers
        const { data: barbersData, error: barbersError } = await getBarbers()
        if (barbersError) throw barbersError
        setBarbers(barbersData)

        // Fetch services
        const { data: servicesData, error: servicesError } = await getServices()
        if (servicesError) throw servicesError
        setServices(servicesData)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Failed to load data. Please try again later.')
      }
    }

    fetchData()
  }, [])

  // Update available time slots when date and barber change
  useEffect(() => {
    async function updateAvailability() {
      if (!date || !barber) {
        setAvailableTimeSlots(timeSlots)
        return
      }

      try {
        const { data, error } = await checkAvailability(
          format(date, 'yyyy-MM-dd'),
          barber
        )

        if (error) throw error

        // Filter out booked time slots
        const bookedSlots = new Set(data.map(booking => booking.time))
        const available = timeSlots.filter(slot => !bookedSlots.has(slot))
        
        setAvailableTimeSlots(available)
      } catch (error) {
        console.error('Error checking availability:', error)
        setError('Failed to check availability. Please try again later.')
      }
    }

    updateAvailability()
  }, [date, barber])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      // Validate required fields
      if (!date) {
        throw new Error('Please select a date')
      }
      if (!timeSlot) {
        throw new Error('Please select a time slot')
      }
      if (!service) {
        throw new Error('Please select a service')
      }
      if (!barber) {
        throw new Error('Please select a barber')
      }
      if (!formData.name || !formData.email || !formData.phone) {
        throw new Error('Please fill in all required fields')
      }
      
      // Format the booking data
      const bookingData = {
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        date: date ? format(date, 'yyyy-MM-dd') : '',
        time: timeSlot,
        barber_id: barber,
        service_id: service,
        notes: formData.notes,
        status: 'pending'
      }
      
      // Send data to Supabase
      const { data, error } = await createBooking(bookingData)
      
      if (error) throw error
      
      // Show success message
      setBookingComplete(true)
    } catch (error) {
      console.error('Error creating booking:', error)
      setError(error.message || 'Failed to create booking. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (bookingComplete) {
    return (
      <main>
        <div className="container mx-auto px-4 py-16 min-h-[70vh] flex flex-col items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
            <div className="mb-6 text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for booking with ClipperCuts. We've sent a confirmation email to {formData.email} with all the details.
            </p>
            <div className="bg-gray-50 p-4 rounded-md mb-6 text-left">
              <p className="font-bold mb-2">Booking Details:</p>
              <p>Date: {date ? format(date, 'MMMM dd, yyyy') : ''}</p>
              <p>Time: {timeSlot ? formatTime(timeSlot) : ''}</p>
              <p>Service: {services.find(s => s.id === service)?.title || ''}</p>
              <p>Barber: {barbers.find(b => b.id === barber)?.name || ''}</p>
            </div>
            <Button
              variant="default"
              className="w-full"
              onClick={() => {
                setBookingComplete(false)
                setDate(null)
                setTimeSlot("")
                setBarber("")
                setService("")
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  notes: "",
                })
              }}
            >
              Book Another Appointment
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Book Your Appointment</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Left Column - Calendar and Time Selection */}
                <div>
                  <h2 className="text-xl font-bold mb-4">1. Select Date & Time</h2>
                  
                  <div className="mb-6">
                    <Label className="block mb-2">Select Date</Label>
                    <div className="border rounded-md p-2">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date() || date.getDay() === 0}
                        className="mx-auto"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <Label htmlFor="timeSlot" className="block mb-2">Select Time</Label>
                    <Select value={timeSlot} onValueChange={setTimeSlot}>
                      <SelectTrigger id="timeSlot" className="w-full">
                        <SelectValue placeholder="Select a time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTimeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {formatTime(time)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Right Column - Service and Barber Selection */}
                <div>
                  <h2 className="text-xl font-bold mb-4">2. Select Service & Barber</h2>
                  
                  <div className="mb-6">
                    <Label htmlFor="service" className="block mb-2">Select Service</Label>
                    <Select value={service} onValueChange={setService}>
                      <SelectTrigger id="service" className="w-full">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.title} - {service.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="mb-6">
                    <Label htmlFor="barber" className="block mb-2">Select Barber</Label>
                    <Select value={barber} onValueChange={setBarber}>
                      <SelectTrigger id="barber" className="w-full">
                        <SelectValue placeholder="Select a barber" />
                      </SelectTrigger>
                      <SelectContent>
                        {barbers.map((barber) => (
                          <SelectItem key={barber.id} value={barber.id}>
                            {barber.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              {/* Customer Information */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">3. Your Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="name" className="block mb-2">Full Name</Label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="block mb-2">Phone Number</Label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                      placeholder="Your phone number"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="email" className="block mb-2">Email Address</Label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    placeholder="Your email address"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="notes" className="block mb-2">Additional Notes (Optional)</Label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    placeholder="Any special requests or information"
                  ></textarea>
                </div>
              </div>
              
              {/* Submit Button */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                variant="default"
                className="w-full py-3 text-lg font-semibold"
                disabled={!date || !timeSlot || !barber || !service || !formData.name || !formData.email || !formData.phone || loading}
              >
                {loading ? 'Processing...' : 'Confirm Booking'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
