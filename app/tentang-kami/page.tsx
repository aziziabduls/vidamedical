import type { Metadata } from 'next';
import TentangKamiClient from '@/components/TentangKamiClient';

export const metadata: Metadata = {
  title: 'Tentang Kami | Vida Medical Centre',
  description:
    'Kenali Vida Medical Centre di Gedung The Vida, Kebon Jeruk, Jakarta Barat. Layanan medis modern yang dekat, nyaman, dan terpercaya untuk Anda dan keluarga.',
};

export default function TentangKamiPage() {
  return <TentangKamiClient />;
}
