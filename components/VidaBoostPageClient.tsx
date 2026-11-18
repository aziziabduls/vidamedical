'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import PageShell from '@/components/PageShell';
import VidaBoostSection from '@/components/VidaBoostSection';
import { VIDA_BOOST_TIERS, type IVTier } from '@/lib/clinic-rules';

function VidaBoostInner({
  tiers,
  onSelectTier,
}: {
  tiers: IVTier[];
  onSelectTier: (tierName: string) => void;
}) {
  const searchParams = useSearchParams();
  const tierParam = searchParams.get('tier')?.toLowerCase() ?? undefined;

  return (
    <VidaBoostSection
      initialTierId={tierParam}
      showHeader={false}
      tiers={tiers}
      onSelectTier={onSelectTier}
    />
  );
}

export default function VidaBoostPageClient({
  tiers = VIDA_BOOST_TIERS,
}: {
  tiers?: IVTier[];
}) {
  return (
    <PageShell defaultBookingCategory="vidaboost" defaultBookingOption="VidaBoost Gold">
      {(openBooking) => (
        <>
          <PageHeader
            breadcrumbs={[
              { label: 'Beranda', href: '/' },
              { label: 'Layanan Kami', href: '/layanan' },
              { label: 'VidaBoost' },
            ]}
            eyebrow="Infus Vitamin & Terapi Intravena"
            eyebrowIcon={<Sparkles className="w-3.5 h-3.5 text-[#0472B5]" strokeWidth={1.5} />}
            title="VidaBoost: Terapi Mikronutrien & Hidrasi"
            description="Hantaran multivitamin esensial dan antioksidan murni langsung ke aliran darah. Tersedia empat pilihan formula resmi BPOM: Silver, Gold, Platinum, dan Diamond."
            aside={
              <div className="flex items-center gap-2 text-xs">
                <Link
                  href="/layanan/vidahealth"
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-medium transition-colors"
                >
                  VidaHealth
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

          <Suspense
            fallback={
              <VidaBoostSection
                showHeader={false}
                tiers={tiers}
                onSelectTier={(tierName) => openBooking('vidaboost', tierName)}
              />
            }
          >
            <VidaBoostInner
              tiers={tiers}
              onSelectTier={(tierName) => openBooking('vidaboost', tierName)}
            />
          </Suspense>
        </>
      )}
    </PageShell>
  );
}
