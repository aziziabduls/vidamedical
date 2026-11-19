'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Instagram, Clock, ExternalLink, Navigation, Check } from 'lucide-react';
import { checkClinicOperatingStatus } from '@/lib/clinic-rules';
import { CLINIC_CONTACT } from '@/lib/clinic-data';

export default function LocationContactSection() {
  const [status, setStatus] = useState(() => checkClinicOperatingStatus());

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(checkClinicOperatingStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="lokasi" className="py-12 sm:py-16 bg-[#F6F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Address, Hours, Channels */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-[0_1px_2px_rgba(11,37,69,0.04)] space-y-6">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#EBF4FB] text-[#0472B5] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="text-xs font-medium text-slate-500 block mb-1">
                    Alamat klinik
                  </span>
                  <h3 className="text-base font-semibold text-[#0B2545] mb-1">
                    {CLINIC_CONTACT.addressTitle}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {CLINIC_CONTACT.addressLine}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Area perkantoran The Vida Kebon Jeruk, akses mudah dengan parkir basement aman.
                  </p>
                </div>
              </div>

              {/* Operating Hours & Status */}
              <div className="flex items-start gap-3.5 pt-5 border-t border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-[#EBF4FB] text-[#0472B5] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" strokeWidth={1.5} />
                </div>
                <div className="space-y-2.5 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-medium text-slate-500">
                      Jadwal pelayanan
                    </span>
                    <span
                      className={`text-xs font-medium px-2.5 py-0.5 rounded-md ${
                        status.isOpen
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {status.statusText}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                    <div className="bg-[#F6F9FC] p-3 rounded-xl border border-slate-200/70">
                      <span className="font-medium text-[#0B2545] block">Senin – Sabtu</span>
                      <span className="font-mono tabular-nums text-slate-600 mt-0.5 block">
                        08.00 – 20.00 WIB
                      </span>
                    </div>
                    <div className="bg-[#F6F9FC] p-3 rounded-xl border border-slate-200/70">
                      <span className="font-medium text-[#0B2545] block">Minggu & Hari Libur</span>
                      <span className="text-slate-600 mt-0.5 block">
                        Janji temu & home care on-call
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">{status.details}</p>
                </div>
              </div>

              {/* Contact Channels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-5 border-t border-slate-100">
                <a
                  href={CLINIC_CONTACT.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-[#F6F9FC] hover:bg-[#EBF4FB] rounded-xl border border-slate-200/80 transition-colors flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-white text-[#0472B5] border border-slate-200/80 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">
                      WhatsApp reservasi
                    </span>
                    <span className="text-sm font-medium font-mono tabular-nums text-[#0B2545]">
                      {CLINIC_CONTACT.whatsappNumberDisplay}
                    </span>
                  </div>
                </a>

                <a
                  href={CLINIC_CONTACT.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-[#F6F9FC] hover:bg-[#EBF4FB] rounded-xl border border-slate-200/80 transition-colors flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-white text-[#0472B5] border border-slate-200/80 flex items-center justify-center shrink-0">
                    <Instagram className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">
                      Instagram resmi
                    </span>
                    <span className="text-sm font-medium text-[#0B2545]">
                      {CLINIC_CONTACT.instagramHandle}
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direction Specs Card */}
          <div className="lg:col-span-5 bg-[#092B4F] text-sky-100 rounded-2xl p-6 sm:p-7 border border-[#0472B5]/30 space-y-5">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-sky-300 font-medium">
                <Navigation className="w-4 h-4" strokeWidth={1.5} />
                <span>Panduan akses menuju klinik</span>
              </div>

              <h3 className="text-lg font-semibold text-white tracking-tight">
                Gedung The Vida, Kebon Jeruk
              </h3>

              <p className="text-sm text-sky-100/80 leading-relaxed">
                Akses tol langsung via Exit Tol Kebon Jeruk (Tol Jakarta–Tangerang). Lobi drop-off ramah kursi roda dan parkir basement bertingkat dengan keamanan 24 jam.
              </p>

              <div className="space-y-2 pt-2 text-xs text-sky-100/90">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-300 shrink-0" strokeWidth={1.5} />
                  <span>3 menit dari Gerbang Tol Kebon Jeruk</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-300 shrink-0" strokeWidth={1.5} />
                  <span>Dekat kawasan Kedoya, Puri Indah, dan Tanjung Duren</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-300 shrink-0" strokeWidth={1.5} />
                  <span>Tersedia ruang tunggu privat dan akses lift langsung ke Lantai 6</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/15 space-y-2.5">
              <a
                href={CLINIC_CONTACT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-white hover:bg-[#EBF4FB] text-[#0B2545] text-xs sm:text-sm font-medium rounded-full transition-colors flex items-center justify-center gap-2"
              >
                <span>Buka Rute di Google Maps</span>
                <ExternalLink className="w-4 h-4 text-[#0472B5]" strokeWidth={1.5} />
              </a>

              <p className="text-xs text-sky-100/70 text-center">
                Untuk petunjuk arah atau reservasi parkir pasien, hubungi resepsionis via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
