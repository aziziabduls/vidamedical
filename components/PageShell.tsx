'use client';

import React, { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingChat from '@/components/FloatingChat';
import BookingModal from '@/components/BookingModal';

interface PageShellProps {
  children: (openBooking: (category?: string, option?: string) => void) => React.ReactNode;
  defaultBookingCategory?: string;
  defaultBookingOption?: string;
}

export default function PageShell({
  children,
  defaultBookingCategory = 'vidaboost',
  defaultBookingOption = 'VidaBoost Gold',
}: PageShellProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState<string>(defaultBookingCategory);
  const [modalOption, setModalOption] = useState<string>(defaultBookingOption);

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
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 font-sans selection:bg-[#0472B5] selection:text-white">
        <Navbar onOpenBooking={openBooking} />

        <main className="flex-1">{children(openBooking)}</main>

        <Footer />

        <FloatingChat onOpenBooking={() => openBooking(defaultBookingCategory, defaultBookingOption)} />

        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialCategory={modalCategory}
          initialOption={modalOption}
        />
      </div>
    </MotionConfig>
  );
}
