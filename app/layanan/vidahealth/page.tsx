import type { Metadata } from 'next';
import VidaHealthPageClient from '@/components/VidaHealthPageClient';
import { fetchActiveServices, mapVidaHealthPackages } from '@/lib/api-client';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'VidaHealth Medical Check Up | Vida Medical Centre',
  description:
    'Paket pemeriksaan medis berkala (MCU) VidaHealth dengan evaluasi organ vital, profil metabolik, EKG, dan bonus analisis komposisi tubuh InBody.',
};

export default async function VidaHealthPage() {
  const services = await fetchActiveServices('vidahealth');
  const packages = mapVidaHealthPackages(services);
  return <VidaHealthPageClient packages={packages} />;
}
