'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { HOMECARE_SERVICES, type HomecareService } from '@/lib/clinic-rules';
import { Home, ShieldCheck, Check, Phone, ArrowRight } from 'lucide-react';

interface HomecareSectionProps {
  onSelectHomecareService: (serviceTitle: string) => void;
}

export default function HomecareSection({ onSelectHomecareService }: HomecareSectionProps) {
  const [activeServiceId, setActiveServiceId] = useState<string>('wound-care');
  const activeService = HOMECARE_SERVICES.find((s) => s.id === activeServiceId) || HOMECARE_SERVICES[0];

  return (
    <section id="homecare" className="py-16 lg:py-20 bg-slate-50/60 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-medium text-teal-800 mb-2 flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5 text-teal-800" strokeWidth={1.5} />
            <span>Pelayanan medis di rumah pasien</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-950 tracking-tight mb-3">
            Homecare Medis: Tindakan klinis profesional di kediaman Anda
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Menghadirkan penanganan steril perawat dan dokter berlisensi di area DKI Jakarta. Sesuai untuk pasien tirah baring (bedridden), lansia, atau pemulihan luka pasca rawat inap.
          </p>
        </div>

        {/* 2-Column Clinical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-10">
          {/* Left Column: Visual & Safety Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-white">
              <div className="relative aspect-[4/3] w-full bg-slate-100">
                <Image
                  src="/images/homecare_medical_nurse.jpg"
                  alt="Perawat Profesional Vida Medical Centre Melayani Layanan Homecare di Rumah Pasien"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-900 mb-1">
                  <ShieldCheck className="w-4 h-4 text-teal-800" strokeWidth={1.5} />
                  <span>Protokol higienitas & aseptik klinis</span>
                </div>
                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  Peralatan medis steril sekali pakai (disposable sterile kit), pengelolaan limbah medis terstandar, dan pencatatan riwayat tindakan pasien.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Services Selection */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {HOMECARE_SERVICES.map((service) => {
                const isActive = activeServiceId === service.id;

                return (
                  <div
                    key={service.id}
                    onClick={() => setActiveServiceId(service.id)}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-colors ${
                      isActive
                        ? 'border-slate-800 bg-white shadow-xs'
                        : 'border-slate-200 bg-white/70 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-[11px] font-normal text-slate-500 block mb-0.5">
                      {service.category}
                    </span>
                    <h4 className="text-sm font-semibold text-slate-900 mb-1">{service.title}</h4>
                    <p className="text-xs text-slate-600 font-normal line-clamp-2">{service.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Selected Service Detailed Box */}
            <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">{activeService.title}</h3>
                  <span className="text-xs text-slate-500 font-normal">{activeService.category}</span>
                </div>
                <button
                  onClick={() => onSelectHomecareService(activeService.title)}
                  className="px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span>Pesan layanan ini</span>
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                {activeService.description}
              </p>

              <div>
                <span className="text-xs font-medium text-slate-500 block mb-2">
                  Perlengkapan dan standar tindakan:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeService.includedEquipments.map((eq, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 font-normal"
                    >
                      <Check className="w-3.5 h-3.5 text-teal-800" strokeWidth={1.5} />
                      <span>{eq}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet WhatsApp Coordination Box */}
        <div className="bg-slate-950 text-slate-200 rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-semibold text-white">Koordinasi jadwal homecare hari yang sama</h4>
            <p className="text-xs text-slate-400 font-normal max-w-xl">
              Hubungi staf perawat via WhatsApp untuk konfirmasi ketersediaan tenaga medis dan perkiraan waktu ketibaan di alamat Anda.
            </p>
          </div>

          <a
            href="https://wa.me/628115750260?text=Halo%20Vida%20Medical%20Centre,%20saya%20membutuhkan%20layanan%20Homecare%20ke%20rumah."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-slate-950 font-medium text-xs rounded-lg hover:bg-slate-100 transition-colors shrink-0 whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5 text-teal-800" strokeWidth={1.5} />
            <span className="font-mono tabular-nums">WhatsApp 0811 5750 260</span>
          </a>
        </div>
      </div>
    </section>
  );
}