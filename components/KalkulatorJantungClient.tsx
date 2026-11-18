'use client';

import React from 'react';
import { HeartPulse } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import PageShell from '@/components/PageShell';
import HeartRiskCalculator from '@/components/HeartRiskCalculator';

export default function KalkulatorJantungClient() {
  return (
    <PageShell
      defaultBookingCategory="vidafit"
      defaultBookingOption="Konsultasi Spesialis Jantung"
    >
      {(openBooking) => (
        <>
          <PageHeader
            breadcrumbs={[
              { label: 'Beranda', href: '/' },
              { label: 'Kalkulator Jantung' },
            ]}
            eyebrow="Skrining Klinis Mandiri"
            eyebrowIcon={<HeartPulse className="w-3.5 h-3.5 text-[#0472B5]" strokeWidth={1.5} />}
            title="Kalkulator Risiko Jantung 10 Tahun"
            description="Estimasi risiko kardiovaskular berdasarkan usia, tekanan darah sistolik, profil kolesterol, indeks massa tubuh, dan faktor risiko gaya hidup."
          />

          <HeartRiskCalculator showHeader={false} onOpenBooking={openBooking} />
        </>
      )}
    </PageShell>
  );
}
