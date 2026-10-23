import React from 'react';
import { NavLink } from 'react-router-dom';
import { Compass, MapPin, Feather } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#E8E6E1] bg-white mt-24 pt-16 pb-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-14">
        
        {/* Top Masthead */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#E8E6E1]">
          <div className="space-y-4 max-w-2xl">
            <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-[#C26A4A] block">
              Editorial Transport Publication
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A1A1A] tracking-tight leading-tight">
              The Art of Moving Through <br className="hidden sm:inline" />
              <span className="italic font-serif font-light text-[#C26A4A]">Chennai, Tamil Nadu.</span>
            </h2>
            <p className="font-sans text-sm text-[#5A5A5A] leading-relaxed">
              An intelligent multimodal navigation journal connecting 30+ historic and modern hubs across CMRL Metro Rail, MTC city buses, Southern Suburban EMU corridors, and first-mile auto-rickshaws.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-[#F9F8F6] p-4 border border-[#E8E6E1] rounded-none sm:rounded-sm">
            <MapPin className="w-5 h-5 text-[#C26A4A]" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">Corridor Network</p>
              <p className="text-[11px] text-[#5A5A5A]">30 Locations · 5 Integrated Modes</p>
            </div>
          </div>
        </div>

        {/* Multi-Column Magazine Directory */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#1A1A1A] mb-4">
              Directory
            </h4>
            <ul className="space-y-2.5 text-xs text-[#5A5A5A]">
              <li><NavLink to="/" className="hover:text-[#1A1A1A] transition-colors">Overview</NavLink></li>
              <li><NavLink to="/search" className="hover:text-[#1A1A1A] transition-colors">Route Planner</NavLink></li>
              <li><NavLink to="/lines" className="hover:text-[#1A1A1A] transition-colors">Line Directory</NavLink></li>
              <li><NavLink to="/status" className="hover:text-[#1A1A1A] transition-colors">Live Status Bulletin</NavLink></li>
              <li><NavLink to="/about" className="hover:text-[#1A1A1A] transition-colors">Agile Scrum Lore</NavLink></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#1A1A1A] mb-4">
              Transit Lines
            </h4>
            <ul className="space-y-2.5 text-xs text-[#5A5A5A]">
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#2E4034]" />
                <span>Metro Blue Line (Airport)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#2E4034]" />
                <span>Metro Green Line (Central)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#A87C39]" />
                <span>Suburban EMU (Tambaram)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#C26A4A]" />
                <span>MTC Buses (21G, 570, 19B)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#8C6D3B]" />
                <span>Share Auto Feeders</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#1A1A1A] mb-4">
              Agile Framework
            </h4>
            <ul className="space-y-2 text-xs text-[#5A5A5A] leading-relaxed">
              <li><strong>Sprint 1:</strong> Topology & 30-Stop Graph</li>
              <li><strong>Sprint 2:</strong> Editorial Design System</li>
              <li><strong>Sprint 3:</strong> Multi-Option Comparison</li>
              <li><strong>Sprint 4:</strong> Integration & Testing</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#1A1A1A] mb-4">
              Colophon
            </h4>
            <div className="bg-[#F9F8F6] p-4 border border-[#E8E6E1] text-xs text-[#5A5A5A] space-y-2 font-sans">
              <p>Typeset in <strong>Playfair Display</strong> &amp; <strong>Inter</strong>.</p>
              <p className="text-[10px] text-[#8C8C8C] uppercase tracking-wider font-mono">
                EDITION: 4.0-MAGAZINE<br />
                AGILE METHODOLOGIES COURSE
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="pt-8 border-t border-[#E8E6E1] flex flex-wrap items-center justify-between gap-4 text-xs text-[#8C8C8C]">
          <div>
            © 2026 Chennai Transit Journal. All rights reserved.
          </div>
          <div className="flex items-center space-x-2 text-[#5A5A5A]">
            <Feather className="w-3.5 h-3.5" />
            <span>Curated with editorial restraint and transit precision.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
