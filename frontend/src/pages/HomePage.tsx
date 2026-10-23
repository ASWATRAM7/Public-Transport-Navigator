import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stop } from '../types/transit';
import { EditorialButton } from '../components/ui/EditorialButton';
import { ImageCard } from '../components/ui/ImageCard';
import { ArrowRight, ArrowLeftRight, Clock, Compass, MapPin } from 'lucide-react';

interface HomePageProps {
  stops: Stop[];
  onTriggerToast: (xp: number, carbon: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ stops }) => {
  const navigate = useNavigate();
  const [fromQuery, setFromQuery] = useState('CHN-CTL');
  const [toQuery, setToQuery] = useState('AIRPORT');

  const presets = [
    { from: 'CHN-CTL', to: 'AIRPORT', label: 'Chennai Central ➔ Airport', badge: 'Fastest' },
    { from: 'T-NAGAR', to: 'TAMBARAM', label: 'T. Nagar ➔ Tambaram', badge: 'Cheapest' },
    { from: 'VELACHERY', to: 'OMR-SHL', label: 'Velachery ➔ OMR Sholinganallur', badge: 'IT Corridor' },
    { from: 'ADYAR', to: 'KOYAMBEDU', label: 'Adyar ➔ Koyambedu CMBT', badge: 'Arterial' },
  ];

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    navigate(`/search?from=${encodeURIComponent(fromQuery)}&to=${encodeURIComponent(toQuery)}`);
  };

  const handleSwap = () => {
    const temp = fromQuery;
    setFromQuery(toQuery);
    setToQuery(temp);
  };

  const handlePresetClick = (from: string, to: string) => {
    setFromQuery(from);
    setToQuery(to);
    navigate(`/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`);
  };

  // Sort stops alphabetically for easy discovery
  const sortedStops = [...stops].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="space-y-20 animate-fadeIn pb-12">
      {/* Immersive Editorial Hero Section with High-Resolution Photography */}
      <section className="relative -mx-4 sm:-mx-8 -mt-8 h-[520px] sm:h-[620px] overflow-hidden bg-[#1A1A1A] flex items-end">
        {/* Full-bleed Transit Hero Image */}
        <img
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1920&q=85"
          alt="Chennai Metro Viaduct at Sunrise"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-90"
        />

        {/* Elegant Dark Gradient Scrim Overlay for Perfect Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/55 to-black/30" />

        {/* Hero Typography Content */}
        <div className="relative max-w-7xl w-full mx-auto px-4 sm:px-8 pb-28 sm:pb-32 space-y-4 text-white">
          <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#C26A4A] font-semibold">
            <Compass className="w-4 h-4" />
            <span>The Metropolitan Journey · Issue No. 04</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white leading-tight max-w-3xl">
            The Art of Moving Through <br />
            <span className="italic font-serif font-light text-[#F9F8F6]">Chennai.</span>
          </h1>

          <p className="font-sans text-sm sm:text-base text-stone-200/90 max-w-2xl font-light leading-relaxed">
            An aesthetic, editorial journal documenting the multimodal transit arteries of Tamil Nadu's coastal capital. Compare Fastest, Cheapest, and Alternative routes across 30+ historic and contemporary hubs.
          </p>
        </div>
      </section>

      {/* Floating Minimalist White Search Card with Sharp Corners */}
      <section className="max-w-5xl mx-auto -mt-24 sm:-mt-28 relative z-20">
        <div className="bg-white border border-[#E8E6E1] p-6 sm:p-10 shadow-xl rounded-none sm:rounded-sm">
          <div className="border-b border-[#E8E6E1] pb-4 mb-6 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#C26A4A]">
                Journey Dispatch
              </span>
              <h2 className="font-serif text-2xl text-[#1A1A1A]">
                Plan Your Metropolitan Itinerary
              </h2>
            </div>
            <span className="text-xs text-[#5A5A5A] font-sans">
              30 Locations · 3 Journey Options (Fastest, Cheapest, Alternative)
            </span>
          </div>

          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              
              {/* Origin Selector */}
              <div className="space-y-1.5">
                <label htmlFor="origin-select" className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#2E4034] inline-block" />
                  <span>Departure Station:</span>
                </label>
                <div className="relative">
                  <select
                    id="origin-select"
                    value={fromQuery}
                    onChange={(e) => setFromQuery(e.target.value)}
                    className="w-full bg-[#F9F8F6] hover:bg-[#F0EDE6] border border-[#E8E6E1] px-4 py-3 text-sm font-sans text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] transition-all cursor-pointer rounded-none sm:rounded-xs"
                  >
                    {sortedStops.map((s) => (
                      <option key={s.id} value={s.code}>
                        {s.name} — {s.sector}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Swap Button */}
              <div className="hidden md:flex absolute left-1/2 top-7 -translate-x-1/2 z-10">
                <button
                  type="button"
                  onClick={handleSwap}
                  className="w-8 h-8 rounded-none sm:rounded-xs bg-white border border-[#E8E6E1] text-[#5A5A5A] hover:text-[#1A1A1A] hover:bg-[#F0EDE6] shadow-xs flex items-center justify-center transition-all"
                  title="Swap Departure and Destination"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Destination Selector */}
              <div className="space-y-1.5">
                <label htmlFor="destination-select" className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#C26A4A] inline-block" />
                  <span>Arrival Destination:</span>
                </label>
                <div className="relative">
                  <select
                    id="destination-select"
                    value={toQuery}
                    onChange={(e) => setToQuery(e.target.value)}
                    className="w-full bg-[#F9F8F6] hover:bg-[#F0EDE6] border border-[#E8E6E1] px-4 py-3 text-sm font-sans text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] transition-all cursor-pointer rounded-none sm:rounded-xs"
                  >
                    {sortedStops.map((s) => (
                      <option key={s.id} value={s.code}>
                        {s.name} — {s.sector}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E8E6E1]">
              <div className="flex items-center space-x-2 text-xs text-[#5A5A5A]">
                <Clock className="w-3.5 h-3.5 text-[#C26A4A]" />
                <span>Calculates turn-by-turn steps, exact fares in ₹, and carbon savings</span>
              </div>

              <EditorialButton
                type="submit"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                className="w-full sm:w-auto"
              >
                Explore Route Options
              </EditorialButton>
            </div>
          </form>

          {/* Curated Commute Pills */}
          <div className="mt-8 pt-6 border-t border-[#E8E6E1]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#5A5A5A]">
                Curated Metropolitan Routes:
              </span>
              <span className="text-[11px] text-[#C26A4A] font-medium">Quick Departures</span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {presets.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handlePresetClick(p.from, p.to)}
                  className="bg-[#F9F8F6] hover:bg-[#1A1A1A] hover:text-[#F9F8F6] text-[#1A1A1A] border border-[#E8E6E1] px-3.5 py-1.5 text-xs font-sans transition-colors duration-200 flex items-center space-x-2 cursor-pointer rounded-none sm:rounded-xs group"
                >
                  <span>{p.label}</span>
                  <span className="text-[9px] uppercase tracking-wider bg-[#E8E6E1] group-hover:bg-[#2E4034] text-[#1A1A1A] group-hover:text-white px-1.5 py-0.2 font-mono">
                    {p.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3-Column Image-Driven Editorial Showcase */}
      <section className="max-w-6xl mx-auto space-y-8">
        <div className="border-b border-[#E8E6E1] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-[#C26A4A]">
              Transit Modalities
            </span>
            <h2 className="font-serif text-3xl text-[#1A1A1A]">
              The Three Arterials of Chennai
            </h2>
          </div>
          <span className="text-xs text-[#5A5A5A]">
            Curated photographic survey of metropolitan mobility
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ImageCard
            imageUrl="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80"
            category="CMRL METRO"
            title="Underground & Elevated Metro"
            subtitle="Central ➔ Airport ➔ Anna Nagar"
            badge={<span className="bg-[#2E4034] text-white text-[9px] uppercase px-2 py-0.5 font-mono">80 KM/H</span>}
          >
            <p className="font-sans text-xs text-[#5A5A5A] leading-relaxed">
              Air-conditioned rapid underground and elevated transit cutting through Anna Salai and Jawaharlal Nehru Road with 5-minute headways.
            </p>
            <div className="pt-2 border-t border-[#E8E6E1] text-[11px] font-medium text-[#2E4034] flex justify-between items-center">
              <span>Blue &amp; Green Corridors</span>
              <span>₹20 – ₹50</span>
            </div>
          </ImageCard>

          <ImageCard
            imageUrl="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80"
            category="MTC BUS"
            title="Metropolitan City Bus Routes"
            subtitle="Marina Beach ➔ Adyar ➔ OMR Corridor"
            badge={<span className="bg-[#C26A4A] text-white text-[9px] uppercase px-2 py-0.5 font-mono">DENSE GRID</span>}
          >
            <p className="font-sans text-xs text-[#5A5A5A] leading-relaxed">
              Comprehensive city-wide bus network connecting coastal heritage neighborhoods with high-tech IT corridors via Routes 21G, 19B, and 570.
            </p>
            <div className="pt-2 border-t border-[#E8E6E1] text-[11px] font-medium text-[#C26A4A] flex justify-between items-center">
              <span>Government Subsidized</span>
              <span>₹7 – ₹22</span>
            </div>
          </ImageCard>

          <ImageCard
            imageUrl="https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80"
            category="SOUTHERN RAIL"
            title="Suburban EMU Rail Corridors"
            subtitle="Beach ➔ Guindy ➔ Tambaram Terminal"
            badge={<span className="bg-[#A87C39] text-white text-[9px] uppercase px-2 py-0.5 font-mono">HIGH CAPACITY</span>}
          >
            <p className="font-sans text-xs text-[#5A5A5A] leading-relaxed">
              Electrified heavy suburban rail backbone operating along the historic South Line since 1931, moving millions of daily commuters.
            </p>
            <div className="pt-2 border-t border-[#E8E6E1] text-[11px] font-medium text-[#A87C39] flex justify-between items-center">
              <span>Flat Fare Structure</span>
              <span>₹5 Flat</span>
            </div>
          </ImageCard>
        </div>
      </section>

      {/* Editorial Quote / Heritage Banner */}
      <section className="max-w-5xl mx-auto border-t border-b border-[#E8E6E1] py-12 px-6 sm:px-12 text-center space-y-4">
        <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-[#C26A4A]">
          Chennai Heritage Note
        </span>
        <blockquote className="font-serif text-2xl sm:text-3xl font-normal italic text-[#1A1A1A] leading-snug">
          "From Asia’s first electric tramways in May 1895 to modern underground rapid transit, Chennai has always moved with quiet grandeur."
        </blockquote>
        <p className="text-xs text-[#5A5A5A] font-sans">
          Curated for the Agile Methodologies Course · Metropolitan Transport Archive
        </p>
      </section>
    </div>
  );
};
