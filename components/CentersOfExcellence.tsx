'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Sparkles,
  Activity,
  Baby,
  Stethoscope,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Syringe,
  Home,
  TestTube2,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface CentersOfExcellenceProps {
  onOpenBooking: (category: string, option: string) => void;
}

const COE_LIST = [
  {
    id: 'vidaboost',
    title: 'VidaBoost IV Therapy & Immune Centre',
    category: 'Infus Vitamin & Mikronutrien',
    badge: 'Layanan Terpopuler',
    stats: '100% Bahan Medis Resmi BPOM',
    description:
      'Lounge infus mikronutrien eksklusif di Gedung The Vida dengan kursi sofa medis privat. Penyerapan 100% langsung ke sirkulasi darah tanpa degradasi saluran cerna.',
    procedures: [
      'VidaBoost Silver: Rehidrasi elektrolit & pemulihan lelah',
      'VidaBoost Gold: Vitamin C murni 1000mg & Zinc pertahanan imun',
      'VidaBoost Platinum: Antioksidan Glutathione & pencerah kulit',
      'VidaBoost Diamond: Formulasi Cellular NAD+ & anti-aging',
    ],
    location: 'Lounge Mezzanine, Gedung The Vida',
  },
  {
    id: 'vidafit',
    title: 'VidaFit Weight Management & Gizi Klinis',
    category: 'Manajemen Berat Badan Medis',
    badge: 'Dokter Spesialis Gizi Klinis',
    stats: 'Analisis Medis InBody 770',
    description:
      'Program transformasi komposisi tubuh berbasis medis. Evaluasi persentase lemak visceral, massa otot segmental, dan penyusunan pola nutrisi personal yang realistis.',
    procedures: [
      'Pemindaian komposisi tubuh dengan InBody 770',
      'Konsultasi tatap muka Dokter Spesialis Gizi Klinis (Sp.GK)',
      'Meal plan terstruktur berbasis laju metabolisme basal (BMR)',
      'Pemantauan lingkar perut, profil lipid & glukosa berkala',
    ],
    location: 'Poliklinik Gizi Klinis, Gedung The Vida',
  },
  {
    id: 'vidahealth',
    title: 'VidaHealth Medical Check Up',
    category: 'Skrining Preventif Komprehensif',
    badge: 'Hasil Hari yang Sama',
    stats: 'Bonus Body Scan InBody',
    description:
      'Pemeriksaan skrining preventif berkala untuk mendeteksi dini risiko kardiovaskular, sindrom metabolik, dislipidemia, dan disfungsi organ hati maupun ginjal.',
    procedures: [
      'MCU Silver: Pemeriksaan fisik & profil lipid rutin',
      'MCU Gold: Skrining eksekutif + Rekam Jantung EKG 12-Lead',
      'MCU Platinum: Skrining komplit + USG Abdomen & Evaluasi Spesialis',
      'Konseling laporan medis mendalam bersama dokter',
    ],
    location: 'Unit MCU, Gedung The Vida Lt. Ground',
  },
  {
    id: 'jantung',
    title: 'Klinik Jantung & Kardiovaskular Preventif',
    category: 'Kardiologi & Hipertensi',
    badge: 'Skrining Risiko 10 Tahun',
    stats: 'Elektrokardiogram Digital',
    description:
      'Deteksi dan penatalaksanaan gangguan fungsi jantung, aritmia, hipertensi esensial, serta evaluasi risiko aterosklerosis pembuluh koroner.',
    procedures: [
      'Pemeriksaan Elektrokardiogram (EKG 12-Lead)',
      'Stratifikasi risiko kardiovaskular Framingham',
      'Pemeriksaan profil lipid fraksinasi lengkap',
      'Konsultasi Spesialis Jantung & Pembuluh Darah (Sp.JP)',
    ],
    location: 'Poli Spesialis Jantung, Gedung The Vida',
  },
  {
    id: 'homecare',
    title: 'Vida at Home (Homecare Medis)',
    category: 'Perawat & Dokter ke Rumah',
    badge: 'Area Kebon Jeruk & Sekitarnya',
    stats: 'Perawat Berizin Praktik Resmi',
    description:
      'Layanan kunjungan dokter dan perawatan luka modern di tempat tinggal Anda. Memberikan kenyamanan bagi pasien rawat jalan, lansia, dan pasca operasi.',
    procedures: [
      'Perawatan luka diabetes (modern moist dressing)',
      'Perawatan luka pasca operasi besar / sectio caesarea',
      'Pemasangan & penggantian selang makan NGT steril',
      'Pemasangan & penggantian kateter urin Foley steril',
    ],
    location: 'Unit Siaga Homecare Kebon Jeruk',
  },
  {
    id: 'vaksinasi',
    title: 'VidaShield Imunisasi & Vaksinasi',
    category: 'Pencegahan Infeksi Tropis',
    badge: 'Cold-Chain Terverifikasi',
    stats: 'Vaksin Resmi Biofarma / Importir',
    description:
      'Layanan imunisasi preventif untuk dewasa, lansia, dan anak dengan kontrol rantai dingin ketat untuk menjaga stabilitas dan efikasi vaksin.',
    procedures: [
      'Vaksin Influenza Quadrivalent (4 strain flu tahunan)',
      'Vaksin Kanker Serviks HPV 9-Valen (Gardasil 9)',
      'Vaksin Hepatitis A & B Dewasa',
      'Vaksin Pneumokokus (PCV13) pelindung paru-paru',
    ],
    location: 'Unit Vaksinasi Gedung The Vida',
  },
  {
    id: 'ibu-anak',
    title: 'Pusat Kesehatan Ibu & Anak',
    category: 'Pediatrik & Obstetri',
    badge: 'Lingkungan Higienis & Nyaman',
    stats: 'Dokter Spesialis Anak & Kandungan',
    description:
      'Pemantauan tumbuh kembang anak, imunisasi rutin IDAI, dan pemeriksaan kesehatan kehamilan dalam suasana klinik yang ramah keluarga.',
    procedures: [
      'Konsultasi tumbuh kembang & kurva berat badan anak',
      'Pemeriksaan kehamilan rutin & USG obstetri dasar',
      'Imunisasi dasar dan lanjutan bayi & balita',
      'Konsultasi laktasi dan pendampingan nutrisi anak',
    ],
    location: 'Poli Ibu & Anak, Gedung The Vida',
  },
  {
    id: 'laboratorium',
    title: 'Laboratorium Patologi & Diagnostik',
    category: 'Diagnostik Terpadu',
    badge: 'Sistem Terintegrasi Online',
    stats: 'Hasil Terenkripsi PDF',
    description:
      'Fasilitas uji darah rutin dan kimia klinik dengan penganalisis otomatis presisi tinggi. Hasil terhubung langsung ke portal rekam medis pasien.',
    procedures: [
      'Pemeriksaan Darah Lengkap otomatis 18 parameter',
      'Skrining diabetes: Gula Darah Puasa, 2JPP & HbA1c',
      'Fungsi hati (SGOT, SGPT) & fungsi ginjal (Ureum, Kreatinin)',
      'USG abdomen organ dalam beresolusi tinggi',
    ],
    location: 'Laboratorium Sentral Gedung The Vida',
  },
];

export default function CentersOfExcellence({ onOpenBooking }: CentersOfExcellenceProps) {
  const [selectedCoE, setSelectedCoE] = useState(COE_LIST[0]);

  return (
    <section id="coe" className="py-16 bg-slate-50 font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-slate-200 text-[#0472B5] text-xs font-semibold mb-2">
            {/* <ShieldCheck className="w-3.5 h-3.5" /> */}
            <span>Pilar Klinis Unggulan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Pusat Layanan Unggulan Vida Medical Centre
          </h2>
          <p className="mt-2 text-slate-600 text-sm leading-relaxed">
            Delapan unit spesialisasi berstandar klinis teruji di Gedung The Vida, didukung fasilitas diagnostik terkini dan dokter berpengalaman.
          </p>
        </div>

        {/* Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Quick Pillar Navigator List */}
          <div className="lg:col-span-5 space-y-2">
            {COE_LIST.map((coe) => {
              const isSelected = selectedCoE.id === coe.id;
              return (
                <button
                  key={coe.id}
                  type="button"
                  onClick={() => setSelectedCoE(coe)}
                  className={`w-full text-left p-4 rounded-xl border transition-colors cursor-pointer flex items-center justify-between ${isSelected
                      ? 'bg-white border-[#0472B5] shadow-sm ring-1 ring-[#0472B5]/15'
                      : 'bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300'
                    }`}
                >
                  <div>
                    <div className="text-[11px] font-medium text-slate-500">
                      {coe.category}
                    </div>
                    <div className={`text-xs sm:text-sm font-semibold mt-0.5 ${isSelected ? 'text-[#0472B5]' : 'text-slate-900'}`}>
                      {coe.title}
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-[#0472B5] translate-x-0.5' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>

          {/* Right: Focused Detail Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCoE.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-semibold text-xs">
                    {selectedCoE.badge}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {selectedCoE.location}
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-bold text-slate-900 leading-snug">
                    {selectedCoE.title}
                  </h3>
                  <div className="mt-1 text-xs text-slate-500 font-medium flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{selectedCoE.stats}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 mt-3.5 leading-relaxed">
                    {selectedCoE.description}
                  </p>
                </div>

                {/* Procedures list */}
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <div className="text-xs font-semibold text-slate-700 mb-3">
                    Prosedur & Cakupan Layanan:
                  </div>
                  <div className="space-y-2">
                    {selectedCoE.procedures.map((proc, idx) => (
                      <div
                        key={idx}
                        className="flex items-start space-x-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0472B5] shrink-0 mt-0.5" />
                        <span>{proc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => onOpenBooking('coe', `Janji Temu: ${selectedCoE.title}`)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#0472B5] hover:bg-[#035c93] text-white font-semibold text-xs text-center shadow-sm transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>Jadwalkan Konsultasi</span>
                  </motion.button>
                  <a
                    href="https://wa.me/628118951181"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-xs text-center transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <span>Tanya Resepsionis (WA)</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
