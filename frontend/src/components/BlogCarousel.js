import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { FaClock } from "react-icons/fa";
import moment from "moment-jalaali";

moment.loadPersian({ usePersianDigits: true });

export default function BlogCarousel({ posts }) {
  return (
    <Swiper
      modules={[Autoplay]}
      loop
      slidesPerView="auto"
      spaceBetween={20}
      speed={4000}
      autoplay={{ delay: 1500, disableOnInteraction: false }}
      freeMode
      allowTouchMove
      grabCursor
      centeredSlides={false}
      breakpoints={{
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="pb-10"
    >
      {Array.isArray(posts) &&
        posts.map((post, index) => (
          <SwiperSlide
            key={index}
            className="w-full md:w-[400px] h-[480px] flex-shrink-0 rounded-xl shadow-lg bg-white overflow-hidden border border-gray-200 hover:shadow-xl transition duration-300"
          >
            <a href={`/blog/${post.slug}`} className="block h-full">
              {/* 🔹 تصویر بالای کارت */}
              <img
                src={post.image || "/images/default.jpg"}
                alt={post.title}
                className="w-full aspect-[16/9] object-cover"
              />

              {/* 🔹 محتوای کارت (با ارتفاع ثابت و متن محدود) */}
              <div className="p-5 flex flex-col justify-between h-[calc(100%-180px)]">
                <div className="min-h-[180px]">
                  <h3 className="text-lg md:text-xl font-bold mb-3 text-[#0A2540] line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed line-clamp-3 text-justify">
                    {post.content || "—"}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-5 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FaClock className="text-[#3C9BD8] mr-2 text-base" />
                    <span>{moment(post.created_at).format("jD jMMMM jYYYY")}</span>
                  </div>
                  <a
                    href={`/blog/${post.slug}`}
                    className="text-[#3C9BD8] font-medium hover:text-[#036FD0] transition-colors duration-200"
                  >
                    بیشتر بدانید...
                  </a>
                </div>
              </div>

            </a>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
