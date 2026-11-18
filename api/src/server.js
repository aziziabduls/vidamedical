const env = require('./config/env');
const prisma = require('./config/prisma');
const app = require('./app');

async function start() {
  try {
    await prisma.$connect();
    const server = app.listen(env.port, () => {
      console.log(`[vida-medical-api] listening on http://localhost:${env.port}`);
    });

    const shutdown = async () => {
      server.close(async () => {
        await prisma.$disconnect();
        process.exit(0);
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (error) {
    console.error('[vida-medical-api] failed to start:', error);
    process.exit(1);
  }
}

start();
