const { AppError } = require('../utils/errors');

function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
}

function errorHandler(err, _req, res, _next) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.details ? { errors: err.details } : {}),
    });
  }

  // Handle Prisma unique constraint violation cleanly
  if (err && err.code === 'P2002') {
    return res.status(409).json({
      success: false,
      message: 'A record with that unique value already exists',
    });
  }

  if (err && err.name === 'MulterError') {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  console.error('[API Error]', err);
  return res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
