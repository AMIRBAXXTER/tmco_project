'use client';
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

export default function Footer() {
    const year = new Date().getFullYear();

    useEffect(() => {
        gsap.registerPlugin(MotionPathPlugin);

        const worms = [
            { el: ".dot1", path: "#path1" },
            { el: ".dot2", path: "#path2" },
            { el: ".dot3", path: "#path3" },
            { el: ".dot4", path: "#path4" },
            { el: ".dot5", path: "#path5" },
            { el: ".dot6", path: "#path6" },
        ];

        const animateWorms = () => {
            gsap.killTweensOf(worms.map(w => w.el)); // حذف انیمیشن‌های قبلی

            worms.forEach(({ el, path }) => {
                gsap.to(el, {
                    duration: 10,
                    yoyo: true,
                    repeat: -1,
                    ease: "none",
                    motionPath: {
                        path: path,
                        align: path,
                        autoRotate: true,
                        alignOrigin: [0.5, 0.5],
                    },
                });
            });
        };

        animateWorms(); // اجرای اولیه
        window.addEventListener('resize', animateWorms); // اجرای دوباره بعد از تغییر سایز

        return () => {
            window.removeEventListener('resize', animateWorms);
        };
    }, []);

    return (
        <footer className="relative w-full overflow-hidden bg-white">
            {/* خطوط نورانی */}
            <div className="pointer-events-none absolute inset-0 z-40">
                <div className="worm-glow dot1"></div>
                <div className="worm-glow dot2"></div>
                <div className="worm-glow dot3"></div>
                <div className="worm-glow dot4"></div>
                <div className="worm-glow dot5"></div>
                <div className="worm-glow dot6"></div>
            </div>

            {/* لایه‌ SVGها */}
            <div className="pointer-events-none absolute inset-0 z-30 flex flex-col justify-between">

                {/* ردیف بالایی */}
                <div className="flex w-full justify-between">
                    <svg className="w-1/3 h-auto -translate-y-10" width="519" height="518" viewBox="0 0 519 518" fill="none">
                        <path id="path1" d="M1.61401 0V223.263C1.61401 239.447 11.3654 254.035 26.3188 260.224L230.637 344.776C245.59 350.965 255.342 365.553 255.342 381.737V477C255.342 499.091 273.25 517 295.342 517H519"
                            stroke="url(#paint0_linear_171_5033)" strokeOpacity="0.23" strokeWidth="2" />
                        <defs>
                            <linearGradient id="paint0_linear_171_5033" x1="260.307" y1="35" x2="260.307" y2="517" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#2A446F" stopOpacity="0" />
                                <stop offset="1" stopColor="#2A446F" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <svg className="w-1/3 h-auto" width="524" height="569" viewBox="0 0 524 569" fill="none">
                        <path id="path2" d="M523 0V349.935C523 369.347 509.062 385.957 489.945 389.328L272.46 427.672C253.342 431.043 239.405 447.653 239.405 467.065V527.772C239.405 558.327 206.531 577.6 179.868 562.676L0 462"
                            stroke="url(#paint0_linear_171_5039)" strokeOpacity="0.23" strokeWidth="2" />
                        <defs>
                            <linearGradient id="paint0_linear_171_5039" x1="261.5" y1="40.3482" x2="261.5" y2="596" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#2A446F" stopOpacity="0" />
                                <stop offset="1" stopColor="#2A446F" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* ردیف میانی */}
                <div className="flex w-full items-end justify-between">
                    <svg className="w-1/3 h-auto relative -translate-y-10" width="510" height="396" viewBox="0 0 510 396" fill="none">
                        <path id="path3" d="M512 1H41.1306C19.0392 1 1.13055 18.9086 1.13055 41V355C1.13055 377.091 19.0392 395 41.1306 395H512"
                            stroke="#2A446F" strokeOpacity="0.23" strokeWidth="2" />
                    </svg>

                    <svg className="w-1/3 h-auto relative -translate-y-[-12px]" width="511" height="266" viewBox="0 0 511 266" fill="none">
                        <path id="path4" d="M509.5 -57.5V225C509.5 247.091 491.591 265 469.5 265H94.2798C79.36 265 65.6802 256.696 58.7945 243.461L-110 -81"
                            stroke="#2A446F" strokeWidth="2" />
                    </svg>
                </div>

                {/* ردیف پایینی */}
                <div className="flex md:flex-row flex-row-reverse w-full justify-between gap-x-52 mt-8 md:mt-16">
                    <svg className="w-auto h-auto hidden md:block md:w-[580px]" width="649" height="391" viewBox="0 0 649 391" fill="none">
                        <path id="path5" d="M649 165.5L485.039 11.8159C477.626 4.86704 467.845 1 457.684 1H41C18.9086 1 1 18.9086 1 41V395"
                            stroke="#2A446F" strokeWidth="2" />
                    </svg>

                    <svg className="relative bottom-0 left-[-200px] md:static md:bottom-auto md:left-auto md:w-[415px] md:h-auto"
                        width="452" height="391" viewBox="0 0 452 391" fill="none">
                        <path id="path6" d="M0 1H410.649C442.719 1 461.749 36.849 443.78 63.4124L221.5 392"
                            stroke="#2A446F" strokeWidth="2" />
                    </svg>
                </div>
            </div>

            {/* محتوای فوتر */}
            <div className="relative z-20 grid min-h-[1500px] grid-rows-[auto_auto_auto]">
                <section className="mx-auto flex w-full h-[350px] md:h-[735px] flex-col justify-end px-6 pb-[clamp(8rem,16vw,12rem)] pt-[clamp(6rem,12vw,8rem)] text-right text-slate-700 lg:px-12"></section>
                <section className="relative w-full h-[1200px] md:h-[767px] bg-[#0F2747] px-6 py-[clamp(8rem,16vw,12rem)] text-slate-100 lg:px-12"></section>
            </div>

            {/* استایل کرم نورانی */}
            <style jsx>{`
                .worm-glow {
                    width: 22px;
                    height: 2px;
                    background: #93d7f9; /* رنگ اصلی */
                    border-radius: 2px;
                    position: absolute;

                    /* هاله چند لایه برای پرنور بودن */
                    box-shadow:
                    0 0 25px rgba(147, 215, 249, 1),
                    0 0 30px rgba(147, 215, 249, 0.95),
                    0 0 35px rgba(147, 215, 249, 0.9),
                    0 0 40px rgba(147, 215, 249, 0.85),
                    0 0 45px rgba(147, 215, 249, 0.8),
                    0 0 50px rgba(147, 215, 249, 0.75);
                    filter:
                    drop-shadow(0 0 15px rgba(147, 215, 249, 0.9))
                    drop-shadow(0 0 20px rgba(147, 215, 249, 0.85));
                }


`}</style>

        </footer>
    );
}
