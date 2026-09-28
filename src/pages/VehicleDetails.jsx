import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useVehicles } from '../context/VehicleContext';
import { ImageGallery } from '../components/ImageGallery';
import { SellerCard } from '../components/SellerCard';
import { ContactModal } from '../components/ContactModal';
import { Breadcrumb } from '../components/Breadcrumb';
import { VehicleCard } from '../components/VehicleCard';
import { 
  Heart, Scale, Share2, Calendar, Gauge, Fuel, Settings, User, 
  CheckCircle2, MapPin, ShieldCheck, AlertCircle, ArrowLeft, Check, Copy
} from 'lucide-react';

export const VehicleDetails = () => {
  const { id } = useParams();
  const { vehicles, favorites, toggleFavorite, compareList, toggleCompare, showToast } = useVehicles();

  const [messageModalOpen, setMessageModalOpen] = useState(false);

  const vehicle = vehicles.find(v => v.id === id);

  // Vehicle Not Found Error Handling
  if (!vehicle) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto text-3xl">
          <AlertCircle className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900">Vehicle Not Found</h2>
        <p className="text-slate-500 text-base max-w-md mx-auto">
          Sorry, the vehicle you are looking for is no longer available or the link may be invalid.
        </p>
        <Link
          to="/vehicles"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl shadow-md transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Vehicles List
        </Link>
      </div>
    );
  }

  const isFavorite = favorites.includes(vehicle.id);
  const isCompared = compareList.includes(vehicle.id);

  // SRS Required Features List
  const requiredFeatures = [
    'Air Conditioning',
    'Power Windows',
    'ABS',
    'Airbags',
    'Parking Sensors',
    'Rear Camera',
    'Bluetooth',
    'Touchscreen',
    'Sunroof'
  ];

  // Helper format price
  const formatPrice = (price) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(2)} Lakh`;
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard!", "success");
    } else {
      showToast("Sharing vehicle link", "info");
    }
  };

  // Related vehicles (same type or brand)
  const relatedVehicles = vehicles
    .filter(v => v.id !== vehicle.id && (v.type === vehicle.type || v.brand === vehicle.brand))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Vehicles', link: '/vehicles' },
          { label: vehicle.brand, link: `/vehicles?brand=${encodeURIComponent(vehicle.brand)}` },
          { label: vehicle.model }
        ]}
      />

      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold text-blue-600 uppercase tracking-wider mb-1">
            <span>{vehicle.brand}</span>
            <span>•</span>
            <span>{vehicle.type}</span>
            <span>•</span>
            <span className="text-slate-400">{vehicle.location}</span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            {vehicle.title}
          </h1>

          <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 font-medium">
            <span>Variant: <strong className="text-slate-800">{vehicle.variant}</strong></span>
            <span>•</span>
            <span>Reg. Year: <strong className="text-slate-800">{vehicle.registrationYear}</strong></span>
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-8">
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Asking Price</span>
            <span className="text-3xl font-extrabold text-blue-600">
              {formatPrice(vehicle.price)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Favorite Toggle */}
            <button
              onClick={() => toggleFavorite(vehicle.id)}
              className={`p-3 rounded-2xl border transition-all ${
                isFavorite
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
              title="Save to Favorites"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            {/* Compare Toggle */}
            <button
              onClick={() => toggleCompare(vehicle.id)}
              className={`p-3 rounded-2xl border transition-all ${
                isCompared
                  ? 'bg-blue-50 border-blue-200 text-blue-600'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
              title="Add to Compare"
            >
              <Scale className="w-5 h-5" />
            </button>

            {/* Share Link */}
            <button
              onClick={handleShare}
              className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 transition-all"
              title="Share Link"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Gallery, Specs, Description, Features) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 9.1 Image Gallery */}
          <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm">
            <ImageGallery images={vehicle.images} title={vehicle.title} />
          </div>

          {/* 9.2 Complete Vehicle Information Specs Grid */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 text-lg border-b border-slate-100 pb-3">
              Vehicle Specifications
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 font-medium block">Brand</span>
                <span className="font-bold text-slate-800 text-sm">{vehicle.brand}</span>
              </div>
              
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 font-medium block">Model</span>
                <span className="font-bold text-slate-800 text-sm">{vehicle.model}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 font-medium block">Variant</span>
                <span className="font-bold text-slate-800 text-sm truncate block">{vehicle.variant}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 font-medium block">Manufacturing Year</span>
                <span className="font-bold text-slate-800 text-sm">{vehicle.year}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 font-medium block">Registration Year</span>
                <span className="font-bold text-slate-800 text-sm">{vehicle.registrationYear}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 font-medium block">KM Driven</span>
                <span className="font-bold text-slate-800 text-sm">{vehicle.kilometers.toLocaleString('en-IN')} km</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 font-medium block">Fuel Type</span>
                <span className="font-bold text-slate-800 text-sm">{vehicle.fuel}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 font-medium block">Transmission</span>
                <span className="font-bold text-slate-800 text-sm">{vehicle.transmission}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 font-medium block">No. of Owners</span>
                <span className="font-bold text-slate-800 text-sm">{vehicle.owners} Owner</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 font-medium block">Condition</span>
                <span className="font-bold text-emerald-600 text-sm">{vehicle.condition}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 font-medium block">Color</span>
                <span className="font-bold text-slate-800 text-sm">{vehicle.color}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 font-medium block">Location</span>
                <span className="font-bold text-slate-800 text-sm">{vehicle.location}</span>
              </div>
            </div>
          </div>

          {/* 9.3 Description */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-extrabold text-slate-900 text-lg border-b border-slate-100 pb-3">
              Vehicle Overview & History
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
              {vehicle.description}
            </p>
          </div>

          {/* 9.4 Features Checklist */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 text-lg border-b border-slate-100 pb-3">
              Installed Equipment & Features
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {requiredFeatures.map(feat => {
                const isIncluded = vehicle.features ? vehicle.features.includes(feat) : true;
                return (
                  <div
                    key={feat}
                    className={`flex items-center gap-2 p-3 rounded-2xl text-xs font-semibold border ${
                      isIncluded 
                        ? 'bg-blue-50/70 border-blue-200 text-blue-900' 
                        : 'bg-slate-50 border-slate-200 text-slate-400 line-through opacity-60'
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 ${isIncluded ? 'text-blue-600' : 'text-slate-300'}`} />
                    <span>{feat}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column (Seller Info Card) */}
        <div className="space-y-6">
          <SellerCard
            seller={vehicle.sellerInfo}
            vehicleTitle={vehicle.title}
            onOpenMessageModal={() => setMessageModalOpen(true)}
          />

          <div className="bg-gradient-to-tr from-blue-900 to-indigo-900 text-white p-6 rounded-3xl space-y-3">
            <h4 className="font-extrabold text-base">Want to compare options?</h4>
            <p className="text-xs text-blue-200">
              Add this vehicle to your comparison matrix to evaluate it side-by-side with other choices.
            </p>
            <button
              onClick={() => toggleCompare(vehicle.id)}
              className="w-full py-2.5 bg-white text-blue-900 font-extrabold text-xs rounded-xl hover:bg-blue-50 transition-colors"
            >
              {isCompared ? "Remove from Comparison" : "Compare with Other Vehicles"}
            </button>
          </div>
        </div>

      </div>

      {/* Related Vehicles Section */}
      {relatedVehicles.length > 0 && (
        <div className="pt-8 border-t border-slate-200 space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900">Similar Vehicles You May Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedVehicles.map(rel => (
              <VehicleCard key={rel.id} vehicle={rel} />
            ))}
          </div>
        </div>
      )}

      {/* Contact Seller Modal */}
      {messageModalOpen && (
        <ContactModal
          vehicle={vehicle}
          onClose={() => setMessageModalOpen(false)}
        />
      )}

    </div>
  );
};
