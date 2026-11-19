'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { HOMECARE_SERVICES } from '@/lib/clinic-rules';
import { CLINIC_CONTACT } from '@/lib/clinic-data';
import { ShieldCheck, Check, Phone, ArrowRight } from 'lucide-react';
import { TRANSITIONS } from '@/lib/motion';

interface HomecareSectionProps {
  onSelectHomecareService: (serviceTitle: string) => void;
}

export default function HomecareSection({ onSelectHomecareService }: HomecareSectionProps) {
  const [activeServiceId, setActiveServiceId] = useState<string>('wound-care');
  const activeService = HOMECARE_SERVICES.find((s) => s.id === activeServiceId) || HOMECARE_SERVICES[0];

  return (
    <section id="homecare" className="py-12 sm:py-16 bg-[#F6F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-10">
          {/* Left Column: Visual & Safety Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(11,37,69,0.04)]">
              <div className="relative aspect-[4/3] w-full bg-[#EBF4FB]">
                <Image
                  src="/images/homecare_medical_nurse.jpg"
                  alt="Perawat Profesional Vida Medical Centre Melayani Layanan Home Care di Rumah Pasien"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div className="p-5 bg-white border-t border-slate-100">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#0B2545] mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#0472B5]" strokeWidth={1.5} />
                  <span>Protokol higienitas & aseptik klinis</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Peralatan medis steril sekali pakai (disposable sterile kit), pengelolaan limbah medis terstandar, dan pencatatan riwayat tindakan pasien.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Services Selection */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {HOMECARE_SERVICES.map((service) => {
                const isActive = activeServiceId === service.id;

                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setActiveServiceId(service.id)}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition-colors ${
                      isActive
                        ? 'border-[#0472B5] bg-white ring-1 ring-[#0472B5]/20 shadow-xs'
                        : 'border-slate-200/80 bg-white/80 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <span className="text-[11px] font-medium text-[#0472B5] block mb-0.5">
                      {service.category}
                    </span>
                    <h3 className="text-sm font-semibold text-[#0B2545] mb-1">{service.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Selected Service Detailed Box */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={TRANSITIONS.fast}
                className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_2px_rgba(11,37,69,0.04)] space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-semibold text-[#0B2545]">{activeService.title}</h3>
                    <span className="text-xs text-slate-500">{activeService.category}</span>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => onSelectHomecareService(activeService.title)}
                    className="px-5 py-2.5 bg-[#0472B5] hover:bg-[#035c93] text-white text-xs sm:text-sm font-medium rounded-full transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>Pesan Layanan Ini</span>
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </motion.button>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {activeService.description}
                </p>

                <div>
                  <span className="text-xs font-medium text-slate-500 block mb-2.5">
                    Perlengkapan dan standar tindakan
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeService.includedEquipments.map((eq, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F6F9FC] border border-slate-200/80 rounded-lg text-xs text-[#0B2545]"
                      >
                        <Check className="w-3.5 h-3.5 text-[#0472B5]" strokeWidth={1.5} />
                        <span>{eq}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* WhatsApp Coordination Box */}
        <div className="bg-[#092B4F] text-sky-100 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#0472B5]/30">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-semibold text-white">
              Koordinasi jadwal home care hari yang sama
            </h4>
            <p className="text-xs sm:text-sm text-sky-100/80 max-w-xl">
              Hubungi staf perawat via WhatsApp untuk konfirmasi ketersediaan tenaga medis dan perkiraan waktu ketibaan di alamat Anda.
            </p>
          </div>

          <a
            href={`${CLINIC_CONTACT.whatsappHref}?text=${encodeURIComponent(
              'Halo Vida Medical Centre, saya membutuhkan layanan Home Care ke rumah.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0B2545] font-medium text-xs sm:text-sm rounded-full hover:bg-[#EBF4FB] transition-colors shrink-0 whitespace-nowrap"
          >
            <Phone className="w-4 h-4 text-[#0472B5]" strokeWidth={1.5} />
            <span className="font-mono tabular-nums">WhatsApp {CLINIC_CONTACT.whatsappNumberDisplay}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
