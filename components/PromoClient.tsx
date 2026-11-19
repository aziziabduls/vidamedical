'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Check, MessageCircle } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import FAQSection from '@/components/FAQSection';
import CTABanner from '@/components/CTABanner';
import { useBooking } from '@/components/BookingProvider';
import { CLINIC_CONTACT, PROMO_OFFERS } from '@/lib/clinic-data';
import { TRANSITIONS } from '@/lib/motion';

const FILTER_OPTIONS = [
  'Semua',
  'Vaksinasi',
  'Medical Check Up',
  'Vitamin Booster',
  'Home Care',
] as const;

export default function PromoClient() {
  const { openBooking } = useBooking();
  const [activeFilter, setActiveFilter] = useState<(typeof FILTER_OPTIONS)[number]>('Semua');

  const visibleOffers =
    activeFilter === 'Semua'
      ? PROMO_OFFERS
      : PROMO_OFFERS.filter((offer) => offer.category === activeFilter);

  return (
    <main className="flex-1 bg-[#F6F9FC]">
      <PageHeader
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Promo' },
        ]}
        eyebrow="Promo & paket"
        title="Penawaran Layanan & Paket Kesehatan"
        description="Paket pemeriksaan preventif, imunisasi keluarga, terapi vitamin booster, dan layanan home care dengan rincian manfaat yang jelas."
      />

      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Category Filter Bar */}
          <div
            role="tablist"
            aria-label="Filter kategori promo"
            className="flex flex-wrap items-center gap-2 pb-4 border-b border-slate-200/80"
          >
            {FILTER_OPTIONS.map((category) => {
              const isActive = activeFilter === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(category)}
                  className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-600 hover:text-[#0B2545] bg-white border border-slate-200/80'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="promo-filter-pill"
                      transition={TRANSITIONS.spring}
                      className="absolute inset-0 rounded-full bg-[#0472B5]"
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>

          {/* Promo Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={TRANSITIONS.fast}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {visibleOffers.map((offer) => {
                const waText = `Halo Vida Medical Centre, saya ingin menanyakan info paket "${offer.title}".`;
                const waUrl = `${CLINIC_CONTACT.whatsappHref}?text=${encodeURIComponent(waText)}`;

                return (
                  <article
                    key={offer.id}
                    className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_2px_rgba(11,37,69,0.04)] hover:border-[#0472B5]/35 transition-colors p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-medium text-[#0472B5] bg-[#EBF4FB] px-2.5 py-0.5 rounded-md">
                          {offer.category}
                        </span>
                        <span className="text-[11px] font-medium text-slate-500">
                          {offer.badge}
                        </span>
                      </div>

                      <h2 className="text-lg font-semibold text-[#0B2545] leading-snug">
                        {offer.title}
                      </h2>

                      <div className="mt-3 pb-3 border-b border-slate-100">
                        <div className="text-xl font-semibold text-[#0472B5] tabular-nums">
                          {offer.priceLabel}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">{offer.regularNote}</div>
                      </div>

                      <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                        {offer.summary}
                      </p>

                      <ul className="mt-4 space-y-2">
                        {offer.inclusions.map((inc, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                            <Check className="w-4 h-4 text-[#0472B5] shrink-0 mt-0.5" strokeWidth={1.5} />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                      <div className="text-[11px] text-slate-500">{offer.validUntil}</div>
                      <div className="grid grid-cols-2 gap-2.5">
                        <motion.button
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={() => openBooking(offer.bookingCategory, offer.bookingOption)}
                          className="py-2.5 px-3 rounded-full bg-[#0472B5] hover:bg-[#035c93] text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
                          <span>Buat Janji</span>
                        </motion.button>

                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-3 rounded-full border border-[#0472B5]/35 text-[#0472B5] hover:bg-[#EBF4FB] font-medium text-xs transition-colors flex items-center justify-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.5} />
                          <span>Tanya WA</span>
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <FAQSection />
      <CTABanner />
    </main>
  );
}
