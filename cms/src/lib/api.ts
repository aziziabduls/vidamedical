export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3350";

const TOKEN_STORAGE_KEY = "vida_cms_token";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface Promo {
  id: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  linkUrl: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleCategory {
  id: string;
  slug: string;
  name: string;
  sortOrder: number;
}

export interface ArticleSection {
  heading: string;
  body: string[];
}

export interface Article {
  id: string;
  slug: string;
  category: string;
  title: string;
  snippet: string;
  readTime: string;
  author: string;
  authorCredential?: string | null;
  dateLabel: string;
  imageUrl: string | null;
  content: string[];
  sections?: ArticleSection[] | null;
  keyTakeaways: string[];
  clinicalNote?: string | null;
  bookingCategory?: string | null;
  bookingOption?: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Doctor {
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
  createdAt: string;
  updatedAt: string;
}

export type ServiceCategory = "vidaboost" | "vidahealth" | "vidafit" | "homecare" | "lab" | "vaksinasi" | "coe";

export interface ServicePackage {
  id: string;
  category: ServiceCategory;
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
  createdAt: string;
  updatedAt: string;
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setStoredToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } else {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}

export function resolveMediaUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/uploads/")) return `${API_BASE_URL}${url}`;
  return url;
}

async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getStoredToken();
  const headers = new Headers(init.headers);
  if (!(init.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
    credentials: "include",
  });

  const payload = (await response.json().catch(() => null)) as {
    success?: boolean;
    message?: string;
    data?: T;
  } | null;

  if (!response.ok || !payload?.success) {
    const error = new Error(payload?.message ?? `Request failed (${response.status})`) as Error & {
      status?: number;
    };
    error.status = response.status;
    throw error;
  }

  return payload.data as T;
}

export async function loginAdmin(email: string, password: string) {
  const data = await apiRequest<{ token: string; user: AdminUser }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setStoredToken(data.token);
  return data;
}

export async function logoutAdmin() {
  try {
    await apiRequest<{ message?: string }>("/api/auth/logout", { method: "POST" });
  } finally {
    setStoredToken(null);
  }
}

export function getAdminProfile() {
  return apiRequest<AdminUser>("/api/auth/me");
}

export async function uploadImageFile(file: File) {
  const formData = new FormData();
  formData.append("image", file);
  return apiRequest<{ url: string; filename: string }>("/api/uploads", {
    method: "POST",
    body: formData,
  });
}

export function listPromos() {
  return apiRequest<Promo[]>("/api/promos");
}

export function createPromo(input: {
  title: string;
  imageUrl: string;
  imageAlt?: string;
  linkUrl?: string | null;
  sortOrder?: number;
  isActive?: boolean;
}) {
  return apiRequest<Promo>("/api/promos", { method: "POST", body: JSON.stringify(input) });
}

export function updatePromo(id: string, input: Partial<Promo>) {
  return apiRequest<Promo>(`/api/promos/${id}`, { method: "PATCH", body: JSON.stringify(input) });
}

export function deletePromo(id: string) {
  return apiRequest<{ id: string }>(`/api/promos/${id}`, { method: "DELETE" });
}

export function listArticleCategories() {
  return apiRequest<ArticleCategory[]>("/api/article-categories");
}

export function createArticleCategory(input: { name: string; slug?: string; sortOrder?: number }) {
  return apiRequest<ArticleCategory>("/api/article-categories", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function deleteArticleCategory(id: string) {
  return apiRequest<{ id: string }>(`/api/article-categories/${id}`, { method: "DELETE" });
}

export function listArticles() {
  return apiRequest<Article[]>("/api/articles");
}

export function getArticle(slugOrId: string) {
  return apiRequest<Article>(`/api/articles/${encodeURIComponent(slugOrId)}`);
}

export function createArticle(input: {
  title: string;
  slug?: string;
  category: string;
  snippet: string;
  author: string;
  authorCredential?: string | null;
  readTime?: string;
  dateLabel?: string;
  imageUrl?: string | null;
  content: string[];
  sections?: ArticleSection[] | null;
  keyTakeaways: string[];
  clinicalNote?: string | null;
  bookingCategory?: string | null;
  bookingOption?: string | null;
  isPublished?: boolean;
}) {
  return apiRequest<Article>("/api/articles", { method: "POST", body: JSON.stringify(input) });
}

export function updateArticle(id: string, input: Partial<Article>) {
  return apiRequest<Article>(`/api/articles/${id}`, { method: "PATCH", body: JSON.stringify(input) });
}

export function deleteArticle(id: string) {
  return apiRequest<{ id: string }>(`/api/articles/${id}`, { method: "DELETE" });
}

export function listDoctors() {
  return apiRequest<Doctor[]>("/api/doctors");
}

export function createDoctor(input: {
  name: string;
  poliCode: string;
  poliName: string;
  specialistTag: string;
  schedule: string;
  location: string;
  description: string;
  focusAreas: string[];
  isActive?: boolean;
  sortOrder?: number;
}) {
  return apiRequest<Doctor>("/api/doctors", { method: "POST", body: JSON.stringify(input) });
}

export function updateDoctor(id: string, input: Partial<Doctor>) {
  return apiRequest<Doctor>(`/api/doctors/${id}`, { method: "PATCH", body: JSON.stringify(input) });
}

export function deleteDoctor(id: string) {
  return apiRequest<{ id: string }>(`/api/doctors/${id}`, { method: "DELETE" });
}

export function listServices(category?: string) {
  const qs = category && category !== "all" ? `?category=${encodeURIComponent(category)}` : "";
  return apiRequest<ServicePackage[]>(`/api/services${qs}`);
}

export function createService(input: {
  category: ServiceCategory;
  slug?: string;
  name: string;
  subtitle?: string | null;
  tagline?: string | null;
  priceLabel?: string | null;
  durationMinutes?: number | null;
  badge?: string | null;
  description: string;
  features: string[];
  isActive?: boolean;
  sortOrder?: number;
}) {
  return apiRequest<ServicePackage>("/api/services", { method: "POST", body: JSON.stringify(input) });
}

export function updateService(id: string, input: Partial<ServicePackage>) {
  return apiRequest<ServicePackage>(`/api/services/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export function deleteService(id: string) {
  return apiRequest<{ id: string }>(`/api/services/${id}`, { method: "DELETE" });
}
