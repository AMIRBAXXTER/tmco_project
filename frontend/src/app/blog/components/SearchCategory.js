"use client";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaSearch, FaClock } from "react-icons/fa";
import MotionEffect from "@/animations/MotionEffect";
import BlogCarousel from "@/components/BlogCarousel";
import moment from "moment-jalaali";
import { motion, AnimatePresence } from "framer-motion";

moment.loadPersian({ usePersianDigits: true });

export default function SearchCategory() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [articles, setArticles] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);

    // دریافت کتگوری‌ها
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/categories/");
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        })();
    }, []);

    // تابع عمومی برای دریافت مطالب با فیلترها
    const fetchArticles = async (page = 1, term = searchTerm, category = selectedCategory) => {
        try {
            const params = new URLSearchParams();
            if (category) params.append("category", category);
            if (term) params.append("search", term);
            params.append("page", page.toString());

            const res = await fetch(`/api/articles/?${params.toString()}`);
            const data = await res.json();

            if (data.results) {
                setArticles(data.results);
                setNextPage(data.next);
                setPrevPage(data.previous);

                const pageSize = 10; // مطابق Django BlogPagination
                setTotalPages(Math.ceil(data.count / pageSize));
                setCurrentPage(page);
            } else {
                setArticles(data);
            }
        } catch (error) {
            console.error("Error fetching articles:", error);
            setArticles([]);
        }
    };

    const searchParams = useSearchParams();

    useEffect(() => {
        const cat = searchParams.get("category") || "";
        const term = searchParams.get("search") || "";
        const page = Number(searchParams.get("page")) || 1;

        // مقادیر رو در state ثبت می‌کنیم
        setSelectedCategory(cat);
        setSearchTerm(term);
        setCurrentPage(page);

        // وقتی همه set شدن، بلافاصله اجراش می‌کنیم
        fetchArticles(page, term, cat);
    }, []);



    // وقتی دسته تغییر کرد، فچ جدید
    useEffect(() => {
        fetchArticles(1, searchTerm, selectedCategory);
    }, [selectedCategory]);

    // فیلتر دسته‌بندی
    const filterPostsByCategory = (category) => setSelectedCategory(category);

    // جستجو فقط وقتی Enter یا کلیک انجام شد
    const handleSearchKey = (e) => {
        if (e.key === "Enter") {
            const term = e.target.value.trim();
            setSearchTerm(term);
            fetchArticles(1, term, selectedCategory);
        }
    };

    const handleSearchClick = () => {
        const term = searchTerm.trim();
        fetchArticles(1, term, selectedCategory);
    };

    // بررسی سایز صفحه
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchArticles(page, searchTerm, selectedCategory);
    };

    return (
        <MotionEffect
            effect="scaleSlideUp"
            className="flex flex-col justify-center items-center w-full min-h-screen bg-white px-5 md:px-10 md:pt-[180px]"
        >
            <MotionEffect
                effect="scaleSlideUp"
                className="flex flex-col gap-8 w-5/6 justify-center items-center rounded-xl shadow-lg"
            >
                <h2 className="text-[#3C9BD8] font-bold text-xl md:text-2xl text-center">
                    بلاگ
                </h2>

                {/* فیلد جستجو */}
                <div className="flex items-center w-full sm:w-3/4 border border-gray-300 rounded-lg px-2 py-2 shadow-sm">
                    <input
                        type="text"
                        placeholder="جستجو..."
                        defaultValue={searchTerm}
                        onKeyDown={handleSearchKey}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 text-[#0A2540] outline-none bg-transparent text-sm md:text-base"
                    />
                    <button
                        onClick={handleSearchClick}
                        className="text-[#0A2540] hover:text-[#3C9BD8] cursor-pointer transition-colors duration-300"
                    >
                        <FaSearch size={18} />
                    </button>
                </div>

                {/* دسته‌بندی‌ها */}
                <div className="flex flex-wrap justify-center gap-2 text-[#0A2540] font-medium text-base md:text-lg w-full md:w-3/4 mx-auto">
                    <span
                        onClick={() => setSelectedCategory("")}
                        className={`cursor-pointer p-3 border rounded-2xl transition-colors duration-300 ${selectedCategory === ""
                            ? "border-[#0A2540]"
                            : "hover:text-[#3C9BD8] border-[#E6E6E6]"
                            }`}
                    >
                        همه
                    </span>
                    {categories.map((cat) => (
                        <span
                            key={cat.id || cat.name}
                            onClick={() => filterPostsByCategory(cat.name)}
                            className={`cursor-pointer p-3 border rounded-2xl transition-colors duration-300 ${selectedCategory === cat.name
                                ? "border-[#0A2540]"
                                : "hover:text-[#3C9BD8] border-[#E6E6E6]"
                                }`}
                        >
                            {cat.name}
                        </span>
                    ))}
                </div>

                {/* مطالب */}
                <div className="w-full mt-10 border-t border-gray-200 pt-6">
                    {articles.length === 0 ? (
                        <p className="text-gray-500 text-center">هیچ مطلبی یافت نشد</p>
                    ) : (
                        <>
                            <div
                                className={`w-full ${isMobile ? "" : "grid grid-cols-2 lg:grid-cols-3 gap-6 pt-6"
                                    }`}
                            >
                                {isMobile ? (
                                    <BlogCarousel posts={articles} />
                                ) : (
                                    <AnimatePresence>
                                        {articles.map((post) => (
                                            <motion.div
                                                key={post.id}
                                                layout
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 30 }}
                                                transition={{
                                                    layout: { duration: 0.4, ease: "easeOut" },
                                                    duration: 0.3,
                                                    ease: "easeOut",
                                                }}
                                                className="w-full h-[480px] rounded-xl shadow-lg bg-white overflow-hidden border border-gray-200 transition-all duration-500 hover:scale-[1.03] hover:rotate-[0.8deg] hover:shadow-[0_12px_28px_rgba(60,155,216,0.25)] hover:border-[#3C9BD8]"
                                            >
                                                <a href={`/blog/${post.slug}?category=${selectedCategory}&search=${searchTerm}&page=${currentPage}`} className="block h-full">
                                                    <img
                                                        src={post.image || "/images/default.jpg"}
                                                        alt={post.title}
                                                        className="w-full h-[180px] object-cover"
                                                    />
                                                    <div className="p-5 flex flex-col justify-between h-[calc(100%-180px)]">
                                                        <div className="min-h-[180px]">
                                                            <h3 className="text-lg md:text-xl font-bold mb-3 text-[#0A2540] line-clamp-2">
                                                                {post.title}
                                                            </h3>
                                                            <p className="text-sm md:text-base text-gray-700 line-clamp-4 leading-relaxed">
                                                                {post.content || post.excerpt || "—"}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center justify-between mt-5 text-sm text-gray-600">
                                                            <div className="flex items-center">
                                                                <FaClock className="text-[#3C9BD8] mr-2 text-base" />
                                                                <span>
                                                                    {moment(post.created_at).format(
                                                                        "jD jMMMM jYYYY"
                                                                    )}
                                                                </span>
                                                            </div>
                                                            <span className="text-[#3C9BD8] font-medium hover:text-[#036FD0] transition-colors duration-200">
                                                                بیشتر بدانید...
                                                            </span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                )}
                            </div>

                            {/* صفحه‌بندی */}
                            <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
                                <button
                                    disabled={!prevPage}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors duration-300 ${prevPage
                                        ? "hover:bg-[#87d1ff] hover:text-white border-[#3C9BD8]"
                                        : "text-gray-400 border-gray-300 cursor-not-allowed"
                                        }`}
                                >
                                    قبلی
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                    (pageNum) => (
                                        <button
                                            key={pageNum}
                                            onClick={() => handlePageChange(pageNum)}
                                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${currentPage === pageNum
                                                ? "bg-[#3C9BD8] text-white shadow-md"
                                                : "border border-gray-300 hover:bg-[#87d1ff] hover:text-white"
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    )
                                )}

                                <button
                                    disabled={!nextPage}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors duration-300 ${nextPage
                                        ? "hover:bg-[#87d1ff] hover:text-white border-[#3C9BD8]"
                                        : "text-gray-400 border-gray-300 cursor-not-allowed"
                                        }`}
                                >
                                    بعدی
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </MotionEffect>
        </MotionEffect>
    );
}
