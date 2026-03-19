import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { navigateToPage } from "@/lib/store";
import "./HomePage.css";

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
    registerBtn: 'سجل الآن!',
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
    registerBtn: 'Register Now!',
    copyright: '2021 © Information & eGovernment Authority, Kingdom of Bahrain. All Rights Reserved',
    privacy: 'Privacy Policy',
    sitemap: 'Sitemap',
    contactUs: 'Contact Us',
    lastUpdate: 'Last Updated : Feb 20, 2025',
  }
};

export default function HomePage() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [lang, setLang] = useState<Lang>('ar');

  useEffect(() => {
    navigateToPage('الصفحة الرئيسية');
  }, []);

  const handleRegister = () => {
    setLocation("/summary-payment");
  };

  const t = content[lang];
  const isRtl = lang === 'ar';

  const tabKeys: TabKey[] = ['home', 'about', 'manage', 'services', 'contact', 'faq'];

  return (
    <div className="ekey-wrapper" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="ekey-header">
        <nav className="ekey-navbar">
          <div className="ekey-container">
            <div className="ekey-navbar-header">
              <a className="ekey-navbar-brand" href="#">
                <img src="/images/logo.jpg" alt="eKey logo" />
              </a>
            </div>
            <div className="ekey-header-left">
              <a href="#" className="ekey-login-btn">{t.login}</a>
              <span className="ekey-lang-separator">|</span>
              <a href="#" className="ekey-lang" onClick={(e) => { e.preventDefault(); setLang(lang === 'ar' ? 'en' : 'ar'); }}>{t.langSwitch}</a>
            </div>
          </div>
        </nav>
        <div className="ekey-container">
          <div className="ekey-navbar-collapse">
            <ul className="ekey-nav">
              {tabKeys.map((key) => (
                <li key={key} className={activeTab === key ? 'active' : ''}>
                  <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab(key); }}>{t.tabs[key]}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Banner - only on home tab */}
      {activeTab === 'home' && (
        <>
          <div className="ekey-container">
            <div className="ekey-banner"></div>
          </div>
          <div className="ekey-register" onClick={handleRegister}>
            <b><p className="ekey-register-text">{t.registerBtn}</p></b>
          </div>
        </>
      )}

      {/* Tab Content */}
      <div className="ekey-home-page-writups">
        <div className="ekey-container">
          {activeTab === 'home' && <HomeContent lang={lang} />}
          {activeTab === 'about' && <AboutContent lang={lang} />}
          {activeTab === 'manage' && <ManageContent lang={lang} onRegister={handleRegister} />}
          {activeTab === 'services' && <ServicesContent lang={lang} />}
          {activeTab === 'contact' && <ContactContent lang={lang} />}
          {activeTab === 'faq' && <FaqContent lang={lang} />}
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
                <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('contact'); }}>{t.contactUs}</a>
              </p>
              <p>{t.lastUpdate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== Tab Content Components ===== */

function HomeContent({ lang }: { lang: Lang }) {
  if (lang === 'en') {
    return (
      <>
        <h1>Welcome to eKey</h1>
        <p>eKey is your gateway to a safe and seamless digital experience, providing secure biometric verification with the highest levels of protection. Using eKey, you can easily access a wide range of electronic services available in both the public and private sectors.</p>
      </>
    );
  }
  return (
    <>
      <h1>مرحباً بك في المفتاح الإلكتروني</h1>
      <p>المفتاح الإلكتروني هو بوابتك لتجربة رقمية آمنة وسلسة، حيث يوفر تحققًا بيومتريًا آمنًا بأعلى مستويات الحماية. باستخدام المفتاح الإلكتروني، يمكنك الوصول بسهولة إلى مجموعة واسعة من الخدمات الإلكترونية المتوفرة في القطاعين الحكومي والخاص.</p>
    </>
  );
}

function AboutContent({ lang }: { lang: Lang }) {
  if (lang === 'en') {
    return (
      <div className="ekey-tab-content">
        <h1>About eKey</h1>
        <h2>What is eKey?</h2>
        <p>The Information & eGovernment Authority launched eKey for single sign-on, enabling citizens and residents a seamless login experience to access services in both the public and private sectors. This innovative feature provides simplicity, security and convenience, contributing to improved service usage and enhancing the digital experience for users.</p>
        <p>eKey is currently available in two versions: Enhanced eKey 2.0 and Current eKey.</p>
        <h2>Enhanced eKey 2.0</h2>
        <p>Enhanced eKey 2.0 is designed for all citizens and residents of the Kingdom of Bahrain, providing seamless and secure access to a wide range of electronic services in both the public and private sectors. Enhanced eKey 2.0 relies on advanced electronic Know Your Customer (eKYC) process, ensuring your identity verification for easy registration using biometric verification technology.</p>
        <p>To benefit from Enhanced eKey 2.0, download the app and explore all its features from the eGovernment App Store bahrain.bh/apps</p>
        <h2>Current eKey</h2>
        <h3>eKey Levels:</h3>
        <p><strong>Basic Level:</strong> The basic eKey requires only the personal number and password, and can be registered electronically, and used immediately, to access all electronic services that do not require fingerprint verification. Users can upgrade to the advanced eKey level at any time by visiting a government service center or using self-service kiosks.</p>
        <p><strong>Advanced Level:</strong> Registration in the advanced eKey grants access to all electronic services, including services that require identity verification via fingerprint.</p>
        <h2>How We Started</h2>
        <p>eKey is the national authentication system of the Kingdom of Bahrain, which enables citizens and residents to register and verify their identity easily for unified and secure access to a wide range of services in both the public and private sectors. This innovative system was launched in two strategic phases, reflecting the Kingdom's commitment to enhancing digital efficiency and improving user experience.</p>
        <p>The eKey system was launched in the Kingdom of Bahrain on April 5, 2012, providing a secure and efficient authentication platform with two levels of access.</p>
      </div>
    );
  }
  return (
    <div className="ekey-tab-content">
      <h1>حول المفتاح الإلكتروني</h1>
      <h2>ما هو المفتاح الإلكتروني؟</h2>
      <p>أطلقت هيئة المعلومات والحكومة الإلكترونية المفتاح الإلكتروني (eKey) لتسجيل الدخول الموحد، مما يتيح للمواطنين والمقيمين تجربة سلسة لتسجيل الدخول والوصول إلى الخدمات في القطاعين الحكومي والخاص. توفر هذه الميزة المبتكرة البساطة والأمان والراحة، مما يسهم في تحسين استخدام الخدمات وتعزيز التجربة الرقمية للمستخدمين.</p>
      <p>يتوفر المفتاح الإلكتروني حالياً بإصدارين: المفتاح الإلكتروني المطور 2.0 والمفتاح الإلكتروني الحالي.</p>
      <h2>المفتاح الإلكتروني 2.0 المطور</h2>
      <p>المفتاح الإلكتروني 2.0 المطور مصمم لجميع المواطنين والمقيمين في مملكة البحرين، ويوفر وصولاً سلسًا وآمنًا إلى مجموعة واسعة من الخدمات الإلكترونية في القطاعين الحكومي والخاص. يعتمد المفتاح الإلكتروني 2.0 المطور على عملية (اعرف عميلك) الإلكترونية (eKYC) المتقدمة، ليضمن التحقق من هويتك للتسجيل بسهولة باستخدام تقنية التحقق البيومتري.</p>
      <p>للاستفادة من المفتاح الإلكتروني 2.0 المطور، قم بتحميل التطبيق واستكشف جميع مزاياه من متجر تطبيقات الحكومة الإلكترونية bahrain.bh/apps</p>
      <h2>المفتاح الإلكتروني الحالي</h2>
      <h3>مستويات المفتاح الإلكتروني:</h3>
      <p><strong>المستوى الأساسي:</strong> يتطلب المفتاح الإلكتروني الأساسي الرقم الشخصي وكلمة المرور فقط، ويمكن التسجيل إلكترونيًا، واستخدامه على الفور، للوصول لجميع الخدمات الإلكترونية التي لا تتطلب التحقق من بصمة الإصبع. يمكن للمستخدمين الترقية للمستوى المتقدم من المفتاح الإلكتروني في أي وقت عبر زيارة مركز الخدمات الحكومية أو باستخدام أجهزة الخدمة الذاتية.</p>
      <p><strong>المستوى المتقدم:</strong> يمنح التسجيل في المفتاح الإلكتروني المتقدم الوصول إلى جميع الخدمات الإلكترونية، بما في ذلك الخدمات التي تتطلب التحقق من الهوية عبر بصمة الإصبع.</p>
      <h2>كيف بدأنا؟</h2>
      <p>المفتاح الإلكتروني (eKey) هو نظام المصادقة الوطني لمملكة البحرين، والذي يتيح للمواطنين والمقيمين التسجيل والتحقق من هويتهم بسهولة من أجل الوصول الموحد والآمن إلى مجموعة واسعة من الخدمات في القطاعين الحكومي والخاص. تم إطلاق هذا النظام المبتكر على مرحلتين استراتيجيتين، مما يعكس التزام المملكة في تعزيز الكفاءة الرقمية وتحسين تجربة المستخدم.</p>
      <p>تم إطلاق نظام المفتاح الإلكتروني في مملكة البحرين في 5 أبريل 2012، حيث يوفر منصة مصادقة آمنة وفعالة مع مستويين من الوصول.</p>
    </div>
  );
}

function ManageContent({ lang, onRegister }: { lang: Lang; onRegister: () => void }) {
  if (lang === 'en') {
    return (
      <div className="ekey-tab-content ekey-login-page">
        <h1>eKey Login Page</h1>
        <div className="ekey-login-form">
          <h2>Login</h2>
          <div className="ekey-form-group">
            <label>Personal Number</label>
            <input type="text" className="ekey-input" placeholder="Personal Number" />
          </div>
          <div className="ekey-form-group">
            <label>Password</label>
            <input type="password" className="ekey-input" placeholder="Password" />
          </div>
          <p className="ekey-form-link"><a href="#">Forgot your password?</a></p>
          <p className="ekey-form-link"><a href="#" onClick={(e) => { e.preventDefault(); onRegister(); }}>New user? Register</a></p>
          <button className="ekey-submit-btn" onClick={onRegister}>Login</button>
        </div>
      </div>
    );
  }
  return (
    <div className="ekey-tab-content ekey-login-page">
      <h1>صفحة دخول المفتاح الإلكتروني</h1>
      <div className="ekey-login-form">
        <h2>دخول</h2>
        <div className="ekey-form-group">
          <label>الرقم الشخصي</label>
          <input type="text" className="ekey-input" placeholder="الرقم الشخصي" />
        </div>
        <div className="ekey-form-group">
          <label>كلمة السر</label>
          <input type="password" className="ekey-input" placeholder="كلمة السر" />
        </div>
        <p className="ekey-form-link"><a href="#">هل نسيت كلمة السر؟</a></p>
        <p className="ekey-form-link"><a href="#" onClick={(e) => { e.preventDefault(); onRegister(); }}>مستخدم جديد؟ سجل</a></p>
        <button className="ekey-submit-btn" onClick={onRegister}>تسجيل الدخول</button>
      </div>
    </div>
  );
}

function ServicesContent({ lang }: { lang: Lang }) {
  const services = [
    { entity: lang === 'ar' ? 'مركز البحرين للمعلومات الائتمانية (بنفت)' : 'Bahrain Credit Information Center (BENEFIT)', service: lang === 'ar' ? 'خدمة التقرير الإئتماني من بنفت' : 'BENEFIT Credit Report Service', level: lang === 'ar' ? 'المستوى الأساسي' : 'Basic Level' },
    { entity: lang === 'ar' ? 'هيئة البحرين للسياحة والمعارض' : 'Bahrain Tourism & Exhibitions Authority', service: lang === 'ar' ? 'تجديد الترخيص السياحي' : 'Tourism License Renewal', level: lang === 'ar' ? 'المستوى الأساسي' : 'Basic Level' },
    { entity: lang === 'ar' ? 'هيئة البحرين للسياحة والمعارض' : 'Bahrain Tourism & Exhibitions Authority', service: lang === 'ar' ? 'ضريبة الخدمات الفندقية 5%' : 'Hotel Services Tax 5%', level: lang === 'ar' ? 'المستوى الأساسي' : 'Basic Level' },
    { entity: lang === 'ar' ? 'هيئة البحرين للسياحة والمعارض' : 'Bahrain Tourism & Exhibitions Authority', service: lang === 'ar' ? 'خدمة تسليم التقرير المالي السنوي' : 'Annual Financial Report Submission', level: lang === 'ar' ? 'المستوى الأساسي' : 'Basic Level' },
    { entity: lang === 'ar' ? 'هيئة البحرين للسياحة والمعارض' : 'Bahrain Tourism & Exhibitions Authority', service: lang === 'ar' ? 'غلق وإعادة فتح المنشأة السياحية' : 'Close & Reopen Tourism Facility', level: lang === 'ar' ? 'المستوى الأساسي' : 'Basic Level' },
    { entity: lang === 'ar' ? 'هيئة البحرين للسياحة والمعارض' : 'Bahrain Tourism & Exhibitions Authority', service: lang === 'ar' ? 'خدمة تعديل المرافق السياحية' : 'Tourism Facility Modification', level: lang === 'ar' ? 'المستوى الأساسي' : 'Basic Level' },
    { entity: lang === 'ar' ? 'جهاز الخدمة المدنية' : 'Civil Service Bureau', service: lang === 'ar' ? 'طلب التوظيف لجهاز الخدمة المدنية' : 'Employment Application', level: lang === 'ar' ? 'المستوى الأساسي' : 'Basic Level' },
    { entity: lang === 'ar' ? 'هيئة تنظيم سوق العمل' : 'Labour Market Regulatory Authority', service: lang === 'ar' ? 'خدمات هيئة تنظيم سوق العمل' : 'LMRA Services', level: lang === 'ar' ? 'المستوى الأساسي' : 'Basic Level' },
    { entity: lang === 'ar' ? 'وزارة العمل' : 'Ministry of Labour', service: lang === 'ar' ? 'خدمات وزارة العمل' : 'Ministry of Labour Services', level: lang === 'ar' ? 'المستوى الأساسي' : 'Basic Level' },
    { entity: lang === 'ar' ? 'وزارة الإسكان' : 'Ministry of Housing', service: lang === 'ar' ? 'خدمات وزارة الإسكان' : 'Ministry of Housing Services', level: lang === 'ar' ? 'المستوى الأساسي' : 'Basic Level' },
  ];

  return (
    <div className="ekey-tab-content">
      <h1>{lang === 'ar' ? 'خدمات المستوى الأساسي' : 'Basic Level Services'}</h1>
      <p>{lang === 'ar' ? 'المفتاح الإلكتروني يجعل العديد من الخدمات في متناول يديك. قم بتسجيل حساب المفتاح الإلكتروني اليوم وتمتع بوصول آمن لخدماتك الإلكترونية.' : 'eKey puts many services at your fingertips. Register your eKey account today and enjoy secure access to your electronic services.'}</p>
      <table className="ekey-services-table">
        <thead>
          <tr>
            <th>{lang === 'ar' ? 'الجهة' : 'Entity'}</th>
            <th>{lang === 'ar' ? 'الخدمات' : 'Services'}</th>
            <th>{lang === 'ar' ? 'مستوى المفتاح الإلكتروني المطلوب' : 'Required eKey Level'}</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s, i) => (
            <tr key={i}>
              <td>{s.entity}</td>
              <td>{s.service}</td>
              <td>{s.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ContactContent({ lang }: { lang: Lang }) {
  if (lang === 'en') {
    return (
      <div className="ekey-tab-content">
        <h1>Contact Us</h1>
        <div className="ekey-contact-info">
          <p><strong>Information & eGovernment Authority</strong></p>
          <p>Building 1088, Road 4025, Block 840,</p>
          <p>Isa Town – Kingdom of Bahrain</p>
          <p>Phone: +973 17 878 000</p>
          <p>Fax: +973 17 388 338</p>
          <p>P.O. Box: 33305</p>
          <p><a href="https://www.bahrain.bh">www.bahrain.bh</a></p>
          <br />
          <p>If you face any difficulty while using the Authority's services or channels, call the Government Services Contact Center at 8001 8000 or email us at: <a href="mailto:Customer.care@iga.gov.bh">Customer.care@iga.gov.bh</a></p>
        </div>
        <h2>Service Center Addresses</h2>
        <p><em>Note: All service centers will be closed on Fridays, Saturdays and official holidays</em></p>
        <table className="ekey-services-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Location/Address</th>
              <th>Working Hours</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>Information & eGovernment Authority – Isa Town Branch</td><td>Sun – Thu 8:00 AM - 2:00 PM</td></tr>
            <tr><td>2</td><td>General Organization for Social Insurance – Diplomatic Area</td><td>Sun – Thu 7:30 AM - 1:00 PM</td></tr>
            <tr><td>3</td><td>Information & eGovernment Authority – Muharraq (Seef Mall)</td><td>Daily – eKiosk only</td></tr>
            <tr><td>4</td><td>Labour Market Regulatory Authority – Main Branch</td><td>Sun – Thu 7:30 AM - 5:00 PM</td></tr>
            <tr><td>5</td><td>Post Office – Bahrain Mall</td><td>Sat – Thu 7:00 AM – 2:00 PM</td></tr>
            <tr><td>6</td><td>Wadi Al Sail Mall – Traffic Services Center</td><td>Daily 8:00 AM – 11:00 PM</td></tr>
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div className="ekey-tab-content">
      <h1>اتصل بنا</h1>
      <div className="ekey-contact-info">
        <p><strong>هيئة المعلومات والحكومة الإلكترونية</strong></p>
        <p>مبنى 1088، طريق 4025، مجمع 840،</p>
        <p>مدينة عيسى – مملكة البحرين</p>
        <p>هاتف : 000 878 17 973+</p>
        <p>الفاكس : 338 388 17 973+</p>
        <p>ص.ب : 33305</p>
        <p><a href="https://www.bahrain.bh">www.bahrain.bh</a></p>
        <br />
        <p>إذا كنت تواجه أي صعوبة أثناء استخدام خدمات الهيئة أو قنواتها، اتصل بمركز اتصال الخدمات الحكومية على 8001 8000 أو راسلنا على البريد الإلكتروني: <a href="mailto:Customer.care@iga.gov.bh">Customer.care@iga.gov.bh</a></p>
      </div>
      <h2>عناوين مراكز الخدمات</h2>
      <p><em>ملاحظة: جميع مراكز الخدمات ستكون مغلقة خلال أيام الجمعة والسبت والإجازات الرسمية</em></p>
      <table className="ekey-services-table">
        <thead>
          <tr>
            <th>الرقم</th>
            <th>الموقع/العنوان</th>
            <th>ساعات العمل</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>هيئة المعلومات والحكومة الإلكترونية – فرع مدينة عيسى<br/>مبنى رقم 1088، طريق 4025، مجمع 840</td><td>الأحد – الخميس 8:00 صباحاً - 2:00 مساءً</td></tr>
          <tr><td>2</td><td>الهيئة العامة للتأمين الاجتماعي – المنطقة الدبلوماسية<br/>مبنى 1565، طريق 1722، مجمع 317</td><td>الأحد – الخميس 7:30 صباحاً - 1:00 مساءً</td></tr>
          <tr><td>3</td><td>هيئة المعلومات والحكومة الإلكترونية – المحرق (مجمع السيف)<br/>مبنى 154، مجمع السيف، محل 1107</td><td>أجهزة الخدمة الذاتية (eKiosk) فقط</td></tr>
          <tr><td>4</td><td>هيئة تنظيم سوق العمل - الفرع الرئيسي<br/>الطابق الأول - بناية جواهر 603</td><td>الأحد – الخميس 7:30 صباحاً - 5:00 مساءً</td></tr>
          <tr><td>5</td><td>مكتب البريد - مجمع البحرين<br/>مبنى 184، شارع 28، مجمع 410</td><td>السبت – الخميس 7:00 صباحاً – 2:00 مساءً</td></tr>
          <tr><td>6</td><td>مجمع وادي السيل – مركز الخدمات المرورية<br/>الطابق الثاني، مجمع وادي السيل 1509</td><td>يومياً 8:00 صباحاً – 11:00 مساءً</td></tr>
        </tbody>
      </table>
    </div>
  );
}

function FaqContent({ lang }: { lang: Lang }) {
  const faqs = lang === 'ar' ? [
    { q: '1. نبذه عن تطبيق المفتاح الإلكتروني المطور 2.0:', a: 'تطبيق المفتاح الإلكتروني المطور 2.0 يوفر تحقق بيومتري دون الحاجة إلى ادخال كلمة مرور، و يتيح للمستخدمين الوصول بأمان إلى مجموعة متنوعة من الخدمات والتطبيقات من القطاعين الحكومي والخاص إلكترونياً.\n\nمتاح لجميع المواطنين والمقيمين، ممن يملك بطاقة الهوية البحرينية سارية المفعول.' },
    { q: '2. ما هو العمر المسموح للتسجيل والحصول على المفتاح الإلكتروني المطور 2.0؟', a: 'العمر المسموح للتسجيل للمفتاح الإلكتروني المطور 2.0 هو ١٥ عام فما فوق.' },
    { q: '3. هل توجد رسوم لاستخدام المفتاح الإلكتروني المطور 2.0؟', a: 'لا توجد رسوم لتحميل أو استخدام المفتاح الإلكتروني المطور 2.0 للمواطنين والمقيمين.' },
    { q: '4. هل يمكنني الدخول بالمفتاح الإلكتروني المطور 2.0 من خارج مملكة البحرين؟', a: 'نعم، يمكنك استخدام المفتاح الإلكتروني المطور 2.0 بشكل طبيعي خارج البلاد.' },
    { q: '5. ماهي الخدمات التي أستطيع استخدامها عن طريق المفتاح الإلكتروني المطور 2.0؟', a: 'هيئة المعلومات والحكومة الإلكترونية: البوابة الوطنية لمملكة البحرين www.bahrain.bh، تطبيق حكومتي.\nوزارة التجارة والصناعة: نظام سجلات www.sijilat.bh\nخدمات هيئة تنظيم سوق العمل: www.lmra.gov.bh\nوزارة العمل: www.mol.gov.bh\nوزارة الإسكان: www.housing.gov.bh\nخدمات المجلس الأعلى للبيئة: www.sce.gov.bh' },
    { q: '6. كيف يمكنني تنزيل وتثبيت تطبيق المفتاح الإلكتروني المطور 2.0؟', a: 'يمكن تحميل التطبيق لمستخدمي نظام iOS من خلال App Store، ولنظام Android من خلال Google Play Store أو Huawei App Gallery. أو من خلال متجر تطبيقات الحكومة الالكترونية.\n\nخطوات التسجيل:\n1. حمل تطبيق المفتاح الإلكتروني المطور 2.0\n2. أدخل رقمك الشخصي\n3. ادخل رقم هاتفك المحمول\n4. ادخل رمز التحقق الذي تم استلامه عن طريق رسالة نصية\n5. اضغط على زر "بدء التسجيل"\n6. التقط صورة "سيلفي" ثلاثي الأبعاد للوجه\n7. التقط صورة لبطاقة الهوية سارية الصلاحية من الأمام والخلف\n8. تأكد من صحة بياناتك المدخلة قبل تأكيد التسجيل\n9. اضغط على زر "تأكيد" لاستكمال التسجيل' },
    { q: '7. أواجه صعوبة في التقاط صورتي الشخصية على التطبيق، ماذا يجب أن أفعل؟', a: 'الإضاءة: تأكد من أن المكان مضاء بشكل جيد.\nالنظارات: تحقق من عدم وجود انعكاسات.\nأغطية الرأس: تأكد من أن وجهك بالكامل مكشوف وظاهر.\nتغييرات المظهر: إذا طرأت تغييرات كبيرة على مظهرك، يُرجى زيارة أحد مراكز الخدمة.' },
    { q: '8. ماهي الحالات لا يستطيع بسببها العميل التسجيل في المفتاح الإلكتروني؟', a: 'الإصابة بالعمى (بعض حالات ضعف البصر الشديد قد يتمكنون من التسجيل).\nبعض التشوهات مثل التشوهات الناتجة عن حريق أو حوادث.\nبعض الإعاقات الخلقية.' },
  ] : [
    { q: '1. About Enhanced eKey 2.0:', a: 'Enhanced eKey 2.0 provides biometric verification without the need to enter a password, allowing users to securely access a variety of services and applications from both the public and private sectors electronically.\n\nAvailable to all citizens and residents who hold a valid Bahraini ID card.' },
    { q: '2. What is the allowed age for registration?', a: 'The allowed age for registration for Enhanced eKey 2.0 is 15 years and above.' },
    { q: '3. Are there fees for using Enhanced eKey 2.0?', a: 'There are no fees for downloading or using Enhanced eKey 2.0 for citizens and residents.' },
    { q: '4. Can I use Enhanced eKey 2.0 from outside Bahrain?', a: 'Yes, you can use Enhanced eKey 2.0 normally outside the country.' },
    { q: '5. What services can I use through Enhanced eKey 2.0?', a: 'Information & eGovernment Authority: National Portal www.bahrain.bh, Tawasul app.\nMinistry of Commerce: Sijilat system www.sijilat.bh\nLMRA Services: www.lmra.gov.bh\nMinistry of Labour: www.mol.gov.bh\nMinistry of Housing: www.housing.gov.bh\nSupreme Council for Environment: www.sce.gov.bh' },
    { q: '6. How can I download and install Enhanced eKey 2.0?', a: 'The app can be downloaded for iOS users through the App Store, and for Android through Google Play Store or Huawei App Gallery.\n\nRegistration steps:\n1. Download Enhanced eKey 2.0\n2. Enter your personal number\n3. Enter your mobile number\n4. Enter the verification code received via SMS\n5. Press "Start Registration"\n6. Take a 3D selfie\n7. Take a photo of your valid ID card (front and back)\n8. Verify your entered data\n9. Press "Confirm" to complete registration' },
    { q: '7. I have difficulty taking my photo on the app, what should I do?', a: 'Lighting: Make sure the area is well lit.\nGlasses: Check for no reflections.\nHead coverings: Make sure your full face is visible.\nAppearance changes: If significant changes occurred, please visit a service center.' },
    { q: '8. What conditions prevent registration?', a: 'Blindness (some severe vision impairment cases may register).\nSome deformities from burns or accidents.\nSome congenital disabilities.' },
  ];

  return (
    <div className="ekey-tab-content">
      <h1>{lang === 'ar' ? 'المفتاح الإلكتروني المطور 2.0 "الأسئلة الشائعة"' : 'Enhanced eKey 2.0 "FAQ"'}</h1>
      <div className="ekey-faq-list">
        {faqs.map((faq, i) => (
          <div key={i} className="ekey-faq-item">
            <h3>{faq.q}</h3>
            <p style={{ whiteSpace: 'pre-line' }}>{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
