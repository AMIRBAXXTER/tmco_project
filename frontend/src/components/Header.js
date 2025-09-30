"use client";
import { useState } from "react";
import LinkList from "@/components/HeaderLink";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-10 left-1/2 -translate-x-1/2 w-3/5 z-50 hidden md:flex justify-between items-center bg-[#254662] shadow-2xl rounded-md py-2 px-6">
        <div className="flex gap-2.5">
          <LinkList />
        </div>
        <div className="flex items-center">
          <Image
            src="/header_logo.svg"
            alt="لوگوی شرکت"
            width={40}
            height={40}
            className="ml-3"
          />
        </div>
      </header>

      <header className="fixed top-4 left-0 right-0 z-50 flex justify-between items-center px-4 md:hidden">
        <button
          onClick={() => setMenuOpen(true)}
          className="text-[#1D324A] text-3xl"
        >
          <HiMenu />
        </button>

        <Image
          src="/header_logo.svg"
          alt="لوگوی شرکت"
          width={40}
          height={40}
        />
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#254662] text-white z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setMenuOpen(false)} className="text-3xl">
            <HiX />
          </button>
        </div>
        <div className="flex flex-col items-start px-6 space-y-4">
          <LinkList />
        </div>
      </div>
    </>
  );
}
