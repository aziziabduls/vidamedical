const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const env = {
  port: Number(process.env.PORT) || 3350,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET || 'vida-medical-cms-dev-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  corsOrigins: (process.env.CORS_ORIGINS || 'http://localhost:3550,http://localhost:3450')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  uploadDir: path.resolve(__dirname, '../../', process.env.UPLOAD_DIR || 'uploads'),
  isProduction: process.env.NODE_ENV === 'production',
};

module.exports = env;
