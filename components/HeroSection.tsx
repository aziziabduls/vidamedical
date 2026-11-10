'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GhostFibers from './GhostFibers';
import {
  Search,
  MapPin,
  Calendar,
  Stethoscope,
  Building2,
  Sparkles,
  Home,
  TestTube2,
  Scan,
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Heart,
  Clock,
  Package,
  HeartHandshake,
  HeartPulse,
  ActivitySquare,
} from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: (category?: string, option?: string) => void;
}

const CLINICAL_UNITS = [
  'Semua Poli & Unit Medis',
  'Poli Spesialis Penyakit Dalam (Sp.PD)',
  'Poli Spesialis Gizi Klinis (VidaFit Sp.GK)',
  'Poli Spesialis Jantung & Pembuluh Darah (Sp.JP)',
  'Poli Spesialis Anak (Sp.A)',
  'Poli Spesialis Kebidanan & Kandungan (Sp.OG)',
  'Lounge Infus VidaBoost IV Therapy',
  'Unit Medical Check Up (VidaHealth MCU)',
  'Unit Siaga Homecare Medis',
  'Laboratorium Patologi Klinik & USG',
];

const QUICK_CHIPS = [
  'VidaBoost Gold',
  'Dokter Spesialis Gizi',
  'MCU Eksekutif',
  'Homecare Rawat Luka',
  'Spesialis Jantung',
  'Vaksin Influenza',
];

export default function HeroSection({ onOpenBooking }: HeroSectionProps) {
  const [activeTab, setActiveTab] = useState<'doctor' | 'unit' | 'popular'>('doctor');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUnit, setSelectedUnit] = useState(CLINICAL_UNITS[0]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchTerm ? `Pencarian: "${searchTerm}"` : selectedUnit;
    onOpenBooking('doctor', `${query} di Vida Medical Centre`);
  };

  return (
    <section className="relative bg-[#0472B5] text-white pt-12 pb-20 font-sans border-b border-slate-200 overflow-hidden">
      {/* Background GhostFibers Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <GhostFibers
          glowColor="#ffffff"
          lineColor="#ffffff"
          secondaryColor="#cbd5e1"
          layers={3}
          twist={1.2}
          threads={72}
          fiberStyle="dots"
          depthOfField={0.85}
          hoverEffect="focus"
          intro={true}
          mouseInteraction={true}
          className="opacity-70"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Eyebrow Clinical Badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center mb-4"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/0 border border-white/0 text-xs text-slate-200">
            {/* <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="font-medium text-amber-300">Vida</span>
            <span className="text-white/40">·</span>
            <span>Medical Centre</span> */}
            <span className="font-medium text-transparent">Vida</span>
          </div>
        </motion.div>

        {/* Hero Title & Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
            Pelayanan Medis & Kebugaran Terpadu di Kebon Jeruk
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Solusi kesehatan komprehensif mulai dari konsultasi dokter spesialis, lounge infus vitamin eksklusif, evaluasi gizi klinis, hingga perawatan medis di rumah.
          </p>
        </motion.div>

        {/* INTERACTIVE DOCTOR & CLINICAL SEARCH WIDGET */}
        <motion.div
          id="doctor-search"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-5 sm:p-6 text-slate-800 border border-slate-200/90"
        >
          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 pb-3 mb-5 space-x-3 sm:space-x-4 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('doctor')}
              className={`flex items-center space-x-2 pb-2 px-2 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors cursor-pointer ${activeTab === 'doctor'
                ? 'border-[#0472B5] text-[#0472B5] font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
            >
              <Stethoscope className="w-4 h-4 text-[#0472B5]" />
              <span>Semua Dokter & Jadwal</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('unit')}
              className={`flex items-center space-x-2 pb-2 px-2 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors cursor-pointer ${activeTab === 'unit'
                ? 'border-[#0472B5] text-[#0472B5] font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
            >
              <Building2 className="w-4 h-4 text-[#0472B5]" />
              <span>Poli & Unit Spesialis</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('popular')}
              className={`flex items-center space-x-2 pb-2 px-2 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors cursor-pointer ${activeTab === 'popular'
                ? 'border-[#0472B5] text-[#0472B5] font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
            >
              <Package className="w-4 h-4 text-amber-600" />
              <span>Paket Populer (VidaBoost / MCU)</span>
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
            {/* Input Keyword */}
            <div className="md:col-span-5 relative">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Nama dokter, spesialisasi, atau tindakan
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Contoh: dr. Gizi, Infus Vitamin, EKG..."
                  className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0472B5] focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Select Unit */}
            <div className="md:col-span-4 relative">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Pilih unit layanan
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <select
                  value={selectedUnit}
                  onChange={(e) => setSelectedUnit(e.target.value)}
                  className="w-full pl-10 pr-7 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0472B5] focus:bg-white transition-colors truncate cursor-pointer"
                >
                  {CLINICAL_UNITS.map((unit, idx) => (
                    <option key={idx} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="md:col-span-3 flex flex-col justify-end">
              <label className="hidden md:block text-[11px] font-semibold text-transparent mb-1">
                Action
              </label>
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-[#0472B5] hover:bg-[#035c93] text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
              >
                <Search className="w-4 h-4 text-amber-400" />
                <span>Cari Layanan</span>
              </motion.button>
            </div>
          </form>

          {/* Quick Popular Chips */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-medium mr-1 text-[11px]">Sering dicari:</span>
            {QUICK_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSearchTerm(chip);
                  onOpenBooking('popular', `Pencarian: ${chip}`);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-[#0472B5] border border-slate-200 transition-colors font-medium text-[11px] cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 6 QUICK ACCESS SERVICE CARDS */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* Pill 1 */}
            <a
              href="#doctor-search"
              className="bg-white/10 hover:bg-white/15 rounded-xl p-3.5 text-center flex flex-col items-center justify-center border border-white/10 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-white/10 text-amber-400 flex items-center justify-center mb-2">
                <Stethoscope className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-white group-hover:text-amber-300 transition-colors">
                Jadwal Dokter
              </span>
              <span className="text-[10px] text-slate-300 mt-0.5">Spesialis & Umum</span>
            </a>

            {/* Pill 2 */}
            <button
              type="button"
              onClick={() => onOpenBooking('vidaboost', 'VidaBoost IV Therapy')}
              className="bg-white/10 hover:bg-white/15 rounded-xl p-3.5 text-center flex flex-col items-center justify-center border border-white/10 transition-colors group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-white/10 text-amber-400 flex items-center justify-center mb-2">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-white group-hover:text-amber-300 transition-colors">
                VidaBoost IV
              </span>
              <span className="text-[10px] text-slate-300 mt-0.5">Infus Vitamin</span>
            </button>

            {/* Pill 3 */}
            <button
              type="button"
              onClick={() => onOpenBooking('vidahealth', 'Paket MCU VidaHealth')}
              className="bg-white/10 hover:bg-white/15 rounded-xl p-3.5 text-center flex flex-col items-center justify-center border border-white/10 transition-colors group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-white/10 text-amber-400 flex items-center justify-center mb-2">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-white group-hover:text-amber-300 transition-colors">
                VidaHealth MCU
              </span>
              <span className="text-[10px] text-slate-300 mt-0.5">Skrining & InBody</span>
            </button>

            {/* Pill 4 */}
            <button
              type="button"
              onClick={() => onOpenBooking('homecare', 'Vida at Home (Homecare)')}
              className="bg-white/10 hover:bg-white/15 rounded-xl p-3.5 text-center flex flex-col items-center justify-center border border-white/10 transition-colors group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-white/10 text-emerald-400 flex items-center justify-center mb-2">
                <Home className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-white group-hover:text-amber-300 transition-colors">
                Vida at Home
              </span>
              <span className="text-[10px] text-slate-300 mt-0.5">Perawat ke Rumah</span>
            </button>

            {/* Pill 5 */}
            <button
              type="button"
              onClick={() => onOpenBooking('vidafit', 'VidaFit Weight Management')}
              className="bg-white/10 hover:bg-white/15 rounded-xl p-3.5 text-center flex flex-col items-center justify-center border border-white/10 transition-colors group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-white/10 text-amber-400 flex items-center justify-center mb-2">
                <ActivitySquare className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-white group-hover:text-amber-300 transition-colors">
                VidaFit
              </span>
              <span className="text-[10px] text-slate-300 mt-0.5">Dokter Gizi Klinis</span>
            </button>

            {/* Pill 6 */}
            <button
              type="button"
              onClick={() => onOpenBooking('lab', 'Laboratorium & USG')}
              className="bg-white/10 hover:bg-white/15 rounded-xl p-3.5 text-center flex flex-col items-center justify-center border border-white/10 transition-colors group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-white/10 text-sky-400 flex items-center justify-center mb-2">
                <TestTube2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-white group-hover:text-amber-300 transition-colors">
                Laboratorium
              </span>
              <span className="text-[10px] text-slate-300 mt-0.5">Tes Darah & USG</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
