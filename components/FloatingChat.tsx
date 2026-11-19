'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, Calendar } from 'lucide-react';
import { CLINIC_CONTACT } from '@/lib/clinic-data';
import { TRANSITIONS } from '@/lib/motion';

interface FloatingChatProps {
  onOpenBooking: () => void;
}

export default function FloatingChat({ onOpenBooking }: FloatingChatProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={TRANSITIONS.fast}
            className="mb-3 w-76 bg-white rounded-2xl shadow-[0_12px_32px_rgba(11,37,69,0.12)] border border-slate-200/90 p-4 text-[#0B2545]"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0472B5] flex items-center justify-center text-white font-semibold text-xs">
                  V
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#0B2545] leading-tight">
                    Resepsionis Vida
                  </h4>
                  <div className="text-[11px] text-emerald-700 font-medium">
                    Pelayanan Aktif
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Tutup menu bantuan"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>

            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              Butuh bantuan mengenai jadwal dokter, paket check up, vaksinasi, atau layanan home care?
            </p>

            <div className="mt-3.5 space-y-2">
              <a
                href={CLINIC_CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 text-emerald-900 border border-emerald-200/70 transition-colors text-xs font-medium"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700 shrink-0" strokeWidth={1.5} />
                <div className="text-left">
                  <div>WhatsApp Resepsionis</div>
                  <div className="text-[11px] text-emerald-800 font-mono tabular-nums font-normal">
                    {CLINIC_CONTACT.whatsappNumberDisplay}
                  </div>
                </div>
              </a>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F6F9FC] hover:bg-[#EBF4FB] text-[#0B2545] border border-slate-200/80 transition-colors text-xs font-medium cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#0472B5] shrink-0" strokeWidth={1.5} />
                <div className="text-left">
                  <div>Formulir Janji Temu</div>
                  <div className="text-[11px] text-slate-500 font-normal">
                    Pilih layanan dan jadwal kunjungan
                  </div>
                </div>
              </button>

              <a
                href={CLINIC_CONTACT.phoneTel}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#F6F9FC] hover:bg-[#EBF4FB] text-[#0B2545] border border-slate-200/80 transition-colors text-xs font-medium"
              >
                <Phone className="w-4 h-4 text-slate-600 shrink-0" strokeWidth={1.5} />
                <div className="text-left">
                  <div>Hotline Klinik</div>
                  <div className="text-[11px] text-slate-500 font-mono tabular-nums font-normal">
                    {CLINIC_CONTACT.whatsappNumberDisplay}
                  </div>
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.97 }}
        transition={TRANSITIONS.fast}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0472B5] hover:bg-[#035c93] text-white shadow-md transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0472B5]"
        aria-label="Layanan Bantuan Pasien"
      >
        <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
        <span className="text-xs font-medium">Layanan Pasien</span>
      </motion.button>
    </div>
  );
}
