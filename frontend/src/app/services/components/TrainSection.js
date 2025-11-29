"use client";
import React from "react";
import MotionEffect from "@/animations/MotionEffect";

export default function TrainSection() {
  const imageSrc = "/ServicesMasks/train.webp";

  return (
    <MotionEffect
      effect="slideRight"
      className="flex flex-col-reverse gap-12 md:flex-row-reverse w-full min-h-screen"
    >
      {/* SVG Section — 1/3 width */}
      <MotionEffect
        effect="slideRight"
        className="md:w-1/3 w-full flex justify-end items-center bg-gray-50"
      >
        <svg
          width="521"
          height="530"
          viewBox="0 0 521 530"
          xmlns="http://www.w3.org/2000/svg"
          className="block" // جلوگیری از فاصله غیرضروری
        >
          <mask
            id="maskShape"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="521"
            height="530"
          >
            <path
              d="M498 0C510.7 0 521 10.3 521 23V126.037C521 130.264 519.835 134.409 517.634 138.017L500.899 165.445C498.698 169.053 497.533 173.198 497.533 177.424V199.302V264.632V327.569V345.472C497.533 349.068 498.376 352.614 499.995 355.824L518.539 392.617C520.157 395.827 521 399.373 521 402.969V507C521 519.703 510.703 530 498 530H10C-2.7026 530 -13 519.703 -13 507V23C-13 10.2974 -2.70258 0 10 0H131.152C137.879 0 144.269 2.94526 148.639 8.06006L154.262 14.6424C158.632 19.7572 165.022 22.7025 171.749 22.7025H311.187C318.853 22.7025 325.831 18.282 329.107 11.3512C332.382 4.42049 339.361 0 347.027 0H498Z"
              fill="white"
            />
          </mask>

          <image
            href={imageSrc}
            width="521"
            height="530"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#maskShape)"
          />
        </svg>
      </MotionEffect>

      {/* Text Section — 2/3 width */}
      <MotionEffect
        effect="fadeIn"
        className="md:w-2/3  w-full pt-10 md:pt-0 flex flex-col justify-center items-start md:px-16 px-8 bg-white"
      >
        <h3 className="text-[#3C9BD8] mb-5 font-bold text-xl md:text-2xl text-center">خدمات ریلی</h3>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#0A2540]">
          مطمئن، اقتصادی و کاملاً قابل‌اعتماد
        </h2>
        <p className="text-[#0A2540] text-xl leading-relaxed max-w-2xl text-justify">
          در دنیای امروز، سرعت تنها یک مزیت نیست؛ <strong>دقت، ثبات و برنامه‌ریزی هوشمند</strong> نقش مهم‌تری در موفقیت زنجیره تأمین بازی می‌کنند.
          خدمات ریلی تمکو بر پایه زیرساخت‌های پیشرفته و فناوری‌های داده‌محور طراحی شده تا حمل‌ونقل سازمانی را <strong>ایمن، منظم و اقتصادی</strong> کند.
          تمکو پیش از شروع هر عملیات، مسیرها و ظرفیت‌ها را تحلیل و بهینه‌سازی می‌کند تا بهترین ترکیب از <strong>زمان، هزینه و امنیت</strong> به دست آید.
          تمامی واگن‌ها به سیستم <strong>رصد لحظه‌ای</strong> مجهز هستند؛ بنابراین موقعیت و وضعیت بار در تمام طول مسیر شفاف و قابل‌پیگیری است.
        </p>
      </MotionEffect>
    </MotionEffect>
  );
}
