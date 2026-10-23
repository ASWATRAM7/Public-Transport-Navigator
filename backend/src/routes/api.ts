import { Router } from 'express';
import { getLines } from '../controllers/lineController';
import { getStops } from '../controllers/stopController';
import { searchRoute } from '../controllers/routeController';
import { getStats, recordScan } from '../controllers/statsController';

const router = Router();

// Lines & Network Topology
router.get('/lines', getLines);

// Stops Endpoints
router.get('/stops', getStops);

// Route Search Engine (Multi-Step Journey)
router.get('/route/search', searchRoute);

// Commuter Gamification & Live Telemetry Stats
router.get('/stats', getStats);
router.post('/stats/scan', recordScan);

export default router;
