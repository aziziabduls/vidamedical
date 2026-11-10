import type { Metadata } from 'next';
import HealthpediaArchiveClient from '@/components/HealthpediaArchiveClient';

export const metadata: Metadata = {
  title: 'Healthpedia & Artikel Medis | Vida Medical Centre',
  description:
    'Kumpulan artikel edukasi medis dan panduan kesehatan berbasis bukti ilmiah yang ditinjau oleh dokter spesialis dan tenaga medis Vida Medical Centre.',
};

export default function ArtikelIndexPage() {
  return <HealthpediaArchiveClient />;
}

