"use client";

import { useState } from "react";
import { BarChart3, TrendingUp, Users, Activity } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { SegmentChart } from "@/components/dashboard/segment-chart";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#FAFAFA]" style={{ letterSpacing: "-0.025em" }}>
          Analytics
        </h1>
        <p className="text-sm text-[#71717A] mt-1">
          Deep dive into your customer data
        </p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Avg. CLV"
          value="€1,240"
          trend={5.3}
          trendLabel="vs last quarter"
          icon={TrendingUp}
        />
        <StatCard
          title="Active Customers"
          value="842"
          trend={3.8}
          trendLabel="vs last month"
          icon={Users}
        />
        <StatCard
          title="Events / Day"
          value="12,480"
          trend={18.2}
          trendLabel="vs last week"
          icon={Activity}
        />
        <StatCard
          title="Churn Rate"
          value="2.4%"
          trend={-0.6}
          trendLabel="vs last month"
          icon={BarChart3}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RevenueChart />
        <SegmentChart />
      </div>
    </div>
  );
}
