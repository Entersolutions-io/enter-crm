"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  MessageSquare,
  Phone,
  TrendingUp,
  Users,
  ShoppingCart,
  Clock,
  Target,
  BarChart3,
} from "lucide-react";
import { ScrollReveal } from "@/components/effects/scroll-reveal";

// Before state: plain customer profile
function BeforeContent({ opacity }: { opacity: number }) {
  return (
    <div
      className="absolute inset-0 p-6 flex flex-col"
      style={{ opacity }}
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="h-14 w-14 rounded-full bg-white/[0.06] flex items-center justify-center">
          <Users className="h-6 w-6 text-[#71717A]" />
        </div>
        <div>
          <p className="text-[#FAFAFA] font-semibold">Sarah Johnson</p>
          <p className="text-sm text-[#71717A]">sarah@example.com</p>
        </div>
      </div>

      {/* Basic info - boring/flat */}
      <div className="space-y-4 flex-1">
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.04] p-4">
          <p className="text-xs text-[#71717A] mb-1">Total Purchases</p>
          <p className="text-2xl font-semibold text-[#A1A1AA]">$240</p>
        </div>
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.04] p-4">
          <p className="text-xs text-[#71717A] mb-1">Last Visit</p>
          <p className="text-lg text-[#A1A1AA]">14 days ago</p>
        </div>
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.04] p-4">
          <p className="text-xs text-[#71717A] mb-1">Engagement</p>
          <div className="h-2 rounded-full bg-white/[0.06] mt-2">
            <div className="h-2 rounded-full bg-[#71717A] w-[25%]" />
          </div>
          <p className="text-xs text-[#71717A] mt-1">Low</p>
        </div>
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.04] p-4">
          <p className="text-xs text-[#71717A] mb-1">Status</p>
          <p className="text-sm text-[#71717A]">Unknown segment</p>
        </div>
      </div>

      {/* Label */}
      <div className="mt-4 text-center">
        <span className="text-xs text-[#71717A] uppercase tracking-wide font-medium">Without Enter CRM</span>
      </div>
    </div>
  );
}

// After state: enriched profile with CRM actions
function AfterContent({ opacity }: { opacity: number }) {
  return (
    <div
      className="absolute inset-0 p-6 flex flex-col"
      style={{ opacity }}
    >
      {/* Header - enriched */}
      <div className="flex items-center gap-4 mb-6">
        <div className="h-14 w-14 rounded-full bg-[#6366F1]/10 border border-[#6366F1]/20 flex items-center justify-center">
          <Users className="h-6 w-6 text-[#6366F1]" />
        </div>
        <div>
          <p className="text-[#FAFAFA] font-semibold">Sarah Johnson</p>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#6366F1]/10 text-[#6366F1] font-medium">
              VIP Customer
            </span>
            <span className="text-xs text-[#A1A1AA]">RFM: 445</span>
          </div>
        </div>
      </div>

      {/* Enriched stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-xl bg-[#6366F1]/[0.06] border border-[#6366F1]/10 p-3">
          <div className="flex items-center gap-2 mb-1">
            <ShoppingCart className="h-3.5 w-3.5 text-[#6366F1]" />
            <p className="text-xs text-[#A1A1AA]">Lifetime Value</p>
          </div>
          <p className="text-xl font-semibold text-[#FAFAFA]">$2,840</p>
          <p className="text-xs text-emerald-400 flex items-center gap-1 mt-0.5">
            <TrendingUp className="h-3 w-3" /> +1,083%
          </p>
        </div>
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="h-3.5 w-3.5 text-[#A1A1AA]" />
            <p className="text-xs text-[#A1A1AA]">Last Visit</p>
          </div>
          <p className="text-xl font-semibold text-[#FAFAFA]">2h ago</p>
          <p className="text-xs text-emerald-400">Active now</p>
        </div>
      </div>

      {/* Engagement bar */}
      <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Target className="h-3.5 w-3.5 text-[#6366F1]" />
            <p className="text-xs text-[#A1A1AA]">Engagement Score</p>
          </div>
          <span className="text-xs font-semibold text-[#FAFAFA]">87/100</span>
        </div>
        <div className="h-2 rounded-full bg-white/[0.06]">
          <div className="h-2 rounded-full bg-[#6366F1] w-[87%] transition-all duration-700" />
        </div>
      </div>

      {/* CRM Actions triggered */}
      <div className="space-y-2 flex-1">
        <p className="text-xs text-[#71717A] uppercase tracking-wide font-medium mb-2">
          Automated Actions
        </p>
        <div className="flex items-center gap-3 rounded-lg bg-emerald-500/[0.06] border border-emerald-500/10 px-3 py-2">
          <Mail className="h-4 w-4 text-emerald-400" />
          <div className="flex-1">
            <p className="text-xs text-[#FAFAFA]">Email Campaign Sent</p>
            <p className="text-xs text-emerald-400">Open rate: 72%</p>
          </div>
          <BarChart3 className="h-3.5 w-3.5 text-emerald-400" />
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-blue-500/[0.06] border border-blue-500/10 px-3 py-2">
          <MessageSquare className="h-4 w-4 text-blue-400" />
          <div className="flex-1">
            <p className="text-xs text-[#FAFAFA]">SMS Notification</p>
            <p className="text-xs text-blue-400">Clicked: Yes</p>
          </div>
          <BarChart3 className="h-3.5 w-3.5 text-blue-400" />
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-amber-500/[0.06] border border-amber-500/10 px-3 py-2">
          <Phone className="h-4 w-4 text-amber-400" />
          <div className="flex-1">
            <p className="text-xs text-[#FAFAFA]">Added to Call List</p>
            <p className="text-xs text-amber-400">Priority: High</p>
          </div>
        </div>
      </div>

      {/* Label */}
      <div className="mt-4 text-center">
        <span className="text-xs text-[#6366F1] uppercase tracking-wide font-medium">With Enter CRM</span>
      </div>
    </div>
  );
}

export function HowItWorks() {
  const [sliderValue, setSliderValue] = useState(25);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const afterOpacity = Math.min(1, Math.max(0, (sliderValue - 20) / 60));
  const beforeOpacity = Math.min(1, Math.max(0, (80 - sliderValue) / 60));

  const updateSlider = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.min(100, Math.max(0, (x / rect.width) * 100));
    setSliderValue(pct);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    updateSlider(e.clientX);
  }, [updateSlider]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    updateSlider(e.clientX);
  }, [updateSlider]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    isDragging.current = true;
    updateSlider(e.touches[0].clientX);
  }, [updateSlider]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    updateSlider(e.touches[0].clientX);
  }, [updateSlider]);

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <section id="how-it-works" className="relative py-32 px-6">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm text-[#6366F1] font-semibold tracking-wide uppercase mb-3">
              How It Works
            </p>
            <h2
              className="text-3xl md:text-5xl font-semibold text-[#FAFAFA] tracking-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              See the difference
            </h2>
            <p className="mt-4 text-[#A1A1AA] max-w-lg mx-auto">
              Drag the slider to see how Enter CRM transforms raw customer data into actionable intelligence.
            </p>
          </div>
        </ScrollReveal>

        {/* Before/After Slider */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <div
            ref={sliderRef}
            className="relative w-full max-w-2xl mx-auto h-[580px] rounded-2xl border border-white/[0.06] bg-[#111113] overflow-hidden select-none cursor-col-resize"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Before content */}
            <BeforeContent opacity={beforeOpacity} />

            {/* After content */}
            <AfterContent opacity={afterOpacity} />

            {/* Slider line */}
            <div
              className="absolute top-0 bottom-0 w-px bg-white/20 z-20 pointer-events-none"
              style={{ left: `${sliderValue}%` }}
            >
              {/* Slider handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-[#0A0A0B] border-2 border-white/30 flex items-center justify-center pointer-events-none">
                <div className="flex items-center gap-0.5">
                  <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                    <path d="M5 1L1 5L5 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                    <path d="M1 1L5 5L1 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Labels below */}
          <div className="flex justify-between max-w-2xl mx-auto mt-4 px-2">
            <span className="text-sm text-[#71717A]">Raw Data</span>
            <span className="text-sm text-[#71717A]">Drag to compare</span>
            <span className="text-sm text-[#6366F1]">With Enter CRM</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
