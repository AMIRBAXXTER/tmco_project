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
            className="font-bold text-3xl md:text-5xl text-center leading-tight"
          >
            تمکو اولین پلتفرم حمل و نقل ترکیبی
          </h1>,

          <p className="w-full sm:w-4/5 text-center text-base md:text-lg mx-auto leading-relaxed text-gray-700">
            ما در تمکو با نگاهی نو به صنعت حمل‌ونقل، سیستمی هوشمند طراحی کرده‌ایم که ارتباط میان شرکت‌های سفارش‌دهنده‌ی بار و ناوگان حمل را به‌صورت دقیق، سریع و شفاف برقرار می‌کند. هدف ما ایجاد هماهنگی کامل بین نیاز به حمل و ظرفیت ناوگان است تا هر سفر، بیش‌ترین بهره‌وری و اطمینان خاطر را برای مشتری و راننده به‌همراه داشته باشد.

            الگوریتم هوشمند دایون‌تک با تحلیل داده‌های مسیر، وزن و زمان تحویل، مسیرهای بهینه و تقسیم‌بندی دقیق بار را پیشنهاد می‌دهد تا هیچ لحظه‌ای از چرخه‌ی حمل بی‌استفاده نماند.

            ما باور داریم آینده‌ی لجستیک، هوشمند، پویا و متکی بر اعتماد است؛ به همین دلیل زیرساخت‌های خود را با تمرکز بر نوآوری، شفافیت و رضایت کارفرما و راننده ساخته‌ایم.

            تمکو پلی میان دنیای فناوری و حمل‌ونقل — هر لحظه، هوشمندتر…
          </p>,
        ]}
      </MotionEffect>
    </MotionEffect>
  );
}
