"use client";

import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { SpotlightCard } from "@/components/effects/spotlight-card";
import { Code2, BrainCircuit, Send } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Embed",
    subtitle: "Add one line of code",
    description:
      "Drop our lightweight tracking snippet into your website or connect via API. Start collecting behavioral data in minutes.",
    icon: Code2,
  },
  {
    step: "02",
    title: "Analyze",
    subtitle: "AI-powered insights",
    description:
      "Our engine processes every interaction in real-time. RFM scoring, lifetime value predictions, and behavioral patterns — automatically.",
    icon: BrainCircuit,
  },
  {
    step: "03",
    title: "Act",
    subtitle: "Automate outreach",
    description:
      "Trigger personalized emails, SMS, or add customers to call lists based on their behavior and segment scores.",
    icon: Send,
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-32 px-6 bg-gradient-to-b from-transparent via-indigo-500/[0.02] to-transparent"
    >
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm text-indigo-400 font-semibold tracking-wide uppercase mb-3">
              How It Works
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Three steps to{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                customer intelligence
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <ScrollReveal key={step.step} delay={i * 0.15}>
              <SpotlightCard className="h-full text-center">
                {/* Step number */}
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
                  <span className="text-sm font-bold text-indigo-400">
                    {step.step}
                  </span>
                </div>

                {/* Icon */}
                <step.icon className="h-12 w-12 text-indigo-400/60 mx-auto mb-4" />

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-indigo-400 mb-3">{step.subtitle}</p>
                <p className="text-sm text-white/50 leading-relaxed">
                  {step.description}
                </p>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
