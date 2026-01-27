"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { IconCheck } from "@tabler/icons-react";

export default function ServicesScrollSection() {
  const servicesRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: servicesProgress } = useScroll({
    target: servicesRef,
    offset: ["start start", "end end"],
  });

  const servicesSlides = [
    {
      image: "/images/service2.png",
      bullets: [
        "Concept Development",
        "Experiential Marketing",
        "Digital Marketing",
        "Content Strategy",
      ],
    },
    {
      image: "/images/service3.png",
      bullets: [
        "Project Management",
        "Event Management",
        "Sponsorship Managements",
        "Campaign Execution",
      ],
    },
    {
      image: "/images/service1.png",
      bullets: [
        "Brand Management & Strategy",
        "Marketing Strategy Development",
        "Go-To-Market Strategy",
        "Brand Engagement Strategy",
      ],
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    return servicesProgress.on("change", (v: number) => {
      const idx = Math.min(
        servicesSlides.length - 1,
        Math.floor(v * servicesSlides.length),
      );
      setIndex(idx);
    });
  }, [servicesProgress]);

  // much larger radius and a quarter-arc
  const r = 300;
  const circumference = 2 * Math.PI * r;
  const quarter = circumference / 4; // quarter circumference
  // animate stroke offset from quarter -> 0 so the quarter arc grows anti-clockwise
  const stroke = useTransform(servicesProgress, [0, 1], [quarter, 0]);

  // compute a start angle near bottom-left and end angle 90deg later (quarter arc)
  const startAngle = (225 * Math.PI) / 180; // 225deg (bottom-left)
  const endAngle = startAngle + Math.PI / 2; // +90deg
  const cx = r;
  const cy = r;
  const startX = cx + r * Math.cos(startAngle);
  const startY = cy + r * Math.sin(startAngle);
  const endX = cx + r * Math.cos(endAngle);
  const endY = cy + r * Math.sin(endAngle);

  return (
    <div ref={servicesRef} className="h-[300vh] relative bg-primary">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="h-full w-full flex items-center justify-center relative">
          {/* Left: stacked images that accumulate */}
          <div className="absolute left-24 top-1/2 -translate-y-1/2 w-1/2 h-50 pointer-events-none">
            {servicesSlides.map((s, i) => {
              const visible = i <= index;
              const offsetX = i * 26;
              const offsetY = -i * 8;
              const rot = -8 + i * 6;
              return (
                <motion.div
                  key={i}
                  animate={{
                    opacity: visible ? 1 : 0,
                    x: visible ? offsetX : -120,
                    y: visible ? offsetY : 0,
                    rotate: visible ? `${rot}deg` : `${8 - i * 3}deg`,
                    scale: visible ? 1 - i * 0.02 : 0.92,
                  }}
                  transition={{ duration: 0.6 }}
                  className="absolute w-96 h-80 overflow-hidden shadow-xl"
                  style={{ zIndex: 100 + i }}
                >
                  <Image
                    src={s.image}
                    alt={`slide-${i}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Right: Services content with a larger circular outline */}
          <div className="absolute right-10 w-[40%] flex items-center justify-center">
            <div className="relative w-full max-w-md">
              <svg
                viewBox={`0 0 ${r * 2} ${r * 2}`}
                preserveAspectRatio="xMidYMid meet"
                className="absolute -left-65 top-45 pointer-events-none rotate-20"
                style={{
                  width: `${r * 1.8}px`,
                  height: `${r * 1.8}px`,
                  overflow: "visible",
                }}
              >
                <motion.path
                  // draw quarter arc from start -> end (sweepFlag=0 to reverse sweep direction)
                  d={`M ${startX} ${startY} A ${r} ${r} 0 0 0 ${endX} ${endY}`}
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray={quarter}
                  strokeLinecap="round"
                  style={{ strokeDashoffset: stroke }}
                  className="stroke-white/70"
                />
              </svg>

              <div className="relative z-10 p-8 bg-transparent">
                <h2 className="text-4xl font-medium text-black tracking-tighter">
                  Services
                </h2>
                <div className="mt-6 space-y-3 text-black">
                  {servicesSlides[index].bullets.map((b, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                      className="flex items-center space-x-2 leading-relaxed"
                    >
                      <span>{b}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
