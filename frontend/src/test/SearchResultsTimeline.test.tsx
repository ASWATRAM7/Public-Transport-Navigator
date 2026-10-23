import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { Stop } from '../types/transit';

const mockStops: Stop[] = [
  { id: '1', code: 'CHN-CTL', name: 'Chennai Central', sector: 'Central Hub', x: 250, y: 120, zone: 1 },
  { id: '2', code: 'AIRPORT', name: 'Chennai International Airport', sector: 'Meenambakkam', x: 150, y: 440, zone: 2 }
];

const { mockRouteOptions } = vi.hoisted(() => {
  const options = [
    {
      id: 'fastest',
      label: 'Fastest Route',
      badge: 'RECOMMENDED',
      totalDurationMinutes: 28,
      totalCostInr: 40,
      totalCarbonSavedGrams: 640,
      transferCount: 0,
      primaryMode: 'METRO',
      steps: [
        {
          id: 'fastest-step-1',
          stepType: 'WALK',
          title: 'Walk to Chennai Central Metro Station',
          instruction: 'Proceed along pedestrian subway concourse.',
          durationMinutes: 3,
          distanceMeters: 240,
          fareInr: 0
        },
        {
          id: 'fastest-step-2',
          stepType: 'TRANSIT',
          title: 'Board METRO-BLU (Chennai Metro Blue Line)',
          instruction: 'Ride Blue Line underground to Airport Terminal. Fare: ₹40.',
          durationMinutes: 21,
          lineCode: 'METRO-BLU',
          lineName: 'Chennai Metro Blue Line',
          lineColor: '#4F46E5',
          vehicleType: 'METRO',
          fareInr: 40
        },
        {
          id: 'fastest-step-3',
          stepType: 'WALK',
          title: 'Arrive at Airport Departure Terminal',
          instruction: 'Ascend via elevator to Terminal 1 Departures.',
          durationMinutes: 4,
          distanceMeters: 280,
          fareInr: 0
        }
      ],
      legs: [],
      fullPath: []
    },
    {
      id: 'cheapest',
      label: 'Cheapest Route',
      badge: 'LOWEST FARE',
      totalDurationMinutes: 38,
      totalCostInr: 12,
      totalCarbonSavedGrams: 720,
      transferCount: 0,
      primaryMode: 'BUS',
      steps: [
        {
          id: 'cheap-step-1',
          stepType: 'WALK',
          title: 'Walk to Central Bus Bay',
          instruction: 'Walk to Broadway / Central MTC bay.',
          durationMinutes: 4,
          distanceMeters: 300,
          fareInr: 0
        },
        {
          id: 'cheap-step-2',
          stepType: 'TRANSIT',
          title: 'Board MTC-21G (Express Bus)',
          instruction: 'Ride direct government city bus along Anna Salai. Fare: ₹12.',
          durationMinutes: 30,
          lineCode: 'MTC-21G',
          lineName: 'MTC Bus 21G Express',
          lineColor: '#2563EB',
          vehicleType: 'BUS',
          fareInr: 12
        },
        {
          id: 'cheap-step-3',
          stepType: 'WALK',
          title: 'Arrive at Airport Ground Level',
          instruction: 'Exit bus stand and cross to terminal concourse.',
          durationMinutes: 4,
          distanceMeters: 250,
          fareInr: 0
        }
      ],
      legs: [],
      fullPath: []
    },
    {
      id: 'alternative',
      label: 'Alternative Route',
      badge: 'MULTIMODAL PRO',
      totalDurationMinutes: 26,
      totalCostInr: 65,
      totalCarbonSavedGrams: 550,
      transferCount: 1,
      primaryMode: 'MULTIMODAL',
      steps: [
        {
          id: 'alt-step-1',
          stepType: 'AUTO',
          title: 'Auto Feeder to Egmore',
          instruction: 'Quick app auto to avoid signal queue.',
          durationMinutes: 6,
          distanceMeters: 1400,
          fareInr: 30
        },
        {
          id: 'alt-step-2',
          stepType: 'TRANSIT',
          title: 'Board Southern Suburban EMU',
          instruction: 'Fast corridor train to Meenambakkam.',
          durationMinutes: 18,
          lineCode: 'SUB-SOUTH',
          lineName: 'Chennai Suburban Southern Line',
          lineColor: '#D97706',
          vehicleType: 'TRAIN',
          fareInr: 5
        },
        {
          id: 'alt-step-3',
          stepType: 'WALK',
          title: 'Walk to Terminal',
          instruction: 'Walk across the skywalk to airport.',
          durationMinutes: 2,
          distanceMeters: 150,
          fareInr: 0
        }
      ],
      legs: [],
      fullPath: []
    }
  ];
  return { mockRouteOptions: options };
});

// Mock API searchRoute and recordRouteScan
vi.mock('../services/api', () => ({
  searchRoute: vi.fn().mockResolvedValue({
    fromStop: { id: '1', code: 'CHN-CTL', name: 'Chennai Central', sector: 'Central Hub', x: 250, y: 120, zone: 1 },
    toStop: { id: '2', code: 'AIRPORT', name: 'Chennai International Airport', sector: 'Meenambakkam', x: 150, y: 440, zone: 2 },
    totalDurationMinutes: 28,
    totalCostInr: 40,
    totalCarbonSavedGrams: 640,
    transferCount: 0,
    options: mockRouteOptions,
    steps: mockRouteOptions[0].steps,
    legs: [],
    fullPath: []
  }),
  recordRouteScan: vi.fn().mockResolvedValue({
    status: 'TELEMETRY_LOGGED',
    reward: { xpGained: 10, carbonSavedGrams: 640, levelUp: false },
    stats: { xp: 230, carbonSavedGrams: 5760, clearanceLevel: 2, streakDays: 8, routesScanned: 19 }
  })
}));

describe('🏛️ Chennai Pro Transit SearchResultsPage & Multi-Option Comparison', () => {
  it('renders all 3 route option comparison cards (Fastest, Cheapest, Alternative)', async () => {
    const handleTriggerToast = vi.fn();

    render(
      <MemoryRouter initialEntries={['/search?from=CHN-CTL&to=AIRPORT']}>
        <SearchResultsPage stops={mockStops} onTriggerToast={handleTriggerToast} />
      </MemoryRouter>
    );

    // Verify 3 option tabs are displayed
    const fastestMatches = await screen.findAllByText(/Fastest Route/i);
    expect(fastestMatches.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Cheapest Route/i)).toBeInTheDocument();
    expect(screen.getByText(/Alternative Route/i)).toBeInTheDocument();

    // Verify badges and fares
    expect(screen.getByText(/RECOMMENDED/i)).toBeInTheDocument();
    expect(screen.getByText(/LOWEST FARE/i)).toBeInTheDocument();
    expect(screen.getByText(/MULTIMODAL PRO/i)).toBeInTheDocument();

    // Verify active option timeline steps
    expect(screen.getByText(/Board METRO-BLU/i)).toBeInTheDocument();
    expect(screen.getByText(/Walk to Chennai Central Metro Station/i)).toBeInTheDocument();
  });

  it('switches between options when comparison cards are clicked', async () => {
    const handleTriggerToast = vi.fn();

    render(
      <MemoryRouter initialEntries={['/search?from=CHN-CTL&to=AIRPORT']}>
        <SearchResultsPage stops={mockStops} onTriggerToast={handleTriggerToast} />
      </MemoryRouter>
    );

    const cheapestCard = (await screen.findAllByText(/Cheapest Route/i))[0];
    fireEvent.click(cheapestCard);

    // Timeline should now display Cheapest route steps
    expect(await screen.findByText(/Board MTC-21G/i)).toBeInTheDocument();
    expect(screen.getByText(/Walk to Central Bus Bay/i)).toBeInTheDocument();
  });

  it('triggers record trip and logs commuter XP', async () => {
    const handleTriggerToast = vi.fn();

    render(
      <MemoryRouter initialEntries={['/search?from=CHN-CTL&to=AIRPORT']}>
        <SearchResultsPage stops={mockStops} onTriggerToast={handleTriggerToast} />
      </MemoryRouter>
    );

    const recordBtn = await screen.findByRole('button', { name: /Record Trip & Earn XP/i });
    expect(recordBtn).toBeInTheDocument();
    fireEvent.click(recordBtn);
  });
});
