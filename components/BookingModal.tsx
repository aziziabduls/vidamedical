'use client';

import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  MapPin,
  Check,
  ExternalLink,
} from 'lucide-react';
import {
  type BookingPayload,
  formatWhatsAppBookingUrl,
  VIDA_BOOST_TIERS,
  VIDA_HEALTH_PACKAGES,
  HOMECARE_SERVICES,
  VACCINATION_LIST,
} from '@/lib/clinic-rules';

function getDefaultOptionForCategory(cat: string) {
  switch (cat) {
    case 'vidaboost':
      return 'VidaBoost Gold';
    case 'vidahealth':
      return 'VidaHealth Comprehensive';
    case 'vidafit':
      return 'Program Evaluasi VidaFit (Dokter Sp.GK)';
    case 'homecare':
      return 'Perawatan Luka (Wound Care)';
    case 'vaksinasi':
      return 'VidaShield Influenza Quadrivalent';
    default:
      return 'Konsultasi Medis';
  }
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
  initialOption?: string;
}

function getTomorrowDateString() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yyyy = tomorrow.getFullYear();
  const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const dd = String(tomorrow.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export default function BookingModal({
  isOpen,
  onClose,
  initialCategory = 'vidaboost',
  initialOption,
}: BookingModalProps) {
  if (!isOpen) return null;

  return (
    <BookingModalInner
      key={`${initialCategory}-${initialOption || ''}`}
      onClose={onClose}
      initialCategory={initialCategory}
      initialOption={initialOption}
    />
  );
}

function BookingModalInner({
  onClose,
  initialCategory = 'vidaboost',
  initialOption,
}: {
  onClose: () => void;
  initialCategory?: string;
  initialOption?: string;
}) {
  const normalizedCategory = ['vidaboost', 'vidahealth', 'vidafit', 'homecare', 'vaksinasi'].includes(
    initialCategory.toLowerCase()
  )
    ? (initialCategory.toLowerCase() as 'vidaboost' | 'vidahealth' | 'vidafit' | 'homecare' | 'vaksinasi')
    : 'vidaboost';

  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<'vidaboost' | 'vidahealth' | 'vidafit' | 'homecare' | 'vaksinasi'>(
    normalizedCategory
  );
  const [option, setOption] = useState(
    initialOption || getDefaultOptionForCategory(normalizedCategory)
  );
  const [preferredDate, setPreferredDate] = useState(() => getTomorrowDateString());
  const [preferredTime, setPreferredTime] = useState('10:00 WIB');
  const [visitType, setVisitType] = useState<'clinic' | 'homecare'>(
    normalizedCategory === 'homecare' ? 'homecare' : 'clinic'
  );
  const [homeAddress, setHomeAddress] = useState('');
  const [notes, setNotes] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingPayload | null>(null);
  const [waUrl, setWaUrl] = useState('');

  const handleCategoryChange = (
    newCat: 'vidaboost' | 'vidahealth' | 'vidafit' | 'homecare' | 'vaksinasi'
  ) => {
    setCategory(newCat);
    setOption(getDefaultOptionForCategory(newCat));
    if (newCat === 'homecare') {
      setVisitType('homecare');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !phone.trim() || !preferredDate) {
      return;
    }

    const payload: BookingPayload = {
      patientName: patientName.trim(),
      phone: phone.trim(),
      serviceCategory: category,
      serviceOption: option,
      preferredDate,
      preferredTime,
      visitType,
      homeAddress: visitType === 'homecare' ? homeAddress.trim() : undefined,
      notes: notes.trim(),
    };

    const targetUrl = formatWhatsAppBookingUrl(payload);
    setConfirmedBooking(payload);
    setWaUrl(targetUrl);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden relative">
        {/* Modal Header */}
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-teal-800 text-white flex items-center justify-center font-medium text-xs">
              V
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 leading-tight">
                Reservasi jadwal kunjungan
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                Vida Medical Centre · Gedung The Vida & Homecare
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Tutup formulir reservasi"
          >
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5">
          {submitted && confirmedBooking ? (
            /* Confirmation card */
            <div className="text-center space-y-4 py-2">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mx-auto">
                <Check className="w-5 h-5" strokeWidth={2} />
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-semibold text-slate-900">
                  Data reservasi siap dikonfirmasi
                </h4>
                <p className="text-xs text-slate-600 font-normal max-w-md mx-auto">
                  Untuk memproses jadwal dokter dan perawat, lanjutkan pengiriman rincian reservasi melalui WhatsApp resmi klinik.
                </p>
              </div>

              {/* Summary box */}
              <div className="bg-slate-50 rounded-lg p-4 text-left text-xs space-y-2 border border-slate-200/80">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-normal">Nama pasien:</span>
                  <span className="font-medium text-slate-900">{confirmedBooking.patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-normal">Nomor WhatsApp:</span>
                  <span className="font-mono tabular-nums text-slate-900">{confirmedBooking.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-normal">Layanan:</span>
                  <span className="font-medium text-slate-900">{confirmedBooking.serviceOption}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-normal">Jadwal:</span>
                  <span className="font-mono tabular-nums text-slate-900">
                    {confirmedBooking.preferredDate} · {confirmedBooking.preferredTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-normal">Tipe kunjungan:</span>
                  <span className="font-medium text-slate-900">
                    {confirmedBooking.visitType === 'homecare'
                      ? 'Layanan ke rumah (Homecare)'
                      : 'Klinik Gedung The Vida'}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-teal-800 hover:bg-teal-900 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <span>Kirim via WhatsApp (0811 5750 260)</span>
                  <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2 px-4 text-xs font-normal text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Tutup jendela
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Category selector */}
              <div>
                <label className="font-medium text-slate-700 block mb-1">
                  Pilih kelompok layanan
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {(
                    [
                      { id: 'vidaboost', label: 'VidaBoost IV' },
                      { id: 'vidahealth', label: 'VidaHealth MCU' },
                      { id: 'vidafit', label: 'VidaFit Gizi' },
                      { id: 'homecare', label: 'Homecare' },
                      { id: 'vaksinasi', label: 'Vaksinasi' },
                    ] as const
                  ).map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`py-1.5 px-2 rounded-md font-medium border transition-colors text-center truncate cursor-pointer ${
                        category === cat.id
                          ? 'border-slate-800 bg-slate-900 text-white'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specific Option Selector */}
              <div>
                <label className="font-medium text-slate-700 block mb-1">
                  Pilihan paket / tindakan
                </label>
                <select
                  value={option}
                  onChange={(e) => setOption(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white font-normal focus:outline-none focus:ring-1 focus:ring-teal-700 focus:border-teal-700"
                >
                  {category === 'vidaboost' &&
                    VIDA_BOOST_TIERS.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name} ({t.tagline})
                      </option>
                    ))}

                  {category === 'vidahealth' &&
                    VIDA_HEALTH_PACKAGES.map((p) => (
                      <option key={p.id} value={p.title}>
                        {p.title} (+ Bonus InBody)
                      </option>
                    ))}

                  {category === 'vidafit' && [
                    <option key="eval" value="Program Evaluasi VidaFit (Dokter Sp.GK)">
                      Program Evaluasi VidaFit (Dokter Sp.GK)
                    </option>,
                    <option key="complete" value="VidaFit Complete (Meal Plan + InBody + Suplemen BPOM)">
                      VidaFit Complete (Meal Plan + InBody + Suplemen BPOM)
                    </option>,
                    <option key="injection" value="VidaFit Medical Metabolic Injections Program">
                      VidaFit Medical Metabolic Injections Program
                    </option>,
                  ]}

                  {category === 'homecare' &&
                    HOMECARE_SERVICES.map((h) => (
                      <option key={h.id} value={h.title}>
                        {h.title}
                      </option>
                    ))}

                  {category === 'vaksinasi' &&
                    VACCINATION_LIST.map((v) => (
                      <option key={v.id} value={v.name}>
                        {v.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Location Type */}
              <div>
                <label className="font-medium text-slate-700 block mb-1">
                  Lokasi tindakan
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setVisitType('clinic')}
                    className={`py-2 px-3 rounded-lg font-medium border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      visitType === 'clinic'
                        ? 'border-slate-800 bg-slate-50 text-slate-900'
                        : 'border-slate-200 bg-white text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 text-teal-800 shrink-0" strokeWidth={1.5} />
                    <span className="truncate">Klinik Gedung The Vida</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVisitType('homecare')}
                    className={`py-2 px-3 rounded-lg font-medium border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      visitType === 'homecare'
                        ? 'border-slate-800 bg-slate-50 text-slate-900'
                        : 'border-slate-200 bg-white text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 text-teal-800 shrink-0" strokeWidth={1.5} />
                    <span className="truncate">Homecare ke rumah</span>
                  </button>
                </div>
              </div>

              {/* Address input if homecare */}
              {visitType === 'homecare' && (
                <div>
                  <label className="font-medium text-slate-700 block mb-1">
                    Alamat lengkap kunjungan homecare
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Contoh: Jl. Surya Utama No. 12, Kedoya Selatan, Jakarta Barat"
                    value={homeAddress}
                    onChange={(e) => setHomeAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-700 focus:border-teal-700"
                  />
                </div>
              )}

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-slate-700 block mb-1">
                    Tanggal rencana
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white font-mono tabular-nums focus:outline-none focus:ring-1 focus:ring-teal-700 focus:border-teal-700"
                  />
                </div>

                <div>
                  <label className="font-medium text-slate-700 block mb-1">
                    Waktu / jam
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 bg-white font-medium focus:outline-none focus:ring-1 focus:ring-teal-700 focus:border-teal-700"
                  >
                    <option value="09:00 WIB">09:00 WIB (Pagi)</option>
                    <option value="11:00 WIB">11:00 WIB (Siang)</option>
                    <option value="14:00 WIB">14:00 WIB (Siang)</option>
                    <option value="16:00 WIB">16:00 WIB (Sore)</option>
                    <option value="18:30 WIB">18:30 WIB (Malam)</option>
                  </select>
                </div>
              </div>

              {/* Patient Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-slate-700 block mb-1">
                    Nama pasien
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Nama lengkap pasien"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-700 focus:border-teal-700"
                    />
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" strokeWidth={1.5} />
                  </div>
                </div>

                <div>
                  <label className="font-medium text-slate-700 block mb-1">
                    Nomor WhatsApp
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="0812xxxxxxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-300 text-slate-900 font-mono tabular-nums focus:outline-none focus:ring-1 focus:ring-teal-700 focus:border-teal-700"
                    />
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="font-medium text-slate-700 block mb-1">
                  Catatan atau keluhan medis (opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Riwayat alergi obat, pasca operasi, atau tujuan kebugaran"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-700 focus:border-teal-700"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-teal-800 hover:bg-teal-900 text-white font-medium text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" strokeWidth={1.5} />
                  <span>Lanjutkan reservasi ke WhatsApp resmi</span>
                </button>
                <p className="text-[11px] text-slate-400 font-normal text-center mt-2">
                  Staf resepsionis akan mengonfirmasi ketersediaan slot perawat/dokter pada jam kerja.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}