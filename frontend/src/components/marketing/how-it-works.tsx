"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { SpotlightCard } from "@/components/effects/spotlight-card";
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
} from "lucide-react";

const steps = [
  {
    icon: Code2,
    title: "Embed Tracking Code",
    description: "Drop a single lightweight JavaScript snippet into your website. It tracks page views, clicks, scroll depth, form interactions, and purchases automatically.",
  },
  {
    icon: Globe,
    title: "Connect Your APIs",
    description: "Already have customer data? Connect your existing APIs and databases. We pull transaction history, user profiles, and event data on schedule.",
  },
  {
    icon: Users,
    title: "Build Customer Profiles",
    description: "Every interaction is stitched into a unified 360° profile. Contact info, browsing behavior, purchase history, communication preferences — all in one place.",
  },
  {
    icon: BrainCircuit,
    title: "RFM Scoring & Segmentation",
    description: "Our engine scores every customer on Recency, Frequency, and Monetary value. 125+ dynamic segments are created automatically and updated in real-time.",
  },
  {
    icon: BarChart3,
    title: "Lifetime Value Prediction",
    description: "Predict how much each customer will spend over their entire relationship. Identify high-value prospects early and allocate resources accordingly.",
  },
  {
    icon: Target,
    title: "Behavioral Triggers",
    description: "Set up rules that fire when customers take specific actions — visit a pricing page, abandon a cart, go inactive for 7 days, or hit a spending threshold.",
  },
  {
    icon: Mail,
    title: "Email Campaigns",
    description: "Trigger personalized email sequences based on customer segments and behavior. A/B test subject lines, content, and send times for maximum engagement.",
  },
  {
    icon: MessageSquare,
    title: "SMS Notifications",
    description: "Reach customers directly with targeted SMS messages. Time-sensitive offers, appointment reminders, re-engagement prompts — delivered instantly.",
  },
  {
    icon: Phone,
    title: "Smart Call Lists",
    description: "Automatically generate prioritized call lists for your sales team. High-value customers and hot leads surface to the top based on their engagement score.",
  },
  {
    icon: Zap,
    title: "Workflow Automation",
    description: "Build multi-step workflows with branching logic. If a customer opens an email but doesn't click, send an SMS. If they still don't respond, add to call list.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Live dashboards showing revenue attribution, campaign performance, funnel conversion rates, cohort analysis, and customer health metrics.",
  },
  {
    icon: Shield,
    title: "GDPR & Privacy Compliant",
    description: "Built-in consent management, data anonymization, and right-to-erasure support. Your customer data is encrypted at rest and in transit.",
  },
];

function StepCard({ step, index }: { step: typeof steps[number]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.5,
        delay: (index % 3) * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      <SpotlightCard className="h-full">
        <div className="flex items-start gap-4">
          <div className="shrink-0 h-10 w-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
            <step.icon className="h-5 w-5 text-[#6366F1]" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#FAFAFA] mb-1.5">
              {step.title}
            </h3>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm text-[#6366F1] font-semibold tracking-wide uppercase mb-3">
              How It Works
            </p>
            <h2
              className="text-3xl md:text-5xl font-semibold text-[#FAFAFA] tracking-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              From data to action
            </h2>
            <p className="mt-4 text-[#A1A1AA] max-w-xl mx-auto">
              A complete pipeline that turns raw customer interactions into
              revenue-driving automated actions.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <StepCard key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
