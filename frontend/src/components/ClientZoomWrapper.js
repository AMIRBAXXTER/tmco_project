"use client";
import { useZoomLevel } from "@/hooks/useZoomLevel";

export default function ClientZoomWrapper({ children }) {
  const zoom = useZoomLevel();
  const scale = zoom < 1 ? zoom : 1;
  const shouldScale = zoom < 1;

  // استایل برای فرزند (کل محتوا)
  const innerStyle = shouldScale
    ? {
        transform: `scale(${scale})`,
        transformOrigin: "top center",
        transition: "transform 0.3s ease",
        width: "100%", // خودش مرکز میشه داخل flex
        maxWidth: `${100 / scale}%`, // کنترل حدود width تا وسط بمونه
      }
    : {
        transform: "none",
        width: "100%",
      };

  return (
    <div
      // والد: همیشه 100% صفحه، مسئول مرکز کردن محتوا
      className="min-h-screen flex justify-center items-start bg-gray-50 overflow-x-hidden"
    >
      <div style={innerStyle} className="transition-transform duration-300 ease-out">
        {children}
      </div>
    </div>
  );
}
