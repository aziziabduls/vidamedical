import type { Metadata } from 'next';
import DokterKamiClient from '@/components/DokterKamiClient';
import { fetchActiveDoctors } from '@/lib/api-client';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Dokter Kami & Poliklinik Spesialis | Vida Medical Centre',
  description:
    'Konsultasi Dokter Spesialis Penyakit Dalam (Sp.PD) dan Dokter Spesialis Gizi Klinis (Sp.GK) di Vida Medical Centre, Gedung The Vida Kebon Jeruk.',
};

export default async function DokterKamiPage() {
  const doctors = await fetchActiveDoctors();
  return <DokterKamiClient doctors={doctors} />;
}
