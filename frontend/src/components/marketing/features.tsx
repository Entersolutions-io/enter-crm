"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { SpotlightCard } from "@/components/effects/spotlight-card";
import { useI18n } from "@/lib/i18n";
import {
  Activity,
  Users,
  BarChart3,
  Zap,
  LineChart,
  Mail,
} from "lucide-react";

export function Features() {
  const { t } = useI18n();

  const features = [
    {
      title: t("Tracking Engine", "Sustav praćenja"),
      description: t(
        "One line of code to track every visitor interaction. Page views, clicks, purchases — all in real-time.",
        "Jedna linija koda za praćenje svake interakcije posjetitelja. Pregledi stranica, klikovi, kupnje — sve u stvarnom vremenu."
      ),
      icon: Activity,
      wide: true,
    },
    {
      title: t("Customer 360", "Kupac 360"),
      description: t(
        "Unified customer profiles with complete interaction history, preferences, and engagement scores.",
        "Objedinjeni profili kupaca s kompletnom poviješću interakcija, preferencijama i ocjenama angažmana."
      ),
      icon: Users,
      wide: false,
    },
    {
      title: t("Smart Segments", "Pametni segmenti"),
      description: t(
        "AI-powered RFM analysis creates 125+ dynamic customer segments automatically.",
        "RFM analiza pokretana umjetnom inteligencijom automatski stvara 125+ dinamičkih segmenata kupaca."
      ),
      icon: BarChart3,
      wide: false,
    },
    {
      title: t("Automation Engine", "Motor automatizacije"),
      description: t(
        "Build trigger-based workflows that react to customer behavior. If this, then that — at scale.",
        "Izgradite tijekove rada temeljene na okidačima koji reagiraju na ponašanje kupaca. Ako ovo, onda ono — u velikom opsegu."
      ),
      icon: Zap,
      wide: false,
    },
    {
      title: t("Real-time Analytics", "Analitika u stvarnom vremenu"),
      description: t(
        "Live dashboards with revenue tracking, funnel analysis, and cohort breakdowns.",
        "Nadzorne ploče uživo s praćenjem prihoda, analizom lijevka i raščlambom kohorti."
      ),
      icon: LineChart,
      wide: false,
    },
    {
      title: t("Multi-Channel Outreach", "Višekanalni doseg"),
      description: t(
        "Email, SMS, and call lists — reach your customers on the right channel at the right time.",
        "Email, SMS i liste poziva — dosegnite kupce na pravom kanalu u pravo vrijeme."
      ),
      icon: Mail,
      wide: true,
    },
  ];

  return (
    <section id="features" className="relative py-32 px-6">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 pointer-events-none">
        <Image
          src="/images/features-gradient.webp"
          alt=""
          width={900}
          height={600}
          className="w-[800px] opacity-30 blur-md select-none"
          draggable={false}
        />
      </div>
      <div className="mx-auto max-w-6xl relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm text-[#6366F1] font-semibold tracking-wide uppercase mb-3">
              {t("Features", "Značajke")}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#FAFAFA] tracking-tight" style={{ letterSpacing: "-0.02em" }}>
              {t("Everything you need to understand your customers", "Sve što trebate za razumijevanje svojih kupaca")}
            </h2>
          </div>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <ScrollReveal
              key={feature.title}
              delay={i * 0.1}
              className={feature.wide ? "lg:col-span-2" : "lg:col-span-1"}
            >
              <SpotlightCard className="h-full">
                <feature.icon className="h-10 w-10 text-[#6366F1] mb-4" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold text-[#FAFAFA] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  {feature.description}
                </p>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
