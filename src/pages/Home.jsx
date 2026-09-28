import React from 'react';
import { Link } from 'react-router-dom';
import { useVehicles } from '../context/VehicleContext';
import { SearchBar } from '../components/SearchBar';
import { VehicleCard } from '../components/VehicleCard';
import { BRANDS_LIST, TESTIMONIALS_LIST } from '../data/vehicles';
import { Car, ShieldCheck, Zap, Award, ArrowRight, Star, PlusCircle, CheckCircle2, ThumbsUp } from 'lucide-react';

export const Home = () => {
  const { vehicles } = useVehicles();

  const featuredVehicles = vehicles.filter(v => v.isFeatured).slice(0, 6);
  const recentVehicles = vehicles.filter(v => v.isRecent).slice(0, 6);

  const categories = [
    { title: 'SUV', count: '85+ Available', icon: '🚙', path: '/vehicles?type=SUV' },
    { title: 'Sedan', count: '60+ Available', icon: '🚘', path: '/vehicles?type=Sedan' },
    { title: 'Hatchback', count: '90+ Available', icon: '🚗', path: '/vehicles?type=Hatchback' },
    { title: 'Electric EV', count: '30+ Available', icon: '⚡', path: '/vehicles?fuel=Electric' },
    { title: 'Bikes', count: '45+ Available', icon: '🏍️', path: '/vehicles?type=Bike' }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Search Section */}
      <section className="relative pt-12 pb-20 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white overflow-hidden">
        {/* Background Ambient Blur */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider">
              <SparklesIcon /> Second-Hand Vehicle Marketplace Demo
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Find Your Perfect <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-400 bg-clip-text text-transparent">
                Pre-Owned Vehicle
              </span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg font-medium">
              Browse demo second-hand vehicle listings across cars, SUVs, sedans, and bikes with zero commission and direct seller contact.
            </p>
          </div>

          {/* Embedded Search Bar Component */}
          <SearchBar className="max-w-5xl mx-auto" />

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12 text-center">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <p className="text-2xl sm:text-3xl font-extrabold text-blue-400">1,000+</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">Demo Listings</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">Demo</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">Demo Verified Status</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">200 Point</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">Inspection Checklist</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <p className="text-2xl sm:text-3xl font-extrabold text-indigo-400">₹0</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">Buyer Fee</p>
            </div>
          </div>

        </div>
      </section>

      {/* Vehicle Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Explore by Category</h2>
            <p className="text-sm text-slate-500 mt-1">Find the exact vehicle body type to suit your lifestyle</p>
          </div>
          <Link to="/vehicles" className="hidden sm:flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700">
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.path}
              className="group bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all text-center flex flex-col items-center justify-center"
            >
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</span>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600">{cat.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{cat.count}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Vehicles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Top Handpicked</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Featured Vehicles</h2>
          </div>
          <Link to="/vehicles" className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700">
            <span>Explore All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVehicles.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      {/* Sell Your Vehicle Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-4 max-w-xl relative z-10">
            <span className="px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-extrabold uppercase">Fast & Easy</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              Want to Sell Your Car or Bike at the Best Market Price?
            </h2>
            <p className="text-blue-100 text-sm sm:text-base">
              Create a listing in under 2 minutes. Connect directly with buyers in your city without middleman fees!
            </p>
            <div className="pt-2">
              <Link
                to="/sell"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm rounded-2xl shadow-lg transition-all hover:scale-105"
              >
                <PlusCircle className="w-5 h-5" />
                Post Free Vehicle Listing
              </Link>
            </div>
          </div>

          <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-7xl shrink-0 backdrop-blur-md">
            🚘
          </div>
        </div>
      </section>

      {/* Recently Added Vehicles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Fresh Arrivals</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Recently Added Listings</h2>
          </div>
          <Link to="/vehicles?sort=newest" className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700">
            <span>View Newest</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentVehicles.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      {/* Popular Brands Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Popular Brands</h2>
          <p className="text-sm text-slate-500 mt-1">Select your favorite manufacturer to browse available listings</p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {BRANDS_LIST.map((brand, idx) => (
            <Link
              key={idx}
              to={`/vehicles?brand=${encodeURIComponent(brand.name)}`}
              className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all text-center flex flex-col items-center justify-center group"
            >
              <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">{brand.logo}</span>
              <span className="font-bold text-slate-800 text-sm group-hover:text-blue-600">{brand.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">The AutoMarket Edge</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Why Choose Us</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto text-xl font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Demo Vehicle Listings</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Explore pre-owned vehicles with detailed specifications, features, and direct seller contact details.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto text-xl font-bold">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Instant Direct Contact</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Connect directly with vehicle owners via phone or in-app messaging with zero delay.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Side-by-Side Comparison</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Compare specs, pricing, mileage, and features of multiple vehicles side by side easily.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mx-auto text-xl font-bold">
                <ThumbsUp className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Best Market Value</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Fair valuation guidance ensures buyers get transparent prices and sellers get top value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews & Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Customer Feedback</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">What Our Users Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_LIST.map(t => (
            <div key={t.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center text-amber-400 space-x-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm italic leading-relaxed">"{t.comment}"</p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                  <p className="text-xs text-slate-400">{t.role} • {t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

const SparklesIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);
