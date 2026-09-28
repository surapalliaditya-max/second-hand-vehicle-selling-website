import React from 'react';
import { Link } from 'react-router-dom';
import { Car, ShieldCheck, Phone, Mail, MapPin, Heart, ArrowRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                <Car className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Auto<span className="text-blue-500">Market</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Second-Hand Vehicle Selling Website. Browse demo pre-owned cars, bikes, and SUVs with full transparency and direct seller contact.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Direct Seller Contact</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <Car className="w-4 h-4 text-blue-400" />
                <span>200+ Active Listings</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/vehicles" className="hover:text-blue-400 transition-colors">Browse Vehicles</Link>
              </li>
              <li>
                <Link to="/sell" className="hover:text-blue-400 transition-colors">Sell Your Vehicle</Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-blue-400 transition-colors">Compare Vehicles</Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-blue-400 transition-colors">Saved Favorites</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors">Help & Contact</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Popular Types</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/vehicles?type=SUV" className="hover:text-blue-400 transition-colors">Used SUVs</Link>
              </li>
              <li>
                <Link to="/vehicles?type=Sedan" className="hover:text-blue-400 transition-colors">Used Sedans</Link>
              </li>
              <li>
                <Link to="/vehicles?type=Hatchback" className="hover:text-blue-400 transition-colors">Hatchback Cars</Link>
              </li>
              <li>
                <Link to="/vehicles?fuel=Electric" className="hover:text-blue-400 transition-colors">Electric Vehicles (EVs)</Link>
              </li>
              <li>
                <Link to="/vehicles?type=Bike" className="hover:text-blue-400 transition-colors">Second Hand Bikes</Link>
              </li>
              <li>
                <Link to="/vehicles?fuel=CNG" className="hover:text-blue-400 transition-colors">CNG Mileage Cars</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Contact Info</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>AutoMarket Demo Office, Hyderabad, Telangana 500081</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1234567890</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>support@example.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} AutoMarket Marketplace Inc. All rights reserved. (B.Tech Major Project)</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Disclaimer</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
