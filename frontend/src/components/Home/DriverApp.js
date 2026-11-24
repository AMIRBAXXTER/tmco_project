"use client";

import React, { useId, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

// ترتیب آرایه، ترتیب پخش است. port محل ورود خط روی ضلع گوشی در نمای عریض است.
const STEPS = [
  { id: 2, side: "left", row: "top", port: 0.54 },
  { id: 4, side: "left", row: "bottom", port: 0.72 },
  { id: 3, side: "right", row: "bottom", port: 0.72 },
  { id: 1, side: "right", row: "top", port: 0.27 },
];
const HOLD_SECONDS = 1.5;
const DASH = { pathLength: 1, strokeDasharray: "1 1", strokeDashoffset: 1 };

function elbowPath(x1, y1, x2, y2, horizontalFirst) {
  const radius = Math.min(22, Math.abs(x2 - x1), Math.abs(y2 - y1));
  const dx = Math.sign(x2 - x1) * radius;
  const dy = Math.sign(y2 - y1) * radius;
  if (horizontalFirst) {
    return `M ${x1} ${y1} H ${x2 - dx} Q ${x2} ${y1} ${x2} ${y1 + dy} V ${y2}`;
  }
  return `M ${x1} ${y1} V ${y2 - dy} Q ${x1} ${y2} ${x1 + dx} ${y2} H ${x2}`;
}

// آیکون، قاب و لایهٔ خطوط نسبت به یک والد چیده شده‌اند.
function connectorPath(icon, frame, step) {
  const fromLeft = step.side === "left";
  const { offsetLeft: phoneX, offsetTop: phoneY, offsetWidth: phoneW, offsetHeight: phoneH } = frame;
  const { offsetLeft: iconX, offsetTop: iconY, offsetWidth: iconW, offsetHeight: iconH } = icon;
  const above = iconY + iconH <= phoneY;

  if (above || iconY >= phoneY + phoneH) {
    // در موبایل، خط از کنار آیکون به لبهٔ بالا یا پایین قاب می‌رسد.
    const startX = fromLeft ? iconX + iconW : iconX;
    const endX = phoneX + phoneW * (fromLeft ? 0.3 : 0.7);
    return elbowPath(startX, iconY + iconH / 2, endX, above ? phoneY : phoneY + phoneH, true);
  }

  const endY = phoneY + phoneH * step.port;
  const startY = endY > iconY + iconH / 2 ? iconY + iconH : iconY;
  return elbowPath(iconX + iconW / 2, startY, fromLeft ? phoneX : phoneX + phoneW, endY, false);
}

export default function DriverApp() {
  const stageRef = useRef(null);
  const frameRef = useRef(null);
  const uid = `driver-${useId().replace(/:/g, "")}`;

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const frame = frameRef.current;
    if (!stage || !frame) return;

    const ctx = gsap.context(() => {
      const items = STEPS.map((step) => {
        const icon = stage.querySelector(`[data-icon="${step.id}"]`);
        return {
          step, icon,
          off: icon.querySelector("[data-off]"),
          on: icon.querySelector("[data-on]"),
          wire: stage.querySelector(`[data-wire="${step.id}"]`),
          screen: frame.querySelector(`[data-screen="${step.id}"]`),
        };
      });
      function positionWires() {
        for (const { step, icon, wire } of items) {
          wire.setAttribute("d", connectorPath(icon, frame, step));
        }
      }
      positionWires();

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: { trigger: frame, start: "center center", once: true },
      });
      tl.to(frame.querySelectorAll("rect"), {
        attr: { "stroke-dashoffset": 0 },
        duration: 2.8, stagger: 0.25, ease: "power1.inOut",
      });
      tl.to(items.map(({ icon }) => icon), {
        opacity: 1, scale: 1, duration: 0.8, stagger: 0.25,
      }, "-=1");

      let mounted = true;
      items.forEach(({ icon, off, on, wire, screen }, i) => {
        // کند بودن دانلود یک تصویر، نمایش مرحله‌های قبلی را عقب نمی‌اندازد.
        const ready = Promise.allSettled([off, on, screen].map((img) => img.decode?.()));
        tl.addPause(tl.duration(), () => {
          ready.then(() => { if (mounted) tl.resume(); });
        });

        // ۱. ابتدا آیکون کاملاً روشن می‌شود.
        tl.to(icon, { scale: 1.2, duration: 0.35 })
          .to(off, { opacity: 0, duration: 0.35 }, "<")
          .to(on, { opacity: 1, duration: 0.35 }, "<");

        // ۲. سپس خط از آیکون تا مرز قاب رسم می‌شود.
        tl.set(wire, { opacity: 1 })
          .to(wire, { attr: { "stroke-dashoffset": 0 }, duration: 1, ease: "none" });

        // ۳. تصویر جدید روی تصویر قبلی ظاهر می‌شود.
        tl.to(screen, { opacity: 1, duration: 0.5 })
          .to(icon, { scale: 1, duration: 0.5 }, "<");
        if (i === 0) {
          tl.to(frame.querySelector("[data-details]"), { opacity: 0, duration: 0.5 }, "<");
        } else {
          tl.set(items[i - 1].screen, { opacity: 0 });
        }

        if (i < items.length - 1) {
          tl.to(wire, {
            attr: { "stroke-dashoffset": 1 }, duration: 0.45, ease: "power2.in",
          }, `+=${HOLD_SECONDS}`)
            .to(on, { opacity: 0, duration: 0.35 }, "<")
            .to(off, { opacity: 1, duration: 0.35 }, "<")
            .set(wire, { opacity: 0 });
        }
      });

      const resize = new ResizeObserver(() => {
        positionWires();
        tl.scrollTrigger?.refresh();
      });
      resize.observe(stage);
      return () => {
        mounted = false;
        resize.disconnect();
      };
    }, stage);

    return () => ctx.revert();
  }, []);

  return (
    <div className="driver-app-showcase">
      <div ref={stageRef} className="driver-stage" role="img" aria-label="نمایش چهار صفحهٔ اپلیکیشن رانندگان">
        <svg className="driver-wires" aria-hidden="true" width="100%" height="100%" fill="none">
          <defs>
            <linearGradient id={`${uid}-wire-l`}>
              <stop stopColor="#165072" /><stop offset="1" stopColor="#00D1FC" />
            </linearGradient>
            <linearGradient id={`${uid}-wire-r`} x1="100%" x2="0%">
              <stop stopColor="#165072" /><stop offset="1" stopColor="#00D1FC" />
            </linearGradient>
          </defs>
          {STEPS.map(({ id, side }) => (
            <path key={id} data-wire={id} {...DASH} opacity="0" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              stroke={`url(#${uid}-wire-${side === "left" ? "l" : "r"})`} />
          ))}
        </svg>

        <div ref={frameRef} className="driver-phone">
          {STEPS.map(({ id }) => (
            <Image key={id} data-screen={id} src={`/DriverApp/${id}.png`} alt="" fill
              sizes="270px" loading="eager" style={{ opacity: 0, objectFit: "cover" }} />
          ))}
          <svg className="driver-outline" viewBox="0 0 270 537" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id={`${uid}-border`} x1="0" y1="0" x2="0" y2="100%">
                <stop stopColor="#00D4FF" /><stop offset="1" stopColor="#1B2F4F" />
              </linearGradient>
              <linearGradient id={`${uid}-fields`}>
                <stop stopColor="#00D4FF" /><stop offset="1" stopColor="#1B2F4F" />
              </linearGradient>
            </defs>
            <rect {...DASH} x="0.5" y="0.5" width="269" height="536" rx="48.5"
              stroke={`url(#${uid}-border)`} />
            <g data-details="" stroke={`url(#${uid}-fields)`}>
              <rect {...DASH} x="19.5" y="219.5" width="232" height="36" rx="5.5" />
              <rect {...DASH} x="19.5" y="280.5" width="232" height="36" rx="5.5" />
              <rect {...DASH} x="90.5" y="74.5" width="89" height="67" rx="5.5" />
            </g>
          </svg>
        </div>

        {STEPS.map(({ id, side, row }) => (
          <div key={id} data-icon={id} data-side={side} data-row={row} className="driver-icon">
            <Image data-off="" src={`/DriverApp/${id}d.svg`} alt="" fill sizes="56px" loading="eager" />
            <Image data-on="" src={`/DriverApp/${id}a.svg`} alt="" fill sizes="56px" loading="eager"
              style={{ opacity: 0 }} />
          </div>
        ))}
      </div>

      <style>{`
        .driver-app-showcase {
          width: 100%; max-width: 600px; margin-inline: auto; container-type: inline-size;
        }
        .driver-app-showcase .driver-stage {
          position: relative; isolation: isolate; display: grid;
          justify-items: center; padding: 80px 0;
        }
        .driver-app-showcase .driver-wires, .driver-app-showcase .driver-outline {
          position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;
        }
        .driver-app-showcase .driver-phone {
          position: relative; z-index: 1; width: min(270px, calc(100% - 32px));
          aspect-ratio: 270 / 537; overflow: hidden; isolation: isolate;
          border-radius: 18% / 9.05%; box-shadow: 0 25px 50px -12px rgb(0 0 0 / 25%);
        }
        .driver-app-showcase .driver-outline { z-index: 1; }
        .driver-app-showcase .driver-icon {
          position: absolute; z-index: 2; box-sizing: border-box; width: 56px; height: 56px;
          border: 1px solid #e5e7eb; border-radius: 12px; opacity: 0; transform: scale(0.7);
        }
        .driver-app-showcase [data-side="left"] { left: 6px; }
        .driver-app-showcase [data-side="right"] { right: 6px; }
        .driver-app-showcase [data-row="top"] { top: 6px; }
        .driver-app-showcase [data-row="bottom"] { bottom: 6px; }
        @container (min-width: 500px) {
          .driver-app-showcase .driver-stage { padding: 0 0 163px; }
          .driver-app-showcase [data-side="left"] { left: 20px; }
          .driver-app-showcase [data-side="right"] { right: calc(50% - 220px); }
          .driver-app-showcase [data-row="top"][data-side="left"] { top: 128px; }
          .driver-app-showcase [data-row="top"][data-side="right"] { top: 0; }
          .driver-app-showcase [data-row="bottom"] { bottom: 160px; }
        }
      `}</style>
    </div>
  );
}
