"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import {
  Code2,
  BrainCircuit,
  BarChart3,
  Users,
  Target,
  Mail,
  MessageSquare,
  Phone,
  Globe,
  Zap,
  Shield,
} from "lucide-react";

const steps = [
  {
    label: "Collect",
    items: [
      { icon: Code2, title: "Tracking Code", desc: "Lightweight JS snippet tracks page views, clicks, scroll depth, form fills, and purchases." },
      { icon: Globe, title: "API Connect", desc: "Pull data from your existing APIs and databases on schedule. Transactions, profiles, events." },
      { icon: Users, title: "Customer Profiles", desc: "Unified 360° profiles from all touchpoints — contact info, behavior, purchases, preferences." },
    ],
  },
  {
    label: "Analyze",
    items: [
      { icon: BrainCircuit, title: "RFM Scoring", desc: "Score every customer on Recency, Frequency, Monetary. 125+ dynamic segments auto-created." },
      { icon: BarChart3, title: "Lifetime Value", desc: "Predict total customer spend over their entire relationship. Spot high-value prospects early." },
      { icon: Target, title: "Behavioral Triggers", desc: "Rules that fire on actions — pricing page visit, cart abandon, inactivity, spending threshold." },
    ],
  },
  {
    label: "Act",
    items: [
      { icon: Mail, title: "Email Campaigns", desc: "Personalized sequences by segment. A/B test subject lines, content, and send times." },
      { icon: MessageSquare, title: "SMS Outreach", desc: "Targeted SMS for time-sensitive offers, reminders, and re-engagement prompts." },
      { icon: Phone, title: "Call Lists", desc: "Auto-prioritized lists for sales. High-value customers and hot leads surface to the top." },
    ],
  },
  {
    label: "Optimize",
    items: [
      { icon: Zap, title: "Workflow Automation", desc: "Multi-step workflows with branching. Email → no click → SMS → no response → call list." },
      { icon: BarChart3, title: "Real-time Analytics", desc: "Revenue attribution, campaign performance, funnel rates, cohort analysis, customer health." },
      { icon: Shield, title: "GDPR Compliant", desc: "Consent management, data anonymization, right-to-erasure. Encrypted at rest and in transit." },
    ],
  },
];

export function HowItWorks() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="how-it-works" className="relative py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm text-[#6366F1] font-semibold tracking-wide uppercase mb-3">
              How It Works
            </p>
            <h2
              className="text-3xl md:text-4xl font-semibold text-[#FAFAFA] tracking-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              From data to action
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Left: Vertical tab labels */}
            <div className="relative shrink-0">
              {/* Mobile: horizontal pills */}
              <div className="flex lg:hidden gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] w-fit mx-auto mb-6">
                {steps.map((step, i) => (
                  <button
                    key={step.label}
                    onClick={() => setActiveTab(i)}
                    className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      activeTab === i
                        ? "text-white bg-[#6366F1]"
                        : "text-[#71717A] hover:text-[#A1A1AA]"
                    }`}
                  >
                    {step.label}
                  </button>
                ))}
              </div>

              {/* Desktop: vertical labels */}
              <div className="hidden lg:flex flex-col gap-2">
                {steps.map((step, i) => (
                  <button
                    key={step.label}
                    onClick={() => setActiveTab(i)}
                    className={`relative text-left px-5 py-4 rounded-xl transition-all duration-300 cursor-pointer ${
                      activeTab === i
                        ? "bg-[#6366F1]/[0.08]"
                        : "bg-transparent hover:bg-white/[0.03]"
                    }`}
                    style={{ minWidth: 180 }}
                  >
                    {/* Left accent bar */}
                    <div
                      className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full transition-all duration-300 ${
                        activeTab === i
                          ? "h-8 bg-[#6366F1] shadow-[0_0_12px_rgba(99,102,241,0.5)]"
                          : "h-0 bg-transparent"
                      }`}
                    />
                    <span
                      className={`text-lg font-semibold transition-colors duration-300 ${
                        activeTab === i ? "text-[#FAFAFA]" : "text-[#52525B]"
                      }`}
                    >
                      {step.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Content panel */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  className="space-y-4"
                >
                  {steps[activeTab].items.map((item, idx) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: idx * 0.1,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      className="flex gap-5 p-5 rounded-2xl bg-[#111113] border border-white/[0.06] hover:border-white/[0.1] transition-colors duration-200"
                    >
                      <div className="h-11 w-11 rounded-xl bg-[#6366F1]/[0.08] border border-[#6366F1]/[0.12] flex items-center justify-center shrink-0">
                        <item.icon className="h-5 w-5 text-[#6366F1]" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[15px] font-semibold text-[#FAFAFA] mb-1.5">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[#A1A1AA] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
