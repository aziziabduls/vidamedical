'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HeartPulse,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Info,
  ShieldAlert,
} from 'lucide-react';

interface HeartRiskCalculatorProps {
  onOpenBooking: (category: string, option: string) => void;
}

export default function HeartRiskCalculator({ onOpenBooking }: HeartRiskCalculatorProps) {
  // Inputs state
  const [gender, setGender] = useState<'pria' | 'wanita'>('pria');
  const [age, setAge] = useState<number>(45);
  const [systolic, setSystolic] = useState<number>(125);
  const [cholesterol, setCholesterol] = useState<number>(190);
  const [smoker, setSmoker] = useState<boolean>(false);
  const [diabetes, setDiabetes] = useState<boolean>(false);
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);

  // BMI
  const heightInMeters = height / 100;
  const bmi = heightInMeters > 0 ? Number((weight / (heightInMeters * heightInMeters)).toFixed(1)) : 22;

  // Cardiovascular Risk Calculation
  let baseScore = 0;
  if (gender === 'pria') {
    baseScore += (age - 30) * 0.4;
    if (smoker) baseScore += 5;
    if (diabetes) baseScore += 6;
    if (systolic >= 140) baseScore += 5;
    else if (systolic >= 130) baseScore += 2;
    if (cholesterol >= 240) baseScore += 4;
    else if (cholesterol >= 200) baseScore += 2;
    if (bmi >= 27) baseScore += 3;
  } else {
    baseScore += (age - 35) * 0.35;
    if (smoker) baseScore += 4;
    if (diabetes) baseScore += 6;
    if (systolic >= 140) baseScore += 4;
    else if (systolic >= 130) baseScore += 2;
    if (cholesterol >= 240) baseScore += 3;
    else if (cholesterol >= 200) baseScore += 1.5;
    if (bmi >= 27) baseScore += 2.5;
  }

  const scorePercentage = Math.max(1, Math.min(35, Math.round(baseScore)));

  let riskCategory: 'Rendah' | 'Sedang' | 'Tinggi' = 'Rendah';
  let badgeStyle = 'bg-emerald-100 text-emerald-900 border-emerald-200';
  let barColor = 'bg-emerald-600';

  if (scorePercentage > 12) {
    riskCategory = 'Tinggi';
    badgeStyle = 'bg-rose-100 text-rose-900 border-rose-200';
    barColor = 'bg-rose-600';
  } else if (scorePercentage >= 6) {
    riskCategory = 'Sedang';
    badgeStyle = 'bg-amber-100 text-amber-900 border-amber-200';
    barColor = 'bg-amber-600';
  }

  return (
    <section id="heart-calculator" className="py-16 bg-slate-50 font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 text-xs font-semibold mb-2">
            {/* <HeartPulse className="w-3.5 h-3.5 text-rose-600" /> */}
            <span>Skrining Klinis Mandiri</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Kalkulator Risiko Jantung 10 Tahun
          </h2>
          <p className="mt-2 text-slate-600 text-sm leading-relaxed">
            Estimasi risiko kardiovaskular berdasarkan usia, tekanan darah, profil kolesterol, indeks massa tubuh, dan faktor risiko gaya hidup.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Input Form Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-5 flex items-center space-x-2">
                <Activity className="w-4 h-4 text-[#0472B5]" />
                <span>Parameter Klinis Pasien</span>
              </h3>

              <div className="space-y-5">
                {/* 1. Gender */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Jenis kelamin
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setGender('pria')}
                      className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${gender === 'pria'
                          ? 'border-[#0472B5] bg-[#0472B5] text-white shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                    >
                      Pria
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('wanita')}
                      className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${gender === 'wanita'
                          ? 'border-[#0472B5] bg-[#0472B5] text-white shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                    >
                      Wanita
                    </button>
                  </div>
                </div>

                {/* 2. Age & Systolic */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-slate-700">Usia saat ini</label>
                      <span className="text-xs font-bold text-slate-900 tabular-nums">{age} tahun</span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={80}
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full accent-[#0472B5] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-0.5 tabular-nums">
                      <span>20 th</span>
                      <span>50 th</span>
                      <span>80 th</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-slate-700">Tekanan darah sistolik</label>
                      <span className="text-xs font-bold text-slate-900 tabular-nums">{systolic} mmHg</span>
                    </div>
                    <input
                      type="range"
                      min={90}
                      max={200}
                      value={systolic}
                      onChange={(e) => setSystolic(Number(e.target.value))}
                      className="w-full accent-[#0472B5] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-0.5 tabular-nums">
                      <span>90 normal</span>
                      <span>130 pre-HT</span>
                      <span>200 HT</span>
                    </div>
                  </div>
                </div>

                {/* 3. Cholesterol & Weight/Height */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-slate-700">Kolesterol total</label>
                      <span className="text-xs font-bold text-slate-900 tabular-nums">{cholesterol} mg/dL</span>
                    </div>
                    <input
                      type="range"
                      min={120}
                      max={320}
                      value={cholesterol}
                      onChange={(e) => setCholesterol(Number(e.target.value))}
                      className="w-full accent-[#0472B5] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-0.5 tabular-nums">
                      <span>&lt;200 ideal</span>
                      <span>200-239 batas</span>
                      <span>&gt;240 tinggi</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-slate-700">Indeks massa tubuh (BMI)</label>
                      <span className="text-xs font-bold text-slate-900 tabular-nums">{bmi} kg/m²</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="Berat (kg)"
                        value={weight || ''}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        className="p-2 border border-slate-300 rounded-lg text-xs text-slate-900 tabular-nums"
                        title="Berat badan dalam kg"
                      />
                      <input
                        type="number"
                        placeholder="Tinggi (cm)"
                        value={height || ''}
                        onChange={(e) => setHeight(Number(e.target.value))}
                        className="p-2 border border-slate-300 rounded-lg text-xs text-slate-900 tabular-nums"
                        title="Tinggi badan dalam cm"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Lifestyle Checkboxes */}
                <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <label className="flex items-center space-x-2.5 p-2.5 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={smoker}
                      onChange={(e) => setSmoker(e.target.checked)}
                      className="w-4 h-4 rounded text-[#0472B5] focus:ring-[#0472B5]"
                    />
                    <span className="text-xs font-medium text-slate-800">Perokok aktif</span>
                  </label>

                  <label className="flex items-center space-x-2.5 p-2.5 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={diabetes}
                      onChange={(e) => setDiabetes(e.target.checked)}
                      className="w-4 h-4 rounded text-[#0472B5] focus:ring-[#0472B5]"
                    />
                    <span className="text-xs font-medium text-slate-800">Riwayat diabetes / gula tinggi</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Diagnostic Result Column */}
            <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">
                    Estimasi Risiko 10 Tahun
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${badgeStyle}`}>
                    Tingkat {riskCategory}
                  </span>
                </div>

                <div className="mt-5 flex items-baseline space-x-2">
                  <span className="text-4xl sm:text-5xl font-bold text-white tracking-tight tabular-nums">
                    {scorePercentage}%
                  </span>
                  <span className="text-xs text-slate-400">
                    peluang kejadian kardiovaskular
                  </span>
                </div>

                {/* Risk Bar */}
                <div className="mt-3.5 w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${barColor}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, scorePercentage * 3)}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                {/* Clinical Guidance Text */}
                <div className="mt-5 p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs space-y-1.5">
                  <div className="font-semibold text-slate-200 flex items-center space-x-1.5">
                    <Info className="w-3.5 h-3.5 text-amber-400" />
                    <span>Catatan Klinis:</span>
                  </div>

                  {riskCategory === 'Rendah' && (
                    <p className="text-slate-300 leading-relaxed font-normal">
                      Indikator saat ini terkontrol baik. Pertahankan pola makan seimbang dan lakukan evaluasi skrining berkala setiap 1–2 tahun sekali.
                    </p>
                  )}

                  {riskCategory === 'Sedang' && (
                    <p className="text-slate-300 leading-relaxed font-normal">
                      Terdapat beberapa indikator yang perlu diperhatikan seperti tekanan darah atau kadar kolesterol. Dianjurkan konsultasi untuk skrining EKG dan evaluasi pola makan.
                    </p>
                  )}

                  {riskCategory === 'Tinggi' && (
                    <p className="text-rose-200 leading-relaxed font-medium">
                      Perhatian: Anda memiliki profil risiko kardiovaskular tinggi. Sangat dianjurkan segera berkonsultasi dengan Spesialis Jantung atau Penyakit Dalam di Gedung The Vida.
                    </p>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-5 border-t border-slate-800">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() =>
                    onOpenBooking(
                      'doctor',
                      `Konsultasi Spesialis Jantung (Hasil Kalkulator Risiko ${riskCategory} ${scorePercentage}%)`
                    )
                  }
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs text-center transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Jadwalkan Konsultasi di Gedung The Vida</span>
                </motion.button>
                <p className="text-[10px] text-slate-500 text-center mt-2">
                  *Skrining ini adalah panduan preventif dan bukan pengganti diagnosis medis dokter.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
