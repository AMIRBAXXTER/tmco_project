"use client";
import Image from "next/image";
import MotionEffect from "@/animations/MotionEffect";

const clients = [
  { id: 1, src: "/Clients/tipax.png", alt: "تیپاکس" },
  { id: 2, src: "/Clients/irancell.png", alt: "ایرانسل" },
  { id: 3, src: "/Clients/snap-shop.png", alt: "اسنپ شاپ" },
  { id: 4, src: "/Clients/tihub.jpg", alt: "تی هاب" },
  { id: 5, src: "/Clients/kavir_tire.jpg", alt: "کویر تایر" },
  { id: 6, src: "/Clients/barez_tire.jpg", alt: "بارز تایر" },
  { id: 9, src: "/Clients/ziboom.png", alt: "زیبوم" },
  { id: 8, src: "/Clients/tnext.jpg", alt: "تی نکست" },
  { id: 10, src: "/Clients/tiexpress.png", alt: "تی اکسپرس" },
  { id: 7, src: "/Clients/jaabaar.png", alt: "جابار" },
];

export default function ClientsSection() {
  return (
    <section className="px-8 sm:px-12 lg:px-20 py-20 bg-[#f3f9fc]">
      <MotionEffect effect="slideUp">
        <h2 className="font-bold text-2xl text-[#121212] mb-12 text-center">
          مشتریان ما
        </h2>
      </MotionEffect>

      <MotionEffect effect="fadeIn">
        {/* ✅ چیدمان همیشه ۴ ستون دارد */}
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            gap-x-2
            gap-y-6
            place-items-center
          "
        >
          {clients.map((client) => (
            <div
              key={client.id}
              className="
                relative
                w-full
                max-w-[220px] sm:max-w-[260px] lg:max-w-[300px]
                aspect-[4/3]
                flex items-center justify-center
                bg-white
                rounded-xl
                border border-[#e6e6e6]
                shadow-md
                transition-all duration-300 ease-out
                overflow-hidden
                hover:scale-105
                hover:shadow-[0_0_25px_5px_rgba(50,186,254,0.3)]
              "
            >
              <Image
                src={client.src}
                alt={client.alt}
                fill
                sizes="(max-width: 768px) 25vw, (max-width: 1200px) 20vw, 15vw"
                className="object-contain p-4"
              />
            </div>
          ))}
        </div>
      </MotionEffect>
    </section>
  );
}
