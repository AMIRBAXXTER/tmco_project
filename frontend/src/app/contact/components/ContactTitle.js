"use client";
import React from "react";
import MotionEffect from "@/animations/MotionEffect";

export default function ContactTitle() {
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
                           justify-center items-start 
                           rounded-xl shadow-lg"
            >
                {[
                    <h2
                        key="sub-title"
                        className="text-[#3C9BD8] font-bold text-xl text-center mb-10 w-full"
                    >
                        تماس با ما
                    </h2>,

                    <p
                        key="main-title"
                        className="font-bold text-2xl leading-tight w-full whitespace-pre-line text-justify"
                    >
                        {`ما در تمکو ارزش زیادی برای نظرات و پیشنهادهای شما قائل هستیم.

از طریق فرم زیر می‌توانید دیدگاه‌ها، سوالات یا انتقادات خود را برای ما ارسال کنید تا در کوتاه‌ترین زمان بررسی شود.`}
                    </p>,
                ]}
            </MotionEffect>
        </MotionEffect>
    );
}
