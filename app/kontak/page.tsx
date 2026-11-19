import type { Metadata } from 'next';
import KontakClient from '@/components/KontakClient';

export const metadata: Metadata = {
  title: 'Kontak & Lokasi | Vida Medical Centre',
  description:
    'Hubungi Vida Medical Centre melalui WhatsApp 0811 5750 260 atau kunjungi Gedung The Vida Lantai 6, Kebon Jeruk, Jakarta Barat.',
};

export default function KontakPage() {
  return <KontakClient />;
}
