import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useVehicles } from '../context/VehicleContext';
import { Breadcrumb } from '../components/Breadcrumb';
import { VehicleCard } from '../components/VehicleCard';
import { 
  User, Car, Heart, Scale, MessageSquare, Edit3, LogOut, ShieldCheck, 
  Trash2, Plus, Calendar, MapPin, Mail, Phone, Check 
} from 'lucide-react';

export const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { 
    user, vehicles, sellerListings, deleteVehicleListing, 
    favorites, compareList, enquiries, updateUserProfile, logoutUser 
  } = useVehicles();

  // Active Tab State (profile, listings, favorites, compare, enquiries, edit)
  const initialTab = searchParams.get('tab') || 'profile';
  const [activeTab, setActiveTab] = useState(initialTab);

  // Edit Profile Form State
  const [editForm, setEditForm] = useState({
    name: user ? user.name : '',
    email: user ? user.email : '',
    mobile: user ? user.mobile || '' : '',
    city: user ? user.city || '' : ''
  });

  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name,
        email: user.email,
        mobile: user.mobile || '',
        city: user.city || ''
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto text-2xl font-bold">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">Please Log In</h2>
        <p className="text-xs text-slate-500">You need to be logged in to view your user dashboard.</p>
        <Link
          to="/login"
          className="inline-block px-6 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-md"
        >
          Log In Now
        </Link>
      </div>
    );
  }

  const favoriteVehicles = vehicles.filter(v => favorites.includes(v.id));
  const comparedVehicles = vehicles.filter(v => compareList.includes(v.id));

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(editForm);
    setActiveTab('profile');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'User Dashboard' }]} />

      {/* User Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-1.5">
              <h1 className="text-2xl font-extrabold">{user.name}</h1>
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-xs text-slate-300 mt-0.5">{user.email} • Member since {user.memberSince || '2024'}</p>
          </div>
        </div>

        <button
          onClick={() => {
            logoutUser();
            navigate('/');
          }}
          className="px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar border-b border-slate-200">
        {[
          { id: 'profile', label: 'Profile Overview', icon: User },
          { id: 'listings', label: `My Listings (${sellerListings.length})`, icon: Car },
          { id: 'favorites', label: `Saved Favorites (${favoriteVehicles.length})`, icon: Heart },
          { id: 'compare', label: `Compare List (${comparedVehicles.length})`, icon: Scale },
          { id: 'enquiries', label: `Enquiries (${enquiries.length})`, icon: MessageSquare },
          { id: 'edit', label: 'Edit Profile', icon: Edit3 }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Panels */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm min-h-[350px]">
        
        {/* 1. Profile Overview Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h3 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-3">Account Profile</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 font-semibold block">Full Name</span>
                <span className="font-extrabold text-slate-900 text-base">{user.name}</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 font-semibold block">Email Address</span>
                <span className="font-extrabold text-slate-900 text-base">{user.email}</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 font-semibold block">Mobile Phone</span>
                <span className="font-extrabold text-slate-900 text-base">{user.mobile || '1234567890'}</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 font-semibold block">Primary Location</span>
                <span className="font-extrabold text-slate-900 text-base">{user.city || 'Hyderabad'}</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setActiveTab('edit')}
                className="px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-blue-600 transition-colors flex items-center gap-1.5"
              >
                <Edit3 className="w-4 h-4" />
                Edit Profile Details
              </button>
            </div>
          </div>
        )}

        {/* 2. My Listings Tab */}
        {activeTab === 'listings' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xl font-extrabold text-slate-900">Your Vehicle Listings</h3>
              <Link
                to="/sell"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Listing</span>
              </Link>
            </div>

            {sellerListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sellerListings.map(item => (
                  <div key={item.id} className="relative group">
                    <VehicleCard vehicle={item} />
                    <button
                      onClick={() => deleteVehicleListing(item.id)}
                      className="absolute top-3 left-3 p-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full shadow-lg z-20"
                      title="Delete Listing"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 space-y-3">
                <Car className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="text-slate-500 text-sm font-semibold">You haven't posted any vehicle listings yet.</p>
                <Link
                  to="/sell"
                  className="inline-block px-5 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Post First Vehicle Listing
                </Link>
              </div>
            )}
          </div>
        )}

        {/* 3. Favorites Tab */}
        {activeTab === 'favorites' && (
          <div className="space-y-6">
            <h3 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-3">Saved Vehicles</h3>
            {favoriteVehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteVehicles.map(v => (
                  <VehicleCard key={v.id} vehicle={v} />
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm py-8 text-center">No saved vehicles in your wishlist.</p>
            )}
          </div>
        )}

        {/* 4. Compared Vehicles Tab */}
        {activeTab === 'compare' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xl font-extrabold text-slate-900">Compared Vehicles</h3>
              <Link to="/compare" className="text-xs font-bold text-blue-600 hover:underline">
                View Full Matrix Table →
              </Link>
            </div>
            {comparedVehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {comparedVehicles.map(v => (
                  <VehicleCard key={v.id} vehicle={v} />
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm py-8 text-center">No vehicles in comparison list.</p>
            )}
          </div>
        )}

        {/* 5. Enquiries Tab */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            <h3 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-3">Sent & Received Enquiries</h3>
            {enquiries.length > 0 ? (
              <div className="space-y-3 max-w-3xl">
                {enquiries.map(enq => (
                  <div key={enq.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-blue-600 text-sm">{enq.vehicleTitle}</span>
                      <span className="text-slate-400 font-semibold">{enq.date}</span>
                    </div>
                    <p className="text-slate-700 font-medium">"{enq.message}"</p>
                    <div className="text-slate-500 flex items-center gap-4">
                      <span>Buyer: <strong>{enq.buyerName}</strong></span>
                      <span>Seller: <strong>{enq.sellerName}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm py-8 text-center">No enquiries recorded.</p>
            )}
          </div>
        )}

        {/* 6. Edit Profile Tab */}
        {activeTab === 'edit' && (
          <form onSubmit={handleEditSubmit} className="space-y-4 max-w-md">
            <h3 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-3">Edit Profile</h3>
            
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone</label>
              <input
                type="tel"
                value={editForm.mobile}
                onChange={(e) => setEditForm({ ...editForm, mobile: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">City / Location</label>
              <input
                type="text"
                value={editForm.city}
                onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800"
                required
              />
            </div>

            <button
              type="submit"
              className="py-3 px-6 bg-blue-600 text-white font-bold text-xs rounded-2xl shadow-md hover:bg-blue-700 transition-colors"
            >
              Save Profile Changes
            </button>
          </form>
        )}

      </div>

    </div>
  );
};
