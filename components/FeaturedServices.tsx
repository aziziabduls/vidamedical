'use client';

import React from 'react';
import { Activity, Stethoscope, Scale, Home, Shield, ArrowRight } from 'lucide-react';

interface FeaturedServicesProps {
  onSelectService: (serviceCategory: string, serviceOption?: string) => void;
}

export default function FeaturedServices({ onSelectService }: FeaturedServicesProps) {
  const services = [
    {
      id: 'vidaboost',
      anchor: '#vidaboost',
      title: 'VidaBoost IV Vitamin Therapy',
      subtitle: 'Formula Silver, Gold, Platinum, dan Diamond',
      description:
        'Infus multivitamin dan antioksidan murni untuk mengembalikan stamina, hidrasi, imunitas seluler, serta pemulihan kelelahan harian secara terarah.',
      icon: Activity,
      tag: 'Kebugaran & stamina',
      badge: '4 tingkat formula',
      actionText: 'Rincian formula',
    },
    {
      id: 'vidahealth',
      anchor: '#vidahealth',
      title: 'VidaHealth Medical Check Up',
      subtitle: 'Termasuk bonus analisis komposisi tubuh InBody',
      description:
        'Skrining berkala mencakup pemeriksaan fisik dokter umum, tes visus mata, laboratorium darah lengkap, dan evaluasi lemak visceral gratis.',
      icon: Stethoscope,
      tag: 'Pencegahan & skrining',
      badge: 'Bonus tes InBody',
      actionText: 'Pilihan paket',
    },
    {
      id: 'vidafit',
      anchor: '#vidafit',
      title: 'VidaFit Medical Weight Management',
      subtitle: 'Pendampingan Dokter Spesialis Gizi Klinis (Sp.GK)',
      description:
        'Program penurunan berat badan terukur berbasis komposisi tubuh, meal plan terpersonalisasi, suplemen resmi BPOM, dan injeksi medis penunjang metabolisme.',
      icon: Scale,
      tag: 'Spesialis gizi klinis',
      badge: 'Dokter Sp.GK',
      actionText: 'Konsultasi VidaFit',
    },
    {
      id: 'homecare',
      anchor: '#homecare',
      title: 'Layanan Homecare Medis',
      subtitle: 'Tindakan steril perawat dan dokter ke rumah',
      description:
        'Perawatan luka diabetes atau pasca bedah, penggantian selang makan NGT, kateter urin, serta infus vitamin di kediaman pasien di area Jakarta.',
      icon: Home,
      tag: 'Kunjungan ke rumah',
      badge: 'Standar aseptik',
      actionText: 'Pilihan homecare',
    },
    {
      id: 'vaksinasi',
      anchor: '#vaksinasi',
      title: 'Vaksinasi VidaShield',
      subtitle: 'Perlindungan flu 4-valen dan vaksin dewasa',
      description:
        'Perlindungan keluarga terhadap strain virus influenza rekomendasi WHO terkini melalui vaksin 4-valen, serta imunisasi Hepatitis B, HPV, dan Pneumonia.',
      icon: Shield,
      tag: 'Imunisasi keluarga',
      badge: 'Rantai dingin medis',
      actionText: 'Jadwal vaksinasi',
    },
  ];

  return (
    <section id="layanan" className="py-16 lg:py-20 bg-slate-50/60 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-medium text-teal-800 mb-2">
            Layanan klinis terpadu
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-950 tracking-tight mb-3">
            Lima pilar pelayanan kesehatan di Vida Medical Centre
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Setiap tindakan dipandu oleh dokter dan perawat berpengalaman dengan standar higienitas ketat di lounge privat Gedung The Vida atau melalui kunjungan langsung ke rumah Anda.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 transition-colors"
              >
                <div>
                  {/* Category & Badge Meta */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                    <span className="font-medium text-slate-700">{item.tag}</span>
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[11px] font-normal">
                      {item.badge}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-teal-800" strokeWidth={1.5} />
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-base font-semibold text-slate-900 mb-1">
                    {item.title}
                  </h3>
                  <div className="text-xs text-slate-500 font-normal mb-3">
                    {item.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Footer Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={item.anchor}
                    className="text-xs font-medium text-slate-700 hover:text-slate-950 inline-flex items-center gap-1 transition-colors"
                  >
                    <span>{item.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </a>

                  <button
                    onClick={() => onSelectService(item.id, item.title)}
                    className="text-xs font-medium text-teal-800 hover:text-teal-950 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Pesan
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}