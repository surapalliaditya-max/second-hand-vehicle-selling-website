import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useVehicles } from '../context/VehicleContext';
import { Breadcrumb } from '../components/Breadcrumb';
import { User, Mail, Phone, Lock, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

export const Register = () => {
  const navigate = useNavigate();
  const { registerUser, showToast } = useVehicles();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    city: '',
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[0-9+\s-]{10,15}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.city.trim()) newErrors.city = 'City/Location is required';
    
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    registerUser(formData);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-6">
      
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Create Account' }]} />

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-extrabold text-slate-900">Create Buyer & Seller Account</h1>
          <p className="text-xs text-slate-500">Create your demo account to buy and sell second-hand vehicles</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
            <div className="relative flex items-center">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-2xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-blue-500 ${
                  errors.fullName ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                }`}
              />
            </div>
            {errors.fullName && <p className="text-xs text-rose-500 font-semibold mt-1">{errors.fullName}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-2xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                  }`}
                />
              </div>
              {errors.email && <p className="text-xs text-rose-500 font-semibold mt-1">{errors.email}</p>}
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
              <div className="relative flex items-center">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5" />
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="1234567890"
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-2xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-blue-500 ${
                    errors.mobile ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                  }`}
                />
              </div>
              {errors.mobile && <p className="text-xs text-rose-500 font-semibold mt-1">{errors.mobile}</p>}
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password *</label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min 6 characters"
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-2xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-blue-500 ${
                    errors.password ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                  }`}
                />
              </div>
              {errors.password && <p className="text-xs text-rose-500 font-semibold mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Confirm Password *</label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-2xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-blue-500 ${
                    errors.confirmPassword ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                  }`}
                />
              </div>
              {errors.confirmPassword && <p className="text-xs text-rose-500 font-semibold mt-1">{errors.confirmPassword}</p>}
            </div>

          </div>

          {/* City / Location */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">City / Primary Location *</label>
            <div className="relative flex items-center">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5" />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Hyderabad, Bangalore, Mumbai"
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-2xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-blue-500 ${
                  errors.city ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                }`}
              />
            </div>
            {errors.city && <p className="text-xs text-rose-500 font-semibold mt-1">{errors.city}</p>}
          </div>

          {/* Terms & Conditions Checkbox */}
          <div>
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="w-4 h-4 mt-0.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <label htmlFor="terms" className="ml-2 text-xs text-slate-600 cursor-pointer">
                I agree to the <span className="font-bold text-slate-800">Terms of Service</span> and <span className="font-bold text-slate-800">Privacy Policy</span> of AutoMarket.
              </label>
            </div>
            {errors.termsAccepted && <p className="text-xs text-rose-500 font-semibold mt-1">{errors.termsAccepted}</p>}
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
          >
            <span>Register Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Login Link */}
        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-blue-600 hover:underline">
            Log In Here
          </Link>
        </div>

      </div>

    </div>
  );
};
