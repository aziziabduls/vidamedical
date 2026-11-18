const bcrypt = require('bcryptjs');
const prisma = require('../src/config/prisma');

async function main() {
  const adminEmail = 'admin@vidamedical.id';
  const adminPasswordHash = await bcrypt.hash('VidaAdmin2026!', 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { name: 'Admin Vida Medical' },
    create: {
      email: adminEmail,
      name: 'Admin Vida Medical',
      passwordHash: adminPasswordHash,
      role: 'admin',
    },
  });

  const promoCount = await prisma.promo.count();
  if (promoCount === 0) {
    await prisma.promo.createMany({
      data: [
        {
          title: 'Promo Highlight 1',
          imageUrl: '/images/vida_promo.jpeg',
          imageAlt: 'Promo Highlight Vida Medical Centre 1',
          sortOrder: 0,
          isActive: true,
        },
        {
          title: 'Promo Highlight 2',
          imageUrl: '/images/vida_promo_2.jpeg',
          imageAlt: 'Promo Highlight Vida Medical Centre 2',
          sortOrder: 1,
          isActive: true,
        },
      ],
    });
  }

  // Article categories synced from lib/healthpedia-articles.ts (HEALTHPEDIA_CATEGORIES)
  const initialCategories = [
    { slug: 'nutrisi-gizi-klinis', name: 'Nutrisi & Gizi Klinis', sortOrder: 0 },
    { slug: 'kesehatan-jantung', name: 'Kesehatan Jantung', sortOrder: 1 },
    { slug: 'infus-vitamin-mikronutrien', name: 'Infus Vitamin & Mikronutrien', sortOrder: 2 },
    { slug: 'perawatan-luka-medis', name: 'Perawatan Luka Medis', sortOrder: 3 },
  ];

  for (const cat of initialCategories) {
    await prisma.articleCategory.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, sortOrder: cat.sortOrder },
      create: cat,
    });
  }

  // All 6 Healthpedia articles synced from web app (lib/healthpedia-articles.ts)
  const initialArticles = [
    {
      slug: 'kalori-ekstrem-metabolisme',
      category: 'Nutrisi & Gizi Klinis',
      title: 'Mengapa Pembatasan Kalori Ekstrem Justru Menurunkan Laju Metabolisme?',
      snippet:
        'Penjelasan spesialis gizi klinis mengenai pentingnya menjaga massa otot saat menurunkan berat badan agar metabolisme basal tidak melambat.',
      readTime: '4 menit baca',
      author: 'dr. Spesialis Gizi Klinis (Sp.GK)',
      authorCredential: 'Tim Gizi Klinis VidaFit · Gedung The Vida',
      dateLabel: '28 Oktober 2026',
      content: [
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
      keyTakeaways: [
        'Defisit kalori ideal berkisar 300–500 kkal/hari di bawah kebutuhan energi total.',
        'Asupan protein terukur membantu mempertahankan massa otot selama penurunan berat badan.',
        'Pemantauan komposisi lemak viseral vs massa otot lebih akurat memakai InBody 770 dibanding timbangan biasa.',
      ],
      clinicalNote:
        'Jadwalkan evaluasi nutrisi bersama Dokter Spesialis Gizi Klinis (Sp.GK) untuk mendapatkan rencana makan personal berdasarkan hasil InBody.',
      bookingCategory: 'vidafit',
      bookingOption: 'Program Evaluasi VidaFit (Dokter Sp.GK)',
      isPublished: true,
    },
    {
      slug: 'bioavailabilitas-vitamin-iv',
      category: 'Infus Vitamin & Mikronutrien',
      title: 'Perbedaan Bioavailabilitas Vitamin Oral vs Infus Intravena Terukur',
      snippet:
        'Penyerapan mikronutrien melalui jalur intravena memberikan ketersediaan hayati optimal bagi tubuh pada fase kelelahan berat atau pemulihan fisik.',
      readTime: '5 menit baca',
      author: 'Tim Medis VidaBoost',
      authorCredential: 'Unit Lounge Infus VidaBoost · Lt. Mezzanine',
      dateLabel: '24 Oktober 2026',
      content: [
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
      keyTakeaways: [
        'Vitamin oral umumnya memiliki batas saturasi penyerapan di mukosa usus.',
        'Rute intravena memastikan dosis mikronutrien terserap utuh tanpa beban lambung.',
        'Tindakan infus wajib diawali skrining tanda vital dan riwayat fungsi ginjal oleh tim medis.',
      ],
      clinicalNote:
        'Konsultasikan keluhan kelelahan kronis atau kebutuhan pemulihan imunitas Anda di Lounge VidaBoost sebelum memilih formula infus.',
      bookingCategory: 'vidaboost',
      bookingOption: 'VidaBoost Gold',
      isPublished: true,
    },
    {
      slug: 'pre-hipertensi-tanpa-gejala',
      category: 'Kesehatan Jantung',
      title: 'Tanda Tekanan Darah Pre-Hipertensi yang Kerap Muncul Tanpa Gejala',
      snippet:
        'Tekanan darah di atas 120/80 mmHg sudah memerlukan perhatian khusus. Langkah deteksi dini melalui rekam jantung EKG dan pengendalian asupan natrium.',
      readTime: '6 menit baca',
      author: 'dr. Spesialis Jantung (Sp.JP)',
      authorCredential: 'Poli Jantung & Pembuluh Darah · Vida Medical Centre',
      dateLabel: '19 Oktober 2026',
      content: [
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
      keyTakeaways: [
        'Ukur tekanan darah serial dalam kondisi tenang setelah duduk beristirahat minimal 5 menit.',
        'Batasi natrium harian kurang dari 2.000 mg dan tingkatkan asupan kalium dari sayur serta buah.',
        'Lakukan pemeriksaan EKG 12-lead dan profil lipid rutin jika memiliki riwayat keluarga hipertensi.',
      ],
      clinicalNote:
        'Jika hasil tensi rumah Anda berulang kali berada di atas 130/80 mmHg, pertimbangkan skrining kardiovaskular terpadu bersama Spesialis Jantung.',
      bookingCategory: 'vidahealth',
      bookingOption: 'VidaHealth Comprehensive',
      isPublished: true,
    },
    {
      slug: 'perawatan-luka-moist-healing',
      category: 'Perawatan Luka Medis',
      title: 'Prinsip Perawatan Luka Modern: Keunggulan Balutan Moist Healing',
      snippet:
        'Mengapa luka pasca-operasi dan luka diabetes beregenerasi lebih cepat menggunakan balutan hidrokoloid dibandingkan teknik kasa konvensional.',
      readTime: '5 menit baca',
      author: 'Ners Spesialis Wound Care',
      authorCredential: 'Unit Layanan Homecare · Vida at Home',
      dateLabel: '15 Oktober 2026',
      content: [
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
      keyTakeaways: [
        'Kelembapan seimbang mempercepat epitelisasi luka hingga 2 kali lebih efektif dibanding luka kering.',
        'Balutan modern menyerap eksudat berlebih tanpa merusak jaringan granulasi saat penggantian perban.',
        'Evaluasi luka diabetes membutuhkan pengendalian gula darah dan pengurangan tekanan di area luka.',
      ],
      clinicalNote:
        'Layanan Vida at Home menghadirkan perawat tersertifikasi perawatan luka modern langsung ke rumah Anda dengan perlengkapan steril.',
      bookingCategory: 'homecare',
      bookingOption: 'Perawatan Luka (Wound Care)',
      isPublished: true,
    },
    {
      slug: 'urutan-konsumsi-nutrisi-gula-darah',
      category: 'Nutrisi & Gizi Klinis',
      title: 'Mengatur Lonjakan Gula Darah Harian melalui Urutan Konsumsi Nutrisi',
      snippet:
        'Bagaimana memulai makan dengan serat dan protein sebelum karbohidrat membantu meredam lonjakan glukosa pasca-makan dan rasa kantuk siang hari.',
      readTime: '4 menit baca',
      author: 'dr. Spesialis Gizi Klinis (Sp.GK)',
      authorCredential: 'Tim Gizi Klinis VidaFit · Gedung The Vida',
      dateLabel: '10 Oktober 2026',
      content: [
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
      keyTakeaways: [
        'Dahulukan serat (sayur) dan protein sebelum mengonsumsi karbohidrat utama.',
        'Mengurangi lonjakan glukosa membantu mencegah rasa lemas dan kantuk pasca-makan siang.',
        'Aktivitas ringan 10–15 menit setelah makan membantu stabilisasi gula darah alami.',
      ],
      clinicalNote:
        'Bagi individu dengan riwayat pre-diabetes atau HbA1c di batas atas, konsultasi gizi klinis membantu menyusun porsi makro yang presisi.',
      bookingCategory: 'vidafit',
      bookingOption: 'VidaFit Complete (Meal Plan + InBody + Suplemen BPOM)',
      isPublished: true,
    },
    {
      slug: 'skrining-ekg-profil-lipid-usia-30',
      category: 'Kesehatan Jantung',
      title: 'Kapan Usia Produktif Perlu Skrining EKG & Profil Lipid Lengkap?',
      snippet:
        'Deteksi dini risiko sindrom metabolik pada usia 30-an melalui pemeriksaan kolesterol LDL, HbA1c, dan rekam listrik jantung.',
      readTime: '5 menit baca',
      author: 'dr. Spesialis Jantung (Sp.JP)',
      authorCredential: 'Poli Jantung & Pembuluh Darah · Vida Medical Centre',
      dateLabel: '04 Oktober 2026',
      content: [
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
      keyTakeaways: [
        'Pemeriksaan baseline metabolik & lipid sangat dianjurkan mulai usia 25–30 tahun.',
        'Perhatikan kadar LDL, HDL, dan trigliserida secara terpisah—bukan hanya kolesterol total.',
        'Gabungkan hasil lab dengan pemindaian lemak viseral dan evaluasi dokter spesialis.',
      ],
      clinicalNote:
        'Paket VidaHealth Comprehensive mencakup EKG 12-lead, profil lipid lengkap, fungsi ginjal, fungsi hati, dan tes InBody dalam satu kunjungan.',
      bookingCategory: 'vidahealth',
      bookingOption: 'VidaHealth Comprehensive',
      isPublished: true,
    },
  ];

  for (const article of initialArticles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {
        category: article.category,
        title: article.title,
        snippet: article.snippet,
        readTime: article.readTime,
        author: article.author,
        authorCredential: article.authorCredential,
        dateLabel: article.dateLabel,
        content: article.content,
        sections: article.sections,
        keyTakeaways: article.keyTakeaways,
        clinicalNote: article.clinicalNote,
        bookingCategory: article.bookingCategory,
        bookingOption: article.bookingOption,
      },
      create: article,
    });
  }

  const doctorCount = await prisma.doctor.count();
  if (doctorCount === 0) {
    await prisma.doctor.createMany({
      data: [
        {
          name: 'Poli Spesialis Penyakit Dalam (Sp.PD)',
          poliCode: 'sp-pd',
          poliName: 'Poli Penyakit Dalam',
          specialistTag: 'Dokter Spesialis Penyakit Dalam',
          schedule: 'Senin – Sabtu · 08.00 – 20.00 WIB',
          location: 'Poliklinik Lantai 6, Gedung The Vida',
          description:
            'Konsultasi medis komprehensif untuk pencegahan, diagnosis, dan tata laksana gangguan kesehatan organ dalam serta penyakit metabolik dewasa.',
          focusAreas: [
            'Pengelolaan diabetes melitus & resistensi insulin',
            'Evaluasi hipertensi, kolesterol & sindrom metabolik',
            'Gangguan pencernaan, hati, ginjal, & keluhan infeksi',
            'Konsultasi lanjutan hasil Medical Check Up',
          ],
          sortOrder: 0,
          isActive: true,
        },
        {
          name: 'Poli Spesialis Gizi Klinis (Sp.GK)',
          poliCode: 'sp-gk',
          poliName: 'Poli Gizi Klinis',
          specialistTag: 'Dokter Spesialis Gizi Klinis',
          schedule: 'Senin – Sabtu · 09.00 – 19.00 WIB',
          location: 'Poli Gizi Klinis, Gedung The Vida',
          description:
            'Pendampingan nutrisi medis dan manajemen berat badan terukur berbasis pemindaian komposisi tubuh InBody 770 serta kondisi klinis pasien.',
          focusAreas: [
            'Program penurunan & pemeliharaan berat badan (VidaFit)',
            'Penyusunan meal plan personal sesuai laju metabolisme',
            'Terapi nutrisi medis untuk diabetes, hipertensi & dislipidemia',
            'Evaluasi massa otot, lemak visceral & cairan tubuh berkala',
          ],
          sortOrder: 1,
          isActive: true,
        },
      ],
    });
  }

  const servicesSeed = [
    {
      category: 'vidaboost',
      slug: 'silver',
      name: 'VidaBoost Silver',
      subtitle: 'Daily Energy',
      tagline: 'Immune Kickstart & Rehydration',
      priceLabel: 'Rp 450.000',
      durationMinutes: 30,
      badge: null,
      description: 'Kelelahan ringan, dehidrasi pasca aktivitas padat, perlindungan daya tahan harian.',
      features: ['Vitamin C Murni 1000mg', 'B-Complex Formulated', 'Balanced Electrolytes'],
      sortOrder: 0,
    },
    {
      category: 'vidaboost',
      slug: 'gold',
      name: 'VidaBoost Gold',
      subtitle: 'Immune Shield',
      tagline: 'Vitality, Energy & Stamina Recovery',
      priceLabel: 'Rp 750.000',
      durationMinutes: 45,
      badge: 'Paling Populer',
      description: 'Memulihkan energi cepat saat deadline tinggi, jet lag, atau pasca sakit flu.',
      features: ['High-Dose Vitamin C', 'B-Complex + B12', 'Zinc Mineral', 'Magnesium Infusion'],
      sortOrder: 1,
    },
    {
      category: 'vidaboost',
      slug: 'platinum',
      name: 'VidaBoost Platinum',
      subtitle: 'Glow & Detox',
      tagline: 'Antioxidant Glow & Cellular Health',
      priceLabel: 'Rp 1.250.000',
      durationMinutes: 45,
      badge: null,
      description: 'Detoksifikasi seluler mendalam, mencerahkan kulit kusam, dan perlindungan anti-aging radikal bebas.',
      features: ['Pure Glutathione 1200mg', 'Vitamin C High Dose', 'Alpha Lipoic Acid', 'B-Complex Plus'],
      sortOrder: 2,
    },
    {
      category: 'vidaboost',
      slug: 'diamond',
      name: 'VidaBoost Diamond',
      subtitle: 'Cellular Rejuvenation',
      tagline: 'Ultimate Executive Wellness & Longevity',
      priceLabel: 'Rp 1.950.000',
      durationMinutes: 60,
      badge: 'Exclusive Care',
      description: 'Optimalisasi performa eksekutif puncak, imunoproteksi maksimal, dan peremajaan seluler paripurna.',
      features: ['Maximum Glutathione', 'Super Antioxidant Complex', 'Complete Multivitamin Amino', 'High Potency Zinc & CoQ10'],
      sortOrder: 3,
    },
    {
      category: 'vidahealth',
      slug: 'essential',
      name: 'VidaHealth Basic Check',
      subtitle: 'Pemeriksaan Kesehatan Rutin Tahunan',
      tagline: 'Individu usia muda, skrining kerja, dan pemantauan kesehatan rutin tahunan.',
      priceLabel: 'Rp 650.000',
      durationMinutes: 60,
      badge: '+ Bonus InBody',
      description: 'Individu usia muda, skrining kerja, dan pemantauan kesehatan rutin tahunan.',
      features: [
        'Pemeriksaan Fisik Dokter Umum Lengkap',
        'Pemeriksaan Visus & Kesehatan Mata',
        'Tanda Vital & Tekanan Darah Terstandar',
        'Hematologi Lengkap (Darah Rutin)',
        'Gula Darah Puasa (GDP)',
        'Profil Kolesterol Total & Trigliserida',
        'BONUS: Full Body Composition Test (InBody)',
      ],
      sortOrder: 0,
    },
    {
      category: 'vidahealth',
      slug: 'comprehensive',
      name: 'VidaHealth Comprehensive',
      subtitle: 'Skrining Menyeluruh Organ Utama',
      tagline: 'Usia 30+ tahun, profesional aktif, riwayat sindrom metabolik keluarga.',
      priceLabel: 'Rp 1.650.000',
      durationMinutes: 90,
      badge: 'Paling sering dipilih',
      description: 'Usia 30+ tahun, profesional aktif, riwayat sindrom metabolik keluarga.',
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
      sortOrder: 1,
    },
    {
      category: 'vidahealth',
      slug: 'executive',
      name: 'VidaHealth Executive Longevity',
      subtitle: 'Paket VIP Wellness Terlengkap',
      tagline: 'Eksekutif, pimpinan perusahaan, dan individu yang mengutamakan proteksi preventif komprehensif.',
      priceLabel: 'Rp 2.850.000',
      durationMinutes: 120,
      badge: '+ Bonus InBody',
      description: 'Eksekutif, pimpinan perusahaan, dan individu yang mengutamakan proteksi preventif komprehensif.',
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
      sortOrder: 2,
    },
    {
      category: 'vidafit',
      slug: 'vidafit-complete',
      name: 'VidaFit Weight Management',
      subtitle: 'Dokter Spesialis Gizi Klinis (Sp.GK)',
      tagline: 'Manajemen Berat Badan Berbasis InBody 770',
      priceLabel: 'Mulai Rp 850.000',
      durationMinutes: 45,
      badge: 'Dokter Sp.GK',
      description: 'Program penurunan berat badan ilmiah dengan pemetaan InBody 770 dan meal plan personal.',
      features: ['Pemetaan InBody 770', 'Meal plan personal', 'Suplemen resmi BPOM', 'Pemantauan medis'],
      sortOrder: 0,
    },
    {
      category: 'homecare',
      slug: 'homecare-wound-care',
      name: 'Perawatan Luka Medis (Wound Care)',
      subtitle: 'Vida at Home',
      tagline: 'Balutan modern hidrokoloid & hidrogel steril',
      priceLabel: 'Mulai Rp 350.000',
      durationMinutes: 45,
      badge: 'Populer',
      description: 'Perawatan luka diabetes, pasca operasi, dan luka tekan oleh ners bersertifikasi.',
      features: [
        'Perawatan luka diabetes (Ulkus Diabetikum)',
        'Perawatan luka pasca operasi besar / caesar',
        'Luka tekan tirah baring (Dekubitus)',
        'Dressing modern hidrokoloid / hidrogel steril',
      ],
      sortOrder: 0,
    },
    {
      category: 'homecare',
      slug: 'homecare-doctor-visit',
      name: 'Kunjungan Dokter Umum ke Rumah',
      subtitle: 'Vida at Home',
      tagline: 'Pemeriksaan klinis di rumah',
      priceLabel: 'Rp 400.000',
      durationMinutes: 45,
      badge: null,
      description: 'Pemeriksaan tanda vital komprehensif, diagnosis, dan resep obat resmi.',
      features: [
        'Pemeriksaan tanda vital komprehensif',
        'Diagnosis dan resep obat farmasi',
        'Rujukan pemeriksaan lanjutan jika diperlukan',
        'Alat diagnostik portabel higienis',
      ],
      sortOrder: 1,
    },
    {
      category: 'lab',
      slug: 'lab-diabetes',
      name: 'Skrining Diabetes Mellitus Komplit',
      subtitle: 'Laboratorium Patologi',
      tagline: 'GDP, GD2PP, HbA1c & Mikroalbumin',
      priceLabel: 'Rp 320.000',
      durationMinutes: 20,
      badge: 'Rekomendasi',
      description: 'Pemeriksaan kadar gula darah dan pengendalian glukosa 3 bulan.',
      features: [
        'Glukosa Darah Puasa (GDP)',
        'Glukosa 2 Jam Setelah Makan (GD2PP)',
        'HbA1c (rerata pengendalian 3 bulan)',
        'Pemeriksaan urin glukosa & mikroalbumin',
      ],
      sortOrder: 0,
    },
    {
      category: 'coe',
      slug: 'coe-vidaboost',
      name: 'VidaBoost IV Therapy & Immune Centre',
      subtitle: 'Infus Vitamin & Mikronutrien',
      tagline: '100% Bahan Medis Resmi BPOM',
      priceLabel: 'Lounge Mezzanine, Gedung The Vida',
      durationMinutes: null,
      badge: 'Layanan Terpopuler',
      description:
        'Lounge infus mikronutrien eksklusif di Gedung The Vida dengan kursi sofa medis privat. Penyerapan 100% langsung ke sirkulasi darah tanpa degradasi saluran cerna.',
      features: [
        'VidaBoost Silver: Rehidrasi elektrolit & pemulihan lelah',
        'VidaBoost Gold: Vitamin C murni 1000mg & Zinc pertahanan imun',
        'VidaBoost Platinum: Antioksidan Glutathione & pencerah kulit',
        'VidaBoost Diamond: Formulasi Cellular NAD+ & anti-aging',
      ],
      sortOrder: 0,
    },
    {
      category: 'coe',
      slug: 'coe-vidafit',
      name: 'VidaFit Weight Management & Gizi Klinis',
      subtitle: 'Manajemen Berat Badan Medis',
      tagline: 'Analisis Medis InBody 770',
      priceLabel: 'Poliklinik Gizi Klinis, Gedung The Vida',
      durationMinutes: null,
      badge: 'Dokter Spesialis Gizi Klinis',
      description:
        'Program transformasi komposisi tubuh berbasis medis. Evaluasi persentase lemak visceral, massa otot segmental, dan penyusunan pola nutrisi personal yang realistis.',
      features: [
        'Pemindaian komposisi tubuh dengan InBody 770',
        'Konsultasi tatap muka Dokter Spesialis Gizi Klinis (Sp.GK)',
        'Meal plan terstruktur berbasis laju metabolisme basal (BMR)',
        'Pemantauan lingkar perut, profil lipid & glukosa berkala',
      ],
      sortOrder: 1,
    },
    {
      category: 'coe',
      slug: 'coe-vidahealth',
      name: 'VidaHealth Medical Check Up',
      subtitle: 'Skrining Preventif Komprehensif',
      tagline: 'Bonus Body Scan InBody',
      priceLabel: 'Unit MCU, Gedung The Vida Lt. Ground',
      durationMinutes: null,
      badge: 'Hasil Hari yang Sama',
      description:
        'Pemeriksaan skrining preventif berkala untuk mendeteksi dini risiko kardiovaskular, sindrom metabolik, dislipidemia, dan disfungsi organ hati maupun ginjal.',
      features: [
        'MCU Silver: Pemeriksaan fisik & profil lipid rutin',
        'MCU Gold: Skrining eksekutif + Rekam Jantung EKG 12-Lead',
        'MCU Platinum: Skrining komplit + USG Abdomen & Evaluasi Spesialis',
        'Konseling laporan medis mendalam bersama dokter',
      ],
      sortOrder: 2,
    },
    {
      category: 'coe',
      slug: 'coe-jantung',
      name: 'Klinik Jantung & Kardiovaskular Preventif',
      subtitle: 'Kardiologi & Hipertensi',
      tagline: 'Elektrokardiogram Digital',
      priceLabel: 'Poli Spesialis Jantung, Gedung The Vida',
      durationMinutes: null,
      badge: 'Skrining Risiko 10 Tahun',
      description:
        'Deteksi dan penatalaksanaan gangguan fungsi jantung, aritmia, hipertensi esensial, serta evaluasi risiko aterosklerosis pembuluh koroner.',
      features: [
        'Pemeriksaan Elektrokardiogram (EKG 12-Lead)',
        'Stratifikasi risiko kardiovaskular Framingham',
        'Pemeriksaan profil lipid fraksinasi lengkap',
        'Konsultasi Spesialis Jantung & Pembuluh Darah (Sp.JP)',
      ],
      sortOrder: 3,
    },
    {
      category: 'coe',
      slug: 'coe-homecare',
      name: 'Vida at Home (Homecare Medis)',
      subtitle: 'Perawat & Dokter ke Rumah',
      tagline: 'Perawat Berizin Praktik Resmi',
      priceLabel: 'Unit Siaga Homecare Kebon Jeruk',
      durationMinutes: null,
      badge: 'Area Kebon Jeruk & Sekitarnya',
      description:
        'Layanan kunjungan dokter dan perawatan luka modern di tempat tinggal Anda. Memberikan kenyamanan bagi pasien rawat jalan, lansia, dan pasca operasi.',
      features: [
        'Perawatan luka diabetes (modern moist dressing)',
        'Perawatan luka pasca operasi besar / sectio caesarea',
        'Pemasangan & penggantian selang makan NGT steril',
        'Pemasangan & penggantian kateter urin Foley steril',
      ],
      sortOrder: 4,
    },
    {
      category: 'coe',
      slug: 'coe-vaksinasi',
      name: 'VidaShield Imunisasi & Vaksinasi',
      subtitle: 'Pencegahan Infeksi Tropis',
      tagline: 'Vaksin Resmi Biofarma / Importir',
      priceLabel: 'Unit Vaksinasi Gedung The Vida',
      durationMinutes: null,
      badge: 'Cold-Chain Terverifikasi',
      description:
        'Layanan imunisasi preventif untuk dewasa, lansia, dan anak dengan kontrol rantai dingin ketat untuk menjaga stabilitas dan efikasi vaksin.',
      features: [
        'Vaksin Influenza Quadrivalent (4 strain flu tahunan)',
        'Vaksin Kanker Serviks HPV 9-Valen (Gardasil 9)',
        'Vaksin Hepatitis A & B Dewasa',
        'Vaksin Pneumokokus (PCV13) pelindung paru-paru',
      ],
      sortOrder: 5,
    },
    {
      category: 'coe',
      slug: 'coe-ibu-anak',
      name: 'Pusat Kesehatan Ibu & Anak',
      subtitle: 'Pediatrik & Obstetri',
      tagline: 'Dokter Spesialis Anak & Kandungan',
      priceLabel: 'Poli Ibu & Anak, Gedung The Vida',
      durationMinutes: null,
      badge: 'Lingkungan Higienis & Nyaman',
      description:
        'Pemantauan tumbuh kembang anak, imunisasi rutin IDAI, dan pemeriksaan kesehatan kehamilan dalam suasana klinik yang ramah keluarga.',
      features: [
        'Konsultasi tumbuh kembang & kurva berat badan anak',
        'Pemeriksaan kehamilan rutin & USG obstetri dasar',
        'Imunisasi dasar dan lanjutan bayi & balita',
        'Konsultasi laktasi dan pendampingan nutrisi anak',
      ],
      sortOrder: 6,
    },
    {
      category: 'coe',
      slug: 'coe-laboratorium',
      name: 'Laboratorium Patologi & Diagnostik',
      subtitle: 'Diagnostik Terpadu',
      tagline: 'Hasil Terenkripsi PDF',
      priceLabel: 'Laboratorium Sentral Gedung The Vida',
      durationMinutes: null,
      badge: 'Sistem Terintegrasi Online',
      description:
        'Fasilitas uji darah rutin dan kimia klinik dengan penganalisis otomatis presisi tinggi. Hasil terhubung langsung ke portal rekam medis pasien.',
      features: [
        'Pemeriksaan Darah Lengkap otomatis 18 parameter',
        'Skrining diabetes: Gula Darah Puasa, 2JPP & HbA1c',
        'Fungsi hati (SGOT, SGPT) & fungsi ginjal (Ureum, Kreatinin)',
        'USG abdomen organ dalam beresolusi tinggi',
      ],
      sortOrder: 7,
    },
  ];

  // Clean up earlier vidaboost-* slugs if migrating to silver/gold/platinum/diamond slugs
  await prisma.servicePackage.deleteMany({
    where: {
      slug: {
        in: ['vidaboost-silver', 'vidaboost-gold', 'vidaboost-platinum', 'vidaboost-diamond', 'vidahealth-comprehensive'],
      },
    },
  });

  for (const svc of servicesSeed) {
    await prisma.servicePackage.upsert({
      where: { slug: svc.slug },
      update: svc,
      create: svc,
    });
  }

  console.log('Seed completed: 2 promos, 6 articles, 2 doctors/poli, 19 services.');
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
