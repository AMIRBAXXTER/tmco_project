"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function useScrollTyped(strings, options = {}, threshold = 0.5) {
  const elRef = useRef(null);
  const typedInstance = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !typedInstance.current) {
          typedInstance.current = new Typed(elRef.current, {
            strings,
            typeSpeed: 60,
            backSpeed: 30,
            backDelay: 1000,
            loop: false,
            ...options,
          });
        }
      },
      { threshold }
    );

    if (elRef.current) observer.observe(elRef.current);

    return () => {
      if (elRef.current) observer.unobserve(elRef.current);
      if (typedInstance.current) typedInstance.current.destroy();
    };
  }, [strings, options, threshold]);

  return elRef;
}
