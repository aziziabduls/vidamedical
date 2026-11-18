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

async function listArticles({ category, publishedOnly = false } = {}) {
  return prisma.article.findMany({
    where: {
      ...(publishedOnly ? { isPublished: true } : {}),
      ...(category && category !== 'Semua Topik' ? { category } : {}),
    },
    orderBy: { createdAt: 'desc' },
  });
}

async function getArticleBySlug(slugOrId) {
  const article = await prisma.article.findFirst({
    where: {
      OR: [{ slug: slugOrId }, { id: slugOrId }],
    },
  });
  if (!article) {
    throw new NotFoundError('Article not found');
  }
  return article;
}

async function createArticle(data) {
  const slug = normalizeSlug(data.slug || data.title);
  if (!slug) {
    throw new BusinessError('Article slug cannot be empty');
  }

  const duplicate = await prisma.article.findUnique({ where: { slug } });
  if (duplicate) {
    throw new BusinessError(`Article with slug "${slug}" already exists`, 409);
  }

  return prisma.article.create({
    data: {
      slug,
      category: data.category,
      title: data.title,
      snippet: data.snippet,
      readTime: data.readTime || '4 menit baca',
      author: data.author,
      authorCredential: data.authorCredential || null,
      dateLabel: data.dateLabel || new Date().toLocaleDateString('id-ID', { month: 'short', year: 'numeric' }),
      imageUrl: data.imageUrl || null,
      content: data.content,
      sections: data.sections ?? null,
      keyTakeaways: data.keyTakeaways,
      clinicalNote: data.clinicalNote || null,
      bookingCategory: data.bookingCategory || null,
      bookingOption: data.bookingOption || null,
      isPublished: data.isPublished ?? true,
    },
  });
}

async function updateArticle(id, data) {
  const existing = await prisma.article.findUnique({ where: { id } });
  if (!existing) {
    throw new NotFoundError('Article not found');
  }

  let nextSlug = existing.slug;
  if (data.slug !== undefined) {
    nextSlug = normalizeSlug(data.slug);
    if (!nextSlug) {
      throw new BusinessError('Article slug cannot be empty');
    }
    if (nextSlug !== existing.slug) {
      const duplicate = await prisma.article.findUnique({ where: { slug: nextSlug } });
      if (duplicate) {
        throw new BusinessError(`Article with slug "${nextSlug}" already exists`, 409);
      }
    }
  }

  return prisma.article.update({
    where: { id },
    data: {
      ...data,
      slug: nextSlug,
    },
  });
}

async function deleteArticle(id) {
  const existing = await prisma.article.findUnique({ where: { id } });
  if (!existing) {
    throw new NotFoundError('Article not found');
  }

  await prisma.article.delete({ where: { id } });
  return { id };
}

module.exports = {
  listArticles,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle,
};
