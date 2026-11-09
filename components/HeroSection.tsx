'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, MessageCircle, ShieldCheck, HeartPulse, Clock, Activity, MapPin } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export default function HeroSection({ onOpenBooking }: HeroSectionProps) {
  return (
    <section className="bg-white border-b border-slate-200 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Context, Headline, Subtitle, Actions, Facts */}
          <div className="lg:col-span-7 space-y-6">
            {/* Context location badge */}
            <div className="inline-flex items-center gap-2 text-xs text-slate-600 font-medium bg-slate-100 border border-slate-200 px-3 py-1 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-700" />
              <span>Gedung The Vida, Lantai Dasar · Kebon Jeruk, Jakarta Barat</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-950 tracking-tight leading-[1.18] text-balance">
              Layanan medis rawat jalan dan terapi kebugaran terarah di Kebon Jeruk
            </h1>

            {/* Value description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
              Vida Medical Centre memadukan penanganan dokter berpengalaman dengan fasilitas diagnostik modern. Melayani terapi infus vitamin <span className="text-slate-900 font-medium">VidaBoost</span>, paket pemeriksaan berkala <span className="text-slate-900 font-medium">VidaHealth MCU</span> termasuk bonus analisis komposisi tubuh InBody, pendampingan gizi klinis <span className="text-slate-900 font-medium">VidaFit</span>, serta perawat <span className="text-slate-900 font-medium">Homecare</span> langsung ke rumah.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-medium text-white bg-teal-800 rounded-lg hover:bg-teal-900 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" strokeWidth={1.5} />
                <span>Reservasi jadwal kunjungan</span>
              </button>

              <a
                href="https://wa.me/628115750260?text=Halo%20Vida%20Medical%20Centre,%20saya%20ingin%20berkonsultasi%20mengenai%20layanan%20medis."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-normal text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" strokeWidth={1.5} />
                <span>Konsultasi WhatsApp 0811 5750 260</span>
              </a>
            </div>

            {/* Proof Points Strip */}
            <div className="pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-900 font-medium text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-800 shrink-0" strokeWidth={1.5} />
                  <span>Dokter berlisensi</span>
                </div>
                <p className="text-xs text-slate-500 font-normal">Praktik resmi & tersertifikasi</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-900 font-medium text-xs">
                  <HeartPulse className="w-3.5 h-3.5 text-teal-800 shrink-0" strokeWidth={1.5} />
                  <span>Bonus tes InBody</span>
                </div>
                <p className="text-xs text-slate-500 font-normal">Gratis pada paket MCU</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-900 font-medium text-xs">
                  <Activity className="w-3.5 h-3.5 text-teal-800 shrink-0" strokeWidth={1.5} />
                  <span>Formula VidaBoost</span>
                </div>
                <p className="text-xs text-slate-500 font-normal">Sediaan steril BPOM</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-900 font-medium text-xs">
                  <Clock className="w-3.5 h-3.5 text-teal-800 shrink-0" strokeWidth={1.5} />
                  <span>Homecare standby</span>
                </div>
                <p className="text-xs text-slate-500 font-normal">Kunjungan area Jakarta</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-white">
              <div className="relative aspect-[4/3] w-full bg-slate-100">
                <Image
                  src="/images/hero_vida_clinic.jpg"
                  alt="Interior Ruang Konsultasi dan Lounge Vida Medical Centre di Gedung The Vida Jakarta"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
              </div>

              {/* Informational baseline ribbon */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-medium text-slate-900 block">The Vida Building, Kebon Jeruk</span>
                  <span className="text-slate-500 text-xs">Jl. Raya Perjuangan No. 8, Jakarta Barat</span>
                </div>
                <a
                  href="#lokasi"
                  className="text-teal-800 hover:text-teal-950 font-medium shrink-0 ml-3 flex items-center gap-1"
                >
                  <MapPin className="w-3 h-3 text-teal-800" strokeWidth={1.5} />
                  <span>Peta lokasi</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}