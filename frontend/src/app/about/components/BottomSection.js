"use client";
import React from "react";
import MotionEffect from "@/animations/MotionEffect";

export default function BottomSection() {
  const imageSrc = "/AboutUsMasks/bottom.webp";

  return (
    <MotionEffect 
      effect="slideRight"
      className="flex flex-col md:flex-row-reverse w-full min-h-screen"
    >
      <MotionEffect
        effect="slideRight"
        className="flex-1 flex justify-center items-center bg-gray-50"
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 710 719"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask id="maskShape2" maskUnits="userSpaceOnUse" x="0" y="0" width="710" height="719">
            <path
              d="M263.699 38.8058C262.211 40.2285 260.231 41.0225 258.172 41.0225H-1C-5.41827 41.0225 -9 44.6042 -9 49.0225V711C-9 715.418 -5.41827 719 -1 719H702C706.418 719 710 715.418 710 711V533.643C710 531.584 709.206 529.604 707.783 528.115L671.068 489.7C669.646 488.212 668.852 486.232 668.852 484.173V238.308C668.852 236.179 669.7 234.137 671.21 232.636L707.642 196.397C709.151 194.896 710 192.855 710 190.726V8C710 3.58172 706.418 0 702 0H307.51C305.451 0 303.471 0.793943 301.982 2.21663L263.699 38.8058Z"
              fill="white"
            />
          </mask>

          <image
            href={imageSrc}
            width="710"
            height="719"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#maskShape2)"
          />
        </svg>
      </MotionEffect>

      <MotionEffect 
        effect="fadeIn"
        className="flex-1 flex flex-col justify-center items-start p-10 bg-white"
      >
        {[
          <h2
            key="title"
            className="text-3xl font-bold mb-6 text-[#0A2540] text-justify"
          >
            فناوری، موتور محرک لجستیک نوین
          </h2>,
          <p
            key="desc"
            className="text-[#0A2540] text-xl leading-relaxed text-justify"
          >
            در دنیای امروز حمل‌ونقل، هوشمندی یعنی تصمیم لحظه‌ای و مسیر بهینه. 
            سامانه‌ی ما به شرکت‌هایی چون تیپاکس و اسنپ‌شاپ کمک می‌کند تا تخصیص 
            رانندگان و مدیریت سفرها را بدون اتلاف زمان انجام دهند. 
            ما آینده‌ی لجستیک را ساده‌تر، سریع‌تر و یکپارچه‌تر ساخته‌ایم.
          </p>,
        ]}
      </MotionEffect>
    </MotionEffect>
  );
}
