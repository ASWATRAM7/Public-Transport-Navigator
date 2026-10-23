import React from 'react';
import { SoftCard } from '../components/ui/SoftCard';
import { BookOpen, Award, CheckCircle2, Users, Layers, Sparkles, MapPin, Target } from 'lucide-react';

export const AboutManifestoPage: React.FC = () => {
  return (
    <div className="space-y-16 animate-fadeIn max-w-6xl mx-auto pb-16">
      {/* Header Banner */}
      <section className="space-y-4 pb-6 border-b border-slate-100">
        <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full text-indigo-700 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Agile Methodologies Course Project · Colophon & Lore</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Agile Architecture & Chennai Transit Lore
        </h1>
        <p className="text-sm text-slate-500 max-w-3xl leading-relaxed">
          Crafted as an end-to-end Agile Scrum showcase. Combining a rigorous multi-option Dijkstra pathfinding engine with modern Fintech Pro SaaS interface design across 30 real Chennai metropolitan transit hubs.
        </p>
      </section>

      {/* Part 1: Agile Scrum Framework & Sprint Matrix */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
              <Target className="w-5 h-5 text-indigo-600" />
              <span>Agile Scrum Sprint Execution Matrix</span>
            </h2>
            <p className="text-xs text-slate-500">
              4 Epics · 10 User Stories with Acceptance Criteria · 100% Automated Test Pass Rate
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
            Sprint Velocity: 50 Story Points Delivered
          </span>
        </div>

        <SoftCard padding="none" className="overflow-hidden border border-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="p-4">Epic ID</th>
                  <th className="p-4">Scope & Architecture</th>
                  <th className="p-4">User Stories</th>
                  <th className="p-4">Story Points</th>
                  <th className="p-4">Verification Artifact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 font-mono font-bold text-indigo-600">EPIC-01</td>
                  <td className="p-4 font-bold text-slate-900">
                    Chennai Multi-Modal Topology & Pathfinding Engine
                  </td>
                  <td className="p-4 text-slate-500">Story 1.1, 1.2</td>
                  <td className="p-4 font-mono font-bold text-slate-800">13 Pts</td>
                  <td className="p-4">
                    <span className="inline-flex items-center text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                      9 Jest Tests Passing
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 font-mono font-bold text-indigo-600">EPIC-02</td>
                  <td className="p-4 font-bold text-slate-900">
                    Fintech Pro Design Tokens & Atomic UI Components
                  </td>
                  <td className="p-4 text-slate-500">Story 2.1, 2.2</td>
                  <td className="p-4 font-mono font-bold text-slate-800">8 Pts</td>
                  <td className="p-4">
                    <span className="inline-flex items-center text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                      Design System Documented
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 font-mono font-bold text-indigo-600">EPIC-03</td>
                  <td className="p-4 font-bold text-slate-900">
                    Multi-Option Routing (Fastest, Cheapest, Alternative)
                  </td>
                  <td className="p-4 text-slate-500">Story 3.1 – 3.5</td>
                  <td className="p-4 font-mono font-bold text-slate-800">21 Pts</td>
                  <td className="p-4">
                    <span className="inline-flex items-center text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                      3-Option Comparison Active
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 font-mono font-bold text-indigo-600">EPIC-04</td>
                  <td className="p-4 font-bold text-slate-900">
                    Commuter Gamification & Automated Telemetry Logging
                  </td>
                  <td className="p-4 text-slate-500">Story 4.1</td>
                  <td className="p-4 font-mono font-bold text-slate-800">8 Pts</td>
                  <td className="p-4">
                    <span className="inline-flex items-center text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                      React Testing Library Passing
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </SoftCard>
      </section>

      {/* Part 2: Chennai Historical Evolution */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SoftCard hoverable className="p-6 sm:p-8 space-y-4 border border-slate-100">
          <div className="flex items-center space-x-2 text-indigo-600">
            <MapPin className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Historical Mobility Lore</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            From Madras Trams (1895) to CMRL Metro
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            In May 1895, Chennai (then Madras) launched Asia's first electric tramway system, linking George Town and Central Station with Mylapore and Triplicane.
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            In 1931, Southern Railway electrified the Suburban line out to Tambaram, transforming the southern perimeter. In 2015, the Chennai Metro Rail Limited (CMRL) opened modern high-speed underground and elevated corridors, bridging old cultural neighborhoods with modern IT hubs.
          </p>
        </SoftCard>

        <SoftCard hoverable className="p-6 sm:p-8 space-y-4 border border-slate-100">
          <div className="flex items-center space-x-2 text-emerald-600">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Modern Polycentric Reality</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Multimodal Integration Architecture
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Today Chennai has over 11 million residents spanning the Rajiv Gandhi IT Expressway (OMR), Port Trust, industrial hubs in Guindy and Porur, and dense shopping corridors in T. Nagar.
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            This application resolves real commuter friction by computing multi-option trade-offs: speed vs. cost in INR (₹) vs. first-mile feeder convenience, proving how Agile principles drive user-centric software delivery.
          </p>
        </SoftCard>
      </section>

      {/* Part 3: Commuter Personas */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <span>Target Commuter Personas</span>
          </h2>
          <p className="text-xs text-slate-500">
            User research and contextual modeling driving our Agile acceptance criteria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SoftCard hoverable className="p-6 space-y-3 border border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                IT Professional
              </span>
              <span className="text-xs font-bold text-slate-400">Persona 01</span>
            </div>
            <h4 className="text-base font-bold text-slate-900">Kavitha Raman</h4>
            <p className="text-xs text-slate-500 font-medium">Anna Nagar ➔ OMR Sholinganallur</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Prioritizes speed and air-conditioned reliability to beat peak summer heat. Needs to see the Fastest Metro option alongside quick Auto connectors.
            </p>
          </SoftCard>

          <SoftCard hoverable className="p-6 space-y-3 border border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                Suburban Commuter
              </span>
              <span className="text-xs font-bold text-slate-400">Persona 02</span>
            </div>
            <h4 className="text-base font-bold text-slate-900">Ravi Sundaram</h4>
            <p className="text-xs text-slate-500 font-medium">Tambaram ➔ Chennai Central</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Daily traveler seeking the lowest fare in ₹. Relies on the Cheapest Option tab to compare Southern Suburban EMU rail (₹5) with MTC bus alternatives.
            </p>
          </SoftCard>

          <SoftCard hoverable className="p-6 space-y-3 border border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                University Student
              </span>
              <span className="text-xs font-bold text-slate-400">Persona 03</span>
            </div>
            <h4 className="text-base font-bold text-slate-900">Ashwin Kumar</h4>
            <p className="text-xs text-slate-500 font-medium">Velachery ➔ Guindy / Adyar</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tech-savvy daily transit rider who loves tracking commuter XP, logging trips for carbon credits, and exploring flexible Share Auto connectors.
            </p>
          </SoftCard>
        </div>
      </section>
    </div>
  );
};
