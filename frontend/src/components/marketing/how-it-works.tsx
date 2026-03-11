"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, BrainCircuit, Send } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Embed",
    description:
      "Drop our lightweight tracking snippet into your website or connect via API. Start collecting behavioral data in minutes.",
    icon: Code2,
  },
  {
    step: "02",
    title: "Analyze",
    description:
      "Our engine processes every interaction in real-time. RFM scoring, lifetime value predictions, and behavioral patterns — automatically.",
    icon: BrainCircuit,
  },
  {
    step: "03",
    title: "Act",
    description:
      "Trigger personalized emails, SMS, or add customers to call lists based on their behavior and segment scores.",
    icon: Send,
  },
];

function StepCard({ step, index }: { step: typeof steps[number]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -60, rotate: -3 }}
      animate={
        isInView
          ? { opacity: 1, x: 0, rotate: 0 }
          : { opacity: 0, x: -60, rotate: -3 }
      }
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className="relative rounded-2xl border border-white/[0.06] bg-[#111113] p-8"
    >
      <div className="flex items-start gap-5">
        {/* Step number circle */}
        <div className="shrink-0 flex items-center justify-center h-12 w-12 rounded-full border border-[#6366F1]/30">
          <span className="text-sm font-bold text-[#6366F1]">{step.step}</span>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <step.icon className="h-5 w-5 text-[#6366F1]" strokeWidth={1.5} />
            <h3 className="text-xl font-semibold text-[#FAFAFA]">{step.title}</h3>
          </div>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="how-it-works" className="relative py-32 px-6">
      <div className="mx-auto max-w-3xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-16"
        >
          <p className="text-sm text-[#6366F1] font-semibold tracking-wide uppercase mb-3">
            How It Works
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold text-[#FAFAFA] tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            Three steps to customer intelligence
          </h2>
        </motion.div>

        <div className="flex flex-col gap-6">
          {steps.map((step, i) => (
            <StepCard key={step.step} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
