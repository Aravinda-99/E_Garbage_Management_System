import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaLock, FaCamera, FaMapMarkerAlt, FaUser, FaIdCard, FaCalendarAlt } from 'react-icons/fa';
import Pro2 from '../../../image/Pro2.jpg';

const UserProfile = () => {
  const [user, setUser] = useState({
    userFirstName: 'Alexa',
    userLastName: 'Rawles',
    nickName: '',
    email: 'alexarawles@gmail.com',
    contactNumbers: '',
    gender: '',
    country: '',
    language: '',
    birthday: '',
    address: '',
    pickupTime: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('User data saved:', user);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleProfilePictureUpload = (e) => {
    console.log('Profile picture upload:', e.target.files[0]);
  };

  const handleAddEmail = () => {
    console.log('Add new email');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans pt-20">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-48 bg-gradient-to-r from-teal-200 via-cyan-200 to-blue-200">
            {isEditing && (
              <button className="absolute right-4 top-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition duration-200">
                <FaCamera className="text-gray-600" />
              </button>
            )}
          </div>

          {/* Profile Information */}
          <div className="px-6 pb-8">
            <div className="flex justify-between items-end -mt-16 mb-6">
              <div className="relative group">
                <img
                  src={Pro2}
                  alt="Profile"
                  className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-lg transition-transform duration-300 group-hover:scale-105"
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
                      className="flex items-center justify-center w-8 h-8 bg-teal-500 text-white rounded-full cursor-pointer hover:bg-teal-600 shadow-md transition duration-200"
                    >
                      <FaCamera size={14} />
                    </label>
                  </div>
                )}
              </div>
              <div className="flex space-x-3">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-teal-500 text-white px-5 py-2 rounded-lg hover:bg-teal-600 transition duration-300 shadow-md"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleCancel}
                      className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-5 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-300 shadow-md"
                    >
                      Save Changes
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* User Name and Email */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">{user.userFirstName} {user.userLastName}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="flex space-x-10">
                {['personal', 'account'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab
                        ? 'border-b-2 border-teal-500 text-teal-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab === 'personal' ? 'Personal Information' : 'Account Settings'}
                  </button>
                ))}
              </nav>
            </div>

            {/* Form Fields */}
            {activeTab === 'personal' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Full Name', name: 'userFirstName', value: user.userFirstName, placeholder: 'Your First Name' },
                  { label: 'Nick Name', name: 'nickName', value: user.nickName, placeholder: 'Your Nickname' },
                  {
                    label: 'Gender',
                    name: 'gender',
                    value: user.gender,
                    type: 'select',
                    options: [
                      { value: '', label: 'Select Gender' },
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' },
                      { value: 'other', label: 'Other' },
                    ],
                  },
                  {
                    label: 'Country',
                    name: 'country',
                    value: user.country,
                    type: 'select',
                    options: [
                      { value: '', label: 'Select Country' },
                      { value: 'us', label: 'United States' },
                      { value: 'ca', label: 'Canada' },
                      { value: 'uk', label: 'United Kingdom' },
                      { value: 'au', label: 'Australia' },
                    ],
                  },
                  {
                    label: 'Language',
                    name: 'language',
                    value: user.language,
                    type: 'select',
                    options: [
                      { value: '', label: 'Select Language' },
                      { value: 'en', label: 'English' },
                      { value: 'es', label: 'Spanish' },
                      { value: 'fr', label: 'French' },
                      { value: 'de', label: 'German' },
                    ],
                  },
                  {
                    label: 'Birthday',
                    name: 'birthday',
                    value: user.birthday,
                    type: 'date',
                    placeholder: 'YYYY-MM-DD',
                  },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                    {field.type === 'select' ? (
                      <div className="relative">
                        <select
                          name={field.name}
                          value={field.value}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className={`w-full p-3 pr-10 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 ${
                            !isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'
                          }`}
                        >
                          {field.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    ) : field.type === 'date' ? (
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                          <FaCalendarAlt className="text-gray-500" size={16} />
                        </span>
                        <input
                          type="date"
                          name={field.name}
                          value={field.value}
                          onChange={handleChange}
                          disabled={!isEditing}
                          placeholder={field.placeholder}
                          className={`w-full p-3 pl-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 ${
                            !isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'
                          }`}
                        />
                      </div>
                    ) : (
                      <input
                        type="text"
                        name={field.name}
                        value={field.value}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder={field.placeholder}
                        className={`w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 ${
                          !isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'account' && (
              <div className="space-y-8">
                {/* Email Addresses */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">My Email Address</label>
                  <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between shadow-sm">
                    <div className="flex items-center">
                      <div className="w-10 h-10 flex items-center justify-center bg-teal-100 text-teal-600 rounded-full mr-4">
                        <FaEnvelope size={16} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{user.email}</div>
                        <div className="text-xs text-gray-500">Added 1 month ago</div>
                      </div>
                    </div>
                    {isEditing && (
                      <button className="text-gray-500 hover:text-red-500 transition duration-200">
                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                          <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {isEditing && (
                    <button
                      onClick={handleAddEmail}
                      className="flex items-center text-teal-500 text-sm font-medium mt-3 hover:text-teal-600 transition duration-200"
                    >
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="mr-2">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                      </svg>
                      Add Email Address
                    </button>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                      <FaPhone className="text-gray-500" size={16} />
                    </span>
                    <input
                      type="text"
                      name="contactNumbers"
                      value={user.contactNumbers}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="+1 (123) 456-7890"
                      className={`w-full p-3 pl-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 ${
                        !isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'
                      }`}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                      <FaLock className="text-gray-500" size={16} />
                    </span>
                    <input
                      type="password"
                      name="password"
                      value="••••••••"
                      disabled
                      className="w-full p-3 pl-12 border rounded-lg bg-gray-50 shadow-sm"
                    />
                  </div>
                  <button className="text-teal-500 text-sm font-medium mt-2 hover:text-teal-600 transition duration-200">
                    {isEditing ? 'Set New Password' : 'Change Password'}
                  </button>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                      <FaMapMarkerAlt className="text-gray-500" size={16} />
                    </span>
                    <input
                      type="text"
                      name="address"
                      value={user.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="123 Main St, City, State, Zip"
                      className={`w-full p-3 pl-12 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200 ${
                        !isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'
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