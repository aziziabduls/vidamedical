'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedServices from '@/components/FeaturedServices';
import VidaBoostSection from '@/components/VidaBoostSection';
import VidaHealthSection from '@/components/VidaHealthSection';
import VidaFitSection from '@/components/VidaFitSection';
import HomecareSection from '@/components/HomecareSection';
import VaccinationSection from '@/components/VaccinationSection';
import LocationContactSection from '@/components/LocationContactSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState<string>('vidaboost');
  const [modalOption, setModalOption] = useState<string>('VidaBoost Gold');

  const openBooking = (category?: string, option?: string) => {
    if (category) setModalCategory(category);
    if (option) setModalOption(option);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Navbar */}
      <Navbar onOpenBooking={() => openBooking('vidaboost', 'VidaBoost Gold')} />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection onOpenBooking={() => openBooking('vidaboost', 'VidaBoost Gold')} />

        {/* 2. Overview of 5 Featured Clinical Pillars */}
        <FeaturedServices onSelectService={(cat, opt) => openBooking(cat, opt)} />

        {/* 3. VidaBoost: Infus Vitamin & IV Therapy */}
        <VidaBoostSection onSelectTier={(tier) => openBooking('vidaboost', tier)} />

        {/* 4. VidaHealth Package: MCU + Bonus Body Composition InBody */}
        <VidaHealthSection onSelectPackage={(pkg) => openBooking('vidahealth', pkg)} />

        {/* 5. VidaFit: Weight Loss by Clinical Nutrition Specialist + Interactive BMI Calc */}
        <VidaFitSection onOpenBooking={(cat, opt) => openBooking(cat, opt)} />

        {/* 6. Layanan Homecare: Wound Care, NGT, Kateter Urin, Infus ke Rumah */}
        <HomecareSection onSelectHomecareService={(srv) => openBooking('homecare', srv)} />

        {/* 7. Vaksinasi: VidaShield Influenza Quadrivalent, HPV, dsb */}
        <VaccinationSection onSelectVaccine={(vac) => openBooking('vaksinasi', vac)} />

        {/* 8. Lokasi di Gedung The Vida, Jam Layanan, & WhatsApp Contact */}
        <LocationContactSection />

        {/* 9. Pertanyaan Pasien (FAQ) */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Reservation Wizard Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialCategory={modalCategory}
        initialOption={modalOption}
      />
    </div>
  );
}
