"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function IntroAnimation() {
  const containerRef = useRef(null);
  const truckRef = useRef(null);
  const [phase, setPhase] = useState("intro");
  const fullText = "تمکو اولین پلتفرم حمل و نقل ترکیبی";
  const [typedText, setTypedText] = useState("");


  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // آماده کردن خطوط SVG
      const paths = gsap.utils.toArray(".intro-line path");
      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });

      // انیمیشن کشیدن خطوط
      paths.forEach((path, index) => {
        tl.to(path, { strokeDashoffset: 0, duration: 2, ease: "power3.out" }, index * 0.1);
      });

      // نمایش لوگو و نام شرکت
      tl.from(".logo", { scale: 0.5, opacity: 0, duration: 1 }, "-=0.5");
      tl.from(".company_name", { y: 50, opacity: 0, duration: 1 }, "-=0.5");

      // تغییر رنگ لوگو
      tl.to(".logo", { filter: "grayscale(0%)", duration: 2.5, ease: "power2.inOut" });

      // نمایش کامیون
      tl.from(truckRef.current, { scaleY: 0, transformOrigin: "center center", duration: 2.5, ease: "power3.out" });

      // بعد از اتمام تایم‌لاین، شروع فاز اسکرول
      tl.eventCallback("onComplete", () => setPhase("scroll"));

    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (phase === "scroll") {
      const frameCount = 38;
      const currentFrame = (index) => `/TruckFrames/${String(index).padStart(2, "0")}.png`;

      // پیش‌بارگذاری
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
      }

      const obj = { frame: 1 };
      let runOnce = false;
      gsap.to(obj, {
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
          truckRef.current.src = currentFrame(obj.frame);
          const progress = obj.frame / frameCount;
          const charsToShow = Math.floor(progress * fullText.length);
          setTypedText(fullText.slice(0, charsToShow));
        },

      });
    }


  }, [phase]);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-white">

      {/* بک‌گراند SVG */}
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
          <path d="M0 1H473.544C505.635 1 524.661 36.8904 506.65 63.4504L96 669" stroke="url(#paint0_linear_164_187)" strokeOpacity="0.23" strokeWidth="5" />
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

      {/* محتوا مرکزی */}

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
        <img
          className="logo"
          src="/logo.svg"
          alt="Logo"
          width="80"
          style={{ filter: "grayscale(100%)" }}
        />
        <img
          src="/company_name.svg"
          alt="company name"
          width="80"
          className="company_name"
        />
      </div>
      <img
        ref={truckRef}
        src="/TruckFrames/01.png"
        alt="Truck"
        className="absolute w-screen h-screen lg:h-[115vh] lg:object-fill object-cover  z-40"
      />
      <p className="absolute bottom-13 left-1/2 -translate-x-1/2 w-full text-center text-xl md:text-3xl lg:text-4xl font-bold text-white z-50">
        {typedText.length > 6
          ? <>
            {typedText.slice(0, typedText.length - 6)}
            <span className="text-[#3C9BD8]">{typedText.slice(-6)}</span>
          </>
          : <span className="text-[#3C9BD8]">{typedText}</span>
        }
      </p>


    </section>
  );
}
