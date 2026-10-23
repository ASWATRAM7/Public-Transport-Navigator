import express from 'express';
import cors from 'cors';
import apiRouter from './routes/api';
import authRouter from './routes/authRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Editorial Healthcheck
app.get('/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'Chennai Metropolitan Transit Authority API',
    version: '2.0.0-EDITORIAL',
    timestamp: new Date().toISOString()
  });
});

// Mount API routes
app.use('/api/auth', authRouter);
app.use('/api', apiRouter);

// Fallback 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'NODE_NOT_FOUND', path: req.path });
});

export default app;
