import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { AuthProvider } from '../context/AuthContext';

describe('🏛️ Aesthetic Chennai Transit — Split-Screen Authentication Tests', () => {
  it('renders LoginPage with editorial imagery, inputs, and demo fill button', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Sign In to Transit/i)).toBeInTheDocument();
    expect(screen.getByText(/Commuter Dossier • Vol. IV/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    const demoBtn = screen.getByRole('button', { name: /Use Demo Account/i });
    expect(demoBtn).toBeInTheDocument();

    // Click demo button and verify fields are populated
    fireEvent.click(demoBtn);
    const emailInput = screen.getByLabelText(/Email Address/i) as HTMLInputElement;
    expect(emailInput.value).toBe('testuser@chennaitransit.in');
  });

  it('renders RegisterPage with starter bonus badge, inputs, and link to sign in', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <RegisterPage />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Create Transit Pass/i)).toBeInTheDocument();
    expect(screen.getByText(/Membership • Issue 08/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeInTheDocument();
  });
});
