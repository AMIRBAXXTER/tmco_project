"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  const [framesReady, setFramesReady] = useState(false);

  const fullText = "تمکو اولین پلتفرم حمل و نقل ترکیبی";
  const frameCount = 139;
  
  // 🧩 حافظهٔ جهانی فریم‌ها
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

  // 🚫 جلوگیری از اسکرول تا پایان فاز intro
  useEffect(() => {
    const shouldLockScroll = !framesReady || phase !== "scroll";
    document.body.style.overflow = shouldLockScroll ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [phase, framesReady]);

  // 🎞️ انیمیشن لودر (قبل از آماده شدن فریم‌ها)
  useLayoutEffect(() => {
    if (!framesReady) {
      const ctx = gsap.context(() => {
        gsap.to("#loader-truck .road-line", {
          strokeDashoffset: 100,
          duration: 1,
          repeat: -1,
          ease: "linear",
        });

        gsap.to(["#wheel-left", "#wheel-right"], {
          rotation: 360,
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

  // 🎬 فاز INTRO
  useEffect(() => {
    if (!framesReady) return;

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
        tl.to(
          path,
          {
            strokeDashoffset: 0,
            duration: 2,
            ease: "power3.out",
          },
          i * 0.1
        );
      });

      tl.to(
        logoRef.current,
        {
          visibility: "visible",
          opacity: 1,
          scale: 1,
          duration: 1,
        },
        "-=0.5"
      );

      tl.to(
        companyNameRef.current,
        {
          visibility: "visible",
          opacity: 1,
          y: 0,
          duration: 1,
        },
        "-=0.5"
      );

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

      // 👇🏻 پس از پایان INTRO → انتقال به فاز SCROLL
      tl.eventCallback("onComplete", async () => {
        const frames = await getCachedFrames();
        if (truckRef.current) {
          truckRef.current.src = frames[0];
        }

        setPhase("scroll");
        window.dispatchEvent(new Event("intro-finished"));
      });
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === containerRef.current) trigger.kill();
      });
    };
  }, [framesReady]);

  // 🚚 فاز SCROLL
  useEffect(() => {
    let isMounted = true;

    if (phase === "scroll" && framesReady) {
      const obj = { frame: 1 };
      const framesPromise = getCachedFrames();

      framesPromise.then((frames) => {
        if (!isMounted) return;

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

        setTimeout(() => {
          if (window.scrollY < 30) ScrollTrigger.refresh();
        }, 500);

        return () => {
          scrollTween.scrollTrigger?.kill();
          scrollTween.kill();
          ScrollTrigger.getAll().forEach((t) => t.kill());
          gsap.globalTimeline.clear();
        };
      });
    }

    return () => {
      isMounted = false;
    };
  }, [phase, framesReady]);

  // 🧱 JSX Render
  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-white overflow-hidden"
    >
      {/* لودر موقت */}
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

              <g id="truck-group" transform="translate(75, 35)">
                <rect
                  id="truck-body"
                  x="0"
                  y="5"
                  width="70"
                  height="35"
                  rx="5"
                  fill="#2A446F"
                />
                <rect x="70" y="15" width="25" height="25" fill="#3C9BD8" />
                <circle id="wheel-left" cx="15" cy="42" r="7" fill="black" />
                <circle id="wheel-right" cx="80" cy="42" r="7" fill="black" />
              </g>
            </svg>
          </div>

          <p className="text-sm text-[#2A446F] mt-6 font-semibold tracking-wide">
            در حال بارگذاری...
          </p>
        </div>
      )}

      {/* SVG پس‌زمینه */}
      <div className="absolute inset-0 z-0">
        {/* خطوط تزئینی چپ/راست/بالا/پایین */}
        {/* همه‌ی خطوط intro-line را حفظ کن */}
        {/* ... همان چهار svg  مربوط به intro-line مانند نسخه اصلی */}
      </div>

      {/* مرکز صفحه */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
        <img
          ref={logoRef}
          src="/logo.svg"
          alt="Logo"
          width="80"
          style={{
            filter: "grayscale(100%)",
            visibility: "hidden",
            opacity: 0,
          }}
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
        src="/TruckFrames/1.webp"
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
