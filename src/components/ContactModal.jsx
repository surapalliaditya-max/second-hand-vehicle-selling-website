import React, { useState } from 'react';
import { useVehicles } from '../context/VehicleContext';
import { X, Send, User, Mail, Phone, MessageSquare, AlertCircle } from 'lucide-react';

export const ContactModal = ({ vehicle, onClose }) => {
  const { user, sendEnquiry } = useVehicles();

  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [phone, setPhone] = useState(user ? user.mobile || '' : '');
  const [message, setMessage] = useState(`Hi ${vehicle?.sellerInfo?.name || 'Seller'}, I am interested in your ${vehicle?.title || 'vehicle'}. Please share more details.`);
  
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Full name is required';
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\s-]{10,15}$/.test(phone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!message.trim()) newErrors.message = 'Message cannot be empty';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    sendEnquiry({
      vehicleId: vehicle.id,
      vehicleTitle: vehicle.title,
      sellerName: vehicle.sellerInfo?.name || 'Seller',
      buyerName: name,
      buyerEmail: email,
      buyerPhone: phone,
      message
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Message Seller</span>
          <h3 className="font-extrabold text-slate-900 text-xl mt-1">Contact Seller</h3>
          <p className="text-xs text-slate-500 mt-1">
            Regarding: <span className="font-bold text-slate-800">{vehicle?.title}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Name Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
            <div className="relative flex items-center">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-2xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium ${
                  errors.name ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                }`}
              />
            </div>
            {errors.name && <p className="text-xs text-rose-500 font-semibold mt-1">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-2xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium ${
                  errors.email ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                }`}
              />
            </div>
            {errors.email && <p className="text-xs text-rose-500 font-semibold mt-1">{errors.email}</p>}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone Number *</label>
            <div className="relative flex items-center">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="1234567890"
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-2xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium ${
                  errors.phone ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                }`}
              />
            </div>
            {errors.phone && <p className="text-xs text-rose-500 font-semibold mt-1">{errors.phone}</p>}
          </div>

          {/* Message Area */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Message for Seller *</label>
            <div className="relative">
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`w-full p-3 bg-slate-50 border rounded-2xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium ${
                  errors.message ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                }`}
              />
            </div>
            {errors.message && <p className="text-xs text-rose-500 font-semibold mt-1">{errors.message}</p>}
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Send Enquiry to Seller</span>
          </button>
        </form>
      </div>
    </div>
  );
};
