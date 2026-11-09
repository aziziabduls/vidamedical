'use client';

import React, { useState } from 'react';
import { calculateBMI, estimateCaloricTarget } from '@/lib/clinic-rules';
import { Scale, HeartPulse, Utensils, Shield, Syringe, ArrowRight } from 'lucide-react';

interface VidaFitSectionProps {
  onOpenBooking: (serviceCategory: string, serviceOption: string) => void;
}

const DEFAULT_WEIGHT = 75;
const DEFAULT_HEIGHT = 170;
const DEFAULT_AGE = 32;

export default function VidaFitSection({ onOpenBooking }: VidaFitSectionProps) {
  // Calculator state: string allows input to be fully deleted/cleared
  const [weight, setWeight] = useState<string>(String(DEFAULT_WEIGHT));
  const [height, setHeight] = useState<string>(String(DEFAULT_HEIGHT));
  const [age, setAge] = useState<string>(String(DEFAULT_AGE));
  const [gender, setGender] = useState<'male' | 'female'>('female');

  const numWeight = parseFloat(weight);
  const numHeight = parseFloat(height);
  const numAge = parseInt(age, 10);

  const isWeightValid = !isNaN(numWeight) && numWeight > 0;
  const isHeightValid = !isNaN(numHeight) && numHeight > 0;
  const isAgeValid = !isNaN(numAge) && numAge > 0;
  const isFormValid = isWeightValid && isHeightValid && isAgeValid;

  // Compute live estimates safely without crashing when input is empty
  const bmiResult = isWeightValid && isHeightValid ? calculateBMI(numWeight, numHeight) : null;
  const calorieResult = isFormValid
    ? estimateCaloricTarget(numWeight, numHeight, numAge, gender, 'loss')
    : null;

  const handleResetDefaults = () => {
    setWeight(String(DEFAULT_WEIGHT));
    setHeight(String(DEFAULT_HEIGHT));
    setAge(String(DEFAULT_AGE));
    setGender('female');
  };

  return (
    <section id="vidafit" className="py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-medium text-teal-800 mb-2 flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-teal-800" strokeWidth={1.5} />
            <span>Manajemen berat badan medis</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-950 tracking-tight mb-3">
            VidaFit: Penurunan berat badan bersama Dokter Spesialis Gizi Klinis
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Bukan diet ekstrem tanpa dasar ilmiah. Program VidaFit diawasi langsung oleh Dokter Spesialis Gizi Klinis (Sp.GK) untuk menurunkan lemak tubuh dengan tetap mempertahankan massa otot dan metabolisme jangka panjang.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-slate-800 flex items-center justify-center mb-3">
                <HeartPulse className="w-4 h-4 text-teal-800" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-1.5">
                1. Pemetaan InBody
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Pemindaian segmental massa lemak, otot rangka, dan lemak visceral sebagai acuan dasar program.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-slate-500 font-normal">
              Analisis impedansi bioelektrik
            </div>
          </div>

          <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-slate-800 flex items-center justify-center mb-3">
                <Utensils className="w-4 h-4 text-teal-800" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-1.5">
                2. Meal plan personal
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Menu gizi harian yang disusun dokter spesialis menyesuaikan rutinitas kerja dan riwayat kesehatan Anda.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-slate-500 font-normal">
              Defisit kalori aman
            </div>
          </div>

          <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-slate-800 flex items-center justify-center mb-3">
                <Shield className="w-4 h-4 text-teal-800" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-1.5">
                3. Suplemen resmi BPOM
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Penunjang kecukupan mikronutrien dan metabolisme yang teruji aman tanpa zat berbahaya.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-slate-500 font-normal">
              Farmasi terstandar
            </div>
          </div>

          <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-slate-800 flex items-center justify-center mb-3">
                <Syringe className="w-4 h-4 text-teal-800" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-1.5">
                4. Terapi injeksi medis
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Tindakan injeksi metabolisme dan pemecah lemak terarah di bawah pengawasan dokter klinik.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-slate-500 font-normal">
              Prosedur aseptik klinik
            </div>
          </div>
        </div>

        {/* Interactive Clinical BMI & Calorie Calculator */}
        <div className="bg-slate-50/80 rounded-xl border border-slate-200 p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Form Controls */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-slate-500 block">
                    Instrumen estimasi awal
                  </span>
                  {(weight !== String(DEFAULT_WEIGHT) ||
                    height !== String(DEFAULT_HEIGHT) ||
                    age !== String(DEFAULT_AGE) ||
                    gender !== 'female') && (
                    <button
                      type="button"
                      onClick={handleResetDefaults}
                      className="text-[11px] text-teal-800 hover:text-teal-950 underline underline-offset-2 cursor-pointer font-normal"
                    >
                      Reset nilai default
                    </button>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-slate-950">
                  Kalkulator BMI & Kebutuhan Kalori Harian
                </h3>
                <p className="text-xs text-slate-600 font-normal mt-0.5">
                  Gunakan estimasi dasar ini sebagai gambaran sebelum konsultasi mendalam dengan Dokter Spesialis Gizi Klinis di Gedung The Vida.
                </p>
              </div>

              {/* Gender toggle */}
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1.5">
                  Jenis kelamin
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setGender('female')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                      gender === 'female'
                        ? 'border-slate-800 bg-white text-slate-900 shadow-xs'
                        : 'border-slate-200 bg-slate-100 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Wanita
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('male')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                      gender === 'male'
                        ? 'border-slate-800 bg-white text-slate-900 shadow-xs'
                        : 'border-slate-200 bg-slate-100 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Pria
                  </button>
                </div>
              </div>

              {/* Numerical Inputs - Can be cleared, edited freely, has placeholders and defaults */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Berat (kg)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="300"
                    step="any"
                    placeholder={String(DEFAULT_WEIGHT)}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm font-mono tabular-nums rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-700 focus:border-teal-700 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Tinggi (cm)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="300"
                    step="any"
                    placeholder={String(DEFAULT_HEIGHT)}
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm font-mono tabular-nums rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-700 focus:border-teal-700 placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Usia (tahun)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    step="1"
                    placeholder={String(DEFAULT_AGE)}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm font-mono tabular-nums rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-700 focus:border-teal-700 placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Diagnostic Result Sheet */}
            <div className="lg:col-span-6 bg-white p-5 rounded-xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-xs text-slate-500 font-normal block">Skor BMI (Kriteria Asia-Pasifik)</span>
                  <div className="text-3xl font-semibold text-slate-950 font-mono tabular-nums tracking-tight">
                    {bmiResult ? bmiResult.bmi : '—'}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 font-normal block mb-0.5">Klasifikasi</span>
                  <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-900 text-xs font-medium rounded border border-slate-200">
                    {bmiResult ? bmiResult.category : 'Menunggu input'}
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-600 font-normal leading-relaxed min-h-[32px]">
                {bmiResult
                  ? bmiResult.riskDescription
                  : 'Masukkan berat dan tinggi badan untuk menghitung indeks massa tubuh serta target kebutuhan kalori harian.'}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/70">
                  <span className="text-[11px] text-slate-500 font-normal block">Rentang berat ideal</span>
                  <span className="text-xs sm:text-sm font-mono tabular-nums text-slate-900 font-medium">
                    {isHeightValid
                      ? `${Math.round(18.5 * (numHeight / 100) * (numHeight / 100) * 10) / 10} – ${
                          Math.round(22.9 * (numHeight / 100) * (numHeight / 100) * 10) / 10
                        } kg`
                      : '—'}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/70">
                  <span className="text-[11px] text-slate-500 font-normal block">Target kalori terarah</span>
                  <span className="text-xs sm:text-sm font-mono tabular-nums text-teal-800 font-medium">
                    {calorieResult ? `~${calorieResult.targetDailyCalories} kkal / hari` : '—'}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() =>
                    onOpenBooking(
                      'vidafit',
                      bmiResult
                        ? `Program VidaFit (BMI: ${bmiResult.bmi} - ${bmiResult.category})`
                        : 'Program Evaluasi VidaFit (Dokter Sp.GK)'
                    )
                  }
                  className="w-full py-2.5 px-4 text-xs font-medium text-white bg-teal-800 hover:bg-teal-900 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>
                    {bmiResult
                      ? 'Konsultasikan hasil dengan Dokter Spesialis Gizi'
                      : 'Jadwalkan konsultasi dengan Dokter Spesialis Gizi'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}