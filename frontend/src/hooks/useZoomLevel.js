"use client";
import { useEffect, useState } from "react";

export function useZoomLevel() {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    // اگر در محیط مرورگر نیست، هیچ کاری نکن
    if (typeof window === "undefined") return;

    const updateZoom = () => {
      const zoomLevel = window.devicePixelRatio || 1;
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
