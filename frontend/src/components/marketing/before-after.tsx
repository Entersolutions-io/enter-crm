"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion";
import { useState } from "react";
import {
  Mail,
  MessageSquare,
  Phone,
  TrendingUp,
  ShoppingCart,
  Target,
  Star,
} from "lucide-react";

function useRoundedMotionValue(mv: MotionValue<number>) {
  const [val, setVal] = useState(0);
  useMotionValueEvent(mv, "change", (v) => setVal(Math.round(v)));
  return val;
}

export function BeforeAfter() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to t (0 → 1)
  const t = useTransform(scrollYProgress, [0.05, 0.85], [0, 1], { clamp: true });

  // Animated values
  const totalSpendMV = useTransform(t, [0, 1], [240, 2840]);
  const engagementMV = useTransform(t, [0, 1], [25, 87]);
  const emailRateMV = useTransform(t, [0.3, 0.9], [0, 72], { clamp: true });
  const smsRateMV = useTransform(t, [0.3, 0.9], [0, 85], { clamp: true });
  const growthMV = useTransform(t, [0.3, 1], [0, 1083], { clamp: true });

  const totalSpend = useRoundedMotionValue(totalSpendMV);
  const engagement = useRoundedMotionValue(engagementMV);
  const emailRate = useRoundedMotionValue(emailRateMV);
  const smsRate = useRoundedMotionValue(smsRateMV);
  const growth = useRoundedMotionValue(growthMV);

  // Derived from t as state
  const [tVal, setTVal] = useState(0);
  useMotionValueEvent(t, "change", (v) => setTVal(v));

  const lastVisit = tVal < 0.4 ? "14d ago" : tVal < 0.7 ? "3d ago" : "2h ago";
  const segment = tVal < 0.25 ? null : tVal < 0.5 ? "Returning" : tVal < 0.8 ? "Loyal" : "VIP";
  const callPriority = tVal < 0.5 ? null : tVal < 0.8 ? "Medium" : "High";
  const spendLabel = tVal > 0.5 ? "Lifetime Value" : "Total Spend";

  // Visual interpolations
  const avatarBg = `rgba(99,102,241,${tVal * 0.15})`;
  const avatarBorder = `rgba(99,102,241,${0.1 + tVal * 0.25})`;
  const engagementColor = tVal < 0.3 ? "#71717A" : tVal < 0.6 ? "#A1A1AA" : "#6366F1";
  const targetColor = tVal > 0.4 ? "#6366F1" : "#71717A";

  // Opacity helpers
  const segmentOpacity = Math.min(1, Math.max(0, (tVal - 0.2) * 3));
  const growthOpacity = Math.min(1, Math.max(0, (tVal - 0.3) * 4));
  const activeOpacity = Math.min(1, Math.max(0, (tVal - 0.65) * 4));
  const actionsOpacity = Math.min(1, Math.max(0, (tVal - 0.3) * 3));
  const actionsHeight = tVal > 0.3 ? 220 : 0;

  // Card scale for polish
  const cardScale = useTransform(scrollYProgress, [0, 0.08, 0.85, 1], [0.95, 1, 1, 0.95]);

  // Progress label
  const progressLabel =
    tVal < 0.15
      ? "Without CRM"
      : tVal < 0.5
        ? "Getting started..."
        : tVal < 0.8
          ? "Growing with CRM"
          : "Full power";

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "350vh" }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6">
        {/* Section header */}
        <div className="text-center mb-8">
          <p className="text-sm text-[#6366F1] font-semibold tracking-wide uppercase mb-3">
            See The Difference
          </p>
          <h2
            className="text-3xl md:text-4xl font-semibold text-[#FAFAFA] tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            One customer, transformed
          </h2>
        </div>

        {/* Scroll progress indicator */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[11px] text-[#71717A] font-medium">{progressLabel}</span>
          <div className="w-32 h-1 rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-[#6366F1]"
              style={{ width: useTransform(t, [0, 1], ["0%", "100%"]) }}
            />
          </div>
        </div>

        {/* Card */}
        <motion.div className="max-w-lg w-full" style={{ scale: cardScale }}>
          <div className="rounded-2xl border border-white/[0.06] bg-[#111113] p-6">
            {/* Header */}
            <div className="flex items-center gap-4 mb-5">
              <div
                className="h-12 w-12 rounded-full flex items-center justify-center border"
                style={{ backgroundColor: avatarBg, borderColor: avatarBorder }}
              >
                <span className="text-base font-semibold text-[#FAFAFA]">SJ</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#FAFAFA] font-semibold">Sarah Johnson</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#71717A]">sarah@example.com</span>
                  {segment && (
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded-full font-medium text-[#6366F1] bg-[#6366F1]/10"
                      style={{ opacity: segmentOpacity }}
                    >
                      {segment}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-2.5 mb-3">
              <div className="rounded-xl bg-white/[0.03] border border-white/[0.04] p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <ShoppingCart className="h-3 w-3 text-[#71717A]" />
                  <span className="text-[10px] text-[#71717A]">{spendLabel}</span>
                </div>
                <p className="text-xl font-semibold text-[#FAFAFA]">
                  &euro;{totalSpend.toLocaleString()}
                </p>
                {tVal > 0.35 && (
                  <span
                    className="text-[10px] text-emerald-400 flex items-center gap-0.5"
                    style={{ opacity: growthOpacity }}
                  >
                    <TrendingUp className="h-2.5 w-2.5" />+{growth}%
                  </span>
                )}
              </div>
              <div className="rounded-xl bg-white/[0.03] border border-white/[0.04] p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Star className="h-3 w-3 text-[#71717A]" />
                  <span className="text-[10px] text-[#71717A]">Last Visit</span>
                </div>
                <p className="text-xl font-semibold text-[#FAFAFA]">{lastVisit}</p>
                {tVal > 0.65 && (
                  <span className="text-[10px] text-emerald-400" style={{ opacity: activeOpacity }}>
                    Active now
                  </span>
                )}
              </div>
            </div>

            {/* Engagement */}
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.04] p-3 mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Target className="h-3 w-3" style={{ color: targetColor }} />
                  <span className="text-[10px] text-[#A1A1AA]">Engagement</span>
                </div>
                <span className="text-[10px] font-semibold text-[#FAFAFA]">{engagement}/100</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${engagement}%`,
                    backgroundColor: engagementColor,
                    transition: "background-color 0.3s",
                  }}
                />
              </div>
            </div>

            {/* Actions — appear as you scroll */}
            <div
              className="overflow-hidden"
              style={{
                maxHeight: actionsHeight,
                opacity: actionsOpacity,
                transition: "max-height 0.4s ease, opacity 0.3s ease",
              }}
            >
              <p className="text-[10px] text-[#71717A] uppercase tracking-wider font-medium mb-2">
                Automated Actions
              </p>
              <div className="space-y-1.5">
                {[
                  { icon: Mail, label: "Email Campaign", stat: `${emailRate}% open`, color: "text-emerald-400" },
                  { icon: MessageSquare, label: "SMS Sent", stat: `${smsRate}% click`, color: "text-blue-400" },
                  { icon: Phone, label: "Call List", stat: callPriority ? `Priority: ${callPriority}` : "—", color: "text-amber-400" },
                ].map((action) => (
                  <div
                    key={action.label}
                    className="flex items-center gap-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] px-3 py-2"
                  >
                    <action.icon className={`h-3.5 w-3.5 ${action.color} shrink-0`} />
                    <span className="text-xs text-[#FAFAFA] flex-1">{action.label}</span>
                    <span className="text-[10px] text-[#71717A]">{action.stat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll hint at bottom */}
        <motion.p
          className="mt-6 text-[11px] text-[#52525B]"
          style={{ opacity: useTransform(t, [0, 0.15], [1, 0]) }}
        >
          Scroll to see the transformation
        </motion.p>
      </div>
    </section>
  );
}
