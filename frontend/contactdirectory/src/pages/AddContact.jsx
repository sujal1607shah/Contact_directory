import React, { useState } from 'react';
import { User, Mail, Phone, Plus, ArrowLeft, AlertCircle, UserPlus } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddContact() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', number: '' });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!form.number.trim()) {
      newErrors.number = 'Phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSaving(true);
    
    try {

     const response = await axios.post('https://contact-directory-icfe.onrender.com/api/contacts', form);

      if (response.status === 201 || response.status === 200) {
      alert('Contact added successfully!');
      setForm({ name: '', email: '', number: '' });
      } else {
      alert('Failed to add contact.');
}
      
      navigate('/');
      alert('Contact added successfully!');
      
      // Reset form after successful submission
      setForm({ name: '', email: '', number: '' });
    } catch (err) {
      console.error('Failed to add contact:', err);
      alert('Failed to add contact. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    console.log('Navigate back to home');
    // navigate('/'); // Replace this with your actual navigation
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <UserPlus className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Add New Contact</h1>
                <p className="text-gray-400 mt-1">Create a new contact in your directory</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-8 text-center">
            <div className="h-20 w-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              New Contact Information
            </h2>
            <p className="text-green-100 mt-2 text-sm">
              Fill in the details below to add a new contact
            </p>
          </div>

          {/* Form Section */}
          <div className="p-6">
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 bg-gray-700 border ${
                      errors.name ? 'border-red-500' : 'border-gray-600'
                    } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200`}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                {errors.name && (
                  <div className="mt-2 flex items-center text-red-400 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.name}
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 bg-gray-700 border ${
                      errors.email ? 'border-red-500' : 'border-gray-600'
                    } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200`}
                    placeholder="Enter email address"
                    required
                  />
                </div>
                {errors.email && (
                  <div className="mt-2 flex items-center text-red-400 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="number" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="number"
                    name="number"
                    value={form.number}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 bg-gray-700 border ${
                      errors.number ? 'border-red-500' : 'border-gray-600'
                    } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200`}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                {errors.number && (
                  <div className="mt-2 flex items-center text-red-400 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.number}
                  </div>
                )}
              </div>

              {/* Helper Text */}
              <div className="bg-gray-700 rounded-lg p-4 border-l-4 border-green-500">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-300">
                      All fields marked with * are required. Make sure to enter valid contact information.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span>Cancel</span>
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={saving}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-500 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Adding...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5" />
                      <span>Add Contact</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddContact;