import React, { useState } from 'react';
import { Stop, RouteSearchResult } from '../types/transit';
import { Radio, Crosshair, MapPin } from 'lucide-react';

interface LivePulseMapProps {
  stops: Stop[];
  activeRoute: RouteSearchResult | null;
  onSelectStation: (code: string) => void;
  onPlaySound?: () => void;
}

export const LivePulseMap: React.FC<LivePulseMapProps> = ({
  stops,
  activeRoute,
  onSelectStation,
  onPlaySound
}) => {
  const [hoveredStop, setHoveredStop] = useState<Stop | null>(null);

  // Line paths connecting coordinates:
  // Line-N (Neon Green): SEC-07(100,140) -> NEON-D(260,200) -> UND-GRD(420,260) -> MEGA-CR(590,210) -> CYB-DCK(740,140)
  const lineNPath = "M 100 140 L 260 200 L 420 260 L 590 210 L 740 140";

  // Line-P (Hyper Purple): AURA-TW(200,380) -> NEON-D(260,200) -> UND-GRD(420,260) -> SLN-RDG(440,410)
  const linePPath = "M 200 380 L 260 200 L 420 260 L 440 410";

  // Line-A (Solar Amber): SLN-RDG(440,410) -> VAPOR-WY(620,360) -> MEGA-CR(590,210)
  const lineAPath = "M 440 410 L 620 360 L 590 210";

  // Compute active highlight path if a route is selected
  const activePathD = React.useMemo(() => {
    if (!activeRoute || activeRoute.fullPath.length < 2) return '';
    return activeRoute.fullPath
      .map((node, index) => `${index === 0 ? 'M' : 'L'} ${node.x} ${node.y}`)
      .join(' ');
  }, [activeRoute]);

  const isStopInActiveRoute = (code: string) => {
    if (!activeRoute) return false;
    return activeRoute.fullPath.some(s => s.code === code);
  };

  const isOriginOrDest = (code: string) => {
    if (!activeRoute) return null;
    if (activeRoute.fromStop.code === code) return 'ORIGIN';
    if (activeRoute.toStop.code === code) return 'DESTINATION';
    return null;
  };

  return (
    <div className="bg-[#090b11] border-2 border-cyber-border brutal-card p-4 sm:p-5 relative overflow-hidden">
      {/* HUD Header for Map */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyber-border pb-3 mb-3">
        <div className="flex items-center space-x-2">
          <Radio className="w-5 h-5 text-[#00F0FF] animate-pulse" />
          <span className="font-mono text-xs font-bold tracking-widest text-[#00F0FF] uppercase">
            LIVE//PULSE-SCHEMATIC MAP
          </span>
          <span className="text-[10px] bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30 px-1.5 py-0.2 font-mono">
            3 ACTIVE PULSE LINES
          </span>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-3 text-[10px] font-mono">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 bg-[#00FF66] inline-block shadow-glow-green" />
            <span className="text-gray-300">LINE-N (PULSE)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 bg-[#A855F7] inline-block shadow-glow-purple" />
            <span className="text-gray-300">LINE-P (EXPRESS)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 bg-[#FFB800] inline-block" />
            <span className="text-gray-300">LINE-A (ORBITAL)</span>
          </div>
        </div>
      </div>

      {/* Interactive Cyber SVG Canvas */}
      <div className="relative w-full aspect-[16/9] min-h-[300px] max-h-[460px] bg-[#050609] border border-cyber-border overflow-hidden select-none">
        
        {/* Background Grid Accent Lines */}
        <svg
          viewBox="0 0 840 500"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Grid Pattern */}
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
            </pattern>
            {/* Glow Filter for Active Route */}
            <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid Background */}
          <rect width="840" height="500" fill="url(#smallGrid)" />

          {/* Sector Overlay Boundaries (Cyberpunk aesthetics) */}
          <circle cx="420" cy="250" r="180" fill="none" stroke="rgba(0, 240, 255, 0.05)" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="420" cy="250" r="280" fill="none" stroke="rgba(168, 85, 247, 0.04)" strokeWidth="1" strokeDasharray="6 8" />

          {/* Base Transit Line Tubes */}
          {/* Line N */}
          <path d={lineNPath} fill="none" stroke="#00FF66" strokeWidth="6" strokeOpacity="0.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d={lineNPath} fill="none" stroke="#00FF66" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Animated Train Pulse for Line N */}
          <path d={lineNPath} fill="none" stroke="#FFFFFF" strokeWidth="3" className="svg-track-pulse" strokeLinecap="round" />

          {/* Line P */}
          <path d={linePPath} fill="none" stroke="#A855F7" strokeWidth="6" strokeOpacity="0.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d={linePPath} fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Animated Train Pulse for Line P */}
          <path d={linePPath} fill="none" stroke="#FFFFFF" strokeWidth="3" className="svg-track-pulse" strokeLinecap="round" />

          {/* Line A */}
          <path d={lineAPath} fill="none" stroke="#FFB800" strokeWidth="6" strokeOpacity="0.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d={lineAPath} fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Animated Train Pulse for Line A */}
          <path d={lineAPath} fill="none" stroke="#FFFFFF" strokeWidth="3" className="svg-track-pulse" strokeLinecap="round" />

          {/* Active Route Highlighting Path */}
          {activePathD && (
            <path
              d={activePathD}
              fill="none"
              stroke="#00FFFF"
              strokeWidth="5"
              filter="url(#neonGlow)"
              strokeDasharray="6 4"
              className="animate-pulse"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Station Nodes */}
          {stops.map((stop) => {
            const isHighlight = isStopInActiveRoute(stop.code);
            const endpointType = isOriginOrDest(stop.code);
            const isHovered = hoveredStop?.code === stop.code;

            return (
              <g
                key={stop.id}
                className="cursor-pointer transition-transform"
                onClick={() => {
                  onSelectStation(stop.code);
                  onPlaySound?.();
                }}
                onMouseEnter={() => setHoveredStop(stop)}
                onMouseLeave={() => setHoveredStop(null)}
              >
                {/* Outer Pulse Rings if selected or hovered */}
                {(isHighlight || isHovered) && (
                  <circle
                    cx={stop.x}
                    cy={stop.y}
                    r="16"
                    fill="none"
                    stroke={endpointType ? '#FF007A' : '#00FF66'}
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    className="animate-spin origin-center"
                    style={{ transformOrigin: `${stop.x}px ${stop.y}px` }}
                  />
                )}

                {/* Base Node Circle */}
                <circle
                  cx={stop.x}
                  cy={stop.y}
                  r={isHovered ? 9 : 7}
                  fill={endpointType ? '#FF007A' : isHighlight ? '#00FF66' : '#0e121d'}
                  stroke={isHighlight ? '#FFFFFF' : '#4b5563'}
                  strokeWidth="2.5"
                />

                {/* Inner Core */}
                <circle
                  cx={stop.x}
                  cy={stop.y}
                  r="3"
                  fill="#FFFFFF"
                />

                {/* Station Label */}
                <text
                  x={stop.x}
                  y={stop.y - 12}
                  textAnchor="middle"
                  fill={isHighlight ? '#00FF66' : isHovered ? '#FFFFFF' : '#9ca3af'}
                  fontSize="10"
                  fontFamily="'JetBrains Mono', monospace"
                  fontWeight={isHighlight || isHovered ? '700' : '500'}
                  className="pointer-events-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
                >
                  {stop.code}
                </text>

                {/* Station Sector Subtext */}
                <text
                  x={stop.x}
                  y={stop.y + 18}
                  textAnchor="middle"
                  fill="#6b7280"
                  fontSize="8"
                  fontFamily="'JetBrains Mono', monospace"
                  className="pointer-events-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                >
                  {stop.name.split(' ')[0]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Station Telemetry Tooltip */}
        {hoveredStop && (
          <div
            className="absolute top-3 left-3 bg-black/90 border-2 border-[#00FF66] p-2.5 font-mono text-xs shadow-brutal-green pointer-events-none z-10"
          >
            <div className="flex items-center space-x-1.5 text-[#00FF66] font-bold">
              <Crosshair className="w-3.5 h-3.5 animate-spin" />
              <span>STATION: [{hoveredStop.code}] {hoveredStop.name}</span>
            </div>
            <div className="text-[10px] text-gray-400 mt-0.5">
              SECTOR: <span className="text-white">{hoveredStop.sector}</span> | ZONE: <span className="text-white">{hoveredStop.zone}</span>
            </div>
            <div className="text-[9px] text-gray-500 mt-1">
              CLICK TO SET IN NAVIGATION TERMINAL
            </div>
          </div>
        )}
      </div>

      <div className="mt-2 text-[11px] font-mono text-gray-400 flex items-center justify-between">
        <span>INTERACTIVE TOPOLOGY: Click station nodes to select coordinates</span>
        <span className="text-[#00FF66]">GRID STATUS: ACTIVE</span>
      </div>
    </div>
  );
};
