import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaLock, FaCamera, FaMapMarkerAlt, FaClock, FaUser, FaIdCard } from 'react-icons/fa';
import Pro2 from '../../../image/Pro2.jpg'

const UserProfile = () => {
  // State for user data
  const [user, setUser] = useState({
    userFirstName: 'Alexa',
    userLastName: 'Rawles',
    nickName: '',
    email: 'alexarawles@gmail.com',
    contactNumbers: '',
    gender: '',
    country: '',
    language: '',
    timeZone: '',
    address: '',
    pickupTime: '',
  });

  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSave = () => {
    setIsEditing(false);
    // Add your save logic here (e.g., API call to update user data)
    console.log('User data saved:', user);
  };

  // Handle cancel
  const handleCancel = () => {
    setIsEditing(false);
    // Reset user data if needed
  };

  // Handle profile picture upload
  const handleProfilePictureUpload = (e) => {
    console.log('Profile picture upload:', e.target.files[0]);
    // Add your file upload logic here
  };

  // Handle adding additional email
  const handleAddEmail = () => {
    console.log('Add new email');
    // Add your logic to add a new email
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome, Amanda</h1>
            <p className="text-sm text-gray-500">Tue, 07 June 2022</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              {/* <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              /> */}
              {/* <div className="absolute left-3 top-2.5 text-gray-400">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
              </div> */}
            </div>
            <div className="text-gray-500">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
              </svg>
            </div>
            <div className="relative">
              <img
                src={Pro2}
                alt="User profile"
                className="w-10 h-10 rounded-full border-2 border-gray-200 object-cover"
              />
              {/* Red Notification Dot */}
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-40 bg-gradient-to-r from-green-100 to-teal-100">
            {isEditing && (
              <button className="absolute right-4 top-4 bg-white p-2 rounded-full shadow">
                <FaCamera className="text-gray-500" />
              </button>
            )}
          </div>

          {/* Profile Information */}
          <div className="px-6 pb-6">
            {/* Profile Picture and Edit Button */}
            <div className="flex justify-between items-end -mt-12 mb-6">
              <div className="relative">
                <img
                  src={Pro2}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
                />
                {isEditing && (
                  <div className="absolute bottom-0 right-0">
                    <input
                      type="file"
                      accept="image/*"
                      id="profile-picture-upload"
                      className="hidden"
                      onChange={handleProfilePictureUpload}
                    />
                    <label
                      htmlFor="profile-picture-upload"
                      className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600 shadow"
                    >
                      <FaCamera size={14} />
                    </label>
                  </div>
                )}
              </div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Edit
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-100 transition duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            {/* User Name and Email */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{user.userFirstName} {user.userLastName}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`pb-4 font-medium text-sm ${activeTab === 'personal'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  Personal Information
                </button>
                <button
                  onClick={() => setActiveTab('account')}
                  className={`pb-4 font-medium text-sm ${activeTab === 'account'
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  Account Settings
                </button>
              </nav>
            </div>

            {/* Form Fields */}
            {activeTab === 'personal' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="userFirstName"
                    value={user.userFirstName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Your First Name"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditing ? 'bg-gray-50' : 'bg-white'
                      }`}
                  />
                </div>

                {/* Nick Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nick Name
                  </label>
                  <input
                    type="text"
                    name="nickName"
                    value={user.nickName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Your First Name"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditing ? 'bg-gray-50' : 'bg-white'
                      }`}
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      name="gender"
                      value={user.gender}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full p-3 pr-10 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditing ? 'bg-gray-50' : 'bg-white'
                        }`}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <div className="relative">
                    <select
                      name="country"
                      value={user.country}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full p-3 pr-10 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditing ? 'bg-gray-50' : 'bg-white'
                        }`}
                    >
                      <option value="">Select Country</option>
                      <option value="us">United States</option>
                      <option value="ca">Canada</option>
                      <option value="uk">United Kingdom</option>
                      <option value="au">Australia</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Language
                  </label>
                  <div className="relative">
                    <select
                      name="language"
                      value={user.language}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full p-3 pr-10 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditing ? 'bg-gray-50' : 'bg-white'
                        }`}
                    >
                      <option value="">Select Language</option>
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Time Zone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time Zone
                  </label>
                  <div className="relative">
                    <select
                      name="timeZone"
                      value={user.timeZone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full p-3 pr-10 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditing ? 'bg-gray-50' : 'bg-white'
                        }`}
                    >
                      <option value="">Select Time Zone</option>
                      <option value="pst">Pacific Time (PT)</option>
                      <option value="mst">Mountain Time (MT)</option>
                      <option value="cst">Central Time (CT)</option>
                      <option value="est">Eastern Time (ET)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="space-y-6">
                {/* Email Addresses */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    My Email Address
                  </label>
                  <div className="bg-gray-50 p-4 rounded-lg mb-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-500 rounded-full mr-3">
                        <FaEnvelope size={14} />
                      </div>
                      <div>
                        <div className="font-medium">{user.email}</div>
                        <div className="text-xs text-gray-500">1 month ago</div>
                      </div>
                    </div>
                    {isEditing && (
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                          <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {isEditing && (
                    <button
                      onClick={handleAddEmail}
                      className="flex items-center text-blue-500 text-sm font-medium"
                    >
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="mr-1">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                      </svg>
                      Add Email Address
                    </button>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FaPhone className="text-gray-500" />
                    </span>
                    <input
                      type="text"
                      name="contactNumbers"
                      value={user.contactNumbers}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="+1 (123) 456-7890"
                      className={`w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditing ? 'bg-gray-50' : 'bg-white'
                        }`}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FaLock className="text-gray-500" />
                    </span>
                    <input
                      type="password"
                      name="password"
                      value="••••••••"
                      disabled
                      className="w-full p-3 pl-10 border rounded-lg bg-gray-50"
                    />
                  </div>
                  {!isEditing ? (
                    <button className="text-blue-500 text-sm font-medium mt-2">
                      Change Password
                    </button>
                  ) : (
                    <button className="text-blue-500 text-sm font-medium mt-2">
                      Set New Password
                    </button>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FaMapMarkerAlt className="text-gray-500" />
                    </span>
                    <input
                      type="text"
                      name="address"
                      value={user.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="123 Main St, City, State, Zip"
                      className={`w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isEditing ? 'bg-gray-50' : 'bg-white'
                        }`}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;