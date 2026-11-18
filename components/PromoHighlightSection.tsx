'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
import { FALLBACK_PROMOS, type PromoBannerItem } from '@/lib/api-client';

export type PromoHighlightItem = PromoBannerItem;

interface PromoHighlightSectionProps {
  promos?: PromoBannerItem[];
}

export default function PromoHighlightSection({
  promos = FALLBACK_PROMOS,
}: PromoHighlightSectionProps) {
  const slides = promos;
  const slideCount = slides.length;
  const isLooping = slideCount >= 3;

  const trackRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [settledIndex, setSettledIndex] = useState(0);
  const [statusAnnouncement, setStatusAnnouncement] = useState('');

  const settledIndexRef = useRef(0);
  const pendingTargetRef = useRef<number | null>(null);
  const pendingReplayDirRef = useRef<-1 | 1 | null>(null);
  const ignoringSettleScrollLeftRef = useRef<number | null>(null);
  const hasInteractedRef = useRef(false);

  const getVisualOrderIndices = useCallback(
    (track: HTMLDivElement): number[] => {
      const children = Array.from(track.children) as HTMLElement[];
      return children
        .map((el, domIdx) => ({
          domIdx,
          order: Number(getComputedStyle(el).order) || 0,
        }))
        .sort((a, b) => a.order - b.order || a.domIdx - b.domIdx)
        .map((item) => item.domIdx);
    },
    []
  );

  const getNearestDomIndex = useCallback((track: HTMLDivElement): number => {
    const children = Array.from(track.children) as HTMLElement[];
    if (children.length === 0) return 0;

    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let bestIdx = 0;
    let bestDist = Infinity;

    for (let i = 0; i < children.length; i++) {
      const el = children[i];
      const slideCenter = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(slideCenter - trackCenter);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    }
    return bestIdx;
  }, []);

  const scrollToDomIndex = useCallback(
    (track: HTMLDivElement, domIdx: number, instant = false) => {
      const slide = track.children[domIdx] as HTMLElement | undefined;
      if (!slide) return;

      const delta =
        slide.offsetLeft +
        slide.offsetWidth / 2 -
        (track.scrollLeft + track.clientWidth / 2);

      if (Math.abs(delta) < 1) return;

      if (instant) {
        track.scrollLeft += delta;
        return;
      }

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      track.scrollBy({
        left: delta,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    },
    []
  );

  const applyParkingWithCompensation = useCallback(
    (track: HTMLDivElement, nextCurrentValue: string | null, lockOverflow: boolean) => {
      const currentDomIdx = getNearestDomIndex(track);
      const currentSlide = track.children[currentDomIdx] as HTMLElement | undefined;
      if (!currentSlide) return;

      const beforeOffset = currentSlide.offsetLeft;
      const prevSnapType = track.style.scrollSnapType;
      const prevOverflowX = track.style.overflowX;

      track.style.scrollSnapType = 'none';
      if (lockOverflow) {
        track.style.overflowX = 'hidden';
      }

      if (nextCurrentValue === null) {
        track.style.removeProperty('--current');
      } else {
        track.style.setProperty('--current', nextCurrentValue);
      }

      const afterOffset = currentSlide.offsetLeft;
      const diff = afterOffset - beforeOffset;
      if (diff !== 0) {
        track.scrollLeft += diff;
      }

      track.style.scrollSnapType = prevSnapType;

      if (lockOverflow) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            track.style.overflowX = prevOverflowX;
          });
        });
      }
    },
    [getNearestDomIndex]
  );

  const stepCarousel = useCallback(
    (direction: -1 | 1) => {
      const track = trackRef.current;
      if (!track || slideCount <= 1) return;

      hasInteractedRef.current = true;

      if (isLooping && !track.style.getPropertyValue('--current')) {
        pendingReplayDirRef.current = direction;
        return;
      }

      const baseDomIdx =
        pendingTargetRef.current !== null
          ? pendingTargetRef.current
          : getNearestDomIndex(track);

      const visualOrder = getVisualOrderIndices(track);
      const visualPos = visualOrder.indexOf(baseDomIdx);
      const nextVisualPos = visualPos + direction;

      if (nextVisualPos < 0 || nextVisualPos >= visualOrder.length) {
        return;
      }

      const targetDomIdx = visualOrder[nextVisualPos];
      pendingTargetRef.current = targetDomIdx;
      ignoringSettleScrollLeftRef.current = track.scrollLeft;
      setActiveIndex(targetDomIdx);
      scrollToDomIndex(track, targetDomIdx);
    },
    [getNearestDomIndex, getVisualOrderIndices, isLooping, scrollToDomIndex, slideCount]
  );

  const goToSlide = useCallback(
    (targetDomIdx: number) => {
      const track = trackRef.current;
      if (!track || slideCount <= 1) return;

      hasInteractedRef.current = true;

      if (isLooping && targetDomIdx !== settledIndexRef.current) {
        applyParkingWithCompensation(track, null, false);
      }

      pendingTargetRef.current = targetDomIdx;
      ignoringSettleScrollLeftRef.current = track.scrollLeft;
      setActiveIndex(targetDomIdx);
      scrollToDomIndex(track, targetDomIdx);
    },
    [applyParkingWithCompensation, isLooping, scrollToDomIndex, slideCount]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track || slideCount <= 1) return;

    if (isLooping) {
      if (!CSS.supports('order: sibling-count()')) {
        track.style.setProperty('--children-count', String(track.children.length));
      }
      applyParkingWithCompensation(track, '0', false);
    }

    let rafId: number | null = null;
    let fallbackTimer: ReturnType<typeof setTimeout> | null = null;

    const handleSettled = () => {
      if (
        ignoringSettleScrollLeftRef.current !== null &&
        Math.abs(track.scrollLeft - ignoringSettleScrollLeftRef.current) < 1 &&
        pendingTargetRef.current !== null &&
        pendingTargetRef.current !== getNearestDomIndex(track)
      ) {
        return;
      }

      ignoringSettleScrollLeftRef.current = null;
      const nearest = getNearestDomIndex(track);

      if (pendingTargetRef.current !== null && nearest !== pendingTargetRef.current) {
        return;
      }
      pendingTargetRef.current = null;

      if (isLooping) {
        const currentVar = track.style.getPropertyValue('--current').trim();
        const hadUnparked = currentVar === '';
        if (currentVar !== String(nearest)) {
          applyParkingWithCompensation(track, String(nearest), !hadUnparked);
        }
        if (pendingReplayDirRef.current !== null) {
          const replayDir = pendingReplayDirRef.current;
          pendingReplayDirRef.current = null;
          requestAnimationFrame(() => stepCarousel(replayDir));
        }
      } else {
        // Redirect focus to the opposite button if the active control becomes disabled.
        if (nearest === 0 && document.activeElement === prevBtnRef.current) {
          nextBtnRef.current?.focus();
        } else if (
          nearest === slideCount - 1 &&
          document.activeElement === nextBtnRef.current
        ) {
          prevBtnRef.current?.focus();
        }
      }

      setActiveIndex(nearest);
      setSettledIndex(nearest);

      if (nearest !== settledIndexRef.current) {
        settledIndexRef.current = nearest;
        if (hasInteractedRef.current) {
          setStatusAnnouncement(`Slide ${nearest + 1} dari ${slideCount}`);
        }
      }
    };

    const supportsScrollEnd = 'onscrollend' in window;

    const handleScroll = () => {
      if (pendingTargetRef.current === null) {
        if (rafId === null) {
          rafId = requestAnimationFrame(() => {
            rafId = null;
            const nearest = getNearestDomIndex(track);
            setActiveIndex((prev) => (prev === nearest ? prev : nearest));
          });
        }
      }

      if (!supportsScrollEnd) {
        if (fallbackTimer !== null) clearTimeout(fallbackTimer);
        fallbackTimer = setTimeout(handleSettled, 140);
      }
    };

    const handleUserScrollStart = () => {
      hasInteractedRef.current = true;
    };

    track.addEventListener('scroll', handleScroll, { passive: true });
    track.addEventListener('pointerdown', handleUserScrollStart, { passive: true });
    track.addEventListener('keydown', handleUserScrollStart, { passive: true });
    if (supportsScrollEnd) {
      track.addEventListener('scrollend', handleSettled);
    }

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (fallbackTimer !== null) clearTimeout(fallbackTimer);
      track.removeEventListener('scroll', handleScroll);
      track.removeEventListener('pointerdown', handleUserScrollStart);
      track.removeEventListener('keydown', handleUserScrollStart);
      if (supportsScrollEnd) {
        track.removeEventListener('scrollend', handleSettled);
      }
    };
  }, [applyParkingWithCompensation, getNearestDomIndex, isLooping, slideCount, stepCarousel]);

  const prevDisabled = !isLooping && settledIndex === 0;
  const nextDisabled = !isLooping && settledIndex === slideCount - 1;

  return (
    <section
      id="promo-highlight"
      aria-roledescription={slideCount > 1 ? 'carousel' : undefined}
      aria-label="Promo Highlight Vida Medical Centre"
      className="py-10 sm:py-12 bg-white border-b border-slate-200 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {slideCount === 0 ? (
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-xs">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-slate-50 via-white to-sky-50/70">
              <div className="w-12 h-12 rounded-2xl bg-[#0472B5]/10 text-[#0472B5] flex items-center justify-center mb-3 border border-[#0472B5]/15">
                <ImageIcon className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <p className="text-sm sm:text-base font-semibold text-slate-800">
                Image Promo Highlight
              </p>
              <p className="mt-1 text-xs text-slate-500 max-w-md">
                Slot banner promo utama Vida Medical Centre (rasio rekomendasi 16:9 / 21:9).
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-xs">
              {slideCount > 1 && (
                <div className="pointer-events-none absolute inset-x-3 sm:inset-x-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-between">
                  <button
                    ref={prevBtnRef}
                    type="button"
                    onClick={() => stepCarousel(-1)}
                    disabled={prevDisabled}
                    aria-label="Slide promo sebelumnya"
                    className="pointer-events-auto w-10 h-10 rounded-full bg-white/95 hover:bg-white text-slate-900 border border-slate-300 shadow-md flex items-center justify-center transition-colors cursor-pointer touch-manipulation disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0472B5]"
                  >
                    <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                  </button>

                  <button
                    ref={nextBtnRef}
                    type="button"
                    onClick={() => stepCarousel(1)}
                    disabled={nextDisabled}
                    aria-label="Slide promo berikutnya"
                    className="pointer-events-auto w-10 h-10 rounded-full bg-white/95 hover:bg-white text-slate-900 border border-slate-300 shadow-md flex items-center justify-center transition-colors cursor-pointer touch-manipulation disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0472B5]"
                  >
                    <ChevronRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              )}

              <div
                ref={trackRef}
                tabIndex={0}
                role="group"
                aria-label="Daftar slide promo"
                className={`promo-carousel-track focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#0472B5] ${
                  isLooping ? 'is-looping' : ''
                }`}
              >
                {slides.map((promo, idx) => (
                  <div
                    key={`${promo.imageSrc}-${idx}`}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${idx + 1} dari ${slideCount}`}
                    className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-slate-50"
                  >
                    <Image
                      src={promo.imageSrc}
                      alt={promo.imageAlt}
                      fill
                      priority={idx === 0}
                      unoptimized={promo.imageSrc.startsWith('http')}
                      className="object-cover"
                      sizes="(max-width: 1280px) 100vw, 1280px"
                    />
                  </div>
                ))}
              </div>
            </div>

            {slideCount > 1 && (
              <>
                <p className="sr-only" role="status" aria-live="polite">
                  {statusAnnouncement}
                </p>

                <nav
                  aria-label="Pilih slide promo"
                  className="mt-3 flex items-center justify-center gap-1"
                >
                  {slides.map((promo, idx) => {
                    const isActive = activeIndex === idx;
                    return (
                      <button
                        key={`${promo.imageSrc}-${idx}`}
                        type="button"
                        onClick={() => goToSlide(idx)}
                        aria-label={`Lihat slide promo ${idx + 1}`}
                        aria-current={isActive ? 'true' : undefined}
                        className="min-w-6 min-h-6 px-1 flex items-center justify-center cursor-pointer touch-manipulation rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0472B5]"
                      >
                        <span
                          aria-hidden="true"
                          className={`block h-2.5 rounded-full transition-all duration-200 ${
                            isActive
                              ? 'w-7 bg-[#0472B5] ring-2 ring-[#0472B5]/25'
                              : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                          }`}
                        />
                      </button>
                    );
                  })}
                </nav>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
