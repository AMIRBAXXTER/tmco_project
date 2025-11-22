"use client";
import React from "react";
import MotionEffect from "@/animations/MotionEffect";

export default function MiddleSection() {
  const imageSrc = "/ServicesMasks/plane.webp";

  return (
    <MotionEffect
      effect="slideLeft"
      className="flex flex-col md:flex-row w-full min-h-screen"
    >
      {/* SVG Section — 1/3 width */}
      <MotionEffect
        effect="slideLeft"
        className="md:w-1/3 w-full flex justify-start items-center bg-gray-50"
      >
        <svg
          width="519"
          height="530"
          viewBox="0 0 519 530"
          xmlns="http://www.w3.org/2000/svg"
          className="block"
        >
          <mask
            id="maskShapeLeft"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="519"
            height="530"
          >
            <path
              d="M23 530C10.2974 530 0 519.703 0 507V403.963C0 399.736 1.16461 395.591 3.36597 391.983L20.1008 364.555C22.3022 360.947 23.4668 356.802 23.4668 352.576V330.698V265.368V202.431V184.528C23.4668 180.932 22.6238 177.386 21.0055 174.176L2.46131 137.383C0.842984 134.173 0 130.627 0 127.031V23C0 10.2974 10.2974 0 23 0H511C523.703 0 534 10.2974 534 23V507C534 519.703 523.703 530 511 530H23Z"
              fill="white"
            />
          </mask>

          <image
            href={imageSrc}
            width="519"
            height="530"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#maskShapeLeft)"
          />
        </svg>
      </MotionEffect>

      {/* Text Section — 2/3 width */}
      <MotionEffect
        effect="fadeIn"
        className="md:w-2/3 pt-10 md:pt-0 w-full flex flex-col justify-center items-start md:px-16 px-8 bg-white"
      >
        <h3 className="text-[#3C9BD8] mb-5 font-bold text-xl md:text-2xl text-center">خدمات هوایی</h3>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#0A2540]">
          سریع و ایمن
        </h2>
        <p className="text-[#0A2540] text-xl leading-relaxed max-w-2xl text-justify">
          وقتی زمان مهم‌تر از هر چیز است، تمکو راه‌حل شماست. شبکه هوایی ما با اتصال مستقیم به سامانه‌های جهانی پرواز، برنامه‌ریزی و رهگیری محموله‌ها را با دقت میلی‌ثانیه انجام می‌دهد. از لحظهٔ بارگیری تا تحویل، همه‌چیز به‌صورت دیجیتال پایش می‌شود. این یعنی سرعت واقعی با امنیت تضمین‌شده — برای محموله‌هایی که ارزش‌شان فراتر از عدد است.
        </p>
      </MotionEffect>
    </MotionEffect>
  );
}
