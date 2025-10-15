"use client";
import { IntroAnimation, WhyTmco, DriverApp, DriverDetail } from "@/components/Home";
import MotionEffect from "@/animations/MotionEffect";
import Image from 'next/image'
import TrapezoidLayout from "@/components/Home/TrapezoidLayout";

export default function Home() {

  return (
    <>
      <main className="mb-20">
        <IntroAnimation />
      </main>

      <div className="md:pt-20 mx-10 w-auto h-auto">
        <div>
          <h3 className="font-bold mb-5 text-2xl">یک بستر یکپارچه برای مدیریت حمل و نقل سازمانی</h3>
          <p>
            تمکو اولین پلتفرم ترکیبی حمل و نقل، راهکاری نوین برای شرکت ها و سازمان ها فراهم می کند تا فرایندهای لجستیکی خود را در محیط دیجیتال، ساده و شفاف مدیریت کنند. این پلتفرم امکان اتصال به ارائه کنندگان محتلف حمل و نقل زمینی، ریلی و هوایی را فراهم کرده و با داده های دقیق، تصمیم گیری هوشمنده تر را ممکن می سازد.
          </p>
        </div>

        <div>
          <MotionEffect effect="slideUp">
            <h2 className="font-extrabold text-3xl mt-10">چرا تمکو ؟</h2>
          </MotionEffect>
          <WhyTmco />
        </div>

        <div className="flex flex-col gap-5 md:gap-0 lg:flex-row mt-20 w-full h-auto">
          <DriverApp />
          <DriverDetail />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row mt-20 mr-10 w-auto h-auto">
        {/* بخش متنی سمت چپ */}
        <div className="h-[500px] md:h-[470px] w-full md:w-1/2">
          <MotionEffect effect="slideLeft">
            <span className="text-[#3C9BD8] font-bold text-2xl">پنل مشتریان</span>
          </MotionEffect>

          <MotionEffect effect='slideUp'>
            <h2 className="font-extrabold text-4xl text-[#121212] my-5">
              ابزاری برای مدیریت حرفه ای زنجیره تامین
            </h2>
            <p className="w-4/5">
              نمایندگان و شرکای تجاری با اپلیکیشن تمکو می توانند دسترسی مستقیم به درخواست ها، سفارش ها و گزارش های حمل و نقل داشته باشند. این ابزار امکان هماهنگی سریع تر با مشتریان سازمانی و مدیریت بهینه ظرفیت را فراهم می کند.
            </p>
          </MotionEffect>

          <MotionEffect effect='fadeIn' className="mb-7">
            <span className="my-8 text-2xl font-bold block">ویژگی ها:</span>
            <p>مقایسه و انتخاب میان ارائه کنندگان مختلف</p>
            <p>مدیریت سفارشات</p>
            <p>مدیریت حمل و نقل</p>
            <p>پیگیری وضعیت محموله</p>
          </MotionEffect>

          <a
            href="/files/driver-app.apk"
            download
            target="_blank"
            className="bg-[#3C9BD8] text-center text-white font-bold py-3 px-25 rounded-xl 
               transition-colors duration-100 ease-in
               hover:bg-[#036FD0]"
          >
            ثبت سفارش
          </a>
        </div>

        {/* بخش تصویر سمت راست */}
        <div className="relative h-[470px] w-full md:w-1/2">
          <img
            src="/CustomerPanel/dashboard.png"
            alt="driver"
            className="
              absolute 
              top-0 left-0 
              h-full 
              w-full md:w-[85%]
              mt-10
              md:mt-0
              md:object-cover
              deep-blur-shadow
              rounded-r-2xl
              z-10
            "
          />
          {/* truck icon */}
          <div
            className="absolute hidden md:block top-0 right-0 border border-gray-200 rounded-xl"
          >
            <Image src="/DriverApp/1d.svg" alt="Truck Icon" width={56} height={56} />
          </div>
          {/* profile icon */}
          <div
            className="absolute hidden md:block bottom-0 right-0 border border-gray-200 rounded-xl"
          >
            <Image src="/DriverApp/4a.svg" alt="Profile Icon" width={56} height={56} />
          </div>

          {/* line */}
          <svg className="absolute bottom-14 right-7 z-0" width="119" height="129" viewBox="0 0 119 129" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="path-1-inside-1_310_2010" fill="white">
              <path d="M119 129L0 129L-1.12775e-05 1.04033e-05L95 2.09815e-06C108.255 9.39372e-07 119 10.7452 119 24L119 129Z" />
            </mask>
            <path d="M119 129L0 129L119 129ZM-1.1365e-05 -0.99999L95 -0.999998C108.807 -0.999999 120 10.1929 120 24L118 24C118 11.2974 107.703 1 95 1L-1.11901e-05 1.00001L-1.1365e-05 -0.99999ZM95 -0.999998C108.807 -0.999999 120 10.1929 120 24L120 129L118 129L118 24C118 11.2974 107.703 1 95 1L95 -0.999998ZM0 129L-1.12775e-05 1.04033e-05L0 129Z" fill="url(#paint0_linear_310_2010)" mask="url(#path-1-inside-1_310_2010)" />
            <defs>
              <linearGradient id="paint0_linear_310_2010" x1="115.316" y1="6.67241" x2="-49.1161" y2="-13.0184" gradientUnits="userSpaceOnUse">
                <stop stopColor="#165072" />
                <stop offset="1" stopColor="#00D1FC" />
              </linearGradient>
            </defs>
          </svg>


        </div>
      </div>

      <div className="flex flex-col md:flex-row mx-10 w-full h-[700px]">
        <div className="w-2/5">
          <h2 className="font-extrabold  mt-30 text-4xl text-[#121212] my-5">
            هزینه حمل بار من چقدر می شود؟
          </h2>
          <p>مبدا، مقصد و مشخصات کالا را ثبت کنید و از قیمت واقعی حمل بارتان آگاه شوید. در سامانه آنلاین محاسبه کرایه باربری در هر لحظه می‌توانید سریع و آسان هزینه حمل و نقل محموله‌هایتان را برآورد کنید.</p>
        </div>
        <div className="w-3/5 flex items-center justify-center">
          <div className="w-1/3 h-3/4 shadow-2xl border border-gray-200 rounded-3xl">
            <h5 className="font-bold text-sm text-[#425466] text-center w-full mt-5">استعلام کرایه حمل</h5>
          </div>
        </div>
      </div>

      <TrapezoidLayout></TrapezoidLayout>






    </>
  );
}
