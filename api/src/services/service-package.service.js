const prisma = require('../config/prisma');
const { BusinessError, NotFoundError } = require('../utils/errors');

function normalizeSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function listServicePackages({ category, activeOnly = false } = {}) {
  return prisma.servicePackage.findMany({
    where: {
      ...(activeOnly ? { isActive: true } : {}),
      ...(category ? { category } : {}),
    },
    orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }, { createdAt: 'asc' }],
  });
}

async function createServicePackage(data) {
  const slug = normalizeSlug(data.slug || `${data.category}-${data.name}`);
  if (!slug) {
    throw new BusinessError('Service slug cannot be empty');
  }

  const duplicate = await prisma.servicePackage.findUnique({ where: { slug } });
  if (duplicate) {
    throw new BusinessError(`Service with slug "${slug}" already exists`, 409);
  }

  return prisma.servicePackage.create({
    data: {
      category: data.category,
      slug,
      name: data.name,
      subtitle: data.subtitle || null,
      tagline: data.tagline || null,
      priceLabel: data.priceLabel || null,
      durationMinutes: data.durationMinutes ?? null,
      badge: data.badge || null,
      description: data.description,
      features: data.features,
      isActive: data.isActive ?? true,
      sortOrder: data.sortOrder ?? 0,
    },
  });
}

async function updateServicePackage(id, data) {
  const existing = await prisma.servicePackage.findUnique({ where: { id } });
  if (!existing) {
    throw new NotFoundError('Service package not found');
  }

  let nextSlug = existing.slug;
  if (data.slug !== undefined) {
    nextSlug = normalizeSlug(data.slug);
    if (!nextSlug) {
      throw new BusinessError('Service slug cannot be empty');
    }
    if (nextSlug !== existing.slug) {
      const duplicate = await prisma.servicePackage.findUnique({ where: { slug: nextSlug } });
      if (duplicate) {
        throw new BusinessError(`Service with slug "${nextSlug}" already exists`, 409);
      }
    }
  }

  return prisma.servicePackage.update({
    where: { id },
    data: {
      ...data,
      slug: nextSlug,
    },
  });
}

async function deleteServicePackage(id) {
  const existing = await prisma.servicePackage.findUnique({ where: { id } });
  if (!existing) {
    throw new NotFoundError('Service package not found');
  }

  await prisma.servicePackage.delete({ where: { id } });
  return { id };
}

module.exports = {
  listServicePackages,
  createServicePackage,
  updateServicePackage,
  deleteServicePackage,
};
