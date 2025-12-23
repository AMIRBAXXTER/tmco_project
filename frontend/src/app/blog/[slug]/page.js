import React, { useEffect, useState } from "react";
import moment from "moment-jalaali";
import { useRouter, useSearchParams } from "next/navigation";

moment.loadPersian({ usePersianDigits: true });

export default function BlogDetail({ params }) {
  const { slug } = params;
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  const isClient = typeof window !== "undefined";
  const router = isClient ? useRouter() : null;
  const searchParams = isClient ? useSearchParams() : new URLSearchParams();

  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") || "1";

  useEffect(() => {
    if (!isClient) return;
    (async () => {
      try {
        const res = await fetch(`/api/articles/${slug}/`);
        if (!res.ok) throw new Error("خطا در دریافت پست");
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      }
    })();
  }, [slug, isClient]);

  if (error)
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!post)
    return <p className="text-gray-500 text-center mt-10">در حال بارگذاری...</p>;

  const handleBack = () => {
    if (!router) return;
    const qp = new URLSearchParams();
    if (category) qp.append("category", category);
    if (search) qp.append("search", search);
    if (page) qp.append("page", page);
    router.push(`/blog?${qp.toString()}`);
  };

  return (
    <>
      <div
        onClick={handleBack}
        className="cursor-pointer mt-30 select-none flex items-center gap-2 text-[#3C9BD8] text-sm md:text-base font-medium px-6 md:px-20 pt-10 hover:text-[#0A2540] transition"
      >
        <p className="pt-1">بازگشت به لیست پست‌ها</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
        </svg>
      </div>

      <div className="w-full min-h-screen bg-white px-6 md:px-20 flex flex-col items-center">
        <div className="max-w-4xl w-full shadow-lg rounded-xl p-8 border border-gray-200">

          <img
            src={post.image || "/images/default.jpg"}
            alt={post.title}
            className="w-full aspect-[16/9] object-cover rounded-lg mb-8"
          />

          <h1 className="text-[#0A2540] font-bold text-2xl md:text-3xl mb-6">
            {post.title}
          </h1>

          {/* اطلاعات پست */}
          <div className="flex flex-wrap justify-around border border-gray-200 rounded-lg p-4 items-center gap-5 mb-8 text-gray-600">
            {/* 📅 تاریخ */}
            <div className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                   xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                <path d="M8 5.75C7.59 5.75 7.25 5.41 7.25 5V2C7.25 1.59 7.59 1.25 8 1.25C8.41 1.25 8.75 1.59 8.75 2V5C8.75 5.41 8.41 5.75 8 5.75Z" fill="#292D32"/>
                <path d="M16 5.75C15.59 5.75 15.25 5.41 15.25 5V2C15.25 1.59 15.59 1.25 16 1.25C16.41 1.25 16.75 1.59 16.75 2V5C16.75 5.41 16.41 5.75 16 5.75Z" fill="#292D32"/>
                <path d="M20.5 9.83984H3.5C3.09 9.83984 2.75 9.49984 2.75 9.08984C2.75 8.67984 3.09 8.33984 3.5 8.33984H20.5C20.91 8.33984 21.25 8.67984 21.25 9.08984C21.25 9.49984 20.91 9.83984 20.5 9.83984Z" fill="#292D32"/>
                <path d="M16 22.75H8C4.35 22.75 2.25 20.65 2.25 17V8.5C2.25 4.85 4.35 2.75 8 2.75H16C19.65 2.75 21.75 4.85 21.75 8.5V17C21.75 20.65 19.65 22.75 16 22.75ZM8 4.25C5.14 4.25 3.75 5.64 3.75 8.5V17C3.75 19.86 5.14 21.25 8 21.25H16C18.86 21.25 20.25 19.86 20.25 17V8.5C20.25 5.64 18.86 4.25 16 4.25H8Z" fill="#292D32"/>
              </svg>
              <span>
                تاریخ انتشار:{" "}
                <span className="font-bold text-[#000000]">
                  {moment(post.created_at).format("jD jMMMM jYYYY")}
                </span>
              </span>
            </div>

            {/* ⏱ زمان مطالعه */}
            <div className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                   xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.71 15.1798L12.61 13.3298C12.07 13.0098 11.63 12.2398 11.63 11.6098V7.50977" stroke="#45B2E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>
                مدت مطالعه:{" "}
                <span className="font-bold text-[#000000]">
                  {post.reading_time || 25} دقیقه
                </span>
              </span>
            </div>

            {/* 🏷 دسته */}
            {post.category?.name && (
              <div className="flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                  <path d="M19 10.75H17C14.58 10.75 13.25 9.42 13.25 7V5C13.25 2.58 14.58 1.25 17 1.25H19C21.42 1.25 22.75 2.58 22.75 5V7C22.75 9.42 21.42 10.75 19 10.75Z" fill="#292D32"/>
                  <path d="M7 22.75H5C2.58 22.75 1.25 21.42 1.25 19V17C1.25 14.58 2.58 13.25 5 13.25H7C9.42 13.25 10.75 14.58 10.75 17V19C10.75 21.42 9.42 22.75 7 22.75Z" fill="#292D32"/>
                  <path d="M6 10.75C3.38 10.75 1.25 8.62 1.25 6C1.25 3.38 3.38 1.25 6 1.25C8.62 1.25 10.75 3.38 10.75 6C10.75 8.62 8.62 10.75 6 10.75Z" fill="#45B2E8"/>
                  <path d="M18 22.75C15.38 22.75 13.25 20.62 13.25 18C13.25 15.38 15.38 13.25 18 13.25C20.62 13.25 22.75 15.38 22.75 18C22.75 20.62 20.62 22.75 18 22.75Z" fill="#45B2E8"/>
                </svg>
                <span>
                  دسته‌بندی:{" "}
                  <span className="font-bold text-[#000000]">{post.category.name}</span>
                </span>
              </div>
            )}
          </div>

          <div className="text-gray-800 leading-relaxed text-base md:text-lg whitespace-pre-line">
            {post.content || "بدون محتوا"}
          </div>

          <div className="mt-10 flex justify-center">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 bg-[#45B2E8] text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-[#3C9BD8] transition-all duration-200"
            >
              <p className="pt-1">بازگشت به لیست پست‌ها</p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"
                   className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
