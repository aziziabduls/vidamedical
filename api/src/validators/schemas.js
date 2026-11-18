const { z } = require('zod');

const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

const createPromoSchema = z.object({
  title: z.string().min(1, 'Judul promo wajib diisi'),
  imageUrl: z.string().min(1, 'URL gambar wajib diisi'),
  imageAlt: z.string().optional(),
  linkUrl: z.string().nullable().optional(),
  sortOrder: z.coerce.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
});

const updatePromoSchema = createPromoSchema.partial();

const createArticleCategorySchema = z.object({
  name: z.string().min(1, 'Nama kategori wajib diisi'),
  slug: z.string().optional(),
  sortOrder: z.coerce.number().int().min(0).optional(),
});

const articleSectionSchema = z.object({
  heading: z.string().min(1),
  body: z.array(z.string().min(1)).min(1),
});

const createArticleSchema = z.object({
  slug: z.string().optional(),
  category: z.string().min(1, 'Kategori wajib diisi'),
  title: z.string().min(1, 'Judul artikel wajib diisi'),
  snippet: z.string().min(1, 'Ringkasan wajib diisi'),
  readTime: z.string().optional(),
  author: z.string().min(1, 'Penulis wajib diisi'),
  authorCredential: z.string().nullable().optional(),
  dateLabel: z.string().optional(),
  imageUrl: z.string().nullable().optional(),
  content: z.array(z.string().min(1)).min(1, 'Konten artikel minimal 1 paragraf'),
  sections: z.array(articleSectionSchema).nullable().optional(),
  keyTakeaways: z.array(z.string().min(1)).default([]),
  clinicalNote: z.string().nullable().optional(),
  bookingCategory: z.string().nullable().optional(),
  bookingOption: z.string().nullable().optional(),
  isPublished: z.boolean().optional(),
});

const updateArticleSchema = createArticleSchema.partial();

const createDoctorSchema = z.object({
  name: z.string().min(1, 'Nama dokter / unit wajib diisi'),
  poliCode: z.string().min(1, 'Kode poli wajib diisi'),
  poliName: z.string().min(1, 'Nama poli wajib diisi'),
  specialistTag: z.string().min(1, 'Spesialisasi wajib diisi'),
  schedule: z.string().min(1, 'Jadwal praktik wajib diisi'),
  location: z.string().min(1, 'Lokasi wajib diisi'),
  description: z.string().min(1, 'Deskripsi wajib diisi'),
  focusAreas: z.array(z.string().min(1)).default([]),
  isActive: z.boolean().optional(),
  sortOrder: z.coerce.number().int().min(0).optional(),
});

const updateDoctorSchema = createDoctorSchema.partial();

const serviceCategoryEnum = z.enum([
  'vidaboost',
  'vidahealth',
  'vidafit',
  'homecare',
  'lab',
  'vaksinasi',
  'coe',
]);

const createServiceSchema = z.object({
  category: serviceCategoryEnum,
  slug: z.string().optional(),
  name: z.string().min(1, 'Nama layanan wajib diisi'),
  subtitle: z.string().nullable().optional(),
  tagline: z.string().nullable().optional(),
  priceLabel: z.string().nullable().optional(),
  durationMinutes: z.coerce.number().int().positive().nullable().optional(),
  badge: z.string().nullable().optional(),
  description: z.string().min(1, 'Deskripsi wajib diisi'),
  features: z.array(z.string().min(1)).default([]),
  isActive: z.boolean().optional(),
  sortOrder: z.coerce.number().int().min(0).optional(),
});

const updateServiceSchema = createServiceSchema.partial();

module.exports = {
  loginSchema,
  createPromoSchema,
  updatePromoSchema,
  createArticleCategorySchema,
  createArticleSchema,
  updateArticleSchema,
  createDoctorSchema,
  updateDoctorSchema,
  createServiceSchema,
  updateServiceSchema,
};
