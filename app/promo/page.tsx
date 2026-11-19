import type { Metadata } from 'next';
import PromoClient from '@/components/PromoClient';

export const metadata: Metadata = {
  title: 'Promo & Paket Kesehatan | Vida Medical Centre',
  description:
    'Penawaran paket Vaksinasi, Medical Check Up, Vitamin Booster, dan Home Care di Vida Medical Centre Kebon Jeruk.',
};

export default function PromoPage() {
  return <PromoClient />;
}
