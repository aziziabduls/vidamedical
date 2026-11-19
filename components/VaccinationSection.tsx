'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { VACCINATION_LIST } from '@/lib/clinic-rules';
import { Shield, Check, Info, ArrowRight } from 'lucide-react';
import {
  fadeUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
  TRANSITIONS,
  VIEWPORT_ONCE,
} from '@/lib/motion';

interface VaccinationSectionProps {
  onSelectVaccine: (vaccineName: string) => void;
}

export default function VaccinationSection({ onSelectVaccine }: VaccinationSectionProps) {
  return (
    <section id="vaksinasi" className="py-12 sm:py-16 bg-[#F6F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Card for VidaShield Influenza */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mb-8 bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_2px_rgba(11,37,69,0.04)] p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-medium text-[#0472B5] bg-[#EBF4FB] border border-[#0472B5]/15 px-2.5 py-0.5 rounded-md">
                  Rekomendasi Tahunan
                </span>
                <span className="text-xs text-slate-500">Strain 4-valen WHO</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#0B2545] tracking-tight">
                VidaShield Influenza Quadrivalent (4-Valen)
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                Memberikan proteksi terhadap 4 strain virus influenza aktif (2 subtipe Influenza A dan 2 subtipe Influenza B) untuk mengurangi risiko komplikasi saluran pernapasan.
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-slate-700 pt-1">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#0472B5]" strokeWidth={1.5} />
                  <span>Dosis 1x per tahun</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#0472B5]" strokeWidth={1.5} />
                  <span>Dewasa, lansia, dan anak usia &gt;6 bulan</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#0472B5]" strokeWidth={1.5} />
                  <span>Tersedia di klinik atau home care</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end gap-2.5 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
              <motion.button
                whileTap={{ scale: 0.98 }}
                transition={TRANSITIONS.fast}
                type="button"
                onClick={() => onSelectVaccine('VidaShield Influenza Quadrivalent')}
                className="w-full lg:w-auto px-6 py-3 bg-[#0472B5] hover:bg-[#035c93] text-white text-sm font-medium rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shadow-xs"
              >
                <span>Jadwalkan Vaksin Influenza</span>
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </motion.button>
              <span className="text-xs text-slate-500 text-center lg:text-right">
                Termasuk skrining kelayakan fisik oleh dokter sebelum injeksi
              </span>
            </div>
          </div>
        </motion.div>

        {/* Other Vaccines Grid */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {VACCINATION_LIST.filter((v) => v.id !== 'influenza').map((vac) => (
            <motion.div
              key={vac.id}
              variants={staggerItemVariants}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-[0_1px_2px_rgba(11,37,69,0.04)] flex flex-col justify-between hover:border-[#0472B5]/35 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-[#0472B5] font-medium mb-2">
                  <Shield className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                  <span>{vac.type}</span>
                </div>
                <h3 className="text-base font-semibold text-[#0B2545] mb-2">{vac.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{vac.protection}</p>
                <div className="p-3 bg-[#F6F9FC] rounded-xl border border-slate-200/70 text-xs text-slate-600 mb-5">
                  <span className="font-medium block text-[#0B2545] mb-0.5">Jadwal pemberian</span>
                  <span>{vac.frequency}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => onSelectVaccine(vac.name)}
                  className="w-full py-2.5 px-4 bg-[#EBF4FB] hover:bg-[#0472B5] text-[#0472B5] hover:text-white text-xs font-medium rounded-full transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Pesan {vac.name.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Corporate / Community Vaccination Info */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#EBF4FB] text-[#0472B5] flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-4 h-4" strokeWidth={1.5} />
          </div>
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-1">
            <span className="font-medium text-[#0B2545] block">
              Layanan vaksinasi on-site korporasi & komunitas
            </span>
            <p>
              Vida Medical Centre melayani vaksinasi kolektif untuk perkantoran, instansi, dan keluarga di wilayah DKI Jakarta dengan sistem rantai dingin (cold chain) terstandar farmasi medis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
