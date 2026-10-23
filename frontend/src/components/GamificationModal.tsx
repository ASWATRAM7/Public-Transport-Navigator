import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Leaf, Zap, Check, Sparkles } from 'lucide-react';
import { ScanRewardResult } from '../types/transit';

interface GamificationModalProps {
  rewardData: ScanRewardResult | null;
  isOpen: boolean;
  onClose: () => void;
  onPlaySound?: () => void;
}

export const GamificationModal: React.FC<GamificationModalProps> = ({
  rewardData,
  isOpen,
  onClose,
  onPlaySound
}) => {
  if (!isOpen || !rewardData) return null;

  const user = rewardData.stats || rewardData.profile || {
    username: 'CYBER_NOMAD_99',
    clearanceLevel: 2,
    xp: 180,
    carbonSavedGrams: 4280,
    streakDays: 6
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="bg-[#0b0e17] border-4 border-[#00FF66] shadow-[8px_8px_0px_#00FF66] max-w-md w-full p-6 text-white font-mono relative overflow-hidden"
        >
          {/* Cyberpunk Top Accent Ribbon */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00FF66] via-[#A855F7] to-[#FF007A]" />

          {/* Header */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-black border-2 border-[#00FF66] flex items-center justify-center shadow-glow-green">
              <Award className="w-7 h-7 text-[#00FF66] animate-bounce" />
            </div>
            <div>
              <div className="text-[10px] text-[#00FF66] font-bold tracking-widest uppercase">
                COMMUTER PROTOCOL ACCREDITATION
              </div>
              <h2 className="font-display font-black text-xl text-white">
                ROUTE SCANNED & LOCKED!
              </h2>
            </div>
          </div>

          {/* Reward Badges Grid */}
          <div className="grid grid-cols-2 gap-3 my-5">
            {/* XP Award */}
            <div className="bg-[#121622] border-2 border-[#A855F7] p-3 text-center shadow-brutal-purple">
              <div className="flex justify-center mb-1">
                <Zap className="w-5 h-5 text-[#A855F7]" />
              </div>
              <div className="text-2xl font-black text-[#A855F7]">
                +{rewardData.reward.xpGained} XP
              </div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">
                Commuter Clearance
              </div>
            </div>

            {/* Carbon Saved */}
            <div className="bg-[#121622] border-2 border-[#00F0FF] p-3 text-center shadow-brutal-cyan">
              <div className="flex justify-center mb-1">
                <Leaf className="w-5 h-5 text-[#00F0FF]" />
              </div>
              <div className="text-2xl font-black text-[#00F0FF]">
                +{rewardData.reward.carbonSavedGrams}g
              </div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider">
                CO₂ Offset Saved
              </div>
            </div>
          </div>

          {/* Level Up Notice if applicable */}
          {rewardData.reward.levelUp && (
            <div className="my-3 p-3 bg-[#381604] border-2 border-[#FFB800] text-[#FFB800] text-xs font-bold flex items-center space-x-2 animate-pulse">
              <Sparkles className="w-5 h-5" />
              <span>
                CLEARANCE RANK UP: PROMOTED TO LEVEL {user.clearanceLevel}!
              </span>
            </div>
          )}

          {/* Commuter Status Footnote */}
          <div className="text-xs text-gray-400 bg-black/60 p-3 border border-gray-800 space-y-1 mb-5">
            <div className="flex justify-between">
              <span>COMMUTER IDENTITY:</span>
              <span className="text-white font-bold">{user.username}</span>
            </div>
            <div className="flex justify-between">
              <span>TOTAL ACCUMULATED XP:</span>
              <span className="text-[#A855F7] font-bold">{user.xp} XP</span>
            </div>
            <div className="flex justify-between">
              <span>TOTAL CARBON SHREDDED:</span>
              <span className="text-[#00F0FF] font-bold">{user.carbonSavedGrams.toLocaleString()}g CO₂</span>
            </div>
            <div className="flex justify-between">
              <span>GRID SYNC STREAK:</span>
              <span className="text-[#FFB800] font-bold">{user.streakDays} DAYS</span>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            id="close-gamification-modal-btn"
            type="button"
            onClick={() => {
              onPlaySound?.();
              onClose();
            }}
            className="w-full py-3 bg-[#00FF66] border-2 border-[#00FF66] text-black font-black uppercase text-xs tracking-widest shadow-brutal-green hover:bg-white transition-all flex items-center justify-center space-x-2"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>ACKNOWLEDGE TELEMETRY & CLOSE</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
