'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, CheckCircle2, ArrowRight } from 'lucide-react';

interface PatientStorySectionProps {
  onOpenBooking: (category: string, option: string) => void;
}

const STORIES = [
  {
    patientName: 'Andreas Halim',
    age: '44 tahun',
    storyTitle: 'Pemulihan Glukosa Prediabetes & Penurunan 14 Kg Lemak Tubuh',
    doctor: 'dr. Spesialis Gizi Klinis (Sp.GK)',
    unit: 'Unit VidaFit, Gedung The Vida',
    tag: '#BersamaVida',
    quote:
      'Di VidaFit, dokter menyusun rencana makan berdasarkan hasil komposisi tubuh InBody dan profil metabolik saya. Tidak ada diet ekstrem yang menyiksa. Dalam 4 bulan, lingkar pinggang berkurang drastis dan HbA1c saya kembali normal.',
    outcomes: [
      'Turun 14 kg lemak tanpa penurunan massa otot rangka',
      'Nilai HbA1c kembali ke kisaran normal',
      'Pola makan berkelanjutan untuk aktivitas kantor',
    ],
  },
  {
    patientName: 'Maria Wijaya',
    age: '38 tahun',
    storyTitle: 'Pemulihan Stamina Kerja dengan Terapi Infus Vitamin Terukur',
    doctor: 'dr. Spesialis Penyakit Dalam',
    unit: 'Lounge VidaBoost IV Therapy',
    tag: '#VidaBoostStory',
    quote:
      'Kondisi burnout dan kelelahan kronis membuat daya tahan tubuh saya sering drop. Fasilitas lounge infus di Gedung The Vida sangat tenang dan higienis. Setelah beberapa sesi teratur, stamina harian saya jauh lebih stabil.',
    outcomes: [
      'Pemberian mikronutrien diawasi dokter & perawat profesional',
      'Suasana ruang perawatan privat dengan reclining sofa',
      'Bahan farmasi terstandarisasi resmi BPOM',
    ],
  },
];

export default function PatientStorySection({ onOpenBooking }: PatientStorySectionProps) {
  return (
    <section id="patient-story" className="py-16 bg-white font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold mb-2">
            {/* <Heart className="w-3.5 h-3.5 text-rose-600" /> */}
            <span>Kisah Pemulihan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Pengalaman Pasien di Vida Medical Centre
          </h2>
          <p className="mt-2 text-slate-600 text-sm leading-relaxed">
            Perjalanan pemulihan kesehatan dan pencapaian kebugaran nyata bersama tim medis profesional kami.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {STORIES.map((story, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-semibold text-[#0472B5]">
                    {story.tag}
                  </span>
                  <span className="text-slate-500 font-normal">
                    {story.unit}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {story.storyTitle}
                </h3>

                <blockquote className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed pl-3 border-l-2 border-[#0472B5]/30">
                  “{story.quote}”
                </blockquote>

                <div className="mt-4 pt-4 border-t border-slate-200/60 space-y-2">
                  <span className="text-[11px] font-semibold text-slate-700 block">
                    Hasil perawatan medis:
                  </span>
                  {story.outcomes.map((item, oIdx) => (
                    <div key={oIdx} className="flex items-start space-x-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0472B5] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-semibold text-slate-900">
                    {story.patientName} ({story.age})
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Konsultasi bersama {story.doctor}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenBooking('story', `Konsultasi: ${story.patientName}`)}
                  className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-medium transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <span>Mulai Program</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
