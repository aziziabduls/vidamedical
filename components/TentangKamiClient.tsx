'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Stethoscope,
  ShieldCheck,
  FileText,
  Home,
  ArrowRight,
  MapPin,
  Clock,
  BookOpen,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import CTABanner from '@/components/CTABanner';
import { useBooking } from '@/components/BookingProvider';
import { CLINIC_CONTACT } from '@/lib/clinic-data';
import {
  fadeUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
  VIEWPORT_ONCE,
} from '@/lib/motion';

const CARE_PILLARS = [
  {
    icon: Stethoscope,
    title: 'Pendekatan Klinis yang Komunikatif',
    description:
      'Setiap konsultasi dirancang tanpa tergesa-gesa sehingga pasien memahami hasil pemeriksaan dan rencana perawatan dengan jelas.',
  },
  {
    icon: ShieldCheck,
    title: 'Standar Farmasi & Sterilitas Resmi',
    description:
      'Seluruh sediaan infus vitamin, vaksin rantai dingin, serta perlengkapan tindakan medis terdaftar BPOM dan menggunakan kit steril sekali pakai.',
  },
  {
    icon: FileText,
    title: 'Diagnostik & Laporan Terstruktur',
    description:
      'Hasil uji laboratorium darah lengkap, EKG jantung, dan pemindaian komposisi tubuh InBody terdokumentasi rapi untuk evaluasi berkala.',
  },
  {
    icon: Home,
    title: 'Fleksibel di Klinik maupun di Rumah',
    description:
      'Kenyamanan lounge privat di Gedung The Vida Kebon Jeruk dilengkapi layanan Home Care perawat dan dokter langsung ke rumah Anda.',
  },
];

export default function TentangKamiClient() {
  const { openBooking } = useBooking();

  return (
    <main className="flex-1 bg-[#F6F9FC]">
      <PageHeader
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Tentang Kami' },
        ]}
        eyebrow="Tentang kami"
        title="Pelayanan Medis yang Dekat, Nyaman, dan Terpercaya"
        description="Vida Medical Centre hadir di Gedung The Vida, Kebon Jeruk, Jakarta Barat untuk mendampingi kesehatan Anda dan keluarga dengan standar klinis yang terukur."
        actions={
          <button
            type="button"
            onClick={() => openBooking('vidafit', 'Konsultasi Dokter')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0472B5] hover:bg-[#035c93] text-white font-medium text-sm shadow-xs transition-colors cursor-pointer"
          >
            <span>Jadwalkan Kunjungan</span>
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </button>
        }
      />

      {/* Editorial Story Split */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_2px_rgba(11,37,69,0.04)] overflow-hidden grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-medium text-[#0472B5]">
                  Filosofi pelayanan kami
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#0B2545] tracking-tight leading-snug">
                  Menghadirkan rasa tenang sejak langkah pertama Anda memasuki klinik
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Kami percaya perawatan kesehatan preventif maupun pemulihan medis berjalan paling baik ketika pasien merasa didengarkan. Di Vida Medical Centre, dokter umum, dokter spesialis, dan tim keperawatan berlisensi bekerja bersama dalam ruang konsultasi yang privat dan tenang.
                </p>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Dari pemeriksaan Medical Check Up rutin, imunisasi keluarga, terapi infus mikronutrien VidaBoost, hingga kunjungan perawat ke rumah, setiap tindakan berlandaskan protokol medis yang aman dan transparan.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-xs">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F6F9FC] border border-slate-200/70">
                  <MapPin className="w-4 h-4 text-[#0472B5] shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <div className="font-medium text-[#0B2545]">{CLINIC_CONTACT.addressTitle}</div>
                    <div className="text-slate-600 mt-0.5">Kebon Jeruk, Jakarta Barat</div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F6F9FC] border border-slate-200/70">
                  <Clock className="w-4 h-4 text-[#0472B5] shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <div className="font-medium text-[#0B2545]">Jam Operasional</div>
                    <div className="text-slate-600 font-mono tabular-nums mt-0.5">
                      {CLINIC_CONTACT.hoursShort}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-full bg-[#EBF4FB]">
              <Image
                src="/images/bg_hero_vida.jpeg"
                alt="Ruang konsultasi dokter dan pasien di Vida Medical Centre Gedung The Vida"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4 Care Pillars */}
      <section className="pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#0B2545] tracking-tight">
              Komitmen Pelayanan Kami
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
              Empat standar utama yang menjadi acuan tim medis Vida Medical Centre setiap hari.
            </p>
          </div>

          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {CARE_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  variants={staggerItemVariants}
                  className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-[0_1px_2px_rgba(11,37,69,0.04)] flex flex-col"
                >
                  <span className="w-10 h-10 rounded-xl bg-[#EBF4FB] text-[#0472B5] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </span>
                  <h3 className="text-base font-semibold text-[#0B2545] mb-2 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Healthpedia Link Strip */}
      <section className="pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <span className="w-10 h-10 rounded-xl bg-[#EBF4FB] text-[#0472B5] flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" strokeWidth={1.5} />
              </span>
              <div>
                <h3 className="text-base font-semibold text-[#0B2545]">
                  Pustaka Edukasi Medis Healthpedia
                </h3>
                <p className="text-sm text-slate-600 mt-1 max-w-xl">
                  Baca panduan kesehatan berbasis bukti ilmiah yang ditinjau oleh dokter dan tim klinis Vida Medical Centre.
                </p>
              </div>
            </div>

            <Link
              href="/artikel"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#0472B5]/35 text-[#0472B5] hover:bg-[#EBF4FB] font-medium text-sm transition-colors shrink-0 w-fit"
            >
              <span>Baca Artikel Medis</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </main>
  );
}
