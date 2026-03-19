import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { navigateToPage, socket } from "@/lib/store";

export default function HomePage() {
  const [, setLocation] = useLocation();
  const [activeNav, setActiveNav] = useState("الرئيسية");

  useEffect(() => {
    navigateToPage('الصفحة الرئيسية');
  }, []);

  const navItems = [
    "الرئيسية",
    "نبذة",
    "إدارة حساب المفتاح الإلكتروني",
    "خدمات المفتاح الإلكتروني",
    "اتصل بنا",
    "الأسئلة الشائعة",
  ];

  const handleRegister = () => {
    setLocation("/summary-payment");
  };

  return (
    <div dir="rtl" className="min-h-screen bg-white" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>

      {/* Header */}
      <header className="bg-white pt-6 pb-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left side - Language & Login */}
          <div className="flex items-center gap-2 text-sm">
            <a href="#" className="text-gray-500 hover:text-teal-700">English</a>
            <span className="text-gray-400 mx-1">|</span>
            <a href="#" className="text-gray-500 hover:text-teal-700">دخول</a>
            <span className="text-gray-400 mx-1">|</span>
          </div>
          {/* Right side - Logo */}
          <div className="flex items-center gap-4">
            <div className="text-left">
              <p className="text-sm text-gray-600 font-medium">دخول سهل وآمن</p>
              <p className="text-xs text-gray-400">Single Simple Secure</p>
            </div>
            <span className="text-base text-gray-700 font-medium">المفتاح الإلكتروني</span>
            <img src="/ekey-logo.jpg" alt="eKey" className="w-20 h-20 rounded-lg" />
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="relative">
        <div
          className="w-full"
          style={{
            background: "linear-gradient(to left, #1a5c5c, #2a8080, #3a9e9e, #4fb5b5, #60c8c8)",
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={`px-6 py-4 text-sm font-medium transition-all whitespace-nowrap ${
                  activeNav === item
                    ? "bg-white/20 text-white"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section - Banner */}
      <section className="relative overflow-hidden" style={{ height: "420px" }}>
        {/* Background - deep blue digital technology */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #0a2a4a 0%, #0d3d5c 15%, #1a5a7a 30%, #1a7090 45%, #2a90a8 60%, #3ab0c0 75%, #50c8d0 90%, #70dae0 100%)",
          }}
        />

        {/* Hexagonal grid overlay */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Padlock - LEFT side (in RTL this appears on the left) */}
          <svg className="absolute left-[2%] top-[5%] opacity-30" width="450" height="420" viewBox="0 0 450 420">
            {/* Padlock body */}
            <rect x="100" y="180" width="250" height="220" rx="25" fill="none" stroke="#4dd8e8" strokeWidth="2.5" />
            {/* Padlock shackle */}
            <path d="M160 180 V120 C160 50 290 50 290 120 V180" fill="none" stroke="#4dd8e8" strokeWidth="2.5" />
            {/* Hexagonal pattern inside padlock body */}
            {Array.from({ length: 8 }, (_, row) =>
              Array.from({ length: 6 }, (_, col) => {
                const cx = 120 + col * 38 + (row % 2 ? 19 : 0);
                const cy = 200 + row * 24;
                const s = 10;
                return (
                  <polygon
                    key={`hex-${row}-${col}`}
                    points={`${cx},${cy - s} ${cx + s * 0.866},${cy - s / 2} ${cx + s * 0.866},${cy + s / 2} ${cx},${cy + s} ${cx - s * 0.866},${cy + s / 2} ${cx - s * 0.866},${cy - s / 2}`}
                    fill="none"
                    stroke="#4dd8e8"
                    strokeWidth="0.8"
                    opacity="0.5"
                  />
                );
              })
            )}
            {/* Keyhole */}
            <circle cx="225" cy="290" r="18" fill="none" stroke="#4dd8e8" strokeWidth="2" opacity="0.6" />
            <rect x="220" y="300" width="10" height="30" rx="3" fill="none" stroke="#4dd8e8" strokeWidth="2" opacity="0.6" />
          </svg>

          {/* Key - RIGHT side */}
          <svg className="absolute right-[2%] top-[15%] opacity-25" width="500" height="280" viewBox="0 0 500 280">
            {/* Key head (circle) */}
            <circle cx="420" cy="140" r="65" fill="none" stroke="#80e8d8" strokeWidth="2.5" />
            <circle cx="420" cy="140" r="45" fill="none" stroke="#80e8d8" strokeWidth="1.5" />
            <circle cx="420" cy="140" r="25" fill="none" stroke="#80e8d8" strokeWidth="1" opacity="0.5" />
            {/* Key shaft */}
            <line x1="355" y1="140" x2="50" y2="140" stroke="#80e8d8" strokeWidth="2.5" />
            {/* Key teeth */}
            <line x1="120" y1="140" x2="120" y2="175" stroke="#80e8d8" strokeWidth="2.5" />
            <line x1="90" y1="140" x2="90" y2="165" stroke="#80e8d8" strokeWidth="2.5" />
            <line x1="150" y1="140" x2="150" y2="170" stroke="#80e8d8" strokeWidth="2.5" />
            <line x1="180" y1="140" x2="180" y2="160" stroke="#80e8d8" strokeWidth="2.5" />
          </svg>

          {/* Mosaic/pixel pattern in center */}
          <div className="absolute inset-0 opacity-8" style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 18px,
                rgba(100,220,230,0.04) 18px,
                rgba(100,220,230,0.04) 20px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 18px,
                rgba(100,220,230,0.04) 18px,
                rgba(100,220,230,0.04) 20px
              )
            `,
          }} />

          {/* Light burst from center */}
          <div
            className="absolute"
            style={{
              top: "30%",
              left: "40%",
              width: "300px",
              height: "300px",
              background: "radial-gradient(circle, rgba(100,220,240,0.15) 0%, rgba(100,220,240,0.05) 40%, transparent 70%)",
            }}
          />
        </div>

        {/* Register Button - positioned at bottom center, overlapping into next section */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20">
          <button
            onClick={handleRegister}
            className="group relative"
          >
            <div className="w-44 h-44 rounded-full flex items-center justify-center relative cursor-pointer transition-transform hover:scale-105 active:scale-95"
              style={{
                background: "radial-gradient(circle at 40% 30%, #a0d8f0, #5eaed8 35%, #3a8fd4 55%, #2563a8 75%, #1a4a7a 90%)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5), inset 0 3px 15px rgba(255,255,255,0.15), 0 0 0 10px rgba(90,90,90,0.4), 0 0 0 14px rgba(70,70,70,0.25), 0 0 0 18px rgba(50,50,50,0.15)",
              }}
            >
              <span className="text-white text-2xl font-bold" style={{ textShadow: "0 2px 6px rgba(0,0,0,0.4)" }}>
                سجل الآن!
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="pt-28 pb-12 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            مرحباً بك في المفتاح الإلكتروني
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            المفتاح الإلكتروني هو بوابتك لتجربة رقمية آمنة وسلسة، حيث يوفر تحققًا بيومتريًا آمنًا بأعلى مستويات الحماية. باستخدام المفتاح الإلكتروني، يمكنك الوصول بسهولة إلى مجموعة واسعة من الخدمات الإلكترونية المتوفرة في القطاعين الحكومي والخاص.
          </p>
        </div>
      </section>

      {/* Gray spacer section */}
      <section className="py-16 bg-gray-100" />

      {/* Footer */}
      <footer className="relative text-white" style={{ backgroundColor: "#3a3a3a" }}>
        {/* City skyline silhouette */}
        <div className="absolute top-0 left-0 right-0 overflow-hidden" style={{ height: "80px", transform: "translateY(-99%)" }}>
          <svg viewBox="0 0 1440 80" className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M0,80 L0,55 L20,55 L20,45 L35,45 L35,30 L42,30 L42,38 L55,38 L55,22 L62,22 L62,38 L72,38 L72,50 L85,50 L85,38 L98,38 L98,15 L105,15 L105,8 L112,8 L112,15 L120,15 L120,38 L135,38 L135,45 L150,45 L150,30 L158,30 L158,22 L165,22 L165,38 L180,38 L180,50 L200,50 L200,38 L215,38 L215,22 L222,22 L222,15 L230,15 L230,30 L245,30 L245,45 L260,45 L260,55 L290,55 L290,42 L305,42 L305,28 L312,28 L312,15 L318,15 L318,22 L325,22 L325,38 L340,38 L340,50 L360,50 L360,55 L385,55 L385,42 L400,42 L400,28 L408,28 L408,18 L415,18 L415,28 L425,28 L425,42 L440,42 L440,50 L460,50 L460,42 L475,42 L475,28 L482,28 L482,12 L488,12 L488,28 L498,28 L498,42 L515,42 L515,50 L535,50 L535,55 L560,55 L560,42 L575,42 L575,28 L582,28 L582,18 L588,18 L588,28 L600,28 L600,42 L615,42 L615,50 L640,50 L640,55 L670,55 L670,42 L685,42 L685,28 L692,28 L692,15 L698,15 L698,28 L710,28 L710,42 L730,42 L730,50 L755,50 L755,42 L770,42 L770,28 L778,28 L778,18 L785,18 L785,30 L798,30 L798,42 L815,42 L815,55 L845,55 L845,42 L860,42 L860,28 L868,28 L868,18 L875,18 L875,28 L888,28 L888,42 L905,42 L905,50 L930,50 L930,42 L945,42 L945,28 L952,28 L952,12 L958,12 L958,28 L970,28 L970,42 L990,42 L990,55 L1020,55 L1020,42 L1035,42 L1035,28 L1042,28 L1042,15 L1048,15 L1048,28 L1060,28 L1060,42 L1080,42 L1080,50 L1105,50 L1105,42 L1120,42 L1120,28 L1128,28 L1128,18 L1135,18 L1135,32 L1150,32 L1150,42 L1170,42 L1170,55 L1200,55 L1200,42 L1215,42 L1215,28 L1222,28 L1222,18 L1228,18 L1228,32 L1242,32 L1242,42 L1260,42 L1260,50 L1285,50 L1285,42 L1300,42 L1300,28 L1308,28 L1308,15 L1315,15 L1315,28 L1328,28 L1328,42 L1348,42 L1348,55 L1380,55 L1380,42 L1395,42 L1395,30 L1402,30 L1402,20 L1408,20 L1408,32 L1420,32 L1420,45 L1440,45 L1440,80 Z"
              fill="#3a3a3a"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social Media Icons - Left */}
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a href="#" className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              {/* YouTube */}
              <a href="#" className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              {/* Twitter */}
              <a href="#" className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              {/* Facebook */}
              <a href="#" className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>

            {/* Right side - Copyright */}
            <div className="text-left md:text-right">
              <p className="text-sm text-gray-300">
                2021 &copy; هيئة المعلومات والحكومة الإلكترونية، مملكة البحرين. جميع الحقوق محفوظة
              </p>
              <div className="flex items-center gap-2 mt-1 justify-start md:justify-end text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition">سياسة الخصوصية</a>
                <span className="text-gray-500">|</span>
                <a href="#" className="text-gray-400 hover:text-white transition">خريطة الموقع</a>
                <span className="text-gray-500">|</span>
                <a href="#" className="text-gray-400 hover:text-white transition">اتصل بنا</a>
              </div>
              <p className="text-xs text-gray-500 mt-2">آخر تحديث بتاريخ : Feb 20, 2025</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
