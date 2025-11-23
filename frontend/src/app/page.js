"use client";
import { useEffect, useState, useRef } from "react";
import { IntroAnimation, WhyTmco, DriverApp, DriverDetail } from "@/components/Home";
import MotionEffect from "../animations/MotionEffect";
import Image from "next/image";
import TrapezoidLayout from "@/components/Home/TrapezoidLayout";
import BlogCarousel from "@/components/BlogCarousel";
import TariffInquiry from "@/components/TariffInquiry";
import ClientsSection from "@/components/Home/ClientsSection";

export default function Home() {

  const [posts, setPosts] = useState([]);


  useEffect(() => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.results);
      });
  }, []);

  useEffect(() => {
    const alreadyPosted = sessionStorage.getItem("viewPosted");
    if (alreadyPosted) return;
    fetch("/api/add-views/", { method: "POST" })
      .then((res) => res.json())
      .then(() => console.log("View added on full reload"))
      .catch((err) => console.error("Add view failed:", err));

    sessionStorage.setItem("viewPosted", true);

  }, []);
  return (
    <>
      {/* 🎬 Intro Animation */}
      <main className="mb-20">
        <IntroAnimation />
      </main>

      <div className="md:pt-20 mx-10 w-auto h-auto">
        {/* 🧩 معرفی پلتفرم */}
        <MotionEffect effect="fadeUp">
          <div>
            <h3 className="font-bold mb-5 text-2xl text-justify">
              یک بستر یکپارچه برای مدیریت حمل و نقل سازمانی
            </h3>
            <p className="text-justify [word-spacing:2px]">
              تمکو اولین پلتفرم ترکیبی حمل و نقل، راهکاری نوین برای شرکت‌ها و سازمان‌ها فراهم می‌کند تا فرایندهای لجستیکی خود را در محیط دیجیتال، ساده و شفاف مدیریت کنند. این پلتفرم امکان اتصال به ارائه‌کنندگان مختلف حمل و نقل زمینی، ریلی، هوایی و دریایی را فراهم کرده و با داده‌های دقیق، تصمیم‌گیری هوشمندتر را ممکن می‌سازد.
            </p>
          </div>
        </MotionEffect>

        {/* 🧠 بخش چرا تمکو */}
        <div>
          <MotionEffect effect="slideUp">
            <h2 className="font-bold text-2xl mt-10">چرا تمکو ؟</h2>
          </MotionEffect>
          <MotionEffect effect="fadeUp">
            <WhyTmco />
          </MotionEffect>
        </div>

        {/* 🧍 ویژگی‌های راننده و جزئیات */}
        <MotionEffect effect="staggeredSlideUp" className="flex flex-col gap-5 md:gap-0 lg:flex-row mt-20 w-full h-auto">
          {[<DriverApp key="a" />, <DriverDetail key="b" />]}
        </MotionEffect>
      </div>

      {/* 🧰 بخش پنل مشتریان */}
      <MotionEffect effect="fadeScale" className="flex flex-col lg:flex-row mt-30 lg:mt-0 mr-10 w-auto h-auto">
        <div className="h-[500px] md:h-[470px] w-full lg:w-1/2">
          <MotionEffect effect="slideLeft">
            <span className="text-[#3C9BD8] font-bold text-2xl">پنل مشتریان</span>
          </MotionEffect>

          <MotionEffect effect="slideUp">
            <h2 className="font-bold text-2xl text-[#121212] my-5">
              ابزاری برای مدیریت حرفه‌ای زنجیره تأمین
            </h2>
            <p className="w-4/5 text-justify">
              نمایندگان و شرکای تجاری با اپلیکیشن تمکو می‌توانند دسترسی مستقیم به درخواست‌ها، سفارش‌ها و گزارش‌های حمل‌ونقل داشته باشند. این ابزار امکان هماهنگی سریع‌تر با مشتریان سازمانی و مدیریت بهینه ظرفیت را فراهم می‌کند.
            </p>
          </MotionEffect>

          <MotionEffect effect="fadeIn" className="mb-7">
            <span className="my-8 text-2xl font-bold block">ویژگی‌ها:</span>
            <p>مقایسه و انتخاب میان ارائه‌کنندگان مختلف</p>
            <p>مدیریت سفارشات</p>
            <p>مدیریت حمل‌ونقل</p>
            <p>پیگیری وضعیت محموله</p>
          </MotionEffect>

          <MotionEffect effect="scaleSlideUp">
            <a
              href="https://core.tmcopars.ir/panel/login"
              download
              target="_blank"
              className="bg-[#3C9BD8] text-center text-white font-bold py-3 px-25 rounded-xl 
                 transition-colors duration-100 ease-in
                 hover:bg-[#036FD0]"
            >
              ثبت سفارش
            </a>
          </MotionEffect>
        </div>

        {/* بخش تصویر */}
        <MotionEffect effect="fadeUp" className="relative h-[470px] w-full lg:w-1/2">
          <img
            src="/CustomerPanel/dashboard.png"
            alt="driver"
            className="w-full h-full object-contain"
          />
          <div className="absolute hidden lg:block top-0 right-0 border border-gray-200 rounded-xl">
            <Image src="/DriverApp/1d.svg" alt="Truck Icon" width={56} height={56} />
          </div>
          <div className="absolute hidden lg:block bottom-0 right-0 border border-gray-200 rounded-xl">
            <Image src="/DriverApp/4a.svg" alt="Profile Icon" width={56} height={56} />
          </div>
        </MotionEffect>
      </MotionEffect>

      {/* 🚛 بخش استعلام تعرفه */}
      <MotionEffect effect="slideUp" className="px-10 flex flex-col md:flex-row mt-20 mb-40 w-full h-[700px]">
        <div className="md:w-2/5 w-full">
          <h2 className="font-bold mt-30 text-2xl text-[#121212] my-5">
            هزینه حمل بار من چقدر می‌شود؟
          </h2>
          <p className="text-justify">
            مبدا، مقصد و مشخصات کالا را ثبت کنید و از قیمت واقعی حمل بارتان آگاه شوید. در سامانه آنلاین محاسبه کرایه باربری در هر لحظه می‌توانید سریع و آسان هزینه حمل‌ونقل محموله‌هایتان را برآورد کنید.
          </p>
        </div>

        <MotionEffect effect="fadeUp" className="md:w-3/5 w-full h-[600px] flex items-center justify-center">
          <TariffInquiry />
        </MotionEffect>
      </MotionEffect>


      <TrapezoidLayout />

      {/* 📰 بخش وبلاگ */}
      <MotionEffect effect="staggeredFadeIn" className="p-10 w-screen h-auto">
        {[<h2 key="blog-title" className="font-bold text-2xl my-10">وبلاگ</h2>,
        <BlogCarousel posts={posts} />]}
      </MotionEffect>

      {/* 🤝 بخش مشتریان */}
      <MotionEffect effect="scaleSlideUp">
        <ClientsSection />
      </MotionEffect>
    </>
  );
}
