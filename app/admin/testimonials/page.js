"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Plus, Edit, Trash, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(null)
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5,
    image: '',
    approved: true,
  })

  useEffect(() => {
    // Simulate fetching data from Supabase
    const mockTestimonials = [
      {
        id: 1,
        name: 'John Smith',
        role: 'Regular Customer',
        content: 'ClipperCuts has been my go-to barbershop for the past 2 years. James always knows exactly how I like my hair cut and the atmosphere is always welcoming.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        approved: true,
        date: '2023-10-15',
      },
      {
        id: 2,
        name: 'Robert Johnson',
        role: 'Business Professional',
        content: 'I need to look sharp for my job, and Michael at ClipperCuts always delivers. The hot towel shave is a must-try experience that I look forward to every month.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        approved: true,
        date: '2023-09-28',
      },
      {
        id: 3,
        name: 'David Williams',
        role: 'First-time Customer',
        content: 'I was nervous about trying a new barbershop, but the team at ClipperCuts made me feel right at home. Great haircut and even better service!',
        rating: 4,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        approved: true,
        date: '2023-11-02',
      },
      {
        id: 4,
        name: 'Michael Brown',
        role: 'Student',
        content: 'Affordable prices and quality cuts. The barbers are skilled and friendly. I recommend this place to all my friends.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        approved: true,
        date: '2023-10-05',
      },
      {
        id: 5,
        name: 'Thomas Anderson',
        role: 'Local Resident',
        content: 'I had a bad experience with the wait time. The haircut was good but I had to wait over 30 minutes past my appointment time.',
        rating: 3,
        image: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        approved: false,
        date: '2023-11-10',
      },
    ]
    
    setTestimonials(mockTestimonials)
  }, [])

  const handleAddTestimonial = () => {
    // In a real app, this would add to Supabase
    const id = Math.max(...testimonials.map(t => t.id), 0) + 1
    const testimonialToAdd = {
      ...newTestimonial,
      id,
      date: new Date().toISOString().split('T')[0],
    }
    
    setTestimonials([...testimonials, testimonialToAdd])
    setNewTestimonial({
      name: '',
      role: '',
      content: '',
      rating: 5,
      image: '',
      approved: true,
    })
    setShowAddModal(false)
  }

  const handleEditTestimonial = (testimonial) => {
    setCurrentTestimonial(testimonial)
    setShowEditModal(true)
  }

  const handleUpdateTestimonial = () => {
    // In a real app, this would update in Supabase
    setTestimonials(testimonials.map(testimonial => 
      testimonial.id === currentTestimonial.id ? currentTestimonial : testimonial
    ))
    setShowEditModal(false)
  }

  const handleDeleteTestimonial = (id) => {
    // In a real app, this would delete from Supabase
    if (confirm('Are you sure you want to delete this testimonial?')) {
      setTestimonials(testimonials.filter(testimonial => testimonial.id !== id))
    }
  }

  const handleToggleApproval = (id) => {
    setTestimonials(testimonials.map(testimonial => 
      testimonial.id === id ? { ...testimonial, approved: !testimonial.approved } : testimonial
    ))
  }

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        className={`h-4 w-4 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ))
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Manage Testimonials</h1>
          <p className="text-gray-600">Review, approve, and manage customer testimonials.</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="flex items-center">
          <Plus className="mr-2 h-4 w-4" /> Add Testimonial
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <Button variant="outline" className="bg-white">
          All Testimonials
        </Button>
        <Button variant="outline" className="bg-white">
          Approved
        </Button>
        <Button variant="outline" className="bg-white">
          Pending Approval
        </Button>
        <Button variant="outline" className="bg-white">
          5 Star
        </Button>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div 
            key={testimonial.id} 
            className={`bg-white rounded-lg shadow-md overflow-hidden ${!testimonial.approved ? 'border-l-4 border-yellow-400' : ''}`}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full overflow-hidden relative mr-3">
                    <Image
                      src={testimonial.image || 'https://via.placeholder.com/150'}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditTestimonial(testimonial)}
                    className="p-1.5 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-full"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteTestimonial(testimonial.id)}
                    className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-full"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex mb-3">
                {renderStars(testimonial.rating)}
              </div>
              
              <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
              
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{testimonial.date}</span>
                <div className="flex items-center">
                  <span className="mr-2">Approved:</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={testimonial.approved}
                      onChange={() => handleToggleApproval(testimonial.id)}
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Testimonial Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Testimonial</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={newTestimonial.name}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="John Smith"
                />
              </div>
              
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Role/Title
                </label>
                <input
                  type="text"
                  id="role"
                  value={newTestimonial.role}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Regular Customer"
                />
              </div>
              
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Testimonial Content
                </label>
                <textarea
                  id="content"
                  value={newTestimonial.content}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows="4"
                  placeholder="What did the customer say about their experience?"
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                  Rating (1-5 stars)
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewTestimonial({ ...newTestimonial, rating: star })}
                      className="focus:outline-none"
                    >
                      <Star 
                        className={`h-6 w-6 ${star <= newTestimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Image URL
                </label>
                <input
                  type="text"
                  id="image"
                  value={newTestimonial.image}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, image: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="approved"
                  checked={newTestimonial.approved}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, approved: e.target.checked })}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="approved" className="ml-2 block text-sm text-gray-900">
                  Approve testimonial for public display
                </label>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTestimonial}>
                Add Testimonial
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Testimonial Modal */}
      {showEditModal && currentTestimonial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Testimonial</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  id="edit-name"
                  value={currentTestimonial.name}
                  onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label htmlFor="edit-role" className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Role/Title
                </label>
                <input
                  type="text"
                  id="edit-role"
                  value={currentTestimonial.role}
                  onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, role: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label htmlFor="edit-content" className="block text-sm font-medium text-gray-700 mb-1">
                  Testimonial Content
                </label>
                <textarea
                  id="edit-content"
                  value={currentTestimonial.content}
                  onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, content: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows="4"
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="edit-rating" className="block text-sm font-medium text-gray-700 mb-1">
                  Rating (1-5 stars)
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setCurrentTestimonial({ ...currentTestimonial, rating: star })}
                      className="focus:outline-none"
                    >
                      <Star 
                        className={`h-6 w-6 ${star <= currentTestimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="edit-image" className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Image URL
                </label>
                <input
                  type="text"
                  id="edit-image"
                  value={currentTestimonial.image}
                  onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, image: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="edit-approved"
                  checked={currentTestimonial.approved}
                  onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, approved: e.target.checked })}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="edit-approved" className="ml-2 block text-sm text-gray-900">
                  Approve testimonial for public display
                </label>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateTestimonial}>
                Update Testimonial
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
