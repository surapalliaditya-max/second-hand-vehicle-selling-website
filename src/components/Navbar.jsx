import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useVehicles } from '../context/VehicleContext';
import { Car, Heart, Scale, PlusCircle, User, Menu, X, LogOut, LayoutDashboard, Search } from 'lucide-react';

export const Navbar = () => {
  const { favorites, compareList, user, logoutUser } = useVehicles();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <Car className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 leading-none">
                Auto<span className="text-blue-600">Market</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-0.5">
                Second-Hand Vehicle Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive('/') ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Home
            </Link>
            
            <Link
              to="/vehicles"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive('/vehicles') ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Buy Vehicle
            </Link>

            <Link
              to="/compare"
              className={`relative px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                isActive('/compare') ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Scale className="w-4 h-4" />
              Compare
              {compareList.length > 0 && (
                <span className="ml-1 bg-blue-600 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full">
                  {compareList.length}
                </span>
              )}
            </Link>

            <Link
              to="/favorites"
              className={`relative px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                isActive('/favorites') ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Heart className="w-4 h-4" />
              Favorites
              {favorites.length > 0 && (
                <span className="ml-1 bg-rose-500 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full">
                  {favorites.length}
                </span>
              )}
            </Link>

            <Link
              to="/contact"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive('/contact') ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Right Action CTA & User Profile */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/sell"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold shadow-sm shadow-amber-500/30 transition-all hover:shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              Sell Vehicle
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-sm font-semibold text-slate-800 max-w-[120px] truncate">
                    {user.name}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                      <p className="text-sm font-bold text-slate-800 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                    >
                      <LayoutDashboard className="w-4 h-4 text-blue-600" />
                      Dashboard
                    </Link>
                    <Link
                      to="/dashboard?tab=listings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                    >
                      <Car className="w-4 h-4 text-slate-400" />
                      My Listings
                    </Link>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logoutUser();
                        navigate('/');
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 border-t border-slate-100 mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/30 transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/sell"
              className="p-2 rounded-lg bg-amber-500 text-white font-bold text-xs"
            >
              + Sell
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2.5 rounded-xl font-semibold text-base ${isActive('/') ? 'bg-blue-50 text-blue-600' : 'text-slate-700'}`}
          >
            Home
          </Link>
          <Link
            to="/vehicles"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2.5 rounded-xl font-semibold text-base ${isActive('/vehicles') ? 'bg-blue-50 text-blue-600' : 'text-slate-700'}`}
          >
            Buy Vehicle
          </Link>
          <Link
            to="/compare"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold text-base ${isActive('/compare') ? 'bg-blue-50 text-blue-600' : 'text-slate-700'}`}
          >
            <span>Compare Vehicles</span>
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-bold">{compareList.length}</span>
          </Link>
          <Link
            to="/favorites"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold text-base ${isActive('/favorites') ? 'bg-blue-50 text-blue-600' : 'text-slate-700'}`}
          >
            <span>Saved Favorites</span>
            <span className="bg-rose-100 text-rose-700 text-xs px-2 py-0.5 rounded-full font-bold">{favorites.length}</span>
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2.5 rounded-xl font-semibold text-base ${isActive('/contact') ? 'bg-blue-50 text-blue-600' : 'text-slate-700'}`}
          >
            Contact Support
          </Link>

          <div className="pt-4 border-t border-slate-100">
            {user ? (
              <div className="space-y-2">
                <div className="px-3 py-2 bg-slate-50 rounded-xl">
                  <p className="text-xs text-slate-400 font-medium">Logged in as</p>
                  <p className="text-sm font-bold text-slate-800">{user.name} ({user.email})</p>
                </div>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center w-full py-2.5 bg-blue-600 text-white rounded-xl font-bold"
                >
                  Go to Dashboard
                </Link>
                <button
                  onClick={() => {
                    logoutUser();
                    setMobileMenuOpen(false);
                  }}
                  className="block text-center w-full py-2.5 bg-rose-50 text-rose-600 rounded-xl font-bold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-2.5 border border-slate-200 text-slate-800 font-bold rounded-xl"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-2.5 bg-blue-600 text-white font-bold rounded-xl"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
