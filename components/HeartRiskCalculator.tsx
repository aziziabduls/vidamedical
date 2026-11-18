'use client';

import { motion } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Info,
  ShieldAlert,
} from 'lucide-react';
import { useState } from 'react';

type RiskCategory = 'Rendah' | 'Sedang' | 'Tinggi';

const RISK_THEMES: Record<
  RiskCategory,
  {
    label: string;
    panelClass: string;
    mutedTextClass: string;
    scoreClass: string;
    badgeClass: string;
    trackClass: string;
    barClass: string;
    noteCardClass: string;
    noteHeadingClass: string;
    noteIconClass: string;
    noteBodyClass: string;
    dividerClass: string;
    buttonClass: string;
    disclaimerClass: string;
    legendTextClass: string;
  }
> = {
  Rendah: {
    label: 'Tingkat Rendah (Aman)',
    panelClass: 'bg-emerald-800 text-white',
    mutedTextClass: 'text-emerald-100',
    scoreClass: 'text-white',
    badgeClass: 'bg-emerald-950/60 text-emerald-50 border-emerald-300/40',
    trackClass: 'bg-emerald-950/45',
    barClass: 'bg-emerald-300',
    noteCardClass: 'bg-emerald-900/60 border-emerald-500/40',
    noteHeadingClass: 'text-white',
    noteIconClass: 'text-emerald-200',
    noteBodyClass: 'text-emerald-50 font-normal',
    dividerClass: 'border-emerald-700/80',
    buttonClass: 'bg-white hover:bg-emerald-50 text-emerald-950',
    disclaimerClass: 'text-emerald-100',
    legendTextClass: 'text-emerald-100',
  },
  Sedang: {
    label: 'Tingkat Sedang (Waspada)',
    panelClass: 'bg-amber-400 text-slate-950',
    mutedTextClass: 'text-slate-900',
    scoreClass: 'text-slate-950',
    badgeClass: 'bg-slate-950 text-amber-300 border-slate-900',
    trackClass: 'bg-amber-950/20',
    barClass: 'bg-slate-950',
    noteCardClass: 'bg-amber-50/90 border-amber-700/25',
    noteHeadingClass: 'text-slate-950',
    noteIconClass: 'text-amber-800',
    noteBodyClass: 'text-slate-900 font-normal',
    dividerClass: 'border-amber-700/25',
    buttonClass: 'bg-slate-950 hover:bg-slate-800 text-white',
    disclaimerClass: 'text-slate-900',
    legendTextClass: 'text-slate-900',
  },
  Tinggi: {
    label: 'Bahaya · Risiko Tinggi',
    panelClass: 'bg-red-700 text-white',
    mutedTextClass: 'text-red-100',
    scoreClass: 'text-white',
    badgeClass: 'bg-red-950/75 text-white border-red-200/40',
    trackClass: 'bg-red-950/45',
    barClass: 'bg-amber-300',
    noteCardClass: 'bg-red-900/65 border-red-300/35',
    noteHeadingClass: 'text-white',
    noteIconClass: 'text-amber-300',
    noteBodyClass: 'text-red-50 font-medium',
    dividerClass: 'border-red-500/50',
    buttonClass: 'bg-white hover:bg-red-50 text-red-900',
    disclaimerClass: 'text-red-100',
    legendTextClass: 'text-red-100',
  },
};

interface HeartRiskCalculatorProps {
  onOpenBooking: (category: string, option: string) => void;
  showHeader?: boolean;
}

export default function HeartRiskCalculator({
  onOpenBooking,
  showHeader = true,
}: HeartRiskCalculatorProps) {
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

  const scorePercentage = Math.max(1, Math.min(95, Math.round(baseScore * 2.2)));

  let riskCategory: RiskCategory = 'Rendah';
  if (scorePercentage > 60) {
    riskCategory = 'Tinggi';
  } else if (scorePercentage > 30) {
    riskCategory = 'Sedang';
  }

  const theme = RISK_THEMES[riskCategory];
  const StatusIcon =
    riskCategory === 'Tinggi'
      ? ShieldAlert
      : riskCategory === 'Sedang'
        ? AlertTriangle
        : CheckCircle2;

  return (
    <section
      id="heart-calculator"
      className={
        showHeader
          ? 'py-16 bg-slate-50 font-sans border-b border-slate-200'
          : 'py-12 sm:py-16 font-sans'
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="max-w-2xl mb-10">
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 text-xs font-semibold mb-2">
              <span>Skrining Klinis Mandiri</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Kalkulator Risiko Jantung 10 Tahun
            </h2>
            <p className="mt-2 text-slate-600 text-sm leading-relaxed">
              Estimasi risiko kardiovaskular berdasarkan usia, tekanan darah, profil kolesterol, indeks massa tubuh, dan faktor risiko gaya hidup.
            </p>
          </div>
        )}

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
            <div className={`lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between transition-colors duration-300 ${theme.panelClass}`}>
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-xs font-medium ${theme.mutedTextClass}`}>
                    Estimasi Risiko 10 Tahun
                  </span>
                  <span className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold border ${theme.badgeClass}`}>
                    <StatusIcon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{theme.label}</span>
                  </span>
                </div>

                <div className="mt-5 flex items-baseline space-x-2">
                  <span className={`text-4xl sm:text-5xl font-bold tracking-tight tabular-nums ${theme.scoreClass}`}>
                    {scorePercentage}%
                  </span>
                  <span className={`text-xs ${theme.mutedTextClass}`}>
                    peluang kejadian kardiovaskular
                  </span>
                </div>

                {/* Risk Bar */}
                <div className={`mt-3.5 w-full h-2.5 rounded-full overflow-hidden ${theme.trackClass}`}>
                  <motion.div
                    className={`h-full ${theme.barClass}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${scorePercentage}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <div className={`mt-1.5 flex justify-between text-[10px] font-medium tabular-nums ${theme.legendTextClass}`}>
                  <span>≤30% Hijau (Rendah)</span>
                  <span>31–60% Kuning (Sedang)</span>
                  <span>&gt;60% Merah (Bahaya)</span>
                </div>

                {/* Clinical Guidance Text */}
                <div className={`mt-5 p-4 rounded-xl border text-xs space-y-1.5 ${theme.noteCardClass}`}>
                  <div className={`font-semibold flex items-center space-x-1.5 ${theme.noteHeadingClass}`}>
                    <Info className={`w-3.5 h-3.5 shrink-0 ${theme.noteIconClass}`} aria-hidden="true" />
                    <span>Catatan Klinis:</span>
                  </div>

                  {riskCategory === 'Rendah' && (
                    <p className={`leading-relaxed ${theme.noteBodyClass}`}>
                      Indikator saat ini terkontrol baik. Pertahankan pola makan seimbang dan lakukan evaluasi skrining berkala setiap 1–2 tahun sekali.
                    </p>
                  )}

                  {riskCategory === 'Sedang' && (
                    <p className={`leading-relaxed ${theme.noteBodyClass}`}>
                      Terdapat beberapa indikator yang perlu diperhatikan seperti tekanan darah atau kadar kolesterol. Dianjurkan konsultasi untuk skrining EKG dan evaluasi pola makan.
                    </p>
                  )}

                  {riskCategory === 'Tinggi' && (
                    <p className={`leading-relaxed ${theme.noteBodyClass}`}>
                      Bahaya: Anda memiliki profil risiko kardiovaskular tinggi. Sangat dianjurkan segera berkonsultasi dengan Spesialis Jantung atau Penyakit Dalam di Gedung The Vida.
                    </p>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className={`mt-6 pt-5 border-t ${theme.dividerClass}`}>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() =>
                    onOpenBooking(
                      'doctor',
                      `Konsultasi Spesialis Jantung (Hasil Kalkulator Risiko ${riskCategory} ${scorePercentage}%)`
                    )
                  }
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs text-center transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-sm ${theme.buttonClass}`}
                >
                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Jadwalkan Konsultasi di Gedung The Vida</span>
                </motion.button>
                <p className={`text-[10px] text-center mt-2 ${theme.disclaimerClass}`}>
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
