import type { Metadata } from 'next';
import LayananIndexClient from '@/components/LayananIndexClient';

export const metadata: Metadata = {
  title: 'Layanan Medis | Vida Medical Centre',
  description:
    'Jelajahi layanan Vaksinasi, Medical Check Up, Vitamin Booster (VidaBoost), dan Home Care di Vida Medical Centre Kebon Jeruk.',
};

export default function LayananPage() {
  return <LayananIndexClient />;
}
