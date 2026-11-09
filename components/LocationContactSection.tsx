'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Instagram, Clock, ExternalLink, Navigation, Check } from 'lucide-react';
import { checkClinicOperatingStatus } from '@/lib/clinic-rules';

export default function LocationContactSection() {
  const [status, setStatus] = useState(() => checkClinicOperatingStatus());

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(checkClinicOperatingStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="lokasi" className="py-16 lg:py-20 bg-slate-50/60 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-medium text-teal-800 mb-2 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-teal-800" strokeWidth={1.5} />
            <span>Lokasi klinik & kontak</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-950 tracking-tight mb-3">
            Fasilitas rawat jalan di Gedung The Vida, Kebon Jeruk
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Akses strategis di kawasan bisnis Jakarta Barat, dekat pintu tol Kebon Jeruk dengan kemudahan lobi drop-off dan area parkir basement aman.
          </p>
        </div>

        {/* 2-Column Info & Direction Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Address, Hours, Channels */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-xl p-6 border border-slate-200 space-y-6">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-teal-800" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="text-xs font-medium text-slate-500 block mb-1">
                    Alamat klinik
                  </span>
                  <h3 className="text-base font-semibold text-slate-900 mb-0.5">
                    The Vida Building, Lantai Dasar
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                    Jl. Raya Perjuangan No. 8, Kebon Jeruk, Jakarta Barat, DKI Jakarta 11530
                  </p>
                  <p className="text-xs text-slate-500 font-normal mt-1">
                    Area perkantoran The Vida, dekat kompleks RCTI dan RS Siloam Kebon Jeruk.
                  </p>
                </div>
              </div>

              {/* Operating Hours & Status */}
              <div className="flex items-start gap-3.5 pt-5 border-t border-slate-100">
                <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-teal-800" strokeWidth={1.5} />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-medium text-slate-500">
                      Jadwal pelayanan
                    </span>
                    <span
                      className={`text-xs font-normal px-2 py-0.5 rounded ${
                        status.isOpen
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {status.statusText}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    <div className="bg-slate-50 p-2.5 rounded border border-slate-200/70">
                      <span className="font-medium text-slate-900 block">Senin – Sabtu:</span>
                      <span className="font-mono tabular-nums text-slate-600">08.00 – 20.00 WIB</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded border border-slate-200/70">
                      <span className="font-medium text-slate-900 block">Minggu & Hari Libur:</span>
                      <span className="text-slate-600">Janji temu & homecare on-call</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 font-normal">{status.details}</p>
                </div>
              </div>

              {/* Contact Channels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-5 border-t border-slate-100">
                <a
                  href="https://wa.me/628115750260"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded bg-white text-emerald-700 border border-slate-200 flex items-center justify-center shrink-0">
                    <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-normal block">
                      WhatsApp reservasi
                    </span>
                    <span className="text-xs sm:text-sm font-medium font-mono tabular-nums text-slate-900">
                      0811 5750 260
                    </span>
                  </div>
                </a>

                <a
                  href="https://instagram.com/vidamedicalcentre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded bg-white text-slate-700 border border-slate-200 flex items-center justify-center shrink-0">
                    <Instagram className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-normal block">
                      Instagram resmi
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-slate-900">
                      @vidamedicalcentre
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direction Specs Card */}
          <div className="lg:col-span-5 bg-slate-950 text-slate-200 rounded-xl p-6 border border-slate-800 space-y-5">
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-xs text-teal-400 font-medium">
                <Navigation className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Panduan akses menuju klinik</span>
              </div>

              <h3 className="text-lg font-semibold text-white tracking-tight">
                Gedung The Vida, Kebon Jeruk
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
                Akses tol langsung via Exit Tol Kebon Jeruk (Tol Jakarta-Tangerang). Lobi drop-off ramah kursi roda dan parkir basement bertingkat dengan keamanan 24 jam.
              </p>

              <div className="space-y-2 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0" strokeWidth={1.5} />
                  <span>3 menit dari Gerbang Tol Kebon Jeruk</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0" strokeWidth={1.5} />
                  <span>5 menit dari Studio RCTI / MNC Studios</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-teal-400 shrink-0" strokeWidth={1.5} />
                  <span>Dekat kawasan Kedoya, Puri Indah, dan Tanjung Duren</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2">
              <a
                href="https://www.google.com/maps/search/?api=1&query=The+Vida+Building+Jl+Raya+Perjuangan+Kebon+Jeruk+Jakarta+Barat"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-white hover:bg-slate-100 text-slate-950 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <span>Buka rute di Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
              </a>

              <p className="text-[11px] text-slate-500 font-normal text-center">
                Untuk pertanyaan petunjuk arah gedung, hubungi resepsionis klinik via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}