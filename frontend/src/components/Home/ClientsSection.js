"use client";
import Image from "next/image";
import MotionEffect from "@/animations/MotionEffect";

const clients = [
  { id: 1, src: "/Clients/dashboard.png", alt: "همراه اول" },
  { id: 2, src: "/Clients/images (1).png", alt: "اسنپ‌ترک" },
  { id: 3, src: "/Clients/6.png", alt: "پست ایران" },
  { id: 4, src: "/Clients/tnext.jpg", alt: "بانک سینا" },
  { id: 5, src: "/Clients/Final-Ziboom-30Dec-12-300x109.png", alt: "مپنا" },
  { id: 6, src: "/Clients/snap-shop.png", alt: "مپنا" },
  { id: 7, src: "/Clients/1658044772_تی-هاب.jpg", alt: "مپنا" },
  { id: 8, src: "/Clients/تی-اکسپرس.png", alt: "مپنا" },
];

export default function ClientsSection() {
  return (
    <section className="px-8 sm:px-12 lg:px-20 py-20 bg-[#f3f9fc]">
      <MotionEffect effect="slideUp">
        <h2 className="font-extrabold text-4xl text-[#121212] mb-12 text-center">
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
