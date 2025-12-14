import { IntroAnimation } from '@/components/Home'
import MotionEffect from '@/animations/MotionEffect'
import React from 'react'

export default function Page() {
    return (
        <div className="w-full overflow-x-hidden">
            <IntroAnimation />

            {/* Event Intro */}
            <section className="max-w-7xl mx-auto px-5 md:px-10 py-20">
                <div className="bg-white rounded-2xl shadow-md p-6 md:p-12">
                    <h1 className="font-extrabold text-xl md:text-3xl leading-relaxed">
                        رویداد رسمی تمکو به مناسبت روز ملی حمل‌ونقل
                    </h1>

                    <p className="mt-4 text-gray-600 text-sm md:text-base">
                        ۲۶ آذر | همراهان مسیر، قهرمانان حرکت
                    </p>

                    <p className="mt-6 text-gray-800 leading-8 text-justify">
                        همراهان عزیز تمکو،
                        در روز ملی حمل‌ونقل، افتخار داریم از رانندگان سخت‌کوش،
                        مدیران ارزشمند و تیم ستادی پرتلاش تمکو دعوت کنیم
                        در کنار یکدیگر، لحظه‌ای برای قدردانی، همدلی و
                        نگاه به آینده حمل‌ونقل هوشمند داشته باشیم.
                    </p>

                    <p className="mt-8 font-bold text-gray-900">
                        این رویداد فرصتی است برای:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                        {[
                            'تقدیر از قهرمانان جاده‌ها و ناوگان تمکو',
                            'مرور دستاوردهای سال جاری',
                            'ارائه چشم‌انداز آینده پلتفرم هوشمند تمکو',
                            'حضور و سخنرانی مدیران تمکو و مدیران هلدینگ',
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 text-center shadow-sm"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Video */}
            <section className="max-w-7xl mx-auto px-5 md:px-10">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                    <video
                        src="/invitation.MP4"
                        className="w-full"
                        controls
                    />
                </div>
            </section>

            {/* Event Details */}
            <section className="max-w-5xl mx-auto px-5 md:px-10 py-20">
                <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 space-y-4 text-gray-800">
                    <p><span className="font-bold">تاریخ:</span> ۲۶ آذر – روز ملی حمل‌ونقل</p>
                    <p><span className="font-bold">ساعت:</span> ۱۷ الی ۱۹</p>
                    <p><span className="font-bold">محل برگزاری:</span> هلدینگ فاخر – طبقه سوم – سالن اجتماعات</p>

                    <div className="pt-6 border-t text-sm md:text-base leading-8 text-gray-700">
                        <p>حضور شما باعث افتخار تمکو است.</p>
                        <p>
                            شما ستون‌های این مسیر هستید؛
                            مسیری که هر روز با تلاش، نظم و تعهد شما معنا پیدا می‌کند.
                        </p>
                    </div>
                </div>
            </section>

            {/* Map */}
            <section className="max-w-7xl mx-auto px-5 md:px-10 pb-24">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3237.9118331282417!2d51.4160056!3d35.7636851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e07adc43b9d49:0x66db30557673df52!2z2YbZhtis2KfZhiDYr9in2YTYsdqG!5e0!3m2!1sfa!2sir!4v1733740000000"
                        className="w-full h-[300px] md:h-[450px] border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </section>
        </div>
    )
}
