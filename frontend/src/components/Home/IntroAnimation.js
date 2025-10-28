"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function IntroAnimation() {
  const containerRef = useRef(null);
  const truckRef = useRef(null);
  const logoRef = useRef(null);
  const companyNameRef = useRef(null);

  const [phase, setPhase] = useState("intro");
  const [typedText, setTypedText] = useState("");
  const [framesReady, setFramesReady] = useState(false); // ✅ وضعیت لود فریم‌ها
  const fullText = "تمکو اولین پلتفرم حمل و نقل ترکیبی";
  const frameCount = 139;

  // 🧩 حافظه جهانی فریم‌ها
  const getCachedFrames = async () => {
    if (window._truckFrames && Array.isArray(window._truckFrames)) {
      return window._truckFrames;
    }

    const frames = [];
    for (let i = 1; i <= frameCount; i++) {
      const res = await fetch(`/TruckFrames/${i}.webp`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      frames.push(url);
    }
    window._truckFrames = frames;
    return frames;
  };

  // 🧠 پیش‌لود فریم‌ها
  useEffect(() => {
    getCachedFrames().then(() => {
      setFramesReady(true);
      console.log("✅ Truck frames preloaded globally.");
    });
  }, []);

  // 🎞️ انیمیشن لودر قبل از شروع intro
  useEffect(() => {
    if (!framesReady) {
      const ctx = gsap.context(() => {
        // جاده زیر کامیون حرکت کند
        gsap.to("#loader-truck .road-line", {
          strokeDashoffset: 100,
          duration: 1,
          repeat: -1,
          ease: "linear"
        });

        // چرخ‌های کامیون بچرخند (ولی خودش حرکت نکند)
        gsap.to(["#wheel-left", "#wheel-right"], {
          rotation: 360,
          transformOrigin: "center center",
          duration: 1.2,
          repeat: -1,
          ease: "linear"
        });

        // درخشش لوگو Tamco برای حس زنده بودن
        gsap.to("#truck-body", {
          repeat: -1,
          yoyo: true,
          duration: 0.8,
          filter: "brightness(1.6)",
          ease: "power1.inOut"
        });
      });

      return () => ctx.revert();
    }
  }, [framesReady]);



  // 🎬 فاز INTRO
  useEffect(() => {
    if (!framesReady) return; // ✅ صبر کن تا فریم‌ها آماده بشن

    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      const paths = gsap.utils.toArray(".intro-line path");
      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });

      tl.set([logoRef.current, companyNameRef.current, truckRef.current], {
        visibility: "hidden",
        opacity: 0,
      });

      paths.forEach((path, i) => {
        tl.to(path, {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power3.out",
        }, i * 0.1);
      });

      tl.to(logoRef.current, {
        visibility: "visible",
        opacity: 1,
        scale: 1,
        duration: 1,
      }, "-=0.5");

      tl.to(companyNameRef.current, {
        visibility: "visible",
        opacity: 1,
        y: 0,
        duration: 1,
      }, "-=0.5");

      tl.to(logoRef.current, {
        filter: "grayscale(0%)",
        duration: 2,
        ease: "power2.inOut",
      });

      tl.to(truckRef.current, {
        visibility: "visible",
        scaleY: 1,
        opacity: 1,
        transformOrigin: "center center",
        duration: 2.5,
        ease: "power3.out",
      });

      // 👇🏻 انتقال به فاز scroll فقط بعد از پایان Intro کامل
      tl.eventCallback("onComplete", () => {
        document.body.style.overflow = "auto";
        setPhase("scroll");
        window.dispatchEvent(new Event("intro-finished"));
      });
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === containerRef.current) trigger.kill();
      });
      document.body.style.overflow = "auto";
    };
  }, [framesReady]); // ✅ فقط وقتی فریم‌ها آماده شدن اجرا کن


  // 🚚 فاز SCROLL با کنترل کامل
  useEffect(() => {
    let isMounted = true;

    if (phase === "scroll" && framesReady) {
      const obj = { frame: 1 };
      const framesPromise = getCachedFrames();

      document.body.style.overflow = "hidden"; // 🚫 جلوگیری از scroll قبل از لود

      framesPromise.then((frames) => {
        if (!isMounted) return;

        document.body.style.overflow = "auto"; // حالا اجازه‌ی scroll بده

        const scrollTween = gsap.to(obj, {
          frame: frameCount,
          snap: "frame",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=2000",
            scrub: 1.5,
            pin: true,
          },
          onUpdate: () => {
            if (!truckRef.current) return;
            truckRef.current.src = frames[obj.frame - 1];

            const progress = obj.frame / frameCount;
            const charsToShow = Math.floor(progress * fullText.length);
            setTypedText(fullText.slice(0, charsToShow));
          },
        });

        // ✅ Refresh فقط اگر کاربر هنوز اسکرول نکرده
        setTimeout(() => {
          if (window.scrollY < 30) ScrollTrigger.refresh();
        }, 500);

        return () => {
          scrollTween.scrollTrigger?.kill();
          scrollTween.kill();
          ScrollTrigger.getAll().forEach((t) => t.kill());
          gsap.globalTimeline.clear();
          document.body.style.overflow = "auto";
        };
      });
    }

    return () => {
      isMounted = false;
    };
  }, [phase, framesReady]);

  // 🧱 رندر JSX
  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-white overflow-hidden"
    >
      {/* لودر موقت */}
      {!framesReady && (
        <div
          className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-white overflow-hidden"
        >
          {/* SVG کامیون ثابت روی جاده متحرک */}
          <div className="relative w-[220px] h-[100px]">
            <svg
              id="loader-truck"
              width="220"
              height="100"
              viewBox="0 0 220 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* 👇 سه خط جاده متحرک */}
              <line className="road-line" x1="0" y1="85" x2="220" y2="85" stroke="#3C9BD8" strokeWidth="3" strokeDasharray="12 8" />
              <line className="road-line" x1="0" y1="92" x2="220" y2="92" stroke="#3C9BD8" strokeWidth="3" strokeDasharray="12 8" />
              <line className="road-line" x1="0" y1="99" x2="220" y2="99" stroke="#3C9BD8" strokeWidth="3" strokeDasharray="12 8" />

              {/* 🚚 خود کامیون – ثابت */}
              <g id="truck-group" transform="translate(75, 35)">
                <rect id="truck-body" x="0" y="5" width="70" height="35" rx="5" fill="#2A446F" />
                <rect x="70" y="15" width="25" height="25" fill="#3C9BD8" />
                <circle id="wheel-left" cx="15" cy="42" r="7" fill="black" />
                <circle id="wheel-right" cx="80" cy="42" r="7" fill="black" />
                {/* لوگوی Tamco */}
                <text x="8" y="27" fontSize="14" fontWeight="700" fill="white">Tamco</text>
              </g>
            </svg>
          </div>

          {/* متن پایین لودر */}
          <p className="text-sm text-[#2A446F] mt-6 font-semibold tracking-wide">
            در حال بارگذاری...
          </p>
        </div>
      )}



      {/* SVG پس‌زمینه */}
      <div className="absolute inset-0 z-0">
        <svg className="intro-line absolute top-0 left-0 w-1/4 h-3/5" width="508" height="570" viewBox="0 0 508 570" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M506.5 0V349.767C506.5 369.254 492.458 385.904 473.251 389.193L247.749 427.807C228.542 431.096 214.5 447.746 214.5 467.233V528.727C214.5 559.065 182.049 578.36 155.396 563.87L-32 462" stroke="url(#paint0_linear_164_185)" strokeOpacity="0.23" strokeWidth="5" />
          <defs>
            <linearGradient id="paint0_linear_164_185" x1="237.25" y1="40.3482" x2="237.25" y2="596" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2A446F" stopOpacity="0" />
              <stop offset="1" stopColor="#2A446F" />
            </linearGradient>
          </defs>
        </svg>

        <svg className="intro-line absolute top-0 right-0 w-1/4 h-1/2" width="522" height="474" viewBox="0 0 522 474" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 -44V179.192C1 195.411 10.7939 210.025 25.7955 216.19L231.705 300.81C246.706 306.975 256.5 321.589 256.5 337.808V433C256.5 455.091 274.409 473 296.5 473H522" stroke="url(#paint0_linear_164_182)" strokeOpacity="0.23" strokeWidth="5" />
          <defs>
            <linearGradient id="paint0_linear_164_182" x1="261.5" y1="-9" x2="261.5" y2="473" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2A446F" stopOpacity="0" />
              <stop offset="1" stopColor="#2A446F" />
            </linearGradient>
          </defs>
        </svg>

        <svg className="intro-line absolute bottom-0 left-0 w-1/4 h-1/3" width="515" height="352" viewBox="0 0 515 352" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 1H473.544C505.635 1 524.661 36.8904 506.65 63.4504L96 669" stroke="url(#paint0_linear_164_187)" strokeOpacity="0.23" strokeWidth="7" />
          <defs>
            <linearGradient id="paint0_linear_164_187" x1="4.89625e-05" y1="535.5" x2="642" y2="-22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2A446F" stopOpacity="0" />
              <stop offset="1" stopColor="#2A446F" />
            </linearGradient>
          </defs>
        </svg>

        <svg className="intro-line absolute bottom-0 right-0 w-1/4" width="543" height="352" viewBox="0 0 543 352" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M696 223.5L485.216 12.7157C477.714 5.21429 467.54 1 456.931 1H41C18.9086 1 1 18.9086 1 41V576" stroke="url(#paint0_linear_164_186)" strokeOpacity="0.23" strokeWidth="5" />
          <defs>
            <linearGradient id="paint0_linear_164_186" x1="651.5" y1="913" x2="-50.5" y2="-27.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2A446F" stopOpacity="0" />
              <stop offset="1" stopColor="#2A446F" />
            </linearGradient>
          </defs>
        </svg>
      </div>


      {/* مرکز صفحه */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
        <img
          ref={logoRef}
          className="logo"
          src="/logo.svg"
          alt="Logo"
          width="80"
          style={{ filter: "grayscale(100%)", visibility: "hidden", opacity: 0 }}
        />
        <img
          ref={companyNameRef}
          src="/company_name.svg"
          alt="company name"
          width="80"
          style={{
            visibility: "hidden",
            opacity: 0,
            transform: "translateY(50px)",
          }}
        />
      </div>

      {/* کامیون */}
      <img
        ref={truckRef}
        src="/TruckFrames/1.webp" // ✅ placeholder اولیه
        alt="Truck"
        className="absolute w-screen h-screen lg:h-[115vh] object-cover lg:object-fill z-40"
        style={{ visibility: "hidden", transform: "scaleY(0)", opacity: 0 }}
      />

      {/* متن پایین */}
      <p className="absolute bottom-13 left-1/2 mb-15 md:mb-0 -translate-x-1/2 w-full text-center text-2xl md:text-3xl lg:text-4xl font-bold text-white z-50">
        {typedText.length > 6 ? (
          <>
            {typedText.slice(0, typedText.length - 6)}
            <span className="text-[#3C9BD8]">{typedText.slice(-6)}</span>
          </>
        ) : (
          <span className="text-[#3C9BD8]">{typedText}</span>
        )}
      </p>
    </section>
  );
}
