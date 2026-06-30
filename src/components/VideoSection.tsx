"use client";

import { useInView } from "motion/react";
import { useEffect, useRef } from "react";

const VIDEO_SRC = "/videos/main-character-energy.mp4";

const VideoSection = () => {
  const container = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const maskVideoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(container, { amount: 0.5 });

  useEffect(() => {
    const video = videoRef.current;
    const maskVideo = maskVideoRef.current;
    if (!video) return;

    if (isInView) {
      void video.play().catch(() => {});
      void maskVideo?.play().catch(() => {});
    } else {
      video.pause();
      maskVideo?.pause();
    }
  }, [isInView]);

  return (
    <section
      ref={container}
      className="relative flex h-svh w-screen shrink-0 items-center justify-center overflow-hidden bg-secondary md:h-screen"
    >
      <video
        ref={maskVideoRef}
        src={VIDEO_SRC}
        aria-hidden
        muted
        loop
        playsInline
        preload="metadata"
        tabIndex={-1}
        className="pointer-events-none absolute inset-0 size-full scale-110 object-cover object-[center_32%] opacity-25 blur-[80px] saturate-50 brightness-90"
      />

      <div className="pointer-events-none absolute inset-0 bg-secondary/80" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 45%, rgba(19, 179, 190, 0.07) 0%, rgba(5, 31, 40, 0.95) 55%, #051f28 100%)",
        }}
      />

      <div className="pointer-events-none absolute top-[-10%] right-[-5%] w-125 h-125 rounded-full bg-primary/8 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[-10%] w-100 h-100 rounded-full bg-white/5 blur-[100px]" />

      <div className="relative z-10 mx-auto h-[min(86svh,820px)] w-[min(92vw,640px)] overflow-hidden sm:w-[min(88vw,600px)] lg:h-[min(88vh,860px)] lg:w-[min(82vw,680px)]">
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          title="Main Character Energy"
          muted
          loop
          playsInline
          preload="metadata"
          className="pointer-events-none size-full origin-center scale-[0.96] object-cover object-[center_32%] sm:scale-[1.02] lg:scale-[1.06]"
        />
      </div>
    </section>
  );
};

export default VideoSection;
