"use client";
import React from "react";
import MotionEffect from "@/animations/MotionEffect";

export default function ServicesTitle() {
  return (
    <MotionEffect
      effect="scaleSlideUp"
      className="flex flex-col justify-center items-center 
                 w-full min-h-screen 
                 bg-white
                 px-5 md:px-10
                 md:pt-[180px]"
    >
      <MotionEffect
        effect="scaleSlideUp"
        className="flex flex-col gap-8 
                   w-full sm:w-5/6 md:w-2/3 
                   p-6 md:p-10 
                   justify-center items-center 
                   rounded-xl shadow-lg"
      >
        {[
          <h2
            key="sub-title"
            className="text-[#3C9BD8] font-bold text-xl md:text-2xl text-center"
          >
            خدمات ما
          </h2>,

          <h1
            key="main-title"
            className="font-bold text-3xl leading-tight text-justify"
          >
            راهکارهای جامع حمل و نقل و لجیستیک برای کسب و کارهای مدرن
          </h1>,

          <p key="description" className="w-full sm:w-4/5 text-center text-base md:text-lg mx-auto leading-relaxed text-gray-700 text-justify">
            تمکو یک پلتفرم جامع برای مدیریت رانندگان، نمایندگی ها و مشتریان سازمانی است. طراحی شده برای شرکت هایی که به دنبال شفافیت، مقیاس پذیری و کاهش هزینه های عملیاتی  هستند.
          </p>,
          <a
          key="download-button"
            href="/files/driver-app.apk"
            download
            target="_blank"
            className="bg-[#3C9BD8] text-center text-white font-bold w-1/2 py-4 rounded-xl 
               transition-colors duration-100 ease-in
               hover:bg-[#036FD0]"
          >
            دانلود ویدیوی دمو
          </a>
        ]}
      </MotionEffect>
    </MotionEffect>
  );
}
