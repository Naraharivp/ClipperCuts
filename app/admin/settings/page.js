"use client"

import { useState } from 'react'
import { Save, Clock, DollarSign, Calendar, Bell, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

export default function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    shopName: 'ClipperCuts',
    email: 'info@clippercuts.com',
    phone: '+1 (555) 123-4567',
    address: '123 Barber Street, City, Country',
  })

  const [businessHours, setBusinessHours] = useState({
    monday: { open: '09:00', close: '18:00', closed: false },
    tuesday: { open: '09:00', close: '18:00', closed: false },
    wednesday: { open: '09:00', close: '18:00', closed: false },
    thursday: { open: '09:00', close: '18:00', closed: false },
    friday: { open: '09:00', close: '18:00', closed: false },
    saturday: { open: '09:00', close: '17:00', closed: false },
    sunday: { open: '09:00', close: '17:00', closed: true },
  })

  const [bookingSettings, setBookingSettings] = useState({
    timeSlotDuration: '30',
    advanceBookingDays: '14',
    minAdvanceHours: '2',
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    reminderHours: '24',
  })

  const handleGeneralChange = (e) => {
    const { name, value } = e.target
    setGeneralSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleBusinessHoursChange = (day, field, value) => {
    setBusinessHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }))
  }

  const handleBookingChange = (name, value) => {
    setBookingSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (name, value) => {
    if (typeof value === 'boolean') {
      setNotificationSettings((prev) => ({ ...prev, [name]: value }))
    } else {
      setNotificationSettings((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would save to Supabase
    console.log({
      generalSettings,
      businessHours,
      bookingSettings,
      notificationSettings,
    })
    alert('Settings saved successfully!')
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-gray-600">Configure your barbershop settings and preferences.</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* General Settings */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Shield className="mr-2 h-5 w-5 text-primary" /> General Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="shopName" className="block mb-2">Shop Name</Label>
              <input
                type="text"
                id="shopName"
                name="shopName"
                value={generalSettings.shopName}
                onChange={handleGeneralChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="block mb-2">Email Address</Label>
              <input
                type="email"
                id="email"
                name="email"
                value={generalSettings.email}
                onChange={handleGeneralChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            
            <div>
              <Label htmlFor="phone" className="block mb-2">Phone Number</Label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={generalSettings.phone}
                onChange={handleGeneralChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            
            <div>
              <Label htmlFor="address" className="block mb-2">Address</Label>
              <input
                type="text"
                id="address"
                name="address"
                value={generalSettings.address}
                onChange={handleGeneralChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Clock className="mr-2 h-5 w-5 text-primary" /> Business Hours
          </h2>
          
          <div className="space-y-4">
            {Object.entries(businessHours).map(([day, hours]) => (
              <div key={day} className="flex items-center">
                <div className="w-32 font-medium capitalize">{day}</div>
                
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={hours.closed}
                      onChange={(e) => handleBusinessHoursChange(day, 'closed', e.target.checked)}
                      className="mr-2"
                    />
                    <span>Closed</span>
                  </label>
                  
                  {!hours.closed && (
                    <>
                      <div className="flex items-center">
                        <Select
                          value={hours.open}
                          onValueChange={(value) => handleBusinessHoursChange(day, 'open', value)}
                          disabled={hours.closed}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue placeholder="Open" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 13 }, (_, i) => i + 6).map((hour) => (
                              <SelectItem key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                                {`${hour}:00 ${hour < 12 ? 'AM' : 'PM'}`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        <span className="mx-2">to</span>
                        
                        <Select
                          value={hours.close}
                          onValueChange={(value) => handleBusinessHoursChange(day, 'close', value)}
                          disabled={hours.closed}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue placeholder="Close" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 14 }, (_, i) => i + 9).map((hour) => (
                              <SelectItem key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                                {`${hour > 12 ? hour - 12 : hour}:00 ${hour < 12 ? 'AM' : 'PM'}`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Settings */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-primary" /> Booking Settings
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="timeSlotDuration" className="block mb-2">Time Slot Duration (minutes)</Label>
              <Select
                value={bookingSettings.timeSlotDuration}
                onValueChange={(value) => handleBookingChange('timeSlotDuration', value)}
              >
                <SelectTrigger id="timeSlotDuration" className="w-full">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="advanceBookingDays" className="block mb-2">Advance Booking (days)</Label>
              <Select
                value={bookingSettings.advanceBookingDays}
                onValueChange={(value) => handleBookingChange('advanceBookingDays', value)}
              >
                <SelectTrigger id="advanceBookingDays" className="w-full">
                  <SelectValue placeholder="Select days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="14">14 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="minAdvanceHours" className="block mb-2">Minimum Advance Notice (hours)</Label>
              <Select
                value={bookingSettings.minAdvanceHours}
                onValueChange={(value) => handleBookingChange('minAdvanceHours', value)}
              >
                <SelectTrigger id="minAdvanceHours" className="w-full">
                  <SelectValue placeholder="Select hours" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hour</SelectItem>
                  <SelectItem value="2">2 hours</SelectItem>
                  <SelectItem value="4">4 hours</SelectItem>
                  <SelectItem value="24">24 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Bell className="mr-2 h-5 w-5 text-primary" /> Notification Settings
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="emailNotifications"
                checked={notificationSettings.emailNotifications}
                onChange={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
                className="mr-2"
              />
              <Label htmlFor="emailNotifications">Send email notifications</Label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="smsNotifications"
                checked={notificationSettings.smsNotifications}
                onChange={(e) => handleNotificationChange('smsNotifications', e.target.checked)}
                className="mr-2"
              />
              <Label htmlFor="smsNotifications">Send SMS notifications (additional charges may apply)</Label>
            </div>
            
            <div className="mt-4">
              <Label htmlFor="reminderHours" className="block mb-2">Send appointment reminders</Label>
              <Select
                value={notificationSettings.reminderHours}
                onValueChange={(value) => handleNotificationChange('reminderHours', value)}
              >
                <SelectTrigger id="reminderHours" className="w-full md:w-1/2">
                  <SelectValue placeholder="Select when to send reminders" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hour before</SelectItem>
                  <SelectItem value="2">2 hours before</SelectItem>
                  <SelectItem value="24">24 hours before</SelectItem>
                  <SelectItem value="48">48 hours before</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button type="submit" className="flex items-center">
            <Save className="mr-2 h-4 w-4" /> Save Settings
          </Button>
        </div>
      </form>
    </div>
  )
}
