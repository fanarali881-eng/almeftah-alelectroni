import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { navigateToPage, socket } from "@/lib/store";

export default function HomePage() {
  const [, setLocation] = useLocation();
  const [activeNav, setActiveNav] = useState("الرئيسية");
  const [showPopup, setShowPopup] = useState(true);

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
      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-[#e0f4ff] rounded-lg p-8 max-w-lg w-full mx-4 text-center relative shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">تطبيق</h2>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">المفتاح الإلكتروني</h2>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2.0 المطور بانتظارك!</h2>
            <p className="text-lg text-gray-700 mb-2">حمّل التطبيق لتجربة</p>
            <p className="text-lg text-gray-700 mb-3">رقمية جديدة عبر</p>
            <p className="text-xl font-bold text-gray-900 mb-4">bahrain.bh/apps</p>
            <div className="flex items-center justify-center mb-4">
              <img src="/ekey-logo.jpg" alt="eKey Logo" className="w-20 h-20 rounded-xl" />
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowPopup(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-bold"
              >
                إغلاق
              </button>
              <button
                onClick={handleRegister}
                className="px-6 py-2 bg-[#7cc635] text-white rounded-lg hover:bg-[#6ab52a] transition font-bold"
              >
                تحميل الآن!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left side - Language & Login */}
          <div className="flex items-center gap-3 text-sm">
            <a href="#" className="text-gray-600 hover:text-teal-700">English</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="text-gray-600 hover:text-teal-700">دخول</a>
          </div>
          {/* Right side - Logo */}
          <div className="flex items-center gap-3">
            <div className="text-left">
              <p className="text-sm text-gray-600">دخول سهل وآمن</p>
              <p className="text-xs text-gray-400">Single Simple Secure</p>
            </div>
            <span className="text-sm text-gray-600">المفتاح الإلكتروني</span>
            <img src="/ekey-logo.jpg" alt="eKey" className="w-14 h-14 rounded-lg" />
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="relative">
        <div
          className="w-full"
          style={{
            background: "linear-gradient(to left, #1a6b6b, #3a9e9e, #5bbaba)",
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={`px-5 py-3 text-sm font-medium transition-all whitespace-nowrap ${
                  activeNav === item
                    ? "bg-white/20 text-white border-b-2 border-white"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ minHeight: "400px" }}>
        {/* Background gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #0a3d5c 0%, #0d5e7a 25%, #1a8a9e 50%, #2bb5c4 75%, #4dd4e0 100%)",
          }}
        />
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Padlock shape - right side */}
          <svg className="absolute right-[5%] top-[10%] opacity-20" width="300" height="350" viewBox="0 0 300 350">
            <rect x="50" y="150" width="200" height="180" rx="20" fill="none" stroke="white" strokeWidth="3" />
            <path d="M100 150 V100 C100 50 200 50 200 100 V150" fill="none" stroke="white" strokeWidth="3" />
            {[0, 1, 2, 3, 4, 5].map((row) =>
              [0, 1, 2, 3].map((col) => (
                <polygon
                  key={`${row}-${col}`}
                  points={`${90 + col * 40},${170 + row * 25} ${100 + col * 40},${165 + row * 25} ${110 + col * 40},${170 + row * 25} ${110 + col * 40},${180 + row * 25} ${100 + col * 40},${185 + row * 25} ${90 + col * 40},${180 + row * 25}`}
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                  opacity="0.3"
                />
              ))
            )}
          </svg>
          {/* Key shape - left side */}
          <svg className="absolute left-[5%] top-[15%] opacity-15" width="400" height="200" viewBox="0 0 400 200">
            <circle cx="340" cy="100" r="50" fill="none" stroke="white" strokeWidth="3" />
            <circle cx="340" cy="100" r="35" fill="none" stroke="white" strokeWidth="1.5" />
            <line x1="290" y1="100" x2="50" y2="100" stroke="white" strokeWidth="3" />
            <line x1="100" y1="100" x2="100" y2="130" stroke="white" strokeWidth="3" />
            <line x1="70" y1="100" x2="70" y2="120" stroke="white" strokeWidth="3" />
            <line x1="130" y1="100" x2="130" y2="125" stroke="white" strokeWidth="3" />
          </svg>
          {/* Digital grid pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }} />
        </div>

        {/* Register Button - centered */}
        <div className="relative z-10 flex items-center justify-center" style={{ minHeight: "400px" }}>
          <button
            onClick={handleRegister}
            className="group relative"
          >
            <div className="w-40 h-40 rounded-full flex items-center justify-center relative cursor-pointer transition-transform hover:scale-105 active:scale-95"
              style={{
                background: "radial-gradient(circle at 40% 35%, #7ec8e3, #3a8fd4 50%, #2563a8 80%, #1a4a7a)",
                boxShadow: "0 8px 25px rgba(0,0,0,0.4), inset 0 2px 10px rgba(255,255,255,0.2), 0 0 0 8px rgba(100,100,100,0.3), 0 0 0 12px rgba(80,80,80,0.2)",
              }}
            >
              <span className="text-white text-2xl font-bold" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                سجل الآن!
              </span>
            </div>
          </button>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-12 px-6 bg-white">
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
      <section className="py-16 bg-gray-50" />

      {/* Footer */}
      <footer className="relative text-white" style={{ backgroundColor: "#3a3a3a" }}>
        {/* City skyline silhouette */}
        <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden" style={{ transform: "translateY(-95%)" }}>
          <svg viewBox="0 0 1440 120" className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M0,120 L0,80 L30,80 L30,60 L50,60 L50,40 L60,40 L60,50 L80,50 L80,30 L90,30 L90,50 L100,50 L100,70 L120,70 L120,50 L140,50 L140,20 L150,20 L150,10 L160,10 L160,20 L170,20 L170,50 L190,50 L190,60 L210,60 L210,40 L220,40 L220,30 L230,30 L230,50 L250,50 L250,70 L280,70 L280,50 L300,50 L300,30 L310,30 L310,20 L320,20 L320,40 L340,40 L340,60 L360,60 L360,80 L400,80 L400,60 L420,60 L420,40 L430,40 L430,20 L440,20 L440,30 L450,30 L450,50 L470,50 L470,70 L500,70 L500,50 L520,50 L520,30 L530,30 L530,15 L540,15 L540,30 L550,30 L550,50 L570,50 L570,60 L600,60 L600,80 L640,80 L640,60 L660,60 L660,40 L670,40 L670,25 L680,25 L680,40 L700,40 L700,60 L720,60 L720,70 L760,70 L760,50 L780,50 L780,30 L790,30 L790,20 L800,20 L800,40 L820,40 L820,60 L850,60 L850,80 L900,80 L900,60 L920,60 L920,40 L930,40 L930,25 L940,25 L940,40 L960,40 L960,55 L980,55 L980,70 L1020,70 L1020,50 L1040,50 L1040,30 L1050,30 L1050,15 L1060,15 L1060,30 L1080,30 L1080,50 L1100,50 L1100,65 L1140,65 L1140,80 L1180,80 L1180,60 L1200,60 L1200,40 L1210,40 L1210,25 L1220,25 L1220,45 L1240,45 L1240,60 L1280,60 L1280,75 L1320,75 L1320,55 L1340,55 L1340,35 L1350,35 L1350,20 L1360,20 L1360,40 L1380,40 L1380,60 L1400,60 L1400,80 L1440,80 L1440,120 Z"
              fill="#3a3a3a"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social Media Icons - Left */}
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition">
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
