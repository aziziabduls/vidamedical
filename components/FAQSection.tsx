'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Apakah terapi infus vitamin VidaBoost memerlukan konsultasi dokter sebelum tindakan?',
      a: 'Ya. Seluruh pasien akan menjalani skrining tanda vital singkat (tekanan darah, detak jantung, riwayat alergi) oleh tenaga medis sebelum infus dimulai. Seluruh formula vitamin, elektrolit, dan antioksidan (seperti glutathione dan zinc) menggunakan sediaan farmasi steril resmi BPOM.',
    },
    {
      q: 'Apa saja cakupan Paket Medical Check Up (MCU) VidaHealth?',
      a: 'Pemeriksaan fisik dokter umum, skrining visus mata, laboratorium darah lengkap (profil lipid kolesterol, fungsi hati SGOT/SGPT, fungsi ginjal ureum/kreatinin/asam urat, gula darah puasa), urinalisis, EKG jantung, serta bonus analisis komposisi tubuh InBody tanpa biaya tambahan.',
    },
    {
      q: 'Bagaimana prosedur pemesanan Layanan Homecare ke rumah?',
      a: 'Anda dapat mengisi formulir reservasi online di website ini atau langsung menghubungi WhatsApp 0811 5750 260. Informasikan jenis tindakan yang dibutuhkan (perawatan luka pasca bedah/diabetes, penggantian NGT, kateter urin, atau infus vitamin). Tim perawat berlisensi kami akan datang sesuai jadwal dengan kit peralatan steril.',
    },
    {
      q: 'Apa perbedaan program penurunan berat badan VidaFit dengan diet mandiri?',
      a: 'VidaFit diawasi langsung oleh Dokter Spesialis Gizi Klinis (Sp.GK). Evaluasi didasarkan pada data komposisi lemak dan otot dari tes InBody, penyusunan meal plan kalori terarah sesuai metabolisme pasien, suplementasi terdaftar BPOM, serta terapi injeksi metabolisme klinis bila diindikasikan.',
    },
    {
      q: 'Bagaimana petunjuk arah menuju lokasi klinik di Gedung The Vida Kebon Jeruk?',
      a: 'Klinik berada di Gedung The Vida, Lantai Dasar, Jl. Raya Perjuangan No. 8, Kebon Jeruk, Jakarta Barat. Sangat dekat dengan pintu keluar tol Kebon Jeruk (Tol Jakarta-Tangerang), dekat Studio RCTI dan RS Siloam Kebon Jeruk. Gedung menyediakan lobi drop-off dan area parkir basement luas.',
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-800">
            <HelpCircle className="w-3.5 h-3.5 text-teal-800" strokeWidth={1.5} />
            <span>Pertanyaan umum</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-950 tracking-tight">
            Pertanyaan yang sering diajukan
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-normal">
            Informasi praktis seputar layanan medis, persiapan MCU, dan prosedur homecare di Vida Medical Centre.
          </p>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div
                key={idx}
                className="rounded-lg border border-slate-200 overflow-hidden bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-medium text-slate-900 text-xs sm:text-sm hover:text-teal-900 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-150 ${
                      isOpen ? 'rotate-180 text-slate-800' : ''
                    }`}
                    strokeWidth={1.5}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}