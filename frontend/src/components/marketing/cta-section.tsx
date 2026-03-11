"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/effects/scroll-reveal";

export function CTASection() {
  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      {/* Faint background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-[#6366F1]/[0.05] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <ScrollReveal>
          <h2
            className="text-3xl md:text-5xl font-bold text-[#FAFAFA] tracking-tight mb-6"
            style={{ letterSpacing: "-0.02em" }}
          >
            Ready to know your customers?
          </h2>
          <p className="text-lg text-[#A1A1AA] mb-10 max-w-xl mx-auto">
            Start tracking, analyzing, and engaging your customers today. No
            credit card required.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-white rounded-xl bg-[#6366F1] hover:bg-[#5558E6] transition-colors duration-200"
            >
              Start Free Trial
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center px-10 py-4 text-base font-medium text-[#A1A1AA] rounded-xl border border-white/[0.1] hover:bg-white/[0.04] hover:text-white transition-all duration-200"
            >
              Explore Demo
            </Link>
          </div>
          <p className="mt-4 text-sm text-[#71717A]">
            Free 14-day trial &middot; No credit card required
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
