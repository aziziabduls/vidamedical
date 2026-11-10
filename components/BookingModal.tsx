'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SelectDemo, { type SelectOptionItem } from '@/components/shadcn-studio/select/select-10';
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

type ServiceCategory = 'vidaboost' | 'vidahealth' | 'vidafit' | 'homecare' | 'vaksinasi';

const VIDAFIT_OPTIONS: SelectOptionItem[] = [
  { label: 'Program Evaluasi VidaFit (Dokter Sp.GK)', value: 'Program Evaluasi VidaFit (Dokter Sp.GK)' },
  {
    label: 'VidaFit Complete (Meal Plan + InBody + Suplemen BPOM)',
    value: 'VidaFit Complete (Meal Plan + InBody + Suplemen BPOM)',
  },
  {
    label: 'VidaFit Medical Metabolic Injections Program',
    value: 'VidaFit Medical Metabolic Injections Program',
  },
];

const TIME_SLOT_OPTIONS: SelectOptionItem[] = [
  { label: '09:00 WIB (Pagi)', value: '09:00 WIB' },
  { label: '11:00 WIB (Siang)', value: '11:00 WIB' },
  { label: '14:00 WIB (Siang)', value: '14:00 WIB' },
  { label: '16:00 WIB (Sore)', value: '16:00 WIB' },
  { label: '18:30 WIB (Malam)', value: '18:30 WIB' },
];

function getPackageOptions(cat: ServiceCategory): SelectOptionItem[] {
  switch (cat) {
    case 'vidaboost':
      return VIDA_BOOST_TIERS.map((t) => ({
        label: `${t.name} (${t.tagline})`,
        value: t.name,
      }));
    case 'vidahealth':
      return VIDA_HEALTH_PACKAGES.map((p) => ({
        label: `${p.title} (+ Bonus InBody)`,
        value: p.title,
      }));
    case 'vidafit':
      return VIDAFIT_OPTIONS;
    case 'homecare':
      return HOMECARE_SERVICES.map((h) => ({
        label: h.title,
        value: h.title,
      }));
    case 'vaksinasi':
      return VACCINATION_LIST.map((v) => ({
        label: v.name,
        value: v.name,
      }));
  }
}

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
  const [preferredTime, setPreferredTime] = useState('09:00 WIB');

  const packageOptions = useMemo(() => {
    const baseOptions = getPackageOptions(category);
    if (option && !baseOptions.some((item) => item.value === option)) {
      return [{ label: option, value: option }, ...baseOptions];
    }
    return baseOptions;
  }, [category, option]);
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="bg-white rounded-xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden relative"
      >
        {/* Modal Header */}
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-[#0472B5] text-[#ffcf00] flex items-center justify-center font-bold text-xs">
              V
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 leading-tight">
                Reservasi Jadwal Layanan Medis
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
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow"
                >
                  <span>Kirim via WhatsApp Resmi (0811 8951 181)</span>
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
                <SelectDemo
                  name="serviceOption"
                  label="Pilihan paket / tindakan"
                  groupLabel="Pilihan Layanan"
                  items={packageOptions}
                  value={option}
                  onValueChange={(nextOption) => {
                    if (nextOption) setOption(nextOption);
                  }}
                  className="max-w-none space-y-1"
                  labelClassName="text-xs font-medium leading-normal text-slate-700"
                  triggerClassName="w-full data-[size=default]:h-9 px-3 rounded-lg border-slate-300 text-slate-900 bg-white text-xs font-normal focus-visible:ring-1 focus-visible:ring-teal-700 focus-visible:border-teal-700 cursor-pointer"
                  contentClassName="w-auto min-w-(--anchor-width) max-w-[min(92vw,28rem)]"
                />
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
                  <SelectDemo
                    name="preferredTime"
                    label="Waktu / jam"
                    groupLabel="Pilih Jam Kunjungan"
                    items={TIME_SLOT_OPTIONS}
                    value={preferredTime}
                    onValueChange={(nextTime) => {
                      if (nextTime) setPreferredTime(nextTime);
                    }}
                    className="max-w-none space-y-1"
                    labelClassName="text-xs font-medium leading-normal text-slate-700"
                    triggerClassName="w-full data-[size=default]:h-9 px-3 rounded-lg border-slate-300 text-slate-900 bg-white text-xs font-medium focus-visible:ring-1 focus-visible:ring-teal-700 focus-visible:border-teal-700 cursor-pointer"
                  />
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
                  className="w-full py-2.5 px-4 bg-[#ffcf00] hover:bg-[#e5ba00] text-[#02446d] font-bold text-xs sm:text-sm rounded-xl shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" strokeWidth={2} />
                  <span>Lanjutkan Reservasi ke WhatsApp Resmi</span>
                </button>
                <p className="text-[11px] text-slate-400 font-normal text-center mt-2">
                  Staf resepsionis Vida Medical Centre akan mengonfirmasi ketersediaan slot jadwal Anda.
                </p>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}