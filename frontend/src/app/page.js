"use client";
import { useState } from "react";
import IntroAnimation from "@/components/IntroAnimation";

export default function Home() {

  return (
    <>
      <main className="mb-20">
        <IntroAnimation />
      </main>
      <section className="p-20 bg-gray-400">
        <h2>محتوای اصلی سایت</h2>
        <p>اینجا متن و بخش‌های دیگر قرار می‌گیرند...</p>
      </section>

    </>

  );
}
