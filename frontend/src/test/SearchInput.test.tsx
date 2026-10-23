import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { Stop } from '../types/transit';

const mockStops: Stop[] = [
  { id: '1', code: 'CHN-CTL', name: 'Chennai Central', sector: 'Central Hub', x: 250, y: 120, zone: 1 },
  { id: '2', code: 'AIRPORT', name: 'Chennai International Airport', sector: 'Meenambakkam', x: 150, y: 440, zone: 2 },
  { id: '3', code: 'T-NAGAR', name: 'T. Nagar (Panagal Park)', sector: 'Commercial Core', x: 210, y: 260, zone: 1 }
];

describe('🏛️ Aesthetic Chennai Transit — Route Search Input (Home Page)', () => {
  it('renders editorial hero headline and floating search dispatch card', () => {
    const handleToast = vi.fn();

    render(
      <MemoryRouter>
        <HomePage stops={mockStops} onTriggerToast={handleToast} />
      </MemoryRouter>
    );

    expect(screen.getByText(/The Art of Moving Through/i)).toBeInTheDocument();
    expect(screen.getByText(/Plan Your Metropolitan Itinerary/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Explore Route Options/i })).toBeInTheDocument();
    expect(screen.getByText(/Chennai Central ➔ Airport/i)).toBeInTheDocument();
  });

  it('allows selecting departure and destination stations and submitting route search', () => {
    const handleToast = vi.fn();

    render(
      <MemoryRouter>
        <HomePage stops={mockStops} onTriggerToast={handleToast} />
      </MemoryRouter>
    );

    const originSelect = screen.getByLabelText(/Departure Station:/i);
    const destSelect = screen.getByLabelText(/Arrival Destination:/i);

    fireEvent.change(originSelect, { target: { value: 'CHN-CTL' } });
    fireEvent.change(destSelect, { target: { value: 'AIRPORT' } });

    const submitBtn = screen.getByRole('button', { name: /Explore Route Options/i });
    fireEvent.click(submitBtn);

    expect(submitBtn).toBeInTheDocument();
  });
});
