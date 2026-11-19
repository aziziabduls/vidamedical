'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingChat from '@/components/FloatingChat';
import BookingModal from '@/components/BookingModal';

interface BookingContextValue {
  openBooking: (category?: string, option?: string) => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return ctx;
}

function normalizeCategory(category?: string): string {
  if (!category) return 'vidaboost';
  const lowered = category.toLowerCase();
  if (lowered === 'mcu') return 'vidahealth';
  if (lowered === 'doctor' || lowered === 'coe' || lowered === 'popular' || lowered === 'story') {
    return 'vidafit';
  }
  return lowered;
}

export default function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState<string>('vidaboost');
  const [modalOption, setModalOption] = useState<string>('VidaBoost Gold');

  const openBooking = useCallback((category?: string, option?: string) => {
    if (category) {
      setModalCategory(normalizeCategory(category));
    }
    if (option) {
      setModalOption(option);
    }
    setIsModalOpen(true);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <BookingContext.Provider value={{ openBooking }}>
        <div className="min-h-screen flex flex-col bg-[#F6F9FC] text-[#0B2545] font-sans selection:bg-[#0472B5] selection:text-white">
          <Navbar onOpenBooking={openBooking} />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
          <FloatingChat onOpenBooking={() => openBooking('vidaboost', 'VidaBoost Gold')} />
          <BookingModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            initialCategory={modalCategory}
            initialOption={modalOption}
          />
        </div>
      </BookingContext.Provider>
    </MotionConfig>
  );
}
