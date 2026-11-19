'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { TRANSITIONS } from '@/lib/motion';

const FAQS = [
  {
    q: 'Apakah terapi infus vitamin VidaBoost memerlukan konsultasi dokter sebelum tindakan?',
    a: 'Ya. Seluruh pasien akan menjalani skrining tanda vital singkat (tekanan darah, detak jantung, dan riwayat alergi) oleh tenaga medis sebelum infus dimulai. Seluruh formula vitamin, elektrolit, dan antioksidan menggunakan sediaan farmasi steril resmi terdaftar BPOM.',
  },
  {
    q: 'Apa saja cakupan Paket Medical Check Up (MCU) VidaHealth?',
    a: 'Pemeriksaan fisik dokter umum, skrining visus mata, laboratorium darah lengkap (profil lipid kolesterol, fungsi hati SGOT/SGPT, fungsi ginjal ureum/kreatinin/asam urat, gula darah puasa), urinalisis, EKG jantung, serta bonus analisis komposisi tubuh InBody tanpa biaya tambahan.',
  },
  {
    q: 'Bagaimana prosedur pemesanan Layanan Home Care ke rumah?',
    a: 'Anda dapat mengisi formulir buat janji di website ini atau langsung menghubungi WhatsApp 0811 5750 260. Informasikan jenis tindakan yang dibutuhkan (perawatan luka pasca bedah/diabetes, pemasangan NGT, kateter urin, atau infus vitamin). Tim perawat berlisensi kami akan datang sesuai jadwal dengan peralatan steril.',
  },
  {
    q: 'Apakah layanan vaksinasi tersedia untuk keluarga maupun perusahaan?',
    a: 'Ya. Vida Medical Centre menyediakan imunisasi rutin dewasa dan anak di klinik maupun kunjungan kolektif on-site untuk perusahaan dengan sistem rantai dingin (cold chain) terstandar.',
  },
  {
    q: 'Di mana lokasi klinik Vida Medical Centre dan kapan jam operasionalnya?',
    a: 'Klinik berlokasi di Gedung The Vida Lantai 6, Jl. Perjuangan No.8, Kebon Jeruk, Jakarta Barat 11530. Kami melayani setiap Senin hingga Sabtu pukul 08.00 – 20.00 WIB, serta janji temu khusus Home Care pada hari Minggu.',
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-slate-200/80">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0472B5]">
            <HelpCircle className="w-4 h-4" strokeWidth={1.5} />
            <span>Pertanyaan umum</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#0B2545] tracking-tight">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-sm text-slate-600">
            Informasi praktis seputar layanan medis, persiapan check up, dan prosedur home care di Vida Medical Centre.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 overflow-hidden bg-[#F6F9FC]"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-medium text-[#0B2545] text-sm hover:text-[#0472B5] transition-colors cursor-pointer bg-white"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-150 ${
                      isOpen ? 'rotate-180 text-[#0472B5]' : ''
                    }`}
                    strokeWidth={1.5}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={TRANSITIONS.fast}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-white">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
