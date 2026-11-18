import type { Metadata } from 'next';
import VidaBoostPageClient from '@/components/VidaBoostPageClient';
import { fetchActiveServices, mapVidaBoostTiers } from '@/lib/api-client';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'VidaBoost IV Therapy (Silver, Gold, Platinum, Diamond) | Vida Medical Centre',
  description:
    'Terapi infus vitamin dan mikronutrien intravena resmi BPOM di lounge privat Gedung The Vida: pilihan paket Silver, Gold, Platinum, dan Diamond.',
};

export default async function VidaBoostPage() {
  const services = await fetchActiveServices('vidaboost');
  const tiers = mapVidaBoostTiers(services);
  return <VidaBoostPageClient tiers={tiers} />;
}
