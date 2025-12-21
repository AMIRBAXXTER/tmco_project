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
            className="font-bold text-3xl md:text-4xl text-center leading-tight"
          >
            آینده‌ای که با هم می‌سازیم
          </h1>,

          <p
            key="paragraph"
            className="w-full sm:w-4/5 mx-auto text-base md:text-lg leading-relaxed text-gray-700 md:text-justify"
          >
            در تمکو باور داریم که حمل‌ونقل تنها جابه‌جایی بار نیست؛
            <br />
            بلکه زنجیره‌ای از <strong>اعتماد، دقت، شفافیت و تصمیم‌گیری هوشمند</strong> است.
            <br />
            برای ما، هر مسیر فرصتی است تا فناوری را در خدمت انسان قرار دهیم؛
            تا صاحبان کالا، رانندگان و سازمان‌ها سفری <strong>مطمئن‌تر، شفاف‌تر و پربازده‌تر</strong> را تجربه کنند.
            <br />
            تمکو در مسیر تحول لجستیک ایران، تنها یک ناظر نیست.
            <br />
            ما <strong>موتور حرکت آینده</strong> هستیم؛ آینده‌ای که با داده، فناوری و همکاری می‌سازیم و در هر لحظه، <strong>هوشمندتر</strong> می‌شود.
          </p>,
        ]}
      </MotionEffect>
    </MotionEffect>
  );
}
