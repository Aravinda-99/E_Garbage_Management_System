import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react'; // Import Leaf from lucide-react

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Sign up successful:', formData);
    } catch (error) {
      setErrors({ submit: 'Sign up failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Form Side */}
        <div className="w-full md:w-1/2 p-6">
          <div className="text-center mb-6">
            <Link to="/" className="flex items-center justify-center group">
              <Leaf
                size={28}
                className="text-green-600 transition-transform duration-500 group-hover:rotate-90 group-hover:scale-110"
              />
              {/* <span className="ml-2 text-2xl font-extrabold tracking-tight">
                <span className="text-gray-900">Waste</span>
                <span className="text-green-600">Wise</span>
              </span> */}
            </Link>
            <h2 className="text-2xl font-bold text-gray-900 mt-4">Create Account</h2>
            <p className="text-gray-600 mt-1">Join us today</p>
          </div>

          {errors.submit && (
            <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm mb-4">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 rounded-md border ${errors.name ? 'border-red-300' : 'border-gray-300'} 
        focus:border-green-600 focus:ring focus:ring-green-200 focus:ring-opacity-50`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <input
                  id="contact"
                  name="contact"
                  type="tel"
                  placeholder="Contact Number"
                  value={formData.contact}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 rounded-md border ${errors.contact ? 'border-red-300' : 'border-gray-300'} 
        focus:border-green-600 focus:ring focus:ring-green-200 focus:ring-opacity-50`}
                />
                {errors.contact && <p className="mt-1 text-sm text-red-600">{errors.contact}</p>}
              </div>

              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 rounded-md border ${errors.email ? 'border-red-300' : 'border-gray-300'} 
        focus:border-green-600 focus:ring focus:ring-green-200 focus:ring-opacity-50`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 rounded-md border ${errors.password ? 'border-red-300' : 'border-gray-300'} 
        focus:border-green-600 focus:ring focus:ring-green-200 focus:ring-opacity-50`}
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>


            </div>

            <div className="flex items-center gap-2">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-green-600 hover:text-green-700">Terms & Conditions</a>
              </label>
            </div>
            {errors.agreeToTerms && <p className="text-sm text-red-600">{errors.agreeToTerms}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 rounded-md bg-green-600 text-white font-medium 
                hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
                disabled:bg-green-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing up...
                </span>
              ) : (
                'Sign Up'
              )}
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                Google
              </button>
              <button type="button" className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50">
                <img src="https://www.apple.com/favicon.ico" alt="Apple" className="w-5 h-5" />
                Apple
              </button>
            </div>

            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-green-600 hover:text-green-700">
                Sign in
              </Link>
            </p>
          </form>
        </div>

        {/* Image Side */}
        <div
          className="w-full md:w-1/2 bg-cover bg-center hidden md:block"
          style={{
            backgroundImage: 'url("https://cdn.leonardo.ai/users/b176c6fa-22d1-42ca-9a74-2d4abae46c6b/generations/645f7e88-5ed3-402a-8a3e-694906d77651/Leonardo_Phoenix_10_A_futuristic_smart_waste_management_system_1.jpg")',
            minHeight: '400px'
          }}
        />
      </div>
    </div>
  );
};

export default SignUp;