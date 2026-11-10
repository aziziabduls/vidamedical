'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, Calendar, ShieldAlert } from 'lucide-react';

interface FloatingChatProps {
  onOpenBooking: () => void;
}

export default function FloatingChat({ onOpenBooking }: FloatingChatProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Popover Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="mb-3 w-76 bg-white rounded-xl shadow-xl border border-slate-200 p-4 text-slate-800"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-[#1c2674] flex items-center justify-center text-amber-400 font-bold text-xs">
                  V
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">
                    Resepsionis Vida
                  </h4>
                  <div className="text-[10px] text-emerald-700 font-medium">
                    Pelayanan Aktif
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Tutup menu chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
              Butuh bantuan mengenai jadwal dokter, paket MCU, atau reservasi infus VidaBoost di Gedung The Vida?
            </p>

            <div className="mt-3.5 space-y-1.5">
              <a
                href="https://wa.me/628118951181"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/80 transition-colors text-xs font-semibold"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="text-left">
                  <div>WhatsApp Resepsionis</div>
                  <div className="text-[10px] text-emerald-700 font-normal">0811 8951 181</div>
                </div>
              </a>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center space-x-2 p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 transition-colors text-xs font-semibold cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#1c2674] shrink-0" />
                <div className="text-left">
                  <div>Formulir Janji Temu</div>
                  <div className="text-[10px] text-slate-500 font-normal">Pilih jadwal konsultasi dokter</div>
                </div>
              </button>

              <a
                href="tel:0215367890"
                className="flex items-center space-x-2 p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 transition-colors text-xs font-semibold"
              >
                <Phone className="w-4 h-4 text-slate-600 shrink-0" />
                <div className="text-left">
                  <div>Hotline Klinik</div>
                  <div className="text-[10px] text-slate-500 font-normal">(021) 5367-8900</div>
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3.5 py-2.5 rounded-full bg-[#1c2674] hover:bg-[#151e52] text-white shadow-lg border border-slate-700/50 transition-colors cursor-pointer"
        aria-label="Layanan Bantuan Pasien"
      >
        <MessageCircle className="w-4 h-4 text-amber-400" />
        <span className="text-xs font-semibold">
          Layanan Pasien
        </span>
      </motion.button>
    </div>
  );
}
