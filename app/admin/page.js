"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Clock, Users, Scissors, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'

export default function AdminDashboard() {
  // In a real app, this would fetch data from Supabase
  const [stats, setStats] = useState({
    totalBookings: 0,
    todayBookings: 0,
    activeBarbers: 0,
  })

  const [recentBookings, setRecentBookings] = useState([])

  useEffect(() => {
    // Simulate fetching data
    setStats({
      totalBookings: 156,
      todayBookings: 8,
      activeBarbers: 3,
    })

    setRecentBookings([
      {
        id: 1,
        customerName: 'John Smith',
        service: 'Classic Haircut',
        barber: 'James Wilson',
        date: '2025-02-26',
        time: '10:00',
        status: 'confirmed',
      },
      {
        id: 2,
        customerName: 'Michael Johnson',
        service: 'Beard Trim',
        barber: 'Michael Brown',
        date: '2025-02-26',
        time: '11:30',
        status: 'confirmed',
      },
      {
        id: 3,
        customerName: 'Robert Davis',
        service: 'Hair & Beard Combo',
        barber: 'David Thompson',
        date: '2025-02-26',
        time: '14:00',
        status: 'confirmed',
      },
      {
        id: 4,
        customerName: 'William Miller',
        service: 'Hot Towel Shave',
        barber: 'James Wilson',
        date: '2025-02-27',
        time: '09:30',
        status: 'pending',
      },
      {
        id: 5,
        customerName: 'Daniel Wilson',
        service: 'Classic Haircut',
        barber: 'Michael Brown',
        date: '2025-02-27',
        time: '13:00',
        status: 'pending',
      },
    ])
  }, [])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to the ClipperCuts admin panel.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-primary mr-4">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Bookings</p>
              <h3 className="text-2xl font-bold">{stats.totalBookings}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Today's Appointments</p>
              <h3 className="text-2xl font-bold">{stats.todayBookings}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Active Barbers</p>
              <h3 className="text-2xl font-bold">{stats.activeBarbers}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold">Recent Bookings</h2>
          <Link href="/admin/bookings">
            <Button variant="outline" size="sm" className="flex items-center">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
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
              {recentBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
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
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : booking.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold">Quick Actions</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="w-full">Add New Booking</Button>
          <Button variant="outline" className="w-full">Manage Barber Schedule</Button>
          <Button variant="secondary" className="w-full">View Today's Schedule</Button>
        </div>
      </div>
    </div>
  )
}
