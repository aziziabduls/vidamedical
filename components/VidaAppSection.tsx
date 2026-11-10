'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Smartphone,
  Clock,
  FileText,
  Video,
  Bell,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export default function VidaAppSection() {
  return (
    <section id="vida-app" className="py-16 bg-[#151e52] text-white font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Description */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-white/10 text-amber-300 text-xs font-semibold mb-3">
              {/* <Smartphone className="w-3.5 h-3.5" /> */}
              <span>Portal Pasien & Rekam Medis</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
              Akses Riwayat Medis & Janji Temu di MyVida Portal
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Kemudahan mengakses jadwal konsultasi dokter, hasil laboratorium, dan pemindaian komposisi tubuh InBody secara digital tanpa antrean berkepanjangan.
            </p>

            {/* 4 Feature Points */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center space-x-2 text-amber-300 font-semibold text-xs">
                  <Clock className="w-4 h-4" />
                  <span>Pelacakan Antrean Live</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Pantau estimasi waktu panggilan konsultasi dokter sebelum tiba di klinik.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center space-x-2 text-amber-300 font-semibold text-xs">
                  <FileText className="w-4 h-4" />
                  <span>Hasil Lab & InBody Digital</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Unduh resume medis, profil lipid, dan grafik massa lemak dalam format PDF.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center space-x-2 text-amber-300 font-semibold text-xs">
                  <Video className="w-4 h-4" />
                  <span>Konsultasi Lanjutan Online</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Evaluasi diet mingguan bersama dokter spesialis gizi klinis secara terjadwal.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center space-x-2 text-amber-300 font-semibold text-xs">
                  <Bell className="w-4 h-4" />
                  <span>Pengingat Jadwal Medis</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Notifikasi otomatis jadwal kontrol obat dan waktu booster vitamin berikutnya.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#doctor-search"
                className="px-4 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-900 font-semibold text-xs shadow-sm transition-colors flex items-center space-x-1.5"
              >
                <span>Buka Portal Pasien Web</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://wa.me/628118951181"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-white font-medium text-xs transition-colors"
              >
                <span>Bantuan Layanan Digital (WA)</span>
              </a>
            </div>
          </div>

          {/* Right Clinical Device View */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm bg-white rounded-2xl p-5 text-slate-900 shadow-xl border border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-[#1c2674] flex items-center justify-center text-amber-400 font-bold text-xs">
                    V
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1c2674]">MyVida Patient Portal</div>
                    <div className="text-[10px] text-slate-500">Gedung The Vida</div>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium">
                  Tersinkronisasi
                </span>
              </div>

              {/* Patient Record Tag */}
              <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs">
                <div className="text-[10px] text-slate-500 font-normal">Nomor Rekam Medis (MRN)</div>
                <div className="font-bold text-slate-900 tabular-nums">MRN-7740291</div>
                <div className="text-[11px] text-[#1c2674] font-medium mt-0.5">
                  Andreas Halim · Program VidaFit
                </div>
              </div>

              {/* Next Appointment Card */}
              <div className="mt-3 p-3 rounded-lg bg-amber-50/60 border border-amber-200/70 text-xs">
                <div className="flex justify-between items-center text-[10px] font-semibold text-amber-900">
                  <span>JADWAL BERIKUTNYA</span>
                  <span className="text-emerald-700 font-medium">Terkonfirmasi</span>
                </div>
                <div className="font-bold text-slate-900 mt-1">VidaBoost Gold + InBody Scan</div>
                <div className="text-[11px] text-slate-600 mt-0.5">
                  Lounge Mezzanine · Kamis, 14.00 WIB
                </div>
              </div>

              {/* Document Quick Action List */}
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-700">
                <div className="flex justify-between items-center p-2 rounded hover:bg-slate-50">
                  <span className="flex items-center space-x-2">
                    <FileText className="w-3.5 h-3.5 text-[#1c2674]" />
                    <span>Laporan MCU Eksekutif.pdf</span>
                  </span>
                  <span className="text-[10px] text-slate-400 tabular-nums">2.4 MB</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded hover:bg-slate-50">
                  <span className="flex items-center space-x-2">
                    <FileText className="w-3.5 h-3.5 text-[#1c2674]" />
                    <span>Hasil Pemindaian InBody 770.pdf</span>
                  </span>
                  <span className="text-[10px] text-slate-400 tabular-nums">1.1 MB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
