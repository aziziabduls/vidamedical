'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, MotionConfig } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Layers,
  Stethoscope,
  UserCheck,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingChat from '@/components/FloatingChat';
import BookingModal from '@/components/BookingModal';
import HealthpediaReelsDialog from '@/components/HealthpediaReelsDialog';
import {
  HEALTHPEDIA_ARTICLES,
  type HealthpediaArticle,
} from '@/lib/healthpedia-articles';

interface HealthpediaArticleClientProps {
  article: HealthpediaArticle;
  previousArticle: HealthpediaArticle | null;
  nextArticle: HealthpediaArticle | null;
}

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export default function HealthpediaArticleClient({
  article,
  previousArticle,
  nextArticle,
}: HealthpediaArticleClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState<string>(article.bookingCategory);
  const [modalOption, setModalOption] = useState<string>(article.bookingOption);

  const [openSignal, setOpenSignal] = useState(0);
  const reelsDialogRef = useRef<HTMLDialogElement>(null);

  const articleIndex = Math.max(
    0,
    HEALTHPEDIA_ARTICLES.findIndex((item) => item.id === article.id)
  );

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

  const openReelsAtCurrent = () => {
    setOpenSignal((prev) => prev + 1);
    reelsDialogRef.current?.showModal();
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 font-sans selection:bg-[#0472B5] selection:text-white">
        <Navbar onOpenBooking={openBooking} />

        <main className="flex-1">
          {/* Article Editorial Header */}
          <header className="bg-white border-b border-slate-200/80 py-10 sm:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-6">
                <Link href="/" className="hover:text-[#0472B5] transition-colors">
                  Beranda
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.5} />
                <Link href="/artikel" className="hover:text-[#0472B5] transition-colors">
                  Healthpedia
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.5} />
                <span className="text-slate-800 font-medium">{article.category}</span>
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
                className="max-w-3xl"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-4 tabular-nums">
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-[#0472B5] font-medium">
                    {article.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.5} />
                    {article.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.5} />
                    {article.readTime}
                  </span>
                </div>

                <h1 className="font-editorial text-3xl sm:text-4xl lg:text-[2.625rem] font-medium text-slate-900 leading-[1.15] tracking-[-0.02em] text-balance">
                  {article.title}
                </h1>

                <p className="mt-4 text-base sm:text-lg text-slate-600 leading-[1.6] max-w-[62ch]">
                  {article.snippet}
                </p>

                <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                      <UserCheck className="w-4 h-4 text-[#0472B5]" strokeWidth={1.5} />
                    </div>
                    <div className="text-xs">
                      <div className="font-medium text-slate-900">{article.author}</div>
                      <div className="text-slate-500">{article.authorCredential}</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={openReelsAtCurrent}
                    className="h-9 px-3.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5 text-[#0472B5]" strokeWidth={1.5} />
                    <span>Buka Mode Cepat</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </header>

          {/* Reading Layout */}
          <div className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                {/* Main Long-Form Prose Column (65ch) */}
                <article className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-10">
                  <div className="max-w-[65ch] space-y-6">
                    {/* Lead Intro */}
                    <div className="pl-4 border-l-2 border-[#0472B5] space-y-3">
                      {article.paragraphs.map((paragraph, idx) => (
                        <p key={idx} className="text-[16px] sm:text-[17px] text-slate-700 leading-[1.7]">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Structured Medical Sections */}
                    {article.sections.map((section, sIdx) => (
                      <section key={sIdx} id={`bagian-${sIdx + 1}`} className="pt-4 scroll-mt-4">
                        <h2 className="font-editorial text-xl sm:text-2xl font-medium text-slate-900 leading-[1.25] mb-3">
                          {section.heading}
                        </h2>
                        <div className="space-y-4">
                          {section.body.map((text, bIdx) => (
                            <p key={bIdx} className="text-[16px] sm:text-[17px] text-slate-700 leading-[1.7]">
                              {text}
                            </p>
                          ))}
                        </div>
                      </section>
                    ))}

                    {/* Key Clinical Takeaways */}
                    <div className="mt-8 p-6 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                      <h2 className="text-sm font-medium text-slate-900">
                        Poin penting klinis
                      </h2>
                      <ul className="space-y-2.5">
                        {article.keyPoints.map((point, kIdx) => (
                          <li key={kIdx} className="flex items-start gap-2.5 text-sm sm:text-[15px] text-slate-700 leading-[1.6]">
                            <Check className="w-4 h-4 text-[#0472B5] shrink-0 mt-1" strokeWidth={1.5} />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Doctor Clinical Note */}
                    <div className="p-5 rounded-xl bg-white border border-slate-200 border-l-2 border-l-[#0472B5] text-sm text-slate-700 leading-[1.65]">
                      <span className="font-medium text-slate-900">Catatan dokter: </span>
                      {article.clinicalNote}
                    </div>
                  </div>

                  {/* Prev / Next Article Navigation */}
                  <nav
                    aria-label="Navigasi artikel"
                    className="mt-10 pt-8 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    {previousArticle ? (
                      <Link
                        href={`/artikel/${previousArticle.id}`}
                        className="group p-4 rounded-xl border border-slate-200 hover:border-[#0472B5]/50 transition-colors flex flex-col justify-between"
                      >
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
                          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
                          <span>Artikel sebelumnya</span>
                        </span>
                        <span className="text-sm font-medium text-slate-900 group-hover:text-[#0472B5] transition-colors line-clamp-2">
                          {previousArticle.title}
                        </span>
                      </Link>
                    ) : (
                      <div />
                    )}

                    {nextArticle ? (
                      <Link
                        href={`/artikel/${nextArticle.id}`}
                        className="group p-4 rounded-xl border border-slate-200 hover:border-[#0472B5]/50 transition-colors flex flex-col justify-between sm:text-right sm:items-end"
                      >
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
                          <span>Artikel berikutnya</span>
                          <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </span>
                        <span className="text-sm font-medium text-slate-900 group-hover:text-[#0472B5] transition-colors line-clamp-2">
                          {nextArticle.title}
                        </span>
                      </Link>
                    ) : null}
                  </nav>
                </article>

                {/* Right Sticky Clinical Utility Sidebar */}
                <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                  {/* Table of Contents */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-6">
                    <h2 className="text-xs font-medium text-slate-500 mb-3">
                      Daftar bahasan artikel
                    </h2>
                    <nav aria-label="Daftar bahasan">
                      <ul className="space-y-2 text-sm">
                        {article.sections.map((section, sIdx) => (
                          <li key={sIdx}>
                            <a
                              href={`#bagian-${sIdx + 1}`}
                              className="block py-1 text-slate-700 hover:text-[#0472B5] transition-colors leading-snug"
                            >
                              {section.heading}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>

                  {/* Consultation Booking Card */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-[#0472B5]/10 flex items-center justify-center shrink-0">
                        <Stethoscope className="w-4 h-4 text-[#0472B5]" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h2 className="text-sm font-medium text-slate-900">
                          Konsultasikan keluhan Anda
                        </h2>
                        <p className="text-xs text-slate-500">
                          Gedung The Vida · Kebon Jeruk
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      Artikel ini ditujukan untuk edukasi medis. Jadwalkan pemeriksaan langsung untuk diagnosis dan rencana terapi yang sesuai kondisi Anda.
                    </p>

                    <button
                      type="button"
                      onClick={() => openBooking(article.bookingCategory, article.bookingOption)}
                      className="w-full h-11 px-4 rounded-lg bg-[#0472B5] hover:bg-[#035c93] text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                    >
                      Jadwalkan konsultasi terkait
                    </button>

                    <Link
                      href="/artikel"
                      className="block text-center text-xs font-medium text-slate-600 hover:text-[#0472B5] pt-1 transition-colors"
                    >
                      Lihat semua artikel Healthpedia
                    </Link>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </main>

        <Footer />
        <FloatingChat onOpenBooking={() => openBooking('vidaboost', 'VidaBoost Gold')} />
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialCategory={modalCategory}
          initialOption={modalOption}
        />
        <HealthpediaReelsDialog
          articles={HEALTHPEDIA_ARTICLES}
          dialogRef={reelsDialogRef}
          initialIndex={articleIndex}
          openSignal={openSignal}
          onConsult={openBooking}
        />
      </div>
    </MotionConfig>
  );
}

