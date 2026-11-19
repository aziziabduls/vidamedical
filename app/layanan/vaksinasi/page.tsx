import type { Metadata } from 'next';
import ServiceDetailShell from '@/components/ServiceDetailShell';

export const metadata: Metadata = {
  title: 'Vaksinasi | Vida Medical Centre',
  description:
    'Layanan vaksinasi Influenza 4-Valen, Pneumonia, HPV 9-Valen, dan Hepatitis B dengan kontrol rantai dingin terstandar di Vida Medical Centre.',
};

export default function VaksinasiPage() {
  return <ServiceDetailShell serviceId="vaksinasi" />;
}
