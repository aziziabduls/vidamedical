'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Stethoscope,
  TestTube2,
  Scan,
  ShieldCheck,
  Home,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface ComprehensiveServicesProps {
  onSelectService: (category: string, option: string) => void;
}

const CATEGORIES = [
  {
    id: 'vidaboost',
    label: 'VidaBoost IV Therapy',
    title: 'Lounge Infus Vitamin & Mikronutrien',
    subtitle: 'Rehidrasi seluler dan booster imun dengan formulasi resmi BPOM di ruang lounge privat yang tenang.',
    items: [
      {
        name: 'VidaBoost Silver (Daily Energy)',
        price: 'Rp 450.000',
        popular: false,
        features: [
          'Infus cairan elektrolit isotonik 500ml',
          'Vitamin B-Complex lengkap (B1, B6, B12)',
          'Vitamin C 500mg resmi BPOM',
          'Pemulihan hidrasi dan kelelahan kerja',
          'Pemeriksaan tekanan darah awal',
        ],
      },
      {
        name: 'VidaBoost Gold (Immune Shield)',
        price: 'Rp 750.000',
        popular: true,
        features: [
          'Vitamin C murni 1000mg',
          'High-Dose B-Complex & Zinc aktif',
          'Antioksidan pertahanan sel imun',
          'Perlindungan optimal stamina tubuh',
          'Sofa reclining privat & herbal tea',
        ],
      },
      {
        name: 'VidaBoost Platinum (Glow & Detox)',
        price: 'Rp 1.250.000',
        popular: false,
        features: [
          'Semua kandungan paket Gold',
          'Injeksi Glutathione murni farmasi',
          'Alpha Lipoic Acid (ALA) detoksifikasi hepar',
          'Mencerahkan rona kulit & regenerasi kolagen',
          'Konsultasi dokter sebelum tindakan',
        ],
      },
      {
        name: 'VidaBoost Diamond (Cellular Rejuvenation)',
        price: 'Rp 1.950.000',
        popular: false,
        features: [
          'Formulasi Premium Cellular Multi-Antioxidant',
          'NAD+ Precursor & mikronutrien mega-dosis',
          'CoEnzyme Q10 & kompleks asam amino',
          'Regenerasi mitokondria & stamina puncak',
          'Gratis analisis komposisi tubuh InBody',
        ],
      },
    ],
  },
  {
    id: 'mcu',
    label: 'MCU VidaHealth',
    title: 'Paket Medical Check Up Terpadu',
    subtitle: 'Deteksi dini faktor risiko penyakit kardiovaskular, sindrom metabolik, dan fungsi organ vital.',
    items: [
      {
        name: 'VidaHealth Silver (Skrining Dasar)',
        price: 'Rp 650.000',
        popular: false,
        features: [
          'Konsultasi dokter umum & fisik diagnostik',
          'Darah lengkap 18 parameter',
          'Urin lengkap rutin',
          'Fungsi ginjal: Ureum & Kreatinin',
          'Profil lemak: Kolesterol total & Asam urat',
          'Bonus analisis komposisi tubuh InBody',
        ],
      },
      {
        name: 'VidaHealth Gold (Eksekutif Komplit)',
        price: 'Rp 1.650.000',
        popular: true,
        features: [
          'Semua pemeriksaan paket Silver',
          'Rekam Jantung Elektrokardiogram (EKG 12-Lead)',
          'Rontgen Thorax digital paru & jantung',
          'Gula Darah Puasa & HbA1c (rerata 3 bulan)',
          'Fungsi hati: SGOT, SGPT & Bilirubin',
          'Konsultasi Dokter Spesialis Penyakit Dalam',
        ],
      },
      {
        name: 'VidaHealth Platinum (Kardiovaskular)',
        price: 'Rp 2.850.000',
        popular: false,
        features: [
          'Semua pemeriksaan paket Gold',
          'USG Abdomen organ dalam lengkap',
          'Profil lipid fraksinasi (LDL, HDL, Trigliserida)',
          'Kalkulasi risiko kardiovaskular 10 tahun',
          'Konsultasi Spesialis Jantung & Pembuluh Darah',
        ],
      },
      {
        name: 'VidaHealth Corporate Executive',
        price: 'Tarif Korporasi',
        popular: false,
        features: [
          'Disesuaikan dengan kebutuhan perusahaan',
          'Tersedia on-site di kantor / Gedung The Vida',
          'Laporan resume kesehatan karyawan eksekutif',
          'Dukungan penjaminan asuransi rekanan',
          'Dokter PIC dedicated untuk korporasi',
        ],
      },
    ],
  },
  {
    id: 'homecare',
    label: 'Vida at Home (Homecare)',
    title: 'Layanan Perawat & Dokter Datang ke Rumah',
    subtitle: 'Perawatan medis profesional di kediaman Anda di Kebon Jeruk & sekitarnya dengan perawat berizin resmi.',
    items: [
      {
        name: 'Kunjungan Dokter Umum ke Rumah',
        price: 'Rp 400.000',
        popular: false,
        features: [
          'Pemeriksaan tanda vital komprehensif',
          'Diagnosis dan resep obat farmasi',
          'Rujukan pemeriksaan lanjutan jika diperlukan',
          'Alat diagnostik portabel higienis',
        ],
      },
      {
        name: 'Perawatan Luka Medis (Wound Care)',
        price: 'Mulai Rp 350.000',
        popular: true,
        features: [
          'Perawatan luka diabetes (Ulkus Diabetikum)',
          'Perawatan luka pasca operasi besar / caesar',
          'Luka tekan tirah baring (Dekubitus)',
          'Dressing modern hidrokoloid / hidrogel steril',
        ],
      },
      {
        name: 'Pemasangan Selang NGT & Kateter',
        price: 'Mulai Rp 400.000',
        popular: false,
        features: [
          'Pemasangan selang makan NGT steril',
          'Penggantian kateter urin Foley steril',
          'Dilakukan oleh ners bersertifikasi khusus',
          'Edukasi perawatan harian bagi keluarga',
        ],
      },
      {
        name: 'VidaBoost Home Infusion Service',
        price: 'Mulai Rp 550.000',
        popular: false,
        features: [
          'Infus Vitamin VidaBoost di tempat tinggal Anda',
          'Pendampingan perawat selama infus berlangsung',
          'Kenyamanan privasi keluarga tanpa macet',
          'Konfirmasi jadwal cepat via WhatsApp',
        ],
      },
    ],
  },
  {
    id: 'lab',
    label: 'Laboratorium & Tes',
    title: 'Pemeriksaan Laboratorium Patologi',
    subtitle: 'Hasil uji darah dan kimia klinik akurat, terkalibrasi, dan terkirim langsung ke akun rekam medis pasien.',
    items: [
      {
        name: 'Panel Kolesterol & Lipid Lengkap',
        price: 'Rp 280.000',
        popular: false,
        features: [
          'Kolesterol total',
          'Kolesterol HDL (baik)',
          'Kolesterol LDL (jahat)',
          'Trigliserida',
          'Rasio risiko kardiovaskular',
        ],
      },
      {
        name: 'Skrining Diabetes Mellitus Komplit',
        price: 'Rp 320.000',
        popular: true,
        features: [
          'Glukosa Darah Puasa (GDP)',
          'Glukosa 2 Jam Setelah Makan (GD2PP)',
          'HbA1c (rerata pengendalian 3 bulan)',
          'Pemeriksaan urin glukosa & mikroalbumin',
        ],
      },
      {
        name: 'Panel Fungsi Organ Hati & Ginjal',
        price: 'Rp 390.000',
        popular: false,
        features: [
          'Fungsi hati: SGOT & SGPT',
          'Fungsi ginjal: Ureum & Kreatinin serum',
          'Estimasi eGFR (laju filtrasi ginjal)',
          'Kadar asam urat serum',
        ],
      },
      {
        name: 'Panel Alergi IgE Multi-Alergen',
        price: 'Rp 1.250.000',
        popular: false,
        features: [
          'Skrining alergen makanan laut, telur, susu',
          'Alergen inhalan debu, tungau & bulu hewan',
          'Konsultasi interpretasi hasil dengan dokter',
          'Panduan pencegahan reaksi hipersensitivitas',
        ],
      },
    ],
  },
];

export default function ComprehensiveServices({ onSelectService }: ComprehensiveServicesProps) {
  const [activeCategoryId, setActiveCategoryId] = useState('vidaboost');

  const activeCategory = CATEGORIES.find((cat) => cat.id === activeCategoryId) || CATEGORIES[0];

  return (
    <section id="comprehensive-services" className="py-16 bg-white font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
            <span>Paket & Tarif Transparan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Pilihan Layanan Klinis & Skrining
          </h2>
          <p className="mt-2 text-slate-600 text-sm leading-relaxed">
            Rincian paket terapi infus mikronutrien, pemeriksaan kesehatan preventif, dan perawatan homecare di Gedung The Vida.
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-slate-200 pb-4">
          {CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCategoryId;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategoryId(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#0472B5] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Active Category Description Bar */}
        <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {activeCategory.title}
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              {activeCategory.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelectService(activeCategory.id, activeCategory.title)}
            className="shrink-0 px-3.5 py-2 rounded-lg bg-[#0472B5] hover:bg-[#035c93] text-white font-medium text-xs transition-colors flex items-center space-x-1.5 justify-center cursor-pointer shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Reservasi Paket Ini</span>
          </button>
        </div>

        {/* Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategoryId}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {activeCategory.items.map((item, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-5 border flex flex-col justify-between transition-colors ${
                  item.popular
                    ? 'bg-white border-[#0472B5] shadow-sm ring-1 ring-[#0472B5]/15'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-bold text-sm text-slate-900 leading-snug">
                      {item.name}
                    </h4>
                    {item.popular && (
                      <span className="shrink-0 px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold text-[10px]">
                        Paling Dipilih
                      </span>
                    )}
                  </div>

                  <div className="mt-3 pb-3 border-b border-slate-100">
                    <div className="text-[11px] text-slate-500 font-normal">Investasi biaya:</div>
                    <div className="text-lg font-bold text-[#0472B5] tabular-nums mt-0.5">
                      {item.price}
                    </div>
                  </div>

                  <div className="mt-3.5 space-y-2">
                    <span className="text-[11px] font-semibold text-slate-700 block">
                      Rincian pemeriksaan:
                    </span>
                    {item.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start space-x-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0472B5] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => onSelectService(activeCategory.id, item.name)}
                    className={`w-full py-2 px-3 rounded-lg font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer ${
                      item.popular
                        ? 'bg-[#0472B5] hover:bg-[#035c93] text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200/80 text-slate-800'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Pilih Paket</span>
                  </motion.button>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
