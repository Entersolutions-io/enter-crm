"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "/mo",
    description: "For small businesses getting started with CRM",
    features: [
      { name: "Up to 5,000 tracked visitors/mo", included: true },
      { name: "Basic customer profiles", included: true },
      { name: "RFM segmentation", included: true },
      { name: "Email automation", included: true },
      { name: "SMS automation", included: false },
      { name: "Custom API integrations", included: false },
      { name: "Priority support", included: false },
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Pro",
    price: "$149",
    period: "/mo",
    description: "For growing companies that need full power",
    features: [
      { name: "Up to 50,000 tracked visitors/mo", included: true },
      { name: "360° customer profiles", included: true },
      { name: "Advanced segmentation + CLV", included: true },
      { name: "Email automation", included: true },
      { name: "SMS automation", included: true },
      { name: "Custom API integrations", included: true },
      { name: "Priority support", included: false },
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large-scale operations with custom needs",
    features: [
      { name: "Unlimited tracked visitors", included: true },
      { name: "360° customer profiles", included: true },
      { name: "Advanced segmentation + CLV", included: true },
      { name: "Email automation", included: true },
      { name: "SMS automation", included: true },
      { name: "Custom API integrations", included: true },
      { name: "Dedicated account manager", included: true },
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm text-indigo-400 font-semibold tracking-wide uppercase mb-3">
              Pricing
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Simple, transparent{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                pricing
              </span>
            </h2>
            <p className="mt-4 text-white/50 max-w-lg mx-auto">
              Start free, scale as you grow. No hidden fees.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 0.1}>
              <div
                className={cn(
                  "relative rounded-2xl border p-8 h-full flex flex-col",
                  plan.popular
                    ? "border-indigo-500/50 bg-[#111113] scale-[1.02] shadow-lg shadow-indigo-500/10"
                    : "border-white/[0.08] bg-[#111113]"
                )}
              >
                {/* Glow effect for popular */}
                {plan.popular && (
                  <>
                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-indigo-500/20 to-purple-500/20 -z-10 blur-sm" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <span className="px-4 py-1 text-xs font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  </>
                )}

                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-white/40">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-white/40">{plan.period}</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <li
                      key={feature.name}
                      className="flex items-center gap-3 text-sm"
                    >
                      {feature.included ? (
                        <Check className="h-4 w-4 text-indigo-400 shrink-0" />
                      ) : (
                        <X className="h-4 w-4 text-white/20 shrink-0" />
                      )}
                      <span
                        className={
                          feature.included ? "text-white/70" : "text-white/30"
                        }
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={plan.name === "Enterprise" ? "#contact" : "/register"}
                  className={cn(
                    "inline-flex items-center justify-center w-full py-3 text-sm font-semibold rounded-xl transition-all duration-200",
                    plan.popular
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-400 hover:to-purple-500 shadow-lg shadow-indigo-500/25"
                      : "border border-white/[0.12] text-white/70 hover:bg-white/[0.04] hover:text-white"
                  )}
                >
                  {plan.cta}
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
