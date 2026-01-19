"use client";

import { LenisRef, ReactLenis } from "lenis/react";
import { cancelFrame, frame } from "motion";
import { ReactNode, useEffect, useRef } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(data: { timestamp: number }) {
      const time = data.timestamp;
      lenisRef.current?.lenis?.raf(time);
    }

    frame.update(update, true);

    return () => cancelFrame(update);
  }, []);

  return (
    <>
      {children}
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
    </>
  );
};

export default Providers;
