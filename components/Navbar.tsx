'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity,
  Calendar,
  ChevronDown,
  Menu,
  Sparkles,
  Stethoscope,
  X
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

interface NavbarProps {
  onOpenBooking: (category?: string, service?: string) => void;
}

const VIDABOOST_TIERS = [
  { label: 'Silver', href: '/layanan/vidaboost?tier=silver' },
  { label: 'Gold', href: '/layanan/vidaboost?tier=gold' },
  { label: 'Platinum', href: '/layanan/vidaboost?tier=platinum' },
  { label: 'Diamond', href: '/layanan/vidaboost?tier=diamond' },
] as const;

const SERVICE_ITEMS = [
  {
    href: '/layanan/vidaboost',
    title: 'VidaBoost',
    description: 'Terapi infus vitamin & mikronutrien',
    icon: Sparkles,
    iconClassName: 'text-amber-500',
    tiers: VIDABOOST_TIERS,
  },
  {
    href: '/layanan/vidahealth',
    title: 'VidaHealth',
    description: 'Medical Check Up & skrining organ vital',
    icon: Stethoscope,
    iconClassName: 'text-[#0472B5]',
  },
  {
    href: '/layanan/vidafit',
    title: 'VidaFit',
    description: 'Weight Management & Dokter Gizi Klinis',
    icon: Activity,
    iconClassName: 'text-teal-600',
  },
] as const;

const DOCTOR_POLI_ITEMS = [
  {
    href: '/dokter-kami#sp-pd',
    title: 'Poli Penyakit Dalam',
    description: 'Dokter Spesialis Penyakit Dalam (Sp.PD)',
    icon: Stethoscope,
    iconClassName: 'text-[#0472B5]',
  },
  {
    href: '/dokter-kami#sp-gk',
    title: 'Poli Gizi Klinis',
    description: 'Dokter Spesialis Gizi Klinis (Sp.GK)',
    icon: Activity,
    iconClassName: 'text-teal-600',
  },
] as const;

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const pathname = usePathname() ?? '';
  const isDoctorRoute = pathname.startsWith('/dokter-kami');
  const isServicesRoute = pathname.startsWith('/layanan');
  const isHeartCalcRoute = pathname.startsWith('/kalkulator-jantung');
  const isArticleRoute = pathname.startsWith('/artikel');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [doctorsDropdownOpen, setDoctorsDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const doctorsDropdownRef = useRef<HTMLDivElement>(null);
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
    if (!doctorsDropdownOpen && !servicesDropdownOpen && !mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDoctorsDropdownOpen(false);
        setServicesDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        doctorsDropdownOpen &&
        doctorsDropdownRef.current &&
        !doctorsDropdownRef.current.contains(target)
      ) {
        setDoctorsDropdownOpen(false);
      }
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
  }, [doctorsDropdownOpen, servicesDropdownOpen, mobileMenuOpen]);

  const handleRouteClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setDoctorsDropdownOpen(false);
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);

    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    if (pathname === href) {
      e.preventDefault();
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  const navLinkClass = (active: boolean) =>
    `transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0472B5] rounded-sm ${active
      ? 'text-[#0472B5] font-semibold underline decoration-2 underline-offset-8'
      : 'hover:text-[#0472B5]'
    }`;

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
            onClick={(e) => handleRouteClick(e, '/')}
            className="flex items-center space-x-3 group shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0472B5] rounded-md"
          >
            <img
              src="/images/vida_logo.jpg"
              alt="Vida Medical Centre"
              width={40}
              height={40}
              className="w-10 h-10 border-[0.1px] border-[#0472B5] rounded-sm shadow-sm transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Navigasi utama"
            className="hidden xl:flex items-center space-x-6 text-sm font-medium text-slate-600"
          >
            {/* Dropdown Dokter Kami (Poli Penyakit Dalam & Poli Gizi Klinis) */}
            <div
              ref={doctorsDropdownRef}
              className="relative"
              onPointerEnter={(e) => {
                if (e.pointerType !== 'touch') {
                  setDoctorsDropdownOpen(true);
                  setServicesDropdownOpen(false);
                }
              }}
              onMouseLeave={() => setDoctorsDropdownOpen(false)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                  setDoctorsDropdownOpen(false);
                }
              }}
            >
              <button
                type="button"
                aria-expanded={doctorsDropdownOpen}
                aria-controls="doctors-dropdown"
                onClick={() => {
                  setDoctorsDropdownOpen((prev) => !prev);
                  setServicesDropdownOpen(false);
                }}
                className={`transition-colors flex items-center space-x-1 py-2 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0472B5] rounded-sm ${isDoctorRoute
                  ? 'text-[#0472B5] font-semibold underline decoration-2 underline-offset-8'
                  : 'hover:text-[#0472B5]'
                  }`}
              >
                <span>Dokter Kami</span>
                <ChevronDown
                  aria-hidden="true"
                  className={`w-3.5 h-3.5 transition-transform duration-150 ${doctorsDropdownOpen ? 'rotate-180 text-[#0472B5]' : 'text-slate-400'
                    }`}
                />
              </button>

              <AnimatePresence>
                {doctorsDropdownOpen && (
                  <motion.div
                    id="doctors-dropdown"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute left-0 top-full pt-2 z-50"
                  >
                    <div className="w-72 bg-white rounded-xl shadow-lg border border-slate-200/90 py-2">
                      {DOCTOR_POLI_ITEMS.map((poli) => {
                        const Icon = poli.icon;
                        return (
                          <Link
                            key={poli.href}
                            href={poli.href}
                            onClick={(e) => handleRouteClick(e, poli.href)}
                            className="flex items-start space-x-3 px-4 py-2 hover:bg-slate-50 text-slate-700 hover:text-[#0472B5] transition-colors focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#0472B5]"
                          >
                            <Icon
                              aria-hidden="true"
                              className={`w-4 h-4 shrink-0 mt-0.5 ${poli.iconClassName}`}
                            />
                            <div>
                              <div className="font-semibold text-xs text-slate-900">
                                {poli.title}
                              </div>
                              <div className="text-[11px] text-slate-500">
                                {poli.description}
                              </div>
                            </div>
                          </Link>
                        );
                      })}

                      <div className="mt-1 pt-2 px-4 border-t border-slate-100">
                        <Link
                          href="/dokter-kami"
                          onClick={(e) => handleRouteClick(e, '/dokter-kami')}
                          aria-current={pathname === '/dokter-kami' ? 'page' : undefined}
                          className="block text-[11px] font-semibold text-[#0472B5] hover:underline py-1"
                        >
                          Lihat Halaman Dokter Kami →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dropdown Layanan Kami (gabungan Layanan Medis & Pusat Unggulan) */}
            <div
              ref={dropdownRef}
              className="relative"
              onPointerEnter={(e) => {
                if (e.pointerType !== 'touch') {
                  setServicesDropdownOpen(true);
                  setDoctorsDropdownOpen(false);
                }
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
                onClick={() => {
                  setServicesDropdownOpen((prev) => !prev);
                  setDoctorsDropdownOpen(false);
                }}
                className={`transition-colors flex items-center space-x-1 py-2 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0472B5] rounded-sm ${isServicesRoute
                  ? 'text-[#0472B5] font-semibold underline decoration-2 underline-offset-8'
                  : 'hover:text-[#0472B5]'
                  }`}
              >
                <span>Layanan Kami</span>
                <ChevronDown
                  aria-hidden="true"
                  className={`w-3.5 h-3.5 transition-transform duration-150 ${servicesDropdownOpen ? 'rotate-180 text-[#0472B5]' : 'text-slate-400'
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
                    <div className="w-80 bg-white rounded-xl shadow-lg border border-slate-200/90 py-2">
                      {SERVICE_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isItemActive = pathname === item.href;
                        return (
                          <div
                            key={item.href}
                            className="px-4 py-2 hover:bg-slate-50 transition-colors"
                          >
                            <Link
                              href={item.href}
                              onClick={(e) => handleRouteClick(e, item.href)}
                              aria-current={isItemActive ? 'page' : undefined}
                              className="flex items-start space-x-3 text-slate-700 hover:text-[#0472B5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0472B5] rounded-md"
                            >
                              <Icon
                                aria-hidden="true"
                                className={`w-4 h-4 shrink-0 mt-0.5 ${item.iconClassName}`}
                              />
                              <div>
                                <div className="font-semibold text-xs text-slate-900">
                                  {item.title}
                                </div>
                                <div className="text-[11px] text-slate-500">
                                  {item.description}
                                </div>
                              </div>
                            </Link>

                            {'tiers' in item && item.tiers && (
                              <div className="mt-2 pl-7 flex flex-wrap gap-1.5">
                                {item.tiers.map((tier) => (
                                  <Link
                                    key={tier.href}
                                    href={tier.href}
                                    onClick={() => {
                                      setServicesDropdownOpen(false);
                                      setMobileMenuOpen(false);
                                    }}
                                    className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-[#0472B5] text-slate-700 hover:text-white text-[11px] font-medium transition-colors"
                                  >
                                    {tier.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}

                      <div className="mt-1 pt-2 px-4 border-t border-slate-100">
                        <Link
                          href="/layanan"
                          onClick={(e) => handleRouteClick(e, '/layanan')}
                          aria-current={pathname === '/layanan' ? 'page' : undefined}
                          className="block text-[11px] font-semibold text-[#0472B5] hover:underline py-1"
                        >
                          Lihat Semua Layanan &amp; Pusat Unggulan →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/kalkulator-jantung"
              onClick={(e) => handleRouteClick(e, '/kalkulator-jantung')}
              aria-current={isHeartCalcRoute ? 'page' : undefined}
              className={navLinkClass(isHeartCalcRoute)}
            >
              Kalkulator Jantung
            </Link>

            <Link
              href="/artikel"
              onClick={(e) => handleRouteClick(e, '/artikel')}
              aria-current={isArticleRoute ? 'page' : undefined}
              className={navLinkClass(isArticleRoute)}
            >
              Artikel
            </Link>
          </nav>

          {/* Desktop Action CTAs */}
          <div className="hidden xl:flex items-center space-x-3 shrink-0">
            {/* <Link
              href="/dokter-kami"
              onClick={(e) => handleRouteClick(e, '/dokter-kami')}
              className="p-2 text-slate-500 hover:text-[#0472B5] hover:bg-slate-100 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0472B5]"
              title="Dokter Kami"
              aria-label="Dokter Kami"
            >
              <Search className="w-4 h-4" />
            </Link> */}

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
            {/* <Link
              href="/dokter-kami"
              onClick={(e) => handleRouteClick(e, '/dokter-kami')}
              className="hidden sm:inline-flex p-2 text-slate-500 hover:text-[#0472B5] hover:bg-slate-100 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0472B5]"
              title="Dokter Kami"
              aria-label="Dokter Kami"
            >
              <Search className="w-4 h-4" />
            </Link> */}
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
            <span className="font-semibold text-white">The Vida Building Kebon Jeruk</span>
          </div>
        </div>
      </div>

      {/* 3. MOBILE SLIDE-DOWN DRAWER */}
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
              {/* Group Dokter Kami */}
              <div className="pt-1 pb-1">
                <Link
                  href="/dokter-kami"
                  onClick={(e) => handleRouteClick(e, '/dokter-kami')}
                  aria-current={isDoctorRoute ? 'page' : undefined}
                  className={`block px-3 py-2 rounded-lg transition-colors ${isDoctorRoute
                    ? 'bg-[#0472B5]/10 text-[#0472B5] font-semibold border-l-2 border-[#0472B5]'
                    : 'text-[#0472B5] hover:bg-slate-50'
                    }`}
                >
                  Dokter Kami
                </Link>
                <div className="space-y-1 pl-2 border-l border-slate-200 ml-3 mt-1">
                  {DOCTOR_POLI_ITEMS.map((poli) => (
                    <Link
                      key={poli.href}
                      href={poli.href}
                      onClick={(e) => handleRouteClick(e, poli.href)}
                      className="block px-3 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-slate-50 hover:text-[#0472B5] transition-colors"
                    >
                      {poli.title}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Group Layanan Kami */}
              <div className="pt-2 pb-1">
                <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Layanan Kami
                </div>
                <div className="space-y-1 pl-2 border-l border-slate-200 ml-3">
                  <div className="px-3 py-2 rounded-lg hover:bg-slate-50">
                    <Link
                      href="/layanan/vidaboost"
                      onClick={(e) => handleRouteClick(e, '/layanan/vidaboost')}
                      aria-current={pathname === '/layanan/vidaboost' ? 'page' : undefined}
                      className={`block ${pathname === '/layanan/vidaboost'
                        ? 'text-[#0472B5] font-semibold'
                        : 'text-slate-800'
                        }`}
                    >
                      VidaBoost IV Therapy
                    </Link>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {VIDABOOST_TIERS.map((tier) => (
                        <Link
                          key={tier.href}
                          href={tier.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium hover:bg-[#0472B5] hover:text-white transition-colors"
                        >
                          {tier.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/layanan/vidahealth"
                    onClick={(e) => handleRouteClick(e, '/layanan/vidahealth')}
                    aria-current={pathname === '/layanan/vidahealth' ? 'page' : undefined}
                    className={`block px-3 py-2 rounded-lg transition-colors ${pathname === '/layanan/vidahealth'
                      ? 'bg-[#0472B5]/10 text-[#0472B5] font-semibold'
                      : 'hover:bg-slate-50'
                      }`}
                  >
                    VidaHealth (MCU)
                  </Link>

                  <Link
                    href="/layanan/vidafit"
                    onClick={(e) => handleRouteClick(e, '/layanan/vidafit')}
                    aria-current={pathname === '/layanan/vidafit' ? 'page' : undefined}
                    className={`block px-3 py-2 rounded-lg transition-colors ${pathname === '/layanan/vidafit'
                      ? 'bg-[#0472B5]/10 text-[#0472B5] font-semibold'
                      : 'hover:bg-slate-50'
                      }`}
                  >
                    VidaFit (Gizi &amp; Weight Management)
                  </Link>

                  <Link
                    href="/layanan"
                    onClick={(e) => handleRouteClick(e, '/layanan')}
                    aria-current={pathname === '/layanan' ? 'page' : undefined}
                    className={`block px-3 py-2 rounded-lg text-xs transition-colors ${pathname === '/layanan'
                      ? 'bg-[#0472B5]/10 text-[#0472B5] font-semibold'
                      : 'text-[#0472B5] hover:bg-slate-50'
                      }`}
                  >
                    Semua Layanan &amp; Pusat Unggulan →
                  </Link>
                </div>
              </div>

              <Link
                href="/kalkulator-jantung"
                onClick={(e) => handleRouteClick(e, '/kalkulator-jantung')}
                aria-current={isHeartCalcRoute ? 'page' : undefined}
                className={`block px-3 py-2 rounded-lg transition-colors ${isHeartCalcRoute
                  ? 'bg-[#0472B5]/10 text-[#0472B5] font-semibold border-l-2 border-[#0472B5]'
                  : 'text-rose-700 hover:bg-slate-50'
                  }`}
              >
                Kalkulator Risiko Jantung
              </Link>

              <Link
                href="/artikel"
                onClick={(e) => handleRouteClick(e, '/artikel')}
                aria-current={isArticleRoute ? 'page' : undefined}
                className={`block px-3 py-2 rounded-lg transition-colors ${isArticleRoute
                  ? 'bg-[#0472B5]/10 text-[#0472B5] font-semibold border-l-2 border-[#0472B5]'
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
