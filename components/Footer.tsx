'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';
import { scrollToHomeHref } from '@/lib/section-navigation';

export default function Footer() {
  const pathname = usePathname();

  const handleHomeLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    if (pathname === '/') {
      e.preventDefault();
      scrollToHomeHref(href);
    }
  };

  return (
    <footer className="bg-[#0472B5] text-slate-300 font-sans border-t border-[#0472B5]/30 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-3.5">
            <div className="flex items-center space-x-2.5">
              {/* <div className="w-9 h-9 rounded-lg bg-[#0472B5] flex items-center justify-center text-amber-400">
                <svg viewBox="0 0 40 40" className="w-5 h-5 fill-current">
                  <path d="M20 3L6 8v12c0 9 6 15 14 17 8-2 14-8 14-17V8L20 3z" fill="#0472B5" />
                  <path d="M17 11h6v6h6v6h-6v6h-6v-6h-6v-6h6v-6z" fill="#f59e0b" />
                </svg>
              </div> */}
              <img src="/images/vida_logo.jpg" alt="Vida Medical Centre" width={40} height={40} className="w-10 h-10 border-[0.1px] border-[#0472B5] rounded-sm shadow-sm transition-transform duration-200 group-hover:scale-[1.02]" />
              <div>
                <span className="text-lg font-bold text-white tracking-tight">
                  Vida Medical Centre
                  {/* <span className="text-amber-400">.</span> */}
                  {/* <span className="text-[11px] font-semibold text-slate-300 ml-1.5">
                    Medical Centre
                  </span> */}
                </span>
                {/* <p className="text-[11px] text-slate-400">
                  Klinik Medis & Kebugaran Terpadu
                </p> */}
              </div>
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
                <Link href="/?coe=vidaboost#coe" onClick={(e) => handleHomeLinkClick(e, '/?coe=vidaboost#coe')} className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>VidaBoost IV Therapy (Silver, Gold, Plat)</span>
                </Link>
              </li>
              <li>
                <Link href="/?coe=vidafit#coe" onClick={(e) => handleHomeLinkClick(e, '/?coe=vidafit#coe')} className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>VidaFit Weight Management & Gizi</span>
                </Link>
              </li>
              <li>
                <Link href="/?layanan=mcu#comprehensive-services" onClick={(e) => handleHomeLinkClick(e, '/?layanan=mcu#comprehensive-services')} className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Medical Check Up (VidaHealth MCU)</span>
                </Link>
              </li>
              <li>
                <Link href="/?layanan=homecare#comprehensive-services" onClick={(e) => handleHomeLinkClick(e, '/?layanan=homecare#comprehensive-services')} className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Vida at Home (Homecare Rawat Luka)</span>
                </Link>
              </li>
              <li>
                <Link href="/#heart-calculator" onClick={(e) => handleHomeLinkClick(e, '/#heart-calculator')} className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Kalkulator Risiko Jantung 10 Tahun</span>
                </Link>
              </li>
              <li>
                <Link href="/?coe=vaksinasi#coe" onClick={(e) => handleHomeLinkClick(e, '/?coe=vaksinasi#coe')} className="hover:text-white transition-colors flex items-center space-x-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>VidaShield Imunisasi & Vaksinasi</span>
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
                <Link href="/#doctor-search" onClick={(e) => handleHomeLinkClick(e, '/#doctor-search')} className="hover:text-white transition-colors">
                  Jadwal Praktik Dokter
                </Link>
              </li>
              <li>
                <Link href="/#vida-app" onClick={(e) => handleHomeLinkClick(e, '/#vida-app')} className="hover:text-white transition-colors">
                  MyVida Patient Portal
                </Link>
              </li>
              {/* <li>
                <Link href="/#patient-story" className="hover:text-white transition-colors">
                  Kisah Pasien (#BersamaVida)
                </Link>
              </li> */}
              <li>
                <Link href="/artikel" className="hover:text-white transition-colors">
                  Healthpedia Artikel Medis
                </Link>
              </li>
              {/* <li>
                <a href="#comprehensive-services" className="hover:text-white transition-colors">
                  Mitra Asuransi & Rekanan
                </a>
              </li> */}
              <li>
                <a href="https://wa.me/628115750260" className="hover:text-white transition-colors">
                  Kerjasama MCU Korporasi
                </a>
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
