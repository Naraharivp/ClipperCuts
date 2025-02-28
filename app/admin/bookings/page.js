"use client"

import { useState, useEffect } from 'react'
import { Calendar as CalendarIcon, Search, Filter, Scissors } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { formatDate } from '@/lib/utils'

export default function BookingsPage() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState('all')
  const [barberFilter, setBarberFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  const [bookings, setBookings] = useState([])
  const [filteredBookings, setFilteredBookings] = useState([])

  useEffect(() => {
    // Simulate fetching data from Supabase
    const mockBookings = [
      {
        id: 1,
        customerName: 'John Smith',
        customerEmail: 'john.smith@example.com',
        customerPhone: '(555) 123-4567',
        service: 'Classic Haircut',
        barber: 'James Wilson',
        date: '2025-02-26',
        time: '10:00',
        status: 'confirmed',
        notes: '',
      },
      {
        id: 2,
        customerName: 'Michael Johnson',
        customerEmail: 'michael.j@example.com',
        customerPhone: '(555) 234-5678',
        service: 'Beard Trim',
        barber: 'Michael Brown',
        date: '2025-02-26',
        time: '11:30',
        status: 'confirmed',
        notes: 'First-time customer',
      },
      {
        id: 3,
        customerName: 'Robert Davis',
        customerEmail: 'robert.d@example.com',
        customerPhone: '(555) 345-6789',
        service: 'Hair & Beard Combo',
        barber: 'David Thompson',
        date: '2025-02-26',
        time: '14:00',
        status: 'confirmed',
        notes: '',
      },
      {
        id: 4,
        customerName: 'William Miller',
        customerEmail: 'william.m@example.com',
        customerPhone: '(555) 456-7890',
        service: 'Hot Towel Shave',
        barber: 'James Wilson',
        date: '2025-02-27',
        time: '09:30',
        status: 'pending',
        notes: '',
      },
      {
        id: 5,
        customerName: 'Daniel Wilson',
        customerEmail: 'daniel.w@example.com',
        customerPhone: '(555) 567-8901',
        service: 'Classic Haircut',
        barber: 'Michael Brown',
        date: '2025-02-27',
        time: '13:00',
        status: 'pending',
        notes: 'Prefers shorter on sides',
      },
      {
        id: 6,
        customerName: 'Thomas Anderson',
        customerEmail: 'thomas.a@example.com',
        customerPhone: '(555) 678-9012',
        service: 'Hair & Beard Combo',
        barber: 'David Thompson',
        date: '2025-02-28',
        time: '11:00',
        status: 'pending',
        notes: '',
      },
      {
        id: 7,
        customerName: 'James Brown',
        customerEmail: 'james.b@example.com',
        customerPhone: '(555) 789-0123',
        service: 'Classic Haircut',
        barber: 'James Wilson',
        date: '2025-02-25',
        time: '15:30',
        status: 'completed',
        notes: 'Regular customer',
      },
      {
        id: 8,
        customerName: 'Christopher Lee',
        customerEmail: 'chris.lee@example.com',
        customerPhone: '(555) 890-1234',
        service: 'Beard Trim',
        barber: 'Michael Brown',
        date: '2025-02-25',
        time: '16:00',
        status: 'completed',
        notes: '',
      },
      {
        id: 9,
        customerName: 'Matthew Taylor',
        customerEmail: 'matt.t@example.com',
        customerPhone: '(555) 901-2345',
        service: 'Hot Towel Shave',
        barber: 'David Thompson',
        date: '2025-02-25',
        time: '10:30',
        status: 'cancelled',
        notes: 'Cancelled due to illness',
      },
      {
        id: 10,
        customerName: 'Anthony Harris',
        customerEmail: 'anthony.h@example.com',
        customerPhone: '(555) 012-3456',
        service: 'Hair & Beard Combo',
        barber: 'James Wilson',
        date: '2025-02-24',
        time: '14:30',
        status: 'completed',
        notes: '',
      },
    ]
    
    setBookings(mockBookings)
    setFilteredBookings(mockBookings)
  }, [])

  useEffect(() => {
    let filtered = [...bookings]
    
    // Apply date filter
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split('T')[0]
      filtered = filtered.filter(booking => booking.date === dateStr)
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter)
    }
    
    // Apply barber filter
    if (barberFilter !== 'all') {
      filtered = filtered.filter(booking => {
        if (barberFilter === 'james') return booking.barber === 'James Wilson'
        if (barberFilter === 'michael') return booking.barber === 'Michael Brown'
        if (barberFilter === 'david') return booking.barber === 'David Thompson'
        return true
      })
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        booking =>
          booking.customerName.toLowerCase().includes(query) ||
          booking.customerEmail.toLowerCase().includes(query) ||
          booking.customerPhone.includes(query)
      )
    }
    
    setFilteredBookings(filtered)
  }, [bookings, selectedDate, statusFilter, barberFilter, searchQuery])

  const handleStatusChange = (id, newStatus) => {
    // In a real app, this would update the status in Supabase
    const updatedBookings = bookings.map(booking => {
      if (booking.id === id) {
        return { ...booking, status: newStatus }
      }
      return booking
    })
    
    setBookings(updatedBookings)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Manage Bookings</h1>
        <p className="text-gray-600">View and manage all customer appointments.</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Date Filter */}
          <div>
            <div className="relative">
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
                onClick={() => setCalendarOpen(!calendarOpen)}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? formatDate(selectedDate) : "Filter by date"}
              </Button>
              {calendarOpen && (
                <div className="absolute z-10 mt-2 bg-white border rounded-md shadow-lg">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date)
                      setCalendarOpen(false)
                    }}
                    initialFocus
                  />
                  {selectedDate && (
                    <div className="p-2 border-t flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedDate(null)
                          setCalendarOpen(false)
                        }}
                      >
                        Clear
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Barber Filter */}
          <div>
            <Select value={barberFilter} onValueChange={setBarberFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by barber" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Barbers</SelectItem>
                <SelectItem value="james">James Wilson</SelectItem>
                <SelectItem value="michael">Michael Brown</SelectItem>
                <SelectItem value="david">David Thompson</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search customers..."
              className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold">Bookings</h2>
          <div className="text-sm text-gray-500">
            Showing {filteredBookings.length} of {bookings.length} bookings
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Barber
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                      <div className="text-sm text-gray-500">{booking.customerEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Scissors className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{booking.service}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.barber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(booking.date)} at {booking.time}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Select
                        value={booking.status}
                        onValueChange={(value) => handleStatusChange(booking.id, value)}
                      >
                        <SelectTrigger className={`w-32 ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-800 border-green-200'
                            : booking.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                            : booking.status === 'completed'
                            ? 'bg-blue-100 text-blue-800 border-blue-200'
                            : 'bg-red-100 text-red-800 border-red-200'
                        }`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No bookings found matching the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
