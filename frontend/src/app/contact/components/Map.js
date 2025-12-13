"use client";

export default function MapLinksIcons({ lat = 35.7012772, lng = 51.2226153 }) {
  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-6
        p-6
        rounded-lg
        bg-white/70
        backdrop-blur-sm
        mt-20
      "
    >
      {/* عنوان */}
      <div className="text-gray-700 text-center">
        <h2 className="text-2xl font-bold">
          TMCO را روی نقشه به راحتی پیدا کنید.
        </h2>
      </div>

      {/* نقشه */}
      <div className="rounded-lg overflow-hidden shadow-md">
        <iframe
          src={mapSrc}
          className="w-full md:w-[90%] mx-auto h-[350px] md:h-[400px]"
          loading="lazy"
          style={{ border: 0 }}
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
