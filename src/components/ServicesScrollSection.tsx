"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion, useSpring } from "motion/react";

const sections = [
  {
    title: "Strategic Services",
    items: [
      "Brand Management & Positioning",
      "Marketing Strategy Development",
      "Go-to-Market Strategy",
      "Brand Engagement Strategy",
      "Consumer Insights & Research",
    ],
  },
  {
    title: "Operational Services",
    items: [
      "Project Management",
      "Event Management",
      "Sponsorship Management",
      "Campaign Execution",
      "Vendor & Stakeholder Management",
    ],
  },
  {
    title: "Creative Services",
    items: [
      "Concept Development",
      "Experiential Marketing",
      "Digital Marketing",
      "Content Strategy",
      "Brand Storytelling",
    ],
  },
];

const ServicesScrollSection: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  // Create scroll progress tied to this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Container animations
  const containerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Content transitions start after container animation (0.2 onwards)
  const opacities = [
    useTransform(scrollYProgress, [0.2, 0.35, 0.45], [1, 1, 0]),
    useTransform(scrollYProgress, [0.45, 0.55, 0.65], [0, 1, 0]),
    useTransform(scrollYProgress, [0.65, 0.75, 0.85], [0, 1, 1]),
  ];

  // Parallax for numbers
  const numberY = [
    useTransform(scrollYProgress, [0.2, 0.45], [0, -50]),
    useTransform(scrollYProgress, [0.45, 0.65], [0, -50]),
    useTransform(scrollYProgress, [0.65, 0.85], [0, -50]),
  ];

  // Width for the small progress indicator bar (0% -> 100% across the section)
  const rawBarWidth = useTransform(
    scrollYProgress,
    [0.2, 0.75],
    ["0%", "100%"],
  );
  const barWidth = useSpring(rawBarWidth, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="relative h-[300vh] z-40">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: containerOpacity }}
          className="bg-primary flex flex-col justify-between py-10 lg:py-14 px-8 lg:px-16 h-full w-full relative"
        >
          <div className="flex items-start justify-between w-full">
            <div className="w-22 bg-white/25 h-1 overflow-hidden">
              <motion.div
                style={{ width: barWidth }}
                className="h-1 bg-secondary"
              />
            </div>
            <div className="relative text-6xl lg:text-[clamp(6rem,20vw,14rem)] font-medium leading-[0.85] text-secondary tracking-[-0.5rem] lg:tracking-[-1.2rem] opacity-20">
              {["01", "02", "03"].map((num, index) => (
                <motion.span
                  key={num}
                  style={{ opacity: opacities[index], y: numberY[index] }}
                  className={index > 0 ? "absolute top-0 right-0" : ""}
                >
                  {num}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row lg:items-end justify-between lg:gap-8 relative min-h-75">
            {sections.map((section, index) => {
              // Split title into first word and rest for line break
              const titleWords = section.title.split(" ");
              const firstWord = titleWords[0];
              const restOfTitle = titleWords.slice(1).join(" ");

              return (
                <motion.div
                  key={index}
                  style={{ opacity: opacities[index] }}
                  className="absolute inset-0 flex flex-col lg:flex-row lg:items-end justify-end lg:justify-between max-lg:gap-8"
                >
                  <h2 className="text-[clamp(2.5rem,8vw,6rem)] leading-[0.95] font-semibold tracking-tighter text-white">
                    <p>{firstWord}</p>
                    <p className="text-secondary mt-1">{restOfTitle}</p>
                  </h2>
                  <div className="md:w-1/3 flex flex-col lg:items-end justify-end lg:text-right">
                    <motion.ul
                      className="text-sm text-secondary/70 font-medium max-w-[320px] space-y-2 list-none"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false }}
                      variants={{
                        visible: { transition: { staggerChildren: 0.05 } },
                      }}
                    >
                      {section.items.map((item, i) => (
                        <motion.li
                          key={i}
                          variants={{
                            hidden: { opacity: 0, x: 20 },
                            visible: { opacity: 1, x: 0 },
                          }}
                        >
                          {item}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesScrollSection;
