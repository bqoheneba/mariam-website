"use client";

import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

const Footer = () => {
  const containerRef = React.useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);

  return (
    <footer
      ref={containerRef}
      className="bg-secondary text-white pt-0 pb-10 relative overflow-hidden"
    >
      {/* Top Banner Image with Fixed/Parallax Effect */}
      <div className="relative w-full h-44 lg:h-75 overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute inset-0 h-[140%] -top-[20%]"
        >
          <Image
            src="/images/footer.jpg"
            alt="Mariam Kaleem Footer"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </div>

      <div className="px-6 md:px-12 lg:px-20 pt-10 md:pt-20">
        <div className="flex flex-col md:flex-row gap-10 md:gap-12 lg:gap-24 mb-5">
          {/* Column 1: Contact */}
          <div className="flex flex-col mr-auto max-w-md">
            <p className="text-2xl md:text-3xl tracking-tight mb-5 font-medium">
              Ready to transform
              <br className="hidden md:block" /> your brand?
            </p>
            <p className="text-sm font-light opacity-60 leading-relaxed text-white/70">
              Let’s discuss how my 18+ years of marketing expertise{" "}
              <br className="hidden md:block" /> can drive measurable results
              for your business
            </p>
          </div>

          {/* Navigation Links Container */}
          <div className="flex gap-10 md:gap-20">
            {/* Column 2: Site Links */}
            <div className="space-y-4">
              {/* <h4 className="text-sm font-medium opacity-100 uppercase tracking-wider text-primary">Navigate</h4> */}
              <ul className="text-sm font-light opacity-60 space-y-3">
                {[
                  { name: "About Me", href: "#about" },
                  { name: "My Services", href: "#services" },
                  { name: "Portfolio", href: "#portfolio" },
                  { name: "Contact", href: "#contact" },
                ].map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="hover:text-primary transition-colors inline-block"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Socials */}
            <div className="space-y-4">
              {/* <h4 className="text-sm font-medium opacity-100 uppercase tracking-wider text-primary">Social</h4> */}
              <ul className="text-sm font-light opacity-60 space-y-3">
                <li>
                  <a
                    href="https://www.instagram.com/mariamdigitalbee?igsh=ZTFnY2J4cG9xeWNz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors inline-block"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://web.facebook.com/mariam.a.kaleem?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors inline-block"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@mariam.digitalbee"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors inline-block"
                  >
                    YouTube
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:abakaleem@gmail.com"
                    className="hover:text-primary transition-colors inline-block"
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
