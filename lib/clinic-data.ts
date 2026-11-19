export const CLINIC_CONTACT = {
  name: 'Vida Medical Centre',
  shortTagline: 'Layanan kesehatan terpercaya untuk Anda dan keluarga.',
  whatsappNumberDisplay: '0811 5750 260',
  whatsappHref: 'https://wa.me/628115750260',
  phoneTel: 'tel:08115750260',
  instagramHandle: '@vidamedicalcentre',
  instagramUrl: 'https://instagram.com/vidamedicalcentre',
  addressTitle: 'The Vida Building, Lantai 6',
  addressLine:
    'Jl. Perjuangan No.8, RT.1/RW.7, Kebon Jeruk, Kec. Kebon Jeruk, Jakarta Barat 11530',
  hoursShort: 'Senin – Sabtu, 08.00 – 20.00 WIB',
  sundayHours: 'Minggu & Hari Libur: Janji temu khusus & Homecare on-call',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=The+Vida+Building+Jl+Raya+Perjuangan+Kebon+Jeruk+Jakarta+Barat',
} as const;

export interface ServiceSummaryItem {
  id: 'vaksinasi' | 'medical-check-up' | 'vitamin-booster' | 'home-care';
  title: string;
  href: string;
  image: string;
  imageAlt: string;
  description: string;
  bookingCategory: 'vaksinasi' | 'vidahealth' | 'vidaboost' | 'homecare';
  bookingOption: string;
  highlights: string[];
}

export const CORE_SERVICES: ServiceSummaryItem[] = [
  {
    id: 'vaksinasi',
    title: 'Vaksinasi',
    href: '/layanan/vaksinasi',
    image: '/images/service_vaksinasi.jpg',
    imageAlt: 'Perawat Vida Medical Centre memberikan layanan vaksinasi di ruang klinik yang nyaman',
    description:
      'Lindungi diri dan keluarga dari berbagai penyakit dengan vaksinasi yang aman dan terpercaya.',
    bookingCategory: 'vaksinasi',
    bookingOption: 'VidaShield Influenza Quadrivalent',
    highlights: [
      'Penyimpanan rantai dingin terstandar',
      'Vaksin resmi untuk dewasa, anak, dan lansia',
      'Tersedia di klinik maupun kunjungan homecare',
    ],
  },
  {
    id: 'medical-check-up',
    title: 'Medical Check Up',
    href: '/layanan/medical-check-up',
    image: '/images/service_mcu.jpg',
    imageAlt: 'Dokter memeriksa tekanan darah pasien saat sesi Medical Check Up di Vida Medical Centre',
    description:
      'Pemeriksaan kesehatan secara menyeluruh untuk memantau dan menjaga kondisi tubuh Anda.',
    bookingCategory: 'vidahealth',
    bookingOption: 'VidaHealth Comprehensive',
    highlights: [
      'Bonus analisis komposisi tubuh InBody',
      'Laboratorium lengkap, EKG 12-Lead & USG',
      'Konsultasi langsung dengan dokter pemeriksa',
    ],
  },
  {
    id: 'vitamin-booster',
    title: 'Vitamin Booster',
    href: '/layanan/vitamin-booster',
    image: '/images/vidaboost_iv_therapy.jpg',
    imageAlt: 'Pasien beristirahat di lounge infus vitamin VidaBoost di Vida Medical Centre',
    description:
      'Dukungan vitamin dan nutrisi tambahan untuk menjaga daya tahan dan kebugaran tubuh.',
    bookingCategory: 'vidaboost',
    bookingOption: 'VidaBoost Gold',
    highlights: [
      'Empat tingkatan formula (Silver hingga Diamond)',
      'Sediaan farmasi steril resmi terdaftar BPOM',
      'Skrining tanda vital sebelum tindakan infus',
    ],
  },
  {
    id: 'home-care',
    title: 'Home Care',
    href: '/layanan/home-care',
    image: '/images/homecare_medical_nurse.jpg',
    imageAlt: 'Perawat Vida Medical Centre mendampingi pasien lanjut usia dalam layanan home care',
    description:
      'Layanan perawatan medis di rumah yang praktis, aman, dan nyaman sesuai kebutuhan Anda.',
    bookingCategory: 'homecare',
    bookingOption: 'Perawatan Luka (Wound Care)',
    highlights: [
      'Perawatan luka modern, NGT, dan kateter urin',
      'Kunjungan dokter umum dan infus vitamin ke rumah',
      'Peralatan steril sekali pakai oleh perawat berlisensi',
    ],
  },
];

export interface HeroSlide {
  id: string;
  headline: string;
  subheadline: string;
  image: string;
  imageAlt: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'family-care',
    headline: 'Kesehatan Anda,\nPrioritas Kami',
    subheadline:
      'Layanan medis yang dekat, nyaman, dan penuh perhatian untuk Anda dan keluarga.',
    image: '/images/hero_family_care.jpg',
    imageAlt: 'Dokter Vida Medical Centre berkonsultasi hangat dengan ibu dan anak di ruang klinik',
    primaryCtaLabel: 'Jelajahi Layanan',
    primaryCtaHref: '/layanan',
    secondaryCtaLabel: 'Tentang Kami',
    secondaryCtaHref: '/tentang-kami',
  },
  {
    id: 'preventive-mcu',
    headline: 'Skrining Tepat,\nHidup Lebih Tenang',
    subheadline:
      'Evaluasi kesehatan menyeluruh, tes laboratorium terkalibrasi, dan analisis komposisi tubuh InBody dalam satu kunjungan.',
    image: '/images/hero_mcu_screening.jpg',
    imageAlt: 'Dokter menjelaskan hasil pemeriksaan kesehatan preventif kepada pasien',
    primaryCtaLabel: 'Paket Check Up',
    primaryCtaHref: '/layanan/medical-check-up',
    secondaryCtaLabel: 'Lihat Promo',
    secondaryCtaHref: '/promo',
  },
  {
    id: 'clinic-lounge',
    headline: 'Nyaman di Klinik,\nSiaga di Rumah',
    subheadline:
      'Temui tim medis kami di Gedung The Vida Kebon Jeruk atau jadwalkan kunjungan perawat langsung ke kediaman Anda.',
    image: '/images/bg_hero_vida.jpeg',
    imageAlt: 'Ruang konsultasi modern Vida Medical Centre di Gedung The Vida Kebon Jeruk',
    primaryCtaLabel: 'Layanan Home Care',
    primaryCtaHref: '/layanan/home-care',
    secondaryCtaLabel: 'Hubungi Kami',
    secondaryCtaHref: '/kontak',
  },
];

export interface PromoOffer {
  id: string;
  title: string;
  category: 'Vaksinasi' | 'Medical Check Up' | 'Vitamin Booster' | 'Home Care';
  bookingCategory: 'vaksinasi' | 'vidahealth' | 'vidaboost' | 'homecare';
  bookingOption: string;
  badge: string;
  priceLabel: string;
  regularNote: string;
  summary: string;
  inclusions: string[];
  validUntil: string;
}

export const PROMO_OFFERS: PromoOffer[] = [
  {
    id: 'promo-vidaboost-gold',
    title: 'Paket Pemulihan Stamina VidaBoost Gold',
    category: 'Vitamin Booster',
    bookingCategory: 'vidaboost',
    bookingOption: 'VidaBoost Gold',
    badge: 'Paling Diminati',
    priceLabel: 'Rp 750.000',
    regularNote: 'Termasuk pemeriksaan tanda vital & ruang lounge privat',
    summary:
      'Infus Vitamin C murni 1000mg, B-Complex, B12, Zinc, dan Magnesium untuk memulihkan energi setelah aktivitas padat atau perjalanan.',
    inclusions: [
      'Skrining tekanan darah, nadi, dan saturasi oksigen',
      'Durasi infus 45 menit di kursi recliner privat',
      'Tersedia opsi kunjungan Home Care di area Jakarta Barat',
    ],
    validUntil: 'Berlaku Senin – Sabtu',
  },
  {
    id: 'promo-mcu-inbody',
    title: 'VidaHealth Comprehensive + Gratis Tes InBody',
    category: 'Medical Check Up',
    bookingCategory: 'vidahealth',
    bookingOption: 'VidaHealth Comprehensive',
    badge: 'Bonus InBody',
    priceLabel: 'Rp 1.650.000',
    regularNote: 'Analisis InBody 770 disertakan tanpa biaya tambahan',
    summary:
      'Pemeriksaan organ vital meliputi darah lengkap, profil lipid, fungsi hati, fungsi ginjal, EKG jantung 12-Lead, dan konsultasi dokter.',
    inclusions: [
      'Rekam Jantung EKG 12-Lead dan pemeriksaan visus mata',
      'Panel metabolik lengkap termasuk gula darah puasa',
      'Laporan komposisi lemak visceral & massa otot InBody',
    ],
    validUntil: 'Berlaku untuk reservasi H-1',
  },
  {
    id: 'promo-vaksin-flu',
    title: 'Imunisasi Tahunan VidaShield Influenza 4-Valen',
    category: 'Vaksinasi',
    bookingCategory: 'vaksinasi',
    bookingOption: 'VidaShield Influenza Quadrivalent',
    badge: 'Perlindungan Keluarga',
    priceLabel: 'Konsultasi Tarif',
    regularNote: 'Tersedia harga khusus untuk 2 orang atau lebih dalam satu keluarga',
    summary:
      'Perlindungan terhadap 4 strain virus influenza rekomendasi WHO terkini dengan pengelolaan rantai dingin farmasi terstandar.',
    inclusions: [
      'Pemeriksaan kelayakan fisik singkat sebelum injeksi',
      'Cocok untuk dewasa, lansia, dan anak usia di atas 6 bulan',
      'Dapat dijadwalkan di klinik maupun di rumah',
    ],
    validUntil: 'Stok vaksin tersedia setiap hari kerja',
  },
  {
    id: 'promo-homecare-wound',
    title: 'Kunjungan Perawat Rawat Luka Modern ke Rumah',
    category: 'Home Care',
    bookingCategory: 'homecare',
    bookingOption: 'Perawatan Luka (Wound Care)',
    badge: 'Area Kebon Jeruk & Sekitarnya',
    priceLabel: 'Mulai Rp 350.000',
    regularNote: 'Sudah termasuk set balutan steril sekali pakai',
    summary:
      'Penanganan luka pasca operasi, luka diabetes, maupun perawatan pasien tirah baring oleh perawat berlisensi bersertifikat wound care.',
    inclusions: [
      'Set dressing modern hidrokoloid/hidrogel steril',
      'Evaluasi perkembangan penyembuhan luka terdokumentasi',
      'Koordinasi jadwal cepat melalui WhatsApp klinik',
    ],
    validUntil: 'Tersedia penjadwalan harian',
  },
  {
    id: 'promo-mcu-basic',
    title: 'VidaHealth Basic Check untuk Profesional Aktif',
    category: 'Medical Check Up',
    bookingCategory: 'vidahealth',
    bookingOption: 'VidaHealth Basic Check',
    badge: 'Skrining Rutin',
    priceLabel: 'Rp 650.000',
    regularNote: 'Termasuk pemeriksaan fisik dokter & bonus InBody',
    summary:
      'Paket skrining tahunan yang ringkas untuk memantau kadar gula darah, kolesterol total, trigliserida, dan kondisi fisik umum.',
    inclusions: [
      'Hematologi darah lengkap & gula darah puasa',
      'Profil kolesterol total dan trigliserida',
      'Bonus Full Body Composition Test (InBody)',
    ],
    validUntil: 'Berlaku Senin – Sabtu',
  },
  {
    id: 'promo-vidaboost-platinum',
    title: 'VidaBoost Platinum Antioxidant & Cellular Care',
    category: 'Vitamin Booster',
    bookingCategory: 'vidaboost',
    bookingOption: 'VidaBoost Platinum',
    badge: 'Formula Antioksidan',
    priceLabel: 'Rp 1.250.000',
    regularNote: 'Dengan Glutathione murni & Alpha Lipoic Acid',
    summary:
      'Infus kombinasi antioksidan dosis terukur dan vitamin esensial untuk membantu pemulihan kelelahan berat dan kesehatan seluler.',
    inclusions: [
      'Pure Glutathione 1200mg & Vitamin C High Dose',
      'Alpha Lipoic Acid & B-Complex lengkap',
      'Konsultasi dokter sebelum tindakan infus',
    ],
    validUntil: 'Berlaku dengan janji temu',
  },
];
