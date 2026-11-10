export interface HealthpediaArticleSection {
  heading: string;
  body: string[];
}

export interface HealthpediaArticle {
  id: string;
  category: string;
  title: string;
  snippet: string;
  author: string;
  authorCredential: string;
  date: string;
  readTime: string;
  keyPoints: string[];
  paragraphs: string[];
  sections: HealthpediaArticleSection[];
  clinicalNote: string;
  bookingCategory: string;
  bookingOption: string;
}

export const HEALTHPEDIA_CATEGORIES = [
  'Semua Topik',
  'Nutrisi & Gizi Klinis',
  'Kesehatan Jantung',
  'Infus Vitamin & Mikronutrien',
  'Perawatan Luka Medis',
] as const;

export const HEALTHPEDIA_ARTICLES: HealthpediaArticle[] = [
  {
    id: 'kalori-ekstrem-metabolisme',
    category: 'Nutrisi & Gizi Klinis',
    title: 'Mengapa Pembatasan Kalori Ekstrem Justru Menurunkan Laju Metabolisme?',
    snippet:
      'Penjelasan spesialis gizi klinis mengenai pentingnya menjaga massa otot saat menurunkan berat badan agar metabolisme basal tidak melambat.',
    author: 'dr. Spesialis Gizi Klinis (Sp.GK)',
    authorCredential: 'Tim Gizi Klinis VidaFit · Gedung The Vida',
    date: '28 Oktober 2026',
    readTime: '4 menit baca',
    paragraphs: [
      'Diet dengan pemangkasan kalori drastis memicu mekanisme bertahan hidup alami tubuh yang dikenal sebagai adaptasi termogenik. Tubuh merespons defisit energi berlebihan dengan menurunkan pengeluaran kalori harian dan mengurangi produksi hormon tiroid aktif.',
      'Jika asupan protein tidak mencukupi selama fase ini, tubuh akan memecah jaringan otot rangka untuk dijadikan sumber energi. Penurunan massa otot inilah yang menyebabkan laju metabolisme basal turun signifikan dan memicu efek yoyo saat pola makan kembali normal.',
    ],
    sections: [
      {
        heading: 'Mekanisme Adaptasi Termogenik Tubuh',
        body: [
          'Ketika asupan energi harian dipangkas terlalu jauh di bawah kebutuhan basal—misalnya di bawah 1.000 kkal per hari tanpa pengawasan medis—hipotalamus membaca kondisi ini sebagai fase kelaparan. Akibatnya, tubuh secara otomatis menghemat energi dengan menurunkan suhu inti ringan, memperlambat aktivitas sistem saraf simpatis, dan menurunkan kadar hormon T3 (triiodotironin).',
          'Di saat yang sama, hormon pengatur rasa lapar seperti ghrelin meningkat tajam sementara hormon kenyang leptin turun drastis. Kombinasi ini membuat pelaku diet ekstrem mudah merasa lelah, sulit berkonsentrasi, dan mengalami dorongan makan berlebih setelah program selesai.',
        ],
      },
      {
        heading: 'Risiko Kehilangan Massa Otot Rangka',
        body: [
          'Berat badan yang turun cepat pada minggu-minggu awal diet ketat umumnya berasal dari kehilangan air, cadangan glikogen, dan jaringan otot—bukan semata-mata lemak viseral. Jaringan otot merupakan organ yang aktif membakar kalori bahkan saat tubuh beristirahat.',
          'Semakin banyak massa otot yang hilang, semakin rendah pula Basal Metabolic Rate (BMR) harian Anda. Inilah alasan mengapa seseorang lebih cepat mengalami kenaikan berat badan kembali (efek yoyo) begitu kembali ke porsi makan normal.',
        ],
      },
      {
        heading: 'Pendekatan Defisit Kalori Terukur',
        body: [
          'Penurunan berat badan yang aman secara klinis menargetkan pengurangan lemak tubuh tanpa mengorbankan otot melalui defisit moderat 300–500 kkal/hari dan kecukupan protein 1,2–1,6 gram per kilogram berat badan ideal.',
          'Pemantauan berkala menggunakan analisis komposisi tubuh (InBody 770) membantu dokter mengevaluasi apakah penurunan angka timbangan benar-benar berasal dari massa lemak atau justru penurunan massa otot dan cairan.',
        ],
      },
    ],
    keyPoints: [
      'Defisit kalori ideal berkisar 300–500 kkal/hari di bawah kebutuhan energi total.',
      'Asupan protein terukur membantu mempertahankan massa otot selama penurunan berat badan.',
      'Pemantauan komposisi lemak viseral vs massa otot lebih akurat memakai InBody 770 dibanding timbangan biasa.',
    ],
    clinicalNote:
      'Jadwalkan evaluasi nutrisi bersama Dokter Spesialis Gizi Klinis (Sp.GK) untuk mendapatkan rencana makan personal berdasarkan hasil InBody.',
    bookingCategory: 'vidafit',
    bookingOption: 'Program Evaluasi VidaFit (Dokter Sp.GK)',
  },
  {
    id: 'bioavailabilitas-vitamin-iv',
    category: 'Infus Vitamin & Mikronutrien',
    title: 'Perbedaan Bioavailabilitas Vitamin Oral vs Infus Intravena Terukur',
    snippet:
      'Penyerapan mikronutrien melalui jalur intravena memberikan ketersediaan hayati optimal bagi tubuh pada fase kelelahan berat atau pemulihan fisik.',
    author: 'Tim Medis VidaBoost',
    authorCredential: 'Unit Lounge Infus VidaBoost · Lt. Mezzanine',
    date: '24 Oktober 2026',
    readTime: '5 menit baca',
    paragraphs: [
      'Suplemen oral harus melewati proses pencernaan lambung, enzim usus, serta metabolisme lintas pertama di hati sebelum mencapai sirkulasi darah. Pada kondisi stres oksidatif tinggi atau gangguan saluran cerna, tingkat penyerapan vitamin larut air seperti Vitamin C dapat terbatas.',
      'Terapi infus intravena menghantarkan cairan elektrolit, vitamin C, B-kompleks, dan antioksidan secara langsung ke pembuluh darah dengan bioavailabilitas mendekati 100%, sehingga kadar terapeutik di jaringan tubuh tercapai lebih cepat dan konsisten.',
    ],
    sections: [
      {
        heading: 'Batasan Penyerapan Jalur Pencernaan',
        body: [
          'Vitamin yang dikonsumsi secara oral bergantung pada transporter aktif di mukosa usus halus. Pada Vitamin C oral misalnya, tingkat absorpsi dapat menurun hingga di bawah 50% ketika dosis tunggal melebihi 1.000 mg karena kejenuhan transporter natrium-askorbat di usus.',
          'Selain itu, kondisi seperti gastritis kronis, sindrom iritasi usus, atau konsumsi kopi berlebih dapat mengurangi ketersediaan hayati mikronutrien yang masuk melalui mulut.',
        ],
      },
      {
        heading: 'Keunggulan Terapi Intravena Terukur',
        body: [
          'Pemberian mikronutrien melalui jalur intravena (IV) melewati sistem pencernaan dan metabolisme lintas pertama di hati secara langsung. Hal ini menghasilkan kadar plasma terapeutik yang stabil tanpa menimbulkan iritasi lambung.',
          'Di ruang perawatan klinis, cairan infus juga berfungsi memulihkan hidrasi seluler secara simultan bersama asam amino, B-kompleks, zinc, serta antioksidan sesuai kebutuhan klinis pasien.',
        ],
      },
      {
        heading: 'Keamanan dan Skrining Sebelum Tindakan',
        body: [
          'Terapi infus bukan prosedur kosmetik semata, melainkan tindakan medis yang wajib diawali peninjauan tanda vital, riwayat alergi, serta status fungsi ginjal dan enzim G6PD bila menggunakan dosis Vitamin C tinggi.',
          'Setiap formulasi di VidaBoost diberikan di bawah pengawasan dokter dan perawat berlisensi dengan alat ukur kecepatan tetesan yang presisi.',
        ],
      },
    ],
    keyPoints: [
      'Vitamin oral umumnya memiliki batas saturasi penyerapan di mukosa usus.',
      'Rute intravena memastikan dosis mikronutrien terserap utuh tanpa beban lambung.',
      'Tindakan infus wajib diawali skrining tanda vital dan riwayat fungsi ginjal oleh tim medis.',
    ],
    clinicalNote:
      'Konsultasikan keluhan kelelahan kronis atau kebutuhan pemulihan imunitas Anda di Lounge VidaBoost sebelum memilih formula infus.',
    bookingCategory: 'vidaboost',
    bookingOption: 'VidaBoost Gold',
  },
  {
    id: 'pre-hipertensi-tanpa-gejala',
    category: 'Kesehatan Jantung',
    title: 'Tanda Tekanan Darah Pre-Hipertensi yang Kerap Muncul Tanpa Gejala',
    snippet:
      'Tekanan darah di atas 120/80 mmHg sudah memerlukan perhatian khusus. Langkah deteksi dini melalui rekam jantung EKG dan pengendalian asupan natrium.',
    author: 'dr. Spesialis Jantung (Sp.JP)',
    authorCredential: 'Poli Jantung & Pembuluh Darah · Vida Medical Centre',
    date: '19 Oktober 2026',
    readTime: '6 menit baca',
    paragraphs: [
      'Rentang tekanan darah sistolik 120–139 mmHg atau diastolik 80–89 mmHg termasuk fase pre-hipertensi. Pada tahap ini, penderita umumnya tidak merasakan sakit kepala, pusing, maupun tengkuk kaku sehingga kondisi sering terabaikan bertahun-tahun.',
      'Padahal, tekanan mekanis yang terus-menerus meningkat perlahan memicu kekakuan dinding pembuluh darah (disfungsi endotel) serta memperberat kerja bilik kiri jantung. Deteksi dini memberi peluang perbaikan penuh melalui perubahan gaya hidup tanpa harus langsung bergantung pada obat jangka panjang.',
    ],
    sections: [
      {
        heading: 'Mengapa Pre-Hipertensi Jarang Disadari',
        body: [
          'Tubuh manusia memiliki kemampuan adaptasi yang sangat baik terhadap peningkatan tekanan darah bertahap. Oleh karena itu, angka sistolik 125–135 mmHg hampir tidak pernah memicu sakit kepala atau nyeri dada pada sebagian besar individu.',
          'Namun secara mikroskopis, tekanan berlebih ini mulai melukai lapisan endotel arteri koroner, ginjal, dan retina jauh sebelum keluhan klinis muncul.',
        ],
      },
      {
        heading: 'Teknik Pengukuran yang Tepat di Rumah',
        body: [
          'Satu kali pengukuran tinggi setelah menaiki tangga atau minum kopi belum menegakkan diagnosis hipertensi. Lakukan pemeriksaan berulang pada pagi dan malam hari setelah duduk tenang selama 5 menit dengan posisi manset sejajar jantung.',
          'Catat hasil pengukuran selama 7 hari berturut-turut untuk membantu dokter membedakan fluktuasi stres sesaat dari kenaikan tekanan darah menetap.',
        ],
      },
      {
        heading: 'Langkah Koreksi Dini & Skrining Jantung',
        body: [
          'Pada fase pre-hipertensi, pembatasan natrium di bawah 2.000 mg/hari, peningkatan aktivitas aerobik minimal 150 menit per minggu, dan pengendalian lingkar pinggang terbukti menurunkan tekanan sistolik 5–10 mmHg.',
          'Jika terdapat riwayat keluarga penyakit jantung atau kolesterol tinggi, pemeriksaan Elektrokardiogram (EKG) 12-lead dan profil lipid dianjurkan sebagai baseline kesehatan tahunan.',
        ],
      },
    ],
    keyPoints: [
      'Ukur tekanan darah serial dalam kondisi tenang setelah duduk beristirahat minimal 5 menit.',
      'Batasi natrium harian kurang dari 2.000 mg dan tingkatkan asupan kalium dari sayur serta buah.',
      'Lakukan pemeriksaan EKG 12-lead dan profil lipid rutin jika memiliki riwayat keluarga hipertensi.',
    ],
    clinicalNote:
      'Jika hasil tensi rumah Anda berulang kali berada di atas 130/80 mmHg, pertimbangkan skrining kardiovaskular terpadu bersama Spesialis Jantung.',
    bookingCategory: 'vidahealth',
    bookingOption: 'VidaHealth Comprehensive',
  },
  {
    id: 'perawatan-luka-moist-healing',
    category: 'Perawatan Luka Medis',
    title: 'Prinsip Perawatan Luka Modern: Keunggulan Balutan Moist Healing',
    snippet:
      'Mengapa luka pasca-operasi dan luka diabetes beregenerasi lebih cepat menggunakan balutan hidrokoloid dibandingkan teknik kasa konvensional.',
    author: 'Ners Spesialis Wound Care',
    authorCredential: 'Unit Layanan Homecare · Vida at Home',
    date: '15 Oktober 2026',
    readTime: '5 menit baca',
    paragraphs: [
      'Metode lama membiarkan luka mengering terbuka atau ditutup kasa biasa yang sering menempel pada jaringan baru. Saat kasa dilepas, sel epitel yang baru tumbuh ikut terkelupas dan menimbulkan nyeri serta risiko perdarahan ulang.',
      'Teknik perawatan luka modern mempertahankan suasana lembap terkontrol (moist wound healing) memakai balutan hidrokoloid, foam, atau hidrogel. Lingkungan lembap mempercepat migrasi sel kulit baru, mendukung proses pembersihan jaringan mati alami, dan menurunkan risiko infeksi silang.',
    ],
    sections: [
      {
        heading: 'Mengapa Luka Tidak Boleh Dibiarkan Kering Terbuka',
        body: [
          'Pada luka yang dibiarkan mengering, permukaan jaringan membentuk keropeng (krusta) yang keras. Sel epitel baru terpaksa bergerak menembus bagian bawah keropeng yang keras sehingga waktu penutupan luka menjadi jauh lebih lambat.',
          'Penggunaan kasa tenun kering juga kerap melukai jaringan granulasi yang rapuh setiap kali balutan dibuka untuk dibersihkan.',
        ],
      },
      {
        heading: 'Cara Kerja Balutan Hidrokoloid & Foam Medis',
        body: [
          'Balutan modern bekerja menjaga keseimbangan kelembapan luka (bukan terlalu basah atau becek). Komponen aktifnya menyerap cairan eksudat berlebih sambil melindungi luka dari kontaminasi bakteri eksternal.',
          'Selain mempercepat penyembuhan luka pasca-operasi maupun ulkus diabetikum, balutan modern tidak menempel pada dasar luka sehingga penggantian perban berlangsung jauh lebih nyaman dan minim trauma.',
        ],
      },
      {
        heading: 'Kapan Perawatan Luka Memerlukan Perawat Tersertifikasi',
        body: [
          'Luka kronis seperti luka kaki diabetes, luka tekan pada pasien tirah baring, atau luka jahitan operasi yang kemerahan dan mengeluarkan cairan keruh membutuhkan evaluasi ukuran luka, pembersihan aseptik (debridemen ringan), serta pemilihan dressing sesuai fase luka.',
        ],
      },
    ],
    keyPoints: [
      'Kelembapan seimbang mempercepat epitelisasi luka hingga 2 kali lebih efektif dibanding luka kering.',
      'Balutan modern menyerap eksudat berlebih tanpa merusak jaringan granulasi saat penggantian perban.',
      'Evaluasi luka diabetes membutuhkan pengendalian gula darah dan pengurangan tekanan di area luka.',
    ],
    clinicalNote:
      'Layanan Vida at Home menghadirkan perawat tersertifikasi perawatan luka modern langsung ke rumah Anda dengan perlengkapan steril.',
    bookingCategory: 'homecare',
    bookingOption: 'Perawatan Luka (Wound Care)',
  },
  {
    id: 'urutan-konsumsi-nutrisi-gula-darah',
    category: 'Nutrisi & Gizi Klinis',
    title: 'Mengatur Lonjakan Gula Darah Harian melalui Urutan Konsumsi Nutrisi',
    snippet:
      'Bagaimana memulai makan dengan serat dan protein sebelum karbohidrat membantu meredam lonjakan glukosa pasca-makan dan rasa kantuk siang hari.',
    author: 'dr. Spesialis Gizi Klinis (Sp.GK)',
    authorCredential: 'Tim Gizi Klinis VidaFit · Gedung The Vida',
    date: '10 Oktober 2026',
    readTime: '4 menit baca',
    paragraphs: [
      'Respon gula darah setelah makan tidak hanya ditentukan oleh total jumlah karbohidrat, tetapi juga oleh kecepatan pengosongan lambung. Mengonsumsi karbohidrat sederhana saat perut kosong membuat glukosa masuk sangat cepat ke aliran darah.',
      'Dengan mendahulukan sayuran berserat dan sumber protein sebelum nasi atau pati, serat membentuk lapisan gel halus di dinding usus yang memperlambat penyerapan gula sehingga kurva insulin tetap lebih landai.',
    ],
    sections: [
      {
        heading: 'Mengapa Urutan Makan Memengaruhi Kurva Glukosa',
        body: [
          'Penelitian klinis nutrisi menunjukkan bahwa urutan konsumsi makanan yang sama dapat menghasilkan perbedaan puncak glukosa darah pasca-makan hingga 30–40%. Serat larut air dari sayuran hijau meningkatkan viskositas isi lambung dan usus halus.',
          'Sementara itu, asupan protein dan lemak sehat merangsang pelepasan hormon GLP-1 secara alami yang memperlambat pengosongan lambung serta memberikan sinyal kenyang lebih awal ke otak.',
        ],
      },
      {
        heading: 'Penerapan Praktis pada Pola Makan Harian',
        body: [
          'Mulailah sesi makan utama dengan semangkuk sayur atau salad terlebih dahulu, lanjutkan dengan lauk sumber protein (ikan, ayam, telur, atau tahu tempe), dan akhiri dengan porsi karbohidrat kompleks seperti nasi merah atau kentang.',
          'Tambahkan jalan santai selama 10–15 menit setelah makan siang agar otot rangka langsung memanfaatkan glukosa darah sebagai bahan bakar tanpa membutuhkan lonjakan insulin tinggi.',
        ],
      },
    ],
    keyPoints: [
      'Dahulukan serat (sayur) dan protein sebelum mengonsumsi karbohidrat utama.',
      'Mengurangi lonjakan glukosa membantu mencegah rasa lemas dan kantuk pasca-makan siang.',
      'Aktivitas ringan 10–15 menit setelah makan membantu stabilisasi gula darah alami.',
    ],
    clinicalNote:
      'Bagi individu dengan riwayat pre-diabetes atau HbA1c di batas atas, konsultasi gizi klinis membantu menyusun porsi makro yang presisi.',
    bookingCategory: 'vidafit',
    bookingOption: 'VidaFit Complete (Meal Plan + InBody + Suplemen BPOM)',
  },
  {
    id: 'skrining-ekg-profil-lipid-usia-30',
    category: 'Kesehatan Jantung',
    title: 'Kapan Usia Produktif Perlu Skrining EKG & Profil Lipid Lengkap?',
    snippet:
      'Deteksi dini risiko sindrom metabolik pada usia 30-an melalui pemeriksaan kolesterol LDL, HbA1c, dan rekam listrik jantung.',
    author: 'dr. Spesialis Jantung (Sp.JP)',
    authorCredential: 'Poli Jantung & Pembuluh Darah · Vida Medical Centre',
    date: '04 Oktober 2026',
    readTime: '5 menit baca',
    paragraphs: [
      'Banyak pekerja profesional merasa cukup bugar di usia 30-an sehingga menunda pemeriksaan jantung. Padahal, plak aterosklerosis mulai terbentuk diam-diam sejak dewasa muda ketika paparan stres kerja, kurang tidur, dan kadar LDL tinggi berlangsung bertahun-tahun.',
      'Pemeriksaan profil lipid lengkap (LDL, HDL, Trigliserida), gula darah puasa serta HbA1c, dan EKG istirahat memberikan peta risiko kardiovaskular menyeluruh dalam satu kali kunjungan klinik.',
    ],
    sections: [
      {
        heading: 'Mengapa LDL dan Lingkar Pinggang Lebih Penting dari Kolesterol Total',
        body: [
          'Angka kolesterol total saja sering menyesatkan karena tidak memisahkan kolesterol pelindung (HDL) dari partikel pembentuk plak (LDL). Pada pekerja urban yang sering duduk lama, kombinasi trigliserida tinggi dan HDL rendah kerap muncul meski berat badan tampak normal.',
          'Pemeriksaan menyeluruh memungkinkan dokter menghitung rasio risiko vaskular dan menindaklanjuti lebih dini sebelum terjadi penyempitan pembuluh darah bermakna.',
        ],
      },
      {
        heading: 'Peran EKG 12-Lead sebagai Data Dasar Jantung',
        body: [
          'Rekam jantung Elektrokardiogram (EKG) hanya memakan waktu beberapa menit dan tidak menimbulkan rasa sakit. Selain mendeteksi gangguan irama jantung (aritmia) atau tanda pembesaran bilik jantung, hasil EKG usia produktif berguna sebagai pembanding objektif di masa mendatang.',
        ],
      },
    ],
    keyPoints: [
      'Pemeriksaan baseline metabolik & lipid sangat dianjurkan mulai usia 25–30 tahun.',
      'Perhatikan kadar LDL, HDL, dan trigliserida secara terpisah—bukan hanya kolesterol total.',
      'Gabungkan hasil lab dengan pemindaian lemak viseral dan evaluasi dokter spesialis.',
    ],
    clinicalNote:
      'Paket VidaHealth Comprehensive mencakup EKG 12-lead, profil lipid lengkap, fungsi ginjal, fungsi hati, dan tes InBody dalam satu kunjungan.',
    bookingCategory: 'vidahealth',
    bookingOption: 'VidaHealth Comprehensive',
  },
];

export function getArticleById(slug: string): HealthpediaArticle | undefined {
  return HEALTHPEDIA_ARTICLES.find((article) => article.id === slug);
}

