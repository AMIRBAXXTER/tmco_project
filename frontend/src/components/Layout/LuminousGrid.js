"use client";

import React, { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import MotionEffect from "@/animations/MotionEffect";

export default function LuminousGrid() {
  useLayoutEffect(() => {
    gsap.registerPlugin(MotionPathPlugin);

    const worms = [
      { el: ".dot-horizontal", path: "#path-horizontal", duration: 8 },
      { el: ".dot-vertical", path: "#path-vertical", duration: 2 },
    ];

    const animateWorms = () => {
      worms.forEach(({ el, path, duration }) => {
        gsap.to(el, {
          duration: duration,
          yoyo: true,
          repeat: -1,
          ease: "none", // ⚙️ ثابت و یکنواخت
          motionPath: {
            path,
            align: path,
            autoRotate: true,
            alignOrigin: [0.5, 0.5],
          },
        });
      });
    };

    animateWorms();
    window.addEventListener("resize", animateWorms);

    return () => window.removeEventListener("resize", animateWorms);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-[150px] md:h-[300px]">
      <svg className="absolute -top-25 md:-top-15 left-0 w-full" style={{ height: "240px" }} viewBox="0 0 1920 180">
        {[...Array(8)].map((_, row) => (
          <g key={row} transform={`translate(0, ${row * 60})`}>
            {[...Array(32)].map((_, col) => (
              <rect
                key={col}
                x={col * 60}
                y={0}
                width={50}
                height={50}
                fill="transparent"
                stroke="#E3E3E3"
                strokeWidth="1"
              />
            ))}
          </g>
        ))}
      </svg>

      {/* نقاط و مسیرهای نورانی */}
      <div className="pointer-events-none absolute inset-0 z-50">
        <div className="worm-glow-dark dot-horizontal"></div>
        <div className="worm-glow-dark dot-vertical"></div>
      </div>

      <svg className="absolute inset-0 z-40 w-full h-full" viewBox="0 0 1920 300" fill="none">
        <path
          id="path-horizontal"
          d="M0 108 H1920"
          stroke="#2A446F"
          strokeOpacity="0.23"
          strokeWidth="0"
        />
        <path
          id="path-vertical"
          d="M1735 -50 V180"
          stroke="#2A446F"
          strokeOpacity="0.23"
          strokeWidth="0"
        />
      </svg>
    </div>
  );
}
