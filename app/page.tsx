import HomePageClient from '@/components/HomePageClient';
import {
  fetchActiveDoctors,
  fetchActivePromos,
  fetchArticleCategories,
  fetchPublishedArticles,
} from '@/lib/api-client';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [promos, articles, categories, doctors] = await Promise.all([
    fetchActivePromos(),
    fetchPublishedArticles(),
    fetchArticleCategories(),
    fetchActiveDoctors(),
  ]);

  return (
    <HomePageClient
      promos={promos}
      articles={articles}
      categories={categories}
      doctors={doctors}
    />
  );
}
