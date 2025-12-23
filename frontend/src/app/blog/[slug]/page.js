"use client";

import React, { useEffect, useState } from "react";
import moment from "moment-jalaali";
import { useRouter, useSearchParams } from "next/navigation";

moment.loadPersian({ usePersianDigits: true });

export default function BlogDetail({ params }) {
  const slug = params?.slug;

  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") || "1";

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/articles/${slug}/`);
        if (!res.ok) throw new Error("خطا در دریافت پست");
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPost();
  }, [slug]);

  if (error)
    return <p className="text-red-500 text-center mt-10">{error}</p>;

  if (!post)
    return <p className="text-gray-500 text-center mt-10">در حال بارگذاری...</p>;

  const handleBack = () => {
    const qp = new URLSearchParams();
    if (category) qp.append("category", category);
    if (search) qp.append("search", search);
    if (page) qp.append("page", page);

    router.push(`/blog?${qp.toString()}`);
  };

  return (
    <>
      {/* بازگشت بالا */}
      <div
        onClick={handleBack}
        className="cursor-pointer select-none flex items-center gap-2 text-[#3C9BD8] text-sm md:text-base font-medium px-6 md:px-20 pt-10 hover:text-[#0A2540] transition"
      >
        <p className="pt-1">بازگشت به لیست پست‌ها</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </div>

      <div className="w-full min-h-screen bg-white px-6 md:px-20 flex flex-col items-center">
        <div className="max-w-4xl w-full shadow-lg rounded-xl p-8 border border-gray-200">
          {/* تصویر */}
          <img
            src={post.image || "/images/default.jpg"}
            alt={post.title}
            className="w-full aspect-[16/9] object-cover rounded-lg mb-8"
          />

          {/* عنوان */}
          <h1 className="text-[#0A2540] font-bold text-2xl md:text-3xl mb-6">
            {post.title}
          </h1>

          {/* اطلاعات پست */}
          <div className="flex flex-wrap justify-around border border-gray-200 rounded-lg p-4 items-center gap-5 mb-8 text-gray-600">
            {/* تاریخ */}
            <div className="flex items-center gap-2">
              <span>
                تاریخ انتشار:{" "}
                <span className="font-bold text-black">
                  {moment(post.created_at).format("jD jMMMM jYYYY")}
                </span>
              </span>
            </div>

            {/* زمان مطالعه */}
            <div className="flex items-center gap-2">
              <span>
                مدت مطالعه:{" "}
                <span className="font-bold text-black">
                  {post.reading_time || 25} دقیقه
                </span>
              </span>
            </div>

            {/* دسته‌بندی */}
            {post.category?.name && (
              <div className="flex items-center gap-2">
                <span>
                  دسته‌بندی:{" "}
                  <span className="font-bold text-black">
                    {post.category.name}
                  </span>
                </span>
              </div>
            )}
          </div>

          {/* محتوا */}
          <div className="text-gray-800 leading-relaxed text-base md:text-lg whitespace-pre-line">
            {post.content || "بدون محتوا"}
          </div>

          {/* دکمه بازگشت پایین */}
          <div className="mt-10 flex justify-center">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 bg-[#45B2E8] text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-[#3C9BD8] transition-all duration-200"
            >
              <p className="pt-1">بازگشت به لیست پست‌ها</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
