const prisma = require('../config/prisma');
const { NotFoundError } = require('../utils/errors');

async function listPromos({ activeOnly = false } = {}) {
  return prisma.promo.findMany({
    where: activeOnly ? { isActive: true } : undefined,
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
  });
}

async function createPromo(data) {
  return prisma.promo.create({
    data: {
      title: data.title,
      imageUrl: data.imageUrl,
      imageAlt: data.imageAlt || data.title,
      linkUrl: data.linkUrl || null,
      sortOrder: data.sortOrder ?? 0,
      isActive: data.isActive ?? true,
    },
  });
}

async function updatePromo(id, data) {
  const existing = await prisma.promo.findUnique({ where: { id } });
  if (!existing) {
    throw new NotFoundError('Promo not found');
  }

  return prisma.promo.update({
    where: { id },
    data,
  });
}

async function deletePromo(id) {
  const existing = await prisma.promo.findUnique({ where: { id } });
  if (!existing) {
    throw new NotFoundError('Promo not found');
  }

  await prisma.promo.delete({ where: { id } });
  return { id };
}

module.exports = {
  listPromos,
  createPromo,
  updatePromo,
  deletePromo,
};
