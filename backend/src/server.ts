import app from './app';
import { connectDB } from './db';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  try {
    await connectDB();
  } catch (err: any) {
    console.warn(`[SERVER] Database bootstrap warning: ${err.message}. Server starting anyway.`);
  }

  app.listen(PORT, () => {
    console.log(`🌿 [CHENNAI-TRANSIT] Engine listening on port ${PORT}`);
    console.log(`🌿 [CHENNAI-TRANSIT] Healthcheck: http://localhost:${PORT}/health`);
    console.log(`🌿 [CHENNAI-TRANSIT] Stops API:   http://localhost:${PORT}/api/stops`);
    console.log(`🌿 [CHENNAI-TRANSIT] Auth API:    http://localhost:${PORT}/api/auth/login`);
  });
}

bootstrap();
