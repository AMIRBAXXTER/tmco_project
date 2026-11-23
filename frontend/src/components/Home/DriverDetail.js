'use client'
import {React, useState, useEffect} from 'react'
import MotionEffect from "@/animations/MotionEffect";

export default function DriverDetail() {
    const [downloadUrl, setDownloadUrl] = useState(null);
    const features = [
        { title: "انتخاب هوشمند ارائه‌دهندگان حمل‌ونقل" },
        { title: "مدیریت یکپارچه سفارش‌ها" },
        { title: "مدیریت کامل فرآیند حمل‌ونقل" },
        { title: "پیگیری وضعیت محموله به صورت لحظه‌ای" },
    ]

    
    useEffect(() => {
    let isCancelled = false;
    let activeController = null;
    let retryTimer = null;

    const MAX_RETRIES = 4;
    const RETRY_DELAYS = [1000, 2000, 4000];
    const REQUEST_TIMEOUT = 10000;

    const fetchLatest = async () => {
        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        if (isCancelled) return;

        const controller = new AbortController();
        activeController = controller;

        const timeout = setTimeout(() => {
            controller.abort();
        }, REQUEST_TIMEOUT);

        try {
            const res = await fetch(
            "https://core.tmcopars.ir/core/client/mobile/app/latest/",
            {
                signal: controller.signal,
                cache: "no-store",
            }
            );

            if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status}`);
            }

            const data = await res.json();

            if (!data?.app_file) {
            throw new Error("APK file URL not found");
            }

            const fullUrl = new URL(
            data.app_file,
            "https://core.tmcopars.ir"
            ).href;

            if (!isCancelled) {
            setDownloadUrl(fullUrl);
            console.log("Full URL:", fullUrl);
            }

            return;

        } catch (err) {
            if (isCancelled) return;

            console.warn(
            `Attempt ${attempt}/${MAX_RETRIES} failed:`,
            err
            );

            if (attempt === MAX_RETRIES) {
            console.error(
                "Failed to fetch latest APK after all retries:",
                err
            );
            return;
            }

        } finally {
            clearTimeout(timeout);
            activeController = null;
        }

        // تأخیر قبل از تلاش مجدد
        await new Promise((resolve) => {
            retryTimer = setTimeout(
            resolve,
            RETRY_DELAYS[attempt - 1]
            );
        });
        }
    };

    fetchLatest();

    return () => {
        isCancelled = true;
        activeController?.abort();
        clearTimeout(retryTimer);
    };
    }, []);


    return (
        <div className="w-full lg:w-3/4 h-[600px] md:h-full lg:mr-20">
            <MotionEffect effect="slideRight">
                <span className="text-[#3C9BD8] font-bold text-2xl">اپلیکیشن راننده تمکو</span>
            </MotionEffect>

            <MotionEffect effect='slideUp'>
                <h2 className="font-bold text-md md:text-2xl text-[#121212] my-5">انتخاب بهترین مسیر، تنها با یک کلیک</h2>
                <p className="w-4/5 text-right">اپلیکیشن راننده تمکو، تمام نیازهای حمل‌ونقل را در یک بستر هوشمند و ساده در اختیار رانندگان قرار می‌دهد.</p>
            </MotionEffect>
            <MotionEffect effect='fadeIn'>
                <span className="my-8 text-2xl font-bold block">ویژگی ها:</span>
                {features.map((feature, index) => (
                    <div key={index}>
                        <h3 className="text-[#121212] font-bold text-lg mb-5">{feature.title}</h3>
                    </div>
                ))}
            </MotionEffect>
            <div className="flex gap-6 mt-7">
                <a
                    href={downloadUrl || "#"}
                    download
                    target="_blank"
                    className="bg-[#3C9BD8] text-center text-white font-bold w-1/2 py-3 rounded-xl 
               transition-colors duration-100 ease-in
               hover:bg-[#036FD0]"
                >
                    دانلود اپلیکیشن
                </a>
                <a
                    href="https://core.tmcopars.ir/accounts/signup"
                    target="_blank"
                    className="bg-white text-center text-[#3C9BD8] border border-[#3C9BD8] font-bold w-1/2 py-3 rounded-xl 
               transition-colors duration-100 ease-in
               hover:bg-[#c6e8ff]"
                >
                    ثبت نام راننده
                </a>
            </div>

        </div>
    )
}
