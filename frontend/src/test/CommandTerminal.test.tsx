import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LineDirectoryPage } from '../pages/LineDirectoryPage';

// Mock api service
vi.mock('../services/api', () => ({
  fetchLines: vi.fn().mockResolvedValue([
    {
      id: '1',
      code: 'METRO-BLU',
      name: 'Chennai Metro Blue Line',
      color: '#2E4034',
      type: 'METRO',
      status: 'ON_TIME',
      frequencyMinutes: 5,
      speedKmh: 80,
      stopsCount: 7,
      imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
      stops: [
        { id: '1', code: 'BROADWAY', name: 'Broadway Bus Terminus', sector: 'George Town' },
        { id: '2', code: 'CHN-CTL', name: 'Chennai Central', sector: 'Park Town' },
        { id: '3', code: 'AIRPORT', name: 'Chennai International Airport', sector: 'Meenambakkam' }
      ]
    },
    {
      id: '2',
      code: 'MTC-21G',
      name: 'MTC City Bus 21G',
      color: '#C26A4A',
      type: 'BUS',
      status: 'DELAYED',
      frequencyMinutes: 10,
      speedKmh: 32,
      stopsCount: 7,
      imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80',
      stops: []
    }
  ])
}));

describe('🏛️ Aesthetic Chennai Transit — Line Directory Page Tests', () => {
  it('renders line directory header, category filters, and line cards', async () => {
    render(
      <MemoryRouter>
        <LineDirectoryPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Arterial Transit Directory/i)).toBeInTheDocument();
    expect(screen.getByText(/The Transit Lines of Chennai/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Chennai Metro Blue Line/i)).toBeInTheDocument();
      expect(screen.getByText(/MTC City Bus 21G/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Nominal/i)).toBeInTheDocument();
    expect(screen.getByText(/Advisory/i)).toBeInTheDocument();
  });
});
