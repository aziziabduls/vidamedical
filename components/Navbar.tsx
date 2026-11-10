'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Calendar,
  ChevronDown,
  Menu,
  X,
  Stethoscope,
  Activity,
  Home,
  Sparkles,
} from 'lucide-react';
import { scrollToHomeHref } from '@/lib/section-navigation';

interface NavbarProps {
  onOpenBooking: (category?: string, service?: string) => void;
}

const SERVICE_DROPDOWN_ITEMS = [
  {
    href: '/?coe=vidaboost#coe',
    title: 'VidaBoost IV Therapy',
    description: 'Infus Vitamin C dosis terukur & energi',
    icon: Sparkles,
    iconClassName: 'text-amber-500',
  },
  {
    href: '/?coe=vidafit#coe',
    title: 'VidaFit Weight Management',
    description: 'Spesialis Gizi Klinis & InBody 770',
    icon: Activity,
    iconClassName: 'text-[#0472B5]',
  },
  {
    href: '/?layanan=mcu#comprehensive-services',
    title: 'VidaHealth MCU',
    description: 'Pemeriksaan skrining preventif rutin',
    icon: Stethoscope,
    iconClassName: 'text-[#0472B5]',
  },
  {
    href: '/?layanan=homecare#comprehensive-services',
    title: 'Vida at Home (Homecare)',
    description: 'Perawat luka modern & dokter ke rumah',
    icon: Home,
    iconClassName: 'text-teal-600',
  },
] as const;

const MOBILE_NAV_ITEMS = [
  {
    href: '/#doctor-search',
    label: 'Cari Dokter & Jadwal',
    className: 'text-[#0472B5]',
  },
  {
    href: '/#coe',
    label: 'Pusat Layanan Unggulan',
    className: '',
  },
  {
    href: '/?layanan=mcu#comprehensive-services',
    label: 'Paket MCU & Laboratorium',
    className: '',
  },
  {
    href: '/#heart-calculator',
    label: 'Kalkulator Risiko Jantung',
    className: 'text-rose-700',
  },
  {
    href: '/#vida-app',
    label: 'MyVida Patient Portal',
    className: '',
  },
] as const;

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const pathname = usePathname();
  const isArticleRoute = pathname?.startsWith('/artikel') ?? false;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync sticky navbar bar height to CSS --navbar-height so hash links never land behind the header.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const updateHeight = () => {
      const height = Math.ceil(header.getBoundingClientRect().height);
      document.documentElement.style.setProperty('--navbar-height', `${height}px`);
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  // Dismiss open menus on Escape or pointer interaction outside.
  useEffect(() => {
    if (!servicesDropdownOpen && !mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (servicesDropdownOpen && dropdownRef.current && !dropdownRef.current.contains(target)) {
        setServicesDropdownOpen(false);
      }
      if (mobileMenuOpen && headerRef.current && !headerRef.current.contains(target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [servicesDropdownOpen, mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);

    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    const isHomeTarget = href === '/' || href.startsWith('/#') || href.startsWith('/?');
    if (pathname === '/' && isHomeTarget) {
      e.preventDefault();
      scrollToHomeHref(href);
      return;
    }

    if (pathname === '/artikel' && href === '/artikel') {
      e.preventDefault();
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <header
      ref={headerRef}
      className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-md font-sans transition-colors"
    >
      {/* 1. MAIN HEADER NAVIGATION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Brand Wordmark & Emblem */}
          <Link
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="flex items-center space-x-3 group shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0472B5] rounded-md"
          >
            <img
              src="/images/vida_logo.jpg"
              alt="Vida Medical Centre"
              width={40}
              height={40}
              className="w-10 h-10 border-[0.1px] border-[#0472B5] rounded-sm shadow-sm transition-transform duration-200 group-hover:scale-[1.02]"
            />
            <div>
              <div className="text-lg font-bold text-[#0472B5] tracking-tight leading-none flex items-center">
                Vida Medical Centre
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Navigasi utama"
            className="hidden xl:flex items-center space-x-6 text-sm font-medium text-slate-600"
          >
            <Link
              href="/#doctor-search"
              onClick={(e) => handleLinkClick(e, '/#doctor-search')}
              className="hover:text-[#0472B5] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0472B5] rounded-sm"
            >
              Cari Dokter
            </Link>

            {/* Dropdown Layanan Medis */}
            <div
              ref={dropdownRef}
              className="relative"
              onPointerEnter={(e) => {
                if (e.pointerType !== 'touch') setServicesDropdownOpen(true);
              }}
              onMouseLeave={() => setServicesDropdownOpen(false)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                  setServicesDropdownOpen(false);
                }
              }}
            >
              <button
                type="button"
                aria-expanded={servicesDropdownOpen}
                aria-controls="services-dropdown"
                onClick={() => setServicesDropdownOpen((prev) => !prev)}
                className="hover:text-[#0472B5] transition-colors flex items-center space-x-1 py-2 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0472B5] rounded-sm"
              >
                <span>Layanan Medis</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-150 ${
                    servicesDropdownOpen ? 'rotate-180 text-[#0472B5]' : 'text-slate-400'
                  }`}
                />
              </button>

              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div
                    id="services-dropdown"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute left-0 top-full pt-2 z-50"
                  >
                    <div className="w-72 bg-white rounded-xl shadow-lg border border-slate-200/90 py-2">
                      {SERVICE_DROPDOWN_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={(e) => handleLinkClick(e, item.href)}
                            className="flex items-start space-x-3 px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-[#0472B5] transition-colors focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#0472B5]"
                          >
                            <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${item.iconClassName}`} />
                            <div>
                              <div className="font-semibold text-xs text-slate-900">{item.title}</div>
                              <div className="text-[11px] text-slate-500">{item.description}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/#coe"
              onClick={(e) => handleLinkClick(e, '/#coe')}
              className="hover:text-[#0472B5] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0472B5] rounded-sm"
            >
              Pusat Unggulan
            </Link>

            <Link
              href="/#heart-calculator"
              onClick={(e) => handleLinkClick(e, '/#heart-calculator')}
              className="hover:text-[#0472B5] transition-colors flex items-center space-x-1 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0472B5] rounded-sm"
            >
              <span>Kalkulator Jantung</span>
            </Link>

            {/* <a
              href="/#patient-story"
              className="hover:text-[#0472B5] transition-colors"
            >
              Kisah Pasien
            </a> */}

            <Link
              href="/#vida-app"
              onClick={(e) => handleLinkClick(e, '/#vida-app')}
              className="hover:text-[#0472B5] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0472B5] rounded-sm"
            >
              MyVida Portal
            </Link>

            <Link
              href="/artikel"
              onClick={(e) => handleLinkClick(e, '/artikel')}
              aria-current={isArticleRoute ? 'page' : undefined}
              className={`transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0472B5] rounded-sm ${
                isArticleRoute
                  ? 'text-[#0472B5] font-semibold underline decoration-2 underline-offset-8'
                  : 'hover:text-[#0472B5]'
              }`}
            >
              Artikel
            </Link>
          </nav>

          {/* Desktop Action CTAs */}
          <div className="hidden xl:flex items-center space-x-3 shrink-0">
            <Link
              href="/#doctor-search"
              onClick={(e) => handleLinkClick(e, '/#doctor-search')}
              className="p-2 text-slate-500 hover:text-[#0472B5] hover:bg-slate-100 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0472B5]"
              title="Pencarian Dokter"
              aria-label="Pencarian Dokter"
            >
              <Search className="w-4 h-4" />
            </Link>

            {/* Quiet Primary Action */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => onOpenBooking('doctor', 'Konsultasi Dokter Spesialis')}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#0472B5] hover:bg-[#035c93] text-white font-semibold text-xs shadow-sm transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0472B5]"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Buat Janji Temu</span>
            </motion.button>
          </div>

          {/* Mobile & Tablet Menu Controls */}
          <div className="flex items-center space-x-2 xl:hidden shrink-0">
            <Link
              href="/#doctor-search"
              onClick={(e) => handleLinkClick(e, '/#doctor-search')}
              className="hidden sm:inline-flex p-2 text-slate-500 hover:text-[#0472B5] hover:bg-slate-100 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0472B5]"
              title="Pencarian Dokter"
              aria-label="Pencarian Dokter"
            >
              <Search className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={() => onOpenBooking('doctor', 'Konsultasi Dokter')}
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-[#0472B5] hover:bg-[#035c93] text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              <span className="sm:hidden">Janji Temu</span>
              <span className="hidden sm:inline">Buat Janji Temu</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0472B5] cursor-pointer"
              aria-label="Navigasi menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 2. CLINICAL STATUS & HOTLINE STRIP */}
      <div className="bg-[#035c93] text-white text-xs py-2 px-4 border-t border-[#0472B5]/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-slate-300">Pelayanan Aktif:</span>
            <span className="font-medium text-white">Senin – Sabtu (08.00 – 20.00 WIB)</span>
          </div>
          <div className="hidden md:flex items-center space-x-4 text-slate-300">
            <span>Homecare: <strong className="font-semibold text-white">0811-5750-260</strong></span>
            <span>·</span>
            <span>Hotline Darurat: <strong className="font-semibold text-white">0811-5750-260</strong></span>
            <span>·</span>
            <span className="text-amber-300 font-medium">The Vida Building Kebon Jeruk</span>
          </div>
        </div>
      </div>

      {/* 3. MOBILE SLIDE-DOWN DRAWER (Overlay outside flow so header height stays stable during scroll) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="xl:hidden absolute inset-x-0 top-full bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 space-y-4 max-h-[calc(100dvh-var(--navbar-height,5.5625rem))] overflow-y-auto z-40"
          >
            <nav aria-label="Navigasi seluler" className="space-y-1 text-sm font-medium text-slate-800">
              {MOBILE_NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`block px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors ${item.className}`}
                >
                  {item.label}
                </Link>
              ))}
              {/* <Link
                href="/#patient-story"
                onClick={(e) => handleLinkClick(e, '/#patient-story')}
                className="block px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                Kisah Pasien (#BersamaVida)
              </Link> */}
              <Link
                href="/artikel"
                onClick={(e) => handleLinkClick(e, '/artikel')}
                aria-current={isArticleRoute ? 'page' : undefined}
                className={`block px-3 py-2 rounded-lg transition-colors ${
                  isArticleRoute
                    ? 'bg-[#0472B5]/10 text-[#0472B5] font-semibold'
                    : 'hover:bg-slate-50'
                }`}
              >
                Healthpedia Artikel Medis
              </Link>
            </nav>

            <div className="pt-3 border-t border-slate-100 flex flex-col space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Hotline Klinik:</span>
                <strong className="text-slate-900">0811-5750-260</strong>
              </div>
              <div className="flex justify-between">
                <span>WhatsApp:</span>
                <strong className="text-emerald-700">0811-5750-260</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking('doctor', 'Konsultasi Spesialis');
              }}
              className="w-full py-2.5 rounded-lg bg-[#0472B5] text-white font-semibold text-xs text-center cursor-pointer shadow-sm"
            >
              Buat Janji Temu Dokter
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
