import React, { useState } from 'react';
import { useVehicles } from '../context/VehicleContext';
import { Breadcrumb } from '../components/Breadcrumb';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ShieldCheck } from 'lucide-react';

export const Contact = () => {
  const { showToast } = useVehicles();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email address is required';
    }
    if (!formData.phone.trim() || !/^[0-9+\s-]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Valid 10-digit mobile number is required';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    showToast("Thank you for contacting AutoMarket! Our support team will get back to you shortly.", "success");
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Contact Support' }]} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-8 text-white shadow-xl text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Customer Support</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold">We're Here to Help</h1>
        <p className="text-slate-300 text-xs sm:text-sm">
          Have questions about buying, selling, or vehicle inspection reports? Contact our support team directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Contact Info Cards */}
        <div className="space-y-4">
          
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Demo Support Number</h3>
              <p className="text-xs text-slate-500 mt-0.5">Mon - Sat: 9:00 AM - 8:00 PM</p>
              <p className="text-sm font-extrabold text-blue-600 mt-1">1234567890</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Email Support</h3>
              <p className="text-xs text-slate-500 mt-0.5">24/7 Response Window</p>
              <p className="text-sm font-extrabold text-amber-600 mt-1">support@example.com</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Corporate Office</h3>
              <p className="text-xs text-slate-500 mt-0.5">AutoMarket Demo Office, Hyderabad, Telangana 500081</p>
            </div>
          </div>

        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <h2 className="font-extrabold text-slate-900 text-xl">Send Us a Message</h2>
            <p className="text-xs text-slate-500 mt-1">Fill out the form below and we will respond within 24 hours.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full p-3 bg-slate-50 border rounded-2xl text-xs font-medium text-slate-800 ${
                    errors.name ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                  }`}
                />
                {errors.name && <p className="text-[11px] text-rose-500 font-semibold mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full p-3 bg-slate-50 border rounded-2xl text-xs font-medium text-slate-800 ${
                    errors.email ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                  }`}
                />
                {errors.email && <p className="text-[11px] text-rose-500 font-semibold mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="1234567890"
                className={`w-full p-3 bg-slate-50 border rounded-2xl text-xs font-medium text-slate-800 ${
                  errors.phone ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                }`}
              />
              {errors.phone && <p className="text-[11px] text-rose-500 font-semibold mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Message *</label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your query or feedback here..."
                className={`w-full p-3 bg-slate-50 border rounded-2xl text-xs font-medium text-slate-800 ${
                  errors.message ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                }`}
              />
              {errors.message && <p className="text-[11px] text-rose-500 font-semibold mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="py-3 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>

          </form>
        </div>

      </div>

    </div>
  );
};
