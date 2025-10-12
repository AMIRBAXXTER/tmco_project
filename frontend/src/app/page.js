"use client";
import {IntroAnimation, WhyTmco, DriverApp, DriverDetail} from "@/components/Home";
import MotionEffect from "@/animations/MotionEffect";

export default function Home() {

  return (
    <>
      <main className="mb-20">
        <IntroAnimation />
      </main>
      <div className="md:pt-20 mx-20 w-auto h-auto">
        <div>
          <h3 className="font-bold mb-5 text-2xl">یک بستر یکپارچه برای مدیریت حمل و نقل سازمانی</h3>
          <p>تمکو اولین پلتفرم ترکیبی حمل و نقل، راهکاری نوین برای شرکت ها و سازمان ها فراهم می کند تا فرایندهای لجستیکی خود را در محیط دیجیتال، ساده و شفاف مدیریت کنند. این پلتفرم امکان اتصال به ارائه کنندگان محتلف حمل و نقل زمینی، ریلی و هوایی را فراهم کرده و با داده های دقیق، تصمیم گیری هوشمنده تر را ممکن می سازد.</p>
        </div>
        <div>
          <MotionEffect effect="slideUp">
            <h2 className="font-extrabold text-3xl mt-10">چرا تمکو ؟</h2>
          </MotionEffect>
          <WhyTmco />
        </div>
        <div className="flex flex-col lg:flex-row mt-20 w-full h-auto">
          <DriverApp />
          <DriverDetail />
        </div>

      </div>


    </>

  );
}
