import React from 'react';
import HeroCarousel from '@/components/HeroCarousel';
import ServicesShowcase from '@/components/ServicesShowcase';
import CTABanner from '@/components/CTABanner';

export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroCarousel />
      <ServicesShowcase />
      <CTABanner />
    </main>
  );
}
