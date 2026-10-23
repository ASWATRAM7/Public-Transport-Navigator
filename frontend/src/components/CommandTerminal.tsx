import React, { useState } from 'react';
import { Stop } from '../types/transit';
import { Terminal, ArrowRight, CornerDownLeft, Sparkles, Navigation } from 'lucide-react';

interface CommandTerminalProps {
  stops: Stop[];
  onSearch: (from: string, to: string) => void;
  isLoading: boolean;
  selectedFrom: string;
  selectedTo: string;
  onSelectFrom: (code: string) => void;
  onSelectTo: (code: string) => void;
  onPlaySound?: () => void;
}

export const CommandTerminal: React.FC<CommandTerminalProps> = ({
  stops,
  onSearch,
  isLoading,
  selectedFrom,
  selectedTo,
  onSelectFrom,
  onSelectTo,
  onPlaySound
}) => {
  const [commandInput, setCommandInput] = useState('');
  const [mode, setMode] = useState<'matrix' | 'cli'>('matrix');
  const [terminalLog, setTerminalLog] = useState<string>('NEXUS-OS KERNEL READY. SELECT OR TYPE TRANSIT VECTOR.');

  const presets = [
    { from: 'SEC-07', to: 'UND-GRD', label: 'Sector 7 ➔ Under-grid' },
    { from: 'AURA-TW', to: 'CYB-DCK', label: 'Aurora Spire ➔ Cyber Docks' },
    { from: 'SLN-RDG', to: 'MEGA-CR', label: 'Silicon Ridge ➔ Core Matrix' },
    { from: 'NEON-D', to: 'VAPOR-WY', label: 'Neon District ➔ Vaporway' }
  ];

  const handlePresetClick = (from: string, to: string) => {
    onSelectFrom(from);
    onSelectTo(to);
    onPlaySound?.();
    setTerminalLog(`VECTOR OVERRIDE: ${from} ➔ ${to}. DISPATCHING ROUTE...`);
    onSearch(from, to);
  };

  const handleCliSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPlaySound?.();
    const clean = commandInput.trim();
    if (!clean) return;

    // Support syntax: "FROM TO", "NAV FROM TO", "FROM to TO"
    const stripped = clean.replace(/^(nav|route|goto)\s+/i, '');
    const tokens = stripped.split(/\s+(?:to|->|➔)\s+|\s+/i);

    if (tokens.length >= 2) {
      const fromQuery = tokens[0].trim();
      const toQuery = tokens[1].trim();
      onSelectFrom(fromQuery);
      onSelectTo(toQuery);
      setTerminalLog(`COMMAND EXECUTING: NAV [${fromQuery}] ➔ [${toQuery}]`);
      onSearch(fromQuery, toQuery);
    } else {
      setTerminalLog(`SYNTAX ERROR: USE "NAV <FROM> <TO>" (e.g. NAV SEC-07 UND-GRD)`);
    }
  };

  const handleManualDispatch = () => {
    if (!selectedFrom || !selectedTo) {
      setTerminalLog('GRID ERROR: SPECIFY BOTH ORIGIN & DESTINATION NODES.');
      return;
    }
    onPlaySound?.();
    setTerminalLog(`INITIALIZING ROUTE TRACE: ${selectedFrom} ➔ ${selectedTo}`);
    onSearch(selectedFrom, selectedTo);
  };

  return (
    <div className="bg-[#0b0d14] border-2 border-cyber-border brutal-card relative overflow-hidden p-4 sm:p-5">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-cyber-border pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <Terminal className="w-5 h-5 text-[#00FF66]" />
          <span className="font-mono text-xs font-bold tracking-widest text-[#00FF66] uppercase">
            TERMINAL//NAVIGATION-CONSOLE
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={() => { setMode('matrix'); onPlaySound?.(); }}
            className={`text-[10px] px-2.5 py-1 font-mono font-bold tracking-wider transition-all border ${
              mode === 'matrix'
                ? 'bg-[#00FF66] text-black border-[#00FF66]'
                : 'text-gray-400 border-gray-800 hover:text-white'
            }`}
          >
            MATRIX SELECT
          </button>
          <button
            type="button"
            onClick={() => { setMode('cli'); onPlaySound?.(); }}
            className={`text-[10px] px-2.5 py-1 font-mono font-bold tracking-wider transition-all border ${
              mode === 'cli'
                ? 'bg-[#A855F7] text-black border-[#A855F7]'
                : 'text-gray-400 border-gray-800 hover:text-white'
            }`}
          >
            CLI PROMPT
          </button>
        </div>
      </div>

      {/* Mode 1: Coordinates Matrix (Select Box with Brutalist Styling) */}
      {mode === 'matrix' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Origin Node */}
            <div>
              <label htmlFor="origin-select" className="block text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-1 flex items-center space-x-1.5">
                <span className="w-2 h-2 bg-[#00FF66] inline-block" />
                <span>[ORIGIN] START NODE:</span>
              </label>
              <select
                id="origin-select"
                value={selectedFrom}
                onChange={(e) => { onSelectFrom(e.target.value); onPlaySound?.(); }}
                className="w-full bg-[#121622] border-2 border-cyber-border focus:border-[#00FF66] text-white px-3 py-2.5 font-mono text-sm focus:outline-none focus:shadow-glow-green transition-all"
              >
                <option value="">-- SELECT DEPARTURE NODE --</option>
                {stops.map((s) => (
                  <option key={s.id} value={s.code}>
                    [{s.code}] {s.name} ({s.sector})
                  </option>
                ))}
              </select>
            </div>

            {/* Destination Node */}
            <div>
              <label htmlFor="destination-select" className="block text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-1 flex items-center space-x-1.5">
                <span className="w-2 h-2 bg-[#A855F7] inline-block" />
                <span>[DESTINATION] TARGET NODE:</span>
              </label>
              <select
                id="destination-select"
                value={selectedTo}
                onChange={(e) => { onSelectTo(e.target.value); onPlaySound?.(); }}
                className="w-full bg-[#121622] border-2 border-cyber-border focus:border-[#A855F7] text-white px-3 py-2.5 font-mono text-sm focus:outline-none focus:shadow-glow-purple transition-all"
              >
                <option value="">-- SELECT TARGET NODE --</option>
                {stops.map((s) => (
                  <option key={s.id} value={s.code}>
                    [{s.code}] {s.name} ({s.sector})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="text-xs font-mono text-gray-400 flex items-center space-x-2">
              <span className="text-[#00FF66]">●</span>
              <span>{terminalLog}</span>
            </div>

            <button
              id="dispatch-route-btn"
              type="button"
              onClick={handleManualDispatch}
              disabled={isLoading || !selectedFrom || !selectedTo}
              className={`px-5 py-2.5 font-mono font-bold text-xs uppercase tracking-widest flex items-center space-x-2 border-2 transition-all ${
                isLoading || !selectedFrom || !selectedTo
                  ? 'bg-gray-900 border-gray-700 text-gray-600 cursor-not-allowed'
                  : 'bg-[#00FF66] border-[#00FF66] text-black shadow-brutal-green hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px]'
              }`}
            >
              <Navigation className="w-4 h-4 fill-black" />
              <span>{isLoading ? 'TRACING MATRIX...' : 'DISPATCH ROUTE'}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Mode 2: Hacker CLI Command Prompt */
        <form onSubmit={handleCliSubmit} className="space-y-3">
          <div className="bg-black border-2 border-[#00FF66] p-3 shadow-brutal-green flex items-center space-x-2 font-mono">
            <span className="text-[#00FF66] font-bold select-none whitespace-nowrap">
              NEXUS:\\NAV&gt;
            </span>
            <input
              id="cli-command-input"
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              placeholder="e.g. NAV SEC-07 UND-GRD or Sector 7 to Under-grid"
              className="w-full bg-transparent text-[#00FF66] placeholder-gray-600 focus:outline-none text-sm font-mono tracking-wide"
              autoFocus
            />
            <button
              type="submit"
              className="bg-[#00FF66] text-black px-2 py-1 text-xs font-bold flex items-center space-x-1"
            >
              <span>RUN</span>
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="text-xs font-mono text-gray-400">
            LOG: <span className="text-[#00F0FF]">{terminalLog}</span>
          </div>
        </form>
      )}

      {/* Quick Route Presets */}
      <div className="mt-4 pt-3 border-t border-cyber-border">
        <div className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2 flex items-center space-x-1">
          <Sparkles className="w-3 h-3 text-[#FFB800]" />
          <span>QUICK-DEPLOY TRANSIT VECTORS:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handlePresetClick(p.from, p.to)}
              className="bg-[#121622] hover:bg-[#1a2133] border border-cyber-border hover:border-[#00FF66] px-2.5 py-1 text-[11px] font-mono text-gray-300 hover:text-[#00FF66] transition-all flex items-center space-x-1.5"
            >
              <span>{p.label}</span>
              <ArrowRight className="w-3 h-3 text-gray-500" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
