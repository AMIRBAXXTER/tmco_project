"use client";
import { useState, useEffect } from "react";
import LinkList from "./HeaderLink";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ✅ هندل اسکرول فقط زمانی که window وجود دارد
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => setScrolled(window.scrollY > 0);

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // مقدار اولیه

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ هندل ریسایز مخصوص موبایل/دسکتاپ
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* 📦 هدر دسکتاپ */}
      <header
        className={`fixed ${scrolled
            ? "top-0 h-12 bg-[#254662]/40 backdrop-blur-sm"
            : "top-10 bg-[#254662]"
          } left-1/2 -translate-x-1/2 w-4/5 lg:w-3/5 z-50 hidden md:flex justify-between items-center shadow-2xl rounded-md py-2 px-6 transition-all duration-300`}
      >
        {/* ستون راست: لوگو */}
        <div
          className={`flex ${scrolled
              && "w-7"
            } items-center justify-start`}
        >
          <Image
            src="/logofull.svg"
            alt="لوگوی شرکت"
            width={40}
            height={40}
            priority
          />
        </div>

        {/* ستون وسط: لینک‌ها */}
        <div className="flex gap-6 w-full justify-center">
          <LinkList />
        </div>
      </header>

      {/* 📱 هدر موبایل */}
      <button
        onClick={() => setMenuOpen(true)}
        className="fixed top-4 right-4 z-50 text-[#1D324A] text-3xl md:hidden"
      >
        <HiMenu />
      </button>

      <header className="absolute top-4 left-4 z-50 flex justify-center drop-shadow-[0_2px_4px_rgba(255,255,255,1)] md:hidden">
        <Image
          src="/logofull.svg"
          alt="لوگوی شرکت"
          width={40}
          height={40}
          priority
        />
      </header>

      {/* بک‌دراپ */}
      {menuOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* منوی موبایل */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#254662] text-white z-50 transform transition-transform duration-300 ${menuOpen
            ? "translate-x-0"
            : "translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-white/20">
          <button onClick={() => setMenuOpen(false)} className="text-3xl">
            <HiX />
          </button>
        </div>

        {/* لینک‌ها */}
        <div className="flex flex-col items-start px-6 space-y-4 mt-4">
          <LinkList
            onLinkClick={menuOpen ? () => setMenuOpen(false) : undefined}
          />
        </div>
      </div>
    </>
  );
}
