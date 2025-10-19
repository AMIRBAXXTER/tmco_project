"use client";
import { useEffect, useState } from "react";

export function useZoomLevel() {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const updateZoom = () => {
      // دستگاه‌هایی مثل ویندوز و مک زوم مرورگر رو با این نسبت مشخص می‌کنن
      const zoomLevel = window.devicePixelRatio;
      setZoom(zoomLevel);
    };

    updateZoom();
    window.addEventListener("resize", updateZoom);
    window.addEventListener("wheel", updateZoom);
    return () => {
      window.removeEventListener("resize", updateZoom);
      window.removeEventListener("wheel", updateZoom);
    };
  }, []);

  return zoom;
}
