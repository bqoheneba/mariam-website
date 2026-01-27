"use client";

import { useInView } from "motion/react";
import { useEffect, useRef } from "react";

const VideoSection = () => {
  const container = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isInView = useInView(container, { amount: 0.5 });

  useEffect(() => {
    if (!iframeRef.current?.contentWindow) return;

    const message = isInView
      ? '{"event":"command","func":"playVideo","args":""}'
      : '{"event":"command","func":"pauseVideo","args":""}';

    iframeRef.current.contentWindow.postMessage(message, "*");
  }, [isInView]);

  return (
    <section
      ref={container}
      className="w-screen h-screen relative overflow-hidden shrink-0"
    >
      <iframe
        ref={iframeRef}
        src="https://www.youtube.com/embed/rO865GCzIcw?start=17&autoplay=0&mute=1&rel=0&loop=1&playlist=rO865GCzIcw&controls=0&playsinline=1&enablejsapi=1"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute top-1/2 left-1/2 w-[max(100vw,177.78vh)] h-[max(100vh,56.25vw)] -translate-x-1/2 -translate-y-1/2 pointer-events-none border-0"
      />
    </section>
  );
};

export default VideoSection;
