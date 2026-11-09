'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { VIDA_BOOST_TIERS, type IVTier } from '@/lib/clinic-rules';
import { Activity, Clock, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface VidaBoostSectionProps {
  onSelectTier: (tierName: string) => void;
}

export default function VidaBoostSection({ onSelectTier }: VidaBoostSectionProps) {
  const [activeTierId, setActiveTierId] = useState<string>('gold');
  const activeTier = VIDA_BOOST_TIERS.find((t) => t.id === activeTierId) || VIDA_BOOST_TIERS[1];

  return (
    <section id="vidaboost" className="py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-medium text-teal-800 mb-2 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-teal-800" strokeWidth={1.5} />
            <span>Infus vitamin & terapi intravena</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-950 tracking-tight mb-3">
            VidaBoost: Terapi mikronutrien dan hidrasi langsung ke aliran darah
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Hantaran multivitamin esensial dan antioksidan murni dengan absorpsi seluler menyeluruh. Tersedia 4 tingkatan formula teruji untuk memulihkan kebugaran fisik Anda.
          </p>
        </div>

        {/* 2-Column Clinical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Visual Asset & Safety Protocol */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-white">
              <div className="relative aspect-[4/3] w-full bg-slate-100">
                <Image
                  src="/images/vidaboost_iv_therapy.jpg"
                  alt="Sesi Infus Vitamin VidaBoost di Lounge Privat Vida Medical Centre Kebon Jeruk"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-200">
                <span className="text-xs font-medium text-slate-900 block mb-1">
                  Kenyamanan lounge infus privat
                </span>
                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  Kursi recliner ergonomis di ruangan berpendingin udara hepa-filter, didampingi pemantauan tanda vital berkala oleh perawat berlisensi.
                </p>
              </div>
            </div>

            {/* Clinical Safety Card */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
              <h4 className="text-xs font-semibold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-800" strokeWidth={1.5} />
                <span>Prosedur keamanan klinis VidaBoost</span>
              </h4>
              <ul className="text-xs text-slate-600 font-normal space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-700 mt-1.5 shrink-0" />
                  <span>Pemeriksaan tensi, saturasi oksigen, dan nadi sebelum infus dimulai.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-700 mt-1.5 shrink-0" />
                  <span>Sediaan vitamin dan antioksidan tersertifikasi farmasi BPOM.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-700 mt-1.5 shrink-0" />
                  <span>Jarum mikro steril sekali pakai untuk kenyamanan penusukan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-700 mt-1.5 shrink-0" />
                  <span>Tersedia pilihan kunjungan perawat homecare ke rumah atau kantor.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Interactive Prescription Tier Card (Moment 1) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Tier Selector Tab Strip */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200/80">
              {VIDA_BOOST_TIERS.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setActiveTierId(tier.id)}
                  className={`py-2 px-2 text-xs font-medium rounded-md transition-all text-center truncate cursor-pointer ${
                    activeTierId === tier.id
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 border border-transparent'
                  }`}
                >
                  {tier.name.replace('VidaBoost ', '')}
                </button>
              ))}
            </div>

            {/* Active Tier Clinical Spec Sheet */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold text-slate-900">{activeTier.name}</h3>
                    {activeTier.badge && (
                      <span className="text-[11px] font-normal text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                        {activeTier.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-normal mt-0.5">{activeTier.tagline}</p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-md border border-slate-200/60 font-mono tabular-nums">
                  <Clock className="w-3.5 h-3.5 text-slate-500" strokeWidth={1.5} />
                  <span>~{activeTier.durationMinutes} menit</span>
                </div>
              </div>

              {/* Indication / Best for */}
              <div>
                <span className="text-xs font-medium text-slate-500 block mb-1">
                  Indikasi rekomendasi:
                </span>
                <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed">
                  {activeTier.bestFor}
                </p>
              </div>

              {/* Nutrients Breakdown */}
              <div className="pt-3 border-t border-slate-100">
                <span className="text-xs font-medium text-slate-500 block mb-3">
                  Komposisi nutrisi utama:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeTier.highlightNutrients.map((nutrient, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-slate-800 bg-slate-50 border border-slate-200/60 px-3 py-2 rounded-md"
                    >
                      <Check className="w-3.5 h-3.5 text-teal-700 shrink-0" strokeWidth={1.5} />
                      <span className="font-normal">{nutrient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action row */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <p className="text-xs text-slate-500 font-normal">
                  Dosis disesuaikan dengan hasil evaluasi fisik oleh dokter klinik.
                </p>
                <button
                  onClick={() => onSelectTier(activeTier.name)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-medium text-white bg-teal-800 rounded-lg hover:bg-teal-900 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Pesan {activeTier.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Quick 4-tier comparison strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {VIDA_BOOST_TIERS.map((tier) => (
                <div
                  key={tier.id}
                  onClick={() => setActiveTierId(tier.id)}
                  className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                    activeTierId === tier.id
                      ? 'border-slate-400 bg-slate-50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="text-xs font-medium text-slate-900 mb-0.5">{tier.name.replace('VidaBoost ', '')}</div>
                  <div className="text-[11px] text-slate-500 font-mono tabular-nums">~{tier.durationMinutes} mnt</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}