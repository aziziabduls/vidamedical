'use client';

import React from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/PageHeader';
import CTABanner from '@/components/CTABanner';
import VaccinationSection from '@/components/VaccinationSection';
import VidaHealthSection from '@/components/VidaHealthSection';
import VidaBoostSection from '@/components/VidaBoostSection';
import HomecareSection from '@/components/HomecareSection';
import { useBooking } from '@/components/BookingProvider';
import { CORE_SERVICES, type ServiceSummaryItem } from '@/lib/clinic-data';
import { TRANSITIONS } from '@/lib/motion';

interface ServiceDetailShellProps {
  serviceId: ServiceSummaryItem['id'];
}

export default function ServiceDetailShell({ serviceId }: ServiceDetailShellProps) {
  const { openBooking } = useBooking();
  const service = CORE_SERVICES.find((item) => item.id === serviceId) ?? CORE_SERVICES[0];

  return (
    <main className="flex-1 bg-[#F6F9FC]">
      <PageHeader
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Layanan', href: '/layanan' },
          { label: service.title },
        ]}
        eyebrow="Layanan medis"
        title={service.title}
        description={service.description}
        actions={
          <motion.button
            whileTap={{ scale: 0.98 }}
            transition={TRANSITIONS.fast}
            type="button"
            onClick={() => openBooking(service.bookingCategory, service.bookingOption)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0472B5] hover:bg-[#035c93] text-white font-medium text-sm shadow-xs transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4" strokeWidth={1.5} />
            <span>Buat Janji {service.title}</span>
          </motion.button>
        }
      />

      {serviceId === 'vaksinasi' && (
        <VaccinationSection
          onSelectVaccine={(vaccineName) => openBooking('vaksinasi', vaccineName)}
        />
      )}

      {serviceId === 'medical-check-up' && (
        <VidaHealthSection
          onSelectPackage={(pkgName) => openBooking('vidahealth', pkgName)}
        />
      )}

      {serviceId === 'vitamin-booster' && (
        <VidaBoostSection
          onSelectTier={(tierName) => openBooking('vidaboost', tierName)}
        />
      )}

      {serviceId === 'home-care' && (
        <HomecareSection
          onSelectHomecareService={(svcTitle) => openBooking('homecare', svcTitle)}
        />
      )}

      <CTABanner />
    </main>
  );
}
