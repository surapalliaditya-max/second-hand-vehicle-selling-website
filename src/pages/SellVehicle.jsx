import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVehicles } from '../context/VehicleContext';
import { Breadcrumb } from '../components/Breadcrumb';
import { VehicleCard } from '../components/VehicleCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { 
  Car, DollarSign, MapPin, Image as ImageIcon, FileText, User, Phone, Mail, 
  Save, Eye, Send, CheckCircle2, AlertCircle, X, Upload, Link as LinkIcon
} from 'lucide-react';

export const SellVehicle = () => {
  const navigate = useNavigate();
  const { user, addVehicleListing, showToast } = useVehicles();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initial Form State
  const initialFormState = {
    type: 'Car',
    brand: '',
    model: '',
    variant: '',
    year: '2023',
    registrationYear: '2023',
    fuel: 'Petrol',
    transmission: 'Manual',
    kilometers: '',
    owners: '1',
    color: '',
    price: '',
    state: '',
    city: '',
    pincode: '',
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80',
    description: '',
    sellerName: user ? user.name : 'Aditya Kumar',
    sellerPhone: user ? user.mobile || '1234567890' : '1234567890',
    sellerEmail: user ? user.email || 'seller@example.com' : 'seller@example.com'
  };

  const [formData, setFormData] = useState(() => {
    try {
      const savedDraft = localStorage.getItem('sellerDraft');
      return savedDraft ? JSON.parse(savedDraft) : initialFormState;
    } catch {
      return initialFormState;
    }
  });

  const [imagePreview, setImagePreview] = useState(formData.imageUrl);
  const [imageFileError, setImageFileError] = useState('');
  const [errors, setErrors] = useState({});
  const [previewOpen, setPreviewOpen] = useState(false);

  // Update form values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'imageUrl') {
      setImagePreview(value);
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // SRS File Selection Image Handler (FileReader)
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setImageFileError('');

    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setImageFileError('Invalid file type. Please select an image file (JPG, PNG, WebP).');
      showToast('Please select a valid image file', 'warning');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setImageFileError('File size too large. Please select an image under 5MB.');
      showToast('Image size should be less than 5MB', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
      setFormData(prev => ({ ...prev, imageUrl: reader.result }));
      showToast('Image selected and preview generated!', 'success');
    };
    reader.onerror = () => {
      setImageFileError('Failed to read selected image file.');
      showToast('Error reading image file', 'error');
    };
    reader.readAsDataURL(file);
  };

  // 12.7 Save Draft Handler
  const handleSaveDraft = () => {
    localStorage.setItem('sellerDraft', JSON.stringify(formData));
    showToast("Listing draft saved to browser storage!", "success");
  };

  // Form Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (!formData.model.trim()) newErrors.model = 'Model is required';
    if (!formData.variant.trim()) newErrors.variant = 'Variant is required';
    if (!formData.kilometers || parseInt(formData.kilometers) < 0) {
      newErrors.kilometers = 'Valid kilometers driven is required';
    }
    if (!formData.price || parseInt(formData.price) <= 0) {
      newErrors.price = 'Valid selling price is required';
    }
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.sellerName.trim()) newErrors.sellerName = 'Seller name is required';
    if (!formData.sellerPhone.trim()) {
      newErrors.sellerPhone = 'Phone number is required';
    }
    if (!formData.sellerEmail.trim() || !/\S+@\S+\.\S+/.test(formData.sellerEmail)) {
      newErrors.sellerEmail = 'Valid email address required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Listing Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast("Please fill all required fields correctly", "warning");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const title = `${formData.brand} ${formData.model} ${formData.variant}`.trim();
      const newListing = {
        title,
        brand: formData.brand,
        model: formData.model,
        variant: formData.variant,
        type: formData.type,
        year: parseInt(formData.year),
        registrationYear: parseInt(formData.registrationYear),
        price: parseInt(formData.price),
        kilometers: parseInt(formData.kilometers),
        fuel: formData.fuel,
        transmission: formData.transmission,
        owners: parseInt(formData.owners),
        condition: 'Excellent',
        color: formData.color || 'Silver',
        location: `${formData.city}, ${formData.state}`,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        features: [
          'Air Conditioning',
          'Power Windows',
          'ABS',
          'Airbags',
          'Parking Sensors',
          'Bluetooth'
        ],
        description: formData.description,
        sellerName: formData.sellerName,
        sellerPhone: formData.sellerPhone || '1234567890',
        sellerEmail: formData.sellerEmail || 'seller@example.com',
        images: [
          imagePreview || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80',
          'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80'
        ]
      };

      const created = addVehicleListing(newListing);
      localStorage.removeItem('sellerDraft');
      setIsSubmitting(false);
      navigate(`/vehicles/${created.id}`);
    }, 600);
  };

  // Mock Preview Object
  const previewVehicleObj = {
    id: 'preview-1',
    title: `${formData.brand || 'Vehicle'} ${formData.model || 'Model'}`,
    brand: formData.brand || 'Brand',
    model: formData.model || 'Model',
    variant: formData.variant || 'Variant',
    type: formData.type,
    year: parseInt(formData.year) || 2023,
    registrationYear: parseInt(formData.registrationYear) || 2023,
    price: parseInt(formData.price) || 500000,
    kilometers: parseInt(formData.kilometers) || 25000,
    fuel: formData.fuel,
    transmission: formData.transmission,
    owners: parseInt(formData.owners) || 1,
    location: formData.city ? `${formData.city}, ${formData.state}` : 'Hyderabad, Telangana',
    images: [imagePreview || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80'],
    isFeatured: true
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={[{ label: 'Sell Your Vehicle' }]} />

      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Post Demo Vehicle Listing</span>
          <h1 className="text-2xl sm:text-4xl font-extrabold mt-1">Sell Your Vehicle</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Fill out the vehicle details below to publish your listing to the demo marketplace.
          </p>
        </div>
        <div className="hidden sm:block text-5xl">🚗</div>
      </div>

      {isSubmitting && <LoadingSpinner fullScreen text="Submitting your listing..." />}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* 1. Vehicle Details */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <Car className="w-5 h-5 text-blue-600" />
            <h3 className="font-extrabold text-slate-900 text-lg">1. Vehicle Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Vehicle Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Vehicle Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500"
              >
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
              </select>
            </div>

            {/* Brand */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Brand / Make *</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="e.g. Toyota, Honda, Tata"
                className={`w-full p-3 bg-slate-50 border rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 ${
                  errors.brand ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                }`}
              />
              {errors.brand && <p className="text-[11px] text-rose-500 font-semibold mt-1">{errors.brand}</p>}
            </div>

            {/* Model */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Model *</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="e.g. Innova Crysta, City"
                className={`w-full p-3 bg-slate-50 border rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 ${
                  errors.model ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                }`}
              />
              {errors.model && <p className="text-[11px] text-rose-500 font-semibold mt-1">{errors.model}</p>}
            </div>

            {/* Variant */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Variant *</label>
              <input
                type="text"
                name="variant"
                value={formData.variant}
                onChange={handleChange}
                placeholder="e.g. 2.4 ZX AT"
                className={`w-full p-3 bg-slate-50 border rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 ${
                  errors.variant ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                }`}
              />
              {errors.variant && <p className="text-[11px] text-rose-500 font-semibold mt-1">{errors.variant}</p>}
            </div>

            {/* Mfg Year */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Manufacturing Year *</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500"
              >
                {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015].map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            {/* Reg Year */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Registration Year *</label>
              <select
                name="registrationYear"
                value={formData.registrationYear}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500"
              >
                {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015].map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Fuel Type *</label>
              <select
                name="fuel"
                value={formData.fuel}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500"
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="CNG">CNG</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            {/* Transmission */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Transmission *</label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500"
              >
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>

            {/* KM Driven */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Kilometers Driven *</label>
              <input
                type="number"
                name="kilometers"
                value={formData.kilometers}
                onChange={handleChange}
                placeholder="e.g. 25000"
                className={`w-full p-3 bg-slate-50 border rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 ${
                  errors.kilometers ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                }`}
              />
              {errors.kilometers && <p className="text-[11px] text-rose-500 font-semibold mt-1">{errors.kilometers}</p>}
            </div>

            {/* Owners */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Number of Owners *</label>
              <select
                name="owners"
                value={formData.owners}
                onChange={handleChange}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500"
              >
                <option value="1">1st Owner</option>
                <option value="2">2nd Owner</option>
                <option value="3">3rd Owner</option>
                <option value="4">4+ Owners</option>
              </select>
            </div>

            {/* Color */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Vehicle Color</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="e.g. Pearl White"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>
        </div>

        {/* 2. Price & Location */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            <h3 className="font-extrabold text-slate-900 text-lg">2. Price & Location</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Price */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Expected Selling Price (₹) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 1250000"
                className={`w-full p-3 bg-slate-50 border rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 ${
                  errors.price ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                }`}
              />
              {errors.price && <p className="text-[11px] text-rose-500 font-semibold mt-1">{errors.price}</p>}
            </div>

            {/* State */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">State *</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="e.g. Telangana, Maharashtra"
                className={`w-full p-3 bg-slate-50 border rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 ${
                  errors.state ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                }`}
              />
              {errors.state && <p className="text-[11px] text-rose-500 font-semibold mt-1">{errors.state}</p>}
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Hyderabad, Bangalore"
                className={`w-full p-3 bg-slate-50 border rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 ${
                  errors.city ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                }`}
              />
              {errors.city && <p className="text-[11px] text-rose-500 font-semibold mt-1">{errors.city}</p>}
            </div>

            {/* Pincode */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Area / Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="e.g. 500081"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>
        </div>

        {/* 3. SRS Vehicle Image Selection & Description */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <ImageIcon className="w-5 h-5 text-indigo-600" />
            <h3 className="font-extrabold text-slate-900 text-lg">3. Vehicle Image & Description</h3>
          </div>

          <div className="space-y-6">
            
            {/* SRS File Picker + URL Option */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700">Select Vehicle Photograph *</label>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                
                {/* Image Preview Box */}
                <div className="w-32 h-24 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0 flex items-center justify-center">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Selected Preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-slate-400" />
                  )}
                </div>

                {/* File Input */}
                <div className="flex-1 space-y-2 w-full">
                  <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer transition-colors shadow-sm">
                    <Upload className="w-4 h-4" />
                    <span>Choose Image File...</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>
                  <p className="text-[11px] text-slate-400">Select a image file from your device (JPG, PNG, WebP).</p>
                  {imageFileError && <p className="text-[11px] text-rose-500 font-semibold">{imageFileError}</p>}
                </div>
              </div>

              {/* Optional URL input fallback */}
              <div className="pt-2">
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Or Provide Image URL (Optional)</label>
                <div className="relative flex items-center">
                  <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Vehicle Description *</label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe overall condition, service history, accident record, seat condition, accessories, and reason for selling..."
                className={`w-full p-3 bg-slate-50 border rounded-2xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                }`}
              />
              {errors.description && <p className="text-[11px] text-rose-500 font-semibold mt-1">{errors.description}</p>}
            </div>
          </div>
        </div>

        {/* 4. Seller Contact Information */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <User className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-slate-900 text-lg">4. Seller Contact Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Seller Full Name *</label>
              <input
                type="text"
                name="sellerName"
                value={formData.sellerName}
                onChange={handleChange}
                placeholder="Your name"
                className={`w-full p-3 bg-slate-50 border rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 ${
                  errors.sellerName ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                }`}
              />
              {errors.sellerName && <p className="text-[11px] text-rose-500 font-semibold mt-1">{errors.sellerName}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                name="sellerPhone"
                value={formData.sellerPhone}
                onChange={handleChange}
                placeholder="1234567890"
                className={`w-full p-3 bg-slate-50 border rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 ${
                  errors.sellerPhone ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                }`}
              />
              {errors.sellerPhone && <p className="text-[11px] text-rose-500 font-semibold mt-1">{errors.sellerPhone}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                name="sellerEmail"
                value={formData.sellerEmail}
                onChange={handleChange}
                placeholder="seller@example.com"
                className={`w-full p-3 bg-slate-50 border rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 ${
                  errors.sellerEmail ? 'border-rose-500 bg-rose-50/20' : 'border-slate-200'
                }`}
              />
              {errors.sellerEmail && <p className="text-[11px] text-rose-500 font-semibold mt-1">{errors.sellerEmail}</p>}
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-md">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="w-full sm:w-auto px-5 py-3 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-2xl transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4 text-slate-500" />
            <span>Save Draft</span>
          </button>

          <div className="w-full sm:w-auto flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              className="flex-1 sm:flex-none px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4 text-blue-600" />
              <span>Preview Listing</span>
            </button>

            <button
              type="submit"
              className="flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Listing</span>
            </button>
          </div>
        </div>

      </form>

      {/* Preview Listing Modal */}
      {previewOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 relative space-y-4">
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-6 h-6" />
            </button>

            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Live Preview Card</span>
              <h3 className="font-extrabold text-slate-900 text-xl">How your listing will appear</h3>
            </div>

            <div className="max-w-sm mx-auto pt-2">
              <VehicleCard vehicle={previewVehicleObj} />
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setPreviewOpen(false)}
                className="px-6 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
