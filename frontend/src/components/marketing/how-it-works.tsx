"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import {
  Code2,
  BrainCircuit,
  Send,
  BarChart3,
  Users,
  Target,
  Mail,
  MessageSquare,
  Phone,
  Globe,
  Zap,
  Shield,
  ChevronRight,
} from "lucide-react";

const categories = [
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
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <div className="text-center mb-12">
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

        {/* Tabs */}
        <ScrollReveal>
          <div className="flex justify-center gap-1 mb-8 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] w-fit mx-auto">
            {categories.map((cat, i) => (
              <button
                key={cat.label}
                onClick={() => setActiveTab(i)}
                className={`relative px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === i
                    ? "text-white bg-[#6366F1]"
                    : "text-[#71717A] hover:text-[#A1A1AA]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {categories[activeTab].items.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/[0.06] bg-[#111113] p-6 hover:border-white/[0.1] transition-colors duration-200"
              >
                <div className="h-10 w-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-4">
                  <item.icon className="h-5 w-5 text-[#6366F1]" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-semibold text-[#FAFAFA] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-6 mt-8">
          {categories.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => setActiveTab(i)}
              className="flex items-center gap-2 group"
            >
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  i <= activeTab ? "bg-[#6366F1] w-8" : "bg-white/[0.1] w-2"
                }`}
              />
              {i < categories.length - 1 && (
                <ChevronRight className="h-3 w-3 text-[#71717A]/30" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
