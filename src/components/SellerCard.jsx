import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useVehicles } from '../context/VehicleContext';
import { ShieldCheck, Phone, Mail, MapPin, MessageSquare, Layers, ExternalLink } from 'lucide-react';

export const SellerCard = ({ seller, vehicleTitle = "", onOpenMessageModal }) => {
  const { vehicles } = useVehicles();
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  if (!seller) return null;

  // Find all vehicles sharing this seller's duplicate phone or duplicate email address
  const sellerVehicles = vehicles.filter(
    v => (v.sellerInfo?.phone === seller.phone || v.sellerInfo?.email === seller.email)
  );

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
      
      {/* Seller Header */}
      <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-xl flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
          {seller.name ? seller.name.charAt(0) : 'S'}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h4 className="font-extrabold text-slate-900 text-base">{seller.name}</h4>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full border border-slate-200">
              Demo Seller
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            {seller.type || 'Individual Seller'} • Member since {seller.memberSince || '2023'}
          </p>
          <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{seller.location}</span>
          </div>
        </div>
      </div>

      {/* Duplicate Contact Information Section */}
      <div className="space-y-2 text-xs">
        
        {/* Phone Reveal Button */}
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Seller Phone Number</span>
          <button
            onClick={() => setShowPhone(!showPhone)}
            className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>{showPhone ? seller.phone : "Show Phone Number"}</span>
          </button>
        </div>

        {/* Email Reveal Button */}
        <div className="space-y-1 pt-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Seller Email Address</span>
          <button
            onClick={() => setShowEmail(!showEmail)}
            className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>{showEmail ? seller.email : "Show Email Address"}</span>
          </button>
        </div>

        {/* Message Seller Button */}
        <div className="pt-1">
          <button
            onClick={onOpenMessageModal}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Message Seller</span>
          </button>
        </div>

      </div>

      {/* Portfolio / Duplicate Contacts Badge */}
      {sellerVehicles.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-blue-900 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-600" />
              Seller Listings
            </span>
            <span className="bg-blue-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
              {sellerVehicles.length} Vehicles Listed
            </span>
          </div>
          <p className="text-[11px] text-blue-700 leading-tight">
            This seller uses the phone <strong className="text-slate-900">{seller.phone}</strong> & email <strong className="text-slate-900">{seller.email}</strong> across {sellerVehicles.length} active listings.
          </p>
          <Link
            to={`/vehicles?q=${encodeURIComponent(seller.phone)}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 underline pt-1"
          >
            <span>View all {sellerVehicles.length} vehicles by this seller</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Safety Tip */}
      <div className="bg-slate-50 p-3 rounded-2xl text-[11px] text-slate-500 border border-slate-100 flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <span>Safety Tip: Always inspect the vehicle in person before transferring any money.</span>
      </div>

    </div>
  );
};
