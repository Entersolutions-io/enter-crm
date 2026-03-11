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
    size: "wide" as const,
  },
  {
    title: "Customer 360°",
    description:
      "Unified customer profiles with complete interaction history, preferences, and engagement scores.",
    icon: Users,
    size: "normal" as const,
  },
  {
    title: "Smart Segments",
    description:
      "AI-powered RFM analysis creates 125+ dynamic customer segments automatically.",
    icon: BarChart3,
    size: "normal" as const,
  },
  {
    title: "Automation Engine",
    description:
      "Build trigger-based workflows that react to customer behavior. If this, then that — at scale.",
    icon: Zap,
    size: "wide" as const,
  },
  {
    title: "Real-time Analytics",
    description:
      "Live dashboards with revenue tracking, funnel analysis, and cohort breakdowns.",
    icon: LineChart,
    size: "normal" as const,
  },
  {
    title: "Multi-Channel Outreach",
    description:
      "Email, SMS, and call lists — reach your customers on the right channel at the right time.",
    icon: Mail,
    size: "normal" as const,
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm text-indigo-400 font-semibold tracking-wide uppercase mb-3">
              Features
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                understand
              </span>{" "}
              your customers
            </h2>
          </div>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <ScrollReveal
              key={feature.title}
              delay={i * 0.1}
              className={
                feature.size === "wide" ? "md:col-span-2" : "md:col-span-1"
              }
            >
              <SpotlightCard className="h-full">
                <feature.icon className="h-10 w-10 text-indigo-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
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
