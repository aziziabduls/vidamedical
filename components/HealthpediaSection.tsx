'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronRight, UserCheck } from 'lucide-react';
import HealthpediaReelsDialog from './HealthpediaReelsDialog';
import {
  HEALTHPEDIA_ARTICLES,
  HEALTHPEDIA_CATEGORIES,
} from '@/lib/healthpedia-articles';

interface HealthpediaSectionProps {
  onOpenBooking?: (category?: string, option?: string) => void;
}

export default function HealthpediaSection({ onOpenBooking }: HealthpediaSectionProps) {
  const [selectedCat, setSelectedCat] = useState<string>('Semua Topik');
  const [selectedArticleIndex, setSelectedArticleIndex] = useState(0);
  const [openSignal, setOpenSignal] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const filteredArticles = (
    selectedCat === 'Semua Topik'
      ? HEALTHPEDIA_ARTICLES
      : HEALTHPEDIA_ARTICLES.filter((art) => art.category === selectedCat)
  ).slice(0, 4);

  const openReelsById = (articleId: string) => {
    const idx = HEALTHPEDIA_ARTICLES.findIndex((art) => art.id === articleId);
    setSelectedArticleIndex(idx >= 0 ? idx : 0);
    setOpenSignal((prev) => prev + 1);
    dialogRef.current?.showModal();
  };

  return (
    <section id="healthpedia" className="py-16 bg-slate-50 font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 text-xs font-semibold mb-2">
              <span>Edukasi Medis Ilmiah</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Healthpedia Vida Medical Centre
            </h2>
            <p className="mt-2 text-slate-600 text-sm leading-relaxed">
              Panduan kesehatan berbasis bukti ilmiah yang ditinjau langsung oleh dokter spesialis dan tenaga kesehatan bersertifikat.
            </p>
          </div>

          <Link
            href="/artikel"
            className="mt-4 md:mt-0 inline-flex items-center space-x-1 text-xs font-semibold text-[#0472B5] hover:underline"
          >
            <span>Semua Artikel Medis</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 mb-8">
          {HEALTHPEDIA_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedCat === cat
                  ? 'bg-[#0472B5] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCat}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {filteredArticles.map((art) => (
              <article
                key={art.id}
                className="group relative bg-white rounded-xl p-5 border border-slate-200 hover:border-[#0472B5]/50 hover:shadow-md transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-medium text-slate-500">
                    {art.category}
                  </span>

                  <h3 className="text-sm font-semibold text-slate-900 group-hover:text-[#0472B5] transition-colors leading-snug mt-2">
                    <button
                      type="button"
                      onClick={() => openReelsById(art.id)}
                      className="text-left cursor-pointer after:absolute after:inset-0 focus:outline-none focus-visible:after:ring-2 focus-visible:after:ring-[#0472B5] focus-visible:after:rounded-xl"
                    >
                      {art.title}
                    </button>
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {art.snippet}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-100 text-[11px] text-slate-500 space-y-2">
                  <div className="flex items-center space-x-1.5 font-medium text-slate-700">
                    <UserCheck className="w-3.5 h-3.5 text-[#0472B5]" />
                    <span>Ditinjau: {art.author}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 tabular-nums">
                    <span>{art.date}</span>
                    <span>{art.readTime}</span>
                  </div>
                  <div className="pt-1 flex items-center justify-between text-[11px] font-semibold text-[#0472B5]">
                    <span>Baca Artikel</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Reels-style Modal Dialog Reader */}
      <HealthpediaReelsDialog
        articles={HEALTHPEDIA_ARTICLES}
        dialogRef={dialogRef}
        initialIndex={selectedArticleIndex}
        openSignal={openSignal}
        onConsult={onOpenBooking}
      />
    </section>
  );
}
