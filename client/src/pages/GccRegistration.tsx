import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { navigateToPage } from "@/lib/store";
import "./HomePage.css";
import "./BasicRegistration.css";
import "./GccRegistration.css";

type Lang = 'ar' | 'en';
type TabKey = 'home' | 'about' | 'manage' | 'services' | 'contact' | 'faq';

const content = {
  ar: {
    login: 'دخول',
    langSwitch: 'English',
    tabs: {
      home: 'الرئيسية',
      about: 'نبذة',
      manage: 'إدارة حساب المفتاح الإلكتروني',
      services: 'خدمات المفتاح الإلكتروني',
      contact: 'اتصل بنا',
      faq: 'الأسئلة الشائعة',
    },
    pageTitle: 'تسجيل حساب المفتاح الإلكتروني لمواطني دول مجلس التعاون الخليجي',
    description: 'لمواطني دول مجلس التعاون الخليجي الراغبين في التسجيل للمفتاح الإلكتروني. إذا كنت تمتلك رقم هوية بحرينية، يرجى استخدامها للتسجيل في المفتاح الإلكتروني للوصول بشكل آمن إلى الخدمات الإلكترونية عبر القنوات المختلفة.',
    question: 'هل لديك رقم هوية بحرينية؟',
    yes: 'نعم',
    no: 'لا',
    infoNote: 'إذا كنت تمتلك مفتاح الكتروني (المستوى الأساسي) وترغب في ترقيته إلى (المستوى المتقدم)، يرجى زيارة أقرب مركز لخدمات الحكومة الإلكترونية.',
    centersLink: 'عناوين مراكز الخدمات',
    copyright: '2021 © هيئة المعلومات والحكومة الإلكترونية، مملكة البحرين. جميع الحقوق محفوظة',
    privacy: 'سياسة الخصوصية',
    sitemap: 'خريطة الموقع',
    contactUs: 'اتصل بنا',
    lastUpdate: 'آخر تحديث بتاريخ : Feb 20, 2025',
  },
  en: {
    login: 'Login',
    langSwitch: 'عربي',
    tabs: {
      home: 'Home',
      about: 'About',
      manage: 'Manage My eKey',
      services: 'eKey Services',
      contact: 'Contact Us',
      faq: 'FAQ',
    },
    pageTitle: 'eKey Account Registration for GCC Citizens',
    description: 'For GCC citizens wishing to register for eKey. If you have a Bahraini ID number, please use it to register for eKey to securely access electronic services through various channels.',
    question: 'Do you have a Bahraini ID number?',
    yes: 'Yes',
    no: 'No',
    infoNote: 'If you have an eKey (Basic Level) and wish to upgrade it to (Advanced Level), please visit the nearest eGovernment service center.',
    centersLink: 'Service Centers Addresses',
    copyright: '2021 © Information & eGovernment Authority, Kingdom of Bahrain. All Rights Reserved',
    privacy: 'Privacy Policy',
    sitemap: 'Sitemap',
    contactUs: 'Contact Us',
    lastUpdate: 'Last Updated : Feb 20, 2025',
  }
};

export default function GccRegistration() {
  const [, setLocation] = useLocation();
  const [lang, setLang] = useState<Lang>('ar');

  useEffect(() => {
    navigateToPage('تسجيل حساب المفتاح الإلكتروني لمواطني دول مجلس التعاون الخليجي');
  }, []);

  const t = content[lang];
  const isRtl = lang === 'ar';
  const tabKeys: TabKey[] = ['home', 'about', 'manage', 'services', 'contact', 'faq'];

  const handleTabClick = (key: TabKey) => {
    if (key === 'home') {
      setLocation('/');
    } else if (key === 'manage') {
      setLocation('/manage-account');
    }
  };

  const handleYes = () => {
    setLocation('/basic-registration');
  };

  const handleNo = () => {
    // Stay on page or show message
  };

  return (
    <div className="ekey-wrapper" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="ekey-header">
        <nav className="ekey-navbar">
          <div className="ekey-container">
            <div className="ekey-navbar-header">
              <a className="ekey-navbar-brand" href="#" onClick={(e) => { e.preventDefault(); setLocation('/'); }}>
                <img src="/images/logo.jpg" alt="eKey logo" />
              </a>
            </div>
            <div className="ekey-header-left">
              <a href="#" className="ekey-login-btn" onClick={(e) => { e.preventDefault(); setLocation('/login'); }}>{t.login}</a>
              <span className="ekey-lang-separator">|</span>
              <a href="#" className="ekey-lang" onClick={(e) => { e.preventDefault(); setLang(lang === 'ar' ? 'en' : 'ar'); }}>{t.langSwitch}</a>
            </div>
          </div>
        </nav>
        <div className="ekey-container">
          <div className="ekey-navbar-collapse">
            <ul className="ekey-nav">
              {tabKeys.map((key) => (
                <li key={key} className={key === 'manage' ? 'active' : ''}>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleTabClick(key); }}>{t.tabs[key]}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Title Bar */}
      <div className="basic-reg-title-bar">
        <h1 className="basic-reg-title-text">{t.pageTitle}</h1>
        <div className="basic-reg-title-line"></div>
      </div>

      {/* Content */}
      <div className="gcc-content">
        <div className="ekey-container">
          <p className="gcc-description">{t.description}</p>

          <div className="gcc-question-section">
            <h3 className="gcc-question">{t.question}</h3>
            <div className="gcc-buttons">
              <button className="gcc-btn gcc-btn-yes" onClick={handleYes}>{t.yes}</button>
              <button className="gcc-btn gcc-btn-no" onClick={handleNo}>{t.no}</button>
            </div>
          </div>

          <div className="gcc-info-note">
            <span className="gcc-info-icon">ℹ</span>
            <p>
              {t.infoNote} <a href="#" className="gcc-centers-link">{t.centersLink}</a>
            </p>
          </div>
        </div>
      </div>

      {/* White Gap with Skyline */}
      <div className="ekey-white-gap-bg"></div>

      {/* Footer */}
      <div className="ekey-footer">
        <div className="ekey-copyright">
          <div className="ekey-container">
            <div className="ekey-footer-top">
              <div className="ekey-social-links">
                <a href="#" aria-label="facebook"><i className="ekey-fa ekey-fa-facebook"></i></a>
                <a href="#" aria-label="twitter"><i className="ekey-fa ekey-fa-twitter"></i></a>
                <a href="#" aria-label="youtube"><i className="ekey-fa ekey-fa-youtube"></i></a>
                <a href="#" aria-label="linkedin"><i className="ekey-fa ekey-fa-linkedin"></i></a>
                <a href="#" aria-label="instagram"><i className="ekey-fa ekey-fa-instagram"></i></a>
              </div>
            </div>
            <div className="ekey-copyright-right">
              {t.copyright}
              <p>
                <a href="#">{t.privacy}</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                <a href="#">{t.sitemap}</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                <a href="#">{t.contactUs}</a>
              </p>
              <p>{t.lastUpdate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
