"use client";

import Image from "next/image";
import { useScroll, useTransform, motion } from "motion/react";
import { useRef, useEffect, useState } from "react";
import Header from "@/components/Header";
import Paragraph from "@/components/Paragraph";
import VideoSection from "@/components/VideoSection";
import ServicesScrollSection from "@/components/ServicesScrollSection";

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

  const logosX = useTransform(horizontalScrollY, [0.9, 1], ["0%", "-100%"]);

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
              src="/images/hero.png"
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
                      src="/images/mariam.jpg"
                      fill
                      alt="A woman standing"
                      className="object-cover"
                      style={{ objectPosition: "50% 30%" }}
                    />
                  </div>
                </div>
              </div>

              {/* Horizontal Scrolling Logos */}
              {/* <div className="overflow-hidden mt-8">
                <motion.div style={{ x: logosX }} className="flex gap-4">
                  {[
                    "letshego.png",
                    "ogilvy.png",
                    "papillon.png",
                    "standard-chartered.png",
                    "swivel.png",
                    "vodafone.png",
                    "akuna.png",
                  ].map((logo, i) => (
                    <div key={i} className="shrink-0 w-32 h-16 relative">
                      <Image
                        src={`/images/${logo}`}
                        alt={logo.replace(".png", "")}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ))}
                </motion.div>
              </div> */}
            </section>
          </motion.div>
        </div>
      </div>

      <ServicesScrollSection />
    </main>
  );
}
