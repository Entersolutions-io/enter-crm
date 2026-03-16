"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

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
  const { t } = useI18n();
  const headingLines = [
    t("Know Your Customers.", "Upoznajte svoje kupce."),
    t("Grow Your Revenue.", "Povećajte svoje prihode."),
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Ambient glow image */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Image
          src="/images/hero-glow.webp"
          alt=""
          width={1200}
          height={800}
          className="w-full max-w-5xl opacity-40 blur-sm select-none"
          priority
          draggable={false}
        />
      </div>
      <div className="absolute inset-0 dot-grid opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] via-transparent to-[#0A0A0B]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0A0A0B_80%)]" />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
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

        <motion.p
          variants={fadeUp}
          className="max-w-2xl mx-auto text-lg text-[#A1A1AA] font-normal leading-relaxed"
        >
          {t(
            "Real-time tracking, AI-powered analytics, smart segmentation, and multi-channel automation — all in one platform.",
            "Praćenje u stvarnom vremenu, analitika pokretana umjetnom inteligencijom, pametna segmentacija i višekanalna automatizacija — sve u jednoj platformi."
          )}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white rounded-xl bg-[#6366F1] hover:bg-[#5558E6] transition-colors duration-200"
          >
            {t("Get Started", "Započnite")}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/login?demo=true"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-medium text-[#A1A1AA] rounded-xl border border-white/[0.1] hover:bg-white/[0.04] hover:text-white transition-all duration-200"
          >
            {t("Try Demo", "Isprobajte demo")}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
