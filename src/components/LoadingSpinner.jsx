import React from 'react';

export const LoadingSpinner = ({ text = "Loading vehicles...", fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex flex-col items-center justify-center p-4">
        <div className="bg-white p-6 rounded-3xl shadow-2xl flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <span className="text-xs font-bold text-slate-800">{text}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-3">
      <div className="w-9 h-9 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      <span className="text-xs font-bold text-slate-500">{text}</span>
    </div>
  );
};
