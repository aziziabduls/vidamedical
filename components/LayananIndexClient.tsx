'use client';

import React from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/PageHeader';
import ServicesShowcase from '@/components/ServicesShowcase';
import ComprehensiveServices from '@/components/ComprehensiveServices';
import CTABanner from '@/components/CTABanner';
import { useBooking } from '@/components/BookingProvider';
import { TRANSITIONS } from '@/lib/motion';

export default function LayananIndexClient() {
  const { openBooking } = useBooking();

  return (
    <main className="flex-1 bg-[#F6F9FC]">
      <PageHeader
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Layanan' },
        ]}
        eyebrow="Layanan medis"
        title="Layanan Kesehatan Terpadu di Vida Medical Centre"
        description="Pilih layanan vaksinasi, medical check up, vitamin booster, atau home care yang sesuai dengan kebutuhan Anda dan keluarga."
        actions={
          <motion.button
            whileTap={{ scale: 0.98 }}
            transition={TRANSITIONS.fast}
            type="button"
            onClick={() => openBooking('vidaboost', 'VidaBoost Gold')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0472B5] hover:bg-[#035c93] text-white font-medium text-sm shadow-xs transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4" strokeWidth={1.5} />
            <span>Buat Janji Layanan</span>
          </motion.button>
        }
      />

      <ServicesShowcase showHeader={false} />

      <ComprehensiveServices onSelectService={(cat, opt) => openBooking(cat, opt)} />

      <CTABanner />
    </main>
  );
}
