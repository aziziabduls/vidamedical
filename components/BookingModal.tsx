'use client';

import React, { useEffect, useMemo, useState } from 'react';
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
import { CLINIC_CONTACT } from '@/lib/clinic-data';
import { TRANSITIONS } from '@/lib/motion';

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
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <BookingModalInner
          key={`${initialCategory}-${initialOption || ''}`}
          onClose={onClose}
          initialCategory={initialCategory}
          initialOption={initialOption}
        />
      )}
    </AnimatePresence>
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
    ? (initialCategory.toLowerCase() as ServiceCategory)
    : 'vidaboost';

  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<ServiceCategory>(normalizedCategory);
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

  const handleCategoryChange = (newCat: ServiceCategory) => {
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={TRANSITIONS.fast}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-[#0B2545]/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        initial={{ opacity: 0, scale: 0.97, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 8 }}
        transition={TRANSITIONS.spring}
        className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden relative"
      >
        {/* Modal Header */}
        <div className="px-5 py-4 bg-[#F6F9FC] border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0472B5] text-white flex items-center justify-center font-semibold text-xs">
              V
            </div>
            <div>
              <h3 id="booking-modal-title" className="text-sm font-semibold text-[#0B2545] leading-tight">
                Reservasi Jadwal Layanan Medis
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                Vida Medical Centre · Gedung The Vida & Home Care
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Tutup formulir reservasi"
          >
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5">
          {submitted && confirmedBooking ? (
            <div className="text-center space-y-4 py-2">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mx-auto">
                <Check className="w-5 h-5" strokeWidth={1.5} />
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-semibold text-[#0B2545]">
                  Data reservasi siap dikonfirmasi
                </h4>
                <p className="text-xs text-slate-600 font-normal max-w-md mx-auto">
                  Lanjutkan pengiriman rincian reservasi melalui WhatsApp resmi klinik agar tim resepsionis dapat mengonfirmasi jadwal Anda.
                </p>
              </div>

              <div className="bg-[#F6F9FC] rounded-xl p-4 text-left text-xs space-y-2 border border-slate-200/80">
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500 font-normal">Nama pasien</span>
                  <span className="font-medium text-[#0B2545] text-right">{confirmedBooking.patientName}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500 font-normal">Nomor WhatsApp</span>
                  <span className="font-mono tabular-nums text-[#0B2545]">{confirmedBooking.phone}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500 font-normal">Layanan</span>
                  <span className="font-medium text-[#0B2545] text-right">{confirmedBooking.serviceOption}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500 font-normal">Jadwal</span>
                  <span className="font-mono tabular-nums text-[#0B2545]">
                    {confirmedBooking.preferredDate} · {confirmedBooking.preferredTime}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500 font-normal">Tipe kunjungan</span>
                  <span className="font-medium text-[#0B2545] text-right">
                    {confirmedBooking.visitType === 'homecare'
                      ? 'Layanan ke rumah (Home Care)'
                      : 'Klinik Gedung The Vida'}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-[#0472B5] hover:bg-[#035c93] text-white font-medium text-xs rounded-full transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Kirim via WhatsApp ({CLINIC_CONTACT.whatsappNumberDisplay})</span>
                  <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2 px-4 text-xs font-normal text-slate-600 hover:text-[#0B2545] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Tutup jendela
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-medium text-slate-700 block mb-1.5">
                  Pilih kelompok layanan
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {(
                    [
                      { id: 'vaksinasi', label: 'Vaksinasi' },
                      { id: 'vidahealth', label: 'Medical Check Up' },
                      { id: 'vidaboost', label: 'Vitamin Booster' },
                      { id: 'homecare', label: 'Home Care' },
                      { id: 'vidafit', label: 'Konsultasi Gizi' },
                    ] as const
                  ).map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`py-2 px-2.5 rounded-lg font-medium border transition-colors text-center truncate cursor-pointer ${
                        category === cat.id
                          ? 'border-[#0472B5] bg-[#0472B5] text-white'
                          : 'border-slate-200 bg-[#F6F9FC] text-slate-600 hover:text-[#0B2545]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <SelectDemo
                  name="serviceOption"
                  label="Pilihan paket atau tindakan"
                  groupLabel="Pilihan Layanan"
                  items={packageOptions}
                  value={option}
                  onValueChange={(nextOption) => {
                    if (nextOption) setOption(nextOption);
                  }}
                  className="max-w-none space-y-1"
                  labelClassName="text-xs font-medium leading-normal text-slate-700"
                  triggerClassName="w-full data-[size=default]:h-9 px-3 rounded-lg border-slate-300 text-[#0B2545] bg-white text-xs font-normal focus-visible:ring-1 focus-visible:ring-[#0472B5] focus-visible:border-[#0472B5] cursor-pointer"
                  contentClassName="w-auto min-w-(--anchor-width) max-w-[min(92vw,28rem)]"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1.5">
                  Lokasi tindakan
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setVisitType('clinic')}
                    className={`py-2 px-3 rounded-lg font-medium border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      visitType === 'clinic'
                        ? 'border-[#0472B5] bg-[#EBF4FB] text-[#0472B5]'
                        : 'border-slate-200 bg-white text-slate-600 hover:text-[#0B2545]'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
                    <span className="truncate">Klinik Gedung The Vida</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVisitType('homecare')}
                    className={`py-2 px-3 rounded-lg font-medium border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      visitType === 'homecare'
                        ? 'border-[#0472B5] bg-[#EBF4FB] text-[#0472B5]'
                        : 'border-slate-200 bg-white text-slate-600 hover:text-[#0B2545]'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
                    <span className="truncate">Home Care ke rumah</span>
                  </button>
                </div>
              </div>

              {visitType === 'homecare' && (
                <div>
                  <label className="font-medium text-slate-700 block mb-1">
                    Alamat lengkap kunjungan home care
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Contoh: Jl. Surya Utama No. 12, Kedoya Selatan, Jakarta Barat"
                    value={homeAddress}
                    onChange={(e) => setHomeAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-[#0B2545] focus:outline-none focus:ring-1 focus:ring-[#0472B5] focus:border-[#0472B5]"
                  />
                </div>
              )}

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
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-[#0B2545] bg-white font-mono tabular-nums focus:outline-none focus:ring-1 focus:ring-[#0472B5] focus:border-[#0472B5]"
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
                    triggerClassName="w-full data-[size=default]:h-9 px-3 rounded-lg border-slate-300 text-[#0B2545] bg-white text-xs font-medium focus-visible:ring-1 focus-visible:ring-[#0472B5] focus-visible:border-[#0472B5] cursor-pointer"
                  />
                </div>
              </div>

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
                      className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-300 text-[#0B2545] focus:outline-none focus:ring-1 focus:ring-[#0472B5] focus:border-[#0472B5]"
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
                      className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-300 text-[#0B2545] font-mono tabular-nums focus:outline-none focus:ring-1 focus:ring-[#0472B5] focus:border-[#0472B5]"
                    />
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">
                  Catatan atau keluhan medis (opsional)
                </label>
                <input
                  type="text"
                  placeholder="Riwayat alergi obat, pasca operasi, atau tujuan konsultasi"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-[#0B2545] focus:outline-none focus:ring-1 focus:ring-[#0472B5] focus:border-[#0472B5]"
                />
              </div>

              <div className="pt-2">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-2.5 px-4 bg-[#0472B5] hover:bg-[#035c93] text-white font-medium text-xs sm:text-sm rounded-full shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" strokeWidth={1.5} />
                  <span>Lanjutkan Reservasi via WhatsApp</span>
                </motion.button>
                <p className="text-[11px] text-slate-500 font-normal text-center mt-2">
                  Resepsionis Vida Medical Centre ({CLINIC_CONTACT.whatsappNumberDisplay}) akan mengonfirmasi jadwal Anda.
                </p>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
