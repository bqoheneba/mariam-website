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
  const [scaleFactor, setScaleFactor] = useState(1);

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

  const scale = useTransform(scrollYProgress, [0, 1], [1, scaleFactor]);
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
      <div ref={container} className="h-[300vh] relative -top-23">
        <div className="sticky top-0  h-screen flex items-center justify-center overflow-hidden">
          <motion.p
            style={{ x: textX, y: "-50%" }}
            className="absolute text-[14rem] font-medium -tracking-[1rem] top-1/2 left-0 whitespace-nowrap"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i}>
                <span className="text-white/50">Mariam</span>{" "}
                <span className="text-primary">Kaleem</span>{" "}
              </span>
            ))}
          </motion.p>
          <motion.div
            ref={imageContainer}
            style={{ scale, filter }}
            className="relative w-200 h-87.5 md:w-150 aspect-2/1 z-50"
          >
            <Image
              src="/images/hero.jpg"
              alt="Mariam's Picture"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          <div className="absolute bottom-0 w-full flex flex-col items-center justify-center">
            <p className="text-center font-light text-sm text-white/50 mb-3">
              Powering Innovation <br /> Igniting Brands
            </p>

            <div className="h-10 w-[0.02rem] bg-white/50" />
          </div>
        </div>
      </div>

      <div ref={horizontalRef} className="h-[500vh] relative">
        <div className="sticky top-0 h-screen overflow-hidden flex">
          <motion.div style={{ x }} className="flex shrink-0">
            <section className="w-screen h-screen flex items-center justify-between p-20 shrink-0">
              <Paragraph
                progress={textRevealProgress}
                className="text-4xl flex flex-col justify-end leading-snug tracking-tighter font-medium shrink-0 h-full"
                text={[
                  "Strategic marketer with 18+ years",
                  "building customer-centric African",
                  "brands, translating insights into",
                  "impactful campaigns that drive",
                  "growth and loyalty",
                ]}
              />
              <p className="shrink-0 h-full text-sm font-light text-white/60 leading-relaxed mt-20">
                Her passion for Africa&apos;s creative
                <br /> economy fuels her mission to transform
                <br /> the continent through innovation,
                <br /> cultural diversity, and job creation.
              </p>
            </section>

            <VideoSection />

            <section className="w-screen h-screen flex flex-col items-center justify-center shrink-0 px-20">
              <div className="flex items-center justify-center gap-20 w-full max-w-7xl">
                <div className="flex-1 space-y-8">
                  <div className="space-y-8">
                    <p className="text-white text-5xl leading-tight tracking-tighter font-medium">
                      Built transformative
                      <br />
                      marketing strategies
                      <br />
                      across Africa
                    </p>

                    <div className="pt-6 max-w-sm mt-auto">
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
                <div className="flex-1 relative h-full w-full">
                  <div className="relative h-96 overflow-hidden shadow-xl">
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

      <ServicesScrollSection />

      <section className="w-full min-h-[90vh] bg-secondary flex flex-col justify-center items-center pt-40 pb-46 relative overflow-hidden border-t border-white/5">
        {/* Geometric Background accent */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-7xl w-full px-8 md:px-12 relative z-10 flex flex-col items-center text-center">
          <div className="mb-16 max-w-4xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="text-white/60 tracking-wider text-xs font-medium uppercase">
                Featured Podcast
              </span>
            </div>

            <h2 className="text-7xl leading-[0.9] font-semibold tracking-tighter text-white mb-6">
              Scoop with
              <span className="text-primary/90 block md:inline md:ml-4">
                Mariam
              </span>
            </h2>

            <p className="lg:text-lg text-white/60 text-center font-light max-w-2xl mx-auto leading-relaxed">
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

      <section className="w-full min-h-screen bg-secondary flex flex-col justify-center items-center py-24 relative overflow-hidden">
        <div className="max-w-7xl w-full px-8 md:px-12 flex flex-col md:flex-row gap-16 md:gap-32 items-start z-10">
          <div className="flex-1 space-y-10 sticky top-32">
            <h2 className="text-[clamp(3.5rem,6vw,6.5rem)] leading-[0.9] font-semibold tracking-tighter text-white">
              Let&apos;s
              <br />
              <span className="text-white/40">Connect</span>
            </h2>
            <div className="max-w-md space-y-8">
              <p className="text-2xl md:text-3xl font-light text-white/80 leading-snug tracking-tight">
                Schedule a time to discuss potential collaborations, marketing
                strategies, or speaking engagements.
              </p>

              <div className="w-20 h-px bg-white/20" />

              <div className="space-y-2">
                <p className="text-sm uppercase tracking-widest text-white/40 font-medium">
                  Email
                </p>
                <a
                  href="mailto:hello@benchfiveManager.com"
                  className="text-xl text-white hover:text-primary transition-colors block"
                >
                  hello@benchfive.com
                </a>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="w-full bg-white/5 backdrop-blur-sm rounded-2xl p-1 border border-white/10 shadow-2xl">
              <GoogleCalendarEmbed
                calendarSrc="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1424iSu83N2PPFTQEQH93SgAtYGv6z_H6ZAGa4lFHcbyCsLnw9U5IfGWhmYc-tW7z_LcKKHVMK?gv=true"
                height={750}
                theme="dark"
              />
            </div>
          </div>
        </div>

        {/* Decorative background element */}
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[1000px] h-[1000px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      <Footer />
    </main>
  );
}
