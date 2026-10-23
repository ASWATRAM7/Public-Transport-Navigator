import request from 'supertest';
import dotenv from 'dotenv';
dotenv.config();

import app from '../src/app';
import { connectDB, disconnectDB } from '../src/db';
import { User } from '../src/models/User';

jest.setTimeout(30000);

describe('🏛️ CHENNAI TRANSIT EDITORIAL — Backend API & Pathfinding Tests', () => {
  let authToken: string;

  beforeAll(async () => {
    await connectDB();
    // Clean up test user if previously created
    await User.deleteMany({ email: 'editorial.tester@chennaitransit.in' });
  }, 30000);

  afterAll(async () => {
    await User.deleteMany({ email: 'editorial.tester@chennaitransit.in' });
    await disconnectDB();
  }, 30000);

  describe('Authentication Endpoints (/api/auth)', () => {
    it('POST /api/auth/register creates a new user and returns JWT token', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Editorial Commuter',
          email: 'editorial.tester@chennaitransit.in',
          password: 'SecurePassword123!'
        });

      expect(res.status).toBe(201);
      expect(res.body.status).toBe('REGISTERED');
      expect(res.body.token).toBeDefined();
      expect(res.body.user.email).toBe('editorial.tester@chennaitransit.in');
      expect(res.body.user.name).toBe('Editorial Commuter');
      expect(res.body.user.passwordHash).toBeUndefined();

      authToken = res.body.token;
    });

    it('POST /api/auth/register rejects duplicate email with 409 Conflict', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Duplicate Commuter',
          email: 'editorial.tester@chennaitransit.in',
          password: 'AnotherPassword123!'
        });

      expect(res.status).toBe(409);
      expect(res.body.error).toBe('EMAIL_ALREADY_REGISTERED');
    });

    it('POST /api/auth/login succeeds with valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'editorial.tester@chennaitransit.in',
          password: 'SecurePassword123!'
        });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('AUTHENTICATED');
      expect(res.body.token).toBeDefined();
      expect(res.body.user.email).toBe('editorial.tester@chennaitransit.in');
    });

    it('POST /api/auth/login rejects incorrect password with 401 Unauthorized', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'editorial.tester@chennaitransit.in',
          password: 'WrongPassword999!'
        });

      expect(res.status).toBe(401);
      expect(res.body.error).toBe('INVALID_CREDENTIALS');
    });

    it('GET /api/auth/me returns commuter profile with valid Bearer token', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('VERIFIED');
      expect(res.body.user.email).toBe('editorial.tester@chennaitransit.in');
      expect(res.body.stats).toBeDefined();
    });

    it('GET /api/auth/me rejects requests without token with 401 Unauthorized', async () => {
      const res = await request(app).get('/api/auth/me');
      expect(res.status).toBe(401);
      expect(res.body.error).toBe('UNAUTHORIZED');
    });
  });

  describe('Core Health & Topology Endpoints', () => {
    it('GET /health returns 200 and operational transit status', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ONLINE');
    });

    it('GET /api/lines returns all Chennai Metro, Bus, and Suburban rail lines', async () => {
      const res = await request(app).get('/api/lines');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ONLINE');
      expect(Array.isArray(res.body.lines)).toBe(true);
      expect(res.body.lines.length).toBeGreaterThanOrEqual(4);

      const blueLine = res.body.lines.find((l: any) => l.code === 'METRO-BLU');
      expect(blueLine).toBeDefined();
      expect(blueLine.name).toContain('Chennai Metro Blue Line');
      expect(blueLine.color).toBe('#2E4034');
      expect(blueLine.imageUrl).toBeDefined();

      const mtcBus = res.body.lines.find((l: any) => l.code === 'MTC-21G');
      expect(mtcBus).toBeDefined();
      expect(mtcBus.type).toBe('BUS');
    });

    it('GET /api/stops returns authentic Chennai transit locations with imagery', async () => {
      const res = await request(app).get('/api/stops');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ONLINE');
      expect(Array.isArray(res.body.stops)).toBe(true);
      expect(res.body.stops.length).toBeGreaterThanOrEqual(30);

      const central = res.body.stops.find((s: any) => s.code === 'CHN-CTL');
      expect(central).toBeDefined();
      expect(central.name).toContain('Chennai Central');
      expect(central.imageUrl).toBeDefined();

      const airport = res.body.stops.find((s: any) => s.code === 'AIRPORT');
      expect(airport).toBeDefined();
    });
  });

  describe('Multi-Step Chennai Route Search (GET /api/route/search)', () => {
    it('returns 400 when from or to parameters are missing', async () => {
      const res = await request(app).get('/api/route/search');
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('BAD_REQUEST');
    });

    it('returns 404 when stop code does not exist in Chennai network', async () => {
      const res = await request(app).get('/api/route/search?from=DELHI_METRO&to=CHN-CTL');
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('STOP_NOT_FOUND');
    });

    it('computes direct route between Chennai Central and Airport (Metro Blue Line)', async () => {
      const res = await request(app).get('/api/route/search?from=CHN-CTL&to=AIRPORT');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ROUTE_COMPUTED');
      expect(res.body.fromStop.name).toContain('Chennai Central');
      expect(res.body.toStop.name).toContain('Chennai International Airport');
      expect(res.body.totalDurationMinutes).toBeGreaterThan(0);
      expect(res.body.totalCarbonSavedGrams).toBeGreaterThan(0);
      expect(res.body.totalCostInr).toBeGreaterThan(0);

      // Verify journey options array (Fastest, Cheapest, Alternative)
      expect(Array.isArray(res.body.options)).toBe(true);
      expect(res.body.options.length).toBeGreaterThanOrEqual(3);
      expect(res.body.options[0].id).toBe('fastest');
      expect(res.body.options[1].id).toBe('cheapest');
      expect(res.body.options[2].id).toBe('alternative');
      expect(res.body.options[0]).toHaveProperty('totalCostInr');

      // Verify journey steps structure
      expect(res.body.steps.length).toBeGreaterThanOrEqual(3);
      expect(res.body.steps[0].stepType).toBe('WALK');
      expect(res.body.steps[1].stepType).toBe('TRANSIT');
      expect(res.body.steps[res.body.steps.length - 1].stepType).toBe('WALK');
    });

    it('computes multi-step transfer journey across Chennai modes (T. Nagar to Tambaram)', async () => {
      const res = await request(app).get('/api/route/search?from=T-NAGAR&to=TAMBARAM');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ROUTE_COMPUTED');
      expect(res.body.transferCount).toBeGreaterThanOrEqual(1);

      const hasTransfer = res.body.steps.some((s: any) => s.stepType === 'TRANSFER');
      expect(hasTransfer).toBe(true);
      expect(res.body.options.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Commuter Gamification & Telemetry', () => {
    it('GET /api/stats returns Chennai commuter metrics', async () => {
      const res = await request(app).get('/api/stats');
      expect(res.status).toBe(200);
      expect(res.body.stats).toHaveProperty('xp');
      expect(res.body.stats).toHaveProperty('carbonSavedGrams');
      expect(res.body.systemMetrics).toHaveProperty('totalLines');
    });

    it('POST /api/stats/scan increments commuter XP and carbon saved', async () => {
      const res = await request(app)
        .post('/api/stats/scan')
        .send({ xpReward: 10, carbonSaved: 240 });
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('TELEMETRY_LOGGED');
      expect(res.body.reward.xpGained).toBe(10);
      expect(res.body.reward.carbonSavedGrams).toBe(240);
    });
  });
});
