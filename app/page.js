import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Scissors, Clock, Star, Award, Users } from 'lucide-react'

export default function Home() {
  const services = [
    {
      id: 1,
      title: 'Classic Haircut',
      description: 'Traditional haircut with modern techniques. Includes consultation, shampoo, and styling.',
      price: '50K',
      icon: <Scissors className="h-10 w-10 text-secondary" />,
      duration: '30 min',
    },
    {
      id: 2,
      title: 'Beard Trim',
      description: 'Expert beard shaping and trimming to enhance your facial features.',
      price: '35K',
      icon: <Scissors className="h-10 w-10 text-secondary" />,
      duration: '20 min',
    },
    {
      id: 3,
      title: 'Hot Towel Shave',
      description: 'Luxurious straight razor shave with hot towel treatment for the ultimate smooth finish.',
      price: '30K',
      icon: <Scissors className="h-10 w-10 text-secondary" />,
      duration: '45 min',
    },
    {
      id: 4,
      title: 'Hair & Beard Combo',
      description: 'Complete grooming package with haircut and beard trim for a polished look.',
      price: '75K',
      icon: <Scissors className="h-10 w-10 text-secondary" />,
      duration: '50 min',
    },
  ]

  const barbers = [
    {
      id: 1,
      name: 'James Wilson',
      role: 'Master Barber',
      image: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
      experience: '10+ years',
    },
    {
      id: 2,
      name: 'Michael Brown',
      role: 'Senior Barber',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      experience: '8 years',
    },
    {
      id: 3,
      name: 'David Thompson',
      role: 'Style Specialist',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      experience: '5 years',
    },
  ]

  const galleryImages = [
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
    'https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1622296089863-eb7fc530daa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
    'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  ]

  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      rating: 5,
      text: 'Best haircut I\'ve ever had! James really took the time to understand what I wanted and delivered beyond my expectations.',
      avatar: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
      date: '2022-01-01',
    },
    {
      id: 2,
      name: 'Robert Smith',
      rating: 5,
      text: 'The hot towel shave was an amazing experience. Relaxing and professional. Will definitely be back!',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      date: '2022-01-15',
    },
    {
      id: 3,
      name: 'Thomas Johnson',
      rating: 5,
      text: 'Great atmosphere, friendly staff, and excellent service. The online booking system is super convenient!',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      date: '2022-02-01',
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="hero-section h-[80vh] flex items-center justify-center text-white animate-fade-in">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-slide-up delay-200">
            Premium Grooming Experience
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-slide-up delay-300">
            Where traditional barbering meets modern style
          </p>
          <Link href="/booking">
            <Button variant="secondary" size="lg" className="font-semibold text-lg animate-slide-up delay-400">
              Book Your Appointment
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover-lift reveal">
              <div className="flex justify-center mb-4">
                <Award className="h-12 w-12 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                We use only the finest products and tools to ensure top-notch results.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover-lift reveal">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Barbers</h3>
              <p className="text-gray-600">
                Our team consists of skilled professionals with years of experience.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover-lift reveal">
              <div className="flex justify-center mb-4">
                <Clock className="h-12 w-12 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Convenient Booking</h3>
              <p className="text-gray-600">
                Easy online booking system to schedule your appointment anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a range of premium grooming services to keep you looking your best!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover-lift reveal"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      {service.icon}
                    </div>
                    <span className="text-lg font-bold text-secondary">{service.price}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-4 w-4 mr-1" /> {service.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Barbers Section */}
      <section id="barbers" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Barbers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team of skilled professionals is dedicated to providing you with the best grooming experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {barbers.map((barber, index) => (
              <div 
                key={barber.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden reveal"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={barber.image} 
                    alt={barber.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{barber.name}</h3>
                  <p className="text-secondary font-medium mb-2">{barber.role}</p>
                  <p className="text-gray-600 flex items-center">
                    <Star className="h-4 w-4 mr-1 text-secondary" /> Experience: {barber.experience}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Gallery</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Take a look at some of our finest work and the atmosphere of our barbershop.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-md h-64 reveal" style={{ animationDelay: `${index * 100}ms` }}>
                <img 
                  src={image} 
                  alt={`Gallery image ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about their experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md reveal hover-lift" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-center mb-4">
                  <div className="text-secondary">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 inline-block" fill={i < testimonial.rating ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">{testimonial.rating}/5</span>
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for a Fresh Look?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your appointment today and experience the best haircut in town.
          </p>
          <Link href="/booking">
            <Button variant="default" size="lg" className="bg-white text-secondary hover:bg-gray-100 font-semibold hover-lift">
              Book Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions or want to book an appointment? Get in touch with us.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg reveal">
              <h3 className="text-xl font-bold mb-4">Visit Our Shop</h3>
              <p className="text-gray-600 mb-2">Jl. Pogung Kidul No.2a, Pogung Kidul, Sinduadi, Kec. Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55284</p>
              <p className="text-gray-600 mb-2">Monday - Friday: 9AM - 6PM</p>
              <p className="text-gray-600 mb-2">Saturday: 9AM - 5PM</p>
              <p className="text-gray-600 mb-2">Sunday: Closed</p>
              <p className="text-gray-600 mb-6">Phone: 0882007948911</p>
              <div className="flex space-x-4">
                <a href="#" className="text-secondary hover:text-secondary-dark transition-colors hover-scale">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-secondary hover:text-secondary-dark transition-colors hover-scale">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-secondary hover:text-secondary-dark transition-colors hover-scale">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <form className="bg-white p-6 rounded-lg shadow-md reveal space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-gray-700 mb-1">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows="4" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <div>
                  <Button variant="default" className="w-full">Send Message</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
