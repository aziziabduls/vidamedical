const authService = require('../services/auth.service');
const env = require('../config/env');
const { AUTH_COOKIE_NAME } = require('../middlewares/auth.middleware');

async function login(req, res, next) {
  try {
    const result = await authService.login(req.body);

    res.cookie(AUTH_COOKIE_NAME, result.token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: env.isProduction,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

async function logout(_req, res, next) {
  try {
    res.clearCookie(AUTH_COOKIE_NAME, {
      httpOnly: true,
      sameSite: 'lax',
      secure: env.isProduction,
    });

    return res.status(200).json({
      success: true,
      message: 'Logged out',
    });
  } catch (error) {
    next(error);
  }
}

async function me(req, res, next) {
  try {
    const user = await authService.getProfile(req.user.id);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
  logout,
  me,
};
