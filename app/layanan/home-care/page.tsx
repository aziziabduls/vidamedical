import type { Metadata } from 'next';
import ServiceDetailShell from '@/components/ServiceDetailShell';

export const metadata: Metadata = {
  title: 'Home Care | Vida Medical Centre',
  description:
    'Layanan perawat dan dokter datang ke rumah di Kebon Jeruk dan sekitarnya: perawatan luka modern, NGT, kateter urin, dan infus vitamin.',
};

export default function HomeCarePage() {
  return <ServiceDetailShell serviceId="home-care" />;
}
