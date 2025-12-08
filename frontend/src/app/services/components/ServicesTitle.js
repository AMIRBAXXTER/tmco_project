"use client";
import React, { useState } from "react";
import MotionEffect from "@/animations/MotionEffect";
import VideoModal from "./VideoModal";

export default function ServicesTitle() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const videos = [
    { title: "ثبت نام مشتری", url: "/DemoVideos/ClientRegister.mp4" },
    { title: "ثبت نام مالک و راننده", url: "/DemoVideos/DriverRegister.mp4" },
    { title: "پروفایل مشتری", url: "/DemoVideos/ClientProfile.mp4" },
    { title: "پروفایل مالک", url: "/DemoVideos/OwnerProfile.mp4" },
    { title: "پروفایل راننده", url: "/DemoVideos/DriverProfile.mp4" },
  ];

  return (
    <>
      {/* MODAL */}
      <VideoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        videos={videos}
      />

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
          <h2 className="text-[#3C9BD8] font-bold text-xl md:text-2xl text-center">
            خدمات ما
          </h2>

          <h1 className="font-bold text-3xl leading-tight text-justify">
            راهکارهای جامع حمل و نقل و لجستیک برای کسب و کارهای مدرن
          </h1>

          <p className="w-full sm:w-4/5 text-base md:text-lg mx-auto leading-relaxed text-gray-700 text-justify">
            تمکو یک پلتفرم یکپارچه و هوشمند برای مدیریت رانندگان، نمایندگی‌ها و مشتریان سازمانی است...
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#3C9BD8] text-center text-white font-bold w-1/2 py-4 rounded-xl 
                       transition-colors duration-100 ease-in
                       hover:bg-[#036FD0]"
          >
            راهنمای ویدئویی
          </button>
        </MotionEffect>
      </MotionEffect>
    </>
  );
}
