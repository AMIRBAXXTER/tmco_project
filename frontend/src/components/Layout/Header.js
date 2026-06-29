"use client";

import { useState, useEffect } from "react";
import LinkList from "./HeaderLink";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";
import { usePathname } from "next/navigation";

const HIDE_HEADER_ROUTES = ["/invitation"];

export default function Header() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // بررسی اسکرول صفحه
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // بستن منوی موبایل در حالت دسکتاپ
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // بستن منوی موبایل هنگام تغییر مسیر
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // شرط باید بعد از هوک‌ها قرار بگیرد
  if (HIDE_HEADER_ROUTES.some((route) => pathname.startsWith(route))) {
    return null;
  }

  return (
    <>
      {/* هدر دسکتاپ */}
      <header
        className={`fixed left-1/2 z-50 hidden -translate-x-1/2 items-center justify-between rounded-md px-4 py-2 shadow-2xl transition-all duration-300 md:flex lg:px-6 ${
          scrolled
            ? "top-0 h-14 bg-[#254662]/80 backdrop-blur-md"
            : "top-10 bg-[#254662]"
        } w-[90%] lg:w-4/5 xl:w-3/5`}
      >
        {/* لوگو */}
        <div
          className={`flex shrink-0 items-center justify-start ${
            scrolled ? "w-8" : "w-10"
          }`}
        >
          <Image
            src={scrolled ? "/logofull.png" : "/logofull.svg"}
            alt="لوگوی شرکت"
            width={40}
            height={40}
            priority
          />
        </div>

        {/* لینک‌های اصلی */}
        <nav className="mx-3 flex min-w-0 flex-1 items-center justify-center gap-3 lg:gap-6">
          <LinkList />
        </nav>

        {/* لینک کاتالوگ در دسکتاپ */}
        <a
          href="/catalog/"
          className="shrink-0 whitespace-nowrap rounded-md border border-white/40 bg-white/10 px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-white hover:text-[#254662] lg:px-4"
        >
          کاتالوگ
        </a>
      </header>

      {/* دکمه بازکردن منوی موبایل */}
      {!menuOpen && (
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="بازکردن منو"
          className="fixed right-4 top-4 z-50 text-3xl text-[#1D324A] md:hidden"
        >
          <HiMenu />
        </button>
      )}

      {/* لوگوی موبایل */}
      <header className="absolute left-4 top-4 z-30 flex justify-center drop-shadow-[0_2px_4px_rgba(255,255,255,1)] md:hidden">
        <Image
          src="/logofull.png"
          alt="لوگوی شرکت"
          width={40}
          height={40}
          priority
        />
      </header>

      {/* پس‌زمینه منوی موبایل */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* منوی موبایل */}
      <aside
        className={`fixed right-0 top-0 z-50 h-dvh w-72 max-w-[85vw] transform bg-[#254662] text-white shadow-2xl transition-transform duration-300 md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/20 p-4">
          <span className="text-sm font-medium">منوی سایت</span>

          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="بستن منو"
            className="text-3xl"
          >
            <HiX />
          </button>
        </div>

        <nav className="flex flex-col items-stretch gap-4 px-6 py-6">
          <div className="flex flex-col items-start gap-4">
            <LinkList onLinkClick={() => setMenuOpen(false)} />
          </div>

          {/* لینک کاتالوگ در موبایل */}
          <a
            href="/catalog/"
            onClick={() => setMenuOpen(false)}
            className="mt-2 block w-full rounded-md border border-white/30 bg-white/10 px-4 py-3 text-center font-medium text-white transition-colors duration-200 hover:bg-white hover:text-[#254662]"
          >
            مشاهده کاتالوگ
          </a>
        </nav>
      </aside>
    </>
  );
}

