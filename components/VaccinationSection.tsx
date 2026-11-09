'use client';

import React from 'react';
import { VACCINATION_LIST } from '@/lib/clinic-rules';
import { Shield, Check, Info, ArrowRight } from 'lucide-react';

interface VaccinationSectionProps {
  onSelectVaccine: (vaccineName: string) => void;
}

export default function VaccinationSection({ onSelectVaccine }: VaccinationSectionProps) {
  return (
    <section id="vaksinasi" className="py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-medium text-teal-800 mb-2 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-teal-800" strokeWidth={1.5} />
            <span>Imunisasi & pencegahan infeksi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-950 tracking-tight mb-3">
            Vaksinasi VidaShield: Perlindungan daya tahan untuk dewasa dan keluarga
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Dikelola dengan sistem rantai dingin (cold chain) terstandar farmasi medis untuk menjamin potensi vaksin selalu terjaga optimal saat diinjeksikan.
          </p>
        </div>

        {/* Featured Card for VidaShield Influenza */}
        <div className="mb-8 bg-slate-50/70 rounded-xl border border-slate-200 p-6 sm:p-7">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                  Rekomendasi musim ini
                </span>
                <span className="text-xs text-slate-500 font-normal">Strain 4-valen WHO</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">
                VidaShield Influenza Quadrivalent (4-Valen)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Memberikan proteksi terhadap 4 strain virus influenza aktif (2 subtipe Influenza A dan 2 subtipe Influenza B). Mengurangi risiko komplikasi radang paru dan absen kerja berkepanjangan.
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-slate-700 pt-1">
                <span className="flex items-center gap-1.5 font-normal">
                  <Check className="w-3.5 h-3.5 text-teal-800" strokeWidth={1.5} />
                  <span>Dosis 1x per tahun</span>
                </span>
                <span className="flex items-center gap-1.5 font-normal">
                  <Check className="w-3.5 h-3.5 text-teal-800" strokeWidth={1.5} />
                  <span>Dewasa, lansia, dan anak usia &gt;6 bulan</span>
                </span>
                <span className="flex items-center gap-1.5 font-normal">
                  <Check className="w-3.5 h-3.5 text-teal-800" strokeWidth={1.5} />
                  <span>Tersedia di klinik atau homecare</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end gap-2.5 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-200">
              <button
                onClick={() => onSelectVaccine('VidaShield Influenza Quadrivalent')}
                className="w-full lg:w-auto px-5 py-2.5 bg-teal-800 hover:bg-teal-900 text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>Jadwalkan vaksin influenza</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
              <span className="text-[11px] text-slate-500 font-normal text-center lg:text-right">
                Skrining kesehatan fisik singkat oleh dokter sebelum injeksi
              </span>
            </div>
          </div>
        </div>

        {/* Other Vaccines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {VACCINATION_LIST.filter((v) => v.id !== 'influenza').map((vac) => (
            <div
              key={vac.id}
              className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                <span className="text-[11px] font-normal text-slate-500 block mb-1">
                  {vac.type}
                </span>
                <h4 className="text-sm font-semibold text-slate-900 mb-1.5">{vac.name}</h4>
                <p className="text-xs text-slate-600 font-normal leading-relaxed mb-4">{vac.protection}</p>
                <div className="p-2.5 bg-slate-50 rounded border border-slate-100 text-xs text-slate-600 font-normal mb-4">
                  <span className="font-medium block text-slate-800 mb-0.5">Jadwal pemberian:</span>
                  <span>{vac.frequency}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => onSelectVaccine(vac.name)}
                  className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Pesan {vac.name.split(' ')[0]}</span>
                  <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate / Community Vaccination Info */}
        <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200 flex items-start gap-3">
          <Info className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" strokeWidth={1.5} />
          <div className="text-xs text-slate-600 font-normal leading-relaxed space-y-0.5">
            <span className="font-medium text-slate-900 block">
              Layanan vaksinasi on-site korporasi & komunitas
            </span>
            <p>
              Vida Medical Centre melayani vaksinasi kolektif untuk perkantoran, instansi, dan keluarga di wilayah DKI Jakarta dengan membawa tim perawat berlisensi dan kotak pendingin vaksin berstandar medis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}