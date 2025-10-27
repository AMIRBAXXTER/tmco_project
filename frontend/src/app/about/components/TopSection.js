"use client";
import React from "react";
import MotionEffect from "@/animations/MotionEffect";

export default function TopSection() {
  const imageSrc = "/AboutUsMasks/top.png";

  return (
    <MotionEffect effect="slideLeft" className="flex flex-col md:flex-row w-full min-h-screen">
      {/* بخش SVG با ماسک و تصویر دینامیک */}
      <MotionEffect
        effect="slideLeft" // افکت باز شدن فرم ماسکی با اسلاید تدریجی
        className="flex-1 flex justify-center items-center bg-gray-50"
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 710 719"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask id="maskShape1" maskUnits="userSpaceOnUse" x="0" y="0" width="710" height="719">
            <path
              d="M446.301 38.8058C447.789 40.2285 449.769 41.0225 451.828 41.0225H711C715.418 41.0225 719 44.6042 719 49.0225V711C719 715.418 715.418 719 711 719H8.00001C3.58173 719 0 715.418 0 711V533.643C0 531.584 0.793943 529.604 2.21663 528.115L38.9318 489.7C40.3545 488.212 41.1484 486.232 41.1484 484.173V238.308C41.1484 236.179 40.2997 234.137 38.7902 232.636L2.35824 196.397C0.84872 194.896 0 192.855 0 190.726V8C0 3.58172 3.58172 0 8 0H402.49C404.549 0 406.529 0.793943 408.018 2.21663L446.301 38.8058Z"
              fill="white"
            />
          </mask>

          <image
            href={imageSrc}
            width="710"
            height="719"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#maskShape1)"
          />
        </svg>
      </MotionEffect>

      {/* بخش متنی همراه افکت مرحله‌ای */}
      <MotionEffect
        effect="fadeIn" // هر المان متنی جداگانه بالا میاد با تأخیر کوتاه
        className="flex-1 flex flex-col justify-center items-start p-10 bg-white"
      >
        {[
          <h2
            key="title"
            className="text-3xl md:text-5xl font-bold mb-6 text-[#0A2540]"
          >
            پیوند هوشمند میان بار و مسیر
          </h2>,
          <p key="desc" className="text-[#0A2540] text-xl leading-relaxed">
            ما در شرکت تمکو، پلی بین صاحبان کالا و ناوگان حمل‌ونقل هستیم. با
            بهره‌گیری از سامانه تخصیص هوشمند سفر، هر سفارش در کوتاه‌ترین زمان
            ممکن، دقیق‌ترین راننده را برای خود پیدا می‌کند. نتیجه؟ سرعت بیشتر،
            هزینه کمتر، و اطمینان در هر کیلومتر از مسیر.
          </p>,
        ]}
      </MotionEffect>
    </MotionEffect>
  );
}
