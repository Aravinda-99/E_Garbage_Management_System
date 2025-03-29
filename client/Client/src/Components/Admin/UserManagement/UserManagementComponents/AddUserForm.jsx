import React, { useState } from 'react';

const AddUserForm = ({ onAddUser, onCancel }) => {
  const [formData, setFormData] = useState({
    userFirstName: '',
    userLastName: '',
    email: '',
    contactNumbers: [''],
    active: true
  });

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
    
    const newUser = {
      ...formData,
      userId: Date.now(), // Temporary ID generation
      contactNumbers: cleanedContactNumbers
    };

    onAddUser(newUser);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New User</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="userFirstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="userFirstName"
                name="userFirstName"
                value={formData.userFirstName}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors"
              />
            </div>
            
            <div>
              <label htmlFor="userLastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="userLastName"
                name="userLastName"
                value={formData.userLastName}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Numbers
            </label>
            {formData.contactNumbers.map((number, index) => (
              <div key={index} className="flex items-center space-x-2 mt-1">
                <input
                  type="tel"
                  value={number}
                  onChange={(e) => handleContactNumberChange(index, e.target.value)}
                  placeholder="Enter phone number"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeContactNumberField(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addContactNumberField}
              className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
            >
              + Add Another Number
            </button>
          </div>

          <div>
            <label htmlFor="active" className="block text-sm font-medium text-gray-700">
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;