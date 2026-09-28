import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, DollarSign, Car } from 'lucide-react';

export const SearchBar = ({ initialQuery = {}, className = "" }) => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState(initialQuery.q || '');
  const [brand, setBrand] = useState(initialQuery.brand || '');
  const [location, setLocation] = useState(initialQuery.location || '');
  const [type, setType] = useState(initialQuery.type || '');
  const [minPrice, setMinPrice] = useState(initialQuery.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(initialQuery.maxPrice || '');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set('q', keyword.trim());
    if (brand) params.set('brand', brand);
    if (location) params.set('location', location);
    if (type) params.set('type', type);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);

    navigate(`/vehicles?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className={`bg-white rounded-3xl p-4 sm:p-5 shadow-xl border border-slate-100 ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        
        {/* Search Keyword */}
        <div className="relative flex items-center lg:col-span-2">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search make, model, vehicle name..."
            aria-label="Search vehicle name, make or model"
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
          />
        </div>

        {/* Brand Dropdown */}
        <div className="relative flex items-center">
          <Car className="w-5 h-5 text-slate-400 absolute left-3.5" />
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            aria-label="Filter by vehicle brand"
            className="w-full pl-11 pr-8 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium appearance-none"
          >
            <option value="">All Brands</option>
            <option value="Toyota">Toyota</option>
            <option value="Hyundai">Hyundai</option>
            <option value="Maruti Suzuki">Maruti Suzuki</option>
            <option value="Mahindra">Mahindra</option>
            <option value="Tata">Tata</option>
            <option value="Honda">Honda</option>
            <option value="BMW">BMW</option>
            <option value="Mercedes-Benz">Mercedes-Benz</option>
            <option value="Audi">Audi</option>
            <option value="Royal Enfield">Royal Enfield</option>
            <option value="TVS">TVS</option>
            <option value="Kawasaki">Kawasaki</option>
          </select>
        </div>

        {/* Location Dropdown */}
        <div className="relative flex items-center">
          <MapPin className="w-5 h-5 text-slate-400 absolute left-3.5" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            aria-label="Filter by location"
            className="w-full pl-11 pr-8 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium appearance-none"
          >
            <option value="">Any Location</option>
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

        {/* Minimum Price Filter */}
        <div className="relative flex items-center">
          <DollarSign className="w-5 h-5 text-slate-400 absolute left-3.5" />
          <select
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            aria-label="Minimum Price"
            className="w-full pl-11 pr-8 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium appearance-none"
          >
            <option value="">Min Price</option>
            <option value="100000">₹1 Lakh</option>
            <option value="200000">₹2 Lakhs</option>
            <option value="500000">₹5 Lakhs</option>
            <option value="1000000">₹10 Lakhs</option>
            <option value="2000000">₹20 Lakhs</option>
          </select>
        </div>

        {/* Maximum Price Filter */}
        <div className="relative flex items-center">
          <DollarSign className="w-5 h-5 text-slate-400 absolute left-3.5" />
          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            aria-label="Maximum Price"
            className="w-full pl-11 pr-8 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium appearance-none"
          >
            <option value="">Max Price</option>
            <option value="200000">₹2 Lakhs</option>
            <option value="500000">₹5 Lakhs</option>
            <option value="1000000">₹10 Lakhs</option>
            <option value="2000000">₹20 Lakhs</option>
            <option value="5000000">₹50 Lakhs</option>
            <option value="10000000">₹1 Crore</option>
          </select>
        </div>

      </div>

      {/* Submit Search Button */}
      <div className="mt-3 text-right">
        <button
          type="submit"
          className="w-full sm:w-auto py-3 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-blue-500/25 transition-all inline-flex items-center justify-center gap-2 group"
        >
          <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Find Vehicles</span>
        </button>
      </div>
    </form>
  );
};
