"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Plus, Edit, Trash, Star, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function BarbersPage() {
  const [barbers, setBarbers] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [currentBarber, setCurrentBarber] = useState(null)

  useEffect(() => {
    // Simulate fetching data from Supabase
    const mockBarbers = [
      {
        id: 1,
        name: 'James Wilson',
        role: 'Master Barber',
        image: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
        experience: '10+ years',
        bio: 'James is our most experienced barber with over a decade of expertise in classic and modern styles. He specializes in precision fades and beard sculpting.',
        specialties: ['Classic Cuts', 'Fades', 'Beard Sculpting'],
        availability: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: false,
          sunday: false,
        },
      },
      {
        id: 2,
        name: 'Michael Brown',
        role: 'Senior Barber',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        experience: '8 years',
        bio: 'Michael brings creativity and precision to every haircut. With 8 years of experience, he excels in modern styles and hot towel shaves.',
        specialties: ['Modern Styles', 'Hot Towel Shaves', 'Hair Design'],
        availability: {
          monday: true,
          tuesday: true,
          wednesday: false,
          thursday: true,
          friday: true,
          saturday: true,
          sunday: false,
        },
      },
      {
        id: 3,
        name: 'David Thompson',
        role: 'Style Specialist',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        experience: '5 years',
        bio: 'David is our style innovator who keeps up with the latest trends. He specializes in textured cuts and creative styling for all hair types.',
        specialties: ['Textured Cuts', 'Styling', 'Color Consultation'],
        availability: {
          monday: false,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: true,
          sunday: false,
        },
      },
    ]
    
    setBarbers(mockBarbers)
  }, [])

  const handleEditBarber = (barber) => {
    setCurrentBarber(barber)
    setShowEditModal(true)
  }

  const handleDeleteBarber = (id) => {
    // In a real app, this would delete from Supabase
    if (confirm('Are you sure you want to remove this barber?')) {
      setBarbers(barbers.filter(barber => barber.id !== id))
    }
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Manage Barbers</h1>
          <p className="text-gray-600">Add, edit, or remove barbers and manage their schedules.</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="flex items-center">
          <Plus className="mr-2 h-4 w-4" /> Add New Barber
        </Button>
      </div>

      {/* Barbers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {barbers.map((barber) => (
          <div key={barber.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-64 relative">
              <Image
                src={barber.image}
                alt={barber.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{barber.name}</h3>
                  <p className="text-secondary font-medium">{barber.role}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditBarber(barber)}
                    className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-full"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteBarber(barber.id)}
                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-full"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 flex items-center">
                <Star className="h-4 w-4 mr-1 text-secondary" /> Experience: {barber.experience}
              </p>
              
              <p className="text-gray-600 mb-4 line-clamp-3">{barber.bio}</p>
              
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Specialties:</h4>
                <div className="flex flex-wrap gap-2">
                  {barber.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" /> Availability:
                </h4>
                <div className="grid grid-cols-7 gap-1">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => {
                    const dayKey = [
                      'monday',
                      'tuesday',
                      'wednesday',
                      'thursday',
                      'friday',
                      'saturday',
                      'sunday',
                    ][index]
                    
                    return (
                      <div
                        key={index}
                        className={`h-8 w-8 flex items-center justify-center rounded-full text-xs font-medium ${
                          barber.availability[dayKey]
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {day}
                      </div>
                    )
                  })}
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  Manage Schedule
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Barber Modal would go here in a complete implementation */}
      {/* For brevity, we're not implementing the full modal components */}
    </div>
  )
}
