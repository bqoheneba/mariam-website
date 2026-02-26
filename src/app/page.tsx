"use client";

import Image from "next/image";
import { useScroll, useTransform, motion } from "motion/react";
import { useRef, useEffect, useState } from "react";
import Header from "@/components/Header";
import Paragraph from "@/components/Paragraph";
import VideoSection from "@/components/VideoSection";
import ServicesScrollSection from "@/components/ServicesScrollSection";
import Footer from "@/components/Footer";
import GoogleCalendarEmbed from "@/components/GoogleCalendarEmbed";
import SpotifyEmbed from "@/components/SpotifyEmbed";

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const imageContainer = useRef<HTMLDivElement>(null);
  const [, setScaleFactor] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const handleResize = () => {
      if (imageContainer.current) {
        const { width, height } =
          imageContainer.current.getBoundingClientRect();
        const scaleX = window.innerWidth / width;
        const scaleY = window.innerHeight / height;
        const maxScale = Math.max(scaleX, scaleY);
        // Add a little buffer to ensure edges are fully covered
        setScaleFactor(maxScale * 1.05);
      }
    };

    handleResize(); // Initial calculation
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filter = useTransform(
    scrollYProgress,
    [0, 1],
    ["grayscale(100%)", "grayscale(0%)"],
  );

  const textX = useTransform(scrollYProgress, [0, 1], ["-0.8%", "-4%"]);

  const horizontalRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: horizontalScrollY } = useScroll({
    target: horizontalRef,
    offset: ["start start", "end end"],
  });

  const textRevealProgress = useTransform(horizontalScrollY, [0, 0.3], [0, 1]);
  const x = useTransform(horizontalScrollY, [0.3, 1], ["0%", "-200vw"]);

  return (
    <main className="relative">
      <Header className="sticky top-0 z-40" />
      <div ref={container} className="h-[250vh] relative -top-16 md:-top-23">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden bg-secondary">
          {/* Main Content Container - Centered */}
          <div className="relative w-full h-full flex items-center justify-center z-20">
            {/* Cinematic Image - Scales Up & Reveals */}
            <motion.div
              ref={imageContainer}
              style={{
                width: useTransform(
                  scrollYProgress,
                  [0, 0.6],
                  [isMobile ? "80vw" : "60vw", "100vw"],
                ),
                height: useTransform(
                  scrollYProgress,
                  [0, 0.6],
                  [isMobile ? "50vh" : "60vh", "100vh"],
                ),
                filter,
              }}
              className="relative overflow-hidden shadow-2xl z-10"
            >
              <Image
                src="/images/hero.jpg"
                alt="Mariam Kaleem"
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Bold Typography Overlay - Difference Blend Mode */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none mix-blend-difference">
              <motion.div
                style={{
                  y: useTransform(scrollYProgress, [0, 0.4], [0, -50]),
                  opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0]),
                  scale: useTransform(scrollYProgress, [0, 0.6], [1, 1.2]),
                }}
                className="flex flex-col items-center text-center"
              >
                <motion.h1
                  style={{
                    x: useTransform(scrollYProgress, [0, 0.5], [0, -100]),
                  }}
                  className="text-[12vw] lg:text-[8vw] leading-[0.9] font-semibold tracking-tighter text-white"
                >
                  MARIAM
                </motion.h1>
                <motion.h1
                  style={{
                    x: useTransform(scrollYProgress, [0, 0.5], [0, 100]),
                  }}
                  className="text-[12vw] lg:text-[8vw] leading-[0.9] font-semibold tracking-tighter text-white"
                >
                  KALEEM
                </motion.h1>
              </motion.div>
            </div>
          </div>

          {/* Background Running Text - Motion Blur Effect */}
          <motion.div
            style={{
              x: textX,
              opacity: useTransform(scrollYProgress, [0, 0.5], [0.1, 0]),
            }}
            className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap pointer-events-none z-0"
          >
            <h1 className="text-[20vw] leading-none font-bold tracking-tighter text-white uppercase select-none flex opacity-30 blur-sm">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="mr-8">
                  Mariam Kaleem
                </span>
              ))}
            </h1>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4 mix-blend-difference"
          >
            <p className="text-white text-xs uppercase tracking-[0.2em] font-medium">
              Scroll to Discover
            </p>
            <div className="w-px h-16 bg-white animate-pulse" />
          </motion.div>
        </div>
      </div>

      <div id="about" ref={horizontalRef} className="h-[500vh] relative">
        <div
          id="portfolio"
          className="absolute top-[60%] w-full h-px pointer-events-none"
        />
        <div className="sticky top-0 h-screen overflow-hidden flex">
          <motion.div style={{ x }} className="flex shrink-0">
            <section className="w-screen h-screen flex flex-col max-lg:flex-col-reverse lg:flex-row items-start lg:items-center justify-around lg:justify-between px-6 pt-24 pb-10 lg:p-20 gap-6 lg:gap-0 shrink-0">
              <Paragraph
                progress={textRevealProgress}
                className="text-[5.5vw] sm:text-2xl lg:text-4xl flex flex-col justify-end leading-snug tracking-tighter font-medium shrink-0 lg:h-full"
                text={[
                  "Strategic marketer with 18+ years",
                  "building customer-centric African",
                  "brands, translating insights into",
                  "impactful campaigns that drive",
                  "growth and loyalty",
                ]}
              />
              <p className="shrink-0 lg:h-full text-sm font-light text-white/60 leading-relaxed lg:mt-20 lg:text-right max-w-65 lg:max-w-none">
                Her passion for Africa&apos;s creative
                <br /> economy fuels her mission to transform
                <br /> the continent through innovation,
                <br /> cultural diversity, and job creation.
              </p>
            </section>

            <VideoSection />

            <section className="w-screen h-screen flex flex-col items-center justify-center shrink-0 px-6 lg:px-20">
              <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 w-full max-w-7xl">
                <div className="flex-1 space-y-4 lg:space-y-8">
                  <div className="space-y-4 lg:space-y-8">
                    <p className="text-white text-3xl lg:text-5xl leading-tight tracking-tighter font-medium">
                      Built transformative
                      <br />
                      marketing strategies
                      <br />
                      across Africa
                    </p>

                    <div className="pt-3 lg:pt-6 max-w-sm mt-auto">
                      <p className="text-white/80 text-sm leading-relaxed font-light">
                        Strategic expertise developed at MmrsOgilvy, Swivel
                        Africa, Vodafone, Standard Chartered, and Letshego
                        Africa. Translated data insights into customer-centric
                        campaigns driving acquisition, engagement, and loyalty
                        across sub-Saharan Africa.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 relative w-full">
                  <div className="relative h-56 lg:h-96 overflow-hidden shadow-xl">
                    <Image
                      src="/images/mariam.jpeg"
                      fill
                      alt="A woman standing"
                      className="object-cover"
                      style={{ objectPosition: "50% 30%" }}
                    />
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        </div>
      </div>

      <div id="services">
        <ServicesScrollSection />
      </div>

      <section className="w-full min-h-[90vh] bg-secondary flex flex-col justify-center items-center pt-20 lg:pt-40 pb-20 lg:pb-46 relative overflow-hidden border-t border-white/5">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] right-[-10%] w-150 h-150 bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-125 h-125 bg-white/5 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-7xl w-full px-6 lg:px-12 relative z-10 flex flex-col items-center text-center">
          <div className="mb-8 lg:mb-16 max-w-4xl w-full">
            <div className="inline-flex items-center gap-3 pl-3 pr-4 py-2 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="relative flex size-2 lg:size-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full size-2 lg:size-3 bg-primary"></span>
              </span>
              <span className="text-white/60 tracking-wider text-[0.6rem] lg:text-xs font-medium uppercase">
                Featured Podcast
              </span>
            </div>

            <h2 className="text-4xl lg:text-7xl leading-[0.9] max-lg:leading-[1.1] font-semibold tracking-tighter text-white mb-4 lg:mb-6">
              Scoop with
              <span className="text-primary/90 block lg:inline lg:ml-4">
                Mariam
              </span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-white/60 text-center font-light max-w-2xl mx-auto leading-relaxed">
              Dive deep into conversations on strategic marketing and
              <br className="max-lg:hidden" /> brand building across the African
              continent.
            </p>
          </div>

          <div className="w-full max-w-4xl">
            <SpotifyEmbed
              // Removed theme=0 to allow Spotify to auto-match the color
              src="https://open.spotify.com/embed/episode/4yJNb3ObmHSLbQl4CleTY0?utm_source=generator"
              height={352}
            />
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="w-full min-h-screen bg-secondary flex flex-col justify-center items-center pb-46 pt-36 relative overflow-hidden"
      >
        <div className="max-w-7xl w-full px-8 lg:px-12 flex flex-col gap-20 items-center z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-7xl leading-[0.9] font-semibold tracking-tighter text-white mb-6">
              Let&apos;s
              <span className="text-white/40 block lg:inline lg:ml-6">
                Connect
              </span>
            </h2>
            <p className="lg:text-lg text-white/60 text-center font-light max-w-2xl mx-auto leading-relaxed">
              Schedule a time to discuss potential collaborations, marketing
              <br className="max-lg:hidden" />
              strategies, or speaking engagements.
            </p>
          </div>

          <div className="w-full max-w-5xl">
            <div className="w-full bg-white/5 backdrop-blur-sm rounded-2xl p-1 border border-white/10 shadow-2xl">
              <GoogleCalendarEmbed
                calendarSrc="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1424iSu83N2PPFTQEQH93SgAtYGv6z_H6ZAGa4lFHcbyCsLnw9U5IfGWhmYc-tW7z_LcKKHVMK?gv=true"
                height={750}
                theme="dark"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-250 h-250 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      <Footer />
    </main>
  );
}
