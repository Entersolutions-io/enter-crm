"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const headingLines = [
  "Know Your Customers.",
  "Grow Your Revenue.",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] via-transparent to-[#0A0A0B]" />
      {/* Subtle radial fade at edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0A0A0B_80%)]" />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Heading */}
        <div className="mb-6">
          {headingLines.map((line, i) => (
            <motion.h1
              key={i}
              variants={lineVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#FAFAFA] tracking-tight leading-[1.1]"
              style={{ letterSpacing: "-0.02em" }}
            >
              {line}
            </motion.h1>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="max-w-2xl mx-auto text-lg text-[#A1A1AA] font-normal leading-relaxed"
        >
          Real-time tracking, AI-powered analytics, smart segmentation, and
          multi-channel automation — all in one platform.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-white rounded-xl bg-[#6366F1] hover:bg-[#5558E6] transition-colors duration-200"
          >
            Start Free Trial
          </Link>
          <Link
            href="/demo"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-medium text-[#A1A1AA] rounded-xl border border-white/[0.1] hover:bg-white/[0.04] hover:text-white transition-all duration-200"
          >
            <Play className="h-4 w-4" />
            Watch Demo
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
