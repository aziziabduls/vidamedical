'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronRight, UserCheck } from 'lucide-react';

const CATEGORIES = [
  'Semua Topik',
  'Nutrisi & Gizi Klinis',
  'Kesehatan Jantung',
  'Infus Vitamin & Mikronutrien',
  'Perawatan Luka Medis',
];

const ARTICLES = [
  {
    category: 'Nutrisi & Gizi Klinis',
    title: 'Mengapa Pembatasan Kalori Ekstrem Justru Menurunkan Laju Metabolisme?',
    snippet:
      'Penjelasan spesialis gizi klinis mengenai pentingnya menjaga massa otot saat menurunkan berat badan agar metabolisme basal tidak melambat.',
    author: 'dr. Spesialis Gizi Klinis (Sp.GK)',
    date: '28 Oktober 2026',
    readTime: '4 menit baca',
  },
  {
    category: 'Infus Vitamin & Mikronutrien',
    title: 'Perbedaan Bioavailabilitas Vitamin Oral vs Infus Intravena Terukur',
    snippet:
      'Penyerapan mikronutrien melalui jalur intravena memberikan ketersediaan hayati optimal bagi tubuh pada fase kelelahan berat atau pemulihan fisik.',
    author: 'Tim Medis VidaBoost',
    date: '24 Oktober 2026',
    readTime: '5 menit baca',
  },
  {
    category: 'Kesehatan Jantung',
    title: 'Tanda Tekanan Darah Pre-Hipertensi yang Kerap Muncul Tanpa Gejala',
    snippet:
      'Tekanan darah di atas 120/80 mmHg sudah memerlukan perhatian khusus. Langkah deteksi dini melalui rekam jantung EKG dan pengendalian asupan natrium.',
    author: 'dr. Spesialis Jantung (Sp.JP)',
    date: '19 Oktober 2026',
    readTime: '6 menit baca',
  },
  {
    category: 'Perawatan Luka Medis',
    title: 'Prinsip Perawatan Luka Modern: Keunggulan Balutan Moist Healing',
    snippet:
      'Mengapa luka pasca-operasi dan luka diabetes beregenerasi lebih cepat menggunakan balutan hidrokoloid dibandingkan teknik kasa konvensional.',
    author: 'Ners Spesialis Wound Care',
    date: '15 Oktober 2026',
    readTime: '5 menit baca',
  },
];

export default function HealthpediaSection() {
  const [selectedCat, setSelectedCat] = useState('Semua Topik');

  const filteredArticles =
    selectedCat === 'Semua Topik'
      ? ARTICLES
      : ARTICLES.filter((art) => art.category === selectedCat);

  return (
    <section id="healthpedia" className="py-16 bg-slate-50 font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 text-xs font-semibold mb-2">
              {/* <BookOpen className="w-3.5 h-3.5 text-[#1c2674]" /> */}
              <span>Edukasi Medis Ilmiah</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Healthpedia Vida Medical Centre
            </h2>
            <p className="mt-2 text-slate-600 text-sm leading-relaxed">
              Panduan kesehatan berbasis bukti ilmiah yang ditinjau langsung oleh dokter spesialis dan tenaga kesehatan bersertifikat.
            </p>
          </div>

          <a
            href="#doctor-search"
            className="mt-4 md:mt-0 inline-flex items-center space-x-1 text-xs font-semibold text-[#1c2674] hover:underline"
          >
            <span>Semua Artikel Medis</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 mb-8">
          {CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${selectedCat === cat
                  ? 'bg-[#1c2674] text-white shadow-xs'
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
            {filteredArticles.map((art, idx) => (
              <article
                key={idx}
                className="bg-white rounded-xl p-5 border border-slate-200 hover:border-slate-300 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">
                    {art.category}
                  </span>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug mt-2">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {art.snippet}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                  <div className="flex items-center space-x-1.5 font-medium text-slate-700">
                    <UserCheck className="w-3.5 h-3.5 text-[#1c2674]" />
                    <span>Ditinjau: {art.author}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>{art.date}</span>
                    <span>{art.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
