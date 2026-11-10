'use client';

import React from 'react';
import { Building2, Users, ShieldCheck, HeartHandshake } from 'lucide-react';

const STATS = [
  {
    icon: Building2,
    value: '41+',
    label: 'Rumah Sakit',
    desc: 'Di 28 kota di seluruh nusantara',
    highlightColor: 'text-[#0472B5]',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Users,
    value: '12.500+',
    label: 'Tenaga Medis',
    desc: 'Dokter spesialis & paramedis berpengalaman',
    highlightColor: 'text-[#0472B5]',
    bgColor: 'bg-amber-50',
  },
  {
    icon: ShieldCheck,
    value: '400+',
    label: 'Mitra Asuransi',
    desc: 'Kerjasama korporasi & penjaminan klaim',
    highlightColor: 'text-[#0472B5]',
    bgColor: 'bg-emerald-50',
  },
  {
    icon: HeartHandshake,
    value: '10.000.000+',
    label: 'Pasien Terlayani',
    desc: 'Kepercayaan keluarga Indonesia',
    highlightColor: 'text-[#0472B5]',
    bgColor: 'bg-purple-50',
  },
];

export default function SiloamStats() {
  return (
    <section className="bg-white border-b border-slate-200 py-10 relative z-20 -mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start space-x-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center shrink-0 shadow-sm`}
                >
                  <Icon className={`w-6 h-6 ${item.highlightColor}`} />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-[#0472B5] tracking-tight">
                    {item.value}
                  </div>
                  <div className="text-sm font-bold text-slate-800">
                    {item.label}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

