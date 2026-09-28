import React from 'react';
import { useVehicles } from '../context/VehicleContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toast } = useVehicles();

  if (!toast) return null;

  const bgColors = {
    success: 'bg-emerald-900/90 text-white border-emerald-500',
    warning: 'bg-amber-900/90 text-white border-amber-500',
    info: 'bg-slate-900/90 text-white border-slate-700',
    error: 'bg-rose-900/90 text-white border-rose-500'
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className={`flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-2xl backdrop-blur-md transition-all duration-300 max-w-md ${bgColors[toast.type] || bgColors.info}`}>
        {icons[toast.type] || icons.info}
        <span className="text-sm font-medium">{toast.message}</span>
      </div>
    </div>
  );
};
