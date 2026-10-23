import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { TransitLine } from '../types/transit';
import { fetchLines } from '../services/api';
import { EditorialButton } from '../components/ui/EditorialButton';
import { ImageCard } from '../components/ui/ImageCard';
import { LineBadge } from '../components/ui/LineBadge';
import { X, Clock, Gauge, ArrowRight, Layers, MapPin } from 'lucide-react';

export const LineDirectoryPage: React.FC = () => {
  const [lines, setLines] = useState<TransitLine[]>([]);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedLine, setSelectedLine] = useState<TransitLine | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const data = await fetchLines();
        setLines(data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const filters = ['ALL', 'METRO', 'BUS', 'TRAIN', 'AUTO'];

  const displayedLines = lines.filter(l => {
    if (activeFilter === 'ALL') return true;
    const type = l.type.toUpperCase();
    if (activeFilter === 'TRAIN') return type === 'TRAIN' || type === 'SUBURBAN';
    return type === activeFilter;
  });

  return (
    <div className="space-y-12 animate-fadeIn max-w-6xl mx-auto pb-16">
      {/* Header */}
      <section className="space-y-3 pb-6 border-b border-[#E8E6E1]">
        <div className="flex items-center space-x-2 text-[10px] font-sans font-semibold uppercase tracking-widest text-[#C26A4A]">
          <Layers className="w-3.5 h-3.5" />
          <span>Arterial Transit Directory</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A1A1A]">
          The Transit Lines of Chennai
        </h1>
        <p className="font-sans text-sm text-[#5A5A5A] max-w-2xl leading-relaxed">
          Comprehensive operational parameters across CMRL Metro Rail, Metropolitan Transport Corporation (MTC) buses, Southern Railway Suburban EMU networks, and smart share auto feeder lines.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-4">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 font-sans text-xs uppercase tracking-wider transition-colors cursor-pointer border rounded-none sm:rounded-xs ${
                activeFilter === f
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                  : 'bg-white text-[#1A1A1A] border-[#E8E6E1] hover:bg-[#F0EDE6]'
              }`}
            >
              {f === 'ALL' ? 'All Lines (7)' : f}
            </button>
          ))}
        </div>
      </section>

      {/* Grid of Image-Driven Line Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-72 bg-white border border-[#E8E6E1] animate-pulse rounded-none" />
          ))}
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayedLines.map((line) => (
            <ImageCard
              key={line.id}
              imageUrl={line.imageUrl}
              category={line.type}
              title={line.name}
              subtitle={`Connects ${line.stopsCount} key transit hubs across Chennai`}
              badge={
                <span className={`text-[9px] uppercase font-mono px-2 py-0.5 border ${
                  line.status === 'ON_TIME'
                    ? 'bg-[#2E4034] text-white border-[#2E4034]'
                    : 'bg-[#C26A4A] text-white border-[#C26A4A]'
                }`}>
                  {line.status === 'ON_TIME' ? 'Nominal' : 'Advisory'}
                </span>
              }
              aspectRatio="video"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#E8E6E1] pb-3">
                  <LineBadge code={line.code} color={line.color} type={line.type} size="sm" />
                  <span className="text-xs text-[#5A5A5A] font-sans">
                    {line.stopsCount} Calling Stations
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-sans text-[#5A5A5A]">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#8C8C8C] block">Headway Frequency</span>
                    <span className="font-semibold text-[#1A1A1A]">{line.frequencyMinutes} Mins Dispatch</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#8C8C8C] block">Velocity</span>
                    <span className="font-semibold text-[#1A1A1A]">{line.speedKmh} km/h</span>
                  </div>
                </div>

                <EditorialButton
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedLine(line)}
                  className="w-full text-xs"
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                  iconPosition="right"
                >
                  Inspect Timetable &amp; Stations
                </EditorialButton>
              </div>
            </ImageCard>
          ))}
        </section>
      )}

      {/* Line Inspection Modal */}
      <AnimatePresence>
        {selectedLine && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 15 }}
              className="bg-white border border-[#E8E6E1] max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto rounded-none sm:rounded-sm"
            >
              <button
                onClick={() => setSelectedLine(null)}
                className="absolute top-6 right-6 p-1.5 border border-[#E8E6E1] hover:bg-[#1A1A1A] hover:text-white transition-colors cursor-pointer"
                aria-label="Close Modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-2 border-b border-[#E8E6E1] pb-4">
                <LineBadge code={selectedLine.code} color={selectedLine.color} type={selectedLine.type} size="sm" />
                <h2 className="font-serif text-3xl text-[#1A1A1A]">
                  {selectedLine.name}
                </h2>
                <div className="text-xs text-[#5A5A5A] font-sans flex flex-wrap gap-4 pt-1">
                  <span>Headway: <strong className="text-[#1A1A1A]">{selectedLine.frequencyMinutes} Mins</strong></span>
                  <span>·</span>
                  <span>Cruising Velocity: <strong className="text-[#1A1A1A]">{selectedLine.speedKmh} km/h</strong></span>
                  <span>·</span>
                  <span>Stations: <strong className="text-[#1A1A1A]">{selectedLine.stopsCount}</strong></span>
                </div>
              </div>

              {/* Station Stops Table */}
              <div className="space-y-3">
                <h3 className="text-xs font-sans font-semibold uppercase tracking-widest text-[#5A5A5A] flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C26A4A]" />
                  <span>Sequential Station Itinerary</span>
                </h3>

                <div className="border border-[#E8E6E1] overflow-hidden max-h-64 overflow-y-auto">
                  <table className="w-full text-left text-xs font-sans">
                    <thead className="bg-[#F9F8F6] border-b border-[#E8E6E1] text-[10px] font-sans font-semibold uppercase tracking-wider text-[#8C8C8C]">
                      <tr>
                        <th className="p-3">#</th>
                        <th className="p-3">Station Name</th>
                        <th className="p-3">Sector</th>
                        <th className="p-3 text-right">Zone</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8E6E1]">
                      {selectedLine.stops && selectedLine.stops.length > 0 ? (
                        selectedLine.stops.map((stop, sIdx) => (
                          <tr key={stop.id} className="hover:bg-[#F9F8F6] transition-colors">
                            <td className="p-3 font-mono text-[#8C8C8C]">{sIdx + 1}</td>
                            <td className="p-3 font-medium text-[#1A1A1A]">{stop.name}</td>
                            <td className="p-3 text-[#5A5A5A]">{stop.sector}</td>
                            <td className="p-3 text-right font-mono text-[#8C8C8C]">Zone {stop.zone}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="p-4 text-center text-[#8C8C8C]">
                            Loading station itinerary...
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#E8E6E1]">
                <EditorialButton
                  variant="primary"
                  size="md"
                  onClick={() => {
                    const first = selectedLine.stops?.[0]?.code || 'CHN-CTL';
                    const last = selectedLine.stops?.[selectedLine.stops.length - 1]?.code || 'AIRPORT';
                    navigate(`/search?from=${first}&to=${last}`);
                  }}
                  className="w-full sm:w-auto"
                >
                  Plot Route On This Line →
                </EditorialButton>

                <button
                  type="button"
                  onClick={() => setSelectedLine(null)}
                  className="text-xs uppercase tracking-wider text-[#5A5A5A] hover:text-[#1A1A1A] px-4 py-2 hover:bg-[#F0EDE6] transition-colors"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
