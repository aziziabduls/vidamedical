import type { Metadata } from 'next';
import VidaFitPageClient from '@/components/VidaFitPageClient';

export const metadata: Metadata = {
  title: 'VidaFit Weight Management & Gizi Klinis | Vida Medical Centre',
  description:
    'Program manajemen berat badan medis bersama Dokter Spesialis Gizi Klinis (Sp.GK) dengan pemetaan InBody 770 dan meal plan personal.',
};

export default function VidaFitPage() {
  return <VidaFitPageClient />;
}
