import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HealthpediaArticleClient from '@/components/HealthpediaArticleClient';
import {
  getArticleById,
  HEALTHPEDIA_ARTICLES,
} from '@/lib/healthpedia-articles';

interface ArtikelDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return HEALTHPEDIA_ARTICLES.map((article) => ({
    slug: article.id,
  }));
}

export async function generateMetadata({
  params,
}: ArtikelDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleById(slug);

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
  const currentIndex = HEALTHPEDIA_ARTICLES.findIndex((article) => article.id === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const article = HEALTHPEDIA_ARTICLES[currentIndex];
  const previousArticle = currentIndex > 0 ? HEALTHPEDIA_ARTICLES[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < HEALTHPEDIA_ARTICLES.length - 1
      ? HEALTHPEDIA_ARTICLES[currentIndex + 1]
      : null;

  return (
    <HealthpediaArticleClient
      article={article}
      previousArticle={previousArticle}
      nextArticle={nextArticle}
    />
  );
}

