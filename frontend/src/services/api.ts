import {
  TransitLine,
  Stop,
  RouteSearchResult,
  StatsResponse,
  ScanRewardResult,
  AuthUser,
  AuthResponse,
  LoginCredentials,
  RegisterCredentials
} from '../types/transit';

const API_BASE = '/api';

export async function fetchLines(): Promise<TransitLine[]> {
  try {
    const res = await fetch(`${API_BASE}/lines`);
    if (!res.ok) throw new Error(`HTTP_${res.status}`);
    const data = await res.json();
    return data.lines || [];
  } catch (err) {
    console.warn('Fallback lines:', err);
    return [
      { id: '1', code: 'METRO-BLU', name: 'Chennai Metro Blue Line', color: '#4F46E5', type: 'METRO', status: 'ON_TIME', frequencyMinutes: 5, speedKmh: 80, stopsCount: 14 },
      { id: '2', code: 'METRO-GRN', name: 'Chennai Metro Green Line', color: '#059669', type: 'METRO', status: 'ON_TIME', frequencyMinutes: 6, speedKmh: 80, stopsCount: 11 },
      { id: '3', code: 'SUB-SOUTH', name: 'Chennai Suburban Southern Line', color: '#D97706', type: 'TRAIN', status: 'ON_TIME', frequencyMinutes: 10, speedKmh: 70, stopsCount: 11 },
      { id: '4', code: 'MTC-21G', name: 'MTC Bus 21G Express', color: '#2563EB', type: 'BUS', status: 'ON_TIME', frequencyMinutes: 8, speedKmh: 35, stopsCount: 8 }
    ];
  }
}

export async function fetchStops(): Promise<Stop[]> {
  try {
    const res = await fetch(`${API_BASE}/stops`);
    if (!res.ok) throw new Error(`HTTP_${res.status}`);
    const data = await res.json();
    return data.stops || [];
  } catch (err) {
    console.warn('Fallback stops:', err);
    return [
      { id: '1', code: 'CHN-CTL', name: 'Chennai Central (Dr. MGR Central)', sector: 'Park Town Core', x: 280, y: 120, zone: 1 },
      { id: '2', code: 'EGM-STN', name: 'Egmore Junction', sector: 'Central Sector', x: 260, y: 170, zone: 1 },
      { id: '3', code: 'T-NAGAR', name: 'T. Nagar (Panagal Park)', sector: 'Commercial Hub', x: 250, y: 350, zone: 2 },
      { id: '4', code: 'ADYAR', name: 'Adyar Depot', sector: 'South Coastal Corridor', x: 410, y: 440, zone: 2 },
      { id: '5', code: 'TAMBARAM', name: 'Tambaram Railway Terminal', sector: 'Southern Gateway', x: 190, y: 640, zone: 3 },
      { id: '6', code: 'OMR-SHL', name: 'OMR Sholinganallur Junction', sector: 'IT Expressway Corridor', x: 440, y: 610, zone: 3 },
      { id: '7', code: 'AIRPORT', name: 'Chennai International Airport', sector: 'Meenambakkam Aviation Zone', x: 210, y: 490, zone: 3 },
      { id: '8', code: 'GUINDY', name: 'Guindy Industrial Estate & Metro', sector: 'South Industrial Corridor', x: 240, y: 420, zone: 2 }
    ];
  }
}

export async function searchRoute(from: string, to: string): Promise<RouteSearchResult> {
  const query = new URLSearchParams({ from, to }).toString();
  const res = await fetch(`${API_BASE}/route/search?${query}`);
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || `Route search failed with code ${res.status}`);
  }
  return res.json();
}

export async function fetchStats(): Promise<StatsResponse> {
  try {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error(`HTTP_${res.status}`);
    return res.json();
  } catch (err) {
    return {
      status: 'FALLBACK',
      stats: {
        id: 'local',
        username: 'CHENNAI_COMMUTER_PRO',
        clearanceLevel: 3,
        xp: 450,
        carbonSavedGrams: 8920,
        streakDays: 14,
        routesScanned: 26,
        lastActive: new Date().toISOString()
      },
      systemMetrics: {
        totalLines: 7,
        delayedLines: 0,
        activeStops: 30,
        networkReliabilityScore: 98.6,
        averageHeadwayMinutes: 5.2
      }
    };
  }
}

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('chennai_auth_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export async function loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Login failed');
  }
  return data;
}

export async function registerUser(credentials: RegisterCredentials): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Registration failed');
  }
  return data;
}

export async function fetchCurrentUser(): Promise<AuthUser> {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) {
    throw new Error('UNAUTHORIZED');
  }
  const data = await res.json();
  return {
    ...data.user,
    stats: data.stats
  };
}

export async function recordRouteScan(carbonSaved: number, xpReward: number = 10): Promise<ScanRewardResult> {
  const res = await fetch(`${API_BASE}/stats/scan`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ carbonSaved, xpReward })
  });
  if (!res.ok) {
    throw new Error('FAILED_TO_LOG_TELEMETRY');
  }
  return res.json();
}
