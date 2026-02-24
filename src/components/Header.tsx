"use client";

import { cn } from "@/lib/utils";
import { IconMenu, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface Props {
  className?: string;
}

const navItems = [
  { name: "About Me", href: "#about" },
  { name: "My Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Contact", href: "#contact" },
];

const Header = ({ className }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Prevent scrolling when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0] as const,
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };

  const mobileLinkVars = {
    initial: {
      y: "30vh",
      transition: {
        duration: 0.5,
        ease: [0.37, 0, 0.63, 1] as const,
      },
    },
    open: {
      y: 0,
      transition: {
        ease: [0, 0.55, 0.45, 1] as const,
        duration: 0.7,
      },
    },
  };

  return (
    <>
      <div
        className={cn(
          "px-10 py-6 w-full flex items-center justify-between z-50 relative",
          className,
        )}
      >
        <Link href="/">
          <Image src="/images/logo.png" alt="Logo" width={120} height={50} />
        </Link>

        <button
          onClick={toggleMenu}
          className="text-white/60 hover:text-white transition-colors z-50 relative group"
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            <span
              className={cn(
                "absolute transition-all duration-300 transform",
                isOpen
                  ? "rotate-90 opacity-0 scale-50"
                  : "rotate-0 opacity-100 scale-100",
              )}
            >
              <IconMenu size={32} stroke={1.5} />
            </span>
            <span
              className={cn(
                "absolute transition-all duration-300 transform",
                isOpen
                  ? "rotate-0 opacity-100 scale-100"
                  : "-rotate-90 opacity-0 scale-50",
              )}
            >
              <IconX size={32} stroke={1.5} />
            </span>
          </div>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu-overlay"
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-0 w-full h-screen origin-top bg-secondary text-white z-30 p-10 flex flex-col justify-center items-center overflow-hidden"
          >
            {/* Background decorative elements */}
            <div className="absolute top-[-10%] right-[-5%] w-125 h-125 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-100 h-100 bg-white/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex flex-col h-full w-full max-w-7xl mx-auto relative z-10">
              {/* Header placeholder to align close button */}
              <div className="flex justify-between items-center py-6">
                <div className="w-30">
                  {/* Invisible placeholder for alignment if needed, or actual logo */}
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={120}
                    height={50}
                    className="invisible"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center items-center grow">
                <motion.div
                  variants={containerVars}
                  initial="initial"
                  animate="open"
                  exit="initial"
                  className="flex flex-col items-center gap-6"
                >
                  {navItems.map((link, index) => (
                    <div className="overflow-hidden" key={index}>
                      <motion.div
                        variants={mobileLinkVars}
                        className="text-5xl md:text-7xl font-semibold tracking-tighter text-white/80 hover:text-primary transition-colors cursor-pointer"
                      >
                        <a href={link.href} onClick={toggleMenu}>
                          {link.name}
                        </a>
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              </div>

              <div className="flex justify-between items-end pb-10 text-white/40 text-sm font-light uppercase tracking-widest">
                <span>© {new Date().getFullYear()} Mariam Kaleem</span>
                <div className="flex gap-4">
                  <a href="#" className="hover:text-white transition-colors">
                    Instagram
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    LinkedIn
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    Email
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
