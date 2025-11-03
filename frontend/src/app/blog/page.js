"use client";
import { useState, useEffect } from "react";
import LuminousGrid from "@/components/Layout/LuminousGrid";
import SearchCategory from "./components/SearchCategory";
import BlogCarousel from "@/components/BlogCarousel";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  // بررسی سایز صفحه برای تشخیص موبایل یا دسکتاپ
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // کمتر از 768px یعنی موبایل
    };
    handleResize(); // اجرا در بار اول
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <LuminousGrid />
      <SearchCategory />
    </>
  );
}
