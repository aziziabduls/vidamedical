const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');
const env = require('../config/env');
const { NotFoundError, UnauthorizedError } = require('../utils/errors');

async function login({ email, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await prisma.adminUser.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    throw new UnauthorizedError('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    throw new UnauthorizedError('Invalid email or password');
  }

  const token = jwt.sign(
    {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
}

async function getProfile(userId) {
  const user = await prisma.adminUser.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new NotFoundError('Admin user not found');
  }

  return user;
}

module.exports = {
  login,
  getProfile,
};
