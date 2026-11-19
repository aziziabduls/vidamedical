'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '@/lib/clinic-data';
import { EASE_OUT, TRANSITIONS } from '@/lib/motion';

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const slide = HERO_SLIDES[activeIndex];

  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused, shouldReduceMotion]);

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Layanan utama Vida Medical Centre"
      className="bg-white border-b border-slate-200/70"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="relative w-full min-h-[480px] sm:min-h-[540px] lg:min-h-[560px] overflow-hidden bg-[#EBF4FB]">
        {/* Background Slide Photography */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0.25, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0.25 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: EASE_OUT }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt={slide.imageAlt}
              fill
              priority={activeIndex === 0}
              sizes="100vw"
              className="object-cover object-center md:object-right"
            />
          </motion.div>
        </AnimatePresence>

        {/* Calm left-side sky-tinted readability veil (keeps subject clear on right) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#EBF4FB]/95 via-[#EBF4FB]/88 to-[#EBF4FB]/45 md:bg-gradient-to-r md:from-[#EBF4FB]/98 md:via-[#EBF4FB]/86 md:to-transparent"
        />

        {/* Foreground Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-12 sm:px-14 lg:px-16 min-h-[480px] sm:min-h-[540px] lg:min-h-[560px] flex items-center py-12 sm:py-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
              transition={shouldReduceMotion ? { duration: 0 } : TRANSITIONS.enter}
              className="max-w-xl space-y-5"
            >
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-semibold text-[#0B2545] tracking-[-0.025em] leading-[1.08] whitespace-pre-line">
                {slide.headline}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-md font-normal">
                {slide.subheadline}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <motion.div whileTap={{ scale: 0.98 }} transition={TRANSITIONS.fast}>
                  <Link
                    href={slide.primaryCtaHref}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0472B5] hover:bg-[#035c93] text-white font-medium text-sm shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0472B5]"
                  >
                    <span>{slide.primaryCtaLabel}</span>
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </Link>
                </motion.div>

                <motion.div whileTap={{ scale: 0.98 }} transition={TRANSITIONS.fast}>
                  <Link
                    href={slide.secondaryCtaHref}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/95 hover:bg-white text-[#0472B5] border border-[#0472B5]/35 font-medium text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0472B5]"
                  >
                    {slide.secondaryCtaLabel}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Left / Right Controls */}
        <button
          type="button"
          onClick={goPrev}
          aria-label="Slide sebelumnya"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white border border-slate-200/80 text-slate-600 hover:text-[#0472B5] shadow-xs flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0472B5]"
        >
          <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
        </button>

        <button
          type="button"
          onClick={goNext}
          aria-label="Slide berikutnya"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white border border-slate-200/80 text-slate-600 hover:text-[#0472B5] shadow-xs flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0472B5]"
        >
          <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="bg-[#F6F9FC] py-4 flex items-center justify-center gap-2">
        {HERO_SLIDES.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Tampilkan slide ${idx + 1}: ${item.headline.replace('\n', ' ')}`}
              aria-current={isActive ? 'true' : undefined}
              className="p-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0472B5] rounded-full"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${
                  isActive ? 'w-5 bg-[#0472B5]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
