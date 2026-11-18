import type { Metadata } from 'next';
import HealthpediaArchiveClient from '@/components/HealthpediaArchiveClient';
import { fetchArticleCategories, fetchPublishedArticles } from '@/lib/api-client';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Healthpedia & Artikel Medis | Vida Medical Centre',
  description:
    'Kumpulan artikel edukasi medis dan panduan kesehatan berbasis bukti ilmiah yang ditinjau oleh dokter spesialis dan tenaga medis Vida Medical Centre.',
};

export default async function ArtikelIndexPage() {
  const [articles, categories] = await Promise.all([
    fetchPublishedArticles(),
    fetchArticleCategories(),
  ]);
  return <HealthpediaArchiveClient articles={articles} categories={categories} />;
}
