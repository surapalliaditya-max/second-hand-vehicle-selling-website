import React from 'react';
import { Link } from 'react-router-dom';
import { useVehicles } from '../context/VehicleContext';
import { VehicleCard } from '../components/VehicleCard';
import { Breadcrumb } from '../components/Breadcrumb';
import { Heart, Trash2, ArrowRight } from 'lucide-react';

export const Favorites = () => {
  const { vehicles, favorites, toggleFavorite } = useVehicles();

  const favoriteVehicles = vehicles.filter(v => favorites.includes(v.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Saved Favorites' }]} />

      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Your Saved Favorites</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            You have <strong className="text-slate-800">{favoriteVehicles.length}</strong> saved vehicles in your wishlist.
          </p>
        </div>

        {favoriteVehicles.length > 0 && (
          <Link
            to="/vehicles"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
          >
            <span>Browse More Vehicles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Vehicles Grid or Empty State */}
      {favoriteVehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteVehicles.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      ) : (
        /* SRS Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4 my-8 max-w-lg mx-auto">
          <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto text-3xl">
            <Heart className="w-10 h-10" />
          </div>
          <h3 className="font-extrabold text-slate-800 text-xl">No favorite vehicles saved</h3>
          <p className="text-slate-500 text-sm">
            You haven't saved any vehicles to your favorites list yet. Click the heart icon on any vehicle card to save it for later reference.
          </p>
          <div className="pt-2">
            <Link
              to="/vehicles"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-2xl shadow-md transition-all"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
};
