'use client';

import React from 'react';
import Link from 'next/link';
import { Scale } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import PageShell from '@/components/PageShell';
import VidaFitSection from '@/components/VidaFitSection';

export default function VidaFitPageClient() {
  return (
    <PageShell
      defaultBookingCategory="vidafit"
      defaultBookingOption="Program Evaluasi VidaFit (Dokter Sp.GK)"
    >
      {(openBooking) => (
        <>
          <PageHeader
            breadcrumbs={[
              { label: 'Beranda', href: '/' },
              { label: 'Layanan Kami', href: '/layanan' },
              { label: 'VidaFit' },
            ]}
            eyebrow="Manajemen Berat Badan Medis"
            eyebrowIcon={<Scale className="w-3.5 h-3.5 text-[#0472B5]" strokeWidth={1.5} />}
            title="VidaFit: Penurunan Berat Badan Bersama Dokter Gizi Klinis"
            description="Program penurunan berat badan ilmiah bersama Dokter Spesialis Gizi Klinis (Sp.GK) dengan pemetaan InBody 770 untuk menurunkan lemak tubuh sambil menjaga massa otot."
            aside={
              <div className="flex items-center gap-2 text-xs">
                <Link
                  href="/layanan/vidaboost"
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-medium transition-colors"
                >
                  VidaBoost
                </Link>
                <Link
                  href="/layanan/vidahealth"
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-medium transition-colors"
                >
                  VidaHealth
                </Link>
              </div>
            }
          />

          <VidaFitSection showHeader={false} onOpenBooking={openBooking} />
        </>
      )}
    </PageShell>
  );
}
