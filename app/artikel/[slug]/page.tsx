import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HealthpediaArticleClient from '@/components/HealthpediaArticleClient';
import { fetchArticleBySlug, fetchPublishedArticles } from '@/lib/api-client';

export const dynamic = 'force-dynamic';

interface ArtikelDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ArtikelDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Artikel Tidak Ditemukan | Healthpedia Vida Medical Centre',
    };
  }

  return {
    title: `${article.title} | Healthpedia Vida Medical Centre`,
    description: article.snippet,
  };
}

export default async function ArtikelDetailPage({ params }: ArtikelDetailPageProps) {
  const { slug } = await params;
  const articles = await fetchPublishedArticles();
  const currentIndex = articles.findIndex((article) => article.id === slug);

  const article =
    currentIndex >= 0 ? articles[currentIndex] : await fetchArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const previousArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex >= 0 && currentIndex < articles.length - 1
      ? articles[currentIndex + 1]
      : null;

  return (
    <HealthpediaArticleClient
      article={article}
      previousArticle={previousArticle}
      nextArticle={nextArticle}
      allArticles={articles}
    />
  );
}
