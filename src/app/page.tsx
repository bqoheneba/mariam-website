"use client";

import Image from "next/image";
import { useScroll, useTransform, motion } from "motion/react";
import { useRef, useEffect, useState } from "react";

const Paragraph = ({
  text,
  className,
  progress,
}: {
  text: string[];
  className: string;
  progress?: any;
}) => {
  const container = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });

  const scrollProgress = progress || scrollYProgress;

  const totalWords = text.reduce(
    (acc, line) => acc + line.split(" ").length,
    0,
  );
  let wordIndex = 0;

  return (
    <p ref={container} className={className}>
      {text.map((line, i) => (
        <span key={i} className="block">
          {line.split(" ").map((word, j) => {
            const start = wordIndex / totalWords;
            const end = start + 1 / totalWords;
            wordIndex++;
            return (
              <Word key={j} range={[start, end]} progress={scrollProgress}>
                {word}
              </Word>
            );
          })}
        </span>
      ))}
    </p>
  );
};

const Word = ({
  children,
  progress,
  range,
}: {
  children: string;
  progress: any;
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-2 inline-block text-white">
      {children}
    </motion.span>
  );
};

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
    <main>
      <div ref={container} className="h-[300vh] relative">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
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
            className="relative w-200 h-87.5 md:w-150 aspect-2/1"
          >
            <Image
              src="/images/hero.png"
              alt="Mariam's Picture"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </div>

      <div ref={horizontalRef} className="h-[500vh] relative">
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div style={{ x }} className="flex">
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
              <p className="shrink-0 h-full text-sm font-light text-white/60 leading-relaxed">
                Her passion for Africa&apos;s creative
                <br /> economy fuels her mission to transform
                <br /> the continent through innovation,
                <br /> cultural diversity, and job creation.
              </p>
            </section>
            <section className="w-screen h-screen flex items-center justify-center shrink-0">
              Another section
            </section>
            <section className="w-screen h-screen flex items-center justify-center shrink-0">
              Last section
            </section>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
