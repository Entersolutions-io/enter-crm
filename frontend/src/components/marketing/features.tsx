"use client";

import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { SpotlightCard } from "@/components/effects/spotlight-card";
import {
  Activity,
  Users,
  BarChart3,
  Zap,
  LineChart,
  Mail,
} from "lucide-react";

const features = [
  {
    title: "Tracking Engine",
    description:
      "One line of code to track every visitor interaction. Page views, clicks, purchases — all in real-time.",
    icon: Activity,
    wide: true,
  },
  {
    title: "Customer 360",
    description:
      "Unified customer profiles with complete interaction history, preferences, and engagement scores.",
    icon: Users,
    wide: false,
  },
  {
    title: "Smart Segments",
    description:
      "AI-powered RFM analysis creates 125+ dynamic customer segments automatically.",
    icon: BarChart3,
    wide: false,
  },
  {
    title: "Automation Engine",
    description:
      "Build trigger-based workflows that react to customer behavior. If this, then that — at scale.",
    icon: Zap,
    wide: false,
  },
  {
    title: "Real-time Analytics",
    description:
      "Live dashboards with revenue tracking, funnel analysis, and cohort breakdowns.",
    icon: LineChart,
    wide: false,
  },
  {
    title: "Multi-Channel Outreach",
    description:
      "Email, SMS, and call lists — reach your customers on the right channel at the right time.",
    icon: Mail,
    wide: true,
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm text-[#6366F1] font-semibold tracking-wide uppercase mb-3">
              Features
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#FAFAFA] tracking-tight" style={{ letterSpacing: "-0.02em" }}>
              Everything you need to understand your customers
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
