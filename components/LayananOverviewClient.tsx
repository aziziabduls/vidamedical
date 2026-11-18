'use client';

import React from 'react';
import Link from 'next/link';
import { Activity, ArrowRight, Sparkles, Stethoscope } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import PageShell from '@/components/PageShell';
import CentersOfExcellence from '@/components/CentersOfExcellence';
import ComprehensiveServices from '@/components/ComprehensiveServices';
import type { ApiServicePackage } from '@/lib/api-client';

const FLAGSHIP_CARDS = [
  {
    href: '/layanan/vidaboost',
    title: 'VidaBoost IV Therapy',
    subtitle: 'Silver · Gold · Platinum · Diamond',
    description:
      'Lounge infus vitamin dan mikronutrien resmi BPOM untuk rehidrasi seluler, imunitas, dan pemulihan stamina.',
    icon: Sparkles,
    accentClass: 'text-amber-600 bg-amber-50',
  },
  {
    href: '/layanan/vidahealth',
    title: 'VidaHealth MCU',
    subtitle: 'Skrining Preventif & Bonus InBody',
    description:
      'Paket pemeriksaan medis berkala untuk evaluasi organ vital, profil metabolik, dan deteksi dini risiko jantung.',
    icon: Stethoscope,
    accentClass: 'text-[#0472B5] bg-[#0472B5]/10',
  },
  {
    href: '/layanan/vidafit',
    title: 'VidaFit Weight Management',
    subtitle: 'Dokter Spesialis Gizi Klinis (Sp.GK)',
    description:
      'Program manajemen berat badan ilmiah dengan pemindaian InBody 770, meal plan personal, dan pemantauan medis.',
    icon: Activity,
    accentClass: 'text-teal-700 bg-teal-50',
  },
] as const;

export default function LayananOverviewClient({
  services,
}: {
  services?: ApiServicePackage[];
}) {
  return (
    <PageShell defaultBookingCategory="vidaboost" defaultBookingOption="VidaBoost Gold">
      {(openBooking) => (
        <>
          <PageHeader
            breadcrumbs={[
              { label: 'Beranda', href: '/' },
              { label: 'Layanan Kami' },
            ]}
            eyebrow="Layanan Medis & Kebugaran Terintegrasi"
            eyebrowIcon={<Stethoscope className="w-3.5 h-3.5 text-[#0472B5]" strokeWidth={1.5} />}
            title="Layanan Medis & Pusat Unggulan Vida"
            description="Layanan kesehatan terintegrasi di Gedung The Vida, mulai dari infus mikronutrien VidaBoost, Medical Check Up VidaHealth, manajemen berat badan VidaFit, hingga delapan pusat layanan unggulan."
          >
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
              {FLAGSHIP_CARDS.map((card) => {
                const Icon = card.icon;
                return (
                  <Link
                    key={card.href}
                    href={card.href}
                    className="group bg-slate-50/80 hover:bg-white rounded-2xl border border-slate-200 hover:border-[#0472B5] p-6 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.accentClass}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="text-[11px] font-semibold text-[#0472B5] mt-4">
                        {card.subtitle}
                      </div>
                      <h2 className="text-lg font-bold text-slate-900 mt-1 group-hover:text-[#0472B5] transition-colors">
                        {card.title}
                      </h2>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                    <div className="mt-5 pt-4 border-t border-slate-200/80 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0472B5]">
                      <span>Lihat Detail Layanan</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </PageHeader>

          <CentersOfExcellence onOpenBooking={openBooking} services={services} />
          <ComprehensiveServices
            services={services}
            onSelectService={(cat, opt) => openBooking(cat, opt)}
          />
        </>
      )}
    </PageShell>
  );
}
