'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, ShieldCheck, HeartHandshake } from 'lucide-react';

const STATS = [
  {
    value: 'Gedung The Vida',
    label: 'Fasilitas Eksklusif',
    detail: 'Lt. Ground & Mezzanine Kebon Jeruk',
  },
  {
    value: '25+',
    label: 'Dokter Spesialis & Tim Medis',
    detail: 'Gizi Klinis, Jantung, Penyakit Dalam & Anak',
  },
  {
    value: '50+',
    label: 'Mitra Asuransi & Korporasi',
    detail: 'Dukungan fasilitas klaim langsung & cashless',
  },
  {
    value: '15.000+',
    label: 'Pasien Terlayani',
    detail: '99.2% indeks kepuasan pelayanan medis',
  },
];

export default function VidaStats() {
  return (
    <section className="bg-white border-b border-slate-200 py-8 relative z-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {STATS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`pt-4 sm:pt-0 ${idx > 0 ? 'sm:pl-6' : ''}`}
            >
              <div className="text-xl sm:text-2xl font-bold text-[#1c2674] tracking-tight tabular-nums">
                {item.value}
              </div>
              <div className="text-xs font-semibold text-slate-800 mt-1">
                {item.label}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
