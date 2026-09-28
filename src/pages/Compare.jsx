import React from 'react';
import { Link } from 'react-router-dom';
import { useVehicles } from '../context/VehicleContext';
import { Breadcrumb } from '../components/Breadcrumb';
import { Scale, Trash2, Plus, Check, X, ArrowRight } from 'lucide-react';

export const Compare = () => {
  const { vehicles, compareList, removeFromCompare, clearCompare } = useVehicles();

  const comparedVehicles = vehicles.filter(v => compareList.includes(v.id));

  // Helper format price
  const formatPrice = (price) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(2)} Lakh`;
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const featureChecklist = [
    'Air Conditioning',
    'Power Windows',
    'ABS',
    'Airbags',
    'Parking Sensors',
    'Rear Camera',
    'Bluetooth',
    'Touchscreen',
    'Sunroof'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Vehicle Comparison' }]} />

      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Side-by-Side Vehicle Comparison</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Comparing <strong className="text-slate-800">{comparedVehicles.length}</strong> of 4 maximum allowed vehicles.
          </p>
        </div>

        {comparedVehicles.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={clearCompare}
              className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Matrix</span>
            </button>
            <Link
              to="/vehicles"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Vehicle</span>
            </Link>
          </div>
        )}
      </div>

      {/* Comparison Table / Matrix */}
      {comparedVehicles.length > 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Scrollable Container for Horizontal Scrolling */}
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[650px]">
              
              {/* Table Header: Vehicle Thumbnail & Name */}
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70">
                  <th className="p-4 sm:p-6 w-48 text-slate-400 font-extrabold text-xs uppercase tracking-wider">
                    Specification
                  </th>
                  {comparedVehicles.map(v => (
                    <th key={v.id} className="p-4 sm:p-6 min-w-[220px] max-w-[260px] align-top">
                      <div className="relative space-y-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
                        <button
                          onClick={() => removeFromCompare(v.id)}
                          className="absolute -top-2 -right-2 p-1.5 bg-rose-500 text-white rounded-full shadow-md hover:bg-rose-600 transition-colors z-10"
                          title="Remove from comparison"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        
                        <img
                          src={v.images && v.images.length > 0 ? v.images[0] : "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80"}
                          alt={v.title}
                          className="w-full h-32 object-cover rounded-xl"
                        />

                        <div>
                          <span className="text-[10px] uppercase font-bold text-blue-600">{v.brand}</span>
                          <h4 className="font-extrabold text-slate-900 text-sm line-clamp-1">{v.model}</h4>
                          <span className="text-base font-extrabold text-slate-900 block mt-1">{formatPrice(v.price)}</span>
                        </div>

                        <Link
                          to={`/vehicles/${v.id}`}
                          className="block text-center py-2 bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table Body Specs */}
              <tbody className="divide-y divide-slate-100 text-xs">
                
                {/* Brand */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-500 bg-slate-50/30">Brand</td>
                  {comparedVehicles.map(v => (
                    <td key={v.id} className="p-4 font-bold text-slate-800">{v.brand}</td>
                  ))}
                </tr>

                {/* Model */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-500 bg-slate-50/30">Model</td>
                  {comparedVehicles.map(v => (
                    <td key={v.id} className="p-4 font-semibold text-slate-800">{v.model}</td>
                  ))}
                </tr>

                {/* Variant */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-500 bg-slate-50/30">Variant</td>
                  {comparedVehicles.map(v => (
                    <td key={v.id} className="p-4 text-slate-700">{v.variant || 'Standard'}</td>
                  ))}
                </tr>

                {/* Manufacturing Year */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-500 bg-slate-50/30">Year</td>
                  {comparedVehicles.map(v => (
                    <td key={v.id} className="p-4 font-extrabold text-blue-600">{v.year}</td>
                  ))}
                </tr>

                {/* Price */}
                <tr className="hover:bg-slate-50/50 bg-blue-50/20">
                  <td className="p-4 font-bold text-slate-700 bg-slate-50/50">Price</td>
                  {comparedVehicles.map(v => (
                    <td key={v.id} className="p-4 font-extrabold text-blue-700 text-sm">{formatPrice(v.price)}</td>
                  ))}
                </tr>

                {/* Fuel Type */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-500 bg-slate-50/30">Fuel Type</td>
                  {comparedVehicles.map(v => (
                    <td key={v.id} className="p-4 font-semibold text-slate-800">{v.fuel}</td>
                  ))}
                </tr>

                {/* Transmission */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-500 bg-slate-50/30">Transmission</td>
                  {comparedVehicles.map(v => (
                    <td key={v.id} className="p-4 font-semibold text-slate-800">{v.transmission}</td>
                  ))}
                </tr>

                {/* KM Driven */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-500 bg-slate-50/30">Kilometers Driven</td>
                  {comparedVehicles.map(v => (
                    <td key={v.id} className="p-4 font-bold text-slate-800">{v.kilometers.toLocaleString('en-IN')} km</td>
                  ))}
                </tr>

                {/* Number of Owners */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-500 bg-slate-50/30">Owners</td>
                  {comparedVehicles.map(v => (
                    <td key={v.id} className="p-4 font-medium text-slate-700">{v.owners} Owner</td>
                  ))}
                </tr>

                {/* Color */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-500 bg-slate-50/30">Color</td>
                  {comparedVehicles.map(v => (
                    <td key={v.id} className="p-4 font-medium text-slate-700">{v.color || 'Standard'}</td>
                  ))}
                </tr>

                {/* Location */}
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-500 bg-slate-50/30">Location</td>
                  {comparedVehicles.map(v => (
                    <td key={v.id} className="p-4 font-medium text-slate-700">{v.location}</td>
                  ))}
                </tr>

                {/* Features Matrix Header */}
                <tr className="bg-slate-100 font-extrabold text-slate-800 uppercase tracking-wider text-[11px]">
                  <td colSpan={comparedVehicles.length + 1} className="p-3">Features Comparison Matrix</td>
                </tr>

                {/* Feature checklist rows */}
                {featureChecklist.map(feat => (
                  <tr key={feat} className="hover:bg-slate-50/50">
                    <td className="p-4 font-semibold text-slate-600 bg-slate-50/30">{feat}</td>
                    {comparedVehicles.map(v => {
                      const hasFeat = v.features ? v.features.includes(feat) : true;
                      return (
                        <td key={v.id} className="p-4">
                          {hasFeat ? (
                            <span className="inline-flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
                              <Check className="w-3.5 h-3.5" /> Included
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-slate-400 font-medium bg-slate-100 px-2.5 py-1 rounded-full">
                              <X className="w-3.5 h-3.5" /> N/A
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}

              </tbody>
            </table>
          </div>

        </div>
      ) : (
        /* SRS Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4 my-8 max-w-lg mx-auto">
          <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mx-auto text-3xl">
            <Scale className="w-10 h-10" />
          </div>
          <h3 className="font-extrabold text-slate-800 text-xl">No vehicles selected for comparison</h3>
          <p className="text-slate-500 text-sm">
            Select up to 4 vehicles from the vehicle listing or details page to compare specs, prices, and features side by side.
          </p>
          <div className="pt-2">
            <Link
              to="/vehicles"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-2xl shadow-md transition-all"
            >
              <span>Select Vehicles to Compare</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
};
