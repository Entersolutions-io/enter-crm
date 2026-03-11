"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import {
  Mail,
  MessageSquare,
  Phone,
  TrendingUp,
  ShoppingCart,
  Target,
  BarChart3,
  Star,
} from "lucide-react";

export function BeforeAfter() {
  const [value, setValue] = useState(20);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  // 0 = fully before, 100 = fully after
  const t = value / 100;

  const update = useCallback((clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setValue(pct);
  }, []);

  const onDown = useCallback((clientX: number) => { dragging.current = true; update(clientX); }, [update]);
  const onMove = useCallback((clientX: number) => { if (dragging.current) update(clientX); }, [update]);
  const onUp = useCallback(() => { dragging.current = false; }, []);

  // Interpolation helpers
  const lerp = (a: number, b: number) => a + (b - a) * t;
  const lerpInt = (a: number, b: number) => Math.round(lerp(a, b));

  // Interpolated values
  const totalSpend = lerpInt(240, 2840);
  const engagementScore = lerpInt(25, 87);
  const lastVisit = t < 0.5 ? "14 days ago" : t < 0.75 ? "3 days ago" : "2h ago";
  const segment = t < 0.3 ? "No segment" : t < 0.6 ? "Returning" : t < 0.85 ? "Loyal" : "VIP";
  const segmentColor = t < 0.3 ? "text-[#71717A]" : t < 0.6 ? "text-[#A1A1AA]" : t < 0.85 ? "text-blue-400" : "text-[#6366F1]";
  const engagementColor = t < 0.3 ? "bg-[#71717A]" : t < 0.6 ? "bg-[#A1A1AA]" : t < 0.85 ? "bg-blue-400" : "bg-[#6366F1]";
  const emailOpen = lerpInt(0, 72);
  const smsClick = lerpInt(0, 85);
  const callPriority = t < 0.5 ? "—" : t < 0.8 ? "Medium" : "High";

  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm text-[#6366F1] font-semibold tracking-wide uppercase mb-3">
              See The Difference
            </p>
            <h2
              className="text-3xl md:text-5xl font-semibold text-[#FAFAFA] tracking-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              One customer, transformed
            </h2>
            <p className="mt-4 text-[#A1A1AA] max-w-lg mx-auto">
              Drag the slider to see how Enter CRM enriches a single customer profile.
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          className="max-w-xl mx-auto"
        >
          {/* Customer Card */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#111113] p-6 md:p-8">
            {/* Avatar + Name */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className="h-14 w-14 rounded-full flex items-center justify-center border transition-all duration-300"
                style={{
                  backgroundColor: `rgba(99, 102, 241, ${t * 0.12})`,
                  borderColor: `rgba(99, 102, 241, ${0.08 + t * 0.2})`,
                }}
              >
                <span className="text-lg font-semibold text-[#FAFAFA]">SJ</span>
              </div>
              <div>
                <p className="text-[#FAFAFA] font-semibold text-lg">Sarah Johnson</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-sm text-[#71717A]">sarah@example.com</span>
                  {t > 0.5 && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium transition-all duration-300 ${segmentColor}`}
                      style={{
                        backgroundColor: `rgba(99, 102, 241, ${(t - 0.5) * 0.2})`,
                        opacity: Math.min(1, (t - 0.3) * 3),
                      }}
                    >
                      {segment}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="rounded-xl bg-white/[0.03] border border-white/[0.04] p-4 transition-all duration-300"
                style={{ borderColor: `rgba(99, 102, 241, ${t * 0.12})` }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <ShoppingCart className="h-3.5 w-3.5 text-[#71717A]" style={{ color: `rgb(${99 + (255 - 99) * (1 - t)}, ${102 + (113 - 102) * (1 - t)}, ${241 * t + 170 * (1 - t)})` }} />
                  <p className="text-xs text-[#71717A]">{t > 0.5 ? "Lifetime Value" : "Total Spend"}</p>
                </div>
                <p className="text-2xl font-semibold text-[#FAFAFA]">${totalSpend.toLocaleString()}</p>
                {t > 0.4 && (
                  <p
                    className="text-xs text-emerald-400 flex items-center gap-1 mt-1"
                    style={{ opacity: Math.min(1, (t - 0.4) * 3) }}
                  >
                    <TrendingUp className="h-3 w-3" />
                    +{lerpInt(0, 1083)}%
                  </p>
                )}
              </div>

              <div className="rounded-xl bg-white/[0.03] border border-white/[0.04] p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="h-3.5 w-3.5 text-[#71717A]" />
                  <p className="text-xs text-[#71717A]">Last Visit</p>
                </div>
                <p className="text-xl font-semibold text-[#FAFAFA]">{lastVisit}</p>
                {t > 0.7 && (
                  <p className="text-xs text-emerald-400 mt-1" style={{ opacity: Math.min(1, (t - 0.7) * 4) }}>
                    Active now
                  </p>
                )}
              </div>
            </div>

            {/* Engagement Bar */}
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.04] p-4 mb-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Target className="h-3.5 w-3.5" style={{ color: t > 0.5 ? '#6366F1' : '#71717A' }} />
                  <p className="text-xs text-[#A1A1AA]">Engagement Score</p>
                </div>
                <span className="text-xs font-semibold text-[#FAFAFA]">{engagementScore}/100</span>
              </div>
              <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${engagementColor}`}
                  style={{ width: `${engagementScore}%` }}
                />
              </div>
            </div>

            {/* Automated Actions - fade in as slider goes right */}
            <div
              className="space-y-2.5 transition-all duration-500"
              style={{ opacity: Math.min(1, Math.max(0, (t - 0.35) * 2.5)), maxHeight: t > 0.3 ? 300 : 0, overflow: "hidden" }}
            >
              <p className="text-xs text-[#71717A] uppercase tracking-wide font-medium">
                Automated Actions
              </p>
              <div className="flex items-center gap-3 rounded-xl bg-white/[0.02] border border-white/[0.04] px-4 py-3">
                <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#FAFAFA]">Email Campaign</p>
                  <p className="text-xs text-[#71717A]">Open rate: {emailOpen}%</p>
                </div>
                <BarChart3 className="h-4 w-4 text-[#71717A] shrink-0" />
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white/[0.02] border border-white/[0.04] px-4 py-3">
                <MessageSquare className="h-4 w-4 text-blue-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#FAFAFA]">SMS Sent</p>
                  <p className="text-xs text-[#71717A]">Click rate: {smsClick}%</p>
                </div>
                <BarChart3 className="h-4 w-4 text-[#71717A] shrink-0" />
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white/[0.02] border border-white/[0.04] px-4 py-3">
                <Phone className="h-4 w-4 text-amber-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#FAFAFA]">Call List</p>
                  <p className="text-xs text-[#71717A]">Priority: {callPriority}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Slider Track */}
          <div className="mt-8 px-2">
            <div
              ref={trackRef}
              className="relative h-8 flex items-center cursor-pointer select-none"
              onMouseDown={(e) => onDown(e.clientX)}
              onMouseMove={(e) => onMove(e.clientX)}
              onMouseUp={onUp}
              onMouseLeave={onUp}
              onTouchStart={(e) => onDown(e.touches[0].clientX)}
              onTouchMove={(e) => onMove(e.touches[0].clientX)}
              onTouchEnd={onUp}
            >
              {/* Track bg */}
              <div className="absolute inset-y-3 left-0 right-0 rounded-full bg-white/[0.06]" />
              {/* Filled portion */}
              <div
                className="absolute inset-y-3 left-0 rounded-full bg-[#6366F1]/30"
                style={{ width: `${value}%` }}
              />
              {/* Handle */}
              <div
                className="absolute top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-[#FAFAFA] shadow-lg shadow-black/30 pointer-events-none"
                style={{ left: `calc(${value}% - 12px)` }}
              />
            </div>

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
