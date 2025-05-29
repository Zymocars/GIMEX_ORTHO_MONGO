import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    address: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission here
  }

  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Contact Us!</h2>
        {/* <p className="mt-2 text-lg text-gray-600 font-medium">Let's Communicate, Let's Customise</p> */}
      </div>
      <div className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900">
              Email
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full rounded-md border border-gray-300 bg-white px-3.5 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Enter your email"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="phone-number" className="block text-sm font-semibold text-gray-900">
              Phone Number
            </label>
            <div className="mt-2.5">
              <div className="flex rounded-md border border-gray-300 bg-white focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600">
                <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                  <select
                    id="country"
                    name="country"
                    className="col-start-1 row-start-1 w-full rounded-l-md border-0 py-2 pr-7 pl-3.5 text-base text-gray-900 focus:outline-none sm:text-sm"
                  >
                    <option>IN</option>
                    <option>US</option>
                    <option>CA</option>
                    <option>EU</option>
                    <option>UK</option>
                    <option>AU</option>
                  </select>
                  <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                </div>
                <input
                  id="phone-number"
                  name="phoneNumber"
                  type="text"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="123-456-7890"
                  className="block min-w-0 grow py-2 pr-3 pl-3 text-base text-gray-900 placeholder:text-gray-400 border-0 focus:outline-none sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-semibold text-gray-900">
              Address
            </label>
            <div className="mt-2.5">
              <textarea
                id="address"
                name="address"
                rows={4}
                value={formData.address}
                onChange={handleInputChange}
                className="block w-full rounded-md border border-gray-300 bg-white px-3.5 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Enter your full address"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-md bg-blue-500 mt-2 px-6 py-3 text-sm font-bold text-gray-900 shadow-sm hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition-colors duration-200"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}