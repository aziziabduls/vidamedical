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

async function listCategories() {
  return prisma.articleCategory.findMany({
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
  });
}

async function createCategory(data) {
  const name = data.name.trim();
  const slug = normalizeSlug(data.slug || name);
  if (!slug) {
    throw new BusinessError('Category slug cannot be empty');
  }

  const duplicate = await prisma.articleCategory.findFirst({
    where: { OR: [{ slug }, { name }] },
  });
  if (duplicate) {
    throw new BusinessError(`Category "${name}" already exists`, 409);
  }

  return prisma.articleCategory.create({
    data: {
      name,
      slug,
      sortOrder: data.sortOrder ?? 0,
    },
  });
}

async function deleteCategory(id) {
  const existing = await prisma.articleCategory.findUnique({ where: { id } });
  if (!existing) {
    throw new NotFoundError('Category not found');
  }

  await prisma.articleCategory.delete({ where: { id } });
  return { id };
}

module.exports = {
  listCategories,
  createCategory,
  deleteCategory,
};
