"use client";

import LuminousGrid from "@/components/Layout/LuminousGrid";
import ServicesTitle from "./components/ServicesTitle";
import TrainSection from "./components/TrainSection";
import PlaneSection from "./components/PlaneSection";
import TruckSection from "./components/TruckSection";
import MarineSection from "./components/MarineSection";

export default function Home() {

  return (
    <>
      <LuminousGrid />
      <ServicesTitle />
      <TruckSection />
      <PlaneSection />
      <TrainSection />
      <MarineSection />
      <h3 className="text-center text-2xl md:text-4xl font-bold mt-10">چرا تمکو؟</h3>

      <p className="text-xl my-10 mx-10 md:mx-25 md:text-justify font-bold">
        در دنیایی که سرعت، دقت و اطلاعات نقش اصلی را در موفقیت لجستیک ایفا می‌کنند،
        انتخاب یک شریک قابل‌اعتماد می‌تواند آینده یک کسب‌وکار را تغییر دهد.
      </p>

      <p className="text-xl my-10 mx-10 md:mx-25 md:text-justify font-bold">
        تمکو فقط یک شرکت حمل‌ونقل نیست؛ یک سامانه هوشمند، یکپارچه و داده‌محور است
        که تمامی مسیرهای زمینی، هوایی، ریلی و دریایی را در قالب یک شبکه منسجم به هم متصل می‌کند.
      </p>

      <p className="text-xl my-10 mx-10 md:mx-25 md:text-justify font-bold">
        در تمکو باور داریم که اعتماد از شفافیت می‌آید و شفافیت با فناوری،
        گزارش‌دهی دقیق و تحلیل زنده داده‌ها ممکن می‌شود.
        به همین دلیل هر مرحله از عملیات حمل‌ونقل از ثبت سفارش تا تحویل با
        گزارش لحظه‌ای، پشتیبانی انسانی اختصاصی، الگوریتم‌های پیش‌بینی و تحلیل مسیر
        طراحی شده تا مطمئن باشید محموله‌تان در ایمن‌ترین، سریع‌ترین و بهینه‌ترین مسیر
        در حال حرکت است.
      </p>

      <p className="text-xl my-10 mx-10 md:mx-25 md:text-justify font-bold">
        تمکو، انتخاب کسب‌وکارهایی است که آینده را می‌بینند و تصمیم می‌گیرند امروز
        در مسیر آن حرکت کنند.
      </p>


    </>

  );
}
