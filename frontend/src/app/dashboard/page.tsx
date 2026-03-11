"use client";

import { Users, ShoppingCart, TrendingUp, Activity } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { SegmentChart } from "@/components/dashboard/segment-chart";
import { RecentCustomers } from "@/components/dashboard/recent-customers";
import { CampaignOverview } from "@/components/dashboard/campaign-overview";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1
          className="text-2xl font-bold text-[#FAFAFA]"
          style={{ letterSpacing: "-0.025em" }}
        >
          Overview
        </h1>
        <p className="text-sm text-[#71717A] mt-1">
          Your CRM at a glance
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Customers"
          value="1,178"
          trend={12.5}
          trendLabel="vs last month"
          icon={Users}
        />
        <StatCard
          title="Total Revenue"
          value="€148,200"
          trend={8.2}
          trendLabel="vs last month"
          icon={ShoppingCart}
        />
        <StatCard
          title="Avg. Order Value"
          value="€126"
          trend={-2.4}
          trendLabel="vs last month"
          icon={TrendingUp}
        />
        <StatCard
          title="Events Today"
          value="3,842"
          trend={24.1}
          trendLabel="vs yesterday"
          icon={Activity}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <CampaignOverview />
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RecentCustomers />
        </div>
        <div>
          <SegmentChart />
        </div>
      </div>
    </div>
  );
}
