'use client';

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Stethoscope,
  UserCheck,
  X,
} from 'lucide-react';
import type { HealthpediaArticle } from '@/lib/healthpedia-articles';

export type { HealthpediaArticle };

interface HealthpediaReelsDialogProps {
  articles: HealthpediaArticle[];
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  initialIndex: number;
  openSignal: number;
  onConsult?: (category: string, option: string) => void;
}

export default function HealthpediaReelsDialog({
  articles,
  dialogRef,
  initialIndex,
  openSignal,
  onConsult,
}: HealthpediaReelsDialogProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const bodyRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [statusMessage, setStatusMessage] = useState('');

  const activeIndexRef = useRef(initialIndex);
  const settledIndexRef = useRef(initialIndex);
  const pendingTargetRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const pendingFallbackTimerRef = useRef<number | null>(null);
  const scrollEndDebounceRef = useRef<number | null>(null);

  const prefersReducedMotion = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const getNearestSlideIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return activeIndexRef.current;

    const currentTop = track.scrollTop;
    let bestIndex = 0;
    let bestDistance = Number.POSITIVE_INFINITY;

    for (let i = 0; i < articles.length; i += 1) {
      const slide = slideRefs.current[i];
      if (!slide) continue;
      const distance = Math.abs(slide.offsetTop - currentTop);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = i;
      }
    }
    return bestIndex;
  }, [articles.length]);

  const settleToSlide = useCallback(
    (index: number, announce: boolean) => {
      pendingTargetRef.current = null;
      if (pendingFallbackTimerRef.current !== null) {
        window.clearTimeout(pendingFallbackTimerRef.current);
        pendingFallbackTimerRef.current = null;
      }

      if (index !== activeIndexRef.current) {
        activeIndexRef.current = index;
        setActiveIndex(index);
      }

      if (index !== settledIndexRef.current) {
        settledIndexRef.current = index;
        if (announce && articles[index]) {
          setStatusMessage(
            `Artikel ${index + 1} dari ${articles.length}: ${articles[index].title}`
          );
        }
      }
    },
    [articles]
  );

  const goToSlide = useCallback(
    (targetIndex: number, instant = false) => {
      const clamped = Math.max(0, Math.min(articles.length - 1, targetIndex));
      const track = trackRef.current;
      const slide = slideRefs.current[clamped];

      if (!track || !slide) return;

      const useInstant = instant || prefersReducedMotion();
      const targetTop = slide.offsetTop;

      // Reset inner article body scroll to top when moving to another reel
      bodyRefs.current[clamped]?.scrollTo({ top: 0 });

      activeIndexRef.current = clamped;
      setActiveIndex(clamped);

      if (useInstant || Math.abs(track.scrollTop - targetTop) < 2) {
        track.scrollTo({ top: targetTop, behavior: 'auto' });
        settleToSlide(clamped, !instant);
        return;
      }

      pendingTargetRef.current = clamped;
      track.scrollTo({ top: targetTop, behavior: 'smooth' });

      if (pendingFallbackTimerRef.current !== null) {
        window.clearTimeout(pendingFallbackTimerRef.current);
      }
      pendingFallbackTimerRef.current = window.setTimeout(() => {
        if (pendingTargetRef.current === clamped) {
          settleToSlide(clamped, true);
        }
      }, 650);
    },
    [articles.length, prefersReducedMotion, settleToSlide]
  );

  // Sync track position synchronously before paint whenever the dialog opens
  useLayoutEffect(() => {
    if (openSignal === 0) return;
    const dialog = dialogRef.current;
    if (!dialog?.open) return;

    const clamped = Math.max(0, Math.min(articles.length - 1, initialIndex));
    settledIndexRef.current = clamped;
    activeIndexRef.current = clamped;
    setActiveIndex(clamped);
    setStatusMessage('');

    const slide = slideRefs.current[clamped];
    if (trackRef.current && slide) {
      bodyRefs.current[clamped]?.scrollTo({ top: 0 });
      trackRef.current.scrollTo({ top: slide.offsetTop, behavior: 'auto' });
    }
  }, [openSignal, initialIndex, articles.length, dialogRef]);

  // Light-dismiss fallback for browsers lacking closedBy & dialog returnValue reset
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = '';
      pendingTargetRef.current = null;
      setStatusMessage('');
    };
    dialog.addEventListener('close', handleClose);

    if (!('closedBy' in HTMLDialogElement.prototype)) {
      const isOutside = (e: PointerEvent) => {
        const r = dialog.getBoundingClientRect();
        return (
          e.clientX < r.left ||
          e.clientX > r.right ||
          e.clientY < r.top ||
          e.clientY > r.bottom
        );
      };
      let pressedOutside = false;
      const handlePointerDown = (e: PointerEvent) => {
        pressedOutside = isOutside(e);
      };
      const handlePointerUp = (e: PointerEvent) => {
        if (pressedOutside && isOutside(e)) {
          dialog.close('backdrop');
        }
      };

      dialog.addEventListener('pointerdown', handlePointerDown);
      dialog.addEventListener('pointerup', handlePointerUp);

      return () => {
        dialog.removeEventListener('close', handleClose);
        dialog.removeEventListener('pointerdown', handlePointerDown);
        dialog.removeEventListener('pointerup', handlePointerUp);
      };
    }

    return () => {
      dialog.removeEventListener('close', handleClose);
    };
  }, [dialogRef]);

  // Track scroll & settled snap state
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const supportsScrollEnd = 'onscrollend' in window;

    const handleSettled = () => {
      const pending = pendingTargetRef.current;
      const nearest = getNearestSlideIndex();
      if (pending !== null) {
        if (nearest === pending) {
          settleToSlide(pending, true);
        }
        return;
      }
      settleToSlide(nearest, true);
    };

    const handleScroll = () => {
      if (pendingTargetRef.current === null) {
        if (rafIdRef.current !== null) {
          window.cancelAnimationFrame(rafIdRef.current);
        }
        rafIdRef.current = window.requestAnimationFrame(() => {
          rafIdRef.current = null;
          if (pendingTargetRef.current !== null) return;
          const nearest = getNearestSlideIndex();
          if (nearest !== activeIndexRef.current) {
            activeIndexRef.current = nearest;
            setActiveIndex(nearest);
          }
        });
      }

      if (!supportsScrollEnd) {
        if (scrollEndDebounceRef.current !== null) {
          window.clearTimeout(scrollEndDebounceRef.current);
        }
        scrollEndDebounceRef.current = window.setTimeout(handleSettled, 140);
      }
    };

    const cancelPendingOnManualInput = () => {
      if (pendingTargetRef.current !== null) {
        pendingTargetRef.current = null;
      }
    };

    track.addEventListener('scroll', handleScroll, { passive: true });
    track.addEventListener('wheel', cancelPendingOnManualInput, { passive: true });
    track.addEventListener('touchstart', cancelPendingOnManualInput, { passive: true });

    if (supportsScrollEnd) {
      track.addEventListener('scrollend', handleSettled);
    }

    return () => {
      track.removeEventListener('scroll', handleScroll);
      track.removeEventListener('wheel', cancelPendingOnManualInput);
      track.removeEventListener('touchstart', cancelPendingOnManualInput);
      if (supportsScrollEnd) {
        track.removeEventListener('scrollend', handleSettled);
      }
      if (rafIdRef.current !== null) window.cancelAnimationFrame(rafIdRef.current);
      if (scrollEndDebounceRef.current !== null) window.clearTimeout(scrollEndDebounceRef.current);
      if (pendingFallbackTimerRef.current !== null) window.clearTimeout(pendingFallbackTimerRef.current);
    };
  }, [getNearestSlideIndex, settleToSlide]);

  const handleStep = (delta: -1 | 1) => {
    const base = pendingTargetRef.current ?? activeIndexRef.current;
    goToSlide(base + delta);
  };

  const handleDialogKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    const target = e.target as HTMLElement | null;
    if (target?.closest('a, button, input, textarea, select')) return;

    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      handleStep(1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      handleStep(-1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      goToSlide(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goToSlide(articles.length - 1);
    }
  };

  const handleConsultClick = (article: HealthpediaArticle) => {
    dialogRef.current?.close('consult');
    if (onConsult) {
      onConsult(article.bookingCategory, article.bookingOption);
    } else {
      document.getElementById('doctor-search')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeArticle = articles[activeIndex] ?? articles[0];
  const progressPercent = ((activeIndex + 1) / Math.max(articles.length, 1)) * 100;

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      aria-labelledby="healthpedia-reels-heading"
      onKeyDown={handleDialogKeyDown}
      className="m-auto bg-transparent p-0 border-0 max-w-[calc(100vw-1rem)] max-h-[94dvh] overflow-visible open:flex flex-col sm:flex-row-reverse items-center justify-center gap-3.5 focus:outline-none"
    >
      <h2 id="healthpedia-reels-heading" className="sr-only">
        Pembaca Artikel Healthpedia Mode Baca Cepat
      </h2>

      {/* Controls placed before the track in DOM order; visually right of card via sm:flex-row-reverse */}
      <div className="hidden sm:flex flex-col items-center gap-3 shrink-0 z-10">
        <div className="flex flex-col items-center gap-2 p-2 rounded-full bg-slate-900/65 border border-white/15 backdrop-blur-md shadow-xl">
          <button
            type="button"
            onClick={() => handleStep(-1)}
            disabled={activeIndex === 0}
            aria-label="Artikel sebelumnya"
            title="Artikel sebelumnya"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-35 disabled:hover:bg-white/10 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors cursor-pointer touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ChevronUp className="w-5 h-5" />
          </button>

          <nav aria-label="Pilih artikel" className="flex flex-col items-center gap-1.5 py-1">
            {articles.map((art, idx) => {
              const isCurrent = activeIndex === idx;
              return (
                <button
                  key={art.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  aria-current={isCurrent ? 'true' : undefined}
                  aria-label={`Buka artikel ${idx + 1}: ${art.title}`}
                  title={art.title}
                  className={`rounded-full transition-all cursor-pointer touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${isCurrent
                      ? 'w-2.5 h-6 bg-[#38bdf8]'
                      : 'w-2 h-2 bg-white/40 hover:bg-white/75'
                    }`}
                />
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => handleStep(1)}
            disabled={activeIndex === articles.length - 1}
            aria-label="Artikel berikutnya"
            title="Artikel berikutnya"
            className="w-10 h-10 rounded-full bg-[#0472B5] hover:bg-[#035c93] disabled:bg-white/10 disabled:opacity-35 disabled:cursor-not-allowed text-white flex items-center justify-center shadow-sm transition-colors cursor-pointer touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Reels Frame */}
      <div className="w-[min(94vw,460px)] h-[min(86dvh,740px)] bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col">
        {/* Persistent Top Header Bar */}
        <div className="shrink-0 bg-white border-b border-slate-100">
          <div className="px-4 sm:px-5 py-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#0472B5]/10 text-[#0472B5] font-bold text-[11px] shrink-0 tabular-nums">
                {activeIndex + 1} / {articles.length}
              </span>
              {activeArticle && (
                <span className="text-[11px] font-semibold text-slate-600 truncate">
                  {activeArticle.category}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {/* Mobile Up/Down quick controls */}
              <div className="flex sm:hidden items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleStep(-1)}
                  disabled={activeIndex === 0}
                  aria-label="Artikel sebelumnya"
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-35 cursor-pointer touch-manipulation"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleStep(1)}
                  disabled={activeIndex === articles.length - 1}
                  aria-label="Artikel berikutnya"
                  className="p-1.5 rounded-lg bg-[#0472B5] text-white hover:bg-[#035c93] disabled:bg-slate-200 disabled:text-slate-400 cursor-pointer touch-manipulation"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                autoFocus
                onClick={() => dialogRef.current?.close('dismiss')}
                aria-label="Tutup pembaca artikel"
                title="Tutup (Esc)"
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer touch-manipulation focus-visible:outline-2 focus-visible:outline-[#0472B5]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Reading progress bar across reels */}
          <div className="h-0.5 w-full bg-slate-100">
            <div
              className="h-full bg-[#0472B5] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Vertical Scroll-Snap Reels Track */}
        <div
          ref={trackRef}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Artikel Healthpedia"
          className="healthpedia-reels-track no-scrollbar flex-1 min-h-0 overflow-y-auto snap-y snap-mandatory overscroll-y-contain touch-manipulation focus:outline-none"
        >
          {articles.map((art, idx) => {
            const isLast = idx === articles.length - 1;
            return (
              <article
                key={art.id}
                ref={(el) => {
                  slideRefs.current[idx] = el;
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`Artikel ${idx + 1} dari ${articles.length}: ${art.title}`}
                className="h-full min-h-full snap-start snap-always flex flex-col bg-white"
              >
                {/* Scrollable Article Content Body */}
                <div
                  ref={(el) => {
                    bodyRefs.current[idx] = el;
                  }}
                  className="flex-1 min-h-0 overflow-y-auto px-5 sm:px-6 py-5 space-y-4"
                >
                  {/* Meta Tags */}
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#0472B5]" />
                      {art.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#0472B5]" />
                      {art.readTime}
                    </span>
                  </div>

                  {/* Headline */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug tracking-tight">
                    {art.title}
                  </h3>

                  {/* Reviewer Pill */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium">
                    <UserCheck className="w-3.5 h-3.5 text-[#0472B5] shrink-0" />
                    <span>Ditinjau oleh {art.author}</span>
                  </div>

                  {/* Article Body Paragraphs */}
                  <div className="space-y-2.5 text-[13px] sm:text-sm text-slate-700 leading-relaxed">
                    {art.paragraphs.map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Key Takeaways */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="text-xs font-bold text-slate-900">
                      Poin Penting Klinis
                    </div>
                    <ul className="space-y-1.5">
                      {art.keyPoints.map((point, kIdx) => (
                        <li
                          key={kIdx}
                          className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0472B5] shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Clinical Advice Box */}
                  <div className="p-3 rounded-xl bg-[#0472B5]/6 border border-[#0472B5]/15 text-xs text-slate-700 leading-relaxed">
                    <span className="font-semibold text-[#0472B5]">Catatan Dokter: </span>
                    {art.clinicalNote}
                  </div>

                  <div>
                    <Link
                      href={`/artikel/${art.id}`}
                      onClick={() => dialogRef.current?.close('navigate')}
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#0472B5] hover:underline"
                    >
                      <span>Buka halaman artikel lengkap</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="shrink-0 px-5 sm:px-6 py-3 bg-slate-50/90 border-t border-slate-200/80 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => handleConsultClick(art)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold transition-colors cursor-pointer touch-manipulation"
                  >
                    <Stethoscope className="w-3.5 h-3.5 text-[#0472B5]" />
                    <span>Konsultasi Topik Ini</span>
                  </button>

                  {!isLast ? (
                    <button
                      type="button"
                      onClick={() => goToSlide(idx + 1)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0472B5] hover:bg-[#035c93] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer touch-manipulation"
                    >
                      <span>Artikel Berikutnya</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => goToSlide(0)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer touch-manipulation"
                    >
                      <ChevronUp className="w-4 h-4" />
                      <span>Kembali ke Atas</span>
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Visually hidden live status announcement */}
        <p className="sr-only" role="status" aria-live="polite">
          {statusMessage}
        </p>
      </div>
    </dialog>
  );
}
