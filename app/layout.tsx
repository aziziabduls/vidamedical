import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Vida Medical Centre | Layanan Medis & Kebugaran Terintegrasi Kebon Jeruk Jakarta',
  description:
    'Vida Medical Centre menyediakan layanan kesehatan modern berstandar internasional di Gedung The Vida, Kebon Jeruk, Jakarta Barat. Layanan unggulan: VidaBoost IV Therapy, MCU VidaHealth, VidaFit Weight Loss, Homecare Medis, dan Konsultasi Dokter Spesialis.',
  keywords: [
    'Vida Medical Centre',
    'Klinik Kebon Jeruk',
    'Gedung The Vida Jakarta',
    'VidaBoost IV Therapy',
    'VidaHealth MCU',
    'VidaFit Weight Loss',
    'Dokter Gizi Klinis Jakarta Barat',
    'Homecare Medis Kebon Jeruk',
    'Vaksinasi VidaShield',
    'Kalkulator Risiko Jantung',
  ],
  authors: [{ name: 'Vida Medical Centre' }],
  openGraph: {
    title: 'Vida Medical Centre | Solusi Kesehatan & Kebugaran Modern Jakarta Barat',
    description:
      'Solusi kesehatan terpadu: Cari Dokter Spesialis, Pusat Layanan Unggulan (VidaBoost, VidaFit, MCU, Homecare, Vaksinasi), dan Skrining Preventif di Gedung The Vida Kebon Jeruk.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'Vida Medical Centre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vida Medical Centre - Gedung The Vida, Kebon Jeruk',
    description:
      'Layanan medis dan kebugaran terpercaya dengan standar pelayanan prima berlokasi di Gedung The Vida Kebon Jeruk Jakarta Barat.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} font-sans antialiased text-slate-800 bg-[#f8fafc]`}
    >
      <body suppressHydrationWarning className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
