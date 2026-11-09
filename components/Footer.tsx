import React from 'react';
import Link from 'next/link';
import { Shield, Phone, Instagram, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-800 flex items-center justify-center text-white">
                <Shield className="w-4 h-4" strokeWidth={1.75} />
              </div>
              <div>
                <span className="text-sm font-semibold text-white block">Vida Medical Centre</span>
                <span className="text-xs text-slate-500 font-normal">Gedung The Vida, Kebon Jeruk</span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs max-w-sm font-normal">
              Klinik layanan medis dan kebugaran terpadu di Gedung The Vida, Kebon Jeruk, Jakarta Barat. Melayani konsultasi dokter, infus vitamin VidaBoost, paket MCU VidaHealth, penurunan berat badan VidaFit, dan perawat homecare.
            </p>

            <div className="pt-1 text-slate-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" strokeWidth={1.5} />
                <span>The Vida Building, Jl. Raya Perjuangan No. 8, Jakarta Barat</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" strokeWidth={1.5} />
                <span className="font-mono tabular-nums">WhatsApp: 0811 5750 260</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200">
              Layanan utama
            </h4>
            <ul className="space-y-2 text-slate-400 font-normal">
              <li>
                <a href="#vidaboost" className="hover:text-slate-200 transition-colors">
                  Infus VidaBoost (Silver - Diamond)
                </a>
              </li>
              <li>
                <a href="#vidahealth" className="hover:text-slate-200 transition-colors">
                  Paket MCU VidaHealth & InBody
                </a>
              </li>
              <li>
                <a href="#vidafit" className="hover:text-slate-200 transition-colors">
                  Program gizi klinis VidaFit
                </a>
              </li>
              <li>
                <a href="#homecare" className="hover:text-slate-200 transition-colors">
                  Homecare medis ke rumah
                </a>
              </li>
              <li>
                <a href="#vaksinasi" className="hover:text-slate-200 transition-colors">
                  Vaksinasi VidaShield
                </a>
              </li>
            </ul>
          </div>

          {/* Homecare Procedures */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200">
              Tindakan homecare
            </h4>
            <ul className="space-y-2 text-slate-400 font-normal">
              <li>Perawatan luka pasca bedah & diabetes</li>
              <li>Pemasangan selang makan NGT</li>
              <li>Pemasangan kateter urin medis</li>
              <li>Infus vitamin VidaBoost di rumah</li>
              <li>Kunjungan dokter umum ke rumah</li>
            </ul>
          </div>

          {/* Operating Hours & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200">
              Jam pelayanan
            </h4>
            <div className="space-y-1 text-slate-400 text-xs font-normal">
              <p>
                <span className="text-slate-300 block font-medium">Senin – Sabtu:</span>
                <span className="font-mono tabular-nums">08.00 – 20.00 WIB</span>
              </p>
              <p className="pt-1">
                <span className="text-slate-300 block font-medium">Minggu & Hari Libur:</span>
                <span>Janji temu khusus & homecare on-call</span>
              </p>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/628115750260"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-teal-800 hover:bg-teal-700 text-white font-medium transition-colors text-xs"
              >
                <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span className="font-mono tabular-nums">0811 5750 260</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px] font-normal">
          <p>© {new Date().getFullYear()} Vida Medical Centre. Seluruh hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-3">
            <a href="#lokasi" className="hover:text-slate-400 transition-colors">
              The Vida Building, Kebon Jeruk, Jakarta Barat
            </a>
            <span>·</span>
            <a
              href="https://instagram.com/vidamedicalcentre"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-400 transition-colors"
            >
              @vidamedicalcentre
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}