import type { Metadata } from 'next';
import ServiceDetailShell from '@/components/ServiceDetailShell';

export const metadata: Metadata = {
  title: 'Vitamin Booster | Vida Medical Centre',
  description:
    'Terapi infus vitamin VidaBoost (Silver, Gold, Platinum, Diamond) di lounge privat Gedung The Vida dengan sediaan resmi BPOM.',
};

export default function VitaminBoosterPage() {
  return <ServiceDetailShell serviceId="vitamin-booster" />;
}
