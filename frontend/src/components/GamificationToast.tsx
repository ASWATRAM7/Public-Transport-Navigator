import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';

export interface ToastPayload {
  id: string;
  xpGained: number;
  carbonSavedGrams: number;
}

interface GamificationToastProps {
  toast: ToastPayload | null;
  onClose: () => void;
}

export const GamificationToast: React.FC<GamificationToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#1A1A1A] text-[#F9F8F6] p-4 shadow-2xl rounded-none sm:rounded-sm border border-white/10 pointer-events-auto"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="w-7 h-7 bg-white text-[#1A1A1A] flex items-center justify-center flex-shrink-0 rounded-none sm:rounded-xs mt-0.5">
            <Check className="w-4 h-4 stroke-[2.5]" />
          </div>

          <div className="flex-1 space-y-1">
            <div className="text-[10px] font-sans font-semibold uppercase tracking-widest text-[#C26A4A]">
              Itinerary Recorded
            </div>
            <div className="text-sm font-sans font-medium text-white tracking-normal">
              Route Selected: +{toast.xpGained} XP. Carbon Saved: {toast.carbonSavedGrams.toLocaleString()}g.
            </div>
            <div className="text-xs text-[#8C8C8C]">
              Updated to your personal Chennai mobility balance.
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#8C8C8C] hover:text-white p-1 cursor-pointer transition-colors"
            aria-label="Dismiss Notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
