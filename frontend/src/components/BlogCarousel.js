"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { FaClock } from "react-icons/fa";
import moment from "moment-jalaali";

moment.loadPersian({ usePersianDigits: true });

export default function BlogCarousel() {
  // پست‌های تستی
  const posts = [
    {
      title: "کارایی بالاتر با معماری میکروسرویس",
      excerpt:
        "در این مقاله بررسی می‌کنیم که چگونه معماری میکروسرویس باعث افزایش سرعت توسعه و انعطاف‌پذیری سازمانی می‌شود.",
      slug: "microservice-architecture",
      created_at: "2025-10-10T14:00:00Z",
    },
    {
      title: "۱۰ نکته برای بهینه‌سازی Django ORM",
      excerpt:
        "از انتخاب ایندکس مناسب تا به‌کارگیری prefetch_related، این راهکارها می‌توانند کوئری‌های ORM شما را سریع‌تر کنند.",
      slug: "django-orm-optimization",
      created_at: "2025-10-05T18:00:00Z",
    },
    {
      title: "راهنمای ساده برای مدیریت State در React",
      excerpt:
        "State در React یکی از مفاهیم کلیدی است. در این مقاله روش‌های ساده و کاربردی برای مدیریت state معرفی شده است.",
      slug: "react-state-management",
      created_at: "2025-10-15T09:00:00Z",
    },
    {
      title: "امن‌سازی ارتباط بین فرانت‌اند و بک‌اند",
      excerpt:
        "در پروژه‌های سازمانی، امنیت ارتباط میان فرانت‌اند و بک‌اند حیاتی است. این مقاله روش‌های امن‌سازی JWT و CORS را بررسی می‌کند.",
      slug: "frontend-backend-security",
      created_at: "2025-10-12T10:00:00Z",
    },
  ];

  return (
    <div className="relative w-full flex items-center justify-center bg-transparent overflow-visible">
      <Swiper
        modules={[Autoplay]}
        loop
        spaceBetween={30}
        slidesPerView={"auto"}
        speed={2500}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="flex items-stretch pb-5"
      >
        {posts.map((post, index) => (
          <SwiperSlide
            key={index}
            className="!w-[340px] flex-shrink-0 select-none border-t-[4px] border-[#3C9BD8] rounded-b-xl"
          >
            <div className="p-6 h-full flex flex-col justify-between border border-gray-700 rounded-b-xl hover:border-[#3C9BD8] transition-colors duration-200 ease-in">
              <div>
                {/* عنوان */}
                <h3 className="font-bold text-lg text-white mb-3">
                  {post.title}
                </h3>

                {/* خلاصه متن */}
                <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              {/* تاریخ و لینک مشاهده */}
              <div className="mt-6 flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-400">
                  <FaClock className="text-[#3C9BD8] mr-2 text-base" />
                  <span>{moment(post.created_at).format("jD jMMMM jYYYY")}</span>
                </div>

                <a
                  href={`/blog/${post.slug}`}
                  className="text-[#3C9BD8] font-semibold hover:text-[#62B3F1] transition-colors duration-150 ease-in"
                >
                  مشاهده
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
