'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, ChevronDown, ChevronUp, X, ExternalLink } from 'lucide-react';

interface ProjectGalleryProps {
  images?: string[];
  projectTitle: string;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images, projectTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // If no images exist or array is empty, DO NOT RENDER ANYTHING
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 pt-3 border-t border-theme-border">
      {/* Minimal Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-theme-page hover:bg-theme-card text-theme-main text-xs font-mono border border-theme-border transition-colors cursor-pointer"
      >
        <ImageIcon className="w-3.5 h-3.5 text-theme-muted" />
        <span>Screenshots ({images.length})</span>
        {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>

      {/* Expandable Screenshot Grid */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden mt-3"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-3 rounded-xl bg-theme-page border border-theme-border">
              {images.map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(imgUrl)}
                  className="group relative h-36 rounded-lg overflow-hidden border border-theme-border bg-theme-card cursor-pointer transition-all duration-200 hover:border-theme-main"
                >
                  <img
                    src={imgUrl}
                    alt={`${projectTitle} screenshot ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center">
                    <span className="text-[11px] font-mono text-white bg-black/80 px-2.5 py-1 rounded border border-white/20 flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" /> Visualizar
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] rounded-xl overflow-hidden border border-theme-border bg-theme-card shadow-2xl"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 z-10 p-1.5 rounded-md bg-black/80 text-white hover:bg-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <img
                src={selectedImage}
                alt={`${projectTitle} full screenshot`}
                className="w-full h-full object-contain max-h-[80vh]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
