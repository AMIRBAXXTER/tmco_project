"use client";

import LuminousGrid from "@/components/Layout/LuminousGrid";
import ServicesTitle from "./components/ServicesTitle";
import TopSection from "./components/TopSection";
import MiddleSection from "./components/MiddleSection";
import BottomSection from "./components/BottomSection";

export default function Home() {

  return (
    <>
      <LuminousGrid />
      <ServicesTitle />
      <TopSection />
      <MiddleSection />
      <BottomSection />
      <h3 className="text-center text-2xl md:text-4xl font-bold mt-10">چرا تمکو؟</h3>
      <p className="text-center text-xl my-10 mx-10 md:mx-25 text-justify">در دنیایی که سرعت و اطلاعات حرف اول را می‌زنند، انتخاب شریک درست تفاوتی حیاتی ایجاد می‌کند. تمکو فقط یک شرکت حمل‌ونقل نیست؛ یک سامانه هوشمند است که تمامی مسیرها — زمینی، هوایی و ریلی — را در شبکه‌ای منسجم از داده و تحلیل زنده به هم پیوند می‌دهد.

        ما باور داریم «اعتماد» از شفافیت می‌آید، و شفافیت از فناوری. به همین دلیل هر مرحله از مسیر با گزارش‌های لحظه‌ای، پشتیبانی انسانی و الگوریتم‌های پیش‌بینی طراحی شده تا مطمئن باشید محموله‌تان در امن‌ترین مسیر ممکن حرکت می‌کند.

        تمکو، انتخاب کسب‌وکارهایی است که آینده را می‌بینند و در مسیر آن حرکت می‌کنند.</p>
    </>

  );
}
