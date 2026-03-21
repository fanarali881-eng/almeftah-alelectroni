import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { navigateToPage } from "@/lib/store";
import "./HomePage.css";
import "./ManageAccount.css";

type TabKey = 'home' | 'about' | 'manage' | 'services' | 'contact' | 'faq';
type Lang = 'ar' | 'en';

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
    copyright: '2021 © هيئة المعلومات والحكومة الإلكترونية، مملكة البحرين. جميع الحقوق محفوظة',
    privacy: 'سياسة الخصوصية',
    sitemap: 'خريطة الموقع',
    contactUs: 'اتصل بنا',
    lastUpdate: 'آخر تحديث بتاريخ : Feb 20, 2025',
    pageTitle: 'اختيار المفتاح الإلكتروني الذي يناسبك',
    // Right column - eKey 2.0
    ekey2Title: 'المفتاح الإلكتروني ٢.٠ المطوّر',
    ekey2Desc: 'المفتاح الإلكتروني ٢.٠ المطور مصمم لتوفير وصول سهل وآمن إلى الخدمات الإلكترونية من القطاعين الحكومي والخاص. يمكنك التسجيل، وتسجيل الدخول بكل سهولة، عبر الاستفادة من تقنية التحقق البيومتري المتطور، لضمان التحقق الدقيق، من أجل عملية تسجيل موثوقة.',
    ekey2Download: 'للاستفادة من المفتاح الإلكتروني ٢.٠ المطور، قم بتحميل التطبيق واستكشف جميع مزاياه من متجر تطبيقات الحكومة الإلكترونية',
    ekey2Or: 'أو من متجر التطبيقات الخاص بهاتفك الذكي.',
    ekey2Note: 'ملاحظة: يرجى التأكد توافق جهازك مع متطلبات التطبيق، واتباع الخطوات لإكمال عملية التسجيل بنجاح.',
    ekey2Help: 'للمساعدة والاستفسار، يرجى الاتصال على الرقم',
    ekey2Phone: '٨٠٠٠٨٠٠١',
    // Left column - Current eKey
    currentTitle: 'المفتاح الإلكتروني الحالي',
    basicTitle: 'المستوى الأساسي للمفتاح الإلكتروني',
    basicDesc: 'يوفر المستوى الأساسي من المفتاح الإلكتروني مستوى جيداً من الأمن، حيث يطلب من المستخدم إدخال كل من الرقم الشخصي وكلمة السر فقط للدخول للخدمات الإلكترونية.',
    basicDesc2: 'بالإمكان إنشاء هذا النوع من المفتاح الإلكتروني عبر الانترنت حيث سيكون متاحاً للاستخدام على الفور. ولكن، نظراً لعدم التحقق من البصمة، سيكون بالإمكان الوصول إلى عدد محدود من الخدمات باستخدام المستوى الأساسي من المفتاح الإلكتروني. بإمكانك ترقية هذا المستوى والحصول على المستوى المتقدم من المفتاح الإلكتروني في أي وقت، بزيارة أقرب مركز للخدمات الإلكترونية.',
    basicRegister: 'سجل الآن للحصول على المستوى الأساسي من المفتاح الإلكتروني!',
    gccRegister: 'سجل الآن للحصول على حساب المفتاح الإلكتروني لمواطني دول مجلس التعاون!',
    advancedTitle: 'المستوى المتقدم للمفتاح الإلكتروني',
    advancedDesc: 'يضمن التسجيل في المستوى المتقدم من المفتاح الإلكتروني الحصول على أعلى مستويات الأمن ويتيح الوصول إلى الخدمات الإلكترونية الغاية في السرية والتي تتطلب التحقق من بطاقة الهوية للمستخدم بالإضافة إلى قياساته الحيوية (بصمات الأصابع).',
    advancedDesc2: 'لإتمام عملية التسجيل، يمكن للمستخدمين زيارة أحد',
    advancedKiosk: 'منصات الحكومة الإلكترونية (Kiosk)',
    advancedOr: 'أو أحد',
    advancedCenters: 'مراكز الخدمات الإلكترونية',
    advancedOnce: 'لمرة واحدة فقط مع ضرورة إحضار بطاقة الهوية.',
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
    copyright: '2021 © Information & eGovernment Authority, Kingdom of Bahrain. All Rights Reserved',
    privacy: 'Privacy Policy',
    sitemap: 'Sitemap',
    contactUs: 'Contact Us',
    lastUpdate: 'Last Updated : Feb 20, 2025',
    pageTitle: 'Choose the eKey that suits you',
    ekey2Title: 'Enhanced eKey 2.0',
    ekey2Desc: 'Enhanced eKey 2.0 is designed to provide easy and secure access to electronic services from both the public and private sectors. You can register and log in easily, leveraging advanced biometric verification technology, to ensure accurate verification for a reliable registration process.',
    ekey2Download: 'To benefit from Enhanced eKey 2.0, download the app and explore all its features from the eGovernment App Store',
    ekey2Or: 'or from your smartphone\'s app store.',
    ekey2Note: 'Note: Please ensure your device is compatible with the app requirements, and follow the steps to complete the registration process successfully.',
    ekey2Help: 'For assistance and inquiries, please call',
    ekey2Phone: '80008001',
    currentTitle: 'Current eKey',
    basicTitle: 'Basic Level eKey',
    basicDesc: 'The basic level of eKey provides a good level of security, requiring the user to enter only their personal number and password to access electronic services.',
    basicDesc2: 'This type of eKey can be created online and will be available for immediate use. However, due to the lack of fingerprint verification, access will be limited to a smaller number of services. You can upgrade to the advanced level at any time by visiting the nearest electronic services center.',
    basicRegister: 'Register now for the Basic Level eKey!',
    gccRegister: 'Register now for the eKey account for GCC citizens!',
    advancedTitle: 'Advanced Level eKey',
    advancedDesc: 'Registration in the advanced level of eKey ensures the highest levels of security and allows access to highly confidential electronic services that require identity card verification along with biometric measurements (fingerprints).',
    advancedDesc2: 'To complete the registration process, users can visit one of the',
    advancedKiosk: 'eGovernment Kiosks',
    advancedOr: 'or one of the',
    advancedCenters: 'Electronic Service Centers',
    advancedOnce: 'once only, with the need to bring the identity card.',
  }
};

export default function ManageAccount() {
  const [, setLocation] = useLocation();
  const [lang, setLang] = useState<Lang>('ar');

  useEffect(() => {
    navigateToPage('إدارة حساب المفتاح الإلكتروني');
  }, []);

  const t = content[lang];
  const isRtl = lang === 'ar';

  const tabKeys: TabKey[] = ['home', 'about', 'manage', 'services', 'contact', 'faq'];

  const handleTabClick = (key: TabKey) => {
    if (key === 'home') {
      setLocation('/');
    }
    // Other tabs stay on this page or could navigate
  };

  const handleBasicRegister = () => {
    setLocation('/basic-registration');
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
                  <a href="#" onClick={(e) => { e.preventDefault(); if (key === 'manage') { setLocation('/login'); } else { handleTabClick(key); } }}>{t.tabs[key]}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Page Title Bar */}
      <div className="manage-title-bar">
        <div className="manage-title-bar-line"></div>
        <h1 className="manage-title-text">{t.pageTitle}</h1>
      </div>

      {/* Two Column Content */}
      <div className="manage-content">
        <div className="ekey-container">
          <div className="manage-columns">
            {/* Right Column - eKey 2.0 */}
            <div className="manage-column manage-column-right">
              <h2 className="manage-section-title manage-title-blue">{t.ekey2Title}</h2>
              <p>{t.ekey2Desc}</p>
              <p>{t.ekey2Download} <a href="https://bahrain.bh/apps" target="_blank" rel="noopener noreferrer">bahrain.bh/apps</a> {t.ekey2Or}</p>
              <p>{t.ekey2Note}</p>
              <p>{t.ekey2Help} <strong>{t.ekey2Phone}</strong>.</p>
            </div>

            {/* Left Column - Current eKey */}
            <div className="manage-column manage-column-left">
              <h2 className="manage-section-title">{t.currentTitle}</h2>

              <h3 className="manage-subsection-title">{t.basicTitle}</h3>
              <p>{t.basicDesc}</p>
              <p>{t.basicDesc2}</p>
              <p className="manage-register-link">
                <a href="#" onClick={(e) => { e.preventDefault(); handleBasicRegister(); }}>{t.basicRegister}</a>
              </p>
              <p className="manage-register-link">
                <a href="#" onClick={(e) => { e.preventDefault(); setLocation('/gcc-registration'); }}>{t.gccRegister}</a>
              </p>

              <h3 className="manage-subsection-title">{t.advancedTitle}</h3>
              <p>{t.advancedDesc}</p>
              <p>
                {t.advancedDesc2} <a href="#">{t.advancedKiosk}</a> {t.advancedOr} <a href="#">{t.advancedCenters}</a> {t.advancedOnce}
              </p>
            </div>
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
