"use client";
import { useEffect } from "react";

export default function TrapezoidLayout() {
    useEffect(() => {
        const BASE_WIDTH = 1920;
        const BASE_HEIGHT = 900;

        const updateClipPathsAndPositions = () => {
            const main = document.querySelector(".main-trapezoid");
            if (!main) return;

            const width = main.offsetWidth;
            const height = main.offsetHeight;

            const baseOffset = 150;
            const offsetY = Math.min(baseOffset, window.innerWidth * 0.12);
            const tanTheta = offsetY / width;

            const scaleX = width / BASE_WIDTH;
            const scaleY = height / BASE_HEIGHT;

            // 🔹 ضریب مماسی پویا برای حفظ flush در موبایل و دسکتاپ
            const dynamicEdgeFactor = 0.80 - (1 - scaleX) * 1.6;
            const yEdgeOffset = offsetY * dynamicEdgeFactor;

            document.querySelectorAll(".same-slope").forEach((el) => {
                const elWidth = el.offsetWidth;
                const y = elWidth * tanTheta;

                el.style.clipPath = `polygon(0 ${y}px, 100% 0, 100% calc(100% - ${y}px), 0 100%)`;
                el.style.willChange = "clip-path, transform";
                el.style.transform = "translateZ(0)";

                const isTop = el.classList.contains("top-piece");
                const isBottom = el.classList.contains("bottom-piece");

                // 🔸 اعمال جابه‌جایی دقیق مماسی با ضریب پویا
                if (isTop) el.style.transform += ` translateY(${yEdgeOffset * scaleY}px)`;
                else if (isBottom) el.style.transform += ` translateY(-${yEdgeOffset * scaleY}px)`;

                // تنظیم scale در شیب زیاد
                if (tanTheta > 0.25) {
                    const scale = Math.min(1.15, 1 + (tanTheta - 0.25) * 0.6);
                    el.style.transform += ` scaleY(${scale})`;
                }

                // موقعیت‌های اولیه مقیاس‌دار
                const top = el.dataset.top ? parseFloat(el.dataset.top) : null;
                const left = el.dataset.left ? parseFloat(el.dataset.left) : null;
                const bottom = el.dataset.bottom ? parseFloat(el.dataset.bottom) : null;
                const right = el.dataset.right ? parseFloat(el.dataset.right) : null;

                if (top !== null) el.style.top = `${top * scaleY}px`;
                if (bottom !== null) el.style.bottom = `${bottom * scaleY}px`;
                if (left !== null) el.style.left = `${left * scaleX}px`;
                if (right !== null) el.style.right = `${right * scaleX}px`;
            });
        };

        updateClipPathsAndPositions();
        window.addEventListener("resize", updateClipPathsAndPositions);
        return () => window.removeEventListener("resize", updateClipPathsAndPositions);
    }, []);

    return (
        <div className="relative w-full h-[900px] flex items-center justify-center bg-transparent overflow-visible">
            <div className="main-trapezoid same-slope relative z-[5] w-full h-[900px] bg-[#001230]">
                <div className="w-[80%] mx-auto mt-35 h-auto">
                    <h1 className="text-white mb-10 font-bold text-4xl">خدمات ما</h1>
                    <p className="text-white">تمکو زیرساختی دیجیتال برای اتصال شرکت ها به ارائه دهندگان خدمات حمل و نقل در سه بخش اصلی زیمنی، ریلی و هوایی است. این پلتفرم با یکپارچه سازی داده ها و فرایندها، دید کامل و شفافیت عملیاتی در اختیار مدیران لجستیک قرار می دهد.</p>
                    <a
                        href="/about"
                        className="bg-[#3C9BD8] text-center text-white mt-10 font-bold w-[250px] inline-block py-3 rounded-xl 
               transition-colors duration-100 ease-in
               hover:bg-[#036FD0]"
                    >
                        درباره ما
                    </a>
                </div>

            </div>

            {/* 🔸 بالا سمت چپ */}
            <div
                className="same-slope top-piece absolute z-[6] w-[360px] h-[86px] shadow-xl bg-[#D9D9D9]"
                data-top="22"
                data-left="5"
            />
            <div
                className="same-slope top-piece absolute z-[7] w-[201px] h-[64px] shadow-lg bg-[#3C9BD8]"
                data-top="15"
                data-left="35"
            />

            {/* 🔹 پایین سمت راست */}
            <div
                className="same-slope bottom-piece absolute z-[6] w-[360px] h-[86px] shadow-xl bg-[#D9D9D9]"
                data-bottom="22"
                data-right="5"
            />
            <div
                className="same-slope bottom-piece absolute z-[7] w-[201px] h-[64px] shadow-lg bg-[#3C9BD8]"
                data-bottom="15"
                data-right="20"
            />
        </div>
    );
}
