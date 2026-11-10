'use client';

import React from 'react';
import {
  Smartphone,
  CheckCircle2,
  Clock,
  FileText,
  Video,
  Bell,
  Download,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function MySiloamAppSection() {
  return (
    <section id="mysiloam" className="py-20 bg-gradient-to-br from-[#1c2674] via-[#1a2882] to-[#121950] text-white font-sans overflow-hidden relative">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffcf00]/10 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -ml-32 -mb-32" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-bold text-[#ffcf00] uppercase tracking-wider mb-4">
              <Smartphone className="w-4 h-4 text-[#ffcf00]" />
              <span>Aplikasi Kesehatan Digital Terintegrasi</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Kelola Kesehatan Anda dalam Satu Sentuhan dengan <br />
              <span className="text-[#ffcf00]">MySiloam App</span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
              Nikmati kemudahan mengakses layanan Siloam Hospitals dari genggaman Anda. Buat janji dokter tanpa antre, pantau status antrean secara real-time, dan unduh riwayat hasil lab langsung di smartphone.
            </p>

            {/* 4 Key Features Checklist */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-white/10 backdrop-blur border border-white/10">
                <Clock className="w-5 h-5 text-[#ffcf00] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Live Queue Tracking</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Pantau nomor antrean dokter langsung dari rumah agar Anda tidak perlu menunggu lama di RS.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-white/10 backdrop-blur border border-white/10">
                <FileText className="w-5 h-5 text-[#ffcf00] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Rekam Medis & Hasil Lab Digital</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Hasil pemeriksaan laboratorium dan radiologi tersimpan aman dan dapat diunduh kapan saja.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-white/10 backdrop-blur border border-white/10">
                <Video className="w-5 h-5 text-[#ffcf00] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Telekonsultasi Spesialis</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Konsultasi tatap muka video call dengan dokter spesialis pilihan tanpa harus keluar rumah.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-white/10 backdrop-blur border border-white/10">
                <Bell className="w-5 h-5 text-[#ffcf00] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Pengingat Jadwal Obat & Kontrol</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Notifikasi otomatis pengingat minum obat teratur dan jadwal kontrol medis berikutnya.
                  </p>
                </div>
              </div>
            </div>

            {/* App Store Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.siloam.mysiloam"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 px-5 py-3 rounded-xl bg-black/60 hover:bg-black/80 border border-white/20 text-white transition-all transform hover:-translate-y-0.5 shadow-md"
              >
                <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.793 12 3.61 22.186A2.29 2.29 0 0 1 3 20.615V3.385c0-.624.234-1.2.609-1.571zm11.605 11.607l2.585 2.585-11.455 6.613 8.87-9.198zm0-2.842L6.34 1.382l11.454 6.613-2.58 2.584zm1.42 1.421l3.526 2.036c1.12.646 1.12 1.706 0 2.353l-3.526 2.036-2.184-2.184 2.184-2.241z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] text-slate-300 uppercase leading-none">Temukan di</div>
                  <div className="text-sm font-bold leading-tight">Google Play</div>
                </div>
              </a>

              <a
                href="https://apps.apple.com/id/app/mysiloam/id1450259838"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 px-5 py-3 rounded-xl bg-black/60 hover:bg-black/80 border border-white/20 text-white transition-all transform hover:-translate-y-0.5 shadow-md"
              >
                <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.07 1.72-.94 2.74 1 .08 2.02-.49 2.64-1.24z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] text-slate-300 uppercase leading-none">Unduh di</div>
                  <div className="text-sm font-bold leading-tight">App Store</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Phone Mockup Visualization */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-72 sm:w-80 bg-slate-900 p-4 rounded-[40px] shadow-2xl border-4 border-slate-700">
              {/* Notch */}
              <div className="w-32 h-4 bg-slate-800 rounded-b-xl mx-auto mb-3" />

              {/* Phone Screen UI */}
              <div className="bg-white rounded-[28px] p-4 text-slate-800 space-y-4">
                {/* App Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-lg bg-[#1c2674] flex items-center justify-center text-[#ffcf00] font-black text-xs">
                      S
                    </div>
                    <span className="font-extrabold text-sm text-[#1c2674]">MySiloam</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-full">
                    Online
                  </span>
                </div>

                {/* Patient Profile Card */}
                <div className="bg-[#1c2674] text-white p-3 rounded-xl shadow">
                  <div className="text-[10px] text-slate-300">Nomor Rekam Medis (MRN)</div>
                  <div className="text-sm font-bold">SLM-8829103</div>
                  <div className="text-xs text-[#ffcf00] font-semibold mt-1">Hendra Johari • Pasien Terdaftar</div>
                </div>

                {/* Live Queue Ticket */}
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl">
                  <div className="flex justify-between items-center text-[10px] font-bold text-amber-900">
                    <span>ANTREAN HARI INI</span>
                    <span className="animate-pulse text-red-600">● SEDANG BERJALAN</span>
                  </div>
                  <div className="text-2xl font-black text-[#1c2674] mt-1">A-014</div>
                  <div className="text-[11px] text-slate-600 font-medium">
                    dr. Spesialis Jantung (Sp.JP) • Ruang 204
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Estimasi panggilan: ± 15 menit lagi
                  </div>
                </div>

                {/* Quick Menu Icons */}
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold text-slate-700">
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <FileText className="w-4 h-4 mx-auto text-[#1c2674] mb-1" />
                    <span>Hasil Lab</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <Video className="w-4 h-4 mx-auto text-blue-600 mb-1" />
                    <span>Telekonsul</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <Bell className="w-4 h-4 mx-auto text-amber-600 mb-1" />
                    <span>Jadwal Obat</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

