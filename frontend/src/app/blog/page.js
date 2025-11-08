"use client";
import { useState, useEffect, Suspense } from "react";
import LuminousGrid from "@/components/Layout/LuminousGrid";
import SearchCategory from "./components/SearchCategory";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  // بررسی سایز صفحه برای تشخیص موبایل یا دسکتاپ
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // اجرا در بار اول
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="bg-white min-h-screen">
      <Suspense fallback={<p className="text-gray-500 text-center mt-10">در حال بارگذاری...</p>}>
        <SearchCategory />
      </Suspense>
      {/* <LuminousGrid /> */}
    </main>
  );
}
