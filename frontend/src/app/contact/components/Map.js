"use client";

export default function MapLinksIcons({ lat = 35.7012772, lng = 51.2226153 }) {
  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  return (
    <div
      className="
        grid 
        grid-cols-1 
        md:grid-cols-[1fr_2fr] 
        gap-6 
        items-center 
        p-6 
        rounded-lg 
        bg-white/70 
        backdrop-blur-sm 
        mt-20
      "
    >
      {/* ستون چپ (در موبایل بالا، در دسکتاپ چپ) */}
      <div className="space-y-4 text-gray-700 text-center md:text-right">
        <h2 className="text-2xl font-bold">
          TMCO را روی نقشه به راحتی پیدا کنید.
        </h2>
      </div>

      {/* ستون راست (در موبایل پایین، در دسکتاپ راست) */}
      <div className="rounded-md overflow-hidden shadow-md">
        <iframe
          src={mapSrc}
          className="w-full h-[350p] md:h-[400px]"
          loading="lazy"
          style={{ border: 0 }}
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
