'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Search,
  Calendar,
  ChevronDown,
  Menu,
  X,
  ShieldCheck,
  HeartPulse,
  User,
  Stethoscope,
  Activity,
  Home,
  MessageCircle,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (category?: string, service?: string) => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [activeSegment, setActiveSegment] = useState<'pasien' | 'korporasi' | 'edukasi'>('pasien');

  return (
    <header className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 font-sans transition-colors">
      {/* 1. TOP UTILITY STRIP - Clean & Quiet */}
      <div className="bg-slate-50 border-b border-slate-200/70 text-xs hidden lg:block lg:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9">
          {/* Segment Tabs */}
          <div className="flex items-center space-x-6 h-full">
            <button
              type="button"
              onClick={() => setActiveSegment('pasien')}
              className={`h-full border-b-2 font-medium transition-colors flex items-center cursor-pointer ${activeSegment === 'pasien'
                ? 'border-[#1c2674] text-[#1c2674] font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
            >
              Pasien & Pengunjung
            </button>
            <button
              type="button"
              onClick={() => setActiveSegment('korporasi')}
              className={`h-full border-b-2 font-medium transition-colors flex items-center cursor-pointer ${activeSegment === 'korporasi'
                ? 'border-[#1c2674] text-[#1c2674] font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
            >
              Mitra Korporasi & Asuransi
            </button>
            <a
              href="#healthpedia"
              className="h-full border-b-2 border-transparent text-slate-500 hover:text-slate-800 font-medium flex items-center transition-colors"
            >
              Healthpedia
            </a>
          </div>

          {/* Contact & Portal Access */}
          <div className="flex items-center space-x-5 text-slate-600">
            <a
              href="https://wa.me/628118951181"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 hover:text-emerald-700 transition-colors font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp Resepsionis: <strong className="font-semibold text-slate-900">0811 8951 181</strong></span>
            </a>

            <span className="text-slate-300">·</span>

            <a
              href="tel:0215367890"
              className="flex items-center space-x-1.5 hover:text-[#1c2674] transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-[#1c2674]" />
              <span>Klinik Gedung The Vida: <strong className="font-semibold text-slate-900">(021) 5367-8900</strong></span>
            </a>

            <span className="text-slate-300">·</span>

            <button
              type="button"
              onClick={() => onOpenBooking('portal', 'Portal Pasien')}
              className="flex items-center space-x-1 text-[#1c2674] font-medium hover:underline cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>Portal Pasien</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER NAVIGATION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Brand Wordmark & Emblem */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg bg-[#1c2674] flex items-center justify-center text-amber-400 shadow-sm transition-transform duration-200 group-hover:scale-[1.02]">
              <svg viewBox="0 0 40 40" className="w-6 h-6 fill-current">
                <path d="M20 3L6 8v12c0 9 6 15 14 17 8-2 14-8 14-17V8L20 3z" fill="#1c2674" />
                <path d="M17 11h6v6h6v6h-6v6h-6v-6h-6v-6h6v-6z" fill="#f59e0b" />
              </svg>
            </div>
            <div>
              <div className="text-lg font-bold text-[#1c2674] tracking-tight leading-none flex items-center">
                Vida Medical Centre
                {/* <span className="text-amber-500 mr-1.5">.</span> */}
                {/* <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                  Medical Centre
                </span> */}
              </div>
              {/* <p className="text-[11px] text-slate-500 font-normal mt-0.5">
                Gedung The Vida, Kebon Jeruk
              </p> */}
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-6 text-sm font-medium text-slate-600">
            <a
              href="#doctor-search"
              className="hover:text-[#1c2674] transition-colors"
            >
              Cari Dokter
            </a>

            {/* Dropdown Layanan Medis */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                onMouseEnter={() => setServicesDropdownOpen(true)}
                className="hover:text-[#1c2674] transition-colors flex items-center space-x-1 py-2 cursor-pointer"
              >
                <span>Layanan Medis</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 transition-transform" />
              </button>

              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                    className="absolute left-0 mt-1 w-68 bg-white rounded-xl shadow-lg border border-slate-200/90 py-2 z-50"
                  >
                    <a
                      href="#coe"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="flex items-start space-x-3 px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-[#1c2674] transition-colors"
                    >
                      <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-xs text-slate-900">VidaBoost IV Therapy</div>
                        <div className="text-[11px] text-slate-500">Infus Vitamin C dosis terukur & energi</div>
                      </div>
                    </a>
                    <a
                      href="#coe"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="flex items-start space-x-3 px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-[#1c2674] transition-colors"
                    >
                      <Activity className="w-4 h-4 text-[#1c2674] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-xs text-slate-900">VidaFit Weight Management</div>
                        <div className="text-[11px] text-slate-500">Spesialis Gizi Klinis & InBody 770</div>
                      </div>
                    </a>
                    <a
                      href="#comprehensive-services"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="flex items-start space-x-3 px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-[#1c2674] transition-colors"
                    >
                      <Stethoscope className="w-4 h-4 text-[#1c2674] shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-xs text-slate-900">VidaHealth MCU</div>
                        <div className="text-[11px] text-slate-500">Pemeriksaan skrining preventif rutin</div>
                      </div>
                    </a>
                    <a
                      href="#comprehensive-services"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="flex items-start space-x-3 px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-[#1c2674] transition-colors"
                    >
                      <Home className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-xs text-slate-900">Vida at Home (Homecare)</div>
                        <div className="text-[11px] text-slate-500">Perawat luka modern & dokter ke rumah</div>
                      </div>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="#coe"
              className="hover:text-[#1c2674] transition-colors"
            >
              Pusat Unggulan
            </a>

            <a
              href="#heart-calculator"
              className="hover:text-[#1c2674] transition-colors flex items-center space-x-1"
            >
              {/* <HeartPulse className="w-4 h-4 text-rose-600" /> */}
              <span>Kalkulator Jantung</span>
            </a>

            <a
              href="#patient-story"
              className="hover:text-[#1c2674] transition-colors"
            >
              Kisah Pasien
            </a>

            <a
              href="#vida-app"
              className="hover:text-[#1c2674] transition-colors"
            >
              MyVida Portal
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href="#doctor-search"
              className="p-2 text-slate-500 hover:text-[#1c2674] hover:bg-slate-100 rounded-lg transition-colors"
              title="Pencarian Dokter"
            >
              <Search className="w-4 h-4" />
            </a>

            {/* Quiet Primary Action */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => onOpenBooking('doctor', 'Konsultasi Dokter Spesialis')}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#1c2674] hover:bg-[#151e52] text-white font-semibold text-xs shadow-sm transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Buat Janji Temu</span>
            </motion.button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              type="button"
              onClick={() => onOpenBooking('doctor', 'Konsultasi Dokter')}
              className="px-3 py-1.5 rounded-lg bg-[#1c2674] text-white font-semibold text-xs"
            >
              Janji Temu
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Navigasi menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. CLINICAL STATUS & HOTLINE STRIP */}
      <div className="bg-[#151e52] text-white text-xs py-2 px-4 border-t border-blue-900/50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-slate-300">Pelayanan Aktif:</span>
            <span className="font-medium text-white">Senin – Sabtu (08.00 – 20.00 WIB)</span>
          </div>
          <div className="hidden md:flex items-center space-x-4 text-slate-300">
            <span>Homecare: <strong className="font-semibold text-white">0811 8951 181</strong></span>
            <span>·</span>
            <span>Hotline Darurat: <strong className="font-semibold text-white">(021) 5367-8900</strong></span>
            <span>·</span>
            <span className="text-amber-300 font-medium">Gedung The Vida Kebon Jeruk</span>
          </div>
        </div>
      </div>

      {/* 4. MOBILE SLIDE-DOWN DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 overflow-hidden"
          >
            <div className="space-y-1 text-sm font-medium text-slate-800">
              <a
                href="#doctor-search"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-slate-50 text-[#1c2674]"
              >
                Cari Dokter & Jadwal
              </a>
              <a
                href="#coe"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                Pusat Layanan Unggulan
              </a>
              <a
                href="#comprehensive-services"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                Paket MCU & Laboratorium
              </a>
              <a
                href="#heart-calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-slate-50 text-rose-700"
              >
                Kalkulator Risiko Jantung
              </a>
              <a
                href="#patient-story"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                Kisah Pasien (#BersamaVida)
              </a>
              <a
                href="#vida-app"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                MyVida Patient Portal
              </a>
              <a
                href="#healthpedia"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                Healthpedia Artikel Medis
              </a>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Hotline Klinik:</span>
                <strong className="text-slate-900">(021) 5367-8900</strong>
              </div>
              <div className="flex justify-between">
                <span>WhatsApp:</span>
                <strong className="text-emerald-700">0811-8951-181</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking('doctor', 'Konsultasi Spesialis');
              }}
              className="w-full py-2.5 rounded-lg bg-[#1c2674] text-white font-semibold text-xs text-center cursor-pointer shadow-sm"
            >
              Buat Janji Temu Dokter
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
