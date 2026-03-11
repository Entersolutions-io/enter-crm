"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function StatBlock({ label, value, change }: { label: string; value: string; change: string }) {
  return (
    <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
      <p className="text-xs text-[#71717A] mb-1">{label}</p>
      <p className="text-2xl font-bold text-[#FAFAFA]">{value}</p>
      <p className="text-xs text-emerald-400 mt-1">{change}</p>
    </div>
  );
}

function BarChart() {
  const bars = [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88];
  return (
    <div className="flex items-end gap-1.5 h-32">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t bg-[#6366F1]/40"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

function MiniTable() {
  const rows = [
    { name: "New Visitors", count: "2,847", pct: "34%" },
    { name: "Returning", count: "5,123", pct: "48%" },
    { name: "At Risk", count: "891", pct: "12%" },
    { name: "Churned", count: "234", pct: "6%" },
  ];
  return (
    <div className="space-y-2">
      {rows.map((row) => (
        <div key={row.name} className="flex items-center justify-between text-xs">
          <span className="text-[#A1A1AA]">{row.name}</span>
          <div className="flex items-center gap-3">
            <span className="text-[#FAFAFA] font-medium">{row.count}</span>
            <span className="text-[#71717A]">{row.pct}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DemoPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={
            isInView
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 60, scale: 0.96 }
          }
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {/* Section heading */}
          <div className="text-center mb-12">
            <p className="text-sm text-[#6366F1] font-semibold tracking-wide uppercase mb-3">
              Live Preview
            </p>
            <h2
              className="text-3xl md:text-5xl font-bold text-[#FAFAFA] tracking-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              Your dashboard, at a glance
            </h2>
          </div>

          {/* Browser frame */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#111113] overflow-hidden">
            {/* Browser chrome bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[#0E0E10]">
              <div className="h-3 w-3 rounded-full bg-white/10" />
              <div className="h-3 w-3 rounded-full bg-white/10" />
              <div className="h-3 w-3 rounded-full bg-white/10" />
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-lg bg-white/[0.04] text-xs text-[#71717A]">
                  app.entercrm.com/dashboard
                </div>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-6 space-y-6">
              {/* Stats row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatBlock label="Total Visitors" value="9,095" change="+12.5% vs last week" />
                <StatBlock label="Conversions" value="1,247" change="+8.3% vs last week" />
                <StatBlock label="Revenue" value="$48.2K" change="+23.1% vs last week" />
                <StatBlock label="Avg. LTV" value="$312" change="+5.7% vs last week" />
              </div>

              {/* Chart + Table row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                  <p className="text-xs text-[#71717A] mb-4">Revenue Over Time</p>
                  <BarChart />
                </div>
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                  <p className="text-xs text-[#71717A] mb-4">Customer Segments</p>
                  <MiniTable />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
