"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import {
  Mail,
  MessageSquare,
  Phone,
  TrendingUp,
  ShoppingCart,
  Target,
  Star,
  BarChart3,
} from "lucide-react";

export function BeforeAfter() {
  const [value, setValue] = useState(15);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const t = value / 100;

  const lerp = (a: number, b: number) => Math.round(a + (b - a) * t);

  const totalSpend = lerp(240, 2840);
  const engagement = lerp(25, 87);
  const lastVisit = t < 0.4 ? "14d ago" : t < 0.7 ? "3d ago" : "2h ago";
  const segment = t < 0.25 ? null : t < 0.5 ? "Returning" : t < 0.8 ? "Loyal" : "VIP";
  const emailRate = lerp(0, 72);
  const smsRate = lerp(0, 85);
  const callPriority = t < 0.5 ? null : t < 0.8 ? "Medium" : "High";

  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <div className="text-center mb-12">
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
        </ScrollReveal>

        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="max-w-lg mx-auto"
        >
          {/* Card */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#111113] p-6">
            {/* Header */}
            <div className="flex items-center gap-4 mb-5">
              <div
                className="h-12 w-12 rounded-full flex items-center justify-center border transition-all duration-500"
                style={{
                  backgroundColor: `rgba(99,102,241,${t * 0.15})`,
                  borderColor: `rgba(99,102,241,${0.1 + t * 0.25})`,
                }}
              >
                <span className="text-base font-semibold text-[#FAFAFA]">SJ</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#FAFAFA] font-semibold">Sarah Johnson</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#71717A]">sarah@example.com</span>
                  {segment && (
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded-full font-medium text-[#6366F1] bg-[#6366F1]/10 transition-all duration-500"
                      style={{ opacity: Math.min(1, (t - 0.2) * 3) }}
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
                  <span className="text-[10px] text-[#71717A]">{t > 0.5 ? "Lifetime Value" : "Total Spend"}</span>
                </div>
                <p className="text-xl font-semibold text-[#FAFAFA]">${totalSpend.toLocaleString()}</p>
                {t > 0.35 && (
                  <span className="text-[10px] text-emerald-400 flex items-center gap-0.5" style={{ opacity: Math.min(1, (t - 0.35) * 4) }}>
                    <TrendingUp className="h-2.5 w-2.5" />+{lerp(0, 1083)}%
                  </span>
                )}
              </div>
              <div className="rounded-xl bg-white/[0.03] border border-white/[0.04] p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Star className="h-3 w-3 text-[#71717A]" />
                  <span className="text-[10px] text-[#71717A]">Last Visit</span>
                </div>
                <p className="text-xl font-semibold text-[#FAFAFA]">{lastVisit}</p>
                {t > 0.65 && (
                  <span className="text-[10px] text-emerald-400" style={{ opacity: Math.min(1, (t - 0.65) * 4) }}>Active now</span>
                )}
              </div>
            </div>

            {/* Engagement */}
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.04] p-3 mb-3">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Target className="h-3 w-3" style={{ color: t > 0.4 ? '#6366F1' : '#71717A' }} />
                  <span className="text-[10px] text-[#A1A1AA]">Engagement</span>
                </div>
                <span className="text-[10px] font-semibold text-[#FAFAFA]">{engagement}/100</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${engagement}%`,
                    backgroundColor: t < 0.3 ? '#71717A' : t < 0.6 ? '#A1A1AA' : '#6366F1',
                  }}
                />
              </div>
            </div>

            {/* Actions — slide in */}
            <div
              className="overflow-hidden transition-all duration-500"
              style={{ maxHeight: t > 0.3 ? 200 : 0, opacity: Math.min(1, Math.max(0, (t - 0.3) * 3)) }}
            >
              <p className="text-[10px] text-[#71717A] uppercase tracking-wider font-medium mb-2 mt-1">
                Automated Actions
              </p>
              <div className="space-y-1.5">
                {[
                  { icon: Mail, label: "Email Campaign", stat: `${emailRate}% open`, color: "text-emerald-400" },
                  { icon: MessageSquare, label: "SMS Sent", stat: `${smsRate}% click`, color: "text-blue-400" },
                  { icon: Phone, label: "Call List", stat: callPriority ? `Priority: ${callPriority}` : "—", color: "text-amber-400" },
                ].map((action) => (
                  <div key={action.label} className="flex items-center gap-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] px-3 py-2">
                    <action.icon className={`h-3.5 w-3.5 ${action.color} shrink-0`} />
                    <span className="text-xs text-[#FAFAFA] flex-1">{action.label}</span>
                    <span className="text-[10px] text-[#71717A]">{action.stat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Range slider */}
          <div className="mt-6 px-1">
            <input
              type="range"
              min={0}
              max={100}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/[0.06] accent-[#6366F1] slider-thumb"
            />
            <div className="flex justify-between mt-2">
              <span className="text-xs text-[#71717A]">Without CRM</span>
              <span className="text-xs text-[#6366F1]">With Enter CRM</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
