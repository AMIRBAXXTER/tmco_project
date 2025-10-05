"use client";
import { useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Image from "next/image";
import { HiX } from "react-icons/hi";

export default function LoginForm({ onSuccess, onClose, variant = "desktop" }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { isLogin, setIsLogin } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // try {
        //     const res = await fetch("/api/login", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({ username, password })
        //     });

        //     const data = await res.json();
        //     if (res.ok && data?.token) {
        //         onSuccess(); // اطلاع به والد که ورود موفق بود
        //         onClose();   // بستن فرم
        //     } else {
        //         alert(data.message || "ورود ناموفق بود");
        //     }
        // } catch (err) {
        //     console.error(err);
        //     alert("خطای شبکه یا سرور");
        // } finally {
        //     setLoading(false);
        //     setPassword(""); // پاک کردن رمز عبور بعد از تلاش
        // }
        if (username === "admin" && password === "admin") {
            localStorage.setItem("token", "admin");
            localStorage.setItem("isLogin", "true");
            onSuccess();
            onClose();
        }
    };

    return (
        <>
            {variant === "desktop" && (
                <div className="absolute top-full mt-2 lg:-right-36 hidden md:block">
                    <form
                        onSubmit={handleSubmit}
                        className="clip-login-shape bg-[#001230] p-4 w-72 text-white rounded-md shadow-lg relative"
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute top-2 left-2 text-xl text-gray-400 hover:text-white"
                        >
                            <HiX />
                        </button>

                        <div className="flex justify-center mt-6">
                            <Image src="/header_logo.svg" alt="لوگو" width={80} height={80} />
                        </div>

                        <h2 className="text-white text-xl font-bold text-center mt-4 mb-6">ورود</h2>

                        <label className="block mb-2">
                            نام کاربری:
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="border rounded-md w-full px-2 py-1 mt-1 text-white"
                                required
                            />
                        </label>

                        <label className="block mb-3">
                            رمز عبور:
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border rounded-md w-full px-2 py-1 mt-1 text-white"
                                required
                            />
                        </label>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#3C9BD8] text-white px-3 py-1 rounded-md w-full"
                        >
                            {loading ? "در حال ارسال..." : "ارسال"}
                        </button>
                    </form>
                </div>
            )}

            {variant === "mobile" && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[999] md:hidden">
                    <form
                        onSubmit={handleSubmit}
                        className="clip-login-shape bg-[#001230] p-4 w-72 text-white rounded-md shadow-lg relative"
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute top-2 left-2 text-xl text-gray-400 hover:text-white"
                        >
                            <HiX />
                        </button>

                        <div className="flex justify-center mt-6">
                            <Image src="/header_logo.svg" alt="لوگو" width={80} height={80} />
                        </div>

                        <h2 className="text-white text-xl font-bold text-center mt-4 mb-6">ورود</h2>

                        <label className="block mb-2">
                            نام کاربری:
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="border rounded-md w-full px-2 py-1 mt-1 text-white"
                                required
                            />
                        </label>

                        <label className="block mb-3">
                            رمز عبور:
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border rounded-md w-full px-2 py-1 mt-1 text-white"
                                required
                            />
                        </label>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#3C9BD8] text-white px-3 py-1 rounded-md w-full"
                        >
                            {loading ? "در حال ارسال..." : "ارسال"}
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}
