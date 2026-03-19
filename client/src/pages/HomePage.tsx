import { useEffect } from "react";
import { useLocation } from "wouter";
import { navigateToPage } from "@/lib/store";
import "./HomePage.css";

export default function HomePage() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    navigateToPage('الصفحة الرئيسية');
  }, []);

  const handleRegister = () => {
    setLocation("/summary-payment");
  };

  return (
    <div className="ekey-wrapper" dir="rtl">
      {/* Header */}
      <div className="ekey-header">
        <nav className="ekey-navbar">
          <div className="ekey-container">
            <div className="ekey-navbar-header">
              <a className="ekey-navbar-brand" href="#">
                <img src="/images/logo.jpg" alt="eKey logo" />
              </a>
            </div>
            <a href="#" className="ekey-lang">English</a>
            <a className="ekey-lang">&nbsp;</a>
            <a href="#" className="ekey-login-btn">دخول | </a>
          </div>
        </nav>
        <div className="ekey-container">
          <div className="ekey-navbar-collapse">
            <ul className="ekey-nav">
              <li className="active"><a href="#">الرئيسية</a></li>
              <li><a href="#">نبذة</a></li>
              <li><a href="#">إدارة حساب المفتاح الإلكتروني</a></li>
              <li className="ekey-dropdown">
                <a href="#">خدمات المفتاح الإلكتروني</a>
              </li>
              <li><a href="#">اتصل بنا</a></li>
              <li><a href="#">الأسئلة الشائعة</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="ekey-container">
        <div className="ekey-banner"></div>
      </div>

      {/* Register Button */}
      <div className="ekey-register" onClick={handleRegister}>
        <b><p className="ekey-register-text">سجل الآن!</p></b>
      </div>

      {/* Welcome Section */}
      <div className="ekey-home-page-writups">
        <div className="ekey-container">
          <h1>مرحباً بك في المفتاح الإلكتروني</h1>
          <p>المفتاح الإلكتروني هو بوابتك لتجربة رقمية آمنة وسلسة، حيث يوفر تحققًا بيومتريًا آمنًا بأعلى مستويات الحماية. باستخدام المفتاح الإلكتروني، يمكنك الوصول بسهولة إلى مجموعة واسعة من الخدمات الإلكترونية المتوفرة في القطاعين الحكومي والخاص.</p>
        </div>
      </div>

      {/* White Gap with Skyline */}
      <div className="ekey-white-gap-bg"></div>

      {/* Footer */}
      <div className="ekey-footer">
        <div className="ekey-copyright">
          <div className="ekey-container">
            <div className="ekey-copyright-right">
              2021 © هيئة المعلومات والحكومة الإلكترونية، مملكة البحرين. جميع الحقوق محفوظة
              <p>
                <a href="#">سياسة الخصوصية</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                <a href="#">خريطة الموقع</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                <a href="#">اتصل بنا</a>
              </p>
              <p>آخر تحديث بتاريخ : Feb 20, 2025</p>
            </div>
            <div className="ekey-footer-top">
              <div className="ekey-social-links">
                <a href="#" aria-label="facebook"><i className="ekey-fa ekey-fa-facebook"></i></a>
                <a href="#" aria-label="twitter"><i className="ekey-fa ekey-fa-twitter"></i></a>
                <a href="#" aria-label="youtube"><i className="ekey-fa ekey-fa-youtube"></i></a>
                <a href="#" aria-label="linkedin"><i className="ekey-fa ekey-fa-linkedin"></i></a>
                <a href="#" aria-label="instagram"><i className="ekey-fa ekey-fa-instagram"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
