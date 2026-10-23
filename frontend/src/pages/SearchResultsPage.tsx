import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Stop, RouteSearchResult, RouteOption } from '../types/transit';
import { searchRoute, recordRouteScan } from '../services/api';
import { EditorialButton } from '../components/ui/EditorialButton';
import { TransportIcon } from '../components/ui/TransportIcon';
import { LineBadge } from '../components/ui/LineBadge';
import {
  Clock,
  Leaf,
  Repeat,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  IndianRupee,
  ArrowLeftRight,
  Compass,
  Footprints,
  TrainFront,
  Bus,
  Sparkles
} from 'lucide-react';

interface SearchResultsPageProps {
  stops: Stop[];
  onTriggerToast: (xp: number, carbon: number) => void;
}

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ stops, onTriggerToast }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const fromParam = searchParams.get('from') || 'CHN-CTL';
  const toParam = searchParams.get('to') || 'AIRPORT';

  const [fromQuery, setFromQuery] = useState(fromParam);
  const [toQuery, setToQuery] = useState(toParam);
  const [result, setResult] = useState<RouteSearchResult | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<'fastest' | 'cheapest' | 'alternative'>('fastest');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasScanned, setHasScanned] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      setError(null);
      setHasScanned(false);
      try {
        const data = await searchRoute(fromParam, toParam);
        setResult(data);
        setFromQuery(fromParam);
        setToQuery(toParam);
        setSelectedOptionId('fastest');
      } catch (err: any) {
        setError(err.message || 'Route calculation failed for chosen stops.');
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [fromParam, toParam]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ from: fromQuery, to: toQuery });
  };

  const handleSwap = () => {
    const temp = fromQuery;
    setFromQuery(toQuery);
    setToQuery(temp);
    setSearchParams({ from: toQuery, to: temp });
  };

  const activeOption: RouteOption | null =
    result?.options?.find(o => o.id === selectedOptionId) ||
    result?.options?.[0] ||
    (result
      ? {
          id: 'fastest',
          label: 'Fastest Route',
          badge: 'RECOMMENDED',
          totalDurationMinutes: result.totalDurationMinutes,
          totalCostInr: result.totalCostInr || 40,
          totalCarbonSavedGrams: result.totalCarbonSavedGrams,
          transferCount: result.transferCount,
          primaryMode: 'METRO',
          steps: result.steps,
          legs: result.legs,
          fullPath: result.fullPath
        }
      : null);

  const handleScanRoute = async () => {
    if (!result || hasScanned || isScanning) return;
    setIsScanning(true);
    try {
      const carbon = activeOption?.totalCarbonSavedGrams || 240;
      await recordRouteScan(carbon, 10);
      setHasScanned(true);
      onTriggerToast(10, carbon);
    } catch (e) {
      setHasScanned(true);
      onTriggerToast(10, activeOption?.totalCarbonSavedGrams || 240);
    } finally {
      setIsScanning(false);
    }
  };

  const sortedStops = [...stops].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="space-y-12 animate-fadeIn max-w-6xl mx-auto pb-16">
      {/* Top Search Controls Bar */}
      <section className="bg-white border border-[#E8E6E1] p-4 sm:p-6 rounded-none sm:rounded-sm shadow-xs">
        <form onSubmit={handleUpdate} className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto flex-1">
            {/* Origin Dropdown */}
            <div className="w-full sm:flex-1 space-y-1">
              <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#5A5A5A] flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2E4034] inline-block" />
                <span>Departure:</span>
              </span>
              <select
                value={fromQuery}
                onChange={(e) => setFromQuery(e.target.value)}
                className="w-full bg-[#F9F8F6] border border-[#E8E6E1] px-3.5 py-2.5 text-xs font-sans text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] cursor-pointer rounded-none sm:rounded-xs"
              >
                {sortedStops.map((s) => (
                  <option key={s.id} value={s.code}>
                    {s.name} ({s.sector})
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <button
              type="button"
              onClick={handleSwap}
              className="p-2 border border-[#E8E6E1] text-[#5A5A5A] hover:text-[#1A1A1A] hover:bg-[#F0EDE6] transition-colors flex-shrink-0 mt-3 sm:mt-4 rounded-none sm:rounded-xs"
              title="Swap Departure and Destination"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
            </button>

            {/* Destination Dropdown */}
            <div className="w-full sm:flex-1 space-y-1">
              <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#5A5A5A] flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C26A4A] inline-block" />
                <span>Destination:</span>
              </span>
              <select
                value={toQuery}
                onChange={(e) => setToQuery(e.target.value)}
                className="w-full bg-[#F9F8F6] border border-[#E8E6E1] px-3.5 py-2.5 text-xs font-sans text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] cursor-pointer rounded-none sm:rounded-xs"
              >
                {sortedStops.map((s) => (
                  <option key={s.id} value={s.code}>
                    {s.name} ({s.sector})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <EditorialButton
            type="submit"
            variant="primary"
            size="md"
            disabled={isLoading}
            className="w-full lg:w-auto flex-shrink-0"
          >
            {isLoading ? 'Calculating...' : 'Update Itinerary'}
          </EditorialButton>
        </form>
      </section>

      {/* Error View */}
      {error && (
        <div className="bg-white border border-[#C26A4A] p-5 text-[#C26A4A] text-xs flex items-center space-x-3 rounded-none sm:rounded-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>Routing Exception: {error}</span>
        </div>
      )}

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-40 bg-white border border-[#E8E6E1] animate-pulse rounded-none" />
            ))}
          </div>
          <div className="h-96 bg-white border border-[#E8E6E1] animate-pulse rounded-none" />
        </div>
      )}

      {/* Journey Results Container */}
      {!isLoading && result && activeOption && (
        <div className="space-y-8">
          
          {/* Header Summary */}
          <div className="border-b border-[#E8E6E1] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-[#C26A4A] block mb-1">
                Itinerary Comparison
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A]">
                {result.fromStop.name} <span className="font-sans text-[#C26A4A] mx-2">➔</span> {result.toStop.name}
              </h2>
            </div>

            <div className="text-xs text-[#5A5A5A] font-sans">
              3 Distinct Pathways · Turn-by-Turn Timetable
            </div>
          </div>

          {/* 3 Clickable Top Comparison Tabs (Fastest, Cheapest, Alternative) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {result.options && result.options.length > 0 ? (
              result.options.map((option) => {
                const isSelected = option.id === selectedOptionId;

                let borderStyle = isSelected
                  ? 'border-[#1A1A1A] bg-white shadow-md'
                  : 'border-[#E8E6E1] bg-white/70 hover:bg-white hover:border-[#1A1A1A]/40';

                return (
                  <motion.div
                    key={option.id}
                    whileHover={{ y: -2 }}
                    onClick={() => setSelectedOptionId(option.id)}
                    className={`cursor-pointer p-6 transition-all border rounded-none sm:rounded-sm flex flex-col justify-between space-y-4 ${borderStyle}`}
                  >
                    {/* Top Badge & Mode Icon */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-sans font-semibold uppercase tracking-widest px-2.5 py-0.5 border border-[#E8E6E1] bg-[#F9F8F6] text-[#1A1A1A]">
                        {option.badge}
                      </span>
                      <TransportIcon mode={option.primaryMode} withBadge size="sm" />
                    </div>

                    {/* Option Title */}
                    <div>
                      <h3 className="font-serif text-2xl font-normal text-[#1A1A1A] mb-1">
                        {option.label}
                      </h3>
                      <p className="text-xs text-[#5A5A5A] font-sans line-clamp-1">
                        {option.transferCount === 0 ? 'Direct connection' : `${option.transferCount} transfer required`}
                      </p>
                    </div>

                    {/* Duration & Fare Figures */}
                    <div className="pt-4 border-t border-[#E8E6E1] flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C8C8C] block">
                          Total Fare
                        </span>
                        <span className="font-sans text-2xl font-semibold text-[#1A1A1A] flex items-center">
                          <IndianRupee className="w-4 h-4 stroke-[2]" />
                          {option.totalCostInr}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C8C8C] block">
                          Est. Duration
                        </span>
                        <span className="font-sans text-2xl font-semibold text-[#1A1A1A]">
                          {option.totalDurationMinutes} <span className="text-xs font-normal text-[#5A5A5A]">min</span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : null}
          </div>

          {/* Active Route Detailed Editorial Timeline Card */}
          <div className="bg-white border border-[#E8E6E1] p-6 sm:p-10 rounded-none sm:rounded-sm space-y-8">
            {/* Overview Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#E8E6E1]">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-sans font-semibold uppercase tracking-widest text-[#1A1A1A] bg-[#F0EDE6] px-2.5 py-0.5">
                    {activeOption.label} Selected
                  </span>
                  <span className="text-xs text-[#5A5A5A]">·</span>
                  <span className="text-xs text-[#5A5A5A]">
                    {activeOption.steps.length} Turn-by-Turn Stages
                  </span>
                </div>
                <p className="text-xs text-[#5A5A5A] font-sans">
                  Fare calculated according to official CMRL Metro &amp; MTC Chennai government stages.
                </p>
              </div>

              {/* Record Trip / Claim XP Action */}
              <EditorialButton
                variant={hasScanned ? 'outline' : 'primary'}
                size="md"
                onClick={handleScanRoute}
                disabled={hasScanned || isScanning}
                icon={hasScanned ? <CheckCircle2 className="w-4 h-4 text-[#2E4034]" /> : <Sparkles className="w-4 h-4" />}
                className="flex-shrink-0"
              >
                {hasScanned ? 'Trip Recorded (+10 XP)' : isScanning ? 'Logging...' : 'Record Trip & Earn XP'}
              </EditorialButton>
            </div>

            {/* Metrics Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-[#F9F8F6] border border-[#E8E6E1]">
              <div>
                <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C8C8C] block">Total Duration</span>
                <span className="text-xl sm:text-2xl font-serif text-[#1A1A1A] mt-0.5 block">
                  {activeOption.totalDurationMinutes} <span className="text-xs font-sans text-[#5A5A5A]">mins</span>
                </span>
              </div>

              <div>
                <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C8C8C] block">Journey Fare</span>
                <span className="text-xl sm:text-2xl font-serif text-[#1A1A1A] mt-0.5 flex items-center">
                  <IndianRupee className="w-4 h-4 stroke-[2]" />
                  <span>{activeOption.totalCostInr}</span>
                  <span className="text-xs font-sans text-[#5A5A5A] ml-1">INR</span>
                </span>
              </div>

              <div>
                <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C8C8C] block">Interchanges</span>
                <span className="text-xl sm:text-2xl font-serif text-[#1A1A1A] mt-0.5 block">
                  {activeOption.transferCount} <span className="text-xs font-sans text-[#5A5A5A]">transfers</span>
                </span>
              </div>

              <div>
                <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C8C8C] block">Carbon Averted</span>
                <span className="text-xl sm:text-2xl font-serif text-[#2E4034] mt-0.5 block">
                  +{activeOption.totalCarbonSavedGrams} <span className="text-xs font-sans text-[#5A5A5A]">g CO₂</span>
                </span>
              </div>
            </div>

            {/* Turn-by-Turn Vertical Timeline */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center justify-between border-b border-[#E8E6E1] pb-3">
                <h3 className="font-serif text-2xl text-[#1A1A1A]">
                  Sequential Journey Itinerary
                </h3>
                <span className="text-xs uppercase tracking-widest text-[#8C8C8C] font-sans">
                  Timeline
                </span>
              </div>

              <div className="relative pl-8 sm:pl-12 space-y-8 before:content-[''] before:absolute before:left-3.5 sm:before:left-5 before:top-4 before:bottom-4 before:w-px before:bg-[#E8E6E1]">
                <AnimatePresence>
                  {activeOption.steps.map((step, idx) => (
                    <motion.div
                      key={`${activeOption.id}-${step.id || idx}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: idx * 0.05, duration: 0.25 }}
                      className="relative"
                    >
                      {/* Timeline Node Icon */}
                      <div className="absolute -left-[30px] sm:-left-[42px] top-1">
                        <TransportIcon
                          mode={step.stepType === 'TRANSIT' ? (step.vehicleType || 'TRANSIT') : step.stepType}
                          withBadge
                          size="sm"
                        />
                      </div>

                      {/* Timeline Step Content Card */}
                      <div className="bg-[#F9F8F6] border border-[#E8E6E1] p-5 sm:p-6 space-y-3 rounded-none sm:rounded-xs">
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#E8E6E1]">
                          <div className="flex items-center space-x-2.5">
                            {step.stepType === 'TRANSIT' && step.lineCode && (
                              <LineBadge
                                code={step.lineCode}
                                name={step.lineName}
                                color={step.lineColor}
                                type={step.vehicleType}
                                size="sm"
                              />
                            )}

                            {step.stepType === 'WALK' && (
                              <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#5A5A5A] bg-[#E8E6E1] px-2 py-0.5">
                                Pedestrian
                              </span>
                            )}

                            {step.stepType === 'AUTO' && (
                              <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#8C6D3B] bg-[#8C6D3B]/10 px-2 py-0.5 border border-[#8C6D3B]/20">
                                Auto Feeder
                              </span>
                            )}

                            {step.stepType === 'TRANSFER' && (
                              <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#1A1A1A] bg-[#1A1A1A]/10 px-2 py-0.5">
                                Platform Transfer
                              </span>
                            )}

                            <span className="font-serif text-lg text-[#1A1A1A]">
                              {step.title}
                            </span>
                          </div>

                          <div className="flex items-center space-x-3 text-xs font-sans text-[#1A1A1A]">
                            <span>~{step.durationMinutes} min</span>
                            {step.fareInr !== undefined && step.fareInr > 0 && (
                              <span className="font-mono text-[11px] bg-white border border-[#E8E6E1] px-2 py-0.5">
                                ₹{step.fareInr}
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-[#5A5A5A] leading-relaxed font-sans">
                          {step.instruction}
                        </p>

                        {/* Calling Stations */}
                        {step.intermediateStops && step.intermediateStops.length > 0 && (
                          <div className="pt-3 mt-3 border-t border-[#E8E6E1] space-y-1.5">
                            <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C8C8C] block">
                              Intermediate Calling Stations ({step.stopsCount || step.intermediateStops.length}):
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {step.intermediateStops.map((st) => (
                                <span
                                  key={st.id}
                                  className="text-[10px] font-sans bg-white border border-[#E8E6E1] px-2 py-0.5 text-[#1A1A1A]"
                                >
                                  {st.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
