import type { Metadata } from 'next';
import { Newsreader, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import BookingProvider from '@/components/BookingProvider';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
  variable: '--font-editorial',
});

export const metadata: Metadata = {
  icons: {
    icon: '/favicon/favicon.ico',
  },
  title: 'Vida Medical Centre | Layanan Medis & Kebugaran Terpadu Kebon Jeruk Jakarta',
  description:
    'Vida Medical Centre menyediakan layanan kesehatan modern berstandar klinis di Gedung The Vida, Kebon Jeruk, Jakarta Barat. Layanan unggulan: Vaksinasi, Medical Check Up, Vitamin Booster (VidaBoost), dan Home Care.',
  keywords: [
    'Vida Medical Centre',
    'Klinik Kebon Jeruk',
    'Gedung The Vida Jakarta',
    'Vaksinasi VidaShield',
    'Medical Check Up VidaHealth',
    'Vitamin Booster VidaBoost',
    'Home Care Medis Kebon Jeruk',
  ],
  authors: [{ name: 'Vida Medical Centre' }],
  openGraph: {
    title: 'Vida Medical Centre | Layanan Medis Terpercaya untuk Keluarga',
    description:
      'Layanan kesehatan dekat, nyaman, dan penuh perhatian di Gedung The Vida Kebon Jeruk: Vaksinasi, Medical Check Up, Vitamin Booster, dan Home Care.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'Vida Medical Centre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vida Medical Centre - Gedung The Vida, Kebon Jeruk',
    description:
      'Layanan medis dan kebugaran terpercaya berlokasi di Gedung The Vida Kebon Jeruk Jakarta Barat.',
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
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${newsreader.variable} font-sans antialiased text-[#0B2545] bg-[#F6F9FC] overflow-y-auto`}
    >
      <body suppressHydrationWarning className="min-h-screen bg-[#F6F9FC] flex flex-col font-sans">
        <BookingProvider>{children}</BookingProvider>
        <Analytics />
      </body>
    </html>
  );
}
