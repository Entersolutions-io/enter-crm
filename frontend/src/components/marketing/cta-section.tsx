"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/effects/scroll-reveal";

export function CTASection() {
  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-indigo-500/[0.07] blur-[120px]" />
        <div className="absolute top-1/3 left-1/3 h-[300px] w-[300px] rounded-full bg-purple-500/[0.05] blur-[100px]" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Ready to{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              know your customers
            </span>
            ?
          </h2>
          <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto">
            Start tracking, analyzing, and engaging your customers today. No
            credit card required.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="relative inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
            >
              Start Free Trial
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center px-10 py-4 text-base font-medium text-white/70 rounded-xl border border-white/[0.12] hover:bg-white/[0.04] hover:text-white transition-all duration-200"
            >
              Explore Demo
            </Link>
          </div>
          <p className="mt-4 text-sm text-white/30">
            Free 14-day trial &middot; No credit card required
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
