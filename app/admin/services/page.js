"use client"

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash, Clock, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ServicesPage() {
  const [services, setServices] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [currentService, setCurrentService] = useState(null)
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: 'haircut',
  })

  useEffect(() => {
    // Simulate fetching data from Supabase
    const mockServices = [
      {
        id: 1,
        name: 'Classic Haircut',
        description: 'Traditional haircut with scissors or clippers, includes wash and style.',
        price: 25,
        duration: 30,
        category: 'haircut',
        popular: true,
      },
      {
        id: 2,
        name: 'Beard Trim',
        description: 'Professional beard shaping and trimming to keep your facial hair looking its best.',
        price: 15,
        duration: 15,
        category: 'beard',
        popular: false,
      },
      {
        id: 3,
        name: 'Hot Towel Shave',
        description: 'Luxurious straight razor shave with hot towel treatment and premium aftershave.',
        price: 35,
        duration: 45,
        category: 'shave',
        popular: true,
      },
      {
        id: 4,
        name: 'Haircut & Beard Combo',
        description: 'Complete package including haircut and beard trim for a fresh new look.',
        price: 35,
        duration: 45,
        category: 'combo',
        popular: true,
      },
      {
        id: 5,
        name: 'Kids Haircut',
        description: 'Haircut service for children under 12 years old.',
        price: 18,
        duration: 20,
        category: 'haircut',
        popular: false,
      },
      {
        id: 6,
        name: 'Hair Coloring',
        description: 'Professional hair coloring service to cover gray or change your look.',
        price: 60,
        duration: 90,
        category: 'color',
        popular: false,
      },
      {
        id: 7,
        name: 'Fade Haircut',
        description: 'Modern fade haircut with precision tapering and styling.',
        price: 30,
        duration: 30,
        category: 'haircut',
        popular: true,
      },
    ]
    
    setServices(mockServices)
  }, [])

  const handleAddService = () => {
    // In a real app, this would add to Supabase
    const id = Math.max(...services.map(s => s.id), 0) + 1
    const serviceToAdd = {
      ...newService,
      id,
      price: parseFloat(newService.price),
      duration: parseInt(newService.duration),
      popular: false,
    }
    
    setServices([...services, serviceToAdd])
    setNewService({
      name: '',
      description: '',
      price: '',
      duration: '',
      category: 'haircut',
    })
    setShowAddModal(false)
  }

  const handleEditService = (service) => {
    setCurrentService(service)
    setShowEditModal(true)
  }

  const handleUpdateService = () => {
    // In a real app, this would update in Supabase
    setServices(services.map(service => 
      service.id === currentService.id ? currentService : service
    ))
    setShowEditModal(false)
  }

  const handleDeleteService = (id) => {
    // In a real app, this would delete from Supabase
    if (confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(service => service.id !== id))
    }
  }

  const handleTogglePopular = (id) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, popular: !service.popular } : service
    ))
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Manage Services</h1>
          <p className="text-gray-600">Add, edit, or remove services offered by your barbershop.</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="flex items-center">
          <Plus className="mr-2 h-4 w-4" /> Add New Service
        </Button>
      </div>

      {/* Services Categories */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {['All', 'Haircut', 'Beard', 'Shave', 'Combo', 'Color'].map((category) => (
            <button
              key={category}
              className="bg-white border border-gray-200 rounded-lg py-3 px-4 text-center hover:bg-gray-50 focus:ring-2 focus:ring-primary focus:outline-none"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Popular
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-900">{service.name}</div>
                    <div className="text-sm text-gray-500 line-clamp-1">{service.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                    {service.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-gray-400" />
                    {service.duration} min
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 flex items-center">
                    <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                    {service.price.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-primary focus:ring-primary h-4 w-4"
                      checked={service.popular}
                      onChange={() => handleTogglePopular(service.id)}
                    />
                  </label>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleEditService(service)}
                      className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-gray-100"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-gray-100"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Service</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Service Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="e.g. Classic Haircut"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows="3"
                  placeholder="Describe the service"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    id="price"
                    value={newService.price}
                    onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="25.00"
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (min)
                  </label>
                  <input
                    type="number"
                    id="duration"
                    value={newService.duration}
                    onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="30"
                    min="5"
                    step="5"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={newService.category}
                  onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="haircut">Haircut</option>
                  <option value="beard">Beard</option>
                  <option value="shave">Shave</option>
                  <option value="combo">Combo</option>
                  <option value="color">Color</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddService}>
                Add Service
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Service Modal */}
      {showEditModal && currentService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Service</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Service Name
                </label>
                <input
                  type="text"
                  id="edit-name"
                  value={currentService.name}
                  onChange={(e) => setCurrentService({ ...currentService, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="edit-description"
                  value={currentService.description}
                  onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows="3"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="edit-price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    id="edit-price"
                    value={currentService.price}
                    onChange={(e) => setCurrentService({ ...currentService, price: parseFloat(e.target.value) })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <div>
                  <label htmlFor="edit-duration" className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (min)
                  </label>
                  <input
                    type="number"
                    id="edit-duration"
                    value={currentService.duration}
                    onChange={(e) => setCurrentService({ ...currentService, duration: parseInt(e.target.value) })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    min="5"
                    step="5"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="edit-category"
                  value={currentService.category}
                  onChange={(e) => setCurrentService({ ...currentService, category: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="haircut">Haircut</option>
                  <option value="beard">Beard</option>
                  <option value="shave">Shave</option>
                  <option value="combo">Combo</option>
                  <option value="color">Color</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="edit-popular"
                  checked={currentService.popular}
                  onChange={(e) => setCurrentService({ ...currentService, popular: e.target.checked })}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="edit-popular" className="ml-2 block text-sm text-gray-900">
                  Mark as popular service
                </label>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateService}>
                Update Service
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
