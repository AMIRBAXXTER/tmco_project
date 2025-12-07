"use client";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import JSZip from "jszip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function IntroAnimation() {
  const containerRef = useRef(null);
  const truckRef = useRef(null);
  const logoRef = useRef(null);
  const companyNameRef = useRef(null);

  // --- استیت‌ها ---
  const [phase, setPhase] = useState("intro");
  const [typedText, setTypedText] = useState("");
  const [framesReady, setFramesReady] = useState(false);

  // نوع دستگاه (mobile | desktop)
  const [deviceType, setDeviceType] = useState(
    typeof window !== "undefined" && window.innerWidth < 768
      ? "mobile"
      : "desktop"
  );

  const fullText = "تمکو اولین پلتفرم حمل و نقل ترکیبی";
  const frameCount = 139;

  // --- تشخیص نوع دستگاه ---
  const getDeviceType = () =>
    window.innerWidth < 768 ? "mobile" : "desktop";

  // --- تابع جدید لود فریم‌های موبایل/دسکتاپ ---
  const getFrames = async (type) => {
    if (typeof window === "undefined") return [];

    const cacheKey =
      type === "mobile" ? "_truckFramesMobile" : "_truckFramesDesktop";
    const fileName =
      type === "mobile" ? "/mobile.frames" : "/desktop.frames";

    // کش موجود؟
    if (window[cacheKey] && Array.isArray(window[cacheKey])) {
      return window[cacheKey];
    }

    // لود ZIP
    const res = await fetch(fileName);
    const zipBlob = await res.blob();
    const zip = await JSZip.loadAsync(zipBlob);

    const frames = [];
    const sortedFiles = Object.keys(zip.files)
      .filter((name) => name.endsWith(".webp"))
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)[0], 10);
        const numB = parseInt(b.match(/\d+/)[0], 10);
        return numA - numB;
      });

    for (const fileName of sortedFiles) {
      const fileData = await zip.files[fileName].async("blob");
      const url = URL.createObjectURL(fileData);
      frames.push(url);
    }

    window[cacheKey] = frames;
    return frames;
  };

  // --- لود اولیه فریم‌ها براساس نوع دستگاه ---
  useEffect(() => {
    if (typeof window === "undefined") return;

    const type = getDeviceType();
    setDeviceType(type);

    getFrames(type).then(() => setFramesReady(true));
  }, []);

  // --- آپدیت استیت deviceType هنگام resize/rotate ---
  useEffect(() => {
    const handleResize = () => {
      const current = getDeviceType();
      setDeviceType(current);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  // --- روی اولین فریم ست شود ---
  useEffect(() => {
    if (!framesReady) return;

    getFrames(deviceType).then((frames) => {
      if (truckRef.current && frames.length) {
        truckRef.current.src = frames[0];
      }
    });
  }, [framesReady, deviceType]);

  // --- لودر ---
  useLayoutEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    document.body.style.overflow = "hidden";

    if (!framesReady) {
      const ctx = gsap.context(() => {
        gsap.to("#loader-truck", {
          scale: 1.02,
          duration: 1.2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
        gsap.to("#loader-truck .road-line", {
          strokeDashoffset: 100,
          duration: 0.8,
          repeat: -1,
          ease: "linear",
        });
        gsap.to(["#wheel-left", "#wheel-right"], {
          rotation: 360,
          scale: 1.05,
          yoyo: true,
          transformOrigin: "center center",
          duration: 1.2,
          repeat: -1,
          ease: "linear",
        });
        gsap.to("#truck-body", {
          repeat: -1,
          yoyo: true,
          duration: 0.8,
          filter: "brightness(1.6)",
          ease: "power1.inOut",
        });
      });
      return () => ctx.revert();
    }
  }, [framesReady]);

  // --- انیمیشن INTRO ---
  useEffect(() => {
    if (!framesReady) return;
    if (typeof window === "undefined") return;

    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      const paths = gsap.utils.toArray(".intro-line path");

      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });

      tl.set([logoRef.current, companyNameRef.current, truckRef.current], {
        visibility: "hidden",
        opacity: 0,
      });

      paths.forEach((p, i) => {
        tl.to(p, { strokeDashoffset: 0, duration: 2, ease: "power3.out" }, i * 0.1);
      });

      tl.to(logoRef.current, {
        visibility: "visible",
        opacity: 1,
        scale: 1,
        duration: 1,
      })
        .to(
          companyNameRef.current,
          { visibility: "visible", opacity: 1, y: 0, duration: 1 },
          "-=0.5"
        )
        .to(logoRef.current, {
          filter: "grayscale(0%)",
          duration: 2,
          ease: "power2.inOut",
        })
        .to(truckRef.current, {
          visibility: "visible",
          scaleY: 1,
          opacity: 1,
          transformOrigin: "center center",
          duration: 2.5,
          ease: "power3.out",
        });

      tl.eventCallback("onComplete", async () => {
        const frames = await getFrames(deviceType);
        if (truckRef.current && frames.length) truckRef.current.src = frames[0];

        setPhase("scroll");
        document.body.style.overflow = "auto";
        window.dispatchEvent(new Event("intro-finished"));
      });
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      document.body.style.overflow = "auto";
    };
  }, [framesReady, deviceType]);

  // --- اسکرول ---
  useEffect(() => {
    if (phase !== "scroll" || !framesReady) return;
    let mounted = true;

    const obj = { frame: 1 };

    getFrames(deviceType).then((frames) => {
      if (!mounted) return;

      const scrollTween = gsap.to(obj, {
        frame: frameCount,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2000",
          scrub: 2.5,
          pin: true,
        },
        onUpdate: () => {
          if (!truckRef.current) return;
          truckRef.current.src = frames[obj.frame - 1];

          const progress = obj.frame / frameCount;
          const chars = Math.floor(progress * fullText.length);
          setTypedText(fullText.slice(0, chars));
        },
      });

      setTimeout(() => window.scrollY < 30 && ScrollTrigger.refresh(), 400);

      return () => {
        scrollTween.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
        gsap.globalTimeline.clear();
      };
    });

    return () => (mounted = false);
  }, [phase, framesReady, deviceType]);

  // --- JSX ---
  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-white overflow-hidden"
    >
      {!framesReady && (
        <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-white overflow-hidden">
          <div className="relative w-[220px] h-[100px]">
            <svg
              id="loader-truck"
              width="220"
              height="100"
              viewBox="0 0 220 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                className="road-line"
                x1="0"
                y1="85"
                x2="220"
                y2="85"
                stroke="#3C9BD8"
                strokeWidth="3"
                strokeDasharray="12 8"
              />
              <line
                className="road-line"
                x1="0"
                y1="92"
                x2="220"
                y2="92"
                stroke="#3C9BD8"
                strokeWidth="3"
                strokeDasharray="12 8"
              />
              <line
                className="road-line"
                x1="0"
                y1="99"
                x2="220"
                y2="99"
                stroke="#3C9BD8"
                strokeWidth="3"
                strokeDasharray="12 8"
              />

              <svg
                id="loader-truck"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="220"
                height="100"
                className="tmco-truck"
              >
                <defs>
                  <style>
                    {`.cls-1{fill:#dad7e5}.cls-6{fill:#425b72}.cls-7{fill:#374f68}.cls-9{fill:#b5e08c}`}
                  </style>
                </defs>
                <g id="Free_delivery" data-name="Free delivery">
                  <path className="cls-1" d="M31 8v28H16a4 4 0 0 0-8 0H1V8z" />
                  <path
                    d="M47 28v8h-4a4 4 0 0 0-8 0h-4V14h6.65a2 2 0 0 1 1.85 1.26L43 24a4 4 0 0 1 4 4z"
                    style={{ fill: "#6fabe6" }}
                  />
                  <path
                    d="M47 28v6h-4.54a4 4 0 0 0-6.92 0A2.54 2.54 0 0 1 33 31.46V14h4.65a2 2 0 0 1 1.85 1.26L43 24a4 4 0 0 1 4 4z"
                    style={{ fill: "#82bcf4" }}
                  />
                  <path
                    d="M43 24h-8V14h2.65a2 2 0 0 1 1.85 1.26z"
                    style={{ fill: "#9fdbf3" }}
                  />
                  <path
                    d="M43 24a6 6 0 0 1-6-6v-4h.65a2 2 0 0 1 1.85 1.26z"
                    style={{ fill: "#b2e5fb" }}
                  />
                  <path id="wheel-left" className="cls-6" d="M16 36a4 4 0 1 1-4-4 4 4 0 0 1 4 4z" />
                  <path
                    className="cls-7"
                    d="M14.93 38.72c-2.73 3-7.69.37-6.86-3.44 2.74-2.97 7.69-.36 6.86 3.44z"
                  />
                  <path id="wheel-right" className="cls-6" d="M43 36a4 4 0 1 1-4-4 4 4 0 0 1 4 4z" />
                  <path
                    className="cls-7"
                    d="M41.93 38.72c-2.73 3-7.69.37-6.86-3.44 2.74-2.97 7.69-.36 6.86 3.44z"
                  />
                  <path className="cls-1" d="M13 36a1 1 0 0 0-2 0 1 1 0 0 0 2 0z" />
                  <path
                    d="M31 8v26H15.46a4 4 0 0 0-6.92 0A4.54 4.54 0 0 1 4 29.46V8z"
                    style={{ fill: "#edebf2" }}
                  />
                  <path className="cls-1" d="M40 36a1 1 0 0 0-2 0 1 1 0 0 0 2 0z" />

                  <path className="cls-1" d="M1 27h30v2H1z" />
                </g>

                <text
                  x="27"
                  y="21"
                  fill="#3C9BD8"
                  fontSize="5.8"
                  fontWeight="bold"
                  fontFamily="Montserrat, sans-serif"
                  letterSpacing="0.7"
                >
                  TMCO
                </text>
              </svg>
            </svg>
          </div>

          <p className="text-sm text-[#2A446F] mt-6 font-semibold tracking-wide">
            در حال بارگذاری...
          </p>
        </div>
      )}

      {/* SVG های پس‌زمینه */}
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
        alt="Truck"
        className="absolute w-screen h-screen lg:h-[115vh] object-cover lg:object-fill z-40"
        style={{ visibility: "hidden", transform: "scaleY(0)", opacity: 0 }}
      />

      {/* متن پایین */}
      <p className="absolute bottom-13 left-1/2 mb-15 md:mb-0 -translate-x-1/2 w-full text-center text-2xl md:text-5xl lg:text-6xl font-bold text-white z-50">
        {typedText.length > 6 ? (
          <>
            {typedText.slice(0, typedText.length - 6)}
            <span className="text-[#64c2fc] bg-[#00123096] p-1 rounded-4xl">
              {typedText.slice(-6)}
            </span>
          </>
        ) : (
          <span className="text-[#64c2fc]">{typedText}</span>
        )}
      </p>
    </section>
  );
}
