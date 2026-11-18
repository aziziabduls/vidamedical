import {
  VIDA_BOOST_TIERS,
  VIDA_HEALTH_PACKAGES,
  type IVTier,
  type MCUPackage,
} from '@/lib/clinic-rules';
import {
  HEALTHPEDIA_ARTICLES,
  HEALTHPEDIA_CATEGORIES,
  getArticleById,
  type HealthpediaArticle,
  type HealthpediaArticleSection,
} from '@/lib/healthpedia-articles';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3350';

export interface ApiPromo {
  id: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  linkUrl: string | null;
  sortOrder: number;
  isActive: boolean;
}

export interface PromoBannerItem {
  id?: string;
  imageSrc: string;
  imageAlt: string;
  linkUrl?: string | null;
}

export interface ApiArticle {
  id: string;
  slug: string;
  category: string;
  title: string;
  snippet: string;
  readTime: string;
  author: string;
  authorCredential?: string | null;
  dateLabel: string;
  imageUrl?: string | null;
  content: string[];
  sections?: HealthpediaArticleSection[] | null;
  keyTakeaways: string[];
  clinicalNote?: string | null;
  bookingCategory?: string | null;
  bookingOption?: string | null;
  isPublished: boolean;
}

export interface ApiDoctor {
  id: string;
  name: string;
  poliCode: string;
  poliName: string;
  specialistTag: string;
  schedule: string;
  location: string;
  description: string;
  focusAreas: string[];
  isActive: boolean;
  sortOrder: number;
}

export interface ApiServicePackage {
  id: string;
  category: 'vidaboost' | 'vidahealth' | 'vidafit' | 'homecare' | 'lab' | 'vaksinasi' | 'coe';
  slug: string;
  name: string;
  subtitle: string | null;
  tagline: string | null;
  priceLabel: string | null;
  durationMinutes: number | null;
  badge: string | null;
  description: string;
  features: string[];
  isActive: boolean;
  sortOrder: number;
}

export const FALLBACK_PROMOS: PromoBannerItem[] = [
  {
    imageSrc: '/images/vida_promo.jpeg',
    imageAlt: 'Promo Highlight Vida Medical Centre 1',
  },
  {
    imageSrc: '/images/vida_promo_2.jpeg',
    imageAlt: 'Promo Highlight Vida Medical Centre 2',
  },
];

export const FALLBACK_DOCTORS: ApiDoctor[] = [
  {
    id: 'sp-pd',
    name: 'Poli Spesialis Penyakit Dalam (Sp.PD)',
    poliCode: 'sp-pd',
    poliName: 'Poli Penyakit Dalam',
    specialistTag: 'Dokter Spesialis Penyakit Dalam',
    schedule: 'Senin – Sabtu · 08.00 – 20.00 WIB',
    location: 'Poliklinik Lantai 6, Gedung The Vida',
    description:
      'Konsultasi medis komprehensif untuk pencegahan, diagnosis, dan tata laksana gangguan kesehatan organ dalam serta penyakit metabolik dewasa.',
    focusAreas: [
      'Pengelolaan diabetes melitus & resistensi insulin',
      'Evaluasi hipertensi, kolesterol & sindrom metabolik',
      'Gangguan pencernaan, hati, ginjal, & keluhan infeksi',
      'Konsultasi lanjutan hasil Medical Check Up',
    ],
    isActive: true,
    sortOrder: 0,
  },
  {
    id: 'sp-gk',
    name: 'Poli Spesialis Gizi Klinis (Sp.GK)',
    poliCode: 'sp-gk',
    poliName: 'Poli Gizi Klinis',
    specialistTag: 'Dokter Spesialis Gizi Klinis',
    schedule: 'Senin – Sabtu · 09.00 – 19.00 WIB',
    location: 'Poli Gizi Klinis, Gedung The Vida',
    description:
      'Pendampingan nutrisi medis dan manajemen berat badan terukur berbasis pemindaian komposisi tubuh InBody 770 serta kondisi klinis pasien.',
    focusAreas: [
      'Program penurunan & pemeliharaan berat badan (VidaFit)',
      'Penyusunan meal plan personal sesuai laju metabolisme',
      'Terapi nutrisi medis untuk diabetes, hipertensi & dislipidemia',
      'Evaluasi massa otot, lemak visceral & cairan tubuh berkala',
    ],
    isActive: true,
    sortOrder: 1,
  },
];

export function resolveMediaUrl(url: string | null | undefined): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/uploads/')) return `${API_BASE_URL}${url}`;
  return url;
}

async function fetchApiJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { success?: boolean; data?: T };
    return json?.success && json.data !== undefined ? json.data : null;
  } catch {
    return null;
  }
}

export function mapApiArticle(raw: ApiArticle): HealthpediaArticle {
  const paragraphs = Array.isArray(raw.content) ? raw.content : [];
  const sections =
    Array.isArray(raw.sections) && raw.sections.length > 0
      ? raw.sections
      : paragraphs.length > 0
        ? [{ heading: 'Pembahasan Medis', body: paragraphs }]
        : [];

  return {
    id: raw.slug,
    category: raw.category,
    title: raw.title,
    snippet: raw.snippet,
    author: raw.author,
    authorCredential: raw.authorCredential || 'Tim Medis Vida Medical Centre · Kebon Jeruk',
    date: raw.dateLabel,
    readTime: raw.readTime || '4 menit baca',
    imageUrl: raw.imageUrl ? resolveMediaUrl(raw.imageUrl) : undefined,
    keyPoints: Array.isArray(raw.keyTakeaways) ? raw.keyTakeaways : [],
    paragraphs,
    sections,
    clinicalNote:
      raw.clinicalNote ||
      'Konsultasikan kondisi dan rencana perawatan Anda bersama dokter di Gedung The Vida, Kebon Jeruk.',
    bookingCategory: raw.bookingCategory || 'vidafit',
    bookingOption: raw.bookingOption || 'Konsultasi Dokter Spesialis',
  };
}

export async function fetchActivePromos(): Promise<PromoBannerItem[]> {
  const data = await fetchApiJson<ApiPromo[]>('/api/promos?active=true');
  if (!data) return FALLBACK_PROMOS;

  return data.map((item) => ({
    id: item.id,
    imageSrc: resolveMediaUrl(item.imageUrl),
    imageAlt: item.imageAlt || item.title,
    linkUrl: item.linkUrl,
  }));
}

export async function fetchPublishedArticles(): Promise<HealthpediaArticle[]> {
  const data = await fetchApiJson<ApiArticle[]>('/api/articles?published=true');
  if (!data || data.length === 0) return HEALTHPEDIA_ARTICLES;
  return data.map(mapApiArticle);
}

export async function fetchArticleBySlug(
  slug: string
): Promise<HealthpediaArticle | null> {
  const data = await fetchApiJson<ApiArticle>(
    `/api/articles/${encodeURIComponent(slug)}`
  );
  if (data) return mapApiArticle(data);
  return getArticleById(slug) ?? null;
}

export async function fetchActiveDoctors(): Promise<ApiDoctor[]> {
  const data = await fetchApiJson<ApiDoctor[]>('/api/doctors?active=true');
  if (!data || data.length === 0) return FALLBACK_DOCTORS;
  return data;
}

export async function fetchActiveServices(
  category?: string
): Promise<ApiServicePackage[]> {
  const qs = category
    ? `?active=true&category=${encodeURIComponent(category)}`
    : '?active=true';
  const data = await fetchApiJson<ApiServicePackage[]>(`/api/services${qs}`);
  return data ?? [];
}

export function mapVidaBoostTiers(services: ApiServicePackage[]): IVTier[] {
  const boostItems = services.filter((s) => s.category === 'vidaboost');
  if (boostItems.length === 0) return VIDA_BOOST_TIERS;

  return boostItems.map((item) => {
    const normalizedId = item.slug.replace(/^vidaboost-/, '') as IVTier['id'];
    return {
      id: (['silver', 'gold', 'platinum', 'diamond'].includes(normalizedId)
        ? normalizedId
        : 'gold') as IVTier['id'],
      name: item.name,
      tagline: item.tagline || item.subtitle || item.description,
      durationMinutes: item.durationMinutes ?? 45,
      highlightNutrients: Array.isArray(item.features) ? item.features : [],
      bestFor: item.description,
      badge: item.badge || undefined,
    };
  });
}

export interface ApiArticleCategory {
  id: string;
  slug: string;
  name: string;
  sortOrder: number;
}

export async function fetchArticleCategories(): Promise<string[]> {
  const data = await fetchApiJson<ApiArticleCategory[]>('/api/article-categories');
  if (!data || data.length === 0) return [...HEALTHPEDIA_CATEGORIES];
  return ['Semua Topik', ...data.map((cat) => cat.name)];
}

export function mapVidaHealthPackages(
  services: ApiServicePackage[]
): MCUPackage[] {
  const healthItems = services.filter((s) => s.category === 'vidahealth');
  if (healthItems.length === 0) return VIDA_HEALTH_PACKAGES;

  return healthItems.map((item) => ({
    id: item.slug,
    title: item.name,
    subtitle: item.subtitle || item.tagline || 'Paket Medical Check Up',
    includesBonusBodyComposition: true,
    features: Array.isArray(item.features) ? item.features : [],
    recommendedFor: item.description,
  }));
}
