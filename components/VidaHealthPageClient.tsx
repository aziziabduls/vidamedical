'use client';

import React from 'react';
import Link from 'next/link';
import { Stethoscope } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import PageShell from '@/components/PageShell';
import VidaHealthSection from '@/components/VidaHealthSection';
import { VIDA_HEALTH_PACKAGES, type MCUPackage } from '@/lib/clinic-rules';

export default function VidaHealthPageClient({
  packages = VIDA_HEALTH_PACKAGES,
}: {
  packages?: MCUPackage[];
}) {
  return (
    <PageShell defaultBookingCategory="vidahealth" defaultBookingOption="VidaHealth Comprehensive">
      {(openBooking) => (
        <>
          <PageHeader
            breadcrumbs={[
              { label: 'Beranda', href: '/' },
              { label: 'Layanan Kami', href: '/layanan' },
              { label: 'VidaHealth' },
            ]}
            eyebrow="Pemeriksaan Medis Berkala (MCU)"
            eyebrowIcon={<Stethoscope className="w-3.5 h-3.5 text-[#0472B5]" strokeWidth={1.5} />}
            title="VidaHealth: Evaluasi Klinis Organ Vital & Metabolisme"
            description="Deteksi dini faktor risiko kardiovaskular, diabetes, ginjal, dan sindrom metabolik. Setiap paket sudah mencakup pemeriksaan dokter, tes visus mata, uji darah lengkap, dan bonus InBody."
            aside={
              <div className="flex items-center gap-2 text-xs">
                <Link
                  href="/layanan/vidaboost"
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-medium transition-colors"
                >
                  VidaBoost
                </Link>
                <Link
                  href="/layanan/vidafit"
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-medium transition-colors"
                >
                  VidaFit
                </Link>
              </div>
            }
          />

          <VidaHealthSection
            showHeader={false}
            packages={packages}
            onSelectPackage={(packageName) => openBooking('vidahealth', packageName)}
          />
        </>
      )}
    </PageShell>
  );
}
