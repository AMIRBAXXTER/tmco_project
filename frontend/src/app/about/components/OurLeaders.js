'use client';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function OurLeaders() {
  const containerRef = useRef(null);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const leaders = [
    { name: 'علی رضایی', position: 'مدیرعامل', image: '/Leaders/nobody.jpg' },
    { name: 'مریم احمدی', position: 'مدیر فنی', image: '/Leaders/nobody.jpg' },
    { name: 'سینا نادری', position: 'مدیر محصول', image: '/Leaders/nobody.jpg' },
    { name: 'نازنین توکلی', position: 'مدیر بازاریابی', image: '/Leaders/nobody.jpg' },
    { name: 'رضا کشاورز', position: 'مدیر عملیات', image: '/Leaders/nobody.jpg' },
    { name: 'پویان مرادی', position: 'مدیر مالی', image: '/Leaders/nobody.jpg' },
  ];

  return (
    <>
      <h2 className="text-[#3C9BD8] font-bold text-3xl text-center">رهبران ما</h2>
      <div
        ref={containerRef}
        className="relative w-full md:w-[80%] mx-auto flex flex-col items-center justify-center py-12 bg-white overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <div
          className="absolute pointer-events-none"
          style={{
            top: glowPos.y - 200,
            left: glowPos.x - 200,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(60,155,216,0.55) 0%, transparent 70%)',
            transition: 'none',
            zIndex: 1,
          }}
        ></div>

        <Swiper
          modules={[Autoplay]}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={8500}
          freeMode={true}
          spaceBetween={24}
          centeredSlides={false}
          slidesPerView={3}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          className="w-full max-w-[1320px] select-none"
        >
          {leaders.map((leader, i) => (
            <SwiperSlide key={i}>
              <div className="w-full flex items-center justify-center">
                <div className="relative flex flex-col items-center justify-start border border-gray-200 rounded-xl shadow-md bg-white overflow-hidden transition-all duration-300 hover:shadow-lg w-[220px]">
                  {['-top-2 left-0', '-top-2 right-0', 'bottom-17 left-0', 'bottom-17 right-0'].map((pos, idx) => (
                    <span key={idx} className={`absolute ${pos} text-[#3C9BD8] font-bold text-3xl select-none`}>+</span>
                  ))}


                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full aspect-square object-cover border-b border-gray-100"
                  />

                  <div className="flex flex-col items-center justify-center py-4">
                    <h3 className="font-semibold text-gray-800">{leader.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{leader.position}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
