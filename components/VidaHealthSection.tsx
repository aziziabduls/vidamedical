'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { VIDA_HEALTH_PACKAGES } from '@/lib/clinic-rules';
import { Check, Scale, AlertCircle, ArrowRight } from 'lucide-react';
import {
  fadeUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
  VIEWPORT_ONCE,
} from '@/lib/motion';

interface VidaHealthSectionProps {
  onSelectPackage: (packageName: string) => void;
}

export default function VidaHealthSection({ onSelectPackage }: VidaHealthSectionProps) {
  const [selectedPackageId, setSelectedPackageId] = useState<string>('comprehensive');

  return (
    <section id="vidahealth" className="py-12 sm:py-16 bg-[#F6F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Feature Highlight: Bonus Body Composition Test */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mb-10 bg-[#092B4F] text-sky-100 rounded-2xl p-6 sm:p-8 border border-[#0472B5]/30"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 text-sky-100 text-xs font-medium">
                <Scale className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Disertakan tanpa biaya tambahan</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Bonus Analisis Komposisi Tubuh (InBody Diagnostic)
              </h2>
              <p className="text-sm text-sky-100/85 leading-relaxed max-w-2xl">
                Laporan segmental mendalam mencakup persentase lemak tubuh, massa otot rangka, estimasi lemak visceral di sekitar organ internal, total cairan tubuh, serta laju metabolisme basal (BMR).
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs text-sky-100">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-sky-300 shrink-0" strokeWidth={1.5} />
                  <span>Teknologi bioelectrical impedance</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-sky-300 shrink-0" strokeWidth={1.5} />
                  <span>Hasil cetak langsung & evaluasi dokter</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-sky-300 shrink-0" strokeWidth={1.5} />
                  <span>Gratis pada seluruh paket VidaHealth</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-xl overflow-hidden border border-white/15 aspect-[4/3] bg-[#0B2545]">
                <Image
                  src="/images/service_mcu.jpg"
                  alt="Konsultasi dan pemeriksaan kesehatan Medical Check Up di Vida Medical Centre"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3 Package Cards Grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          {VIDA_HEALTH_PACKAGES.map((pkg) => {
            const isSelected = selectedPackageId === pkg.id;

            return (
              <motion.div
                key={pkg.id}
                variants={staggerItemVariants}
                onClick={() => setSelectedPackageId(pkg.id)}
                className={`rounded-2xl border transition-colors flex flex-col justify-between p-6 cursor-pointer bg-white shadow-[0_1px_2px_rgba(11,37,69,0.04)] ${
                  isSelected
                    ? 'border-[#0472B5] ring-1 ring-[#0472B5]/20'
                    : 'border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="font-medium text-slate-700">
                      {pkg.id === 'comprehensive' ? 'Paling sering dipilih' : 'Paket MCU'}
                    </span>
                    {pkg.includesBonusBodyComposition && (
                      <span className="text-[11px] font-medium text-[#0472B5] bg-[#EBF4FB] px-2.5 py-0.5 rounded-md">
                        + Bonus InBody
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-[#0B2545] mb-1">{pkg.title}</h3>
                  <p className="text-xs text-slate-500 mb-4">{pkg.subtitle}</p>

                  <div className="text-xs font-medium text-[#0B2545] mb-2.5 pb-2 border-b border-slate-100">
                    Cakupan pemeriksaan
                  </div>

                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, idx) => {
                      const isBonus = feature.includes('BONUS');
                      return (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                          <Check
                            className={`w-4 h-4 mt-0.5 shrink-0 ${
                              isBonus ? 'text-[#0472B5]' : 'text-slate-400'
                            }`}
                            strokeWidth={1.5}
                          />
                          <span className={isBonus ? 'text-[#0B2545] font-medium' : ''}>
                            {feature}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="p-3 bg-[#F6F9FC] rounded-xl border border-slate-200/70 text-xs text-slate-600 mb-6">
                    <span className="font-medium text-[#0B2545] block mb-0.5">Rekomendasi peserta</span>
                    <span>{pkg.recommendedFor}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPackage(pkg.title);
                    }}
                    className={`w-full py-2.5 px-4 rounded-full text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#0472B5] text-white hover:bg-[#035c93]'
                        : 'bg-[#EBF4FB] text-[#0472B5] hover:bg-[#0472B5] hover:text-white'
                    }`}
                  >
                    <span>Pilih {pkg.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Clinical Preparation Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#EBF4FB] text-[#0472B5] flex items-center justify-center shrink-0 mt-0.5">
              <AlertCircle className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <div className="space-y-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <span className="font-medium text-[#0B2545] block">
                Panduan persiapan sebelum pemeriksaan darah & laboratorium
              </span>
              <p>1. Puasa 10–12 jam sebelum pengambilan darah (diperbolehkan minum air putih).</p>
              <p>2. Hindari konsumsi alkohol, makanan tinggi lemak, atau olahraga berat 24 jam sebelum MCU.</p>
              <p>3. Obat rutin hipertensi tetap dapat diminum dengan air putih; informasikan riwayat obat kepada dokter.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
