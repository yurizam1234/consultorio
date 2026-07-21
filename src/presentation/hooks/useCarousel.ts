"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseCarouselOptions {
  length: number;
  autoplayMs?: number;
}

export function useCarousel({ length, autoplayMs }: UseCarouselOptions) {
  const [activeIndex, setActiveIndex] = useState(0);
  const pausedRef = useRef(false);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % length) + length) % length);
    },
    [length]
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (!autoplayMs) return;
    const interval = setInterval(() => {
      if (!pausedRef.current) {
        setActiveIndex((current) => (current + 1) % length);
      }
    }, autoplayMs);
    return () => clearInterval(interval);
  }, [autoplayMs, length]);

  const pause = useCallback(() => {
    pausedRef.current = true;
  }, []);
  const resume = useCallback(() => {
    pausedRef.current = false;
  }, []);

  return { activeIndex, goTo, next, prev, pause, resume };
}
