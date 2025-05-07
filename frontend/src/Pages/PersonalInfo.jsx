import React,{ useState } from 'react';

export default function PersonalInformation() {
  // State for storing user data
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });
  
  // State for tracking if form has been modified
  const [formModified, setFormModified] = useState(false);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
    setFormModified(true);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    // Here you would typically make an API call to update the user data
    console.log("Saving user data:", userData);
    // Reset the modified flag
    setFormModified(false);
    // Show success message
    alert("Personal information updated successfully!");
  };
  
  return (
    // Add a container with flex centering
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Set max width for the form and make it full width on smaller screens */}
      <div className="max-w-3xl w-full bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Details Section */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input 
                    type="text" 
                    id="firstName"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input 
                    type="text" 
                    id="lastName"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                  />
                </div>
              </div>
            </div>
            
            {/* Address Section */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Shipping Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address
                  </label>
                  <input 
                    type="text" 
                    id="address"
                    name="address"
                    value={userData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input 
                    type="text" 
                    id="city"
                    name="city"
                    value={userData.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input 
                      type="text" 
                      id="state"
                      name="state"
                      value={userData.state}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code
                    </label>
                    <input 
                      type="text" 
                      id="zipCode"
                      name="zipCode"
                      value={userData.zipCode}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Form Actions */}
          <div className="mt-6 flex items-center justify-between">
            <div>
              {formModified && (
                <p className="text-sm text-gray-500">
                  You have unsaved changes
                </p>
              )}
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => {
                  setUserData({
                    firstName: "Jane",
                    lastName: "Doe",
                    email: "jane.doe@example.com",
                    phone: "+1 (555) 123-4567",
                    address: "123 Main Street, Apt 4B",
                    city: "San Francisco",
                    state: "CA",
                    zipCode: "94105",
                  });
                  setFormModified(false);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                className={`px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  formModified 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-blue-400 cursor-not-allowed'
                }`}
                disabled={!formModified}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}