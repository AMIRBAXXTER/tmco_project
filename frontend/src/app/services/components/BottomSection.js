"use client";
import React from "react";
import MotionEffect from "@/animations/MotionEffect";

export default function BottomSection() {
  const imageSrc = "/ServicesMasks/truck.webp";

  return (
    <MotionEffect
      effect="slideRight"
      className="flex flex-col md:flex-row-reverse w-full min-h-screen"
    >
      {/* SVG Section — 1/3 width */}
      <MotionEffect
        effect="slideRight"
        className="md:w-1/3 w-full flex justify-end items-center bg-gray-50"
      >
        <svg
          width="523"
          height="530"
          viewBox="0 0 523 530"
          xmlns="http://www.w3.org/2000/svg"
          className="block"
        >
          <mask
            id="maskShapeRight"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="523"
            height="530"
          >
            <path
              d="M500 530C512.703 530 523 519.703 523 507V403.963C523 399.736 521.835 395.591 519.634 391.983L502.899 364.555C500.698 360.947 499.533 356.802 499.533 352.576V330.698V265.368V202.431V184.528C499.533 180.932 500.376 177.386 501.995 174.176L520.539 137.383C522.157 134.173 523 130.627 523 127.031V23C523 10.2974 512.703 0 500 0H12C-0.702599 0 -11 10.2974 -11 23V507C-11 519.703 -0.702576 530 12 530H133.152C139.879 530 146.269 527.055 150.639 521.94L156.262 515.358C160.632 510.243 167.022 507.298 173.749 507.298H313.187C320.853 507.298 327.831 511.718 331.107 518.649C334.382 525.58 341.361 530 349.027 530H500Z"
              fill="white"
            />
          </mask>

          <image
            href={imageSrc}
            width="523"
            height="530"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#maskShapeRight)"
          />
        </svg>
      </MotionEffect>

      {/* Text Section — 2/3 width */}
      <MotionEffect
        effect="fadeIn"
        className="md:w-2/3 w-full pt-10 md:pt-0 flex flex-col justify-center items-start md:px-16 px-8 bg-white"
      >
        <h3 className="text-[#3C9BD8] mb-5 font-bold text-xl md:text-2xl text-center">خدمات زمینی</h3>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#0A2540]">
          امنیت و سرعت
        </h2>
        <p className="text-[#0A2540] text-xl leading-relaxed max-w-2xl">
          جاده هنوز قلب زنجیرهٔ تأمین است، اما در تمکو با موتور فناوری می‌تپد. ناوگان زمینی ما با سیستم موقعیت‌یابی و تحلیل لحظه‌ای ترافیک، هر مسیر را با هوش مصنوعی انتخاب می‌کند تا تحویل‌ها سریع‌تر و کم‌هزینه‌تر انجام شوند. همه‌چیز، از زمان حرکت تا رسیدن، قابل‌پیگیری و گزارش‌دهی است. امنیت، پاسخ‌گویی و سرعت؛ سه پایه‌ای که حمل‌ونقل زمینی تمکو بر آن استوار است.
        </p>
      </MotionEffect>
    </MotionEffect>
  );
}
