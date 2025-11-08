"use client";
import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function DriverApp() {
  const structureRef = useRef(null);
  const keyRef = useRef(null);
  const profileRef = useRef(null);
  const truckRef = useRef(null);
  const routeRef = useRef(null);
  const mainImageRef = useRef(null);

  const keyLineRef = useRef(null);
  const truckLineRef = useRef(null);
  const profileLineRef = useRef(null);
  const routeLineRef = useRef(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    const ctx = gsap.context(() => {
      const structureEl = structureRef.current;
      if (!structureEl) return;
      const svgEl = structureEl.querySelector("svg");
      if (!svgEl) return;

      const initialImg = structureEl.querySelector("img");
      if (initialImg) initialImg.remove();

      // آماده‌سازی فریم گوشی
      const rects = svgEl.querySelectorAll("rect");
      rects.forEach((rect) => {
        const len = rect.getTotalLength?.() || 0;
        gsap.set(rect, { strokeDasharray: len, strokeDashoffset: len });
      });

      // آماده‌سازی خطوط اتصال
      const connectionRefs = [keyLineRef, truckLineRef, profileLineRef, routeLineRef];
      connectionRefs.forEach((ref) => {
        const path = ref.current?.querySelector("path");
        if (!path) return;
        const len = path.getTotalLength?.() || 0;
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
      });

      // مجموعه آیکون‌ها
      const icons = [
        {
          ref: keyRef,
          lineRef: keyLineRef,
          srcActive: "/DriverApp/2a.svg",
          srcInactive: "/DriverApp/2d.svg",
          structureSrc: "/DriverApp/2.png",
        },
        {
          ref: profileRef,
          lineRef: profileLineRef,
          srcActive: "/DriverApp/4a.svg",
          srcInactive: "/DriverApp/4d.svg",
          structureSrc: "/DriverApp/4.png",
        },
        {
          ref: routeRef,
          lineRef: routeLineRef,
          srcActive: "/DriverApp/3a.svg",
          srcInactive: "/DriverApp/3d.svg",
          structureSrc: "/DriverApp/3.png",
        },
        {
          ref: truckRef,
          lineRef: truckLineRef,
          srcActive: "/DriverApp/1a.svg",
          srcInactive: "/DriverApp/1d.svg",
          structureSrc: "/DriverApp/1.png",
        },
      ];

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: structureRef.current,
          start: "top+=2000 70%",
          end: "bottom+=2000 50%",
          toggleActions: "play none none none",
        },
      });

      // مرحله ۱: رسم بدنه موبایل
      tl.to(rects, {
        strokeDashoffset: 0,
        duration: 2.8,
        stagger: 0.25,
        ease: "power1.inOut",
      });

      // مرحله ۲: ظاهر شدن همه آیکون‌ها
      tl.from(
        icons.map((i) => i.ref.current),
        { opacity: 0, scale: 0.7, stagger: 0.25, duration: 0.8 },
        "-=1"
      );

      // مرحله ۳: رفتن مرحله‌به‌مرحله از آیکون ۱ تا ۴
      icons.forEach((icon, i) => {
        const prev = icons[i - 1];

        // 🔹 غیرفعال‌کردن آیکون قبلی
        if (prev?.ref.current) {
          const prevPath = prev.lineRef.current?.querySelector("path");
          if (prevPath) {
            tl.to(
              prevPath,
              {
                strokeDashoffset: prevPath.getTotalLength?.() || 0,
                duration: 0.6,
                ease: "power2.in",
                onComplete: () => gsap.set(prevPath, { opacity: 0 }),
              },
              "<"
            );
          }
          const prevImg = prev.ref.current.querySelector("img");
          if (prevImg) {
            tl.to(
              prevImg,
              {
                opacity: 0,
                duration: 0.3,
                onComplete: () => (prevImg.src = prev.srcInactive),
              },
              "<"
            ).to(prevImg, { opacity: 1, duration: 0.3 });
          }
        }

        // 🔹 فعال‌کردن آیکون فعلی
        if (icon.ref.current) {
          tl.to(icon.ref.current, {
            scale: 1.2,
            duration: 0.4,
            onStart: () => {
              const img = icon.ref.current.querySelector("img");
              if (!img) return;

              gsap.to(img, { opacity: 0, duration: 0.3 });

              const structureEl = structureRef.current;
              const newImg = document.createElement("img");
              Object.assign(newImg, {
                src: icon.structureSrc,
                alt: "structure-active",
              });
              Object.assign(newImg.style, {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: "0",
              });
              structureEl.appendChild(newImg);

              setTimeout(() => {
                img.src = icon.srcActive;
                gsap.to(newImg, { opacity: 1, duration: 0.5 });
                const allImgs = structureEl.querySelectorAll("img");
                if (allImgs.length > 1) allImgs[0].remove();
                gsap.to(img, { opacity: 1, duration: 0.3 });
              }, 300);
            },
          });
        }

        // 🔹 رسم خط ارتباط
        const path = icon.lineRef.current?.querySelector("path");
        if (path) {
          tl.to(path, { opacity: 1, duration: 0.8 }, "<0.15");
          tl.to(path, { strokeDashoffset: 0, duration: 1, ease: "linear" }, "<");
        }

        tl.to(icon.ref.current, { scale: 1.0, duration: 0.7 });
        if (i < icons.length - 1) tl.to({}, { duration: 0.5 });
      });

      ScrollTrigger.refresh();
    }, structureRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full md:w-[600px] h-[700px] mx-auto overflow-hidden">

      {/* مرکز موبایل */}
      <div
        ref={structureRef}
        className="absolute top-20 md:top-0 md:right-40 shadow-2xl rounded-4xl bg-transparent z-30"
      >
        <svg
          width="270"
          height="537"
          ref={mainImageRef}
          viewBox="0 0 270 537"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="269"
            height="536"
            rx="48.5"
            stroke="url(#paint0_linear_402_5943)"
          />
          <rect
            x="19.5"
            y="219.5"
            width="232"
            height="36"
            rx="5.5"
            stroke="url(#paint1_linear_402_5943)"
          />
          <rect
            x="19.5"
            y="280.5"
            width="232"
            height="36"
            rx="5.5"
            stroke="url(#paint2_linear_402_5943)"
          />
          <rect
            x="90.5"
            y="74.5"
            width="89"
            height="67"
            rx="5.5"
            stroke="url(#paint3_linear_402_5943)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_402_5943"
              x1="135"
              y1="0"
              x2="135"
              y2="537"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#00D4FF" />
              <stop offset="1" stopColor="#1B2F4F" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_402_5943"
              x1="19"
              y1="237.5"
              x2="252"
              y2="237.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#00D4FF" />
              <stop offset="1" stopColor="#1B2F4F" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_402_5943"
              x1="19"
              y1="298.5"
              x2="252"
              y2="298.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#00D4FF" />
              <stop offset="1" stopColor="#1B2F4F" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_402_5943"
              x1="90"
              y1="108"
              x2="180"
              y2="108"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#00D4FF" />
              <stop offset="1" stopColor="#1B2F4F" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* key icon */}
      <div
        ref={keyRef}
        className="absolute top-0 left-0 md:top-32 md:left-5 border border-gray-200 rounded-xl z-20"
      >
        <Image src="/DriverApp/2d.svg" alt="Search Icon" width={56} height={56} />
      </div>

      {/* خط اتصال key */}
      <svg
        ref={keyLineRef}
        className='absolute md:top-40 md:left-12 hidden md:block z-10'
        width="127"
        height="129"
        viewBox="0 0 127 129"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          transform="rotate(180 64 64)"
          d="M127 129L7.62939e-06 129L127 129ZM-3.73557e-06 -1L103 -1.00001C116.807 -1.00001 128 10.1929 128 24L126 24C126 11.2974 115.703 0.999986 103 0.999987L-3.56072e-06 0.999996L-3.73557e-06 -1ZM103 -1.00001C116.807 -1.00001 128 10.1929 128 24L128 129L126 129L126 24C126 11.2974 115.703 0.999986 103 0.999987L103 -1.00001ZM7.62939e-06 129L-3.64814e-06 -4.1561e-06L7.62939e-06 129Z"
          stroke="url(#paint0_linear_310_1933_key)"
          strokeWidth="0.5"
          fill="none"
        />
        <defs>
          <linearGradient id="paint0_linear_310_1933_key" x1="123.068" y1="6.67239" x2="-52.074" y2="-15.7109" gradientUnits="userSpaceOnUse">
            <stop stopColor="#165072" />
            <stop offset="1" stopColor="#00D1FC" />
          </linearGradient>
        </defs>
      </svg>

      {/* truck icon */}
      <div
        ref={truckRef}
        className="absolute top-0 right-0 md:top-0 md:right-20 border border-gray-200 rounded-xl z-20"
      >
        <Image src="/DriverApp/1d.svg" alt="Truck Icon" width={56} height={56} />
      </div>

      {/* خط اتصال truck */}
      <svg
        ref={truckLineRef}
        className='absolute md:top-5 md:right-27 z-10'
        width="132"
        height="129"
        viewBox="0 130 129"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          transform="rotate(90 64 64)"
          d="M127 129L7.62939e-06 129L127 129ZM-3.73557e-06 -1L103 -1.00001C116.807 -1.00001 128 10.1929 128 24L126 24C126 11.2974 115.703 0.999986 103 0.999987L-3.56072e-06 0.999996L-3.73557e-06 -1ZM103 -1.00001C116.807 -1.00001 128 10.1929 128 24L128 129L126 129L126 24C126 11.2974 115.703 0.999986 103 0.999987L103"
          stroke="url(#paint0_linear_310_1933_truck)"
          strokeWidth="0.5"
          fill="none"
        />
        <defs>
          <linearGradient id="paint0_linear_310_1933_truck" x1="123.068" y1="6.67239" x2="-52.074" y2="-15.7109" gradientUnits="userSpaceOnUse">
            <stop stopColor="#165072" />
            <stop offset="1" stopColor="#00D1FC" />
          </linearGradient>
        </defs>
      </svg>

      {/* profile icon */}
      <div
        ref={profileRef}
        className="absolute bottom-0 left-0 md:bottom-20 md:left-5 border border-gray-200 rounded-xl z-20"
      >
        <Image src="/DriverApp/4d.svg" alt="Chat Icon" width={56} height={56} />
      </div>

      {/* خط اتصال profile */}
      <svg
        ref={profileLineRef}
        className='absolute md:bottom-25 md:left-12 z-10'
        width="129"
        height="129"
        viewBox="0 0 127 129"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          transform="rotate(270 64 64)"
          d="M127 129L7.62939e-06 129L127 129ZM-3.73557e-06 -1L103 -1.00001C116.807 -1.00001 128 10.1929 128 24L126 24C126 11.2974 115.703 0.999986 103 0.999987L-3.56072e-06 0.999996L-3.73557e-06 -1ZM103 -1.00001C116.807 -1.00001 128 10.1929 128 24L128 129L126 129L126 24C126 11.2974 115.703 0.999986 103 0.999987L103 -1.00001ZM7.62939e-06 129L-3.64814e-06  "
          stroke="url(#paint0_linear_310_1933_profile)"
          strokeWidth="0.5"
          fill="none"
        />
        <defs>
          <linearGradient id="paint0_linear_310_1933_profile" x1="123.068" y1="6.67239" x2="-52.074" y2="-15.7109" gradientUnits="userSpaceOnUse">
            <stop stopColor="#165072" />
            <stop offset="1" stopColor="#00D1FC" />
          </linearGradient>
        </defs>
      </svg>

      {/* route icon */}
      <div
        ref={routeRef}
        className="absolute bottom-0 right-0 md:bottom-40 md:right-20 border border-gray-200 rounded-xl z-20"
      >
        <Image src="/DriverApp/3d.svg" alt="Settings Icon" width={56} height={56} />
      </div>

      {/* خط اتصال route */}
      <svg
        ref={routeLineRef}
        className='absolute md:bottom-45 md:right-27 z-10'
        width="129"
        height="135"
        viewBox="0 0 129 129"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M127 129ZM-3.73557e-06 -1L103 -1.00001C116.807 -1.00001 128 10.1929 128 24L126 24C126 11.2974 115.703 0.999986 103 0.999987L-3.56072e-06 0.999996L-3.73557e-06 -1ZM103 -1.00001C116.807 -1.00001 128 10.1929 128 24L128 129L126 129L126 24C126 11.2974 115.703 0.999986 103 0.999987L103 -1.00001ZM7.62939e-06 129L-3.64814e-06"
          stroke="url(#paint0_linear_310_1933_route)"
          strokeWidth="0.5"
          fill="none"


        />
        <defs>
          <linearGradient id="paint0_linear_310_1933_route" x1="123.068" y1="6.67239" x2="-52.074" y2="-15.7109" gradientUnits="userSpaceOnUse">
            <stop stopColor="#165072" />
            <stop offset="1" stopColor="#00D1FC" />
          </linearGradient>
        </defs>
      </svg>

    </div>
  );
}
