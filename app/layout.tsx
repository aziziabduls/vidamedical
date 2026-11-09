import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Vida Medical Centre | Klinik Medis & Kebugaran Terintegrasi Kebon Jeruk Jakarta',
  description:
    'Klinik layanan kesehatan dan medis modern di Gedung The Vida, Kebon Jeruk, Jakarta Barat. Layanan unggulan: VidaBoost Infus Vitamin IV Therapy, Paket MCU VidaHealth, VidaFit Weight Loss, Homecare Medis, dan Vaksinasi VidaShield.',
  keywords: [
    'Vida Medical Centre',
    'Klinik Kebon Jeruk',
    'Gedung The Vida Jakarta',
    'VidaBoost',
    'Infus Vitamin Jakarta Barat',
    'IV Therapy Jakarta',
    'VidaHealth MCU',
    'Medical Check Up Kebon Jeruk',
    'VidaFit',
    'Dokter Gizi Klinis Jakarta Barat',
    'Homecare Medis Jakarta',
    'Perawatan Luka Jakarta',
    'Vaksin Influenza Jakarta Barat',
  ],
  authors: [{ name: 'Vida Medical Centre' }],
  openGraph: {
    title: 'Vida Medical Centre | Layanan Medis & Kebugaran Gedung The Vida Jakarta',
    description:
      'Solusi kesehatan terpadu: VidaBoost IV Therapy (Silver, Gold, Platinum, Diamond), VidaHealth MCU + Bonus InBody, VidaFit Weight Loss bersama Dokter Spesialis Gizi, Layanan Homecare, dan Vaksinasi.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'Vida Medical Centre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vida Medical Centre - Gedung The Vida, Kebon Jeruk',
    description:
      'Klinik medis terpercaya di Jakarta Barat: VidaBoost IV Therapy, MCU VidaHealth, VidaFit, Homecare Medis, dan Vaksinasi.',
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
      className={`${plusJakartaSans.variable} font-sans antialiased text-slate-800 bg-white`}
    >
      <body suppressHydrationWarning className="min-h-screen bg-slate-50/50 flex flex-col">
        {children}
      </body>
    </html>
  );
}
