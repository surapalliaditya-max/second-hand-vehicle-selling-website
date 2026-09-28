import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useVehicles } from '../context/VehicleContext';
import { VehicleCard } from '../components/VehicleCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { Breadcrumb } from '../components/Breadcrumb';
import { Pagination } from '../components/Pagination';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Search, Filter, ArrowUpDown, RefreshCw, Car } from 'lucide-react';

export const Vehicles = () => {
  const { vehicles } = useVehicles();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);

  // Search Input
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  // Filter State
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || '',
    priceRange: searchParams.get('priceRange') || '',
    fuel: searchParams.get('fuel') || '',
    transmission: searchParams.get('transmission') || '',
    year: searchParams.get('year') || '',
    location: searchParams.get('location') || searchParams.get('city') || '',
    brand: searchParams.get('brand') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || ''
  });

  // Sorting state
  const [sortOption, setSortOption] = useState('newest');

  // Mobile Filter Drawer Toggle
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Sync searchParams to filters on URL change with temporary loading spinner
  useEffect(() => {
    setIsLoading(true);
    setFilters({
      type: searchParams.get('type') || '',
      priceRange: searchParams.get('priceRange') || '',
      fuel: searchParams.get('fuel') || '',
      transmission: searchParams.get('transmission') || '',
      year: searchParams.get('year') || '',
      location: searchParams.get('location') || '',
      brand: searchParams.get('brand') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || ''
    });
    if (searchParams.get('q')) {
      setSearchQuery(searchParams.get('q'));
    }
    const timer = setTimeout(() => setIsLoading(false), 250);
    return () => clearTimeout(timer);
  }, [searchParams]);

  // Reset Filters handler
  const resetFilters = () => {
    setIsLoading(true);
    setFilters({
      type: '',
      priceRange: '',
      fuel: '',
      transmission: '',
      year: '',
      location: '',
      brand: '',
      minPrice: '',
      maxPrice: ''
    });
    setSearchQuery('');
    setSearchParams({});
    setCurrentPage(1);
    setTimeout(() => setIsLoading(false), 200);
  };

  // Filter & Sort Logic
  const filteredVehicles = useMemo(() => {
    return vehicles.filter(v => {
      // Keyword search (Name, Brand, Model, Location, Phone, Email, Seller)
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchTitle = v.title.toLowerCase().includes(q);
        const matchBrand = v.brand.toLowerCase().includes(q);
        const matchModel = v.model.toLowerCase().includes(q);
        const matchLoc = v.location.toLowerCase().includes(q);
        const matchPhone = v.sellerInfo?.phone && v.sellerInfo.phone.toLowerCase().includes(q);
        const matchEmail = v.sellerInfo?.email && v.sellerInfo.email.toLowerCase().includes(q);
        const matchSeller = v.sellerInfo?.name && v.sellerInfo.name.toLowerCase().includes(q);
        if (!matchTitle && !matchBrand && !matchModel && !matchLoc && !matchPhone && !matchEmail && !matchSeller) return false;
      }

      // Brand Filter
      if (filters.brand && v.brand.toLowerCase() !== filters.brand.toLowerCase()) {
        return false;
      }

      // Vehicle Type Filter
      if (filters.type) {
        if (filters.type === 'Car' && !['SUV', 'Sedan', 'Hatchback', 'Car'].includes(v.type)) return false;
        if (filters.type !== 'Car' && v.type !== filters.type) return false;
      }

      // Fuel Type Filter
      if (filters.fuel && v.fuel !== filters.fuel) return false;

      // Transmission Filter
      if (filters.transmission && v.transmission !== filters.transmission) return false;

      // Year Filter
      if (filters.year) {
        if (filters.year === 'Older') {
          if (v.year >= 2022) return false;
        } else {
          if (v.year !== parseInt(filters.year)) return false;
        }
      }

      // Location Filter
      if (filters.location && !v.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // SRS Price Range Filter (Presets)
      if (filters.priceRange) {
        if (filters.priceRange === 'under-2' && v.price >= 200000) return false;
        if (filters.priceRange === '2-5' && (v.price < 200000 || v.price > 500000)) return false;
        if (filters.priceRange === '5-10' && (v.price < 500000 || v.price > 1000000)) return false;
        if (filters.priceRange === '10-20' && (v.price < 1000000 || v.price > 2000000)) return false;
        if (filters.priceRange === 'above-20' && v.price <= 2000000) return false;
      }

      // Explicit Minimum Price Filter
      if (filters.minPrice && v.price < parseInt(filters.minPrice)) return false;

      // Explicit Maximum Price Filter
      if (filters.maxPrice && v.price > parseInt(filters.maxPrice)) return false;

      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'newest') return b.year - a.year;
      if (sortOption === 'oldest') return a.year - b.year;
      if (sortOption === 'km-asc') return a.kilometers - b.kilometers;
      if (sortOption === 'km-desc') return b.kilometers - a.kilometers;
      return 0;
    });
  }, [vehicles, searchQuery, filters, sortOption]);

  // Paginated View
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const paginatedVehicles = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredVehicles.slice(start, start + itemsPerPage);
  }, [filteredVehicles, currentPage]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={[{ label: 'Browse Vehicles' }]} />

      {/* Page Title & Search Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Second-Hand Vehicle Marketplace
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Showing <span className="font-bold text-slate-800">{filteredVehicles.length}</span> demo vehicles available for sale
          </p>
        </div>

        {/* Live Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by brand, model, vehicle name..."
            aria-label="Search vehicles by brand or model"
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          />
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters (Desktop) */}
        <div className="hidden lg:block lg:col-span-1">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            resetFilters={resetFilters}
          />
        </div>

        {/* Vehicle Grid & Controls */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Top Sort & Mobile Filter Toggle Bar */}
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 text-xs font-semibold">
            
            {/* Mobile Filter Drawer Button */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-800 font-bold"
              aria-label="Open search filters drawer"
            >
              <Filter className="w-4 h-4 text-blue-600" />
              <span>Filters</span>
            </button>

            <span className="hidden sm:inline text-slate-500">
              Page {currentPage} of {totalPages || 1}
            </span>

            {/* SRS Sorting Options Dropdown */}
            <div className="flex items-center gap-2 ml-auto">
              <ArrowUpDown className="w-4 h-4 text-slate-400" />
              <span className="text-slate-500 hidden sm:inline">Sort By:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                aria-label="Sort vehicles by"
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest Vehicles</option>
                <option value="oldest">Oldest Vehicles</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="km-asc">Lowest Kilometers</option>
                <option value="km-desc">Highest Kilometers</option>
              </select>
            </div>

          </div>

          {/* Loading Indicator or Vehicles Cards Grid */}
          {isLoading ? (
            <LoadingSpinner text="Updating vehicle results..." />
          ) : paginatedVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedVehicles.map(vehicle => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            /* SRS Empty State */
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4 my-8">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
                <Car className="w-8 h-8" />
              </div>
              <h3 className="font-extrabold text-slate-800 text-xl">No vehicles found</h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                No vehicles found. Try changing your search filters.
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-2xl shadow-sm transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                Reset All Filters
              </button>
            </div>
          )}

          {/* Pagination Controls */}
          {!isLoading && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}

        </div>

      </div>

      {/* Mobile Filter Drawer Modal */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-sm h-full overflow-y-auto p-4 animate-in slide-in-from-right duration-200">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              resetFilters={resetFilters}
              onCloseMobile={() => setMobileFiltersOpen(false)}
            />
          </div>
        </div>
      )}

    </div>
  );
};
