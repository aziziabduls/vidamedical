'use client';

import {
  ChevronRight,
  Clock,
  MapPin,
  MessageCircle,
  Phone
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function Footer() {

  return (
    <footer className="bg-[#0472B5] text-slate-300 font-sans border-t border-[#0472B5]/30 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-3.5">
            <div className="flex items-center space-x-2.5">
              <img src="/images/vida_logo.jpg" alt="Vida Medical Centre" width={40} height={40} className="w-10 h-10 border-[0.1px] border-[#0472B5] rounded-sm shadow-sm transition-transform duration-200 group-hover:scale-[1.02]" />
              {/* <div>
                <span className="text-lg font-bold text-white tracking-tight">
                  Vida Medical Centre
                </span>
              </div> */}
            </div>

            <p className="text-xs text-slate-200 leading-relaxed max-w-sm">
              Pelayanan kesehatan modern berstandar klinis terpercaya di Kebon Jeruk, Jakarta Barat. Melayani konsultasi dokter spesialis, lounge infus vitamin, evaluasi gizi klinis, dan perawatan medis di rumah.
            </p>

            {/* <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
              <div className="px-2.5 py-1 rounded bg-white/5 border border-white/10 flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Akreditasi Paripurna KARS</span>
              </div>
              <div className="px-2.5 py-1 rounded bg-white/5 border border-white/10 flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Farmasi Resmi BPOM</span>
              </div>
            </div> */}
          </div>

          {/* Pusat Layanan Unggulan */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Pusat Layanan Unggulan
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/layanan/vidaboost" className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  <span>VidaBoost IV Therapy (Silver, Gold, Plat, Diamond)</span>
                </Link>
              </li>
              <li>
                <Link href="/layanan/vidafit" className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  <span>VidaFit Weight Management &amp; Gizi</span>
                </Link>
              </li>
              <li>
                <Link href="/layanan/vidahealth" className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  <span>Medical Check Up (VidaHealth MCU)</span>
                </Link>
              </li>
              <li>
                <Link href="/layanan?layanan=homecare#comprehensive-services" className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  <span>Vida at Home (Homecare Rawat Luka)</span>
                </Link>
              </li>
              <li>
                <Link href="/kalkulator-jantung" className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  <span>Kalkulator Risiko Jantung 10 Tahun</span>
                </Link>
              </li>
              <li>
                <Link href="/layanan?coe=vaksinasi#coe" className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  <span>VidaShield Imunisasi &amp; Vaksinasi</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Informasi Pasien & Korporasi */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Akses Informasi
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/dokter-kami" className="hover:text-white transition-colors">
                  Dokter Kami
                </Link>
              </li>
              <li>
                <Link href="/dokter-kami#sp-pd" className="hover:text-white transition-colors">
                  Poli Penyakit Dalam (Sp.PD)
                </Link>
              </li>
              <li>
                <Link href="/dokter-kami#sp-gk" className="hover:text-white transition-colors">
                  Poli Gizi Klinis (Sp.GK)
                </Link>
              </li>
              <li>
                <Link href="/layanan" className="hover:text-white transition-colors">
                  Layanan Kami
                </Link>
              </li>
              <li>
                <Link href="/artikel" className="hover:text-white transition-colors">
                  Artikel
                </Link>
              </li>
            </ul>
          </div>

          {/* Lokasi & Kontak */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Lokasi & Kontak
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  The Vida Building Lantai 6, Jl. Perjuangan No.8, RT.1/RW.7, Kb. Jeruk, Kec. Kb. Jeruk, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11530
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Senin – Sabtu: 08.00 – 20.00 WIB</span>
              </div>

              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-rose-400 shrink-0" />
                <span>
                  Hotline Klinik: <a href="tel:08115750260" className="text-white font-semibold">0811-5750-260</a>
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  WhatsApp: <strong className="text-white font-semibold">0811 8951 181</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <p>© 2026 Vida Medical Centre. Seluruh hak cipta dilindungi.</p>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-white transition-colors">Hak Pasien</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
