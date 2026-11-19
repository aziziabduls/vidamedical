import type { Metadata } from 'next';
import ServiceDetailShell from '@/components/ServiceDetailShell';

export const metadata: Metadata = {
  title: 'Medical Check Up | Vida Medical Centre',
  description:
    'Paket Medical Check Up VidaHealth di Kebon Jeruk dengan laboratorium lengkap, EKG 12-Lead, dan bonus analisis komposisi tubuh InBody.',
};

export default function MedicalCheckUpPage() {
  return <ServiceDetailShell serviceId="medical-check-up" />;
}
