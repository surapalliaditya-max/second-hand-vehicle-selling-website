import React from 'react';
import { Filter, RotateCcw, Check, X, Car, DollarSign, Fuel, Settings, Calendar, MapPin } from 'lucide-react';

export const FilterSidebar = ({ filters, setFilters, resetFilters, onCloseMobile = null }) => {
  
  const handleTypeChange = (type) => {
    setFilters(prev => ({
      ...prev,
      type: prev.type === type ? '' : type
    }));
  };

  const handlePriceRangeChange = (range) => {
    setFilters(prev => ({
      ...prev,
      priceRange: prev.priceRange === range ? '' : range
    }));
  };

  const handleFuelChange = (fuel) => {
    setFilters(prev => ({
      ...prev,
      fuel: prev.fuel === fuel ? '' : fuel
    }));
  };

  const handleTransmissionChange = (trans) => {
    setFilters(prev => ({
      ...prev,
      transmission: prev.transmission === trans ? '' : trans
    }));
  };

  const handleYearChange = (year) => {
    setFilters(prev => ({
      ...prev,
      year: prev.year === year ? '' : year
    }));
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-blue-600" />
          <h3 className="font-extrabold text-slate-900 text-lg">Filters</h3>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-rose-600 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear All
          </button>
          
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 md:hidden"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      {/* 7.1 Vehicle Type Filter */}
      <div>
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          <Car className="w-4 h-4 text-blue-500" />
          Vehicle Type
        </h4>
        <div className="flex flex-wrap gap-2">
          {['Car', 'Bike', 'SUV', 'Sedan', 'Hatchback'].map(type => (
            <button
              key={type}
              onClick={() => handleTypeChange(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                filters.type === type
                  ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* 7.2 Price Range Filter */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          <DollarSign className="w-4 h-4 text-emerald-500" />
          Price Range
        </h4>
        <div className="space-y-1.5 text-xs font-medium">
          {[
            { label: 'Under ₹2 Lakhs', value: 'under-2' },
            { label: '₹2–5 Lakhs', value: '2-5' },
            { label: '₹5–10 Lakhs', value: '5-10' },
            { label: '₹10–20 Lakhs', value: '10-20' },
            { label: 'Above ₹20 Lakhs', value: 'above-20' }
          ].map(range => (
            <label
              key={range.value}
              className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-colors ${
                filters.priceRange === range.value ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span>{range.label}</span>
              <input
                type="radio"
                name="priceRange"
                checked={filters.priceRange === range.value}
                onChange={() => handlePriceRangeChange(range.value)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
            </label>
          ))}
        </div>
      </div>

      {/* 7.3 Fuel Type Filter */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          <Fuel className="w-4 h-4 text-amber-500" />
          Fuel Type
        </h4>
        <div className="flex flex-wrap gap-2">
          {['Petrol', 'Diesel', 'Electric', 'CNG', 'Hybrid'].map(fuel => (
            <button
              key={fuel}
              onClick={() => handleFuelChange(fuel)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                filters.fuel === fuel
                  ? 'bg-amber-500 border-amber-500 text-white shadow-sm'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              {fuel}
            </button>
          ))}
        </div>
      </div>

      {/* 7.4 Transmission Filter */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          <Settings className="w-4 h-4 text-indigo-500" />
          Transmission
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {['Manual', 'Automatic'].map(trans => (
            <button
              key={trans}
              onClick={() => handleTransmissionChange(trans)}
              className={`py-2 px-3 rounded-xl text-xs font-semibold border text-center transition-all ${
                filters.transmission === trans
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              {trans}
            </button>
          ))}
        </div>
      </div>

      {/* 7.5 Year Filter */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-purple-500" />
          Manufacturing Year
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {['2026', '2025', '2024', '2023', '2022', 'Older'].map(yr => (
            <button
              key={yr}
              onClick={() => handleYearChange(yr)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                filters.year === yr
                  ? 'bg-purple-600 border-purple-600 text-white shadow-sm'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              {yr}
            </button>
          ))}
        </div>
      </div>

      {/* 7.6 Location Filter */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-rose-500" />
          Location
        </h4>
        <select
          value={filters.location}
          onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Locations</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi NCR</option>
          <option value="Pune">Pune</option>
          <option value="Chennai">Chennai</option>
          <option value="Kolkata">Kolkata</option>
          <option value="Ahmedabad">Ahmedabad</option>
          <option value="Jaipur">Jaipur</option>
          <option value="Chandigarh">Chandigarh</option>
        </select>
      </div>

    </div>
  );
};
