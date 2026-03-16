"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { useI18n } from "@/lib/i18n";

export function CTASection() {
  const { t } = useI18n();
  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      {/* Background glow image */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <Image
          src="/images/hero-glow.webp"
          alt=""
          width={900}
          height={600}
          className="w-[700px] opacity-25 blur-md select-none"
          draggable={false}
        />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <ScrollReveal>
          <h2
            className="text-3xl md:text-5xl font-bold text-[#FAFAFA] tracking-tight mb-6"
            style={{ letterSpacing: "-0.02em" }}
          >
            {t("Ready to know your customers?", "Spremni upoznati svoje kupce?")}
          </h2>
          <p className="text-lg text-[#A1A1AA] mb-10 max-w-xl mx-auto">
            {t(
              "Start tracking, analyzing, and engaging your customers today. No credit card required.",
              "Počnite pratiti, analizirati i angažirati svoje kupce danas. Kreditna kartica nije potrebna."
            )}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-white rounded-xl bg-[#6366F1] hover:bg-[#5558E6] transition-colors duration-200"
            >
              {t("Start Free Trial", "Započnite besplatno")}
            </Link>
            <Link
              href="/login?demo=true"
              className="inline-flex items-center justify-center px-10 py-4 text-base font-medium text-[#A1A1AA] rounded-xl border border-white/[0.1] hover:bg-white/[0.04] hover:text-white transition-all duration-200"
            >
              {t("Explore Demo", "Istražite demo")}
            </Link>
          </div>
          <p className="mt-4 text-sm text-[#71717A]">
            {t("Free 14-day trial", "Besplatno probno razdoblje od 14 dana")} &middot; {t("No credit card required", "Kreditna kartica nije potrebna")}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
