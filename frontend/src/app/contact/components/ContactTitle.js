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
                        className="text-xl leading-tight w-full whitespace-pre-line text-justify"
                    >
                        در تمکو، نظرات، پیشنهادها و دغدغه‌های شما برای ما ارزشمند است.
                        اگر پرسشی دارید، نیاز به راهنمایی دارید یا قصد دارید همکاری جدیدی را آغاز کنید، تیم پشتیبانی ما آماده است تا در کوتاه‌ترین زمان پاسخ‌گوی شما باشد.
                        <br />
                        از طریق <strong>فرم زیر</strong> می‌توانید سوالات، دیدگاه‌ها یا انتقادات خود را برای ما ارسال کنید تا به‌صورت دقیق بررسی و پیگیری شود.
                        <br />
                        ما اینجاییم تا مسیر ارتباطی شما با تمکو <strong>سریع، شفاف و قابل‌اعتماد</strong> باشد.
                    </p>,
                ]}
            </MotionEffect>
        </MotionEffect>
    );
}
