export interface TransitLine {
  id: string;
  code: string;
  name: string;
  color: string;
  type: string; // METRO, BUS, TRAIN, AUTO, SUBWAY, etc.
  status: string; // ON_TIME, DELAYED, MAINTENANCE
  frequencyMinutes: number;
  speedKmh: number;
  stopsCount: number;
  imageUrl?: string;
  stops?: Stop[];
}

export interface Stop {
  id: string;
  code: string;
  name: string;
  sector: string;
  x: number;
  y: number;
  zone: number;
  imageUrl?: string;
  lines?: TransitLine[];
}

export interface JourneyStep {
  id: string;
  stepType: 'WALK' | 'TRANSIT' | 'TRANSFER' | 'AUTO';
  title: string;
  instruction: string;
  durationMinutes: number;
  distanceMeters?: number;
  lineCode?: string;
  lineName?: string;
  lineColor?: string;
  vehicleType?: string;
  fareInr?: number;
  imageUrl?: string;
  fromStop?: { id: string; code: string; name: string; sector: string };
  toStop?: { id: string; code: string; name: string; sector: string };
  stopsCount?: number;
  intermediateStops?: Array<{ id: string; code: string; name: string; sector: string; x: number; y: number }>;
}

export interface RouteLeg {
  lineCode: string;
  lineName: string;
  lineColor: string;
  vehicleType: string;
  fromStop: { id: string; code: string; name: string; sector: string };
  toStop: { id: string; code: string; name: string; sector: string };
  durationMinutes: number;
  fareInr?: number;
  stopsCount: number;
  stops: Array<{ id: string; code: string; name: string; sector: string; x: number; y: number }>;
  routeCode?: string;
  routeName?: string;
  routeColor?: string;
}

export interface RouteOption {
  id: 'fastest' | 'cheapest' | 'alternative';
  label: string;
  badge: string;
  totalDurationMinutes: number;
  totalCostInr: number;
  totalCarbonSavedGrams: number;
  transferCount: number;
  primaryMode: 'METRO' | 'BUS' | 'TRAIN' | 'AUTO' | 'MULTIMODAL';
  steps: JourneyStep[];
  legs: RouteLeg[];
  fullPath: Array<{
    id: string;
    code: string;
    name: string;
    sector: string;
    x: number;
    y: number;
    activeRouteColor: string;
  }>;
}

export interface RouteSearchResult {
  fromStop: Stop;
  toStop: Stop;
  totalDurationMinutes: number;
  totalCostInr: number;
  totalCarbonSavedGrams: number;
  transferCount: number;
  options: RouteOption[];
  steps: JourneyStep[];
  legs: RouteLeg[];
  fullPath: Array<{
    id: string;
    code: string;
    name: string;
    sector: string;
    x: number;
    y: number;
    activeRouteColor: string;
  }>;
}

export interface UserStats {
  id: string;
  username: string;
  clearanceLevel: number;
  xp: number;
  carbonSavedGrams: number;
  streakDays: number;
  routesScanned: number;
  lastActive: string;
}

export type UserProfile = UserStats;

export interface SystemMetrics {
  totalLines: number;
  delayedLines: number;
  activeStops: number;
  networkReliabilityScore: number;
  averageHeadwayMinutes: number;
}

export interface StatsResponse {
  status: string;
  stats: UserStats;
  systemMetrics: SystemMetrics;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'commuter' | 'admin';
  createdAt?: string;
  stats?: UserStats;
}

export interface AuthResponse {
  status: string;
  token: string;
  user: AuthUser;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface ScanRewardResult {
  status: string;
  reward: {
    xpGained: number;
    carbonSavedGrams: number;
    levelUp: boolean;
  };
  stats: UserStats;
  profile?: UserStats;
}
