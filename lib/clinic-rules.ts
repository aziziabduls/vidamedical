/**
 * Vida Medical Centre - Clinic Rules & Pure Utilities
 * Location: The Vida Building, Jl. Raya Perjuangan, Kebon Jeruk, Jakarta Barat
 * WhatsApp / Phone: 0811 5750 260
 * Instagram: @vidamedicalcentre
 */

export interface BookingPayload {
  patientName: string;
  phone: string;
  serviceCategory: 'vidaboost' | 'vidahealth' | 'vidafit' | 'homecare' | 'vaksinasi';
  serviceOption: string;
  preferredDate: string;
  preferredTime: string;
  visitType: 'clinic' | 'homecare';
  homeAddress?: string;
  notes?: string;
}

export interface IVTier {
  id: 'silver' | 'gold' | 'platinum' | 'diamond';
  name: string;
  tagline: string;
  durationMinutes: number;
  highlightNutrients: string[];
  bestFor: string;
  badge?: string;
}

export const VIDA_BOOST_TIERS: IVTier[] = [
  {
    id: 'silver',
    name: 'VidaBoost Silver',
    tagline: 'Immune Kickstart & Rehydration',
    durationMinutes: 30,
    highlightNutrients: ['Vitamin C Murni 1000mg', 'B-Complex Formulated', 'Balanced Electrolytes'],
    bestFor: 'Kelelahan ringan, dehidrasi pasca aktivitas padat, perlindungan daya tahan harian.',
  },
  {
    id: 'gold',
    name: 'VidaBoost Gold',
    tagline: 'Vitality, Energy & Stamina Recovery',
    durationMinutes: 45,
    highlightNutrients: ['High-Dose Vitamin C', 'B-Complex + B12', 'Zinc Mineral', 'Magnesium Infusion'],
    bestFor: 'Memulihkan energi cepat saat deadline tinggi, jet lag, atau pasca sakit flu.',
    badge: 'Paling Populer',
  },
  {
    id: 'platinum',
    name: 'VidaBoost Platinum',
    tagline: 'Antioxidant Glow & Cellular Health',
    durationMinutes: 45,
    highlightNutrients: ['Pure Glutathione 1200mg', 'Vitamin C High Dose', 'Alpha Lipoic Acid', 'B-Complex Plus'],
    bestFor: 'Detoksifikasi seluler mendalam, mencerahkan kulit kusam, dan perlindungan anti-aging radikal bebas.',
  },
  {
    id: 'diamond',
    name: 'VidaBoost Diamond',
    tagline: 'Ultimate Executive Wellness & Longevity',
    durationMinutes: 60,
    highlightNutrients: ['Maximum Glutathione', 'Super Antioxidant Complex', 'Complete Multivitamin Amino', 'High Potency Zinc & CoQ10'],
    bestFor: 'Optimalisasi performa eksekutif puncak, imunoproteksi maksimal, dan peremajaan seluler paripurna.',
    badge: 'Exclusive Care',
  },
];

export interface MCUPackage {
  id: string;
  title: string;
  subtitle: string;
  includesBonusBodyComposition: boolean;
  features: string[];
  recommendedFor: string;
}

export const VIDA_HEALTH_PACKAGES: MCUPackage[] = [
  {
    id: 'essential',
    title: 'VidaHealth Basic Check',
    subtitle: 'Pemeriksaan Kesehatan Rutin Tahunan',
    includesBonusBodyComposition: true,
    features: [
      'Pemeriksaan Fisik Dokter Umum Lengkap',
      'Pemeriksaan Visus & Kesehatan Mata',
      'Tanda Vital & Tekanan Darah Terstandar',
      'Hematologi Lengkap (Darah Rutin)',
      'Gula Darah Puasa (GDP)',
      'Profil Kolesterol Total & Trigliserida',
      'BONUS: Full Body Composition Test (InBody)',
    ],
    recommendedFor: 'Individu usia muda, skrining kerja, dan pemantauan kesehatan rutin tahunan.',
  },
  {
    id: 'comprehensive',
    title: 'VidaHealth Comprehensive',
    subtitle: 'Skrining Menyeluruh Organ Utama',
    includesBonusBodyComposition: true,
    features: [
      'Konsultasi Mendalam Dokter & Pemeriksaan Fisik',
      'Pemeriksaan Visus Mata & Buta Warna',
      'Rekam Jantung Elektrokardiogram (EKG 12-Lead)',
      'Profil Lipid Lengkap (HDL, LDL, Total, Trigliserida)',
      'Fungsi Hati Lengkap (SGOT, SGPT)',
      'Fungsi Ginjal Lengkap (Ureum, Kreatinin, Asam Urat)',
      'Urinalisis Lengkap',
      'BONUS: Full Body Composition Test & Konsultasi Hasil',
    ],
    recommendedFor: 'Usia 30+ tahun, profesional aktif, riwayat sindrom metabolik keluarga.',
  },
  {
    id: 'executive',
    title: 'VidaHealth Executive Longevity',
    subtitle: 'Paket VIP Wellness Terlengkap',
    includesBonusBodyComposition: true,
    features: [
      'Konsultasi Dokter & Spesialis Pendamping',
      'Skrining Mata Komprehensif',
      'EKG Jantung 12-Lead dengan Analisis Dokter',
      'Laboratorium Metabolik Lengkap + HbA1c (Kontrol Gula 3 Bulan)',
      'Profil Lipid, Hati, & Ginjal Lengkap',
      'Pemeriksaan Marker Inflamasi & Elektrolit',
      'BONUS: Full Body Composition Test (InBody Segmental)',
      'Free 1x Sesi VidaBoost Silver Post-MCU',
    ],
    recommendedFor: 'Eksekutif, pimpinan perusahaan, dan individu yang mengutamakan proteksi preventif komprehensif.',
  },
];

export interface HomecareService {
  id: string;
  title: string;
  category: string;
  description: string;
  includedEquipments: string[];
}

export const HOMECARE_SERVICES: HomecareService[] = [
  {
    id: 'wound-care',
    title: 'Perawatan Luka (Wound Care)',
    category: 'Perawatan Medis',
    description: 'Penanganan steril luka pasca operasi, luka dekubitus (bedridden), maupun luka diabetes basah/kering dengan teknik aseptik terstandar.',
    includedEquipments: ['Set balutan modern luka', 'Larutan antiseptik medis', 'Perawat berlisensi bersertifikat wound care'],
  },
  {
    id: 'ngt-feeding-tube',
    title: 'Pemasangan & Penggantian NGT',
    category: 'Tindakan Keperawatan',
    description: 'Pemasangan selang makan (Nasogastric Tube) langsung di ranjang pasien dengan konfirmasi kepatenan posisi yang aman dan minim trauma.',
    includedEquipments: ['Selang NGT steril berkualitas tinggi', 'Pelumas anestesi', 'Stetoskop uji aspirasi lambung'],
  },
  {
    id: 'urinary-catheter',
    title: 'Pemasangan & Pelepasan Kateter Urin',
    category: 'Tindakan Keperawatan',
    description: 'Pemasangan kateter urin (Foley catheter) dengan teknik steril untuk kenyamanan pasien pasca rawat inap atau lansia di rumah.',
    includedEquipments: ['Foley catheter silikon', 'Urine bag tertutup anti-reflux', 'Spuit & aquadest steril'],
  },
  {
    id: 'home-iv-therapy',
    title: 'Homecare VidaBoost IV Infusion',
    category: 'Wellness & Stamina',
    description: 'Layanan infus vitamin VidaBoost langsung di rumah atau kantor Anda di area Jakarta tanpa perlu menembus kemacetan.',
    includedEquipments: ['IV kit & tiang infus portabel', 'Suplemen vitamin steril', 'Monitoring tanda vital sebelum & sesudah infus'],
  },
  {
    id: 'home-doctor-visit',
    title: 'Kunjungan Dokter Umum ke Rumah',
    category: 'Pemeriksaan Klinis',
    description: 'Pemeriksaan kondisi klinis, diagnosis, resep obat medis resmi, serta rekomendasi penanganan lanjut untuk keluarga tercinta.',
    includedEquipments: ['Alat diagnostik portabel', 'Resep medis resmi', 'Pemeriksaan fisik komprehensif'],
  },
];

export interface VaccinationItem {
  id: string;
  name: string;
  type: string;
  protection: string;
  frequency: string;
}

export const VACCINATION_LIST: VaccinationItem[] = [
  {
    id: 'influenza',
    name: 'VidaShield Influenza Quadrivalent',
    type: 'Vaksin Flu 4-Valen',
    protection: 'Melindungi dari 4 strain virus influenza terbaru rekomendasi WHO (2 strain Influenza A dan 2 strain Influenza B).',
    frequency: '1 kali setiap tahun untuk dewasa & anak di atas 6 bulan.',
  },
  {
    id: 'pneumonia',
    name: 'Vaksin Pneumonia (PCV13 / PPSV23)',
    type: 'Pencegahan Paru-paru & Radang',
    protection: 'Melindungi dari bakteri Streptococcus pneumoniae penyebab infeksi paru-paru (pneumonia), bakteremia, dan meningitis.',
    frequency: 'Sesuai rekomendasi dokter, esensial untuk lansia dan komorbid.',
  },
  {
    id: 'hpv',
    name: 'Vaksin Kanker Serviks (HPV 9-Valen)',
    type: 'Pencegahan Onkogenik HPV',
    protection: 'Memberikan proteksi terhadap 9 strain HPV penyebab kanker serviks, kanker anus, dan kutil kelamin pada wanita maupun pria.',
    frequency: '2 atau 3 dosis sesuai rentang usia pasien.',
  },
  {
    id: 'hepatitis-b',
    name: 'Vaksin Hepatitis B Dewasa',
    type: 'Pencegahan Liver & Hepatitis',
    protection: 'Mencegah infeksi virus Hepatitis B kronis yang dapat berisiko menyebabkan sirosis serta kanker hati.',
    frequency: '3 dosis (bulan ke-0, 1, dan 6) dengan skrining HBsAg awal.',
  },
];

/**
 * Calculate Body Mass Index (BMI) using Asia-Pacific WHO criteria
 */
export function calculateBMI(weightKg: number, heightCm: number): {
  bmi: number;
  category: string;
  riskDescription: string;
  idealWeightRange: { min: number; max: number };
} {
  if (weightKg <= 0 || heightCm <= 0) {
    throw new Error('Berat badan dan tinggi badan harus lebih besar dari 0');
  }

  const heightM = heightCm / 100;
  const bmiRaw = weightKg / (heightM * heightM);
  const bmi = Math.round(bmiRaw * 10) / 10;

  // Asia-Pacific BMI Categories
  let category = 'Normal';
  let riskDescription = 'Berat badan proporsional dan risiko metabolik rendah.';

  if (bmi < 18.5) {
    category = 'Berat Badan Kurang (Underweight)';
    riskDescription = 'Perlu asupan nutrisi seimbang untuk meningkatkan massa otot dan daya tahan tubuh.';
  } else if (bmi >= 18.5 && bmi < 23.0) {
    category = 'Normal (Ideal)';
    riskDescription = 'Pertahankan komposisi tubuh sehat dengan olahraga teratur dan diet seimbang.';
  } else if (bmi >= 23.0 && bmi < 25.0) {
    category = 'Kelebihan Berat Badan (Overweight)';
    riskDescription = 'Mulai tingkatkan kewaspadaan terhadap risiko sindrom metabolik dan kolesterol.';
  } else if (bmi >= 25.0 && bmi < 30.0) {
    category = 'Obesitas Tingkat 1';
    riskDescription = 'Sangat disarankan evaluasi komposisi lemak tubuh bersama Dokter Spesialis Gizi Klinis di program VidaFit.';
  } else {
    category = 'Obesitas Tingkat 2';
    riskDescription = 'Prioritaskan intervensi medis terarah untuk menurunkan risiko kardiovaskular dan diabetes.';
  }

  // Ideal weight range based on BMI 18.5 - 22.9
  const minIdeal = Math.round(18.5 * heightM * heightM * 10) / 10;
  const maxIdeal = Math.round(22.9 * heightM * heightM * 10) / 10;

  return {
    bmi,
    category,
    riskDescription,
    idealWeightRange: { min: minIdeal, max: maxIdeal },
  };
}

/**
 * Estimate Basal Metabolic Rate (BMR) & Daily Caloric Needs using Mifflin-St Jeor
 */
export function estimateCaloricTarget(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: 'male' | 'female',
  goal: 'loss' | 'maintain' | 'vitality' = 'loss'
): {
  bmr: number;
  tdee: number;
  targetDailyCalories: number;
} {
  // Mifflin-St Jeor Formula
  let bmrRaw = 10 * weightKg + 6.25 * heightCm - 5 * age;
  if (gender === 'male') {
    bmrRaw += 5;
  } else {
    bmrRaw -= 161;
  }
  const bmr = Math.round(bmrRaw);

  // Moderate sedentary/office worker factor (1.375)
  const tdee = Math.round(bmr * 1.35);

  let targetDailyCalories = tdee;
  if (goal === 'loss') {
    // Safe caloric deficit guided by nutrition specialists
    targetDailyCalories = Math.max(1200, tdee - 450);
  } else if (goal === 'vitality') {
    targetDailyCalories = Math.round(tdee * 1.05);
  }

  return {
    bmr,
    tdee,
    targetDailyCalories,
  };
}

/**
 * Check if the clinic is currently open based on Jakarta local time (WIB / UTC+7)
 * Monday - Saturday: 08:00 - 20:00 WIB
 * Sunday: By appointment / Homecare on-call
 */
export function checkClinicOperatingStatus(referenceDate: Date = new Date()): {
  isOpen: boolean;
  statusText: string;
  details: string;
} {
  // Convert to UTC+7 (Jakarta Time)
  const utc = referenceDate.getTime() + referenceDate.getTimezoneOffset() * 60000;
  const wibDate = new Date(utc + 3600000 * 7);

  const dayOfWeek = wibDate.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
  const hours = wibDate.getHours();
  const minutes = wibDate.getMinutes();
  const timeInMinutes = hours * 60 + minutes;

  const openTime = 8 * 60; // 08:00
  const closeTime = 20 * 60; // 20:00

  if (dayOfWeek === 0) {
    return {
      isOpen: false,
      statusText: 'Minggu: Reservasi Khusus & Homecare On-Call',
      details: 'Layanan klinik fisik buka kembali Senin pk 08.00. Tim Homecare tetap melayani janji temu terjadwal.',
    };
  }

  if (timeInMinutes >= openTime && timeInMinutes < closeTime) {
    return {
      isOpen: true,
      statusText: 'Buka Sekarang (08.00 - 20.00 WIB)',
      details: 'Klinik di Gedung The Vida buka dan siap melayani reservasi maupun konsultasi.',
    };
  }

  return {
    isOpen: false,
    statusText: 'Tutup Saat Ini (Buka pk 08.00 WIB)',
    details: 'Reservasi WhatsApp tetap dapat dikirim 24 jam dan akan dikonfirmasi prioritas oleh staf resepsionis.',
  };
}

/**
 * Format WhatsApp message URL for direct booking with 0811 5750 260
 */
export function formatWhatsAppBookingUrl(booking: BookingPayload): string {
  const WHATSAPP_PHONE = '628115750260';

  const categoryLabels: Record<string, string> = {
    vidaboost: 'VidaBoost IV Vitamin Therapy',
    vidahealth: 'VidaHealth Medical Check Up (MCU)',
    vidafit: 'VidaFit Medical Weight Management',
    homecare: 'Layanan Homecare Medis ke Rumah',
    vaksinasi: 'Layanan Vaksinasi (VidaShield)',
  };

  const visitLabel = booking.visitType === 'homecare' ? 'Layanan ke Rumah (Homecare)' : 'Datang ke Gedung The Vida (Kebon Jeruk)';

  let text = `Halo Vida Medical Centre, saya ingin melakukan reservasi:\n\n`;
  text += `*Nama Pasien:* ${booking.patientName}\n`;
  text += `*Nomor Kontak:* ${booking.phone}\n`;
  text += `*Layanan:* ${categoryLabels[booking.serviceCategory] || booking.serviceCategory}\n`;
  text += `*Paket / Opsi:* ${booking.serviceOption}\n`;
  text += `*Rencana Kunjungan:* ${visitLabel}\n`;
  text += `*Tanggal Diinginkan:* ${booking.preferredDate}\n`;
  text += `*Waktu / Jam:* ${booking.preferredTime}\n`;

  if (booking.visitType === 'homecare' && booking.homeAddress) {
    text += `*Alamat Homecare:* ${booking.homeAddress}\n`;
  }

  if (booking.notes && booking.notes.trim().length > 0) {
    text += `*Catatan / Keluhan Tambahan:* ${booking.notes.trim()}\n`;
  }

  text += `\nMohon konfirmasi ketersediaan jadwal dokter/perawat dan informasi persiapan sebelum tindakan. Terima kasih!`;

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}
