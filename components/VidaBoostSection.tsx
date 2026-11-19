'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { VIDA_BOOST_TIERS } from '@/lib/clinic-rules';
import { Clock, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { TRANSITIONS } from '@/lib/motion';

interface VidaBoostSectionProps {
  onSelectTier: (tierName: string) => void;
}

export default function VidaBoostSection({ onSelectTier }: VidaBoostSectionProps) {
  const [activeTierId, setActiveTierId] = useState<string>('gold');
  const activeTier = VIDA_BOOST_TIERS.find((t) => t.id === activeTierId) || VIDA_BOOST_TIERS[1];

  return (
    <section id="vidaboost" className="py-12 sm:py-16 bg-[#F6F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Visual Asset & Safety Protocol */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(11,37,69,0.04)]">
              <div className="relative aspect-[4/3] w-full bg-[#EBF4FB]">
                <Image
                  src="/images/vidaboost_iv_therapy.jpg"
                  alt="Sesi Infus Vitamin VidaBoost di Lounge Privat Vida Medical Centre Kebon Jeruk"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div className="p-5 bg-white border-t border-slate-100">
                <span className="text-sm font-semibold text-[#0B2545] block mb-1">
                  Kenyamanan lounge infus privat
                </span>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Kursi recliner ergonomis di ruangan berpendingin udara, didampingi pemantauan tanda vital berkala oleh perawat berlisensi.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-3">
              <h3 className="text-sm font-semibold text-[#0B2545] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0472B5]" strokeWidth={1.5} />
                <span>Prosedur keamanan klinis VidaBoost</span>
              </h3>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0472B5] mt-2 shrink-0" />
                  <span>Pemeriksaan tekanan darah, saturasi oksigen, dan nadi sebelum infus dimulai.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0472B5] mt-2 shrink-0" />
                  <span>Sediaan vitamin dan antioksidan tersertifikasi farmasi resmi BPOM.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0472B5] mt-2 shrink-0" />
                  <span>Jarum mikro steril sekali pakai untuk kenyamanan tindakan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0472B5] mt-2 shrink-0" />
                  <span>Tersedia pilihan kunjungan perawat home care ke rumah atau kantor.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Interactive Prescription Tier Card */}
          <div className="lg:col-span-7 space-y-4">
            {/* Tier Selector Tab Strip */}
            <div className="grid grid-cols-4 gap-1.5 p-1.5 bg-white rounded-xl border border-slate-200/80">
              {VIDA_BOOST_TIERS.map((tier) => {
                const isActive = activeTierId === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setActiveTierId(tier.id)}
                    className={`relative py-2 px-2 text-xs font-medium rounded-lg transition-colors text-center truncate cursor-pointer ${
                      isActive ? 'text-white' : 'text-slate-600 hover:text-[#0B2545]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="vidaboost-tier-pill"
                        transition={TRANSITIONS.spring}
                        className="absolute inset-0 rounded-lg bg-[#0472B5]"
                      />
                    )}
                    <span className="relative z-10">{tier.name.replace('VidaBoost ', '')}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Tier Clinical Spec Sheet */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTier.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={TRANSITIONS.fast}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_2px_rgba(11,37,69,0.04)] p-6 space-y-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold text-[#0B2545]">{activeTier.name}</h3>
                      {activeTier.badge && (
                        <span className="text-[11px] font-medium text-[#0472B5] bg-[#EBF4FB] px-2.5 py-0.5 rounded-md">
                          {activeTier.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{activeTier.tagline}</p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-[#F6F9FC] px-3 py-1.5 rounded-lg border border-slate-200/70 font-mono tabular-nums">
                    <Clock className="w-3.5 h-3.5 text-[#0472B5]" strokeWidth={1.5} />
                    <span>~{activeTier.durationMinutes} menit</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-medium text-slate-500 block mb-1">
                    Indikasi rekomendasi
                  </span>
                  <p className="text-sm text-slate-700 leading-relaxed">{activeTier.bestFor}</p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <span className="text-xs font-medium text-slate-500 block mb-3">
                    Komposisi nutrisi utama
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeTier.highlightNutrients.map((nutrient, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs text-[#0B2545] bg-[#F6F9FC] border border-slate-200/70 px-3 py-2.5 rounded-xl"
                      >
                        <Check className="w-3.5 h-3.5 text-[#0472B5] shrink-0" strokeWidth={1.5} />
                        <span>{nutrient}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <p className="text-xs text-slate-500">
                    Dosis disesuaikan dengan hasil evaluasi fisik oleh dokter klinik.
                  </p>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => onSelectTier(activeTier.name)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#0472B5] rounded-full hover:bg-[#035c93] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>Pesan {activeTier.name}</span>
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick 4-tier comparison strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              {VIDA_BOOST_TIERS.map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setActiveTierId(tier.id)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                    activeTierId === tier.id
                      ? 'border-[#0472B5] bg-[#EBF4FB]'
                      : 'border-slate-200/80 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="text-xs font-semibold text-[#0B2545] mb-0.5">
                    {tier.name.replace('VidaBoost ', '')}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono tabular-nums">
                    ~{tier.durationMinutes} mnt
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
