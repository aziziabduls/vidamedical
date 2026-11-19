'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  ChevronDown,
  Menu,
  X,
  Syringe,
  Stethoscope,
  Droplets,
  Home,
  LayoutGrid,
} from 'lucide-react';
import VidaLogo from '@/components/VidaLogo';
import { CLINIC_CONTACT } from '@/lib/clinic-data';
import { dropdownVariants, TRANSITIONS } from '@/lib/motion';

interface NavbarProps {
  onOpenBooking: (category?: string, service?: string) => void;
}

const SERVICE_MENU_ITEMS = [
  {
    href: '/layanan',
    title: 'Semua Layanan',
    description: 'Ringkasan layanan medis & wellness',
    icon: LayoutGrid,
  },
  {
    href: '/layanan/vaksinasi',
    title: 'Vaksinasi',
    description: 'Imunisasi influenza, HPV, pneumonia & dewasa',
    icon: Syringe,
  },
  {
    href: '/layanan/medical-check-up',
    title: 'Medical Check Up',
    description: 'Skrining organ vital + gratis tes InBody',
    icon: Stethoscope,
  },
  {
    href: '/layanan/vitamin-booster',
    title: 'Vitamin Booster',
    description: 'Infus mikronutrien VidaBoost resmi BPOM',
    icon: Droplets,
  },
  {
    href: '/layanan/home-care',
    title: 'Home Care',
    description: 'Perawat luka, infus & dokter datang ke rumah',
    icon: Home,
  },
] as const;

const MAIN_NAV_LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/tentang-kami', label: 'Tentang Kami' },
  // Layanan rendered with dropdown between Tentang Kami and Promo
  { href: '/promo', label: 'Promo' },
  { href: '/kontak', label: 'Kontak' },
] as const;

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const pathname = usePathname() ?? '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(true);

  const headerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isLayananActive = pathname === '/layanan' || pathname.startsWith('/layanan/');

  const isRouteActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

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

  const closeMenus = () => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={closeMenus}
            aria-label="Beranda Vida Medical Centre"
            className="shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0472B5]"
          >
            <VidaLogo variant="dark" />
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Navigasi utama" className="hidden lg:flex items-center gap-8 text-sm">
            {MAIN_NAV_LINKS.slice(0, 2).map((item) => {
              const active = isRouteActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative py-2 font-medium transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0472B5] rounded-sm ${
                    active ? 'text-[#0472B5]' : 'text-slate-600 hover:text-[#0B2545]'
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <motion.span
                      layoutId="navbar-active-underline"
                      transition={TRANSITIONS.spring}
                      className="absolute inset-x-0 -bottom-[1px] h-[2px] rounded-full bg-[#0472B5]"
                    />
                  )}
                </Link>
              );
            })}

            {/* Layanan Dropdown */}
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
                aria-controls="layanan-dropdown"
                onClick={() => setServicesDropdownOpen((prev) => !prev)}
                className={`relative py-2 flex items-center gap-1.5 font-medium transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0472B5] rounded-sm ${
                  isLayananActive ? 'text-[#0472B5]' : 'text-slate-600 hover:text-[#0B2545]'
                }`}
              >
                <span>Layanan</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-150 ${
                    servicesDropdownOpen ? 'rotate-180 text-[#0472B5]' : 'text-slate-400'
                  }`}
                  strokeWidth={1.5}
                />
                {isLayananActive && (
                  <motion.span
                    layoutId="navbar-active-underline"
                    transition={TRANSITIONS.spring}
                    className="absolute inset-x-0 -bottom-[1px] h-[2px] rounded-full bg-[#0472B5]"
                  />
                )}
              </button>

              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div
                    id="layanan-dropdown"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute left-0 top-full pt-2.5 z-50"
                  >
                    <div className="w-76 bg-white rounded-2xl shadow-[0_12px_32px_rgba(11,37,69,0.08)] border border-slate-200/90 p-2">
                      {SERVICE_MENU_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const active =
                          item.href === '/layanan'
                            ? pathname === '/layanan'
                            : pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={closeMenus}
                            className={`flex items-start gap-3 px-3 py-2.5 rounded-xl transition-colors focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#0472B5] ${
                              active
                                ? 'bg-[#EBF4FB] text-[#0472B5]'
                                : 'text-[#0B2545] hover:bg-slate-50'
                            }`}
                          >
                            <span
                              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                                active
                                  ? 'bg-[#0472B5] text-white'
                                  : 'bg-[#EBF4FB] text-[#0472B5]'
                              }`}
                            >
                              <Icon className="w-4 h-4" strokeWidth={1.5} />
                            </span>
                            <div>
                              <div className="text-sm font-medium leading-snug">{item.title}</div>
                              <div className="text-xs text-slate-500 mt-0.5 leading-snug">
                                {item.description}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {MAIN_NAV_LINKS.slice(2).map((item) => {
              const active = isRouteActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative py-2 font-medium transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0472B5] rounded-sm ${
                    active ? 'text-[#0472B5]' : 'text-slate-600 hover:text-[#0B2545]'
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <motion.span
                      layoutId="navbar-active-underline"
                      transition={TRANSITIONS.spring}
                      className="absolute inset-x-0 -bottom-[1px] h-[2px] rounded-full bg-[#0472B5]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center shrink-0">
            <motion.button
              whileTap={{ scale: 0.98 }}
              transition={TRANSITIONS.fast}
              type="button"
              onClick={() => onOpenBooking('vidaboost', 'VidaBoost Gold')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0472B5] hover:bg-[#035c93] text-white font-medium text-sm shadow-xs transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0472B5]"
            >
              <Calendar className="w-4 h-4" strokeWidth={1.5} />
              <span>Buat Janji</span>
            </motion.button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 lg:hidden shrink-0">
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => onOpenBooking('vidaboost', 'VidaBoost Gold')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#0472B5] hover:bg-[#035c93] text-white font-medium text-xs transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>Buat Janji</span>
            </motion.button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0472B5]"
              aria-label="Navigasi menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" strokeWidth={1.5} />
              ) : (
                <Menu className="w-5 h-5" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={TRANSITIONS.fast}
            className="lg:hidden absolute inset-x-0 top-full bg-white border-b border-slate-200 shadow-lg px-4 pt-3 pb-6 space-y-4 max-h-[calc(100dvh-var(--navbar-height,4.5rem))] overflow-y-auto z-40"
          >
            <nav aria-label="Navigasi seluler" className="space-y-1 text-sm font-medium">
              <Link
                href="/"
                onClick={closeMenus}
                className={`block px-3 py-2.5 rounded-lg transition-colors ${
                  pathname === '/'
                    ? 'bg-[#EBF4FB] text-[#0472B5]'
                    : 'text-[#0B2545] hover:bg-slate-50'
                }`}
              >
                Beranda
              </Link>

              <Link
                href="/tentang-kami"
                onClick={closeMenus}
                className={`block px-3 py-2.5 rounded-lg transition-colors ${
                  isRouteActive('/tentang-kami')
                    ? 'bg-[#EBF4FB] text-[#0472B5]'
                    : 'text-[#0B2545] hover:bg-slate-50'
                }`}
              >
                Tentang Kami
              </Link>

              <div>
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((prev) => !prev)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                    isLayananActive
                      ? 'bg-[#EBF4FB] text-[#0472B5]'
                      : 'text-[#0B2545] hover:bg-slate-50'
                  }`}
                >
                  <span>Layanan</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-150 ${
                      mobileServicesOpen ? 'rotate-180' : ''
                    }`}
                    strokeWidth={1.5}
                  />
                </button>

                {mobileServicesOpen && (
                  <div className="mt-1 pl-4 space-y-1 border-l border-slate-200 ml-3">
                    {SERVICE_MENU_ITEMS.map((item) => {
                      const active =
                        item.href === '/layanan'
                          ? pathname === '/layanan'
                          : pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeMenus}
                          className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                            active
                              ? 'text-[#0472B5] font-medium bg-[#EBF4FB]/60'
                              : 'text-slate-600 hover:bg-slate-50 hover:text-[#0B2545]'
                          }`}
                        >
                          {item.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Link
                href="/promo"
                onClick={closeMenus}
                className={`block px-3 py-2.5 rounded-lg transition-colors ${
                  isRouteActive('/promo')
                    ? 'bg-[#EBF4FB] text-[#0472B5]'
                    : 'text-[#0B2545] hover:bg-slate-50'
                }`}
              >
                Promo
              </Link>

              <Link
                href="/kontak"
                onClick={closeMenus}
                className={`block px-3 py-2.5 rounded-lg transition-colors ${
                  isRouteActive('/kontak')
                    ? 'bg-[#EBF4FB] text-[#0472B5]'
                    : 'text-[#0B2545] hover:bg-slate-50'
                }`}
              >
                Kontak
              </Link>
            </nav>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 px-1">
              <span>WhatsApp Klinik</span>
              <a
                href={CLINIC_CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono tabular-nums font-medium text-[#0472B5]"
              >
                {CLINIC_CONTACT.whatsappNumberDisplay}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
