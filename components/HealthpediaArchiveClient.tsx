'use client';

import React, { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Layers,
  Search,
  UserCheck,
  X,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingChat from '@/components/FloatingChat';
import BookingModal from '@/components/BookingModal';
import HealthpediaReelsDialog from '@/components/HealthpediaReelsDialog';
import {
  HEALTHPEDIA_ARTICLES,
  HEALTHPEDIA_CATEGORIES,
} from '@/lib/healthpedia-articles';

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export default function HealthpediaArchiveClient() {
  const [selectedCat, setSelectedCat] = useState<string>('Semua Topik');
  const [searchQuery, setSearchQuery] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState<string>('vidaboost');
  const [modalOption, setModalOption] = useState<string>('VidaBoost Gold');

  const [reelsIndex, setReelsIndex] = useState(0);
  const [openSignal, setOpenSignal] = useState(0);
  const reelsDialogRef = useRef<HTMLDialogElement>(null);

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

  const openReelsAtId = (articleId: string) => {
    const idx = HEALTHPEDIA_ARTICLES.findIndex((art) => art.id === articleId);
    setReelsIndex(idx >= 0 ? idx : 0);
    setOpenSignal((prev) => prev + 1);
    reelsDialogRef.current?.showModal();
  };

  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return HEALTHPEDIA_ARTICLES.filter((art) => {
      const matchesCat = selectedCat === 'Semua Topik' || art.category === selectedCat;
      if (!matchesCat) return false;
      if (!q) return true;
      return (
        art.title.toLowerCase().includes(q) ||
        art.snippet.toLowerCase().includes(q) ||
        art.category.toLowerCase().includes(q) ||
        art.author.toLowerCase().includes(q)
      );
    });
  }, [selectedCat, searchQuery]);

  const showFeaturedSplit = selectedCat === 'Semua Topik' && searchQuery.trim() === '' && filteredArticles.length > 0;
  const featuredArticle = showFeaturedSplit ? filteredArticles[0] : null;
  const archiveArticles = showFeaturedSplit ? filteredArticles.slice(1) : filteredArticles;

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 font-sans selection:bg-[#0472B5] selection:text-white">
        <Navbar onOpenBooking={openBooking} />

        <main className="flex-1">
          {/* Editorial Header */}
          <section className="bg-white border-b border-slate-200/80 py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 mb-6">
                <Link href="/" className="hover:text-[#0472B5] transition-colors">
                  Beranda
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.5} />
                <span className="text-slate-800 font-medium">Healthpedia</span>
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end"
              >
                <div className="lg:col-span-8">
                  <div className="inline-flex items-center gap-2 pl-3 border-l-2 border-[#0472B5] text-xs font-medium text-slate-600 mb-3">
                    <BookOpen className="w-3.5 h-3.5 text-[#0472B5]" strokeWidth={1.5} />
                    <span>Pustaka edukasi medis Vida Medical Centre</span>
                  </div>

                  <h1 className="font-editorial text-3xl sm:text-5xl font-medium text-slate-900 tracking-[-0.02em] leading-[1.12] text-balance">
                    Healthpedia & Jurnal Edukasi Klinis
                  </h1>

                  <p className="mt-4 text-base sm:text-lg text-slate-600 leading-[1.6] max-w-[60ch]">
                    Artikel kesehatan berbasis bukti ilmiah yang ditinjau oleh dokter spesialis dan tenaga keperawatan bersertifikat di Kebon Jeruk.
                  </p>
                </div>

                {/* Search + Mode Reels Utility */}
                <div className="lg:col-span-4 space-y-3">
                  <div className="relative">
                    <label htmlFor="healthpedia-search" className="sr-only">
                      Cari artikel kesehatan
                    </label>
                    <Search
                      className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                      strokeWidth={1.5}
                    />
                    <input
                      id="healthpedia-search"
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari topik, gejala, atau spesialisasi"
                      className="w-full h-11 pl-10 pr-9 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#0472B5] focus:ring-2 focus:ring-[#0472B5]/15 transition-[color,background-color,border-color]"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        aria-label="Hapus pencarian"
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded text-slate-400 hover:text-slate-700 cursor-pointer"
                      >
                        <X className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <span className="tabular-nums">
                      Menampilkan {filteredArticles.length} dari {HEALTHPEDIA_ARTICLES.length} artikel
                    </span>
                    <button
                      type="button"
                      onClick={() => openReelsAtId(filteredArticles[0]?.id ?? HEALTHPEDIA_ARTICLES[0].id)}
                      className="inline-flex items-center gap-1.5 font-medium text-[#0472B5] hover:underline cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span>Baca di Mode Cepat</span>
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Category Filter Tabs */}
              <div
                role="tablist"
                aria-label="Filter kategori artikel"
                className="mt-8 pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-2"
              >
                {HEALTHPEDIA_CATEGORIES.map((cat) => {
                  const isActive = selectedCat === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedCat(cat)}
                      className={`relative px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${isActive
                        ? 'text-white'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="artikel-category-pill"
                          transition={{ duration: 0.2, ease: EASE_OUT }}
                          className="absolute inset-0 rounded-lg bg-[#0472B5]"
                        />
                      )}
                      <span className="relative z-10">{cat}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Editorial Content Section */}
          <section className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              {/* Featured Lead Article (Asymmetric 12-col split) */}
              {featuredArticle && (
                <article className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-4 tabular-nums">
                          <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
                            {featuredArticle.category}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.5} />
                            {featuredArticle.date}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.5} />
                            {featuredArticle.readTime}
                          </span>
                        </div>

                        <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-slate-900 leading-[1.2] tracking-[-0.01em] text-balance">
                          <Link
                            href={`/artikel/${featuredArticle.id}`}
                            className="hover:text-[#0472B5] transition-colors"
                          >
                            {featuredArticle.title}
                          </Link>
                        </h2>

                        <p className="mt-4 text-base text-slate-600 leading-[1.65] max-w-[60ch]">
                          {featuredArticle.snippet}
                        </p>

                        <p className="mt-3 text-sm text-slate-600 leading-[1.65] max-w-[60ch]">
                          {featuredArticle.paragraphs[0]}
                        </p>
                      </div>

                      <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2.5 text-xs">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                            <UserCheck className="w-4 h-4 text-[#0472B5]" strokeWidth={1.5} />
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">{featuredArticle.author}</div>
                            <div className="text-slate-500">{featuredArticle.authorCredential}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => openReelsAtId(featuredArticle.id)}
                            className="h-10 px-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
                          >
                            Baca Cepat
                          </button>
                          <Link
                            href={`/artikel/${featuredArticle.id}`}
                            className="h-10 px-4 rounded-lg bg-[#0472B5] hover:bg-[#035c93] text-white text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
                          >
                            <span>Baca Artikel Lengkap</span>
                            <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Right Clinical Summary Panel */}
                    <div className="lg:col-span-5 bg-slate-50/90 border-t lg:border-t-0 lg:border-l border-slate-200/80 p-6 sm:p-8 flex flex-col justify-between">
                      <div>
                        <div className="pl-3 border-l-2 border-[#0472B5] mb-5">
                          <div className="text-sm font-medium text-slate-900">
                            Ringkasan klinis utama
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Poin penting sebelum berkonsultasi
                          </p>
                        </div>

                        <ul className="space-y-3.5">
                          {featuredArticle.keyPoints.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 leading-[1.6]">
                              <Check className="w-4 h-4 text-[#0472B5] shrink-0 mt-1" strokeWidth={1.5} />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 p-4 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-600 leading-relaxed">
                        <span className="font-medium text-slate-900">Catatan dokter: </span>
                        {featuredArticle.clinicalNote}
                      </div>
                    </div>
                  </div>
                </article>
              )}

              {/* Article Archive Grid */}
              <AnimatePresence mode="wait">
                {filteredArticles.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center"
                  >
                    <p className="text-base font-medium text-slate-900">
                      Belum ada artikel yang cocok dengan pencarian Anda
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      Coba kata kunci lain atau tampilkan semua topik edukasi medis.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCat('Semua Topik');
                        setSearchQuery('');
                      }}
                      className="mt-5 h-10 px-4 rounded-lg bg-[#0472B5] hover:bg-[#035c93] text-white text-xs font-medium transition-colors cursor-pointer"
                    >
                      Tampilkan semua topik
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`${selectedCat}-${searchQuery}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2, ease: EASE_OUT }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {archiveArticles.map((art) => (
                      <article
                        key={art.id}
                        className="group bg-white rounded-2xl border border-slate-200/90 hover:border-[#0472B5]/45 p-6 flex flex-col justify-between transition-colors"
                      >
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 mb-3 tabular-nums">
                            <span className="font-medium text-[#0472B5]">{art.category}</span>
                            <span>{art.date} · {art.readTime}</span>
                          </div>

                          <h3 className="font-editorial text-xl font-medium text-slate-900 group-hover:text-[#0472B5] leading-[1.25] transition-colors text-balance">
                            <Link href={`/artikel/${art.id}`}>
                              {art.title}
                            </Link>
                          </h3>

                          <p className="mt-3 text-sm text-slate-600 leading-[1.65] max-w-[58ch]">
                            {art.snippet}
                          </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-2 text-xs text-slate-600">
                            <UserCheck className="w-3.5 h-3.5 text-[#0472B5] shrink-0" strokeWidth={1.5} />
                            <span>{art.author}</span>
                          </div>

                          <div className="flex items-center gap-3 text-xs font-medium">
                            <button
                              type="button"
                              onClick={() => openReelsAtId(art.id)}
                              className="text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                            >
                              Baca Cepat
                            </button>
                            <Link
                              href={`/artikel/${art.id}`}
                              className="inline-flex items-center gap-1 text-[#0472B5] hover:underline"
                            >
                              <span>Baca artikel</span>
                              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Quiet Clinical Consultation Strip */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="pl-4 border-l-2 border-[#0472B5]">
                  <h2 className="text-base sm:text-lg font-medium text-slate-900">
                    Membutuhkan evaluasi medis secara langsung?
                  </h2>
                  <p className="text-sm text-slate-600 mt-1 max-w-[58ch]">
                    Jadwalkan konsultasi dengan dokter spesialis kami di Gedung The Vida, Kebon Jeruk, atau pesan layanan homecare.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => openBooking('doctor', 'Konsultasi Dokter Spesialis')}
                  className="shrink-0 h-11 px-5 rounded-lg bg-[#0472B5] hover:bg-[#035c93] text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  Buat janji temu dokter
                </button>
              </div>
            </div>
          </section>
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
          initialIndex={reelsIndex}
          openSignal={openSignal}
          onConsult={openBooking}
        />
      </div>
    </MotionConfig>
  );
}

