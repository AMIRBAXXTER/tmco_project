"use client";
import MotionEffect from "@/animations/MotionEffect";

export default function StaticGrid() {
    const reasons = [
        { logo: "/WhyTmco/Icon1.svg", description: "دسترسی به شبکه گسترده ارائه دهندگان حمل و نقل" },
        { logo: "/WhyTmco/Icon2.svg", description: "ردیابی و گزارش گیری دقیق و لحظه ای" },
        { logo: "/WhyTmco/Icon3.svg", description: "مدیریت متمرکز سفارش ها در مقیاس سازمانی" },
        { logo: "/WhyTmco/Icon4.svg", description: "شفافیت مالی و تسویه حساب سازمان یافته" },
    ];

    return (
        <MotionEffect effect="staggeredFadeIn" className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-3/4 mx-auto mt-10">
            {reasons.map((reason, index) => (
                <div key={index} className="flex items-center gap-2">
                    <img src={reason.logo} alt={`Reason ${index + 1}`} className="w-7 h-7 mr-4" />
                    <img src="/WhyTmco/Line.svg"></img>
                    <p className="text-lg">{reason.description}</p>
                </div>
            ))}
        </MotionEffect>
    );
}
