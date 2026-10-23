import React from 'react';
import { motion } from 'framer-motion';
import { RouteSearchResult } from '../types/transit';
import { Clock, Leaf, Repeat, Award, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

interface RouteVisualizerProps {
  result: RouteSearchResult | null;
  onScanRoute: () => void;
  isScanning: boolean;
  hasScanned: boolean;
}

export const RouteVisualizer: React.FC<RouteVisualizerProps> = ({
  result,
  onScanRoute,
  isScanning,
  hasScanned
}) => {
  if (!result) {
    return (
      <div className="bg-[#0b0d14] border-2 border-dashed border-gray-800 p-8 text-center flex flex-col items-center justify-center min-h-[320px]">
        <div className="w-12 h-12 border border-gray-700 bg-gray-900 flex items-center justify-center mb-3">
          <Zap className="w-6 h-6 text-gray-600 animate-pulse" />
        </div>
        <h4 className="font-mono text-sm uppercase tracking-widest text-gray-400 font-bold mb-1">
          AWAITING ROUTE TELEMETRY
        </h4>
        <p className="font-mono text-xs text-gray-600 max-w-sm">
          Select origin and target coordinates in the Command Terminal or execute a vector override command.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#0b0d14] border-2 border-[#00FF66] brutal-card p-4 sm:p-6 shadow-brutal-green">
      {/* Route Header Metrics Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-cyber-border pb-4 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono px-2 py-0.5 bg-[#00FF66] text-black font-black uppercase">
              ACTIVE VOYAGE TRACE
            </span>
            <span className="text-xs text-gray-400 font-mono">
              NODES: {result.fromStop.code} ➔ {result.toStop.code}
            </span>
          </div>
          <h3 className="font-display font-black text-xl text-white mt-1">
            {result.fromStop.name} to {result.toStop.name}
          </h3>
        </div>

        {/* Claim XP / Scan Button */}
        <button
          id="claim-xp-btn"
          type="button"
          onClick={onScanRoute}
          disabled={isScanning || hasScanned}
          className={`px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 border-2 transition-all ${
            hasScanned
              ? 'bg-[#121622] border-gray-700 text-gray-400 cursor-default'
              : 'bg-[#FF007A] border-[#FF007A] text-white shadow-brutal-pink hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px]'
          }`}
        >
          {hasScanned ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-[#00FF66]" />
              <span>TELEMETRY RECORDED</span>
            </>
          ) : (
            <>
              <Award className="w-4 h-4" />
              <span>{isScanning ? 'TRANSMITTING...' : 'SCAN & CLAIM +10 XP'}</span>
            </>
          )}
        </button>
      </div>

      {/* Telemetry Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-[#121622] border border-cyber-border p-3">
          <div className="text-[10px] text-gray-400 uppercase font-mono flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-[#00FF66]" />
            <span>EST. TRANSIT</span>
          </div>
          <div className="text-xl font-mono font-black text-[#00FF66] mt-0.5">
            {result.totalDurationMinutes} <span className="text-xs font-normal">MIN</span>
          </div>
        </div>

        <div className="bg-[#121622] border border-cyber-border p-3">
          <div className="text-[10px] text-gray-400 uppercase font-mono flex items-center space-x-1">
            <Repeat className="w-3.5 h-3.5 text-[#A855F7]" />
            <span>TRANSFERS</span>
          </div>
          <div className="text-xl font-mono font-black text-[#A855F7] mt-0.5">
            {result.transferCount} <span className="text-xs font-normal">NODES</span>
          </div>
        </div>

        <div className="bg-[#121622] border border-cyber-border p-3">
          <div className="text-[10px] text-gray-400 uppercase font-mono flex items-center space-x-1">
            <Leaf className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>CARBON OFFSET</span>
          </div>
          <div className="text-xl font-mono font-black text-[#00F0FF] mt-0.5">
            +{result.totalCarbonSavedGrams} <span className="text-xs font-normal">g CO₂</span>
          </div>
        </div>

        <div className="bg-[#121622] border border-cyber-border p-3">
          <div className="text-[10px] text-gray-400 uppercase font-mono flex items-center space-x-1">
            <Zap className="w-3.5 h-3.5 text-[#FFB800]" />
            <span>COMMUTE XP</span>
          </div>
          <div className="text-xl font-mono font-black text-[#FFB800] mt-0.5">
            +10 <span className="text-xs font-normal">EXP</span>
          </div>
        </div>
      </div>

      {/* Animated Route Timeline using Framer Motion */}
      <div className="border border-cyber-border bg-[#090b10] p-4 sm:p-5">
        <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center space-x-2">
          <span className="w-2 h-2 bg-[#00FF66] inline-block animate-ping" />
          <span>REAL-TIME MULTI-LEG NAVIGATION TIMELINE</span>
        </h4>

        <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-[#00FF66] before:via-[#A855F7] before:to-[#FFB800]">
          {result.legs.map((leg, legIndex) => {
            const lineColor = leg.lineColor || leg.routeColor || '#00FF66';
            const lineCode = leg.lineCode || leg.routeCode || 'LINE';
            const lineName = leg.lineName || leg.routeName || 'Transit Line';

            return (
              <motion.div
                key={legIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: legIndex * 0.15, duration: 0.35 }}
                className="relative"
              >
                {/* Route Line Header Badge */}
                <div className="flex items-center space-x-2 mb-3">
                  <span
                    className="px-2.5 py-0.5 text-[11px] font-mono font-black text-black uppercase"
                    style={{ backgroundColor: lineColor }}
                  >
                    {lineCode}
                  </span>
                  <span className="text-sm font-bold text-white font-mono">
                    {lineName}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    ({leg.stopsCount} stops · ~{leg.durationMinutes} min)
                  </span>
                </div>

                {/* Station Nodes inside this Leg */}
                <div className="space-y-3 bg-[#11141e] border border-cyber-border p-3.5">
                  {leg.stops.map((stop, sIdx) => {
                    const isDeparture = sIdx === 0 && legIndex === 0;
                    const isArrival = sIdx === leg.stops.length - 1 && legIndex === result.legs.length - 1;
                    const isTransfer = sIdx === leg.stops.length - 1 && legIndex < result.legs.length - 1;

                    return (
                      <div key={stop.id} className="flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                              isDeparture || isArrival
                                ? 'bg-white border-[#00FF66] shadow-glow-green scale-110'
                                : isTransfer
                                ? 'bg-[#FFB800] border-white animate-pulse'
                                : 'bg-black border-gray-600'
                            }`}
                          >
                            <div
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: lineColor }}
                            />
                          </div>
                          <div>
                            <span className="text-gray-200 font-bold">
                              [{stop.code}] {stop.name}
                            </span>
                            <span className="text-gray-500 ml-2 text-[10px]">
                              {stop.sector}
                            </span>
                          </div>
                        </div>

                        <div>
                          {isDeparture && (
                            <span className="bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]/40 px-1.5 py-0.5 text-[10px] font-bold">
                              ORIGIN
                            </span>
                          )}
                          {isArrival && (
                            <span className="bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40 px-1.5 py-0.5 text-[10px] font-bold">
                              DESTINATION
                            </span>
                          )}
                          {isTransfer && (
                            <span className="bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/40 px-1.5 py-0.5 text-[10px] font-bold flex items-center space-x-1">
                              <Repeat className="w-3 h-3" />
                              <span>TRANSFER NODE</span>
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Transfer Instruction if not last leg */}
                {legIndex < result.legs.length - 1 && (
                  <div className="my-2 p-2 bg-[#2a1705] border border-[#FFB800]/50 text-[#FFB800] text-xs font-mono flex items-center space-x-2">
                    <Repeat className="w-4 h-4 animate-spin" />
                    <span>
                      TRANSFER ALERT: DISEMBARK AT {leg.toStop.name} AND BOARD {result.legs[legIndex + 1].lineCode || result.legs[legIndex + 1].routeCode}.
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
