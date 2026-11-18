'use client';

import PageHeader from '@/components/PageHeader';
import PageShell from '@/components/PageShell';
import { FALLBACK_DOCTORS, type ApiDoctor } from '@/lib/api-client';
import {
  Activity,
  Calendar,
  Clock,
  MapPin,
  Stethoscope,
} from 'lucide-react';

interface DokterKamiClientProps {
  doctors?: ApiDoctor[];
}

export default function DokterKamiClient({
  doctors = FALLBACK_DOCTORS,
}: DokterKamiClientProps) {
  return (
    <PageShell defaultBookingCategory="vidafit" defaultBookingOption="Konsultasi Dokter Spesialis">
      {(openBooking) => (
        <>
          <PageHeader
            breadcrumbs={[
              { label: 'Beranda', href: '/' },
              { label: 'Dokter Kami' },
            ]}
            eyebrow="Poliklinik Spesialis Vida Medical Centre"
            eyebrowIcon={<Stethoscope className="w-3.5 h-3.5 text-[#0472B5]" strokeWidth={1.5} />}
            title="Dokter Kami & Poliklinik Spesialis"
            description="Layanan konsultasi tatap muka bersama Dokter Spesialis Penyakit Dalam dan Dokter Spesialis Gizi Klinis di Gedung The Vida, Kebon Jeruk."
          />

          <section className="py-12 sm:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {doctors.map((poli) => {
                  const Icon = poli.poliCode === 'sp-gk' ? Activity : Stethoscope;
                  const bookingCategory = poli.poliCode === 'sp-gk' ? 'vidafit' : 'doctor';
                  return (
                    <div
                      key={poli.id}
                      id={poli.poliCode}
                      className="scroll-mt-24 bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-between hover:border-[#0472B5]/50 hover:shadow-sm transition-all"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div className="w-11 h-11 rounded-xl bg-[#0472B5]/10 text-[#0472B5] flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium">
                            Poli Spesialis
                          </span>
                        </div>

                        <div className="mt-4">
                          <div className="text-[11px] font-semibold text-[#0472B5]">
                            {poli.specialistTag}
                          </div>
                          <h2 className="text-lg font-bold text-slate-900 mt-1 leading-snug">
                            {poli.name}
                          </h2>
                          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                            {poli.description}
                          </p>
                        </div>

                        <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                          <div className="text-[11px] font-semibold text-slate-700">
                            Cakupan Konsultasi:
                          </div>
                          <ul className="space-y-1.5 text-xs text-slate-600">
                            {poli.focusAreas.map((item) => (
                              <li key={item} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0472B5] mt-1.5 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-5 pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{poli.schedule}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{poli.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => openBooking(bookingCategory, poli.name)}
                          className="w-full py-2.5 px-4 rounded-xl bg-[#0472B5] hover:bg-[#035c93] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                        >
                          <Calendar className="w-3.5 h-3.5 text-amber-400" />
                          <span>Buat Janji Temu</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}
    </PageShell>
  );
}
