import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const ImageGallery = ({ images = [], title = "" }) => {
  const defaultImage = "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80";
  const galleryImages = images.length > 0 ? images : [defaultImage];

  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image View */}
      <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md group">
        <img
          src={galleryImages[activeIndex]}
          alt={`${title} view ${activeIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
        />

        {/* Floating Zoom Lightbox Button */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute top-4 right-4 bg-slate-900/80 hover:bg-slate-900 text-white p-2.5 rounded-2xl backdrop-blur-md transition-all shadow-lg"
          title="Open Fullscreen Gallery"
        >
          <Maximize2 className="w-5 h-5" />
        </button>

        {/* Carousel Arrow Controls */}
        {galleryImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full backdrop-blur-md shadow-md transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full backdrop-blur-md shadow-md transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        <div className="absolute bottom-4 left-4 bg-slate-950/75 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">
          Photo {activeIndex + 1} of {galleryImages.length}
        </div>
      </div>

      {/* Thumbnails Row */}
      {galleryImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 custom-scrollbar">
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-24 h-16 rounded-2xl overflow-hidden border-2 shrink-0 transition-all ${
                activeIndex === idx
                  ? 'border-blue-600 ring-2 ring-blue-500/20 scale-105'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 rounded-full bg-slate-800/80 transition-colors"
          >
            <X className="w-7 h-7" />
          </button>

          <div className="relative max-w-5xl w-full max-h-[85vh] flex items-center justify-center">
            <img
              src={galleryImages[activeIndex]}
              alt={title}
              className="max-h-[80vh] w-auto object-contain rounded-2xl shadow-2xl"
            />

            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-slate-800/80 hover:bg-slate-700 text-white p-3 rounded-full"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-800/80 hover:bg-slate-700 text-white p-3 rounded-full"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
