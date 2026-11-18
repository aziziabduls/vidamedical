'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PromoHighlightSection from '@/components/PromoHighlightSection';
import HealthpediaSection from '@/components/HealthpediaSection';
import Footer from '@/components/Footer';
import FloatingChat from '@/components/FloatingChat';
import BookingModal from '@/components/BookingModal';
import type { ApiDoctor, PromoBannerItem } from '@/lib/api-client';
import type { HealthpediaArticle } from '@/lib/healthpedia-articles';

interface HomePageClientProps {
  promos: PromoBannerItem[];
  articles: HealthpediaArticle[];
  categories: string[];
  doctors: ApiDoctor[];
}

export default function HomePageClient({
  promos,
  articles,
  categories,
  doctors,
}: HomePageClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState<string>('vidaboost');
  const [modalOption, setModalOption] = useState<string>('VidaBoost Gold');

  const openBooking = (category?: string, option?: string) => {
    if (category) {
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
      <Navbar onOpenBooking={openBooking} />

      <main className="flex-1">
        <HeroSection onOpenBooking={openBooking} doctors={doctors} />
        <PromoHighlightSection promos={promos} />
        <HealthpediaSection
          onOpenBooking={openBooking}
          articles={articles}
          categories={categories}
        />
      </main>

      <Footer />

      <FloatingChat onOpenBooking={() => openBooking('vidaboost', 'VidaBoost Gold')} />

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialCategory={modalCategory}
        initialOption={modalOption}
      />
    </div>
  );
}
