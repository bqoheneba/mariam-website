"use client";

import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

export function usePrefersNativeScroll() {
  const [prefersNativeScroll, setPrefersNativeScroll] = useState(true);

  useEffect(() => {
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrowViewport = window.matchMedia("(max-width: 1023px)");

    const update = () => {
      setPrefersNativeScroll(
        coarsePointer.matches ||
          reducedMotion.matches ||
          narrowViewport.matches,
      );
    };

    update();
    coarsePointer.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);
    narrowViewport.addEventListener("change", update);

    return () => {
      coarsePointer.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
      narrowViewport.removeEventListener("change", update);
    };
  }, []);

  return prefersNativeScroll;
}
