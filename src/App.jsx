import { useState, useEffect } from "react";
import sgitVideo from "./assets/video.mp4";
import logoImg from "./assets/logo.png";

// ═══════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════
const USERS_KEY = "hardwareedu_users";
const SESSION_KEY = "hardwareedu_session";
const PROGRESS_KEY = "hardwareedu_progress";

const defaultUsers = [
  { username: "guru", password: "guru123", role: "guru", name: "Guru Admin" },
  {
    username: "siswa1",
    password: "siswa123",
    role: "siswa",
    name: "Budi Santoso",
  },
  {
    username: "siswa2",
    password: "siswa123",
    role: "siswa",
    name: "Sari Dewi",
  },
];

const hardwareData = [
  {
    id: 1,
    name: "Motherboard",
    category: "Processing Device",
    icon: "🖥️",
    shortDesc:
      "Papan sirkuit utama yang menghubungkan semua komponen komputer.",
    fullDesc:
      "Motherboard adalah komponen utama yang menjadi 'tulang punggung' komputer. Semua komponen lainnya terhubung melalui motherboard, termasuk CPU, RAM, kartu grafis, dan perangkat penyimpanan.",
    specs: [
      "Socket CPU: LGA1700, AM5",
      "Slot RAM: DDR4/DDR5",
      "PCIe 4.0/5.0 slots",
      "Form factor: ATX, mATX, ITX",
    ],
    cara_kerja:
      "Motherboard berfungsi sebagai bus komunikasi utama. Setiap sinyal data yang mengalir antara komponen melewati jalur sirkuit (traces) yang terukir di papan PCB berlapis-lapis.",
    kelebihan: [
      "Menghubungkan semua komponen",
      "Mendukung upgrade komponen",
      "Dilengkapi port I/O lengkap",
    ],
    kekurangan: [
      "Harga tinggi untuk kelas premium",
      "Kerusakan menyebabkan seluruh sistem mati",
      "Kompatibilitas terbatas per generasi",
    ],
    color: "#3B82F6",
    videoId: "b2pd3Y6aBag",
  },
  {
    id: 2,
    name: "Processor (CPU)",
    category: "Processing Device",
    icon: "⚡",
    shortDesc: "Otak komputer yang menjalankan semua kalkulasi dan instruksi.",
    fullDesc:
      "CPU (Central Processing Unit) adalah komponen terpenting dalam komputer. CPU memproses semua instruksi dari program yang berjalan, melakukan perhitungan matematika, dan mengkoordinasikan seluruh operasi sistem.",
    specs: [
      "Core: 4–24 core",
      "Clock speed: 3.0–5.8 GHz",
      "Cache: L1/L2/L3",
      "TDP: 65W–253W",
    ],
    cara_kerja:
      "CPU mengambil instruksi dari memori (fetch), mendekodenya (decode), menjalankannya di ALU (execute), lalu menyimpan hasilnya (write-back). Siklus ini berulang miliaran kali per detik.",
    kelebihan: [
      "Performa tinggi untuk multitasking",
      "Mendukung beban kerja berat",
      "Teknologi terus berkembang",
    ],
    kekurangan: [
      "Menghasilkan panas tinggi",
      "Harga flagship sangat mahal",
      "Konsumsi daya besar",
    ],
    color: "#8B5CF6",
    videoId: "Z5JC9Ve1sfI",
  },
  {
    id: 3,
    name: "RAM",
    category: "Processing Device",
    icon: "🧠",
    shortDesc: "Memori sementara untuk menyimpan data yang sedang diproses.",
    fullDesc:
      "RAM (Random Access Memory) adalah memori volatil yang digunakan untuk menyimpan data dan instruksi yang sedang aktif digunakan oleh CPU. Semakin besar RAM, semakin banyak program yang dapat berjalan sekaligus.",
    specs: [
      "Kapasitas: 8GB–128GB",
      "Tipe: DDR4 / DDR5",
      "Kecepatan: 3200–7200 MHz",
      "Latensi: CL16–CL36",
    ],
    cara_kerja:
      "RAM menyimpan data dalam sel kapasitor yang dapat dibaca dan ditulis secara acak dalam hitungan nanosecond. Data hilang saat listrik dimatikan karena sifatnya yang volatil.",
    kelebihan: [
      "Akses data sangat cepat",
      "Mendukung multitasking",
      "Mudah di-upgrade",
    ],
    kekurangan: [
      "Data hilang saat mati listrik",
      "Kapasitas terbatas vs storage",
      "Harga per GB lebih mahal dari HDD",
    ],
    color: "#10B981",
    videoId: "PVad0c2cljo",
  },
  {
    id: 4,
    name: "Hard Disk (HDD)",
    category: "Storage Device",
    icon: "💿",
    shortDesc:
      "Penyimpanan permanen berbasis piringan magnetis berkapasitas besar.",
    fullDesc:
      "HDD (Hard Disk Drive) menggunakan piringan magnetis yang berputar untuk menyimpan data secara permanen. HDD menawarkan kapasitas besar dengan harga terjangkau.",
    specs: [
      "Kapasitas: 500GB–20TB",
      "RPM: 5400–7200 RPM",
      "Interface: SATA III",
      "Cache: 64MB–256MB",
    ],
    cara_kerja:
      "Head baca/tulis bergerak di atas piringan yang berputar cepat. Data dikodekan sebagai pola magnetis pada permukaan piringan.",
    kelebihan: [
      "Kapasitas sangat besar",
      "Harga per GB sangat murah",
      "Umur panjang jika dirawat",
    ],
    kekurangan: [
      "Lambat dibanding SSD",
      "Rentan benturan fisik",
      "Suara berisik",
    ],
    color: "#F59E0B",
    videoId: "NtPc0jI21i0",
  },
  {
    id: 5,
    name: "SSD",
    category: "Storage Device",
    icon: "⚡",
    shortDesc: "Penyimpanan cepat berbasis chip flash tanpa komponen bergerak.",
    fullDesc:
      "SSD (Solid State Drive) menggunakan chip NAND flash untuk menyimpan data tanpa komponen mekanis bergerak. SSD jauh lebih cepat dari HDD dan tahan terhadap guncangan fisik.",
    specs: [
      "Kapasitas: 256GB–4TB",
      "Read: 550MB/s (SATA) – 7000MB/s (NVMe)",
      "Interface: SATA / M.2 NVMe",
      "NAND: TLC / QLC / MLC",
    ],
    cara_kerja:
      "SSD menyimpan data dalam sel transistor floating-gate yang dapat menahan muatan listrik tanpa daya.",
    kelebihan: [
      "Kecepatan sangat tinggi",
      "Tidak ada komponen bergerak",
      "Konsumsi daya rendah",
    ],
    kekurangan: [
      "Harga per GB lebih mahal dari HDD",
      "Kapasitas lebih terbatas",
      "Degradasi performa jika hampir penuh",
    ],
    color: "#06B6D4",
    videoId: "YQEjGKYXjw8",
  },
  {
    id: 6,
    name: "VGA / GPU",
    category: "Processing Device",
    icon: "🎮",
    shortDesc:
      "Kartu grafis untuk memproses dan menampilkan gambar beresolusi tinggi.",
    fullDesc:
      "GPU (Graphics Processing Unit) dirancang khusus untuk memproses data grafis secara paralel. GPU modern memiliki ribuan core kecil.",
    specs: [
      "VRAM: 4GB–24GB GDDR6/X",
      "Core: 2000–18000+ CUDA cores",
      "TDP: 100W–450W",
      "Interface: PCIe x16",
    ],
    cara_kerja:
      "GPU memecah tugas rendering menjadi ribuan operasi paralel kecil. Setiap pixel dihitung secara bersamaan oleh core GPU.",
    kelebihan: [
      "Performa grafis luar biasa",
      "Mendukung AI dan komputasi ilmiah",
      "Mendukung multi-monitor",
    ],
    kekurangan: [
      "Harga sangat mahal",
      "Konsumsi daya tinggi",
      "Menghasilkan panas besar",
    ],
    color: "#EF4444",
    videoId: "Kgcfj_KV-mo",
  },
  {
    id: 7,
    name: "Power Supply (PSU)",
    category: "Processing Device",
    icon: "🔌",
    shortDesc:
      "Mengubah arus listrik AC menjadi DC untuk memberi daya seluruh komponen.",
    fullDesc:
      "PSU (Power Supply Unit) mengkonversi tegangan AC dari stopkontak menjadi tegangan DC yang dibutuhkan komponen komputer.",
    specs: [
      "Watt: 450W–1600W",
      "Rating: 80+ Bronze/Gold/Platinum",
      "Modular / Non-modular",
      "Rail: +12V, +5V, +3.3V",
    ],
    cara_kerja:
      "PSU menggunakan transformator dan rectifier untuk mengkonversi AC 220V menjadi DC. Regulator tegangan memastikan output stabil.",
    kelebihan: [
      "Melindungi komponen dari tegangan tidak stabil",
      "Efisiensi tinggi",
      "Modular memudahkan manajemen kabel",
    ],
    kekurangan: [
      "PSU murah dapat merusak komponen",
      "Harus dipilih sesuai watt",
      "Berat dan memakan tempat",
    ],
    color: "#F97316",
    videoId: "i9KGPBKB6-k",
  },
  {
    id: 8,
    name: "Cooling Fan",
    category: "Processing Device",
    icon: "🌀",
    shortDesc: "Sistem pendingin untuk menjaga suhu komponen tetap optimal.",
    fullDesc:
      "Cooling system menjaga suhu komponen seperti CPU dan GPU tetap dalam batas aman.",
    specs: [
      "Tipe: Air Cooler / AIO Liquid",
      "Fan: 120mm–360mm radiator",
      "TDP support: hingga 280W+",
      "Noise: 15–40 dBA",
    ],
    cara_kerja:
      "Panas dari CPU diserap oleh heatpipe. Uap berpindah ke heatsink dan didinginkan oleh kipas.",
    kelebihan: [
      "Mencegah thermal throttling",
      "Memperpanjang umur komponen",
      "Liquid cooler lebih senyap",
    ],
    kekurangan: [
      "AIO liquid cooler mahal",
      "Kipas bisa berisik",
      "Liquid cooler berisiko bocor",
    ],
    color: "#06B6D4",
    videoId: "3yAQKECBbB0",
  },
  {
    id: 9,
    name: "Casing",
    category: "Processing Device",
    icon: "🏠",
    shortDesc:
      "Wadah pelindung yang menampung dan melindungi semua komponen internal.",
    fullDesc:
      "Casing komputer adalah struktur fisik yang menampung dan melindungi semua komponen internal.",
    specs: [
      "Form factor: ATX / mATX / ITX",
      "Material: Steel, Aluminium, Tempered Glass",
      'Drive bays: 2.5" / 3.5"',
      "Fan support: 120mm–140mm",
    ],
    cara_kerja:
      "Casing menyediakan struktur mounting untuk motherboard, drive, dan PSU. Mesh panel meningkatkan airflow.",
    kelebihan: [
      "Melindungi dari debu dan benturan",
      "Memfasilitasi manajemen kabel",
      "Pilihan estetika beragam",
    ],
    kekurangan: [
      "Casing besar memakan tempat",
      "Harga premium tinggi",
      "Airflow buruk jika desain kurang",
    ],
    color: "#6B7280",
    videoId: null,
  },
  {
    id: 10,
    name: "Monitor",
    category: "Output Device",
    icon: "🖥️",
    shortDesc: "Layar output untuk menampilkan visual dari komputer.",
    fullDesc:
      "Monitor adalah perangkat output utama yang menampilkan informasi visual dari komputer.",
    specs: [
      "Resolusi: FHD/QHD/4K/8K",
      "Refresh rate: 60Hz–360Hz",
      "Panel: IPS / VA / OLED",
      "Response time: 1–5ms",
    ],
    cara_kerja:
      "Monitor LCD menggunakan backlight LED melalui liquid crystal. Tiap piksel terdiri dari sub-piksel RGB.",
    kelebihan: [
      "Output visual berkualitas tinggi",
      "Warna akurat (IPS)",
      "Refresh rate tinggi untuk gaming",
    ],
    kekurangan: [
      "OLED rentan burn-in",
      "Monitor 4K butuh GPU kuat",
      "Konsumsi daya tinggi",
    ],
    color: "#8B5CF6",
    videoId: "ZnMgNnFPpBo",
  },
  {
    id: 11,
    name: "Keyboard",
    category: "Input Device",
    icon: "⌨️",
    shortDesc: "Perangkat input untuk mengetik teks dan memberikan perintah.",
    fullDesc:
      "Keyboard adalah perangkat input primer untuk memasukkan teks dan perintah.",
    specs: [
      "Tipe: Membrane / Mechanical",
      "Layout: Full / TKL / 60%",
      "Switch: Linear / Tactile / Clicky",
      "Koneksi: USB / Wireless BT",
    ],
    cara_kerja:
      "Setiap tombol mendeteksi penekanan dan mengirim sinyal ke controller. Controller menerjemahkan menjadi keycode.",
    kelebihan: [
      "Input teks cepat dan akurat",
      "Mechanical keyboard tahan lama",
      "Banyak pilihan",
    ],
    kekurangan: [
      "Mechanical keyboard berisik",
      "Wireless butuh baterai",
      "Ergonomi buruk jika lama",
    ],
    color: "#10B981",
    videoId: null,
  },
  {
    id: 12,
    name: "Mouse",
    category: "Input Device",
    icon: "🖱️",
    shortDesc:
      "Perangkat penunjuk untuk navigasi dan interaksi dengan antarmuka grafis.",
    fullDesc:
      "Mouse adalah perangkat input yang mengendalikan kursor di layar.",
    specs: [
      "Sensor: Optik / Laser",
      "DPI: 400–25.600 DPI",
      "Polling rate: 125–8000 Hz",
      "Tombol: 2–11 tombol",
    ],
    cara_kerja:
      "Sensor optik memancarkan cahaya LED. Prosesor mendeteksi pergerakan relatif antar frame dan menerjemahkan menjadi gerakan kursor.",
    kelebihan: [
      "Navigasi GUI intuitif",
      "DPI tinggi untuk presisi",
      "Wireless modern latensi rendah",
    ],
    kekurangan: [
      "Butuh permukaan datar",
      "Wireless butuh charging",
      "Tidak ergonomis untuk kidal",
    ],
    color: "#F59E0B",
    videoId: null,
  },
];

const quizLatihan = [
  {
    q: "Komponen apa yang disebut 'otak' komputer?",
    options: ["RAM", "Motherboard", "CPU", "SSD"],
    answer: 2,
    poin: 10,
  },
  {
    q: "Apa kepanjangan dari RAM?",
    options: [
      "Read Access Memory",
      "Random Access Memory",
      "Rapid Access Module",
      "Random Active Memory",
    ],
    answer: 1,
    poin: 10,
  },
  {
    q: "Perangkat mana yang termasuk Input Device?",
    options: ["Monitor", "Speaker", "Keyboard", "Printer"],
    answer: 2,
    poin: 10,
  },
  {
    q: "SSD lebih cepat dari HDD karena...",
    options: [
      "Kapasitas lebih besar",
      "Tidak ada komponen bergerak",
      "Lebih murah",
      "Menggunakan magnet",
    ],
    answer: 1,
    poin: 10,
  },
  {
    q: "Fungsi utama Power Supply adalah...",
    options: [
      "Menyimpan data",
      "Mengubah AC ke DC",
      "Memproses grafis",
      "Mendinginkan CPU",
    ],
    answer: 1,
    poin: 10,
  },
];

const quizEvaluasi = [
  {
    q: "GPU singkatan dari...",
    options: [
      "General Processing Unit",
      "Graphics Power Unit",
      "Graphics Processing Unit",
      "Global Pixel Unit",
    ],
    answer: 2,
    poin: 10,
  },
  {
    q: "Monitor termasuk kategori perangkat apa?",
    options: [
      "Input Device",
      "Storage Device",
      "Processing Device",
      "Output Device",
    ],
    answer: 3,
    poin: 10,
  },
  {
    q: "Komponen mana yang kehilangan data saat listrik mati?",
    options: ["HDD", "SSD", "RAM", "ROM"],
    answer: 2,
    poin: 10,
  },
  {
    q: "Arsitektur yang memisahkan memori instruksi dan data disebut...",
    options: ["Von Neumann", "Harvard", "RISC", "CISC"],
    answer: 1,
    poin: 10,
  },
  {
    q: "Motherboard menghubungkan komponen menggunakan...",
    options: ["Kabel HDMI", "Jalur sirkuit PCB", "Koneksi WiFi", "Kabel USB"],
    answer: 1,
    poin: 10,
  },
  {
    q: "Interface penyimpanan tercepat saat ini adalah...",
    options: ["SATA III", "USB 3.0", "M.2 NVMe", "ATA"],
    answer: 2,
    poin: 10,
  },
  {
    q: "Cooling fan tipe AIO adalah singkatan dari...",
    options: [
      "All In One",
      "Air In Output",
      "Advanced Integrated Option",
      "Automatic Integrated Overclock",
    ],
    answer: 0,
    poin: 10,
  },
  {
    q: "PSU dengan rating 80+ Gold berarti...",
    options: [
      "Daya 80 watt",
      "Efisiensi di atas 87%",
      "Harga mahal",
      "Garansi 80 bulan",
    ],
    answer: 1,
    poin: 10,
  },
  {
    q: "Prinsip kerja CPU yang paling dasar disebut...",
    options: [
      "Boot Sequence",
      "Fetch-Decode-Execute",
      "POST Cycle",
      "Cache Pipeline",
    ],
    answer: 1,
    poin: 10,
  },
  {
    q: "Perangkat output yang menampilkan gambar adalah...",
    options: ["Keyboard", "Mouse", "Monitor", "Scanner"],
    answer: 2,
    poin: 10,
  },
];

const studiKasusData = [
  {
    id: 1,
    judul: "Komputer Lambat Saat Multitasking",
    skenario:
      "Pak Rudi adalah seorang desainer grafis. Ia mengeluh bahwa komputernya sangat lambat saat membuka Adobe Photoshop, browser dengan 10 tab, dan aplikasi musik sekaligus. Komputer tersebut menggunakan CPU Intel Core i5 generasi ke-8 dengan RAM 8GB DDR4 dan SSD 256GB.",
    pertanyaan: [
      {
        id: "p1",
        teks: "Identifikasi komponen mana yang menjadi bottleneck utama penyebab kelambatan!",
        jenis: "uraian",
      },
      {
        id: "p2",
        teks: "Solusi upgrade apa yang paling tepat dan efisien secara biaya?",
        jenis: "pilihan",
        opsi: [
          "Ganti CPU ke i9",
          "Tambah RAM ke 16GB atau 32GB",
          "Ganti SSD ke kapasitas lebih besar",
          "Beli GPU baru",
        ],
        jawaban: 1,
      },
      {
        id: "p3",
        teks: "Jelaskan mengapa solusi tersebut merupakan pilihan terbaik berdasarkan pengetahuan yang telah kamu pelajari!",
        jenis: "uraian",
      },
    ],
    icon: "🖥️",
    warna: "#8B5CF6",
  },
  {
    id: 2,
    judul: "Pilihan Penyimpanan untuk Laptop Baru",
    skenario:
      "Rina ingin membeli laptop untuk kuliah jurusan Teknik Informatika. Ia butuh penyimpanan yang cepat untuk compile kode, tapi juga butuh kapasitas besar untuk menyimpan dataset, video kuliah, dan project. Budget storage-nya sekitar Rp 1 juta.",
    pertanyaan: [
      {
        id: "p1",
        teks: "Bandingkan HDD dan SSD dari segi kecepatan, kapasitas, dan harga untuk kebutuhan Rina!",
        jenis: "uraian",
      },
      {
        id: "p2",
        teks: "Konfigurasi storage mana yang paling direkomendasikan?",
        jenis: "pilihan",
        opsi: [
          "SSD 1TB NVMe saja",
          "HDD 2TB saja",
          "SSD 256GB + HDD 1TB (dual storage)",
          "SSD 512GB NVMe",
        ],
        jawaban: 3,
      },
      {
        id: "p3",
        teks: "Jelaskan strategi penggunaan storage tersebut agar performa optimal!",
        jenis: "uraian",
      },
    ],
    icon: "💾",
    warna: "#F59E0B",
  },
  {
    id: 3,
    judul: "Komputer Overheat saat Gaming",
    skenario:
      "Dimas sering bermain game AAA di komputernya. Belakangan, komputer sering mati tiba-tiba setelah 30 menit gaming, dan ketika diperiksa dengan software monitoring, suhu CPU mencapai 95°C. Casing komputernya adalah mini-ITX dengan satu kipas kecil.",
    pertanyaan: [
      {
        id: "p1",
        teks: "Analisis mengapa suhu CPU bisa mencapai 95°C! Faktor apa saja yang berkontribusi?",
        jenis: "uraian",
      },
      {
        id: "p2",
        teks: "Solusi pendinginan mana yang paling efektif untuk kasus ini?",
        jenis: "pilihan",
        opsi: [
          "Ganti pasta thermal CPU",
          "Tambah kipas casing 120mm",
          "Upgrade ke AIO liquid cooler 240mm + casing lebih besar",
          "Turunkan setting grafis game",
        ],
        jawaban: 2,
      },
      {
        id: "p3",
        teks: "Selain pendinginan, aspek apa lagi dari arsitektur komputer yang perlu diperhatikan agar sistem gaming stabil?",
        jenis: "uraian",
      },
    ],
    icon: "🌡️",
    warna: "#EF4444",
  },
];

const lkpdData = [
  {
    id: 1,
    judul: "LKPD 1: Identifikasi Komponen Hardware",
    tujuan:
      "Siswa mampu mengidentifikasi dan mengklasifikasikan komponen hardware komputer berdasarkan kategori dan fungsinya.",
    petunjuk:
      "Jawab setiap pertanyaan di bawah ini dengan lengkap dan jelas. Gunakan pengetahuan dari materi yang telah dipelajari.",
    soal: [
      {
        id: "l1q1",
        teks: "Sebutkan minimal 3 komponen yang termasuk kategori Processing Device beserta fungsi singkatnya!",
        jenis: "uraian",
        poin: 20,
      },
      {
        id: "l1q2",
        teks: "Apa perbedaan utama antara Input Device dan Output Device? Berikan masing-masing 2 contoh!",
        jenis: "uraian",
        poin: 20,
      },
      {
        id: "l1q3",
        teks: "Mengapa Motherboard disebut sebagai 'tulang punggung' komputer? Jelaskan dengan kata-katamu sendiri!",
        jenis: "uraian",
        poin: 20,
      },
      {
        id: "l1q4",
        teks: "Komponen apa saja yang wajib ada agar sebuah komputer dapat menyala dan menjalankan sistem operasi?",
        jenis: "uraian",
        poin: 20,
      },
      {
        id: "l1q5",
        teks: "Jika kamu harus merakit komputer untuk keperluan editing video 4K, komponen apa yang harus diprioritaskan spesifikasi tingginya dan mengapa?",
        jenis: "uraian",
        poin: 20,
      },
    ],
  },
  {
    id: 2,
    judul: "LKPD 2: Analisis Arsitektur Komputer",
    tujuan:
      "Siswa mampu menjelaskan konsep arsitektur komputer dan siklus instruksi CPU.",
    petunjuk:
      "Kerjakan soal berikut secara mandiri. Tuliskan jawaban dengan bahasa yang sistematis dan terstruktur.",
    soal: [
      {
        id: "l2q1",
        teks: "Jelaskan tahapan siklus Fetch-Decode-Execute-Writeback pada CPU dengan analogi sehari-hari yang mudah dipahami!",
        jenis: "uraian",
        poin: 25,
      },
      {
        id: "l2q2",
        teks: "Apa perbedaan utama antara arsitektur Von Neumann dan Harvard? Dalam situasi apa masing-masing lebih unggul?",
        jenis: "uraian",
        poin: 25,
      },
      {
        id: "l2q3",
        teks: "Gambarkan (deskripsikan dengan kata-kata) alur data dari keyboard saat kamu mengetik huruf 'A' hingga muncul di layar monitor!",
        jenis: "uraian",
        poin: 25,
      },
      {
        id: "l2q4",
        teks: "Mengapa komputer gaming memerlukan GPU yang kuat, sementara komputer kantor biasa cukup menggunakan GPU terintegrasi?",
        jenis: "uraian",
        poin: 25,
      },
    ],
  },
];

const refleksiPertanyaan = [
  {
    id: "r1",
    teks: "Materi apa yang paling kamu pahami dari pelajaran ini? Jelaskan secara singkat apa yang kamu pelajari!",
    icon: "💡",
  },
  {
    id: "r2",
    teks: "Materi atau konsep apa yang masih terasa sulit atau membingungkan bagimu?",
    icon: "🤔",
  },
  {
    id: "r3",
    teks: "Bagaimana pengalamanmu menggunakan website HardwareEdu ini? Apa yang kamu suka dan apa yang perlu diperbaiki?",
    icon: "🌐",
  },
  {
    id: "r4",
    teks: "Apa yang ingin kamu pelajari lebih lanjut tentang hardware komputer?",
    icon: "🚀",
  },
  {
    id: "r5",
    teks: "Nilai berapa yang pantas kamu berikan untuk usahamu sendiri dalam belajar hari ini? (1-10) dan jelaskan alasannya!",
    icon: "⭐",
  },
];

// Bobot penilaian
const BOBOT = { latihan: 0.2, evaluasi: 0.4, lkpd: 0.25, studiKasus: 0.15 };

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════
function loadUsers() {
  try {
    const u = JSON.parse(localStorage.getItem(USERS_KEY));
    return u && u.length ? u : defaultUsers;
  } catch {
    return defaultUsers;
  }
}
function saveUsers(u) {
  localStorage.setItem(USERS_KEY, JSON.stringify(u));
}
function loadSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}
function saveSession(s) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(s));
}
function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
function loadProgress(username) {
  try {
    const all = JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {};
    return all[username] || {};
  } catch {
    return {};
  }
}
function saveProgress(username, data) {
  try {
    const all = JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {};
    all[username] = { ...all[username], ...data };
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
  } catch {}
}
function loadAllProgress() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {};
  } catch {
    return {};
  }
}
function getPredikat(nilai) {
  if (nilai >= 90) return { p: "A", label: "Sangat Baik", c: "#10B981" };
  if (nilai >= 80) return { p: "B", label: "Baik", c: "#3B82F6" };
  if (nilai >= 70) return { p: "C", label: "Cukup", c: "#F59E0B" };
  return { p: "D", label: "Perlu Perbaikan", c: "#EF4444" };
}
function hitungNilaiAkhir(prog) {
  const nilaiLatihan =
    prog.latihanScore != null
      ? (prog.latihanScore / (quizLatihan.length * 10)) * 100
      : null;
  const nilaiEval =
    prog.evaluasiScore != null
      ? (prog.evaluasiScore / (quizEvaluasi.length * 10)) * 100
      : null;
  const nilaiLkpd = prog.lkpdScore != null ? prog.lkpdScore : null;
  const nilaiSK = prog.studiKasusScore != null ? prog.studiKasusScore : null;
  const komponen = [];
  if (nilaiLatihan != null)
    komponen.push({ k: "Latihan", n: nilaiLatihan, b: BOBOT.latihan });
  if (nilaiEval != null)
    komponen.push({ k: "Evaluasi", n: nilaiEval, b: BOBOT.evaluasi });
  if (nilaiLkpd != null)
    komponen.push({ k: "LKPD", n: nilaiLkpd, b: BOBOT.lkpd });
  if (nilaiSK != null)
    komponen.push({ k: "Studi Kasus", n: nilaiSK, b: BOBOT.studiKasus });
  if (!komponen.length) return null;
  const totalBobot = komponen.reduce((s, k) => s + k.b, 0);
  const nilai = komponen.reduce((s, k) => s + k.n * k.b, 0) / totalBobot;
  return { nilai: Math.round(nilai), komponen };
}

const categories = [
  "Semua",
  "Input Device",
  "Output Device",
  "Processing Device",
  "Storage Device",
];

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [session, setSession] = useState(() => loadSession());
  const [page, setPage] = useState("home");
  const [darkMode, setDarkMode] = useState(false);

  // materi states
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedHW, setSelectedHW] = useState(null);

  // quiz states
  const [quizMode, setQuizMode] = useState(null); // "latihan"|"evaluasi"
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(null);
  const [quizDone, setQuizDone] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // LKPD
  const [activeLkpd, setActiveLkpd] = useState(null);
  const [lkpdAnswers, setLkpdAnswers] = useState({});
  const [lkpdSubmitted, setLkpdSubmitted] = useState(false);

  // Studi Kasus
  const [activeKasus, setActiveKasus] = useState(null);
  const [kasusAnswers, setKasusAnswers] = useState({});
  const [kasusSubmitted, setKasusSubmitted] = useState(false);

  // Refleksi
  const [refleksiAnswers, setRefleksiAnswers] = useState({});
  const [refleksiSubmitted, setRefleksiSubmitted] = useState(false);

  const progress = session ? loadProgress(session.username) : {};

  useEffect(() => {
    if (session) {
      const prog = loadProgress(session.username);
      if (prog.refleksi) {
        setRefleksiAnswers(prog.refleksi);
        setRefleksiSubmitted(true);
      }
    }
  }, [session]);

  const dm = darkMode;
  const bg = dm ? "#0f172a" : "#f8fafc";
  const card = dm ? "#1e293b" : "#ffffff";
  const text = dm ? "#e2e8f0" : "#1e293b";
  const textMuted = dm ? "#94a3b8" : "#64748b";
  const border = dm ? "#334155" : "#e2e8f0";
  const navBg = dm ? "#0f172a" : "#ffffff";
  const accent = "#3B82F6";

  const S = {
    app: {
      minHeight: "100vh",
      background: bg,
      color: text,
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      transition: "all 0.3s",
    },
    nav: {
      background: navBg,
      borderBottom: `1px solid ${border}`,
      padding: "0 1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 60,
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: dm ? "0 1px 0 #334155" : "0 1px 8px rgba(0,0,0,0.06)",
      flexWrap: "wrap",
      gap: 4,
    },
    navLogo: {
      fontWeight: 700,
      fontSize: 17,
      color: accent,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 6,
    },
    navLinks: {
      display: "flex",
      gap: 4,
      alignItems: "center",
      flexWrap: "wrap",
    },
    navBtn: (active) => ({
      background: active ? accent : "transparent",
      color: active ? "#fff" : textMuted,
      border: "none",
      borderRadius: 8,
      padding: "5px 12px",
      cursor: "pointer",
      fontWeight: active ? 600 : 400,
      fontSize: 13,
      transition: "all 0.2s",
    }),
    dmBtn: {
      background: dm ? "#334155" : "#f1f5f9",
      border: "none",
      borderRadius: 20,
      padding: "5px 12px",
      cursor: "pointer",
      fontSize: 15,
      transition: "all 0.2s",
    },
    section: { padding: "2rem 1.5rem", maxWidth: 1100, margin: "0 auto" },
    sectionTitle: {
      fontSize: "1.6rem",
      fontWeight: 700,
      marginBottom: 6,
      color: text,
    },
    sectionSub: { color: textMuted, marginBottom: 2, fontSize: 14 },
    card: {
      background: card,
      border: `1px solid ${border}`,
      borderRadius: 16,
      padding: "1.5rem",
    },
    heroBtn: {
      background: accent,
      color: "#fff",
      border: "none",
      borderRadius: 12,
      padding: "12px 28px",
      fontSize: 15,
      fontWeight: 600,
      cursor: "pointer",
      marginRight: 10,
      boxShadow: "0 4px 14px rgba(59,130,246,0.3)",
      transition: "transform 0.15s",
    },
    heroBtnOut: {
      background: "transparent",
      color: accent,
      border: `2px solid ${accent}`,
      borderRadius: 12,
      padding: "10px 24px",
      fontSize: 15,
      fontWeight: 600,
      cursor: "pointer",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
      gap: 18,
      marginTop: 20,
    },
    hwCard: {
      background: card,
      border: `1px solid ${border}`,
      borderRadius: 16,
      padding: "1.4rem",
      cursor: "pointer",
      transition: "all 0.2s",
      position: "relative",
      overflow: "hidden",
    },
    catBtn: (active) => ({
      background: active ? accent : dm ? "#1e293b" : "#f1f5f9",
      color: active ? "#fff" : textMuted,
      border: `1px solid ${active ? accent : border}`,
      borderRadius: 20,
      padding: "6px 16px",
      cursor: "pointer",
      fontSize: 12,
      fontWeight: active ? 600 : 400,
      transition: "all 0.2s",
      whiteSpace: "nowrap",
    }),
    modal: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.6)",
      zIndex: 200,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
    },
    modalBox: {
      background: card,
      borderRadius: 20,
      maxWidth: 860,
      width: "100%",
      maxHeight: "90vh",
      overflowY: "auto",
      padding: "2rem",
    },
    input: {
      background: dm ? "#0f172a" : "#f8fafc",
      border: `1px solid ${border}`,
      borderRadius: 10,
      padding: "10px 14px",
      color: text,
      fontSize: 14,
      width: "100%",
      boxSizing: "border-box",
      outline: "none",
    },
    textarea: {
      background: dm ? "#0f172a" : "#f8fafc",
      border: `1px solid ${border}`,
      borderRadius: 10,
      padding: "10px 14px",
      color: text,
      fontSize: 14,
      width: "100%",
      boxSizing: "border-box",
      outline: "none",
      resize: "vertical",
      minHeight: 100,
      fontFamily: "inherit",
    },
    btn: (color = "#3B82F6") => ({
      background: color,
      color: "#fff",
      border: "none",
      borderRadius: 10,
      padding: "10px 22px",
      cursor: "pointer",
      fontSize: 14,
      fontWeight: 600,
    }),
    btnOutline: {
      background: "transparent",
      color: accent,
      border: `2px solid ${accent}`,
      borderRadius: 10,
      padding: "8px 20px",
      cursor: "pointer",
      fontSize: 14,
      fontWeight: 600,
    },
    badge: (c) => ({
      display: "inline-block",
      background: c + "22",
      color: c,
      fontSize: 11,
      fontWeight: 700,
      padding: "2px 10px",
      borderRadius: 99,
    }),
    progress: {
      background: dm ? "#334155" : "#e2e8f0",
      borderRadius: 99,
      height: 8,
      overflow: "hidden",
    },
    progressFill: (pct, c = "#3B82F6") => ({
      background: c,
      width: pct + "%",
      height: "100%",
      borderRadius: 99,
      transition: "width 0.4s",
    }),
  };

  const getCategoryColor = (cat) =>
    ({
      "Input Device": "#10B981",
      "Output Device": "#8B5CF6",
      "Processing Device": "#3B82F6",
      "Storage Device": "#F59E0B",
    })[cat] || "#64748b";

  // ── LOGIN ──────────────────────────────────────────────────
  if (!session)
    return (
      <LoginPage
        onLogin={(s) => {
          saveSession(s);
          setSession(s);
        }}
        dm={dm}
        S={S}
      />
    );

  // ── Nav pages ──────────────────────────────────────────────
  const navItems = [
    { key: "home", label: "Beranda" },
    { key: "arsitektur", label: "Arsitektur" },
    { key: "materi", label: "Materi" },
    { key: "latihan", label: "Latihan" },
    { key: "studiKasus", label: "Studi Kasus" },
    { key: "lkpd", label: "LKPD" },
    { key: "evaluasi", label: "Evaluasi" },
    { key: "refleksi", label: "Refleksi" },
    { key: "nilai", label: "Nilai" },
    ...(session.role === "guru"
      ? [{ key: "dashboard", label: "📊 Dashboard Guru" }]
      : []),
  ];

  const go = (p) => {
    setPage(p);
    setQuizMode(null);
    setQuizIdx(0);
    setQuizScore(0);
    setQuizAnswered(null);
    setQuizDone(false);
    setSelectedAnswer(null);
    setActiveLkpd(null);
    setLkpdAnswers({});
    setLkpdSubmitted(false);
    setActiveKasus(null);
    setKasusAnswers({});
    setKasusSubmitted(false);
  };

  const filtered = hardwareData.filter((hw) => {
    const ms =
      hw.name.toLowerCase().includes(search.toLowerCase()) ||
      hw.shortDesc.toLowerCase().includes(search.toLowerCase());
    const mc = activeCategory === "Semua" || hw.category === activeCategory;
    return ms && mc;
  });

  // ── Quiz logic ─────────────────────────────────────────────
  const currentQuiz = quizMode === "evaluasi" ? quizEvaluasi : quizLatihan;
  const handleAnswer = (idx) => {
    if (quizAnswered !== null) return;
    setSelectedAnswer(idx);
    setQuizAnswered(idx);
    if (idx === currentQuiz[quizIdx].answer)
      setQuizScore((s) => s + currentQuiz[quizIdx].poin);
  };
  const nextQ = () => {
    if (quizIdx + 1 >= currentQuiz.length) {
      setQuizDone(true);
      const key = quizMode === "evaluasi" ? "evaluasiScore" : "latihanScore";
      const finalScore =
        quizAnswered === currentQuiz[quizIdx].answer ? quizScore : quizScore;
      // save on completion
      const finalS =
        selectedAnswer === currentQuiz[quizIdx].answer
          ? quizScore + currentQuiz[quizIdx].poin
          : quizScore;
      saveProgress(session.username, { [key]: finalS });
    } else {
      setQuizIdx((i) => i + 1);
      setQuizAnswered(null);
      setSelectedAnswer(null);
    }
  };
  const getAnswerState = (i) => {
    if (quizAnswered === null) return "none";
    if (i === currentQuiz[quizIdx].answer) return "correct";
    if (i === selectedAnswer && i !== currentQuiz[quizIdx].answer)
      return "wrong";
    return "none";
  };

  // ── LKPD submit ────────────────────────────────────────────
  const submitLkpd = () => {
    const totalSoal = activeLkpd.soal.length;
    const dijawab = activeLkpd.soal.filter(
      (s) => (lkpdAnswers[s.id] || "").trim().length > 10,
    ).length;
    const nilai = Math.round((dijawab / totalSoal) * 100);
    const prev = loadProgress(session.username);
    const prevScore = prev.lkpdScore || 0;
    saveProgress(session.username, {
      lkpdScore: Math.max(prevScore, nilai),
      lkpdAnswers: {
        ...(prev.lkpdAnswers || {}),
        [activeLkpd.id]: lkpdAnswers,
      },
    });
    setLkpdSubmitted(true);
  };

  // ── Studi Kasus submit ─────────────────────────────────────
  const submitKasus = () => {
    const soalPilihan = activeKasus.pertanyaan.filter(
      (p) => p.jenis === "pilihan",
    );
    const benar = soalPilihan.filter(
      (p) => kasusAnswers[p.id + "_pilihan"] == p.jawaban,
    ).length;
    const uraianDijawab = activeKasus.pertanyaan.filter(
      (p) =>
        p.jenis === "uraian" && (kasusAnswers[p.id] || "").trim().length > 15,
    ).length;
    const nilai = Math.round(
      ((benar * 2 + uraianDijawab) /
        (soalPilihan.length * 2 +
          activeKasus.pertanyaan.filter((p) => p.jenis === "uraian").length)) *
        100,
    );
    const prev = loadProgress(session.username);
    const prevScore = prev.studiKasusScore || 0;
    saveProgress(session.username, {
      studiKasusScore: Math.max(prevScore, nilai),
      kasusAnswers: {
        ...(prev.kasusAnswers || {}),
        [activeKasus.id]: kasusAnswers,
      },
    });
    setKasusSubmitted(true);
  };

  // ── Refleksi submit ────────────────────────────────────────
  const submitRefleksi = () => {
    saveProgress(session.username, { refleksi: refleksiAnswers });
    setRefleksiSubmitted(true);
  };

  const prog = loadProgress(session.username);
  const nilaiAkhir = hitungNilaiAkhir(prog);

  // ════════════════════════════════════════════════════════════
  return (
    <div style={S.app}>
      {/* NAVBAR */}
      <nav style={S.nav}>
        <div style={S.navLogo} onClick={() => go("home")}>
          <img
            src={logoImg}
            alt="HardwareEdu"
            style={{ width: 32, height: 32, objectFit: "contain" }}
          />
          HardwareEdu
        </div>
        <div style={S.navLinks}>
          {navItems.map((n) => (
            <button
              key={n.key}
              style={S.navBtn(page === n.key)}
              onClick={() => go(n.key)}
            >
              {n.label}
            </button>
          ))}
          <button style={S.dmBtn} onClick={() => setDarkMode((d) => !d)}>
            {dm ? "☀️" : "🌙"}
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginLeft: 8,
              paddingLeft: 8,
              borderLeft: `1px solid ${border}`,
            }}
          >
            <div
              style={{
                background: accent + "22",
                color: accent,
                borderRadius: "50%",
                width: 30,
                height: 30,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              {session.name[0]}
            </div>
            <span style={{ fontSize: 12, color: textMuted, display: "none" }}>
              {session.name}
            </span>
            <button
              onClick={() => {
                clearSession();
                setSession(null);
              }}
              style={{
                background: "#ef444422",
                color: "#ef4444",
                border: "none",
                borderRadius: 8,
                padding: "4px 10px",
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              Keluar
            </button>
          </div>
        </div>
      </nav>

      {/* ── HOME ─────────────────────────────────────────────── */}
      {page === "home" && (
        <div>
          <div
            style={{
              background: dm
                ? "linear-gradient(135deg,#1e293b,#0f172a)"
                : "linear-gradient(135deg,#eff6ff,#dbeafe)",
              padding: "4rem 1.5rem 3rem",
              textAlign: "center",
            }}
          >
            <div style={{ maxWidth: 680, margin: "0 auto" }}>
              <div
                style={{ ...S.badge(accent), marginBottom: 16, fontSize: 13 }}
              >
                🎓 Selamat datang, {session.name}!
              </div>
              <h1
                style={{
                  fontSize: "clamp(1.8rem,4vw,3rem)",
                  fontWeight: 800,
                  color: text,
                  marginBottom: 14,
                  lineHeight: 1.2,
                }}
              >
                Belajar <span style={{ color: accent }}>Hardware</span> Komputer
              </h1>
              <p
                style={{
                  color: textMuted,
                  fontSize: 15,
                  marginBottom: 28,
                  maxWidth: 560,
                  margin: "0 auto 28px",
                }}
              >
                Platform pembelajaran lengkap: materi, studi kasus, LKPD, kuis,
                refleksi, dan sistem penilaian otomatis.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <button style={S.heroBtn} onClick={() => go("materi")}>
                  🚀 Mulai Belajar
                </button>
                <button style={S.heroBtnOut} onClick={() => go("latihan")}>
                  📝 Latihan Soal
                </button>
                <button style={S.heroBtnOut} onClick={() => go("nilai")}>
                  📊 Lihat Nilai
                </button>
              </div>
            </div>
          </div>

          {/* Progress ringkas */}
          <div style={{ ...S.section, paddingTop: "1.5rem" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))",
                gap: 14,
              }}
            >
              {[
                {
                  label: "Latihan",
                  val:
                    prog.latihanScore != null
                      ? `${prog.latihanScore}/${quizLatihan.length * 10}`
                      : "Belum",
                  icon: "✏️",
                  c: "#3B82F6",
                },
                {
                  label: "Evaluasi",
                  val:
                    prog.evaluasiScore != null
                      ? `${prog.evaluasiScore}/${quizEvaluasi.length * 10}`
                      : "Belum",
                  icon: "📋",
                  c: "#8B5CF6",
                },
                {
                  label: "LKPD",
                  val: prog.lkpdScore != null ? `${prog.lkpdScore}` : "Belum",
                  icon: "📄",
                  c: "#10B981",
                },
                {
                  label: "Studi Kasus",
                  val:
                    prog.studiKasusScore != null
                      ? `${prog.studiKasusScore}`
                      : "Belum",
                  icon: "🔍",
                  c: "#F59E0B",
                },
                {
                  label: "Nilai Akhir",
                  val: nilaiAkhir ? `${nilaiAkhir.nilai}` : "—",
                  icon: "🏆",
                  c: nilaiAkhir ? getPredikat(nilaiAkhir.nilai).c : "#64748b",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    ...S.card,
                    textAlign: "center",
                    borderTop: `3px solid ${s.c}`,
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: s.c }}>
                    {s.val}
                  </div>
                  <div style={{ fontSize: 12, color: textMuted, marginTop: 4 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Menu cepat */}
            <h2 style={{ ...S.sectionTitle, marginTop: 32 }}>
              Menu Pembelajaran
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))",
                gap: 14,
                marginTop: 16,
              }}
            >
              {[
                {
                  key: "arsitektur",
                  icon: "🏛️",
                  label: "Arsitektur Komputer",
                  desc: "Fondasi cara kerja komputer",
                  c: "#3B82F6",
                },
                {
                  key: "materi",
                  icon: "📚",
                  label: "Materi Hardware",
                  desc: "12 komponen + video",
                  c: "#8B5CF6",
                },
                {
                  key: "studiKasus",
                  icon: "🔍",
                  label: "Studi Kasus / PBL",
                  desc: "Analisis masalah nyata",
                  c: "#F59E0B",
                },
                {
                  key: "lkpd",
                  icon: "📄",
                  label: "LKPD",
                  desc: "Lembar kerja mandiri",
                  c: "#10B981",
                },
                {
                  key: "latihan",
                  icon: "✏️",
                  label: "Latihan Soal",
                  desc: "5 soal pilihan ganda",
                  c: "#06B6D4",
                },
                {
                  key: "evaluasi",
                  icon: "📋",
                  label: "Evaluasi Akhir",
                  desc: "10 soal penilaian",
                  c: "#EF4444",
                },
                {
                  key: "refleksi",
                  icon: "💭",
                  label: "Refleksi",
                  desc: "Ceritakan pengalamanmu",
                  c: "#F97316",
                },
                {
                  key: "nilai",
                  icon: "🏆",
                  label: "Nilai & Predikat",
                  desc: "Hasil belajarmu",
                  c: "#8B5CF6",
                },
              ].map((m) => (
                <div
                  key={m.key}
                  style={{ ...S.hwCard, borderLeft: `3px solid ${m.c}` }}
                  onClick={() => go(m.key)}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "translateY(-3px)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  <div style={{ fontSize: 30, marginBottom: 8 }}>{m.icon}</div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 14,
                      color: m.c,
                      marginBottom: 4,
                    }}
                  >
                    {m.label}
                  </div>
                  <div style={{ fontSize: 12, color: textMuted }}>{m.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── ARSITEKTUR ───────────────────────────────────────── */}
      {page === "arsitektur" && (
        <div style={S.section}>
          <h2 style={S.sectionTitle}>🏛️ Pengenalan Arsitektur Komputer</h2>
          <p style={{ ...S.sectionSub, marginBottom: 24 }}>
            Memahami fondasi bagaimana komputer dirancang dan bekerja
          </p>
          <div
            style={{
              ...S.card,
              display: "flex",
              gap: 24,
              flexWrap: "wrap",
              marginBottom: 28,
            }}
          >
            <div style={{ flexShrink: 0 }}>
              <div
                style={{
                  width: 200,
                  borderRadius: 14,
                  overflow: "hidden",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
                  background: "#000",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    zIndex: 2,
                    background: accent,
                    color: "#fff",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: 99,
                  }}
                >
                  ▶ VIDEO
                </div>
                <iframe
                  width="200"
                  height="356"
                  src={sgitVideo}
                  title="Arsitektur Komputer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ display: "block" }}
                />
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 240 }}>
              <div style={{ ...S.badge(accent), marginBottom: 12 }}>
                📖 Apa itu Arsitektur Komputer?
              </div>
              <p
                style={{
                  color: textMuted,
                  lineHeight: 1.8,
                  fontSize: 14.5,
                  marginBottom: 16,
                }}
              >
                Arsitektur komputer adalah ilmu yang mempelajari bagaimana
                komponen-komponen hardware dirancang, diorganisasikan, dan
                saling terhubung sehingga membentuk sebuah sistem komputer yang
                berfungsi. Pemahaman arsitektur komputer merupakan fondasi
                penting bagi siapa pun yang ingin mendalami dunia teknologi
                informasi.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  "Von Neumann",
                  "Harvard",
                  "RISC",
                  "CISC",
                  "Pipeline",
                  "Fetch-Decode-Execute",
                ].map((t) => (
                  <span
                    key={t}
                    style={{
                      background: dm ? "#334155" : "#f1f5f9",
                      color: textMuted,
                      fontSize: 12,
                      padding: "4px 12px",
                      borderRadius: 99,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Siklus */}
          <h3
            style={{
              fontWeight: 700,
              fontSize: 17,
              marginBottom: 14,
              color: text,
            }}
          >
            ⚡ Siklus Instruksi CPU
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))",
              gap: 14,
              marginBottom: 28,
            }}
          >
            {[
              {
                n: "1",
                nama: "Fetch",
                icon: "📥",
                desc: "CPU mengambil instruksi dari memori menggunakan Program Counter (PC)",
              },
              {
                n: "2",
                nama: "Decode",
                icon: "🔍",
                desc: "Control Unit mendekode instruksi untuk menentukan operasi yang dilakukan",
              },
              {
                n: "3",
                nama: "Execute",
                icon: "⚡",
                desc: "ALU menjalankan operasi aritmatika/logika sesuai instruksi",
              },
              {
                n: "4",
                nama: "Write-back",
                icon: "💾",
                desc: "Hasil eksekusi disimpan kembali ke register atau memori",
              },
            ].map((s) => (
              <div
                key={s.n}
                style={{
                  ...S.card,
                  borderTop: `3px solid ${accent}`,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    left: 16,
                    background: accent,
                    color: "#fff",
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {s.n}
                </div>
                <div style={{ fontSize: 28, marginBottom: 8, marginTop: 8 }}>
                  {s.icon}
                </div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>
                  {s.nama}
                </div>
                <div
                  style={{ fontSize: 12.5, color: textMuted, lineHeight: 1.6 }}
                >
                  {s.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Model */}
          <h3
            style={{
              fontWeight: 700,
              fontSize: 17,
              marginBottom: 14,
              color: text,
            }}
          >
            📐 Model Arsitektur Komputer
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))",
              gap: 16,
            }}
          >
            {[
              {
                nama: "Von Neumann",
                tahun: "1945",
                desc: "Program dan data disimpan di memori yang sama. Model paling umum digunakan. CPU mengeksekusi instruksi berurutan dari memori.",
                c: "#3B82F6",
              },
              {
                nama: "Harvard",
                tahun: "1944",
                desc: "Memisahkan memori instruksi dan data. CPU dapat mengakses keduanya bersamaan. Digunakan di mikrokontroler dan DSP.",
                c: "#8B5CF6",
              },
              {
                nama: "RISC",
                tahun: "1980-an",
                desc: "Reduced Instruction Set — instruksi sederhana, dieksekusi dalam satu siklus clock. Basis prosesor ARM (smartphone, Apple Silicon).",
                c: "#10B981",
              },
              {
                nama: "CISC",
                tahun: "1970-an",
                desc: "Complex Instruction Set — instruksi kompleks yang melakukan banyak operasi. Digunakan prosesor x86 Intel & AMD.",
                c: "#F59E0B",
              },
            ].map((m) => (
              <div
                key={m.nama}
                style={{ ...S.card, borderLeft: `4px solid ${m.c}` }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 10,
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{m.nama}</div>
                  <span style={{ ...S.badge(m.c) }}>{m.tahun}</span>
                </div>
                <div
                  style={{ fontSize: 13, color: textMuted, lineHeight: 1.7 }}
                >
                  {m.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MATERI ───────────────────────────────────────────── */}
      {page === "materi" && (
        <div style={S.section}>
          <h2 style={S.sectionTitle}>📚 Materi Hardware Komputer</h2>
          <p style={{ ...S.sectionSub, marginBottom: 16 }}>
            Pelajari {hardwareData.length} komponen hardware komputer secara
            lengkap
          </p>
          <div style={{ position: "relative", marginBottom: 14 }}>
            <span
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 16,
              }}
            >
              🔍
            </span>
            <input
              style={{ ...S.input, paddingLeft: 40 }}
              placeholder="Cari hardware..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 20,
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                style={S.catBtn(activeCategory === cat)}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div style={S.grid}>
            {filtered.map((hw) => (
              <div
                key={hw.id}
                style={S.hwCard}
                onClick={() => setSelectedHW(hw)}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 28px rgba(0,0,0,0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 70,
                    height: 70,
                    background: hw.color + "11",
                    borderRadius: "0 16px 0 70px",
                  }}
                />
                <div style={{ fontSize: 32, marginBottom: 10 }}>{hw.icon}</div>
                <div style={{ ...S.badge(hw.color), marginBottom: 8 }}>
                  {hw.category}
                </div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                  {hw.name}
                </div>
                <div
                  style={{ color: textMuted, fontSize: 12.5, lineHeight: 1.6 }}
                >
                  {hw.shortDesc}
                </div>
                <div
                  style={{
                    marginTop: 12,
                    fontSize: 12,
                    color: accent,
                    fontWeight: 600,
                    display: "flex",
                    gap: 6,
                    alignItems: "center",
                  }}
                >
                  {hw.videoId && (
                    <span
                      style={{
                        background: "#ef4444",
                        color: "#fff",
                        fontSize: 10,
                        padding: "1px 6px",
                        borderRadius: 99,
                        fontWeight: 700,
                      }}
                    >
                      ▶ VIDEO
                    </span>
                  )}
                  Lihat detail →
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── LATIHAN ──────────────────────────────────────────── */}
      {page === "latihan" && (
        <QuizPage
          title="✏️ Latihan Soal"
          subtitle="5 soal pilihan ganda — tidak mempengaruhi nilai jika diulang"
          quizData={quizLatihan}
          quizMode={quizMode}
          setQuizMode={setQuizMode}
          quizIdx={quizIdx}
          quizScore={quizScore}
          quizAnswered={quizAnswered}
          quizDone={quizDone}
          selectedAnswer={selectedAnswer}
          handleAnswer={handleAnswer}
          nextQ={nextQ}
          getAnswerState={getAnswerState}
          resetQuiz={() => {
            setQuizMode("latihan");
            setQuizIdx(0);
            setQuizScore(0);
            setQuizAnswered(null);
            setQuizDone(false);
            setSelectedAnswer(null);
          }}
          modeKey="latihan"
          prog={prog}
          session={session}
          S={S}
          dm={dm}
          accent={accent}
          text={text}
          textMuted={textMuted}
          border={border}
          card={card}
        />
      )}

      {/* ── EVALUASI ─────────────────────────────────────────── */}
      {page === "evaluasi" && (
        <QuizPage
          title="📋 Evaluasi Akhir"
          subtitle="10 soal penilaian akhir — hasilnya masuk ke nilai akhir"
          quizData={quizEvaluasi}
          quizMode={quizMode}
          setQuizMode={setQuizMode}
          quizIdx={quizIdx}
          quizScore={quizScore}
          quizAnswered={quizAnswered}
          quizDone={quizDone}
          selectedAnswer={selectedAnswer}
          handleAnswer={handleAnswer}
          nextQ={nextQ}
          getAnswerState={getAnswerState}
          resetQuiz={() => {
            setQuizMode("evaluasi");
            setQuizIdx(0);
            setQuizScore(0);
            setQuizAnswered(null);
            setQuizDone(false);
            setSelectedAnswer(null);
          }}
          modeKey="evaluasi"
          prog={prog}
          session={session}
          S={S}
          dm={dm}
          accent={accent}
          text={text}
          textMuted={textMuted}
          border={border}
          card={card}
        />
      )}

      {/* ── STUDI KASUS ──────────────────────────────────────── */}
      {page === "studiKasus" && (
        <div style={S.section}>
          <h2 style={S.sectionTitle}>
            🔍 Studi Kasus / Problem Based Learning
          </h2>
          <p style={{ ...S.sectionSub, marginBottom: 24 }}>
            Analisis masalah nyata dan temukan solusi terbaik berdasarkan
            pengetahuan hardware yang telah kamu pelajari
          </p>

          {!activeKasus ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))",
                gap: 18,
              }}
            >
              {studiKasusData.map((k) => {
                const savedAnswers = (prog.kasusAnswers || {})[k.id];
                const done = !!savedAnswers;
                return (
                  <div
                    key={k.id}
                    style={{ ...S.hwCard, borderTop: `3px solid ${k.warna}` }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "translateY(-3px)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "translateY(0)")
                    }
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 10,
                      }}
                    >
                      <div style={{ fontSize: 36 }}>{k.icon}</div>
                      {done && (
                        <span style={{ ...S.badge("#10B981") }}>
                          ✅ Selesai
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 15,
                        color: k.warna,
                        marginBottom: 8,
                      }}
                    >
                      {k.judul}
                    </div>
                    <div
                      style={{
                        fontSize: 12.5,
                        color: textMuted,
                        lineHeight: 1.6,
                        marginBottom: 14,
                      }}
                    >
                      {k.skenario.substring(0, 120)}...
                    </div>
                    <button
                      style={S.btn(k.warna)}
                      onClick={() => {
                        setActiveKasus(k);
                        setKasusAnswers(savedAnswers || {});
                        setKasusSubmitted(!!savedAnswers);
                      }}
                    >
                      {done ? "Lihat Jawaban" : "Kerjakan →"}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <button
                style={{ ...S.btnOutline, marginBottom: 20 }}
                onClick={() => {
                  setActiveKasus(null);
                  setKasusAnswers({});
                  setKasusSubmitted(false);
                }}
              >
                ← Kembali
              </button>
              <div
                style={{
                  ...S.card,
                  borderTop: `4px solid ${activeKasus.warna}`,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                    marginBottom: 14,
                  }}
                >
                  <div style={{ fontSize: 40 }}>{activeKasus.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 18 }}>
                      {activeKasus.judul}
                    </div>
                    <div
                      style={{ ...S.badge(activeKasus.warna), marginTop: 4 }}
                    >
                      Studi Kasus
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    background: dm ? "#0f172a" : "#f8fafc",
                    borderRadius: 12,
                    padding: "1rem",
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 13,
                      marginBottom: 8,
                      color: accent,
                    }}
                  >
                    📋 Skenario
                  </div>
                  <p
                    style={{ color: textMuted, fontSize: 14, lineHeight: 1.8 }}
                  >
                    {activeKasus.skenario}
                  </p>
                </div>

                {activeKasus.pertanyaan.map((p, idx) => (
                  <div key={p.id} style={{ marginBottom: 24 }}>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 14,
                        marginBottom: 10,
                        display: "flex",
                        gap: 10,
                        alignItems: "flex-start",
                      }}
                    >
                      <span
                        style={{
                          background: activeKasus.warna + "22",
                          color: activeKasus.warna,
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          fontWeight: 800,
                          flexShrink: 0,
                        }}
                      >
                        {idx + 1}
                      </span>
                      {p.teks}
                    </div>
                    {p.jenis === "pilihan" ? (
                      <div>
                        {p.opsi.map((o, i) => {
                          const sel = kasusAnswers[p.id + "_pilihan"];
                          const isSelected = sel == i;
                          const isCorrect = kasusSubmitted && i === p.jawaban;
                          const isWrong =
                            kasusSubmitted && isSelected && i !== p.jawaban;
                          return (
                            <button
                              key={i}
                              disabled={kasusSubmitted}
                              style={{
                                display: "block",
                                width: "100%",
                                textAlign: "left",
                                padding: "10px 14px",
                                borderRadius: 10,
                                marginBottom: 8,
                                cursor: kasusSubmitted ? "default" : "pointer",
                                border: `2px solid ${isCorrect ? "#10B981" : isWrong ? "#EF4444" : isSelected ? accent : border}`,
                                background: isCorrect
                                  ? "#10B98120"
                                  : isWrong
                                    ? "#EF444420"
                                    : isSelected
                                      ? accent + "11"
                                      : dm
                                        ? "#0f172a"
                                        : "#f8fafc",
                                color: text,
                                fontSize: 13,
                                transition: "all 0.2s",
                              }}
                              onClick={() =>
                                !kasusSubmitted &&
                                setKasusAnswers((a) => ({
                                  ...a,
                                  [p.id + "_pilihan"]: i,
                                }))
                              }
                            >
                              <span
                                style={{
                                  fontWeight: 700,
                                  color: accent,
                                  marginRight: 8,
                                }}
                              >
                                {["A", "B", "C", "D"][i]}.
                              </span>
                              {o}
                              {isCorrect && " ✅"}
                              {isWrong && " ❌"}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div>
                        <textarea
                          disabled={kasusSubmitted}
                          style={{
                            ...S.textarea,
                            opacity: kasusSubmitted ? 0.8 : 1,
                          }}
                          placeholder="Tulis jawabanmu di sini..."
                          value={kasusAnswers[p.id] || ""}
                          onChange={(e) =>
                            setKasusAnswers((a) => ({
                              ...a,
                              [p.id]: e.target.value,
                            }))
                          }
                        />
                        {kasusSubmitted && (
                          <div
                            style={{
                              fontSize: 12,
                              color: "#10B981",
                              marginTop: 4,
                            }}
                          >
                            ✅ Jawaban tersimpan
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {!kasusSubmitted ? (
                  <button
                    style={S.btn(activeKasus.warna)}
                    onClick={submitKasus}
                  >
                    Kumpulkan Jawaban 📤
                  </button>
                ) : (
                  <div
                    style={{
                      background: "#10B98120",
                      border: "1px solid #10B981",
                      borderRadius: 12,
                      padding: "1rem",
                      color: "#10B981",
                      fontWeight: 600,
                    }}
                  >
                    ✅ Jawaban berhasil dikumpulkan! Skor:{" "}
                    {prog.studiKasusScore}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── LKPD ─────────────────────────────────────────────── */}
      {page === "lkpd" && (
        <div style={S.section}>
          <h2 style={S.sectionTitle}>📄 LKPD — Lembar Kerja Peserta Didik</h2>
          <p style={{ ...S.sectionSub, marginBottom: 24 }}>
            Kerjakan tugas mandiri berikut untuk mengukur pemahaman materi
          </p>

          {!activeLkpd ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))",
                gap: 18,
              }}
            >
              {lkpdData.map((l) => {
                const saved = (prog.lkpdAnswers || {})[l.id];
                const done = !!saved;
                return (
                  <div
                    key={l.id}
                    style={{ ...S.card, borderTop: `3px solid #10B981` }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 10,
                      }}
                    >
                      <div style={{ fontSize: 36 }}>📄</div>
                      {done && (
                        <span style={{ ...S.badge("#10B981") }}>
                          ✅ Selesai
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 15,
                        color: "#10B981",
                        marginBottom: 8,
                      }}
                    >
                      {l.judul}
                    </div>
                    <div
                      style={{
                        fontSize: 12.5,
                        color: textMuted,
                        lineHeight: 1.6,
                        marginBottom: 6,
                      }}
                    >
                      🎯 {l.tujuan}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: textMuted,
                        marginBottom: 14,
                      }}
                    >
                      {l.soal.length} soal uraian
                    </div>
                    <button
                      style={S.btn("#10B981")}
                      onClick={() => {
                        setActiveLkpd(l);
                        setLkpdAnswers(saved || {});
                        setLkpdSubmitted(!!saved);
                      }}
                    >
                      {done ? "Lihat Jawaban" : "Kerjakan →"}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <button
                style={{ ...S.btnOutline, marginBottom: 20 }}
                onClick={() => {
                  setActiveLkpd(null);
                  setLkpdAnswers({});
                  setLkpdSubmitted(false);
                }}
              >
                ← Kembali
              </button>
              <div style={{ ...S.card, borderTop: "4px solid #10B981" }}>
                <div style={{ marginBottom: 20 }}>
                  <div
                    style={{ fontWeight: 800, fontSize: 18, marginBottom: 6 }}
                  >
                    {activeLkpd.judul}
                  </div>
                  <div
                    style={{
                      background: "#10B98115",
                      borderRadius: 10,
                      padding: "12px 16px",
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#10B981",
                        marginBottom: 4,
                      }}
                    >
                      🎯 Tujuan Pembelajaran
                    </div>
                    <div style={{ fontSize: 13, color: textMuted }}>
                      {activeLkpd.tujuan}
                    </div>
                  </div>
                  <div
                    style={{
                      background: dm ? "#0f172a" : "#f8fafc",
                      borderRadius: 10,
                      padding: "12px 16px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: accent,
                        marginBottom: 4,
                      }}
                    >
                      📌 Petunjuk
                    </div>
                    <div style={{ fontSize: 13, color: textMuted }}>
                      {activeLkpd.petunjuk}
                    </div>
                  </div>
                </div>

                {activeLkpd.soal.map((s, idx) => (
                  <div
                    key={s.id}
                    style={{
                      marginBottom: 24,
                      paddingBottom: 24,
                      borderBottom: `1px solid ${border}`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "flex-start",
                        marginBottom: 10,
                      }}
                    >
                      <span
                        style={{
                          background: "#10B98122",
                          color: "#10B981",
                          width: 26,
                          height: 26,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          fontWeight: 800,
                          flexShrink: 0,
                        }}
                      >
                        {idx + 1}
                      </span>
                      <div>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: 14,
                            marginBottom: 2,
                          }}
                        >
                          {s.teks}
                        </div>
                        <div style={{ fontSize: 11, color: textMuted }}>
                          Poin: {s.poin}
                        </div>
                      </div>
                    </div>
                    <textarea
                      disabled={lkpdSubmitted}
                      style={{
                        ...S.textarea,
                        opacity: lkpdSubmitted ? 0.8 : 1,
                      }}
                      placeholder="Tulis jawabanmu di sini secara lengkap..."
                      value={lkpdAnswers[s.id] || ""}
                      onChange={(e) =>
                        setLkpdAnswers((a) => ({
                          ...a,
                          [s.id]: e.target.value,
                        }))
                      }
                    />
                    {lkpdSubmitted && (
                      <div
                        style={{ fontSize: 12, color: "#10B981", marginTop: 4 }}
                      >
                        ✅ Tersimpan
                      </div>
                    )}
                  </div>
                ))}

                {!lkpdSubmitted ? (
                  <button style={S.btn("#10B981")} onClick={submitLkpd}>
                    Kumpulkan LKPD 📤
                  </button>
                ) : (
                  <div
                    style={{
                      background: "#10B98120",
                      border: "1px solid #10B981",
                      borderRadius: 12,
                      padding: "1rem",
                      color: "#10B981",
                      fontWeight: 600,
                    }}
                  >
                    ✅ LKPD berhasil dikumpulkan! Nilai partisipasi tercatat.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── REFLEKSI ─────────────────────────────────────────── */}
      {page === "refleksi" && (
        <div style={S.section}>
          <h2 style={S.sectionTitle}>💭 Refleksi Pembelajaran</h2>
          <p style={{ ...S.sectionSub, marginBottom: 24 }}>
            Ceritakan pengalaman belajarmu — tidak ada jawaban benar atau salah!
          </p>
          <div style={S.card}>
            {refleksiPertanyaan.map((r, idx) => (
              <div
                key={r.id}
                style={{
                  marginBottom: 24,
                  paddingBottom: 24,
                  borderBottom:
                    idx < refleksiPertanyaan.length - 1
                      ? `1px solid ${border}`
                      : "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                    marginBottom: 10,
                  }}
                >
                  <div style={{ fontSize: 28 }}>{r.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{r.teks}</div>
                </div>
                <textarea
                  disabled={refleksiSubmitted}
                  style={{
                    ...S.textarea,
                    opacity: refleksiSubmitted ? 0.85 : 1,
                  }}
                  placeholder="Tulis refleksimu di sini..."
                  value={refleksiAnswers[r.id] || ""}
                  onChange={(e) =>
                    setRefleksiAnswers((a) => ({
                      ...a,
                      [r.id]: e.target.value,
                    }))
                  }
                />
              </div>
            ))}
            {!refleksiSubmitted ? (
              <button style={S.btn()} onClick={submitRefleksi}>
                Simpan Refleksi 💾
              </button>
            ) : (
              <div
                style={{
                  background: "#10B98120",
                  border: "1px solid #10B981",
                  borderRadius: 12,
                  padding: "1rem",
                  color: "#10B981",
                  fontWeight: 600,
                }}
              >
                ✅ Refleksi berhasil disimpan! Terima kasih sudah berbagi.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── NILAI ────────────────────────────────────────────── */}
      {page === "nilai" && (
        <div style={S.section}>
          <h2 style={S.sectionTitle}>🏆 Nilai & Predikat</h2>
          <p style={{ ...S.sectionSub, marginBottom: 24 }}>
            Rekap hasil belajar {session.name}
          </p>

          {nilaiAkhir ? (
            <>
              <div
                style={{
                  ...S.card,
                  textAlign: "center",
                  marginBottom: 24,
                  background: dm
                    ? "linear-gradient(135deg,#1e293b,#0f172a)"
                    : "linear-gradient(135deg,#eff6ff,#dbeafe)",
                }}
              >
                <div style={{ fontSize: 64, marginBottom: 8 }}>
                  {nilaiAkhir.nilai >= 90
                    ? "🏆"
                    : nilaiAkhir.nilai >= 80
                      ? "🥇"
                      : nilaiAkhir.nilai >= 70
                        ? "🥈"
                        : "📚"}
                </div>
                <div
                  style={{
                    fontSize: 56,
                    fontWeight: 900,
                    color: getPredikat(nilaiAkhir.nilai).c,
                  }}
                >
                  {nilaiAkhir.nilai}
                </div>
                <div
                  style={{ fontSize: 14, color: textMuted, marginBottom: 8 }}
                >
                  Nilai Akhir / 100
                </div>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: getPredikat(nilaiAkhir.nilai).c,
                    marginBottom: 4,
                  }}
                >
                  Predikat {getPredikat(nilaiAkhir.nilai).p}
                </div>
                <div style={{ color: textMuted }}>
                  {getPredikat(nilaiAkhir.nilai).label}
                </div>
              </div>

              <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 14 }}>
                Rincian Komponen Nilai
              </h3>
              <div style={{ display: "grid", gap: 12, marginBottom: 24 }}>
                {[
                  {
                    label: "Latihan Soal",
                    key: "latihanScore",
                    bobot: BOBOT.latihan,
                    max: quizLatihan.length * 10,
                    icon: "✏️",
                    c: "#3B82F6",
                  },
                  {
                    label: "Evaluasi Akhir",
                    key: "evaluasiScore",
                    bobot: BOBOT.evaluasi,
                    max: quizEvaluasi.length * 10,
                    icon: "📋",
                    c: "#8B5CF6",
                  },
                  {
                    label: "LKPD",
                    key: "lkpdScore",
                    bobot: BOBOT.lkpd,
                    max: 100,
                    icon: "📄",
                    c: "#10B981",
                  },
                  {
                    label: "Studi Kasus",
                    key: "studiKasusScore",
                    bobot: BOBOT.studiKasus,
                    max: 100,
                    icon: "🔍",
                    c: "#F59E0B",
                  },
                ].map((k) => {
                  const raw = prog[k.key];
                  const nilai =
                    raw != null ? Math.round((raw / k.max) * 100) : null;
                  return (
                    <div
                      key={k.key}
                      style={{
                        ...S.card,
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                      }}
                    >
                      <div style={{ fontSize: 28, flexShrink: 0 }}>
                        {k.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 6,
                          }}
                        >
                          <span style={{ fontWeight: 700, fontSize: 13 }}>
                            {k.label}
                          </span>
                          <span style={{ fontSize: 12, color: textMuted }}>
                            Bobot {Math.round(k.bobot * 100)}%
                          </span>
                        </div>
                        <div style={S.progress}>
                          <div style={S.progressFill(nilai || 0, k.c)} />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: 4,
                          }}
                        >
                          <span style={{ fontSize: 12, color: textMuted }}>
                            {raw != null
                              ? `${raw} / ${k.max}`
                              : "Belum dikerjakan"}
                          </span>
                          <span
                            style={{
                              fontSize: 12,
                              fontWeight: 700,
                              color: k.c,
                            }}
                          >
                            {nilai != null ? `${nilai}/100` : "—"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                style={{ ...S.card, background: dm ? "#0f172a" : "#f8fafc" }}
              >
                <div
                  style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}
                >
                  📊 Rumus Nilai Akhir
                </div>
                <div style={{ fontSize: 13, color: textMuted, lineHeight: 2 }}>
                  Nilai Akhir = (Latihan × 20%) + (Evaluasi × 40%) + (LKPD ×
                  25%) + (Studi Kasus × 15%)
                </div>
              </div>
            </>
          ) : (
            <div style={{ ...S.card, textAlign: "center", padding: "3rem" }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>📭</div>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>
                Belum Ada Nilai
              </div>
              <div style={{ color: textMuted, marginBottom: 24 }}>
                Kerjakan latihan, evaluasi, LKPD, dan studi kasus untuk melihat
                nilai akhirmu
              </div>
              <button style={S.btn()} onClick={() => go("latihan")}>
                Mulai dari Latihan →
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── DASHBOARD GURU ───────────────────────────────────── */}
      {page === "dashboard" && session.role === "guru" && (
        <div style={S.section}>
          <h2 style={S.sectionTitle}>📊 Dashboard Guru</h2>
          <p style={{ ...S.sectionSub, marginBottom: 24 }}>
            Pantau perkembangan seluruh siswa
          </p>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 13,
              }}
            >
              <thead>
                <tr style={{ background: dm ? "#0f172a" : "#f1f5f9" }}>
                  {[
                    "Siswa",
                    "Latihan",
                    "Evaluasi",
                    "LKPD",
                    "Studi Kasus",
                    "Nilai Akhir",
                    "Predikat",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "10px 14px",
                        textAlign: "left",
                        fontWeight: 700,
                        color: textMuted,
                        borderBottom: `2px solid ${border}`,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loadUsers()
                  .filter((u) => u.role === "siswa")
                  .map((u) => {
                    const p = loadAllProgress()[u.username] || {};
                    const na = hitungNilaiAkhir(p);
                    const nilaiL =
                      p.latihanScore != null
                        ? Math.round(
                            (p.latihanScore / (quizLatihan.length * 10)) * 100,
                          )
                        : null;
                    const nilaiE =
                      p.evaluasiScore != null
                        ? Math.round(
                            (p.evaluasiScore / (quizEvaluasi.length * 10)) *
                              100,
                          )
                        : null;
                    return (
                      <tr
                        key={u.username}
                        style={{ borderBottom: `1px solid ${border}` }}
                      >
                        <td style={{ padding: "10px 14px", fontWeight: 600 }}>
                          {u.name}
                        </td>
                        <td
                          style={{
                            padding: "10px 14px",
                            color: nilaiL != null ? "#3B82F6" : "#94a3b8",
                          }}
                        >
                          {nilaiL != null ? nilaiL : "—"}
                        </td>
                        <td
                          style={{
                            padding: "10px 14px",
                            color: nilaiE != null ? "#8B5CF6" : "#94a3b8",
                          }}
                        >
                          {nilaiE != null ? nilaiE : "—"}
                        </td>
                        <td
                          style={{
                            padding: "10px 14px",
                            color: p.lkpdScore != null ? "#10B981" : "#94a3b8",
                          }}
                        >
                          {p.lkpdScore != null ? p.lkpdScore : "—"}
                        </td>
                        <td
                          style={{
                            padding: "10px 14px",
                            color:
                              p.studiKasusScore != null ? "#F59E0B" : "#94a3b8",
                          }}
                        >
                          {p.studiKasusScore != null ? p.studiKasusScore : "—"}
                        </td>
                        <td
                          style={{
                            padding: "10px 14px",
                            fontWeight: 800,
                            fontSize: 16,
                            color: na ? getPredikat(na.nilai).c : "#94a3b8",
                          }}
                        >
                          {na ? na.nilai : "—"}
                        </td>
                        <td style={{ padding: "10px 14px" }}>
                          {na ? (
                            <span
                              style={{ ...S.badge(getPredikat(na.nilai).c) }}
                            >
                              {getPredikat(na.nilai).p} —{" "}
                              {getPredikat(na.nilai).label}
                            </span>
                          ) : (
                            <span style={{ color: "#94a3b8" }}>—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── MODAL DETAIL HARDWARE ────────────────────────────── */}
      {selectedHW && (
        <div
          style={S.modal}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedHW(null);
          }}
        >
          <div style={S.modalBox}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 20,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ fontSize: 44 }}>{selectedHW.icon}</div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 700 }}>
                    {selectedHW.name}
                  </div>
                  <span style={{ ...S.badge(selectedHW.color) }}>
                    {selectedHW.category}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedHW(null)}
                style={{
                  background: dm ? "#334155" : "#f1f5f9",
                  border: "none",
                  borderRadius: 8,
                  padding: "6px 14px",
                  cursor: "pointer",
                  color: text,
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                ✕ Tutup
              </button>
            </div>
            <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
              {selectedHW.videoId && (
                <div style={{ flexShrink: 0 }}>
                  <div
                    style={{
                      width: 200,
                      borderRadius: 14,
                      overflow: "hidden",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
                      background: "#000",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        zIndex: 2,
                        background: "#ef4444",
                        color: "#fff",
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: 99,
                      }}
                    >
                      ▶ VIDEO
                    </div>
                    <iframe
                      width="200"
                      height="356"
                      src={``}
                      title={`Video ${selectedHW.name}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ display: "block" }}
                    />
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: 6,
                      fontSize: 11,
                      color: textMuted,
                    }}
                  >
                    Tonton penjelasan video
                  </div>
                </div>
              )}
              <div style={{ flex: 1, minWidth: 240 }}>
                <p
                  style={{
                    color: textMuted,
                    lineHeight: 1.75,
                    marginBottom: 18,
                    fontSize: 14,
                  }}
                >
                  {selectedHW.fullDesc}
                </p>
                <div
                  style={{
                    background: dm ? "#0f172a" : "#f8fafc",
                    borderRadius: 12,
                    padding: "1rem",
                    marginBottom: 18,
                  }}
                >
                  <div
                    style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}
                  >
                    📋 Spesifikasi Umum
                  </div>
                  {selectedHW.specs.map((s, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize: 13,
                        color: textMuted,
                        marginBottom: 4,
                      }}
                    >
                      • {s}
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: 16 }}>
                  <div
                    style={{ fontWeight: 700, fontSize: 13, marginBottom: 6 }}
                  >
                    ⚙️ Cara Kerja
                  </div>
                  <p
                    style={{ color: textMuted, fontSize: 13, lineHeight: 1.7 }}
                  >
                    {selectedHW.cara_kerja}
                  </p>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      background: "#10b98111",
                      borderRadius: 12,
                      padding: "1rem",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 12,
                        color: "#10b981",
                        marginBottom: 6,
                      }}
                    >
                      ✅ Kelebihan
                    </div>
                    {selectedHW.kelebihan.map((k, i) => (
                      <div
                        key={i}
                        style={{
                          fontSize: 12,
                          color: textMuted,
                          marginBottom: 3,
                        }}
                      >
                        • {k}
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      background: "#ef444411",
                      borderRadius: 12,
                      padding: "1rem",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 12,
                        color: "#ef4444",
                        marginBottom: 6,
                      }}
                    >
                      ⚠️ Kekurangan
                    </div>
                    {selectedHW.kekurangan.map((k, i) => (
                      <div
                        key={i}
                        style={{
                          fontSize: 12,
                          color: textMuted,
                          marginBottom: 3,
                        }}
                      >
                        • {k}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer
        style={{
          background: dm ? "#0a1628" : "#1e293b",
          color: "#94a3b8",
          textAlign: "center",
          padding: "1.5rem 1.5rem",
          marginTop: "3rem",
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: 15,
            color: "#e2e8f0",
            marginBottom: 4,
          }}
        >
          <img src={logoImg} alt="" style={{ width: 24, height: 24, objectFit: "contain", verticalAlign: "middle", marginRight: 6 }} />
HardwareEdu
        </div>
        <p style={{ fontSize: 12, marginBottom: 8 }}>
          Platform edukasi hardware kelompok 1
        </p>
        <p style={{ fontSize: 11, color: "#475569" }}>© 2025 HardwareEdu</p>
      </footer>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// LOGIN PAGE
// ═══════════════════════════════════════════════════════════════
function LoginPage({ onLogin, dm, S }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = () => {
    const users = loadUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password,
    );
    if (user) {
      onLogin({ username: user.username, name: user.name, role: user.role });
    } else {
      setError("Username atau password salah!");
    }
  };

  const bg = dm ? "#0f172a" : "#f8fafc";
  const card = dm ? "#1e293b" : "#ffffff";
  const text = dm ? "#e2e8f0" : "#1e293b";
  const textMuted = dm ? "#94a3b8" : "#64748b";
  const border = dm ? "#334155" : "#e2e8f0";
  const accent = "#3B82F6";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: dm
          ? "linear-gradient(135deg,#0f172a,#1e293b)"
          : "linear-gradient(135deg,#eff6ff,#dbeafe)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        style={{
          background: card,
          borderRadius: 24,
          padding: "2.5rem 2rem",
          maxWidth: 400,
          width: "100%",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <img src={logoImg} alt="HardwareEdu" style={{ width: 80, height: 80, objectFit: "contain", marginBottom: 10 }} />
          <div
            style={{
              fontWeight: 800,
              fontSize: 24,
              color: text,
              marginBottom: 6,
            }}
          >
            HardwareEdu
          </div>
          <div style={{ color: textMuted, fontSize: 14 }}>
            Platform Edukasi Hardware Komputer
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: textMuted,
              display: "block",
              marginBottom: 6,
            }}
          >
            Username
          </label>
          <input
            style={{
              background: dm ? "#0f172a" : "#f8fafc",
              border: `1px solid ${border}`,
              borderRadius: 10,
              padding: "11px 14px",
              color: text,
              fontSize: 14,
              width: "100%",
              boxSizing: "border-box",
              outline: "none",
            }}
            placeholder="Masukkan username..."
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: textMuted,
              display: "block",
              marginBottom: 6,
            }}
          >
            Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPass ? "text" : "password"}
              style={{
                background: dm ? "#0f172a" : "#f8fafc",
                border: `1px solid ${border}`,
                borderRadius: 10,
                padding: "11px 44px 11px 14px",
                color: text,
                fontSize: 14,
                width: "100%",
                boxSizing: "border-box",
                outline: "none",
              }}
              placeholder="Masukkan password..."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <button
              onClick={() => setShowPass((s) => !s)}
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 16,
                color: textMuted,
              }}
            >
              {showPass ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {error && (
          <div
            style={{
              background: "#ef444420",
              border: "1px solid #ef4444",
              borderRadius: 10,
              padding: "10px 14px",
              color: "#ef4444",
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          style={{
            background: accent,
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: "13px",
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
            width: "100%",
            boxShadow: "0 4px 14px rgba(59,130,246,0.3)",
            marginBottom: 20,
          }}
        >
          Masuk →
        </button>

        {/* <div
          style={{
            background: dm ? "#0f172a" : "#f1f5f9",
            borderRadius: 12,
            padding: "1rem",
            fontSize: 12,
          }}
        >
          <div style={{ fontWeight: 700, color: textMuted, marginBottom: 8 }}>
            👤 Akun Demo:
          </div>
          <div style={{ display: "grid", gap: 4 }}>
            {[
              { u: "guru", p: "guru123", r: "🎓 Guru" },
              { u: "siswa1", p: "siswa123", r: "📚 Siswa" },
              { u: "siswa2", p: "siswa123", r: "📚 Siswa" },
            ].map((a) => (
              <div
                key={a.u}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: textMuted,
                }}
              >
                <span>
                  {a.r}: <strong>{a.u}</strong>
                </span>
                <span>
                  pass: <strong>{a.p}</strong>
                </span>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// QUIZ PAGE (shared for latihan & evaluasi)
// ═══════════════════════════════════════════════════════════════
function QuizPage({
  title,
  subtitle,
  quizData,
  quizMode,
  setQuizMode,
  quizIdx,
  quizScore,
  quizAnswered,
  quizDone,
  selectedAnswer,
  handleAnswer,
  nextQ,
  getAnswerState,
  resetQuiz,
  modeKey,
  prog,
  session,
  S,
  dm,
  accent,
  text,
  textMuted,
  border,
  card,
}) {
  const prevScore =
    prog[modeKey === "latihan" ? "latihanScore" : "evaluasiScore"];
  const maxPoin = quizData.reduce((s, q) => s + q.poin, 0);

  if (!quizMode) {
    return (
      <div style={S.section}>
        <h2 style={S.sectionTitle}>{title}</h2>
        <p style={{ ...S.sectionSub, marginBottom: 24 }}>{subtitle}</p>
        <div
          style={{
            ...S.card,
            maxWidth: 560,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 60, marginBottom: 14 }}>🎯</div>
          <h3
            style={{
              fontWeight: 700,
              fontSize: 20,
              marginBottom: 8,
              color: text,
            }}
          >
            {modeKey === "evaluasi" ? "Evaluasi Akhir" : "Latihan Soal"}
          </h3>
          <p style={{ color: textMuted, marginBottom: 20, fontSize: 14 }}>
            {quizData.length} soal pilihan ganda.{" "}
            {modeKey === "evaluasi"
              ? "Hasil masuk ke nilai akhir!"
              : "Boleh diulang kapan saja."}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 12,
              marginBottom: 24,
            }}
          >
            {[
              { icon: "❓", val: quizData.length, label: "Soal" },
              { icon: "🎯", val: maxPoin, label: "Poin Maks" },
              {
                icon: "📈",
                val: prevScore != null ? prevScore : "—",
                label: "Skor Terakhir",
              },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: dm ? "#0f172a" : "#f8fafc",
                  borderRadius: 12,
                  padding: "1rem",
                }}
              >
                <div style={{ fontSize: 22 }}>{s.icon}</div>
                <div style={{ fontWeight: 800, fontSize: 18, color: accent }}>
                  {s.val}
                </div>
                <div style={{ fontSize: 11, color: textMuted }}>{s.label}</div>
              </div>
            ))}
          </div>
          <button style={S.btn()} onClick={resetQuiz}>
            Mulai {modeKey === "evaluasi" ? "Evaluasi" : "Latihan"} 🚀
          </button>
        </div>
      </div>
    );
  }

  if (quizDone) {
    const pct = Math.round((quizScore / maxPoin) * 100);
    const { p, label, c } = getPredikat(pct);
    return (
      <div style={S.section}>
        <div
          style={{
            ...S.card,
            maxWidth: 560,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 60, marginBottom: 14 }}>
            {pct >= 90 ? "🏆" : pct >= 70 ? "👍" : "📚"}
          </div>
          <h3
            style={{
              fontWeight: 800,
              fontSize: 22,
              marginBottom: 8,
              color: text,
            }}
          >
            Selesai!
          </h3>
          <div style={{ fontSize: 52, fontWeight: 900, color: c }}>{pct}</div>
          <div style={{ fontSize: 13, color: textMuted, marginBottom: 8 }}>
            Skor: {quizScore} / {maxPoin}
          </div>
          <div
            style={{ fontSize: 24, fontWeight: 800, color: c, marginBottom: 4 }}
          >
            Predikat {p}
          </div>
          <div style={{ color: textMuted, marginBottom: 24, fontSize: 14 }}>
            {label}
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button style={{ ...S.btn(), flex: 1 }} onClick={resetQuiz}>
              Ulangi
            </button>
          </div>
        </div>
      </div>
    );
  }

  const current = quizData[quizIdx];
  return (
    <div style={S.section}>
      <h2 style={S.sectionTitle}>{title}</h2>
      <div style={{ ...S.card, maxWidth: 600, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <span style={{ fontSize: 13, color: textMuted, fontWeight: 600 }}>
            Soal {quizIdx + 1} / {quizData.length}
          </span>
          <span
            style={{
              background: accent + "22",
              color: accent,
              fontSize: 13,
              padding: "3px 12px",
              borderRadius: 20,
              fontWeight: 600,
            }}
          >
            Skor: {quizScore}
          </span>
        </div>
        <div
          style={{
            background: dm ? "#334155" : "#e2e8f0",
            borderRadius: 99,
            height: 6,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              background: accent,
              width: ((quizIdx + 1) / quizData.length) * 100 + "%",
              height: "100%",
              borderRadius: 99,
              transition: "width 0.4s",
            }}
          />
        </div>
        <h3
          style={{
            fontSize: 16,
            fontWeight: 600,
            marginBottom: 16,
            lineHeight: 1.55,
          }}
        >
          {current.q}
        </h3>
        {current.options.map((opt, i) => {
          const state = getAnswerState(i);
          return (
            <button
              key={i}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "11px 15px",
                borderRadius: 10,
                marginBottom: 8,
                cursor: quizAnswered != null ? "default" : "pointer",
                border: `2px solid ${state === "correct" ? "#10b981" : state === "wrong" ? "#ef4444" : border}`,
                background:
                  state === "correct"
                    ? "#10b98122"
                    : state === "wrong"
                      ? "#ef444422"
                      : dm
                        ? "#0f172a"
                        : "#f8fafc",
                color: text,
                fontSize: 14,
                transition: "all 0.2s",
                fontFamily: "inherit",
              }}
              onClick={() => handleAnswer(i)}
            >
              <span style={{ fontWeight: 700, color: accent, marginRight: 8 }}>
                {["A", "B", "C", "D"][i]}.
              </span>
              {opt}
              {quizAnswered != null && i === current.answer && (
                <span style={{ marginLeft: 8 }}>✅</span>
              )}
              {quizAnswered != null &&
                i === selectedAnswer &&
                i !== current.answer && (
                  <span style={{ marginLeft: 8 }}>❌</span>
                )}
            </button>
          );
        })}
        {quizAnswered != null && (
          <>
            <div
              style={{
                marginTop: 14,
                padding: "11px 15px",
                background:
                  (selectedAnswer === current.answer ? "#10b981" : "#ef4444") +
                  "22",
                borderRadius: 10,
                color:
                  selectedAnswer === current.answer ? "#10b981" : "#ef4444",
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              {selectedAnswer === current.answer
                ? "🎉 Benar!"
                : `❌ Jawaban benar: ${current.options[current.answer]}`}
            </div>
            <button
              style={{ ...S.btn(), marginTop: 14, width: "100%" }}
              onClick={nextQ}
            >
              {quizIdx + 1 >= quizData.length
                ? "Lihat Hasil 🏁"
                : "Soal Berikutnya →"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
