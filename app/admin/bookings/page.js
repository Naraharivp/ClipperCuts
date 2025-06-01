"use client"

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { getBookings, updateBookingStatus } from '@/lib/supabase'

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchBookings() {
      setLoading(true)
      try {
        const { data, error } = await getBookings()
        
        if (error) throw error
        
        setBookings(data || [])
      } catch (error) {
        console.error('Error fetching bookings:', error)
        setError('Failed to load bookings. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchBookings()
  }, [])

  const handleStatusChange = async (id, status) => {
    try {
      const { data, error } = await updateBookingStatus(id, status)
      
      if (error) throw error
      
      // Update local state
      setBookings(bookings.map(booking => 
        booking.id === id ? { ...booking, status } : booking
      ))
    } catch (error) {
      console.error('Error updating booking:', error)
      setError('Failed to update booking status. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Bookings</h1>
        <div className="text-center py-12">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Bookings</h1>
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No bookings found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Barber
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-medium">{booking.customer_name}</div>
                    <div className="text-sm text-gray-500">{booking.customer_email}</div>
                    <div className="text-sm text-gray-500">{booking.customer_phone}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div>{booking.date}</div>
                    <div className="text-sm text-gray-500">
                      {booking.time}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {booking.services?.title || 'N/A'}
                  </td>
                  <td className="py-3 px-4">
                    {booking.barbers?.name || 'N/A'}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      booking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800'
                        : booking.status === 'cancelled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {booking.status === 'pending' && (
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-green-50 text-green-600 border-green-100 hover:bg-green-100"
                          onClick={() => handleStatusChange(booking.id, 'confirmed')}
                        >
                          Confirm
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-red-50 text-red-600 border-red-100 hover:bg-red-100"
                          onClick={() => handleStatusChange(booking.id, 'cancelled')}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                    {booking.status === 'confirmed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-red-50 text-red-600 border-red-100 hover:bg-red-100"
                        onClick={() => handleStatusChange(booking.id, 'cancelled')}
                      >
                        Cancel
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
