import React, { useState, useEffect } from 'react';
import { UserStats } from '../types/transit';
import { Activity, Zap, Flame, ShieldAlert, Cpu } from 'lucide-react';

interface HeaderHUDProps {
  profile: UserStats | null;
  audioEnabled: boolean;
  onToggleAudio: () => void;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({ profile, audioEnabled, onToggleAudio }) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeStr(
        now.toTimeString().split(' ')[0] +
        '.' +
        String(now.getMilliseconds()).padStart(3, '0').slice(0, 2)
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 95);
    return () => clearInterval(interval);
  }, []);

  const clearanceTitles: Record<number, string> = {
    1: 'DRONE COMMUTER',
    2: 'STREET RUNNER',
    3: 'GRID PHANTOM',
    4: 'MASTER ARCHITECT'
  };

  const level = profile?.clearanceLevel || 1;
  const levelTitle = clearanceTitles[level] || 'GRID RUNNER';
  const currentXp = profile?.xp || 0;
  const nextLevelXp = level === 1 ? 100 : level === 2 ? 250 : level === 3 ? 500 : 1000;
  const prevLevelXp = level === 1 ? 0 : level === 2 ? 100 : level === 3 ? 250 : 500;
  const progressPercent = Math.min(100, Math.max(5, ((currentXp - prevLevelXp) / (nextLevelXp - prevLevelXp)) * 100));

  return (
    <header className="border-b-2 border-cyber-border bg-[#0a0c12]/95 backdrop-blur-md sticky top-0 z-30 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 border-2 border-[#00FF66] bg-black flex items-center justify-center shadow-brutal-green">
            <Zap className="w-6 h-6 text-[#00FF66] animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-display font-black text-xl tracking-wider text-white">
                NEXUS<span className="text-[#00FF66]">//</span>GRID
              </span>
              <span className="text-[10px] bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/40 px-1.5 py-0.5 tracking-widest font-bold">
                PROTO-V2.4
              </span>
            </div>
            <div className="text-[11px] text-gray-400 flex items-center space-x-2 font-mono">
              <span className="inline-block w-2 h-2 rounded-full bg-[#00FF66] animate-ping" />
              <span>SYS_TIME: <span className="text-white font-bold">{timeStr}</span></span>
              <span className="text-[#A855F7]">|</span>
              <span className="text-gray-400">NET: <span className="text-[#00FF66]">ALL NODES SYNCED</span></span>
            </div>
          </div>
        </div>

        {/* Commuter Telemetry & Gamification Status */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          
          {/* Carbon Shredder */}
          <div className="bg-[#121622] border-2 border-cyber-border px-3 py-1.5 flex items-center space-x-2">
            <Activity className="w-4 h-4 text-[#00F0FF]" />
            <div>
              <div className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">CO₂ Offset</div>
              <div className="font-bold text-[#00F0FF]">
                {(profile?.carbonSavedGrams || 0).toLocaleString()}g
              </div>
            </div>
          </div>

          {/* Transit Streak */}
          <div className="bg-[#121622] border-2 border-cyber-border px-3 py-1.5 flex items-center space-x-2">
            <Flame className="w-4 h-4 text-[#FFB800] fill-[#FFB800]/20" />
            <div>
              <div className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Grid Streak</div>
              <div className="font-bold text-[#FFB800]">
                {profile?.streakDays || 1} DAYS SYNC
              </div>
            </div>
          </div>

          {/* Clearance Level & XP Meter */}
          <div className="bg-[#121622] border-2 border-[#A855F7] px-3 py-1.5 min-w-[170px] shadow-brutal-purple">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[9px] text-[#A855F7] font-bold tracking-widest">
                LVL {level}: {levelTitle}
              </span>
              <span className="text-[10px] font-bold text-gray-300">
                {currentXp} / {nextLevelXp} XP
              </span>
            </div>
            {/* XP Bar */}
            <div className="w-full bg-black h-2 border border-cyber-border overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#A855F7] to-[#00FF66] h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={onToggleAudio}
            title={audioEnabled ? "Cyber Audio Synthesizer ON" : "Audio Synthesizer Muted"}
            className={`border-2 px-2.5 py-2 font-bold flex items-center space-x-1 transition-all ${
              audioEnabled 
                ? 'border-[#00FF66] bg-[#00FF66]/15 text-[#00FF66]' 
                : 'border-gray-700 bg-transparent text-gray-500 hover:text-gray-300'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span className="text-[10px] tracking-wider">{audioEnabled ? 'SYNTH ON' : 'MUTED'}</span>
          </button>

        </div>
      </div>
    </header>
  );
};
