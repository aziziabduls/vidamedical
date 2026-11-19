'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Calendar } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import LocationContactSection from '@/components/LocationContactSection';
import FAQSection from '@/components/FAQSection';
import SelectDemo, { type SelectOptionItem } from '@/components/shadcn-studio/select/select-10';
import { useBooking } from '@/components/BookingProvider';
import { CLINIC_CONTACT } from '@/lib/clinic-data';
import { fadeUpVariants, TRANSITIONS, VIEWPORT_ONCE } from '@/lib/motion';

const TOPIC_OPTIONS: SelectOptionItem[] = [
  { label: 'Informasi & Reservasi Vaksinasi', value: 'Vaksinasi' },
  { label: 'Paket Medical Check Up (MCU)', value: 'Medical Check Up' },
  { label: 'Terapi Vitamin Booster (VidaBoost)', value: 'Vitamin Booster' },
  { label: 'Layanan Home Care ke Rumah', value: 'Home Care' },
  { label: 'Kerjasama MCU & Vaksinasi Korporasi', value: 'Kerjasama Korporasi' },
];

export default function KontakClient() {
  const { openBooking } = useBooking();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('Vaksinasi');
  const [message, setMessage] = useState('');

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const text =
      `Halo Vida Medical Centre,\n` +
      `Nama: ${name.trim()}\n` +
      `Nomor Kontak: ${phone.trim()}\n` +
      `Keperluan: ${topic}\n` +
      (message.trim() ? `Pesan: ${message.trim()}\n` : '') +
      `\nMohon informasi lebih lanjut. Terima kasih.`;

    window.open(`${CLINIC_CONTACT.whatsappHref}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <main className="flex-1 bg-[#F6F9FC]">
      <PageHeader
        breadcrumbs={[
          { label: 'Beranda', href: '/' },
          { label: 'Kontak' },
        ]}
        eyebrow="Kontak & lokasi"
        title="Hubungi Kami & Kunjungi Klinik"
        description="Tim resepsionis Vida Medical Centre siap membantu penjadwalan konsultasi, paket check up, vaksinasi, dan koordinasi home care."
        actions={
          <motion.button
            whileTap={{ scale: 0.98 }}
            transition={TRANSITIONS.fast}
            type="button"
            onClick={() => openBooking('vidaboost', 'VidaBoost Gold')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0472B5] hover:bg-[#035c93] text-white font-medium text-sm shadow-xs transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4" strokeWidth={1.5} />
            <span>Buat Janji Temu</span>
          </motion.button>
        }
      />

      {/* Location & Operating Details */}
      <LocationContactSection />

      {/* Direct WhatsApp Inquiry Form */}
      <section className="pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_2px_rgba(11,37,69,0.04)] p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-3">
                <span className="text-xs font-medium text-[#0472B5]">Kirim pesan cepat</span>
                <h2 className="text-2xl font-semibold text-[#0B2545] tracking-tight">
                  Konsultasikan Kebutuhan Anda via WhatsApp
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Lengkapi formulir singkat ini untuk langsung terhubung ke WhatsApp resmi Vida Medical Centre ({CLINIC_CONTACT.whatsappNumberDisplay}).
                </p>
                <div className="pt-2 text-xs text-slate-500">
                  Operasional balasan resepsionis setiap Senin – Sabtu pukul 08.00 – 20.00 WIB.
                </div>
              </div>

              <form onSubmit={handleWhatsAppSubmit} className="lg:col-span-7 space-y-4 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-slate-700 mb-1.5">
                      Nama lengkap
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Nama Anda"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-[#0B2545] focus:outline-none focus:ring-1 focus:ring-[#0472B5] focus:border-[#0472B5]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-medium text-slate-700 mb-1.5">
                      Nomor WhatsApp / Telepon
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      placeholder="0812xxxxxxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono tabular-nums text-[#0B2545] focus:outline-none focus:ring-1 focus:ring-[#0472B5] focus:border-[#0472B5]"
                    />
                  </div>
                </div>

                <div>
                  <SelectDemo
                    name="contactTopic"
                    label="Topik layanan"
                    groupLabel="Pilih Topik"
                    items={TOPIC_OPTIONS}
                    value={topic}
                    onValueChange={(nextTopic) => {
                      if (nextTopic) setTopic(nextTopic);
                    }}
                    className="max-w-none space-y-1.5"
                    labelClassName="text-xs font-medium text-slate-700"
                    triggerClassName="w-full data-[size=default]:h-10 px-3.5 rounded-xl border-slate-300 text-[#0B2545] bg-white text-sm font-normal focus-visible:ring-1 focus-visible:ring-[#0472B5] focus-visible:border-[#0472B5] cursor-pointer"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-slate-700 mb-1.5">
                    Pesan atau pertanyaan
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    placeholder="Tuliskan jadwal yang diinginkan atau layanan yang ingin ditanyakan"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-[#0B2545] focus:outline-none focus:ring-1 focus:ring-[#0472B5] focus:border-[#0472B5]"
                  />
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0472B5] hover:bg-[#035c93] text-white font-medium text-sm transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                  <span>Kirim Pesan via WhatsApp ({CLINIC_CONTACT.whatsappNumberDisplay})</span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <FAQSection />
    </main>
  );
}
