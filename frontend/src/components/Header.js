"use client";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import LinkList from "./HeaderLink";
import LoginForm from "./LoginForm";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa6";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLogin, setIsLogin } = useContext(AuthContext);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [scrolled, setScrolled] = useState(false);



  const handleLoginSuccess = () => {
    setIsLogin(true);
    setShowLoginForm(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
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

  return (
    <>
      <svg width="0" height="0">
        <clipPath
          id="loginShape"
          clipPathUnits="objectBoundingBox"
          transform="scale(0.0017094, 0.001332)"
        >
          <path d="M0 16C0 7.16343 7.16344 0 16 0H190.226C196.04 0 201.397 3.15396 204.217 8.23809L214.494 26.7619C217.314 31.846 222.671 35 228.485 35H368.33C373.814 35 378.916 32.1914 381.849 27.5577L394.583 7.44228C397.516 2.80862 402.618 0 408.102 0H569C577.837 0 585 7.16344 585 16V735C585 743.837 577.837 751 569 751H16C7.16344 751 0 743.837 0 735V16Z" />
        </clipPath>
      </svg>

      {/* هدر دسکتاپ */}
      <header
        className={`fixed ${scrolled ? "top-0 bg-[#254662]/40 backdrop-blur-sm" : "top-10 bg-[#254662]"
          } left-1/2 -translate-x-1/2 w-4/5 lg:w-3/5 z-50 hidden md:flex justify-between items-center shadow-2xl rounded-md py-2 px-6 transition-all duration-300`}
      >
        {/* ستون راست: لوگو */}
        <div className="flex items-center justify-start">
          <Image src="/header_logo.svg" alt="لوگوی شرکت" width={40} height={40} />
        </div>

        {/* ستون وسط: لینک‌ها */}
        <div className="flex gap-6 justify-center">
          <LinkList />
        </div>

        {/* ستون چپ: ورود یا پروفایل */}
        <div className="flex items-center justify-end relative">
          {isLogin ? (
            <a
              href="profile"
              className="w-10 h-10 bg-[#001230A8] flex items-center justify-center rounded-md"
            >
              <FaRegUser className="text-white" />
            </a>
          ) : (
            <button
              className="bg-[#001230A8] text-white px-3 py-1 rounded-md cursor-pointer"
              onClick={() => setShowLoginForm((prev) => !prev)}
            >
              ورود
            </button>
          )}

          {/* فرم ورود دسکتاپ */}
          {showLoginForm && !isLogin && (
            <LoginForm
              variant="desktop"
              onSuccess={handleLoginSuccess}
              onClose={() => setShowLoginForm(false)}
            />
          )}
        </div>
      </header>

      {/* هدر موبایل */}
      {/* دکمه منوی همبرگری - ثابت */}
      <button
        onClick={() => setMenuOpen(true)}
        className="fixed top-4 right-4 z-50 text-[#1D324A] text-3xl md:hidden"
      >
        <HiMenu />
      </button>

      {/* لوگو - معمولی و اسکرول‌شونده */}
      <header className="absolute top-4 left-4 z-40 flex justify-center md:hidden">
        <Image src="/header_logo.svg" alt="لوگوی شرکت" width={40} height={40} />
      </header>

      {/* بک‌دراپ موبایل */}
      {menuOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* منوی موبایل */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#254662] text-white z-50 transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-white/20">
          <button onClick={() => setMenuOpen(false)} className="text-3xl">
            <HiX />
          </button>
          {isLogin ? (
            <a
              href="profile"
              className="w-10 h-10 bg-[#001230A8] flex items-center justify-center rounded-md"
            >
              <FaRegUser className="text-white" />
            </a>
          ) : (
            <button
              className="bg-[#001230A8] text-white px-3 py-1 rounded-md"
              onClick={() => setShowLoginForm(true)}
            >
              ورود
            </button>
          )}
        </div>

        {/* لینک‌ها */}
        <div className="flex flex-col items-start px-6 space-y-4 mt-4">
          <LinkList />
        </div>
      </div>

      {/* فرم ورود موبایل */}
      {showLoginForm && !isLogin && (
        <LoginForm
          variant="mobile"
          onSuccess={handleLoginSuccess}
          onClose={() => setShowLoginForm(false)}
        />
      )}
    </>
  );
}
