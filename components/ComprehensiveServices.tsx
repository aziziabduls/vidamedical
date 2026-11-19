'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Calendar } from 'lucide-react';
import { TRANSITIONS } from '@/lib/motion';

interface ComprehensiveServicesProps {
  onSelectService: (category: string, option: string) => void;
}

const CATEGORIES = [
  {
    id: 'vidaboost',
    label: 'Vitamin Booster',
    title: 'Lounge Infus Vitamin & Mikronutrien (VidaBoost)',
    subtitle:
      'Rehidrasi seluler dan dukungan daya tahan tubuh dengan formulasi resmi BPOM di ruang lounge privat.',
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
          'Membantu menjaga kesehatan sel kulit',
          'Konsultasi dokter sebelum tindakan',
        ],
      },
      {
        name: 'VidaBoost Diamond (Cellular Rejuvenation)',
        price: 'Rp 1.950.000',
        popular: false,
        features: [
          'Formulasi Cellular Multi-Antioxidant',
          'NAD+ Precursor & mikronutrien dosis terukur',
          'CoEnzyme Q10 & kompleks asam amino',
          'Dukungan pemulihan stamina menyeluruh',
          'Gratis analisis komposisi tubuh InBody',
        ],
      },
    ],
  },
  {
    id: 'vidahealth',
    label: 'Medical Check Up',
    title: 'Paket Medical Check Up Terpadu (VidaHealth)',
    subtitle:
      'Deteksi dini faktor risiko penyakit kardiovaskular, sindrom metabolik, dan fungsi organ vital.',
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
          'Laporan resume kesehatan karyawan',
          'Dukungan penjaminan asuransi rekanan',
          'Dokter PIC dedicated untuk korporasi',
        ],
      },
    ],
  },
  {
    id: 'homecare',
    label: 'Home Care',
    title: 'Layanan Perawat & Dokter Datang ke Rumah',
    subtitle:
      'Perawatan medis profesional di kediaman Anda di Kebon Jeruk & sekitarnya dengan perawat berizin resmi.',
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
          'Dilakukan oleh perawat bersertifikasi khusus',
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
          'Kenyamanan privasi keluarga di rumah',
          'Konfirmasi jadwal cepat via WhatsApp',
        ],
      },
    ],
  },
  {
    id: 'vaksinasi',
    label: 'Vaksinasi & Lab',
    title: 'Imunisasi Keluarga & Pemeriksaan Laboratorium',
    subtitle:
      'Perlindungan vaksin resmi dengan kontrol rantai dingin ketat serta panel uji laboratorium patologi.',
    items: [
      {
        name: 'VidaShield Influenza Quadrivalent',
        price: 'Hubungi Klinik',
        popular: true,
        features: [
          'Proteksi 4 strain virus influenza WHO',
          'Dosis tahunan untuk dewasa & anak >6 bulan',
          'Skrining fisik oleh dokter sebelum injeksi',
          'Tersedia di klinik atau kunjungan home care',
        ],
      },
      {
        name: 'Panel Kolesterol & Lipid Lengkap',
        price: 'Rp 280.000',
        popular: false,
        features: [
          'Kolesterol total, HDL, dan LDL',
          'Kadar trigliserida serum',
          'Rasio risiko kardiovaskular',
          'Hasil digital terintegrasi rekam medis',
        ],
      },
      {
        name: 'Skrining Diabetes Mellitus Komplit',
        price: 'Rp 320.000',
        popular: false,
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
    ],
  },
];

export default function ComprehensiveServices({ onSelectService }: ComprehensiveServicesProps) {
  const [activeCategoryId, setActiveCategoryId] = useState('vidaboost');
  const activeCategory = CATEGORIES.find((cat) => cat.id === activeCategoryId) || CATEGORIES[0];

  return (
    <section id="comprehensive-services" className="py-12 sm:py-16 bg-white border-t border-slate-200/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-3 text-xs font-medium text-[#0472B5] mb-2">
            <span>Paket & tarif transparan</span>
            <span className="w-10 h-px bg-[#0472B5]/35" aria-hidden="true" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#0B2545] tracking-tight">
            Pilihan Layanan Klinis & Skrining
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
            Rincian paket terapi infus mikronutrien, pemeriksaan kesehatan preventif, vaksinasi, dan perawatan home care di Gedung The Vida.
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-slate-200/80">
          {CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCategoryId;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategoryId(cat.id)}
                className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  isActive ? 'text-white' : 'text-slate-600 hover:text-[#0B2545] bg-[#F6F9FC]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="comprehensive-service-tab"
                    transition={TRANSITIONS.spring}
                    className="absolute inset-0 rounded-full bg-[#0472B5]"
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Bar */}
        <div className="mb-6 p-5 rounded-2xl bg-[#F6F9FC] border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-[#0B2545]">{activeCategory.title}</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">{activeCategory.subtitle}</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => onSelectService(activeCategory.id, activeCategory.title)}
            className="shrink-0 px-5 py-2.5 rounded-full bg-[#0472B5] hover:bg-[#035c93] text-white font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" strokeWidth={1.5} />
            <span>Reservasi Paket Ini</span>
          </motion.button>
        </div>

        {/* Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategoryId}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={TRANSITIONS.fast}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {activeCategory.items.map((item, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-5 border flex flex-col justify-between transition-colors bg-white ${
                  item.popular
                    ? 'border-[#0472B5] ring-1 ring-[#0472B5]/15 shadow-xs'
                    : 'border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-semibold text-sm text-[#0B2545] leading-snug">
                      {item.name}
                    </h4>
                    {item.popular && (
                      <span className="shrink-0 px-2 py-0.5 rounded-md bg-[#EBF4FB] text-[#0472B5] font-medium text-[11px]">
                        Populer
                      </span>
                    )}
                  </div>

                  <div className="mt-3 pb-3 border-b border-slate-100">
                    <div className="text-xs text-slate-500">Biaya layanan</div>
                    <div className="text-lg font-semibold text-[#0472B5] tabular-nums mt-0.5">
                      {item.price}
                    </div>
                  </div>

                  <div className="mt-3.5 space-y-2">
                    <span className="text-xs font-medium text-[#0B2545] block">
                      Rincian pemeriksaan
                    </span>
                    {item.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0472B5] shrink-0 mt-0.5" strokeWidth={1.5} />
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
                    className={`w-full py-2.5 px-4 rounded-full font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                      item.popular
                        ? 'bg-[#0472B5] hover:bg-[#035c93] text-white'
                        : 'bg-[#EBF4FB] hover:bg-[#0472B5] text-[#0472B5] hover:text-white'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
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
