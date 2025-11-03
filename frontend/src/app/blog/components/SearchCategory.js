"use client";
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

    // گرفتن کتگوری‌ها
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/categories/");
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    // گرفتن مطالب
    const fetchArticles = async () => {
        try {
            console.log(selectedCategory, searchTerm);
            const params = new URLSearchParams();
            if (selectedCategory) params.append("category", selectedCategory);
            if (searchTerm) params.append("search", searchTerm);
            const res = await fetch(`/api/articles/?${params.toString()}`);
            const data = await res.json();
            setArticles(data);
        } catch (error) {
            console.error("Error fetching articles:", error);
            setArticles([]);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    // فیلتر کتگوری
    const filterPostsByCategory = (category) => {
        setSelectedCategory(category);
    };

    // سرچ
    const handleSearch = (event) => setSearchTerm(event.target.value);
    const searchPosts = () => {
        fetchArticles();
    };

    // تشخیص سایز صفحه
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    useEffect(() => {
        fetchArticles();
    }, [selectedCategory, searchTerm]);

    return (
        <MotionEffect
            effect="scaleSlideUp"
            className="flex flex-col justify-center items-center w-full min-h-screen bg-white px-5 md:px-10 md:pt-[180px]"
        >
            <MotionEffect
                effect="scaleSlideUp"
                className="flex flex-col gap-8 w-5/6 p-6 md:p-10 justify-center items-center rounded-xl shadow-lg"
            >
                <h2 className="text-[#3C9BD8] font-bold text-xl md:text-2xl text-center">
                    بلاگ
                </h2>

                {/* فیلد جستجو */}
                <div className="flex items-center w-full sm:w-3/4 border border-gray-300 rounded-lg px-4 py-4 shadow-sm">
                    <input
                        type="text"
                        placeholder="جستجو..."
                        value={searchTerm}
                        onChange={handleSearch}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") searchPosts();
                        }}
                        className="flex-1 text-[#0A2540] outline-none bg-transparent text-sm md:text-base"
                    />
                    <button
                        onClick={searchPosts}
                        className="text-[#0A2540] hover:text-[#3C9BD8] cursor-pointer transition-colors duration-300"
                    >
                        <FaSearch size={18} />
                    </button>
                </div>

                {/* نمایش کتگوری‌ها */}
                <div className="flex flex-wrap justify-center gap-2 mt-4 text-[#0A2540] font-medium text-base md:text-lg max-w-[70%] mx-auto">
                    <span
                        onClick={() => setSelectedCategory("")}
                        className={`cursor-pointer p-5 border rounded-2xl transition-colors duration-300 ${selectedCategory === ""
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
                            className={`cursor-pointer p-5 border rounded-2xl transition-colors duration-300 ${selectedCategory === cat.name
                                ? "border-[#0A2540]"
                                : "hover:text-[#3C9BD8] border-[#E6E6E6]"
                                }`}
                        >
                            {cat.name}
                        </span>
                    ))}
                </div>

                {/* نمایش مطالب با انیمیشن نرم */}
                <div className="w-full mt-10 border-t border-gray-200 pt-6">
                    {articles.length === 0 ? (
                        <p className="text-gray-500 text-center">هیچ مطلبی یافت نشد</p>
                    ) : (
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
                                            layout            // ✅ به Framer Motion اجازه می‌ده جای کارت‌ها رو نرم تنظیم کنه
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 30 }}
                                            transition={{
                                                layout: { duration: 0.4, ease: "easeOut" },  // ✅ برای تغییر چیدمان
                                                duration: 0.3, ease: "easeOut",
                                            }}
                                            className="w-full h-[480px] rounded-xl shadow-lg bg-white overflow-hidden border border-gray-200 hover:shadow-xl transition"
                                        >
                                            <a href={`/blog/${post.slug}`} className="block h-full">
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
                                                        <p className="text-sm md:text-base text-gray-700 leading-relaxed line-clamp-4">
                                                            {post.content || post.excerpt || "—"}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-between mt-5 text-sm text-gray-600">
                                                        <div className="flex items-center">
                                                            <FaClock className="text-[#3C9BD8] mr-2 text-base" />
                                                            <span>
                                                                {moment(post.created_at).format("jD jMMMM jYYYY")}
                                                            </span>
                                                        </div>
                                                        <span
                                                            href={`/blog/${post.slug}`}
                                                            className="text-[#3C9BD8] font-medium hover:text-[#036FD0] transition-colors duration-200"
                                                        >
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
                    )}
                </div>


            </MotionEffect>
        </MotionEffect>
    );
}
