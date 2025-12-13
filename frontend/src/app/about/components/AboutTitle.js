"use client";
import React from "react";
import MotionEffect from "@/animations/MotionEffect";

export default function AboutTitle() {
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
            درباره ما
          </h2>,

          <h1
            key="main-title"
            className="font-bold text-md md:text-3xl leading-tight text-justify"
          >
            تمکو اولین پلتفرم حمل‌ونقل ترکیبی در ایران
          </h1>,

          <p key="paragraph" className="w-full sm:w-4/5 text-base md:text-lg mx-auto leading-relaxed text-gray-700 text-justify">
            در تمکو با رویکردی نو به صنعت حمل‌ونقل، پلتفرمی هوشمند و یکپارچه طراحی کرده‌ایم که ارتباط بین <strong>شرکت‌های سفارش‌دهنده بار</strong> و <strong>ناوگان حمل‌ونقل</strong> را به‌صورت دقیق، سریع و شفاف برقرار می‌کند.
            ماموریت ما ایجاد هماهنگی کامل بین <strong>نیاز واقعی بازار</strong> و <strong>ظرفیت عملیاتی ناوگان</strong> است؛ تا هر سفر بیش‌ترین بهره‌وری، کم‌ترین اتلاف زمان و بیش‌ترین اطمینان را برای مشتری و راننده به همراه داشته باشد.
            قلب فناوری تمکو، <strong>الگوریتم هوشمند دایون‌تک</strong> است؛ سیستمی که با تحلیل داده‌های مسیر، وزن، نوع بار و زمان تحویل، بهترین مسیرها و دقیق‌ترین تقسیم‌بندی بار را پیشنهاد می‌دهد. این یعنی هیچ لحظه‌ای از چرخه حمل‌ونقل، بدون برنامه و بی‌استفاده نمی‌ماند.
          </p>,
          <p key="paragraph2" className="w-full sm:w-4/5 font-bold md:text-lg mx-auto leading-relaxed text-gray-700 text-justify">تمکو پلی است میان دنیای فناوری و دنیای حمل‌ونقل — مسیری که هر لحظه هوشمندتر می‌شود.</p>
        ]}
      </MotionEffect>
    </MotionEffect>
  );
}
