"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  trend?: number;
  trendLabel?: string;
  icon: LucideIcon;
}

export function StatCard({ title, value, trend, trendLabel, icon: Icon }: StatCardProps) {
  const isPositive = trend && trend > 0;
  const isNegative = trend && trend < 0;

  return (
    <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5 hover:border-[#27272A] transition-colors duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="h-10 w-10 rounded-lg bg-[#6366F1]/[0.08] border border-[#6366F1]/[0.12] flex items-center justify-center">
          <Icon className="h-5 w-5 text-[#6366F1]" strokeWidth={1.5} />
        </div>
        {trend !== undefined && (
          <span
            className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md ${
              isPositive
                ? "text-emerald-400 bg-emerald-400/[0.08]"
                : isNegative
                  ? "text-red-400 bg-red-400/[0.08]"
                  : "text-[#71717A] bg-white/[0.04]"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : isNegative ? (
              <TrendingDown className="h-3 w-3" />
            ) : null}
            {isPositive ? "+" : ""}
            {trend}%
          </span>
        )}
      </div>
      <p className="text-[13px] text-[#71717A] font-medium mb-1">{title}</p>
      <p
        className="text-2xl font-semibold text-[#FAFAFA]"
        style={{ fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}
      >
        {value}
      </p>
      {trendLabel && (
        <p className="text-[11px] text-[#52525B] mt-1">{trendLabel}</p>
      )}
    </div>
  );
}
