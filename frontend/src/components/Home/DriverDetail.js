import React from 'react'
import MotionEffect from "@/animations/MotionEffect";

export default function DriverDetail() {
    return (
        <div className="w-full lg:w-1/2 h-[470px] md:h-full">
            <MotionEffect effect="slideRight">
                <span className="text-[#3C9BD8] font-bold text-2xl">اپلیکیشن راننده</span>
            </MotionEffect>

            <MotionEffect effect='slideUp'>
                <h2 className="font-extrabold text-3xl text-[#121212] my-5">انتخاب بهترین مسیر، تنها با یک کلیک</h2>
                <p className="w-4/5 text-justify">اپلیکیشن تمکو به شما امکان می دهد در یک بستر واحد، سرویس های مختلف حمل و نقل را مقایسه کنید، سفارش دهید و وضعیت محموله را به صورت لحظه ای پیگیری کنید.</p>
            </MotionEffect>
            <MotionEffect effect='fadeIn'>
                <span className="my-8 text-2xl font-bold block">ویژگی ها:</span>
                <p>مقایسه و انتخاب میان ارائه کنندگان مختلف</p>
                <p>مدیریت سفارشات</p>
                <p>مدیریت حمل و نقل</p>
                <p>پیگیری وضعیت محموله</p>
            </MotionEffect>
            <div className="flex gap-6 mt-7">
                <a
                    href="http://core.tmcopars.ir/media/app/raya-release-1.0.6.apk"
                    download
                    target="_blank"
                    className="bg-[#3C9BD8] text-center text-white font-bold w-1/2 py-3 rounded-xl 
               transition-colors duration-100 ease-in
               hover:bg-[#036FD0]"
                >
                    دانلود اپلیکیشن
                </a>
                <a
                    href="http://core.tmcopars.ir/accounts/signup"
                    target="_blank"
                    className="bg-white text-center text-[#3C9BD8] border border-[#3C9BD8] font-bold w-1/2 py-3 rounded-xl 
               transition-colors duration-100 ease-in
               hover:bg-[#c6e8ff]"
                >
                    ثبت نام راننده
                </a>
            </div>

        </div>
    )
}
