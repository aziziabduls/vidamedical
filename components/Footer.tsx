'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle, Instagram } from 'lucide-react';
import VidaLogo from '@/components/VidaLogo';
import { CLINIC_CONTACT, CORE_SERVICES } from '@/lib/clinic-data';

const EXPLORE_LINKS = [
  { label: 'Beranda', href: '/' },
  { label: 'Tentang Kami', href: '/tentang-kami' },
  { label: 'Promo', href: '/promo' },
  { label: 'Kontak', href: '/kontak' },
  { label: 'Artikel Medis', href: '/artikel' },
] as const;

export default function Footer() {
  return (
    <footer className="bg-[#092B4F] text-sky-100/80 font-sans border-t border-[#0472B5]/30 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-white/12">
          {/* Brand Lockup & Tagline */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row sm:items-center gap-5">
            <Link
              href="/"
              className="shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white rounded-md w-fit"
            >
              <VidaLogo variant="light" />
            </Link>

            <div className="hidden sm:block w-px h-12 bg-white/15 shrink-0" aria-hidden="true" />

            <p className="text-sm text-sky-100/85 leading-relaxed max-w-xs">
              {CLINIC_CONTACT.shortTagline}
            </p>
          </div>

          {/* Jelajahi */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-medium text-white">Jelajahi</h4>
            <ul className="space-y-2 text-sm">
              {EXPLORE_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sky-100/80 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Layanan */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-medium text-white">Layanan</h4>
            <ul className="space-y-2 text-sm">
              {CORE_SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    href={service.href}
                    className="text-sky-100/80 hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hubungi Kami */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-medium text-white">Hubungi Kami</h4>
            <div className="space-y-3 text-sm">
              <a
                href={CLINIC_CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sky-100/90 hover:text-white transition-colors group"
              >
                <span className="w-8 h-8 rounded-full border border-white/25 flex items-center justify-center shrink-0 group-hover:border-white/50 transition-colors">
                  <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                </span>
                <span className="font-mono tabular-nums font-medium">
                  {CLINIC_CONTACT.whatsappNumberDisplay}
                </span>
              </a>

              <a
                href={CLINIC_CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sky-100/90 hover:text-white transition-colors group"
              >
                <span className="w-8 h-8 rounded-full border border-white/25 flex items-center justify-center shrink-0 group-hover:border-white/50 transition-colors">
                  <Instagram className="w-4 h-4" strokeWidth={1.5} />
                </span>
                <span>{CLINIC_CONTACT.instagramHandle}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 text-center text-xs text-sky-100/70">
          © 2026 Vida Medical Centre
        </div>
      </div>
    </footer>
  );
}
