"use client";

import React, { useLayoutEffect, useState, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { LuHeadphones } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FaSearchLocation } from "react-icons/fa";

gsap.registerPlugin(MotionPathPlugin);

// ✅ جلوگیری از انباشته‌شدن انیمیشن‌ها بین رندرها
let _wormTweens = [];

const HIDE_HEADER_ROUTES = ["/invitation"];

export default function Footer() {
  const pathname = usePathname();

  const formatDateTime = (ts) => {
    if (!ts) return null;

    const d = new Date(ts * 1000);

    const date = new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).format(d);

    const time = new Intl.DateTimeFormat("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(d);

    return { date, time };
  };


  const buildSteps = (steps) => {
    if (!steps) return [];

    const order = [
      "START",
      "REACHED_ORIGIN",
      "RECEIVED_PACKAGES",
      "HEAD_TO_DESTINATION",
      "REACHED_DESTINATION",
      "UNLOAD_INPROGRESS",
      "FINISH"
    ];

    return order
      .filter((key) => steps[key] && steps[key].done_at)
      .map((key) => ({
        title: steps[key].translation,
        time: formatDateTime(steps[key].done_at)
      }));
  };

  const getDriverName = (data) => {
    if (data.employee_assistant) {
      return `${data.employee_assistant.first_name} ${data.employee_assistant.last_name}`;
    }

    if (data.truck?.employee_assistant) {
      return data.truck.employee_assistant;
    }

    if (data.truck?.employee) {
      return data.truck.employee;
    }

    return "—";
  };

  const LicensePlate = ({ plateNumber }) => {
    const part1 = plateNumber.slice(0, 2);
    const letter = plateNumber.slice(2, 3);
    const part2 = plateNumber.slice(3, 6);
    const cityCode = plateNumber.slice(6, 8);

    return (
      <div className="flex flex-col items-center my-4 select-none">
        <div
          className="relative flex items-center bg-[#eeeeee] border-[3px] border-[#222] rounded-lg shadow-lg overflow-hidden"
          style={{ width: '320px', height: '70px', fontFamily: 'Tahoma, Arial' }}
        >
          {/* بخش آبی سمت چپ (پرچم) */}
          <div className="flex flex-col items-center justify-between bg-[#133989] w-[15%] h-full py-1 text-white">
            <div className="w-8 h-5 bg-white flex flex-col overflow-hidden rounded-sm">
              <div className="h-1/3 bg-[#009246]"></div>
              <div className="h-1/3 bg-white"></div>
              <div className="h-1/3 bg-[#ff0000]"></div>
            </div>
            <div className="flex flex-col items-center leading-none">
              <span className="text-[8px] font-bold">I.R.</span>
              <span className="text-[10px] font-black">IRAN</span>
            </div>
          </div>

          {/* بخش اصلی اعداد */}
          <div className="flex flex-[3] items-center justify-around px-2 text-[#111] font-bold text-4xl tracking-tighter">
            <span>{part1}</span>
            <span className="text-3xl mb-1">{letter}</span>
            <span>{part2}</span>
          </div>

          {/* خط جداکننده سمت راست */}
          <div className="w-[2px] h-[80%] bg-[#222]"></div>

          {/* بخش کد شهر (سمت راست) */}
          <div className="flex flex-col items-center justify-center w-[20%] h-full">
            <span className="text-[10px] font-bold text-[#333] -mb-1">ایران</span>
            <span className="text-3xl font-bold text-[#111]">{cityCode}</span>
          </div>
        </div>
      </div>
    );
  };

  if (HIDE_HEADER_ROUTES.some((r) => pathname.startsWith(r))) {
    return null;
  }

  const token = "b5200023f4fd4c1f69b37c44901d31cec4e436aa";

  const [dailyViews, setDailyViews] = useState(0);
  const [totalViews, setTotalViews] = useState(0);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [trackingCode, setTrackingCode] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);
  const [loadingTrack, setLoadingTrack] = useState(false);
  const [errorTrack, setErrorTrack] = useState(null);

  const handleTrackRequest = async () => {
    if (!trackingCode.trim()) return;

    setLoadingTrack(true);
    setErrorTrack(null);
    setTrackingResult(null);

    try {
      const res = await fetch(`https://core.tmcopars.ir/core/task/${trackingCode}/`, {
        headers: {
          "Authorization": `Token ${token}`,
          "Accept": "application/json"
        },
      });
      if (!res.ok) throw new Error("Tracking failed");

      const data = await res.json();
      setTrackingResult(data);
    } catch (err) {
      setErrorTrack("نتیجه‌ای یافت نشد.");
    }

    setLoadingTrack(false);
  };


  useEffect(() => {
    fetch("/api/add-views")
      .then((res) => res.json())
      .then((data) => {
        setDailyViews(data.daily_views);
        setTotalViews(data.total_views);
      }).catch(err => console.error("Get views failed:", err));
  }, []);

  useLayoutEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    gsap.registerPlugin(MotionPathPlugin);
    let prevWidth = window.innerWidth;

    const worms = [
      { el: ".dot1", path: "#path1" },
      { el: ".dot2", path: "#path2" },
      { el: ".dot3", path: "#path3" },
      { el: ".dot4", path: "#path4" },
      { el: ".dot5", path: "#path5" },
      { el: ".dot6", path: "#path6" },
    ];

    const isBackgroundLight = (x, y) => {
      if (typeof document === "undefined") return false;
      let el = document.elementFromPoint(x, y);
      if (!el) return false;

      // شفاف‌سازی برای بررسی زیر عنصر glow
      if (
        el.classList.contains("worm-glow-light") ||
        el.classList.contains("worm-glow-dark")
      ) {
        el.style.pointerEvents = "none";
        const under = document.elementFromPoint(x, y);
        el.style.pointerEvents = "";
        el = under;
      }

      if (!el) return false;
      if (el.closest(".footer-dark-section")) return false;
      if (el.closest(".bg-white")) return true;
      return false;
    };

    const animateWorms = () => {
      _wormTweens.forEach((t) => t.kill());
      _wormTweens = [];

      worms.forEach(({ el, path }) => {
        const tween = gsap.to(el, {
          duration: 10,
          yoyo: true,
          repeat: -1,
          ease: "none",
          motionPath: {
            path,
            align: path,
            autoRotate: true,
            alignOrigin: [0.5, 0.5],
          },
          onUpdate: () => {
            const dot = document.querySelector(el);
            if (!dot) return;
            const bbox = dot.getBoundingClientRect();
            const centerX = bbox.left + bbox.width / 2;
            const centerY = bbox.top + bbox.height / 2;

            if (isBackgroundLight(centerX, centerY)) {
              dot.classList.remove("worm-glow-light");
              dot.classList.add("worm-glow-dark");
            } else {
              dot.classList.remove("worm-glow-dark");
              dot.classList.add("worm-glow-light");
            }
          },
          overwrite: "auto",
          immediateRender: true,
        });
        _wormTweens.push(tween);
      });
    };

    const handleResize = () => {
      const newWidth = window.innerWidth;
      if (newWidth !== prevWidth) {
        prevWidth = newWidth;
        animateWorms();
      }
    };
    const timeout = setTimeout(animateWorms, 50);
    const start = () => animateWorms();

    window.addEventListener("intro-finished", start);
    window.addEventListener("resize", handleResize);


    return () => {
      window.removeEventListener("intro-finished", start);
      window.removeEventListener("resize", handleResize);
      _wormTweens.forEach((t) => t.kill());
      _wormTweens = [];
      gsap.globalTimeline.clear();
      clearTimeout(timeout)
    };
  }, [pathname]);

  useEffect(() => {
    if (trackingOpen) {
      const now = new Date();

      const shamsi = new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
        year: "numeric"
      }).format(now);

      const englishDigits = shamsi.replace(/[٠-٩۰-۹]/g, d => "0123456789"["٠١٢٣٤٥٦٧٨٩۰۱۲۳۴۵۶۷۸۹".indexOf(d) % 10]);

      const twoDigit = englishDigits.slice(-3); // مثال: "04"

      setTrackingCode(`RAYA${twoDigit}`);
    }
  }, [trackingOpen]);


  return (
    <footer className="relative w-full overflow-hidden bg-white">

      {/* خطوط نورانی */}
      <div className="pointer-events-none absolute inset-0 z-40">
        <div className="worm-glow-light dot1"></div>
        <div className="worm-glow-light dot2"></div>
        <div className="worm-glow-light dot3"></div>
        <div className="worm-glow-light dot4"></div>
        <div className="worm-glow-light dot5"></div>
        <div className="worm-glow-light dot6"></div>
      </div>

      {/* لایه SVGها — به لبه‌ها پین شده؛ ترتیب چپ/راست مثل کد اولیه‌ی خودت حفظ شده */}
      <div className="pointer-events-none absolute inset-0 z-30">
        {/* بالا-راست = path1 (چپ می‌ماند) */}
        <svg
          className="absolute top-[1.5rem] right-0"
          style={{ width: "min(33vw, 520px)", height: "auto" }}
          width="519" height="518" viewBox="0 0 519 518" fill="none"
        >
          <path
            id="path1"
            d="M1.61401 0V223.263C1.61401 239.447 11.3654 254.035 26.3188 260.224L230.637 344.776C245.59 350.965 255.342 365.553 255.342 381.737V477C255.342 499.091 273.25 517 295.342 517H519"
            stroke="url(#lg1)" strokeOpacity="0.23" strokeWidth="2" vectorEffect="non-scaling-stroke"
          />
          <defs>
            <linearGradient id="lg1" x1="260.307" y1="35" x2="260.307" y2="517" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2A446F" stopOpacity="0" />
              <stop offset="1" stopColor="#2A446F" />
            </linearGradient>
          </defs>
        </svg>

        {/* بالا-چپ = path2 (راست می‌ماند) */}
        <svg
          className="absolute top-0 left-0 translate-y-[-1rem]"
          style={{ width: "min(36vw, 570px)", height: "auto" }}
          width="524" height="569" viewBox="0 0 524 569" fill="none"
        >
          <path
            id="path2"
            d="M523 0V349.935C523 369.347 509.062 385.957 489.945 389.328L272.46 427.672C253.342 431.043 239.405 447.653 239.405 467.065V527.772C239.405 558.327 206.531 577.6 179.868 562.676L0 462"
            stroke="url(#lg2)" strokeOpacity="0.23" strokeWidth="2" vectorEffect="non-scaling-stroke"
          />
          <defs>
            <linearGradient id="lg2" x1="261.5" y1="40.3482" x2="261.5" y2="596" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2A446F" stopOpacity="0" />
              <stop offset="1" stopColor="#2A446F" />
            </linearGradient>
          </defs>
        </svg>

        {/* میانه-راست = path3 (چپ می‌ماند) */}
        <svg
          className="absolute right-0 top-[35%] md:top-[38%]"
          style={{ width: "min(34vw, 520px)", height: "auto" }}
          width="510" height="396" viewBox="0 0 510 396" fill="none"
        >
          <path
            id="path3"
            d="M512 1H41.1306C19.0392 1 1.13055 18.9086 1.13055 41V355C1.13055 377.091 19.0392 395 41.1306 395H512"
            stroke="#2A446F" strokeOpacity="0.23" strokeWidth="2" vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* میانه-چپ = path4 (راست می‌ماند) */}
        <svg
          className="absolute left-0 top-[38%] md:top-[49%]"
          style={{ width: "min(34vw, 520px)", height: "auto" }}
          width="511" height="266" viewBox="0 0 511 266" fill="none"
        >
          <path
            id="path4"
            d="M509.5 -57.5V225C509.5 247.091 491.591 265 469.5 265H94.2798C79.36 265 65.6802 256.696 58.7945 243.461L-110 -81"
            stroke="#2A446F" strokeWidth="2" vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* پایین-راست = path5 (چپ می‌ماند) */}
        <svg
          className="absolute right-0 bottom-0 translate-y-[10%]"
          style={{ width: "min(42vw, 660px)", height: "auto" }}
          width="649" height="391" viewBox="0 0 649 391" fill="none"
        >
          <path
            id="path5"
            d="M649 165.5L485.039 11.8159C477.626 4.86704 467.845 1 457.684 1H41C18.9086 1 1 18.9086 1 41V395"
            stroke="#2A446F" strokeWidth="2" vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* پایین-چپ = path6 (راست می‌ماند) */}
        <svg
          className="absolute left-0 bottom-0 translate-y-[6%]"
          style={{ width: "min(30vw, 460px)", height: "auto" }}
          width="452" height="391" viewBox="0 0 452 391" fill="none"
        >
          <path
            id="path6"
            d="M0 1H410.649C442.719 1 461.749 36.849 443.78 63.4124L221.5 392"
            stroke="#2A446F" strokeWidth="2" vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* محتوای فوتر — بدون تغییر نسبت به نسخه‌ی تو */}
      <div className="relative z-20 grid min-h-[1500px] grid-rows-[auto_auto_auto]">
        <section className="mx-auto flex w-full h-[735px] flex-col justify-end px-6 pb-[clamp(8rem,16vw,12rem)] pt-[clamp(6rem,12vw,8rem)] text-right text-slate-700 lg:px-12">
          <h2 className="w-auto h-auto md:translate-y-[-90px] translate-y-[-180px] 2xl:translate-y-[-60px] text-center font-bold text-md md:text-2xl">
            همین حالا حمل و نقل خود را آغاز کنید.
          </h2>
          <button
            onClick={() => setTrackingOpen(true)}
            className="bg-[#3C9BD8] text-white font-bold mx-auto translate-y-[-100px] md:translate-y-0 py-2.5 w-[200px] rounded-md hover:bg-blue-500"
          >
            رهگیری سفارش
          </button>

        </section>

        <section className="relative footer-dark-section w-full h-[1200px] md:h-[767px] bg-[#0F2747] px-6 py-[clamp(8rem,16vw,12rem)] text-slate-100 lg:px-12">
          <h2 className="w-auto h-auto md:translate-y-[-90px] mt-16 md:mt-0 text-center font-bold text-md md:text-2xl">
            اولین پلتفرم حمل و نقل ترکیبی در ایران
          </h2>
          <h2 className="w-auto h-auto mt-10 md:mt-0 font-bold text-3xl">تمکو</h2>
          <p className="mt-8 md:text-lg text-[#ADBDCC] text-justify">
            شرکت مدیریت تأمین لجستیک نوین ایده پارس (TMCO)،یکی از زیر مجموعه های هلدینگ فاخر و تأسیس‌شده در سال ۱۴۰۲ است. تمکو با تکیه بر تجربه بنیان‌گذاران خود در صنعت لجستیک، با هدف تحول در مدیریت حمل‌ونقل سازمانی و توسعه زیرساخت‌های هوشمند فعالیت می‌کند. حوزه اصلی آن، مدیریت و اجرای عملیات حمل‌ونقل مرسولات از طریق یک پلتفرم دیجیتال و یکپارچه است. تمکو با گسترش قابلیت‌ها و ارائه راهکارهای نوین و مبتنی بر فناوری، کیفیت خدمات، شفافیت و رضایت مشتریان را در اولویت قرار داده و تجربه‌ای نو از حمل‌ونقل سازمانی ارائه می‌دهد.
          </p>

          <div className="flex-col md:flex-row justify-around h-full flex mt-8">
            <div className="w-full md:w-1/4 h-1/6 mx-0 md:mx-30 md:mt-16">
              <div className="flex mt-0 lg:mt-0 md:mt-35 md:-ml-20 justify-around w-full h-full">
                <div className="w-1/2 h-full">
                  <div className="flex flex-col gap-2">
                    <h2 className="font-bold">دسترسی سریع</h2>
                    <Link className="text-[#ADBDCC]" href="/services">خدمات ما</Link>
                    <Link className="text-[#ADBDCC]" href="/about">درباره ما</Link>
                    <Link className="text-[#ADBDCC]" href="/contact">تماس با ما</Link>
                    <Link className="text-[#ADBDCC]" href="/blog">بلاگ</Link>
                  </div>
                </div>
                <div className="w-1/2 h-full">
                  <div className="flex flex-col gap-2">
                    <h2 className="font-bold">آمار بازدیدکنندگان</h2>
                    <p className="text-[#ADBDCC]">کل بازدیدکنندگان:{totalViews}</p>
                    <p className="text-[#ADBDCC]">بازدیدکنندگان امروز:{dailyViews}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full md:w-1/4 h-3/6 mt-10 gap-8">
              <p className="font-bold">اطلاعات تماس</p>
              <div className="flex gap-4">
                <a
                  href="tel:02191095436"
                  className="flex gap-4 items-center hover:text-white transition"
                >
                  <LuHeadphones size={20} color="#ADBDCC" />
                  <span>02191095436</span>
                </a>
              </div>
              <div className="flex gap-4">
                <a
                  href="mailto:info@tmcopars.ir"
                  className="flex gap-4 items-center hover:text-white transition"
                >
                  <MdOutlineMailOutline size={20} color="#ADBDCC" />
                  <span>info@tmcopars.ir</span>
                </a>
              </div>
              <div className="flex-col">
                <IoLocationOutline size={20} color={"#ADBDCC"} /> <span>تهران ، شهرک استقلال ، خیابان سپاه اسلام ۳۶ ،خیابان شهید عباس شفیعی هنجنی ، پلاک ۴ ، طبقه همکف</span>
              </div>
            </div>

            <div className="w-1/5 md:w-[100px] md:mr-50 mt-20 mr-45 md:mt-25 lg:mt-0  h-2/6 flex justify-center">
              <img className="mt-16 ml-6 -translate-y-90 md:-translate-y-0 w-[40px] md:w-[550px] h-full" src="/logofull.svg" alt="logo" />
            </div>
          </div>
        </section>
      </div>
      {trackingOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-7 w-full max-w-md md:max-w-2xl shadow-2xl relative animate-fadeIn max-h-[85vh] overflow-y-auto">

            {/* دکمه بستن – سمت راست */}
            <button
              onClick={() => { setTrackingOpen(false); setTrackingCode(""); setTrackingResult(null); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-3xl font-bold transition-all"
            >
              ×
            </button>

            <h3 className="text-xl font-bold text-center mb-6">پنج کاراکتر آخر شناسه را وارد کنید</h3>

            {/* input + آیکون - هر دو سمت راست */}
            <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3 flex-row">

              <button onClick={handleTrackRequest} className="text-blue-600 font-bold text-2xl">
                <FaSearchLocation color="#3C9BD8" size={20} className="cursor-pointer" />
              </button>

              <input
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleTrackRequest()}
                dir="ltr"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                className="w-full outline-none font-semibold tracking-wide text-left placeholder:text-left"
                placeholder="Enter Tracking Code..."
              />

            </div>

            {loadingTrack && (
              <p className="mt-4 text-center text-gray-700">در حال دریافت اطلاعات...</p>
            )}

            {errorTrack && (
              <p className="mt-4 text-center text-red-500">{errorTrack}</p>
            )}

            {trackingResult && (
              <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm text-gray-700 space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">

                <div className="flex justify-between">
                  <span className="font-bold text-gray-900">مسیر:</span>
                  <span>
                    {trackingResult.order?.source?.name} به {trackingResult.order?.destination?.name}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-bold text-gray-900">وضعیت:</span>
                  <span>{trackingResult.status}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-bold text-gray-900">راننده:</span>
                  <span>{getDriverName(trackingResult)}</span>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2 border-t pt-4 mt-2">
                  <span className="font-bold text-gray-900">پلاک:</span>
                  <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-dashed border-gray-300">
                    <LicensePlate plateNumber={trackingResult.truck?.plate_number} />
                  </div>
                </div>

                {/* Progress Timeline */}

                <div className="pt-4 md:col-span-2">
                  <p className="font-bold text-gray-900 mb-4">مراحل سفر</p>

                  <div className="space-y-4">
                    {buildSteps(trackingResult.task_detail?.steps).map((step, i) => (
                      <div key={i} className="flex items-start gap-3">

                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 bg-[#3C9BD8] rounded-full"></div>
                          {i !== buildSteps(trackingResult.task_detail?.steps).length - 1 && (
                            <div className="w-[2px] h-10 bg-gray-200"></div>
                          )}
                        </div>

                        <div className="flex flex-col text-right">
                          <span className="font-semibold">{step.title}</span>

                          {step.time && (
                            <span className="text-xs text-gray-500">
                              {step.time.date} - {step.time.time}
                            </span>
                          )}
                        </div>

                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}


          </div>
        </div>
      )}



    </footer>
  );
}
