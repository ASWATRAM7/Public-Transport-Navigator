import app from './app';
import { connectDB } from './db';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  try {
    await connectDB();
  } catch (err: any) {
    console.warn(`[SERVER] Database bootstrap warning: ${err.message}. Server starting anyway.`);
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`🌿 [CHENNAI-TRANSIT] Engine listening on port ${PORT}`);
    console.log(`🌿 [CHENNAI-TRANSIT] Healthcheck: http://127.0.0.1:${PORT}/health`);
    console.log(`🌿 [CHENNAI-TRANSIT] Stops API:   http://127.0.0.1:${PORT}/api/stops`);
    console.log(`🌿 [CHENNAI-TRANSIT] Auth API:    http://127.0.0.1:${PORT}/api/auth/login`);
  });
}

bootstrap();
