'use client'
import React, { useState, useEffect } from 'react';
import MotionEffect from "@/animations/MotionEffect";
import { AnimatePresence } from "framer-motion";

export default function MainForm() {
  // 🧠 state های فرم
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ⚙️ وضعیت مودال
  const [modal, setModal] = useState({
    visible: false,
    type: '',
    message: '',
  });

  // 🎬 بستن خودکار مودال بعد از چند ثانیه
  useEffect(() => {
    if (modal.visible) {
      const timer = setTimeout(() => {
        setModal({ visible: false, type: '', message: '' });
      }, 4000); // ۴ ثانیه بعد از نمایش
      return () => clearTimeout(timer);
    }
  }, [modal.visible]);

  // 🔄 تغییر مقدار فیلد
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // 📤 ارسال فرم
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/suggestions/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      setFormData({ full_name: '', email: '', subject: '', message: '' });

      setModal({
        visible: true,
        type: 'success',
        message: 'پیام شما با موفقیت ارسال شد ✅',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setModal({
        visible: true,
        type: 'error',
        message: 'مشکلی در ارسال پیام رخ داد ❌',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative flex justify-center items-center w-full overflow-hidden md:py-8">
      <div className="relative w-full md:w-[80%] mx-auto flex justify-center items-center h-[900px] md:h-[620px]">

        {/* 🔵 پس‌زمینه SVG */}
        <svg
          viewBox="0 0 1175 751"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full z-0 object-cover max-h-[900px] md:max-h-[650px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0 16C0 7.16343 7.16344 0 16 0H394.873C398.818 0 402.624 1.45732 
               405.56 4.09212L435.44 30.9079C438.376 33.5427 442.182 35 446.127 35H751.962C755.549 35 
               759.033 33.7942 761.853 31.5762L797.647 3.42382C800.467 1.20583 803.951 0 
               807.538 0H1159C1167.84 0 1175 7.16344 1175 16V735C1175 743.837 1167.84 751 1159 
               751H16C7.16346 751 0 743.837 0 735V16Z"
            fill="#001230"
          />
        </svg>

        {/* 🤍 محتوای داخل پس‌زمینه */}
        <div className="relative z-10 w-full text-white flex flex-col items-center justify-center -translate-y-6 md:translate-y-0">

          {/* 📢 عنوان بالای فرم */}
          <h2 className="text-center text-2xl md:text-3xl font-extrabold mt-25 md:mt-6">
            با ما در ارتباط باشید
          </h2>

          {/* ⇄ دو ستون فرم و اطلاعات تماس */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 
                       justify-items-center items-center w-[95%] md:w-[85%]"
          >

            {/* 🧾 بخش اطلاعات تماس */}
            <div className="flex flex-col justify-center items-start gap-6 bg-white rounded-xl p-5 md:p-8 shadow-lg text-[#001230] w-full md:w-[95%]">
              <h3 className="text-2xl font-extrabold w-full text-center text-[#414042] mb-1">
                اطلاعات تماس
              </h3>

              {/* ☎ تلفن */}
              <div className="flex items-center justify-start gap-4 text-[#036FD0] w-full">
                <svg className="w-15 h-15 shrink-0" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="60" height="60" rx="30" fill="#036FD0" />
                  <path d="M16.5 28.5H21C21.7956 28.5 22.5587 28.8161 23.1213 29.3787C23.6839 29.9413 24 30.7044 24 31.5V36C24 36.7956 23.6839 37.5587 23.1213 38.1213C22.5587 38.6839 21.7956 39 21 39H19.5C18.7044 39 17.9413 38.6839 17.3787 38.1213C16.8161 37.5587 16.5 36.7956 16.5 36V28.5ZM16.5 28.5C16.5 26.7272 16.8492 24.9717 17.5276 23.3338C18.2061 21.6959 19.2005 20.2076 20.4541 18.9541C21.7076 17.7005 23.1959 16.7061 24.8338 16.0276C26.4717 15.3492 28.2272 15 30 15C31.7728 15 33.5283 15.3492 35.1662 16.0276C36.8041 16.7061 38.2923 17.7005 39.5459 18.9541C40.7995 20.2076 41.7939 21.6959 42.4724 23.3338C43.1508 24.9717 43.5 26.7272 43.5 28.5M43.5 28.5V36C43.5 36.7956 43.1839 37.5587 42.6213 38.1213C42.0587 38.6839 41.2956 39 40.5 39H39C38.2044 39 37.4413 38.6839 36.8787 38.1213C36.3161 37.5587 36 36.7956 36 36V31.5C36 30.7044 36.3161 29.9413 36.8787 29.3787C37.4413 28.8161 38.2044 28.5 39 28.5H43.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M43.5 36V39C43.5 40.5913 42.8679 42.1174 41.7426 43.2426C40.6174 44.3679 39.0913 45 37.5 45H30" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-base md:text-lg font-medium">02191095436</span>
              </div>

              {/* ✉ ایمیل */}
              <div className="flex items-center justify-start gap-4 text-[#036FD0] w-full">
                <svg className="w-15 h-15 shrink-0" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="60" height="60" rx="30" fill="#036FD0" />
                  <path d="M45 22.5L31.5135 31.0905C31.0558 31.3563 30.536 31.4963 30.0068 31.4963C29.4775 31.4963 28.9577 31.3563 28.5 31.0905L15 22.5"
                    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M42 18H18C16.3431 18 15 19.3431 15 21V39C15 40.6569 16.3431 42 18 42H42C43.6569 42 45 40.6569 45 39V21C45 19.3431 43.6569 18 42 18Z"
                    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-base md:text-lg font-medium">info@tmcopars.ir</span>
              </div>

              {/* 📍 آدرس */}
              <div className="flex items-center justify-start gap-4 text-[#036FD0] w-full">
                <svg className="w-15 h-15 shrink-0" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="60" height="60" rx="30" fill="#036FD0" />
                  <path d="M42 27C42 34.4895 33.6915 42.2895 30.9015 44.6985C30.6416 44.8939 30.3252 44.9996 30 44.9996C29.6748 44.9996 29.3584 44.8939 29.0985 44.6985C26.3085 42.2895 18 34.4895 18 27C18 23.8174 19.2643 20.7652 21.5147 18.5147C23.7652 16.2643 26.8174 15 30 15C33.1826 15 36.2348 16.2643 38.4853 18.5147C40.7357 20.7652 42 23.8174 42 27Z"
                    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M30 31.5C32.4853 31.5 34.5 29.4853 34.5 27C34.5 24.5147 32.4853 22.5 30 22.5C27.5147 22.5 25.5 24.5147 25.5 27C25.5 29.4853 27.5147 31.5 30 31.5Z"
                    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-base md:text-lg font-medium leading-6 text-right">
                  تهران، شهرک استقلال ریا، خیابان سپاه اسلام ۳۶، خیابان شهید عباس شفیعی هنجنی، پلاک ۴، طبقه همکف
                </span>
              </div>
            </div>

            {/* 📝 فرم تماس */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center gap-4 
                         bg-[#001230]/40 backdrop-blur-md 
                         rounded-xl p-5 md:p-8 shadow-lg 
                         w-full md:w-[95%]"
            >
              <div className="flex flex-col gap-1.5">
                <label htmlFor="full_name" className="text-xs font-bold">نام و نام خانوادگی</label>
                <input
                  id="full_name"
                  type="text"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="px-3 py-2 rounded-md font-bold outline-none border 
                             border-[#888888] placeholder-[#888888]
                             focus:ring-2 focus:ring-[#3C9BD8]"
                  placeholder="نام و نام خانوادگی"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-bold">ایمیل</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="px-3 py-2 rounded-md font-bold outline-none border 
                             border-[#888888] placeholder-[#888888]
                             focus:ring-2 focus:ring-[#3C9BD8]"
                  placeholder="ایمیل"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-xs font-bold">موضوع</label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  dir="rtl"
                  className="px-3 py-2 rounded-md font-bold outline-none border 
                             border-[#888888] focus:ring-2 focus:ring-[#3C9BD8] 
                             bg-transparent text-white pl-10"
                  required
                >
                  <option value="" hidden>انتخاب کنید...</option>
                  <option value="suggestion" className="text-black bg-white">پیشنهاد</option>
                  <option value="complaint" className="text-black bg-white">انتقاد</option>
                  <option value="technical_support" className="text-black bg-white">پشتیبانی فنی</option>
                  <option value="question" className="text-black bg-white">سوال</option>
                  <option value="other" className="text-black bg-white">سایر</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-bold">توضیحات</label>
                <textarea
                  id="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  className="px-3 py-2 rounded-md font-bold outline-none border 
                             border-[#888888] placeholder-[#888888]
                             focus:ring-2 focus:ring-[#3C9BD8] resize-none"
                  placeholder="نظر یا پیشنهاد خود را اینجا بنویسید..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-2 py-2.5 rounded-md font-bold text-sm md:text-base transition-all duration-200 
                  ${isSubmitting
                    ? 'bg-[#888888] text-white'
                    : 'bg-[#3C9BD8] hover:bg-[#2A446F] text-white'}`}
              >
                {isSubmitting ? 'در حال ارسال...' : 'ارسال'}
              </button>

            </form>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modal.visible && (
          <MotionEffect
            effect="scaleSlideUp"
            className="fixed bottom-6 right-6 z-50"
            key={modal.type}   // کلید باعث میشه framer-motion خروج رو تشخیص بده
          >
            <div
              className={`px-5 py-3 rounded-lg shadow-lg text-center relative overflow-hidden
          ${modal.type === 'success'
                  ? 'bg-[#001230] text-green-400'
                  : 'bg-[#001230] text-red-400'} transition-all duration-300`}
            >
              <p className="font-bold text-sm md:text-base">
                {modal.message}
              </p>

              {/* 🔵 نوار-progress پایین */}
              <div className="absolute bottom-0 left-0 w-full h-1 overflow-hidden">
                <div
                  className={`h-full ${modal.type === 'success' ? 'bg-green-400' : 'bg-red-400'} animate-progress-bar`}
                ></div>
              </div>
            </div>
          </MotionEffect>
        )}
      </AnimatePresence>


    </section>
  );
}
