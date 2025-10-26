import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { FaClock } from "react-icons/fa";
import moment from "moment-jalaali";

moment.loadPersian({ usePersianDigits: true });

export default function BlogCarousel() {
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
    {
      title: "ساخت سایت با Next.js و Tailwind CSS",
      excerpt:
        "در این مقاله به شما آموزش داده شده است که چگونه سایت با Next.js و Tailwind CSS ساخته شود.",
      slug: "nextjs-tailwindcss-site",
      created_at: "2025-10-08T15:00:00Z",
    },
    {
      title: "مدیریت پروژه‌های Node.js با Docker",
      excerpt:
        "در این مقاله به شما آموزش داده شده است که چگونه پروژه‌های Node.js را با Docker مدیریت کنید.",
      slug: "nodejs-docker-project",
      created_at: "2025-10-13T11:00:00Z",
    },
  ];

  return (
    <>
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
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {posts.map((post, index) => (
          <SwiperSlide
            key={index}
            className="w-1/3 h-[800px shadow-lg border-t-[10px] border-[#3C9BD8] rounded-xl bg-white"
          >
            {/* ... محتوای هر اسلاید ... */}
            <a href={`/blog/${post.slug}`} className="block h-[300px]">
              <div className="p-6 h-full flex flex-col justify-between shadow-2xl">
                <h3 className="text-lg md:text-xl font-bold mb-6">{post.title}</h3>
                <p className="text-sm md:text-base leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <FaClock className="text-[#3C9BD8] mr-2 text-base" />
                    <span>{moment(post.created_at).format("jD jMMMM jYYYY")}</span>
                  </div>
                </div>
              </div>

            </a>

          </SwiperSlide>
        ))}
      </Swiper>
    </>

  );
}
