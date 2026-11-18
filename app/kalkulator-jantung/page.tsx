import type { Metadata } from 'next';
import KalkulatorJantungClient from '@/components/KalkulatorJantungClient';

export const metadata: Metadata = {
  title: 'Kalkulator Risiko Jantung 10 Tahun | Vida Medical Centre',
  description:
    'Hitung estimasi risiko kardiovaskular 10 tahun Anda berdasarkan usia, tekanan darah sistolik, kolesterol total, indeks massa tubuh, dan faktor risiko gaya hidup.',
};

export default function KalkulatorJantungPage() {
  return <KalkulatorJantungClient />;
}
