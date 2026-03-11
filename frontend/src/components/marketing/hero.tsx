"use client";

import Link from "next/link";
import { LampEffect } from "@/components/effects/lamp";
import { TextGenerateEffect } from "@/components/effects/text-generate";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <LampEffect>
      <TextGenerateEffect
        words="Know Your Customers. Grow Your Revenue."
        className="text-center text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight"
      />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mt-6 max-w-2xl text-center text-lg text-white/50 font-light"
      >
        Real-time tracking, AI-powered analytics, smart segmentation, and
        multi-channel automation — all in one platform.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="mt-10 flex flex-col sm:flex-row items-center gap-4"
      >
        <Link
          href="/register"
          className="relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
        >
          Start Free Trial
        </Link>
        <Link
          href="/demo"
          className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-white/70 rounded-xl border border-white/[0.12] hover:bg-white/[0.04] hover:text-white transition-all duration-200"
        >
          Watch Demo
          <svg
            className="ml-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </Link>
      </motion.div>
    </LampEffect>
  );
}
