import React, { useState, useEffect } from 'react';

const EditUserForm = ({ user, onUpdateUser, onCancel }) => {
  const [formData, setFormData] = useState({
    userFirstName: '',
    userLastName: '',
    email: '',
    contactNumbers: [''],
    active: true
  });

  useEffect(() => {
    if (user) {
      setFormData({
        userFirstName: user.userFirstName,
        userLastName: user.userLastName,
        email: user.email,
        contactNumbers: user.contactNumbers.length ? user.contactNumbers : [''],
        active: user.active
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleContactNumberChange = (index, value) => {
    const newContactNumbers = [...formData.contactNumbers];
    newContactNumbers[index] = value;
    setFormData(prevState => ({
      ...prevState,
      contactNumbers: newContactNumbers
    }));
  };

  const addContactNumberField = () => {
    setFormData(prevState => ({
      ...prevState,
      contactNumbers: [...prevState.contactNumbers, '']
    }));
  };

  const removeContactNumberField = (index) => {
    const newContactNumbers = formData.contactNumbers.filter((_, i) => i !== index);
    setFormData(prevState => ({
      ...prevState,
      contactNumbers: newContactNumbers
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedContactNumbers = formData.contactNumbers.filter(number => number.trim() !== '');
    
    const updatedUser = {
      ...user,
      ...formData,
      contactNumbers: cleanedContactNumbers
    };

    onUpdateUser(updatedUser);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-gray-600 bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100 hover:scale-[1.02]">
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Edit User
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="userFirstName" className="block text-sm font-semibold text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                id="userFirstName"
                name="userFirstName"
                value={formData.userFirstName}
                onChange={(e) => {
                  const filteredValue = e.target.value.replace(/[^a-zA-Z]/g, '');
                  handleChange({ target: { name: 'userFirstName', value: filteredValue } });
                }}
                required
                pattern="[a-zA-Z]+"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-200 hover:border-blue-300"
                placeholder="Enter first name"
              />
            </div>
            
            <div>
              <label htmlFor="userLastName" className="block text-sm font-semibold text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="userLastName"
                name="userLastName"
                value={formData.userLastName}
                onChange={(e) => {
                  const filteredValue = e.target.value.replace(/[^a-zA-Z]/g, '');
                  handleChange({ target: { name: 'userLastName', value: filteredValue } });
                }}
                required
                pattern="[a-zA-Z]+"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-200 hover:border-blue-300"
                placeholder="Enter last name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => {
                let filteredValue = e.target.value.replace(/[^a-zA-Z0-9@._-]/g, '');
                if (/^[0-9@._-]/.test(filteredValue)) {
                  filteredValue = filteredValue.replace(/^[0-9@._-]+/, '');
                }
                handleChange({ target: { name: 'email', value: filteredValue } });
              }}
              required
              pattern="^[a-zA-Z]+[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-200 hover:border-blue-300"
              placeholder="Enter email address"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contact Numbers
            </label>
            {formData.contactNumbers.map((number, index) => (
              <div key={index} className="flex items-center space-x-3 mb-3">
                <input
                  type="tel"
                  value={number}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
                    if (value.length <= 10) {
                      handleContactNumberChange(index, value);
                    }
                  }}
                  maxLength="10"
                  pattern="[0-9]{10}"
                  placeholder="Enter phone number"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-200 hover:border-blue-300"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeContactNumberField(index)}
                    className="p-2 text-red-500 hover:text-red-600 transition-colors rounded-full hover:bg-red-50"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addContactNumberField}
              className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-700 transition-colors group"
            >
              <svg className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Another Number
            </button>
          </div>

          <div>
            <label htmlFor="active" className="block text-sm font-semibold text-gray-700 mb-2">
              Status
            </label>
            <select
              id="active"
              name="active"
              value={formData.active}
              onChange={(e) => setFormData(prevState => ({
                ...prevState,
                active: e.target.value === 'true'
              }))}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-200 hover:border-blue-300 appearance-none"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium shadow-sm hover:shadow"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-sm hover:shadow"
            >
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;