import { useState, useEffect, useRef } from "react";

const hardwareData = [
    {
        id: 1,
        name: "Motherboard",
        category: "Processing Device",
        icon: "🖥️",
        shortDesc: "Papan sirkuit utama yang menghubungkan semua komponen komputer.",
        fullDesc: "Motherboard adalah komponen utama yang menjadi 'tulang punggung' komputer. Semua komponen lainnya terhubung melalui motherboard, termasuk CPU, RAM, kartu grafis, dan perangkat penyimpanan.",
        specs: ["Socket CPU: LGA1700, AM5", "Slot RAM: DDR4/DDR5", "PCIe 4.0/5.0 slots", "Form factor: ATX, mATX, ITX"],
        cara_kerja: "Motherboard berfungsi sebagai bus komunikasi utama. Setiap sinyal data yang mengalir antara komponen melewati jalur sirkuit (traces) yang terukir di papan PCB berlapis-lapis.",
        kelebihan: ["Menghubungkan semua komponen", "Mendukung upgrade komponen", "Dilengkapi port I/O lengkap"],
        kekurangan: ["Harga tinggi untuk kelas premium", "Kerusakan menyebabkan seluruh sistem mati", "Kompatibilitas terbatas per generasi"],
        color: "#3B82F6"
    },
    {
        id: 2,
        name: "Processor (CPU)",
        category: "Processing Device",
        icon: "⚡",
        shortDesc: "Otak komputer yang menjalankan semua kalkulasi dan instruksi.",
        fullDesc: "CPU (Central Processing Unit) adalah komponen terpenting dalam komputer. CPU memproses semua instruksi dari program yang berjalan, melakukan perhitungan matematika, dan mengkoordinasikan seluruh operasi sistem.",
        specs: ["Core: 4–24 core", "Clock speed: 3.0–5.8 GHz", "Cache: L1/L2/L3", "TDP: 65W–253W"],
        cara_kerja: "CPU mengambil instruksi dari memori (fetch), mendekodenya (decode), menjalankannya di ALU (execute), lalu menyimpan hasilnya (write-back). Siklus ini berulang miliaran kali per detik.",
        kelebihan: ["Performa tinggi untuk multitasking", "Mendukung beban kerja berat", "Teknologi terus berkembang"],
        kekurangan: ["Menghasilkan panas tinggi", "Harga flagship sangat mahal", "Konsumsi daya besar"],
        color: "#8B5CF6"
    },
    {
        id: 3,
        name: "RAM",
        category: "Processing Device",
        icon: "🧠",
        shortDesc: "Memori sementara untuk menyimpan data yang sedang diproses.",
        fullDesc: "RAM (Random Access Memory) adalah memori volatil yang digunakan untuk menyimpan data dan instruksi yang sedang aktif digunakan oleh CPU. Semakin besar RAM, semakin banyak program yang dapat berjalan sekaligus.",
        specs: ["Kapasitas: 8GB–128GB", "Tipe: DDR4 / DDR5", "Kecepatan: 3200–7200 MHz", "Latensi: CL16–CL36"],
        cara_kerja: "RAM menyimpan data dalam sel kapasitor yang dapat dibaca dan ditulis secara acak dalam hitungan nanosecond. Data hilang saat listrik dimatikan karena sifatnya yang volatil.",
        kelebihan: ["Akses data sangat cepat", "Mendukung multitasking", "Mudah di-upgrade"],
        kekurangan: ["Data hilang saat mati listrik", "Kapasitas terbatas vs storage", "Harga per GB lebih mahal dari HDD"],
        color: "#10B981"
    },
    {
        id: 4,
        name: "Hard Disk (HDD)",
        category: "Storage Device",
        icon: "💿",
        shortDesc: "Penyimpanan permanen berbasis piringan magnetis berkapasitas besar.",
        fullDesc: "HDD (Hard Disk Drive) menggunakan piringan magnetis yang berputar untuk menyimpan data secara permanen. HDD menawarkan kapasitas besar dengan harga terjangkau, cocok untuk penyimpanan arsip dan data besar.",
        specs: ["Kapasitas: 500GB–20TB", "RPM: 5400–7200 RPM", "Interface: SATA III", "Cache: 64MB–256MB"],
        cara_kerja: "Head baca/tulis bergerak di atas piringan yang berputar cepat. Data dikodekan sebagai pola magnetis pada permukaan piringan, yang dapat dibaca kembali oleh sensor magnetis.",
        kelebihan: ["Kapasitas sangat besar", "Harga per GB sangat murah", "Umur panjang jika dirawat"],
        kekurangan: ["Lambat dibanding SSD", "Rentan benturan fisik", "Suara berisik, konsumsi daya tinggi"],
        color: "#F59E0B"
    },
    {
        id: 5,
        name: "SSD",
        category: "Storage Device",
        icon: "⚡",
        shortDesc: "Penyimpanan cepat berbasis chip flash tanpa komponen bergerak.",
        fullDesc: "SSD (Solid State Drive) menggunakan chip NAND flash untuk menyimpan data tanpa komponen mekanis bergerak. SSD jauh lebih cepat dari HDD dan tahan terhadap guncangan fisik.",
        specs: ["Kapasitas: 256GB–4TB", "Read: 550MB/s (SATA) – 7000MB/s (NVMe)", "Interface: SATA / M.2 NVMe", "NAND: TLC / QLC / MLC"],
        cara_kerja: "SSD menyimpan data dalam sel transistor floating-gate yang dapat menahan muatan listrik tanpa daya. Controller mengelola operasi baca/tulis dan wear-leveling untuk memperpanjang umur chip.",
        kelebihan: ["Kecepatan sangat tinggi", "Tidak ada komponen bergerak", "Konsumsi daya rendah, senyap"],
        kekurangan: ["Harga per GB lebih mahal dari HDD", "Kapasitas lebih terbatas", "Degradasi performa jika hampir penuh"],
        color: "#06B6D4"
    },
    {
        id: 6,
        name: "VGA / GPU",
        category: "Processing Device",
        icon: "🎮",
        shortDesc: "Kartu grafis untuk memproses dan menampilkan gambar beresolusi tinggi.",
        fullDesc: "GPU (Graphics Processing Unit) dirancang khusus untuk memproses data grafis secara paralel. GPU modern memiliki ribuan core kecil yang dapat menangani rendering 3D, video, dan komputasi AI secara bersamaan.",
        specs: ["VRAM: 4GB–24GB GDDR6/X", "Core: 2000–18000+ CUDA cores", "TDP: 100W–450W", "Interface: PCIe x16"],
        cara_kerja: "GPU memecah tugas rendering menjadi ribuan operasi paralel kecil. Setiap pixel pada layar dihitung secara bersamaan oleh core GPU, menghasilkan frame rate tinggi dalam game dan aplikasi grafis.",
        kelebihan: ["Performa grafis luar biasa", "Mendukung AI dan komputasi ilmiah", "Mendukung multi-monitor"],
        kekurangan: ["Harga sangat mahal", "Konsumsi daya tinggi", "Menghasilkan panas besar"],
        color: "#EF4444"
    },
    {
        id: 7,
        name: "Power Supply (PSU)",
        category: "Processing Device",
        icon: "🔌",
        shortDesc: "Mengubah arus listrik AC menjadi DC untuk memberi daya seluruh komponen.",
        fullDesc: "PSU (Power Supply Unit) mengkonversi tegangan AC dari stopkontak menjadi tegangan DC yang dibutuhkan komponen komputer. PSU berkualitas melindungi komponen dari lonjakan daya.",
        specs: ["Watt: 450W–1600W", "Rating: 80+ Bronze/Gold/Platinum", "Modular / Non-modular", "Rail: +12V, +5V, +3.3V"],
        cara_kerja: "PSU menggunakan transformator dan rangkaian rectifier untuk mengkonversi AC 220V menjadi DC +12V, +5V, dan +3.3V. Regulator tegangan memastikan output stabil meski beban berubah.",
        kelebihan: ["Melindungi komponen dari tegangan tidak stabil", "Efisiensi tinggi (80+ rated)", "Modular memudahkan manajemen kabel"],
        kekurangan: ["PSU murah dapat merusak komponen", "Harus dipilih sesuai kebutuhan watt", "Berat dan memakan tempat"],
        color: "#F97316"
    },
    {
        id: 8,
        name: "Cooling Fan",
        category: "Processing Device",
        icon: "🌀",
        shortDesc: "Sistem pendingin untuk menjaga suhu komponen tetap optimal.",
        fullDesc: "Cooling system menjaga suhu komponen seperti CPU dan GPU tetap dalam batas aman. Tersedia dalam bentuk air cooler (kipas + heatsink) atau liquid cooler (radiator + pompa air).",
        specs: ["Tipe: Air Cooler / AIO Liquid", "Fan: 120mm–360mm radiator", "TDP support: hingga 280W+", "Noise: 15–40 dBA"],
        cara_kerja: "Panas dari CPU diserap oleh heatpipe yang mengandung cairan menguap. Uap berpindah ke heatsink dan didinginkan oleh kipas. Pada liquid cooler, pompa mengalirkan coolant ke radiator.",
        kelebihan: ["Mencegah thermal throttling", "Memperpanjang umur komponen", "Liquid cooler lebih senyap dan efektif"],
        kekurangan: ["AIO liquid cooler mahal", "Kipas bisa berisik saat load tinggi", "Liquid cooler berisiko bocor"],
        color: "#06B6D4"
    },
    {
        id: 9,
        name: "Casing",
        category: "Processing Device",
        icon: "🏠",
        shortDesc: "Wadah pelindung yang menampung dan melindungi semua komponen internal.",
        fullDesc: "Casing komputer adalah struktur fisik yang menampung dan melindungi semua komponen internal. Casing juga berperan dalam manajemen udara (airflow) dan estetika sistem.",
        specs: ["Form factor: ATX / mATX / ITX", "Material: Steel, Aluminium, Tempered Glass", "Drive bays: 2.5\" / 3.5\"", "Fan support: 120mm–140mm"],
        cara_kerja: "Casing menyediakan struktur mounting untuk motherboard, drive, dan PSU. Panel samping tempered glass memungkinkan penglihatan komponen. Mesh panel meningkatkan airflow masuk dan keluar.",
        kelebihan: ["Melindungi komponen dari debu dan benturan", "Memfasilitasi manajemen kabel", "Pilihan estetika beragam"],
        kekurangan: ["Casing besar memakan tempat", "Harga kasing premium tinggi", "Airflow buruk jika desain kurang baik"],
        color: "#6B7280"
    },
    {
        id: 10,
        name: "Monitor",
        category: "Output Device",
        icon: "🖥️",
        shortDesc: "Layar output untuk menampilkan visual dari komputer.",
        fullDesc: "Monitor adalah perangkat output utama yang menampilkan informasi visual dari komputer. Monitor modern hadir dengan teknologi IPS, VA, atau OLED dengan refresh rate tinggi untuk gaming dan kreasi konten.",
        specs: ["Resolusi: FHD/QHD/4K/8K", "Refresh rate: 60Hz–360Hz", "Panel: IPS / VA / OLED", "Response time: 1–5ms"],
        cara_kerja: "Monitor LCD menggunakan backlight LED yang memancar melalui lapisan liquid crystal. Tiap piksel terdiri dari sub-piksel merah, hijau, biru yang dikontrol secara individual untuk menghasilkan jutaan warna.",
        kelebihan: ["Output visual berkualitas tinggi", "Resolusi dan warna akurat (IPS)", "Refresh rate tinggi untuk gaming"],
        kekurangan: ["OLED rentan burn-in", "Monitor 4K butuh GPU kuat", "Konsumsi daya tinggi pada ukuran besar"],
        color: "#8B5CF6"
    },
    {
        id: 11,
        name: "Keyboard",
        category: "Input Device",
        icon: "⌨️",
        shortDesc: "Perangkat input untuk mengetik teks dan memberikan perintah.",
        fullDesc: "Keyboard adalah perangkat input primer untuk memasukkan teks dan perintah. Tersedia dalam jenis membrane (murah, senyap) dan mechanical (taktil, tahan lama) dengan berbagai switch untuk preferensi berbeda.",
        specs: ["Tipe: Membrane / Mechanical", "Layout: Full / TKL / 60%", "Switch: Linear / Tactile / Clicky", "Koneksi: USB / Wireless BT"],
        cara_kerja: "Setiap tombol memiliki switch yang mendeteksi penekanan dan mengirim sinyal listrik ke controller keyboard. Controller menerjemahkan sinyal menjadi keycode yang dikirim ke komputer via USB atau wireless.",
        kelebihan: ["Input teks cepat dan akurat", "Mechanical keyboard tahan lama", "Banyak pilihan sesuai kebutuhan"],
        kekurangan: ["Mechanical keyboard berisik", "Keyboard wireless butuh baterai", "Ergonomi buruk jika digunakan lama"],
        color: "#10B981"
    },
    {
        id: 12,
        name: "Mouse",
        category: "Input Device",
        icon: "🖱️",
        shortDesc: "Perangkat penunjuk untuk navigasi dan interaksi dengan antarmuka grafis.",
        fullDesc: "Mouse adalah perangkat input yang mengendalikan kursor di layar. Mouse modern menggunakan sensor optik atau laser dengan DPI tinggi untuk presisi maksimal dalam gaming dan desain grafis.",
        specs: ["Sensor: Optik / Laser", "DPI: 400–25.600 DPI", "Polling rate: 125–8000 Hz", "Tombol: 2–11 tombol"],
        cara_kerja: "Sensor optik mouse memancarkan cahaya LED ke permukaan dan kamera mikro memotret ribuan frame per detik. Prosesor mouse mendeteksi pergerakan relatif antar frame dan menerjemahkannya menjadi gerakan kursor.",
        kelebihan: ["Navigasi GUI yang intuitif", "DPI tinggi untuk presisi gaming/desain", "Wireless modern latensi sangat rendah"],
        kekurangan: ["Butuh permukaan datar/mousepad", "Wireless butuh baterai/charging", "Tidak ergonomis untuk tangan kiri (tipe standar)"],
        color: "#F59E0B"
    }
];

const quizData = [
    { q: "Komponen apa yang disebut 'otak' komputer?", options: ["RAM", "Motherboard", "CPU", "SSD"], answer: 2 },
    { q: "Apa kepanjangan dari RAM?", options: ["Read Access Memory", "Random Access Memory", "Rapid Access Module", "Random Active Memory"], answer: 1 },
    { q: "Perangkat mana yang termasuk Input Device?", options: ["Monitor", "Speaker", "Keyboard", "Printer"], answer: 2 },
    { q: "SSD lebih cepat dari HDD karena...", options: ["Kapasitas lebih besar", "Tidak ada komponen bergerak", "Lebih murah", "Menggunakan magnet"], answer: 1 },
    { q: "Fungsi utama Power Supply adalah...", options: ["Menyimpan data", "Mengubah AC ke DC", "Memproses grafis", "Mendinginkan CPU"], answer: 1 },
    { q: "GPU singkatan dari...", options: ["General Processing Unit", "Graphics Power Unit", "Graphics Processing Unit", "Global Pixel Unit"], answer: 2 },
    { q: "Monitor termasuk kategori perangkat apa?", options: ["Input Device", "Storage Device", "Processing Device", "Output Device"], answer: 3 },
    { q: "Komponen mana yang kehilangan data saat listrik mati?", options: ["HDD", "SSD", "RAM", "ROM"], answer: 2 }
];

const categories = ["Semua", "Input Device", "Output Device", "Processing Device", "Storage Device"];

export default function App() {
    const [page, setPage] = useState("home");
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("Semua");
    const [selectedHW, setSelectedHW] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [quizActive, setQuizActive] = useState(false);
    const [quizIdx, setQuizIdx] = useState(0);
    const [quizScore, setQuizScore] = useState(0);
    const [quizAnswered, setQuizAnswered] = useState(null);
    const [quizDone, setQuizDone] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const filtered = hardwareData.filter(hw => {
        const matchSearch = hw.name.toLowerCase().includes(search.toLowerCase()) ||
            hw.shortDesc.toLowerCase().includes(search.toLowerCase());
        const matchCat = activeCategory === "Semua" || hw.category === activeCategory;
        return matchSearch && matchCat;
    });

    const handleAnswer = (idx) => {
        if (quizAnswered !== null) return;
        setSelectedAnswer(idx);
        setQuizAnswered(idx);
        if (idx === quizData[quizIdx].answer) setQuizScore(s => s + 1);
    };

    const nextQuestion = () => {
        if (quizIdx + 1 >= quizData.length) {
            setQuizDone(true);
        } else {
            setQuizIdx(i => i + 1);
            setQuizAnswered(null);
            setSelectedAnswer(null);
        }
    };

    const resetQuiz = () => {
        setQuizIdx(0);
        setQuizScore(0);
        setQuizAnswered(null);
        setSelectedAnswer(null);
        setQuizDone(false);
        setQuizActive(true);
    };

    const dm = darkMode;
    const bg = dm ? "#0f172a" : "#f8fafc";
    const card = dm ? "#1e293b" : "#ffffff";
    const text = dm ? "#e2e8f0" : "#1e293b";
    const textMuted = dm ? "#94a3b8" : "#64748b";
    const border = dm ? "#334155" : "#e2e8f0";
    const navBg = dm ? "#0f172a" : "#ffffff";
    const accent = "#3B82F6";

    const styles = {
        app: { minHeight: "100vh", background: bg, color: text, fontFamily: "'Segoe UI', system-ui, sans-serif", transition: "all 0.3s" },
        nav: { background: navBg, borderBottom: `1px solid ${border}`, padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, position: "sticky", top: 0, zIndex: 100, boxShadow: dm ? "0 1px 0 #334155" : "0 1px 8px rgba(0,0,0,0.06)" },
        navLogo: { fontWeight: 700, fontSize: 18, color: accent, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 },
        navLinks: { display: "flex", gap: 8, alignItems: "center" },
        navBtn: (active) => ({ background: active ? accent : "transparent", color: active ? "#fff" : textMuted, border: "none", borderRadius: 8, padding: "6px 16px", cursor: "pointer", fontWeight: active ? 600 : 400, fontSize: 14, transition: "all 0.2s" }),
        dmBtn: { background: dm ? "#334155" : "#f1f5f9", border: "none", borderRadius: 20, padding: "6px 14px", cursor: "pointer", fontSize: 16, transition: "all 0.2s" },
        hero: { background: dm ? "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" : "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)", padding: "5rem 1.5rem 4rem", textAlign: "center" },
        heroTitle: { fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: dm ? "#e2e8f0" : "#1e293b", marginBottom: 16, lineHeight: 1.15 },
        heroAccent: { color: accent },
        heroSub: { fontSize: "clamp(1rem, 2.5vw, 1.25rem)", color: textMuted, maxWidth: 640, margin: "0 auto 2rem" },
        heroBtn: { background: accent, color: "#fff", border: "none", borderRadius: 12, padding: "14px 32px", fontSize: 16, fontWeight: 600, cursor: "pointer", marginRight: 12, boxShadow: "0 4px 14px rgba(59,130,246,0.35)", transition: "transform 0.15s" },
        heroBtnOutline: { background: "transparent", color: accent, border: `2px solid ${accent}`, borderRadius: 12, padding: "12px 28px", fontSize: 16, fontWeight: 600, cursor: "pointer", transition: "all 0.15s" },
        section: { padding: "3rem 1.5rem", maxWidth: 1100, margin: "0 auto" },
        sectionTitle: { fontSize: "1.75rem", fontWeight: 700, marginBottom: 8, color: text },
        sectionSub: { color: textMuted, marginBottom: 2 },
        grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20, marginTop: 24 },
        hwCard: { background: card, border: `1px solid ${border}`, borderRadius: 16, padding: "1.5rem", cursor: "pointer", transition: "all 0.2s", position: "relative", overflow: "hidden" },
        hwIcon: { fontSize: 36, marginBottom: 12 },
        hwName: { fontWeight: 700, fontSize: 17, marginBottom: 4 },
        hwCat: (color) => ({ display: "inline-block", background: color + "22", color, fontSize: 11, fontWeight: 600, padding: "2px 10px", borderRadius: 20, marginBottom: 10 }),
        hwDesc: { color: textMuted, fontSize: 13.5, lineHeight: 1.6 },
        searchBar: { background: card, border: `1px solid ${border}`, borderRadius: 12, padding: "12px 16px", fontSize: 15, color: text, width: "100%", boxSizing: "border-box", outline: "none", transition: "border 0.2s" },
        catBtn: (active) => ({ background: active ? accent : (dm ? "#1e293b" : "#f1f5f9"), color: active ? "#fff" : textMuted, border: `1px solid ${active ? accent : border}`, borderRadius: 20, padding: "7px 18px", cursor: "pointer", fontSize: 13, fontWeight: active ? 600 : 400, transition: "all 0.2s", whiteSpace: "nowrap" }),
        modal: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 },
        modalBox: { background: card, borderRadius: 20, maxWidth: 640, width: "100%", maxHeight: "85vh", overflowY: "auto", padding: "2rem" },
        modalClose: { background: dm ? "#334155" : "#f1f5f9", border: "none", borderRadius: 8, padding: "6px 14px", cursor: "pointer", color: text, fontWeight: 600, fontSize: 13 },
        tag: (color) => ({ background: color + "22", color, fontSize: 12, padding: "3px 10px", borderRadius: 6, fontWeight: 600 }),
        listItem: { display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6, fontSize: 14, color: textMuted },
        quizCard: { background: card, border: `1px solid ${border}`, borderRadius: 16, padding: "2rem", maxWidth: 600, margin: "0 auto" },
        quizOpt: (state) => ({
            background: state === "correct" ? "#10b981" + "22" : state === "wrong" ? "#ef4444" + "22" : state === "selected" ? accent + "11" : (dm ? "#1e293b" : "#f8fafc"),
            border: `2px solid ${state === "correct" ? "#10b981" : state === "wrong" ? "#ef4444" : state === "selected" ? accent : border}`,
            borderRadius: 10, padding: "12px 16px", cursor: quizAnswered !== null ? "default" : "pointer",
            marginBottom: 10, color: text, fontSize: 15, transition: "all 0.2s", textAlign: "left", width: "100%"
        }),
        progress: { background: dm ? "#334155" : "#e2e8f0", borderRadius: 99, height: 6, margin: "12px 0" },
        progressFill: (pct) => ({ background: accent, width: pct + "%", height: "100%", borderRadius: 99, transition: "width 0.4s" }),
        footer: { background: dm ? "#0a1628" : "#1e293b", color: "#94a3b8", textAlign: "center", padding: "2rem 1.5rem", marginTop: "3rem" },
        statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginTop: "1.5rem" },
        statCard: { background: dm ? "#1e293b" : "#eff6ff", borderRadius: 14, padding: "1.25rem", textAlign: "center" },
    };

    const getCategoryColor = (cat) => {
        const map = { "Input Device": "#10B981", "Output Device": "#8B5CF6", "Processing Device": "#3B82F6", "Storage Device": "#F59E0B" };
        return map[cat] || "#64748b";
    };

    const getAnswerState = (i) => {
        if (quizAnswered === null) return "none";
        if (i === quizData[quizIdx].answer) return "correct";
        if (i === selectedAnswer && i !== quizData[quizIdx].answer) return "wrong";
        return "none";
    };

    return (
        <div style={styles.app}>
            {/* NAVBAR */}
            <nav style={styles.nav}>
                <div style={styles.navLogo} onClick={() => setPage("home")}>
                    💻 <span>HardwareEdu</span>
                </div>
                <div style={styles.navLinks}>
                    {["home", "materi", "quiz"].map(p => (
                        <button key={p} style={styles.navBtn(page === p)} onClick={() => { setPage(p); if (p !== "quiz") { setQuizActive(false); setQuizDone(false); } }}>
                            {p === "home" ? "Beranda" : p === "materi" ? "Materi" : "Quiz"}
                        </button>
                    ))}
                    <button style={styles.dmBtn} onClick={() => setDarkMode(d => !d)} title="Toggle dark mode">
                        {dm ? "☀️" : "🌙"}
                    </button>
                </div>
            </nav>

            {/* HOME */}
            {page === "home" && (
                <>
                    <div style={styles.hero}>
                        <div style={{ maxWidth: 700, margin: "0 auto" }}>
                            <div style={{ display: "inline-block", background: accent + "22", color: accent, fontSize: 13, fontWeight: 600, padding: "4px 16px", borderRadius: 99, marginBottom: 20 }}>
                                🎓 Platform Edukasi Hardware Komputer
                            </div>
                            <h1 style={styles.heroTitle}>
                                Belajar <span style={styles.heroAccent}>Hardware</span><br />Komputer dengan Mudah
                            </h1>
                            <p style={styles.heroSub}>
                                Pahami setiap komponen komputer dari fungsi, cara kerja, hingga spesifikasinya. Cocok untuk pelajar pemula hingga tingkat lanjut.
                            </p>
                            <div>
                                <button style={styles.heroBtn} onClick={() => setPage("materi")} onMouseOver={e => e.target.style.transform = "translateY(-2px)"} onMouseOut={e => e.target.style.transform = "translateY(0)"}>
                                    🚀 Mulai Belajar
                                </button>
                                <button style={styles.heroBtnOutline} onClick={() => setPage("quiz")}>
                                    📝 Coba Quiz
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* STATS */}
                    <div style={{ ...styles.section, paddingTop: "2rem", paddingBottom: "1rem" }}>
                        <div style={styles.statsGrid}>
                            {[
                                { icon: "💻", val: "12", label: "Komponen Hardware" },
                                { icon: "📂", val: "4", label: "Kategori Perangkat" },
                                { icon: "📝", val: "8", label: "Soal Quiz Interaktif" },
                                { icon: "🎯", val: "100%", label: "Gratis & Mudah Dipahami" },
                            ].map(s => (
                                <div key={s.label} style={styles.statCard}>
                                    <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
                                    <div style={{ fontSize: 24, fontWeight: 700, color: accent }}>{s.val}</div>
                                    <div style={{ fontSize: 13, color: textMuted, marginTop: 4 }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CATEGORIES PREVIEW */}
                    <div style={styles.section}>
                        <h2 style={styles.sectionTitle}>Kategori Perangkat</h2>
                        <p style={{ ...styles.sectionSub, marginBottom: 20 }}>Hardware komputer dikelompokkan berdasarkan fungsinya</p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
                            {[
                                { cat: "Input Device", icon: "⌨️", desc: "Perangkat untuk memasukkan data ke komputer", count: 2 },
                                { cat: "Output Device", icon: "🖥️", desc: "Perangkat untuk menampilkan hasil pemrosesan", count: 1 },
                                { cat: "Processing Device", icon: "⚡", desc: "Perangkat yang memproses dan mengelola data", count: 7 },
                                { cat: "Storage Device", icon: "💾", desc: "Perangkat untuk menyimpan data secara permanen", count: 2 },
                            ].map(c => (
                                <div key={c.cat} style={{ ...styles.hwCard, cursor: "pointer" }}
                                    onClick={() => { setPage("materi"); setActiveCategory(c.cat); }}
                                    onMouseOver={e => e.currentTarget.style.transform = "translateY(-4px)"}
                                    onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
                                >
                                    <div style={{ fontSize: 36, marginBottom: 10 }}>{c.icon}</div>
                                    <div style={{ ...styles.hwName, color: getCategoryColor(c.cat) }}>{c.cat}</div>
                                    <div style={{ ...styles.hwDesc, marginTop: 8 }}>{c.desc}</div>
                                    <div style={{ marginTop: 12, fontSize: 12, color: textMuted }}>{c.count} komponen →</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* PREVIEW HARDWARE */}
                    <div style={{ ...styles.section, paddingTop: 0 }}>
                        <h2 style={styles.sectionTitle}>Hardware Terpopuler</h2>
                        <p style={{ ...styles.sectionSub, marginBottom: 20 }}>Klik kartu untuk melihat detail lengkap</p>
                        <div style={styles.grid}>
                            {hardwareData.slice(0, 6).map(hw => (
                                <div key={hw.id} style={styles.hwCard}
                                    onClick={() => { setSelectedHW(hw); }}
                                    onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)"; }}
                                    onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                                >
                                    <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: hw.color + "11", borderRadius: "0 16px 0 80px" }} />
                                    <div style={styles.hwIcon}>{hw.icon}</div>
                                    <div style={styles.hwCat(hw.color)}>{hw.category}</div>
                                    <div style={styles.hwName}>{hw.name}</div>
                                    <div style={styles.hwDesc}>{hw.shortDesc}</div>
                                    <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: accent, fontWeight: 600 }}>
                                        Lihat detail →
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ textAlign: "center", marginTop: 28 }}>
                            <button style={{ ...styles.heroBtn, background: "transparent", color: accent, boxShadow: "none", border: `2px solid ${accent}` }} onClick={() => setPage("materi")}>
                                Lihat Semua Hardware →
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* MATERI */}
            {page === "materi" && (
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>📚 Materi Hardware Komputer</h2>
                    <p style={{ ...styles.sectionSub, marginBottom: 20 }}>Pelajari {hardwareData.length} komponen hardware komputer secara lengkap</p>

                    {/* Search */}
                    <div style={{ position: "relative", marginBottom: 16 }}>
                        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 18 }}>🔍</span>
                        <input
                            style={{ ...styles.searchBar, paddingLeft: 44 }}
                            placeholder="Cari hardware..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Categories */}
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
                        {categories.map(cat => (
                            <button key={cat} style={styles.catBtn(activeCategory === cat)} onClick={() => setActiveCategory(cat)}>
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div style={{ color: textMuted, fontSize: 13, marginBottom: 16 }}>
                        Menampilkan {filtered.length} komponen
                    </div>

                    <div style={styles.grid}>
                        {filtered.map(hw => (
                            <div key={hw.id} style={styles.hwCard}
                                onClick={() => setSelectedHW(hw)}
                                onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)"; }}
                                onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                            >
                                <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: hw.color + "11", borderRadius: "0 16px 0 80px" }} />
                                <div style={styles.hwIcon}>{hw.icon}</div>
                                <div style={styles.hwCat(hw.color)}>{hw.category}</div>
                                <div style={styles.hwName}>{hw.name}</div>
                                <div style={styles.hwDesc}>{hw.shortDesc}</div>
                                <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: accent, fontWeight: 600 }}>
                                    Lihat detail →
                                </div>
                            </div>
                        ))}
                        {filtered.length === 0 && (
                            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "3rem", color: textMuted }}>
                                <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
                                <p>Tidak ada hardware yang ditemukan untuk "{search}"</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* QUIZ */}
            {page === "quiz" && (
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>📝 Quiz Hardware Komputer</h2>
                    <p style={{ ...styles.sectionSub, marginBottom: 24 }}>Uji pemahamanmu tentang komponen hardware komputer</p>

                    {!quizActive && !quizDone && (
                        <div style={{ ...styles.quizCard, textAlign: "center" }}>
                            <div style={{ fontSize: 64, marginBottom: 16 }}>🎯</div>
                            <h3 style={{ fontWeight: 700, fontSize: 22, marginBottom: 8 }}>Siap untuk Quiz?</h3>
                            <p style={{ color: textMuted, marginBottom: 24 }}>{quizData.length} soal pilihan ganda tentang hardware komputer. Tidak ada batas waktu!</p>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }}>
                                {[{ icon: "❓", val: quizData.length, label: "Soal" }, { icon: "⏱️", val: "Bebas", label: "Waktu" }, { icon: "🏆", val: "100", label: "Nilai Maks" }].map(s => (
                                    <div key={s.label} style={{ background: dm ? "#0f172a" : "#f8fafc", borderRadius: 12, padding: "1rem" }}>
                                        <div style={{ fontSize: 24 }}>{s.icon}</div>
                                        <div style={{ fontWeight: 700, fontSize: 18, color: accent }}>{s.val}</div>
                                        <div style={{ fontSize: 12, color: textMuted }}>{s.label}</div>
                                    </div>
                                ))}
                            </div>
                            <button style={{ ...styles.heroBtn, width: "100%" }} onClick={resetQuiz}>Mulai Quiz 🚀</button>
                        </div>
                    )}

                    {quizActive && !quizDone && (
                        <div style={styles.quizCard}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                                <span style={{ fontSize: 13, color: textMuted, fontWeight: 600 }}>Soal {quizIdx + 1} / {quizData.length}</span>
                                <span style={{ background: accent + "22", color: accent, fontSize: 13, padding: "3px 12px", borderRadius: 20, fontWeight: 600 }}>Skor: {quizScore}</span>
                            </div>
                            <div style={styles.progress}>
                                <div style={styles.progressFill(((quizIdx + 1) / quizData.length) * 100)} />
                            </div>
                            <h3 style={{ fontSize: 17, fontWeight: 600, margin: "20px 0 16px", lineHeight: 1.5 }}>{quizData[quizIdx].q}</h3>
                            <div>
                                {quizData[quizIdx].options.map((opt, i) => (
                                    <button key={i} style={styles.quizOpt(getAnswerState(i))} onClick={() => handleAnswer(i)}>
                                        <span style={{ fontWeight: 600, marginRight: 8, color: accent }}>
                                            {["A", "B", "C", "D"][i]}.
                                        </span>
                                        {opt}
                                        {quizAnswered !== null && i === quizData[quizIdx].answer && <span style={{ marginLeft: 8 }}>✅</span>}
                                        {quizAnswered !== null && i === selectedAnswer && i !== quizData[quizIdx].answer && <span style={{ marginLeft: 8 }}>❌</span>}
                                    </button>
                                ))}
                            </div>
                            {quizAnswered !== null && (
                                <div style={{ marginTop: 16, padding: "12px 16px", background: (selectedAnswer === quizData[quizIdx].answer ? "#10b981" : "#ef4444") + "22", borderRadius: 10, color: selectedAnswer === quizData[quizIdx].answer ? "#10b981" : "#ef4444", fontWeight: 600, fontSize: 14 }}>
                                    {selectedAnswer === quizData[quizIdx].answer ? "🎉 Benar! Jawaban tepat!" : `❌ Salah. Jawaban yang benar: ${quizData[quizIdx].options[quizData[quizIdx].answer]}`}
                                </div>
                            )}
                            {quizAnswered !== null && (
                                <button style={{ ...styles.heroBtn, marginTop: 16, width: "100%" }} onClick={nextQuestion}>
                                    {quizIdx + 1 >= quizData.length ? "Lihat Hasil 🏁" : "Soal Berikutnya →"}
                                </button>
                            )}
                        </div>
                    )}

                    {quizDone && (
                        <div style={{ ...styles.quizCard, textAlign: "center" }}>
                            <div style={{ fontSize: 64, marginBottom: 16 }}>
                                {quizScore >= 7 ? "🏆" : quizScore >= 5 ? "👍" : "📚"}
                            </div>
                            <h3 style={{ fontWeight: 700, fontSize: 24, marginBottom: 8 }}>Quiz Selesai!</h3>
                            <div style={{ fontSize: 48, fontWeight: 800, color: accent, marginBottom: 8 }}>
                                {quizScore}/{quizData.length}
                            </div>
                            <p style={{ color: textMuted, marginBottom: 8 }}>
                                Nilai: {Math.round((quizScore / quizData.length) * 100)}/100
                            </p>
                            <p style={{ fontWeight: 600, fontSize: 16, marginBottom: 24, color: quizScore >= 7 ? "#10b981" : quizScore >= 5 ? "#f59e0b" : "#ef4444" }}>
                                {quizScore >= 7 ? "🌟 Luar Biasa! Kamu sangat paham hardware komputer!" : quizScore >= 5 ? "👍 Bagus! Terus belajar untuk hasil lebih baik." : "📖 Ayo pelajari lagi materi hardware-nya!"}
                            </p>
                            <div style={{ display: "flex", gap: 12 }}>
                                <button style={{ ...styles.heroBtn, flex: 1 }} onClick={resetQuiz}>Ulangi Quiz</button>
                                <button style={{ ...styles.heroBtnOutline, flex: 1 }} onClick={() => setPage("materi")}>Belajar Lagi</button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* MODAL DETAIL */}
            {selectedHW && (
                <div style={styles.modal} onClick={e => { if (e.target === e.currentTarget) setSelectedHW(null); }}>
                    <div style={styles.modalBox}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                <div style={{ fontSize: 48 }}>{selectedHW.icon}</div>
                                <div>
                                    <div style={{ fontSize: 22, fontWeight: 700 }}>{selectedHW.name}</div>
                                    <div style={styles.tag(selectedHW.color)}>{selectedHW.category}</div>
                                </div>
                            </div>
                            <button style={styles.modalClose} onClick={() => setSelectedHW(null)}>✕ Tutup</button>
                        </div>

                        <p style={{ color: textMuted, lineHeight: 1.7, marginBottom: 20 }}>{selectedHW.fullDesc}</p>

                        <div style={{ background: dm ? "#0f172a" : "#f8fafc", borderRadius: 12, padding: "1rem", marginBottom: 20 }}>
                            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10, color: text }}>📋 Spesifikasi Umum</div>
                            {selectedHW.specs.map((s, i) => (
                                <div key={i} style={{ ...styles.listItem, color: text }}>
                                    <span style={{ color: accent, fontWeight: 700, minWidth: 16 }}>•</span> {s}
                                </div>
                            ))}
                        </div>

                        <div style={{ marginBottom: 16 }}>
                            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>⚙️ Cara Kerja</div>
                            <p style={{ color: textMuted, fontSize: 14, lineHeight: 1.7 }}>{selectedHW.cara_kerja}</p>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                            <div style={{ background: "#10b981" + "11", borderRadius: 12, padding: "1rem" }}>
                                <div style={{ fontWeight: 700, fontSize: 13, color: "#10b981", marginBottom: 8 }}>✅ Kelebihan</div>
                                {selectedHW.kelebihan.map((k, i) => <div key={i} style={{ fontSize: 13, color: textMuted, marginBottom: 4 }}>• {k}</div>)}
                            </div>
                            <div style={{ background: "#ef4444" + "11", borderRadius: 12, padding: "1rem" }}>
                                <div style={{ fontWeight: 700, fontSize: 13, color: "#ef4444", marginBottom: 8 }}>⚠️ Kekurangan</div>
                                {selectedHW.kekurangan.map((k, i) => <div key={i} style={{ fontSize: 13, color: textMuted, marginBottom: 4 }}>• {k}</div>)}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* FOOTER */}
            <footer style={styles.footer}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>💻</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#e2e8f0", marginBottom: 4 }}>HardwareEdu</div>
                <p style={{ fontSize: 13, marginBottom: 8 }}>Platform edukasi hardware komputer untuk pelajar Indonesia</p>
                <div style={{ display: "flex", gap: 20, justifyContent: "center", fontSize: 13 }}>
                    {["Beranda", "Materi", "Quiz"].map(p => (
                        <span key={p} style={{ cursor: "pointer", color: "#64748b" }} onClick={() => setPage(p.toLowerCase())}>{p}</span>
                    ))}
                </div>
                <p style={{ fontSize: 12, marginTop: 16, color: "#475569" }}>© 2025 HardwareEdu · Dibuat dengan ❤️ untuk pelajar Indonesia</p>
            </footer>
        </div>
    );
}