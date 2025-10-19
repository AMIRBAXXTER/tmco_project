"use client";
import { useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function TrapezoidLayout() {
  useEffect(() => {
    const BASE_WIDTH = 1920;
    const BASE_HEIGHT = 900;

    const updateClipPathsAndPositions = () => {
      const main = document.querySelector(".main-trapezoid");
      if (!main) return;

      const width = main.offsetWidth;
      const height = main.offsetHeight;
      const baseOffset = 150;
      const offsetY = Math.min(baseOffset, window.innerWidth * 0.12);
      const tanTheta = offsetY / width;
      const scaleX = width / BASE_WIDTH;
      const scaleY = height / BASE_HEIGHT;
      const dynamicEdgeFactor = 0.8 - (1 - scaleX) * 1.6;
      const yEdgeOffset = offsetY * dynamicEdgeFactor;

      document.querySelectorAll(".same-slope").forEach((el) => {
        const elWidth = el.offsetWidth;
        const y = elWidth * tanTheta;

        el.style.clipPath = `polygon(0 ${y}px, 100% 0, 100% calc(100% - ${y}px), 0 100%)`;
        el.style.willChange = "clip-path, transform";
        el.style.transform = "translateZ(0)";

        const isTop = el.classList.contains("top-piece");
        const isBottom = el.classList.contains("bottom-piece");
        if (isTop) el.style.transform += ` translateY(${yEdgeOffset * scaleY}px)`;
        else if (isBottom) el.style.transform += ` translateY(-${yEdgeOffset * scaleY}px)`;

        if (tanTheta > 0.25) {
          const scale = Math.min(1.15, 1 + (tanTheta - 0.25) * 0.6);
          el.style.transform += ` scaleY(${scale})`;
        }

        const top = el.dataset.top ? parseFloat(el.dataset.top) : null;
        const left = el.dataset.left ? parseFloat(el.dataset.left) : null;
        const bottom = el.dataset.bottom ? parseFloat(el.dataset.bottom) : null;
        const right = el.dataset.right ? parseFloat(el.dataset.right) : null;

        if (top !== null) el.style.top = `${top * scaleY}px`;
        if (bottom !== null) el.style.bottom = `${bottom * scaleY}px`;
        if (left !== null) el.style.left = `${left * scaleX}px`;
        if (right !== null) el.style.right = `${right * scaleX}px`;
      });
    };

    updateClipPathsAndPositions();
    window.addEventListener("resize", updateClipPathsAndPositions);
    return () => window.removeEventListener("resize", updateClipPathsAndPositions);
  }, []);

  // آیتم‌های کروسل
  const aboutItems = [
    {
      icon: "/ServiceIcons/train_service.svg",
      title: "خدمات ریلی",
      description: "حمل و نقل ریلی مطمئن و اقتصادی، بهترین گزینه برای جابجایی محموله‌های بزرگ و حجیم.",
    },
    {
      icon: "/ServiceIcons/plane_service.svg",
      title: "خدمات هوایی",
      description: "حمل و نقل هوایی سریع و ایمن با پوشش گسترده بین‌المللی، برای تحویل به‌موقع محموله‌های شما.",
    },
    {
      icon: "/ServiceIcons/truck_service.svg",
      title: "خدمات زمینی",
      description: "بهترین خدمات حمل و نقل زمینی با تضمین امنیت و سرعت، برای جابه‌جایی بارهای شما در سراسر کشور.",
    },
  ];

  // چندبار تکرار برای حرکت بی‌نهایت روان
  const repeatedItems = [...aboutItems, ...aboutItems, ...aboutItems];

  return (
    <div className="relative w-full h-[900px] flex items-center justify-center bg-transparent overflow-visible">
      <div className="main-trapezoid same-slope relative z-[5] w-full h-[900px] bg-[#001230]">
        <div className="w-[80%] mx-auto mt-35 h-auto">
          <h1 className="text-white mb-10 font-bold text-4xl">خدمات ما</h1>
          <p className="text-white leading-relaxed">
            تمکو زیرساختی دیجیتال برای اتصال شرکت‌ها به ارائه‌دهندگان خدمات حمل‌ونقل در سه بخش اصلی زمینی، ریلی و هوایی است.
            این پلتفرم با یکپارچه‌سازی داده‌ها و فرآیندها، دید کامل و شفافیت عملیاتی در اختیار مدیران لجستیک قرار می‌دهد.
          </p>

          <a
            href="/about"
            className="bg-[#3C9BD8] text-center text-white mt-10 font-bold w-[250px] inline-block py-3 rounded-xl 
            transition-colors duration-100 ease-in hover:bg-[#036FD0]"
          >
            درباره ما
          </a>

          {/* 🔹 کروسل پیوسته و آرام */}
          <div className="mt-20 w-full">
            <Swiper
              modules={[Autoplay]}
              loop={true}
              slidesPerView="auto"
              spaceBetween={20}
              speed={4000}
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
              freeMode={true}
              allowTouchMove={true}
              grabCursor={true}
              centeredSlides={false}
              className="flex items-center !pb-0 !mb-0"
            >
              {repeatedItems.map((item, index) => (
                <SwiperSlide
                  key={index}
                  className="!w-[320px] flex-shrink-0 select-none"
                >
                  <div className="p-20 text-left flex flex-col items-start justify-center">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={60}
                      height={60}
                      className="mb-4"
                    />
                    <h3 className="font-bold text-lg text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm mt-3 text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* 🔸 گوشه‌های بالا سمت چپ */}
      <div
        className="same-slope top-piece absolute z-[6] w-[360px] h-[86px] shadow-xl bg-[#D9D9D9]"
        data-top="22"
        data-left="5"
      />
      <div
        className="same-slope top-piece absolute z-[7] w-[201px] h-[64px] shadow-lg bg-[#3C9BD8]"
        data-top="15"
        data-left="35"
      />

      {/* 🔹 گوشه‌های پایین سمت راست */}
      <div
        className="same-slope bottom-piece absolute z-[6] w-[360px] h-[86px] shadow-xl bg-[#D9D9D9]"
        data-bottom="22"
        data-right="5"
      />
      <div
        className="same-slope bottom-piece absolute z-[7] w-[201px] h-[64px] shadow-lg bg-[#3C9BD8]"
        data-bottom="15"
        data-right="20"
      />
    </div>
  );
}
