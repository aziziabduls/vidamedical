const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { UnauthorizedError } = require('../utils/errors');

const AUTH_COOKIE_NAME = 'vida_cms_token';

function extractToken(req) {
  if (req.cookies && req.cookies[AUTH_COOKIE_NAME]) {
    return req.cookies[AUTH_COOKIE_NAME];
  }
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }
  return null;
}

function requireAuth(req, _res, next) {
  try {
    const token = extractToken(req);
    if (!token) {
      throw new UnauthorizedError('Authentication required');
    }

    const payload = jwt.verify(token, env.jwtSecret);
    req.user = {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      role: payload.role,
    };
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next(new UnauthorizedError('Invalid or expired session token'));
    }
    next(error);
  }
}

module.exports = {
  AUTH_COOKIE_NAME,
  requireAuth,
};
