"use client";

import { useScroll, useTransform, motion } from "motion/react";
import { useRef } from "react";

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

export default Paragraph;
