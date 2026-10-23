import React, { useState, useEffect } from 'react';
import { StatsResponse } from '../types/transit';
import { fetchStats } from '../services/api';
import { EditorialButton } from '../components/ui/EditorialButton';
import { LineBadge } from '../components/ui/LineBadge';
import { RefreshCw, CheckCircle2, Clock, Leaf, Shield, Activity } from 'lucide-react';

export const LiveStatusPage: React.FC = () => {
  const [data, setData] = useState<StatsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const res = await fetchStats();
      setData(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 20000);
    return () => clearInterval(interval);
  }, []);

  const stats = data?.stats;
  const sys = data?.systemMetrics;

  return (
    <div className="space-y-12 animate-fadeIn max-w-6xl mx-auto pb-16">
      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#E8E6E1]">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-[10px] font-sans font-semibold uppercase tracking-widest text-[#C26A4A]">
            <Activity className="w-3.5 h-3.5" />
            <span>Punctuality Telemetry</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A1A1A]">
            Live Network Reliability
          </h1>
          <p className="font-sans text-sm text-[#5A5A5A] max-w-2xl leading-relaxed">
            Real-time punctuality telemetry across Chennai Metro Rail (CMRL), Metropolitan Transport Corporation (MTC) buses, and Southern Suburban EMU lines.
          </p>
        </div>

        <EditorialButton
          variant="outline"
          size="sm"
          onClick={loadData}
          disabled={isLoading}
          icon={<RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />}
        >
          {isLoading ? 'Updating...' : 'Refresh Status'}
        </EditorialButton>
      </section>

      {/* High-Level Editorial KPI Cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white border border-[#E8E6E1] p-6 space-y-2 rounded-none sm:rounded-sm">
          <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C8C8C] block">Reliability Score</span>
          <div className="text-3xl sm:text-4xl font-serif text-[#1A1A1A]">
            {sys?.networkReliabilityScore || 98.6}%
          </div>
          <div className="text-xs font-sans text-[#2E4034] flex items-center space-x-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>24h Verified Rolling Score</span>
          </div>
        </div>

        <div className="bg-white border border-[#E8E6E1] p-6 space-y-2 rounded-none sm:rounded-sm">
          <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C8C8C] block">Monitored Lines</span>
          <div className="text-3xl sm:text-4xl font-serif text-[#1A1A1A]">
            {sys?.totalLines || 7}
          </div>
          <div className="text-xs font-sans text-[#5A5A5A]">
            Across 5 Transit Modes
          </div>
        </div>

        <div className="bg-white border border-[#E8E6E1] p-6 space-y-2 rounded-none sm:rounded-sm">
          <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C8C8C] block">Active Delays</span>
          <div className="text-3xl sm:text-4xl font-serif text-[#1A1A1A]">
            {sys?.delayedLines || 0}
          </div>
          <div className="text-xs font-sans text-[#2E4034] flex items-center space-x-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Nominal Operations</span>
          </div>
        </div>

        <div className="bg-white border border-[#E8E6E1] p-6 space-y-2 rounded-none sm:rounded-sm">
          <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C8C8C] block">Average Headway</span>
          <div className="text-3xl sm:text-4xl font-serif text-[#1A1A1A]">
            {sys?.averageHeadwayMinutes || 5.2} <span className="text-xs font-sans text-[#5A5A5A]">min</span>
          </div>
          <div className="text-xs font-sans text-[#5A5A5A]">
            Peak Dispatch Interval
          </div>
        </div>
      </section>

      {/* Line Operational Status Table (Subtle status colors, no garish pills) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#E8E6E1] pb-3">
          <h2 className="font-serif text-2xl text-[#1A1A1A]">
            Corridor Advisory Bulletin
          </h2>
          <span className="text-xs text-[#5A5A5A] font-sans">Updated continuously</span>
        </div>

        <div className="bg-white border border-[#E8E6E1] overflow-x-auto rounded-none sm:rounded-sm">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#F9F8F6] border-b border-[#E8E6E1] text-[10px] font-sans font-semibold uppercase tracking-wider text-[#8C8C8C]">
              <tr>
                <th className="p-4">Line Code</th>
                <th className="p-4">Modality</th>
                <th className="p-4">Corridor Route</th>
                <th className="p-4">Operational Status</th>
                <th className="p-4">Service Advisory</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E6E1]">
              <tr className="hover:bg-[#F9F8F6] transition-colors">
                <td className="p-4">
                  <LineBadge code="METRO-BLU" color="#2E4034" type="METRO" size="sm" />
                </td>
                <td className="p-4 font-medium text-[#1A1A1A]">CMRL Metro</td>
                <td className="p-4 text-[#1A1A1A]">Chennai Central ➔ Airport</td>
                <td className="p-4">
                  <span className="text-[10px] uppercase font-mono font-semibold text-[#2E4034] bg-[#2E4034]/10 px-2 py-0.5 border border-[#2E4034]/20">
                    On Schedule
                  </span>
                </td>
                <td className="p-4 text-[#5A5A5A]">Normal 5-minute peak frequency. Full HVAC functioning.</td>
              </tr>

              <tr className="hover:bg-[#F9F8F6] transition-colors">
                <td className="p-4">
                  <LineBadge code="METRO-GRN" color="#2E4034" type="METRO" size="sm" />
                </td>
                <td className="p-4 font-medium text-[#1A1A1A]">CMRL Metro</td>
                <td className="p-4 text-[#1A1A1A]">Central ➔ St. Thomas Mount</td>
                <td className="p-4">
                  <span className="text-[10px] uppercase font-mono font-semibold text-[#2E4034] bg-[#2E4034]/10 px-2 py-0.5 border border-[#2E4034]/20">
                    On Schedule
                  </span>
                </td>
                <td className="p-4 text-[#5A5A5A]">Smooth interchanges at Alandur and Egmore.</td>
              </tr>

              <tr className="hover:bg-[#F9F8F6] transition-colors">
                <td className="p-4">
                  <LineBadge code="SUB-SOUTH" color="#A87C39" type="TRAIN" size="sm" />
                </td>
                <td className="p-4 font-medium text-[#1A1A1A]">Southern Rail</td>
                <td className="p-4 text-[#1A1A1A]">Chennai Beach ➔ Tambaram Terminal</td>
                <td className="p-4">
                  <span className="text-[10px] uppercase font-mono font-semibold text-[#2E4034] bg-[#2E4034]/10 px-2 py-0.5 border border-[#2E4034]/20">
                    On Schedule
                  </span>
                </td>
                <td className="p-4 text-[#5A5A5A]">12-car suburban EMU trains operating on 10-minute intervals.</td>
              </tr>

              <tr className="hover:bg-[#F9F8F6] transition-colors">
                <td className="p-4">
                  <LineBadge code="MTC-21G" color="#C26A4A" type="BUS" size="sm" />
                </td>
                <td className="p-4 font-medium text-[#1A1A1A]">MTC Chennai</td>
                <td className="p-4 text-[#1A1A1A]">Broadway ➔ Tambaram via Guindy</td>
                <td className="p-4">
                  <span className="text-[10px] uppercase font-mono font-semibold text-[#C26A4A] bg-[#C26A4A]/10 px-2 py-0.5 border border-[#C26A4A]/20">
                    Delay (5m)
                  </span>
                </td>
                <td className="p-4 text-[#5A5A5A]">Surface traffic near Guindy flyover; deluxe buses in transit.</td>
              </tr>

              <tr className="hover:bg-[#F9F8F6] transition-colors">
                <td className="p-4">
                  <LineBadge code="MTC-570" color="#C26A4A" type="BUS" size="sm" />
                </td>
                <td className="p-4 font-medium text-[#1A1A1A]">MTC Chennai</td>
                <td className="p-4 text-[#1A1A1A]">CMBT Koyambedu ➔ Siruseri OMR</td>
                <td className="p-4">
                  <span className="text-[10px] uppercase font-mono font-semibold text-[#2E4034] bg-[#2E4034]/10 px-2 py-0.5 border border-[#2E4034]/20">
                    On Schedule
                  </span>
                </td>
                <td className="p-4 text-[#5A5A5A]">Connecting IT corridor hubs smoothly via Velachery.</td>
              </tr>

              <tr className="hover:bg-[#F9F8F6] transition-colors">
                <td className="p-4">
                  <LineBadge code="SHARE-AUTO" color="#8C6D3B" type="AUTO" size="sm" />
                </td>
                <td className="p-4 font-medium text-[#1A1A1A]">Share Auto</td>
                <td className="p-4 text-[#1A1A1A]">Guindy ➔ Porur &amp; Adyar Feeder</td>
                <td className="p-4">
                  <span className="text-[10px] uppercase font-mono font-semibold text-[#2E4034] bg-[#2E4034]/10 px-2 py-0.5 border border-[#2E4034]/20">
                    High Frequency
                  </span>
                </td>
                <td className="p-4 text-[#5A5A5A]">Continuous 3-minute turnaround at metro pickup bays.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Commuter Mobility Balance */}
      <section className="bg-white border border-[#E8E6E1] p-6 sm:p-8 space-y-6 rounded-none sm:rounded-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8E6E1] pb-4">
          <div>
            <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-[#C26A4A]">
              Commuter Record
            </span>
            <h3 className="font-serif text-2xl text-[#1A1A1A]">
              {stats?.username || 'ChennaiTraveler_01'}
            </h3>
          </div>

          <div className="text-xs font-mono font-semibold bg-[#1A1A1A] text-white px-3 py-1.5 uppercase">
            CLEARANCE: LEVEL {stats?.clearanceLevel || 2} (REGULAR COMMUTER)
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#F9F8F6] border border-[#E8E6E1] p-6 space-y-1">
            <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C8C8C] block">Accumulated XP</span>
            <div className="text-3xl font-serif text-[#1A1A1A]">
              {stats?.xp || 260} XP
            </div>
            <div className="text-xs text-[#5A5A5A] pt-1">Next milestone tier: 300 XP</div>
          </div>

          <div className="bg-[#F9F8F6] border border-[#E8E6E1] p-6 space-y-1">
            <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C8C8C] block">Emissions Averted</span>
            <div className="text-3xl font-serif text-[#2E4034]">
              {(((stats?.carbonSavedGrams || 5840) / 1000)).toFixed(1)}kg CO₂
            </div>
            <div className="text-xs text-[#5A5A5A] pt-1">Equivalent to ~38 km private travel</div>
          </div>

          <div className="bg-[#F9F8F6] border border-[#E8E6E1] p-6 space-y-1">
            <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C8C8C] block">Commute Streak</span>
            <div className="text-3xl font-serif text-[#1A1A1A]">
              {stats?.streakDays || 10} Days
            </div>
            <div className="text-xs text-[#5A5A5A] pt-1">Consecutive transit usage</div>
          </div>
        </div>
      </section>
    </div>
  );
};
