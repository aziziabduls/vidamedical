'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import VidaStats from '@/components/VidaStats';
import CentersOfExcellence from '@/components/CentersOfExcellence';
import ComprehensiveServices from '@/components/ComprehensiveServices';
import HeartRiskCalculator from '@/components/HeartRiskCalculator';
import PatientStorySection from '@/components/PatientStorySection';
import VidaAppSection from '@/components/VidaAppSection';
import HealthpediaSection from '@/components/HealthpediaSection';
import Footer from '@/components/Footer';
import FloatingChat from '@/components/FloatingChat';
import BookingModal from '@/components/BookingModal';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState<string>('vidaboost');
  const [modalOption, setModalOption] = useState<string>('VidaBoost Gold');

  const openBooking = (category?: string, option?: string) => {
    if (category) {
      // Map category alias if needed
      if (category === 'mcu') setModalCategory('vidahealth');
      else if (category === 'doctor' || category === 'coe' || category === 'popular' || category === 'story') {
        setModalCategory('vidafit');
      } else {
        setModalCategory(category);
      }
    }
    if (option) setModalOption(option);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 font-sans selection:bg-[#ffcf00] selection:text-[#0472B5]">
      {/* 1. Header Navbar (Top Utility + Main Nav + Emergency Hotline) */}
      <Navbar onOpenBooking={openBooking} />

      {/* Main Content Sections Flow */}
      <main className="flex-1">
        {/* 2. Hero Section dengan Interactive Doctor Search Widget & 6 Quick Access Pills */}
        <HeroSection onOpenBooking={openBooking} />

        {/* 3. Statistics Counter Jaringan Vida Medical Centre di Gedung The Vida */}
        {/* <VidaStats /> */}

        {/* 4. Centers of Excellence (8 Pilar Layanan Unggulan Vida) */}
        <CentersOfExcellence onOpenBooking={openBooking} />

        {/* 5. Solusi Layanan Menyeluruh (VidaBoost, VidaHealth MCU, Homecare, Lab) */}
        <ComprehensiveServices onSelectService={(cat, opt) => openBooking(cat, opt)} />

        {/* 6. Kalkulator Risiko Jantung Interaktif (10-Year Cardiovascular Risk) */}
        <HeartRiskCalculator onOpenBooking={openBooking} />

        {/* 7. Kisah Inspiratif Pasien (#BersamaVida) */}
        {/* <PatientStorySection onOpenBooking={openBooking} /> */}

        {/* 8. MyVida Patient Portal & Digital Health App Showcase */}
        <VidaAppSection />

        {/* 9. Healthpedia: Edukasi & Artikel Kesehatan Terverifikasi Dokter */}
        <HealthpediaSection onOpenBooking={openBooking} />
      </main>

      {/* 10. Mega Footer */}
      <Footer />

      {/* 11. Floating Action Chat Button */}
      <FloatingChat onOpenBooking={() => openBooking('vidaboost', 'VidaBoost Gold')} />

      {/* 12. Modal Reservasi Janji Temu */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialCategory={modalCategory}
        initialOption={modalOption}
      />
    </div>
  );
}
