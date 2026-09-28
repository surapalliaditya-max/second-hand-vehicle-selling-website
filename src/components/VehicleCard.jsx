import React from 'react';
import { Link } from 'react-router-dom';
import { useVehicles } from '../context/VehicleContext';
import { Heart, Scale, Gauge, Fuel, Calendar, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

export const VehicleCard = ({ vehicle }) => {
  const { favorites, toggleFavorite, compareList, toggleCompare } = useVehicles();

  const isFavorite = favorites.includes(vehicle.id);
  const isCompared = compareList.includes(vehicle.id);

  // Helper format price in Lakhs / Crores or Indian format
  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lakh`;
    }
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between">
      
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={vehicle.images && vehicle.images.length > 0 ? vehicle.images[0] : "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80"}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80";
          }}
        />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
          <span className="bg-slate-900/85 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-full border border-white/10">
            {vehicle.type}
          </span>
          {vehicle.isFeatured && (
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
              Featured
            </span>
          )}
        </div>

        {/* Favorite & Compare Action Floating Buttons */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button
            onClick={() => toggleCompare(vehicle.id)}
            title={isCompared ? "Remove from Compare" : "Add to Compare"}
            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-md ${
              isCompared 
                ? 'bg-blue-600 text-white scale-105' 
                : 'bg-white/80 hover:bg-white text-slate-700 hover:text-blue-600'
            }`}
          >
            <Scale className="w-4 h-4" />
          </button>

          <button
            onClick={() => toggleFavorite(vehicle.id)}
            title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-md ${
              isFavorite 
                ? 'bg-rose-500 text-white scale-105' 
                : 'bg-white/80 hover:bg-white text-slate-700 hover:text-rose-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-white font-extrabold text-lg">
          {formatPrice(vehicle.price)}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
            <span>{vehicle.brand}</span>
            <span className="flex items-center gap-1 text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {vehicle.location}
            </span>
          </div>

          <h3 className="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-blue-600 transition-colors mb-3">
            {vehicle.title}
          </h3>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-100 text-xs mb-4">
            <div className="flex flex-col items-center justify-center text-center">
              <Calendar className="w-4 h-4 text-blue-500 mb-1" />
              <span className="font-semibold text-slate-800">{vehicle.year}</span>
              <span className="text-[10px] text-slate-400">Year</span>
            </div>
            
            <div className="flex flex-col items-center justify-center text-center border-x border-slate-200/60">
              <Gauge className="w-4 h-4 text-blue-500 mb-1" />
              <span className="font-semibold text-slate-800">{(vehicle.kilometers / 1000).toFixed(0)}k km</span>
              <span className="text-[10px] text-slate-400">Driven</span>
            </div>

            <div className="flex flex-col items-center justify-center text-center">
              <Fuel className="w-4 h-4 text-blue-500 mb-1" />
              <span className="font-semibold text-slate-800">{vehicle.fuel}</span>
              <span className="text-[10px] text-slate-400">{vehicle.transmission}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <Link
            to={`/vehicles/${vehicle.id}`}
            className="flex-1 py-2.5 px-4 bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

    </div>
  );
};
