"use client";
import React from "react";
import MotionEffect from "@/animations/MotionEffect";

export default function AboutBottom() {
  return (
    <MotionEffect
      effect="fadeScale"
      className="flex flex-col justify-center items-center 
                 w-full min-h-screen 
                 bg-white
                 px-5 md:px-10"
    >
      <MotionEffect
        effect="staggeredFadeIn"
        className="flex flex-col gap-8 
                   w-full sm:w-5/6 md:w-2/3 
                   p-6 md:p-10 
                   justify-center items-center 
                   rounded-xl shadow-lg"
      >
        {[
          <h1
            key="title"
            className="font-bold text-3xl md:text-5xl text-center leading-tight"
          >
            آینده‌ای که با هم می‌سازیم
          </h1>,

          <p
            key="paragraph"
            className="w-full sm:w-4/5 mx-auto text-base md:text-lg leading-relaxed text-gray-700 text-justify"
          >
            ما در تمکو باور داریم که حمل‌ونقل تنها جابه‌جایی بار نیست، بلکه
            زنجیره‌ای از اعتماد، دقت و تصمیم‌گیری هوشمند است. هر مسیر برای ما
            فرصتی‌ست تا فناوری را در خدمت انسان قرار دهیم و کاری کنیم تا صاحبان
            کالا و رانندگان، سفری مطمئن‌تر، شفاف‌تر و پربازده‌تر را تجربه کنند.
            <br />
            <br />
            در مسیر رشد و تحول لجستیک ایران، ما فقط نظاره‌گر نیستیم — تمکو موتور
            حرکت آینده است؛ هر لحظه، هوشمندتر…
          </p>,
        ]}
      </MotionEffect>
    </MotionEffect>
  );
}
