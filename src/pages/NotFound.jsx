import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Home, Search } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
      
      <div className="w-24 h-24 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto text-4xl shadow-inner">
        <AlertCircle className="w-12 h-12" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-500">Error 404</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900">Page Not Found</h1>
        <p className="text-slate-500 text-sm max-w-md mx-auto">
          The page or vehicle record you are trying to access does not exist, has been moved, or is no longer available.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <Link
          to="/"
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
        <Link
          to="/vehicles"
          className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-2xl transition-colors flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4" />
          <span>Browse Marketplace</span>
        </Link>
      </div>

    </div>
  );
};
