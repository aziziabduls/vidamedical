import type { Metadata } from 'next';
import LayananOverviewClient from '@/components/LayananOverviewClient';
import { fetchActiveServices } from '@/lib/api-client';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Layanan Kami | Vida Medical Centre',
  description:
    'Layanan medis dan pusat unggulan Vida Medical Centre: VidaBoost (Silver, Gold, Platinum, Diamond), VidaHealth MCU, VidaFit Gizi Klinis, Homecare, dan Laboratorium.',
};

export default async function LayananPage() {
  const services = await fetchActiveServices();
  return <LayananOverviewClient services={services} />;
}
