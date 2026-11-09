'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { VIDA_HEALTH_PACKAGES, type MCUPackage } from '@/lib/clinic-rules';
import { Stethoscope, Check, Scale, AlertCircle, ArrowRight } from 'lucide-react';

interface VidaHealthSectionProps {
  onSelectPackage: (packageName: string) => void;
}

export default function VidaHealthSection({ onSelectPackage }: VidaHealthSectionProps) {
  const [selectedPackageId, setSelectedPackageId] = useState<string>('comprehensive');

  return (
    <section id="vidahealth" className="py-16 lg:py-20 bg-slate-50/60 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-medium text-teal-800 mb-2 flex items-center gap-1.5">
            <Stethoscope className="w-3.5 h-3.5 text-teal-800" strokeWidth={1.5} />
            <span>Pemeriksaan medis berkala (MCU)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-950 tracking-tight mb-3">
            VidaHealth Package: Evaluasi klinis organ vital dan metabolisme
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Deteksi dini faktor risiko kardiovaskular, diabetes, ginjal, dan sindrom metabolik. Setiap paket sudah mencakup pemeriksaan dokter umum, tes visus mata, uji darah lengkap, dan evaluasi InBody gratis.
          </p>
        </div>

        {/* Feature Highlight: Bonus Body Composition Test */}
        <div className="mb-12 bg-slate-950 text-slate-200 rounded-xl p-6 sm:p-8 border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-teal-950 text-teal-300 text-xs font-medium border border-teal-800/60">
                <Scale className="w-3.5 h-3.5 text-teal-400" strokeWidth={1.5} />
                <span>Disertakan tanpa biaya tambahan</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Bonus Analisis Komposisi Tubuh (InBody Diagnostic)
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-normal max-w-2xl">
                Laporan segmental mendalam mencakup persentase lemak tubuh (body fat %), massa otot rangka, estimasi lemak visceral di sekitar organ internal, total cairan tubuh, serta laju metabolisme basal (BMR).
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0" strokeWidth={1.5} />
                  <span>Teknologi bioelectrical impedance</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0" strokeWidth={1.5} />
                  <span>Hasil cetak langsung & evaluasi dokter</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0" strokeWidth={1.5} />
                  <span>Gratis pada seluruh paket VidaHealth</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 relative">
              <div className="rounded-lg overflow-hidden border border-slate-800 aspect-[4/3] bg-slate-900">
                <Image
                  src="/images/mcu_body_composition.jpg"
                  alt="Tes Komposisi Tubuh InBody dan Konsultasi MCU di Vida Medical Centre"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 30vw"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3 Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {VIDA_HEALTH_PACKAGES.map((pkg) => {
            const isSelected = selectedPackageId === pkg.id;

            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackageId(pkg.id)}
                className={`rounded-xl border transition-colors flex flex-col justify-between p-6 cursor-pointer bg-white ${
                  isSelected
                    ? 'border-teal-700 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-medium text-slate-700">
                      {pkg.id === 'comprehensive' ? 'Paling sering dipilih' : 'Paket MCU'}
                    </span>
                    {pkg.includesBonusBodyComposition && (
                      <span className="text-[11px] font-normal text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                        + Bonus InBody
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 mb-1">{pkg.title}</h3>
                  <p className="text-xs text-slate-500 font-normal mb-4">{pkg.subtitle}</p>

                  <div className="text-xs font-medium text-slate-700 mb-2 pb-2 border-b border-slate-100">
                    Cakupan pemeriksaan:
                  </div>

                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, idx) => {
                      const isBonus = feature.includes('BONUS');
                      return (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 font-normal">
                          <Check
                            className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                              isBonus ? 'text-teal-700' : 'text-slate-400'
                            }`}
                            strokeWidth={1.5}
                          />
                          <span className={isBonus ? 'text-slate-900 font-medium' : ''}>
                            {feature}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-600 font-normal mb-6">
                    <span className="font-medium text-slate-800 block mb-0.5">Rekomendasi peserta:</span>
                    <span>{pkg.recommendedFor}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPackage(pkg.title);
                    }}
                    className={`w-full py-2.5 px-4 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-teal-800 text-white hover:bg-teal-900'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>Pilih {pkg.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clinical Preparation Card */}
        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" strokeWidth={1.5} />
            <div className="space-y-1 text-xs text-slate-600 font-normal leading-relaxed">
              <span className="font-medium text-slate-900 block">
                Panduan persiapan sebelum pemeriksaan darah & laboratorium:
              </span>
              <p>
                1. Puasa 10–12 jam sebelum pengambilan darah (hanya diperbolehkan minum air putih).
              </p>
              <p>
                2. Hindari konsumsi alkohol, makanan tinggi lemak, atau olahraga berat 24 jam sebelum MCU.
              </p>
              <p>
                3. Obat rutin hipertensi dapat tetap diminum dengan air putih; informasikan riwayat obat kepada dokter pemeriksa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}