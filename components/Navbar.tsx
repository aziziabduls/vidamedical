'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Calendar, Clock, Menu, X, Shield, MapPin } from 'lucide-react';
import { checkClinicOperatingStatus } from '@/lib/clinic-rules';

interface NavbarProps {
  onOpenBooking: (serviceCategory?: string, serviceOption?: string) => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [clinicStatus, setClinicStatus] = useState(() => checkClinicOperatingStatus());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const interval = setInterval(() => {
      setClinicStatus(checkClinicOperatingStatus());
    }, 60000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Top Notice & Clinic Operating Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 truncate">
            <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" strokeWidth={1.5} />
            <span className="truncate">Gedung The Vida, Lantai Dasar · Jl. Raya Perjuangan No. 8, Kebon Jeruk, Jakarta Barat</span>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-slate-400">
            <span className="hidden md:flex items-center gap-1.5">
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  clinicStatus.isOpen ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
              />
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" strokeWidth={1.5} />
              <span>{clinicStatus.statusText}</span>
            </span>
            <span className="hidden md:inline-block text-slate-700">|</span>
            <a
              href="https://wa.me/628115750260"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-teal-400 shrink-0" strokeWidth={1.5} />
              <span className="font-mono tabular-nums">0811 5750 260</span>
            </a>
            <span className="text-slate-700">·</span>
            <a
              href="https://instagram.com/vidamedicalcentre"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              @vidamedicalcentre
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <header
        className={`sticky top-0 z-40 transition-colors duration-150 ${
          scrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs' : 'bg-white border-b border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
          {/* Brand Logo & Context */}
          <Link
            href="/"
            className="flex items-center gap-3 text-slate-900 whitespace-nowrap shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-800 text-white flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4" strokeWidth={1.75} />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold tracking-tight text-slate-900 leading-none">
                Vida Medical Centre
              </span>
              <span className="text-xs text-slate-500 font-normal leading-tight mt-0.5">
                Gedung The Vida · Kebon Jeruk
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm text-slate-600">
            <a
              href="#layanan"
              className="hover:text-slate-900 transition-colors py-1 font-normal"
            >
              Layanan klinis
            </a>
            <a
              href="#vidaboost"
              className="hover:text-slate-900 transition-colors py-1 font-normal"
            >
              Infus VidaBoost
            </a>
            <a
              href="#vidahealth"
              className="hover:text-slate-900 transition-colors py-1 font-normal"
            >
              Paket MCU
            </a>
            <a
              href="#vidafit"
              className="hover:text-slate-900 transition-colors py-1 font-normal"
            >
              Program VidaFit
            </a>
            <a
              href="#homecare"
              className="hover:text-slate-900 transition-colors py-1 font-normal"
            >
              Homecare
            </a>
            <a
              href="#vaksinasi"
              className="hover:text-slate-900 transition-colors py-1 font-normal"
            >
              Vaksinasi
            </a>
            <a
              href="#lokasi"
              className="hover:text-slate-900 transition-colors py-1 font-normal"
            >
              Lokasi & kontak
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenBooking()}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-teal-800 rounded-lg hover:bg-teal-900 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>Reservasi jadwal</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" strokeWidth={1.5} />
              ) : (
                <Menu className="w-5 h-5" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-3">
            <div className="grid gap-1">
              <a
                href="#layanan"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
              >
                Layanan klinis
              </a>
              <a
                href="#vidaboost"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
              >
                Infus VidaBoost
              </a>
              <a
                href="#vidahealth"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
              >
                Paket MCU & InBody
              </a>
              <a
                href="#vidafit"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
              >
                Program gizi VidaFit
              </a>
              <a
                href="#homecare"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
              >
                Homecare medis
              </a>
              <a
                href="#vaksinasi"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
              >
                Vaksinasi VidaShield
              </a>
              <a
                href="#lokasi"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
              >
                Lokasi & kontak
              </a>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-2.5 px-4 text-center text-xs font-medium text-white bg-teal-800 rounded-lg hover:bg-teal-900 transition-colors"
              >
                Reservasi jadwal sekarang
              </button>
              <a
                href="https://wa.me/628115750260"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 text-center text-xs font-normal text-slate-700 bg-slate-100 border border-slate-200 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-teal-800" strokeWidth={1.5} />
                <span>WhatsApp 0811 5750 260</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}