"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  ShoppingCart,
  TrendingUp,
  Activity,
  Zap,
  Send,
  Tag,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DashboardData {
  stats: {
    total_customers: number;
    active_customers: number;
    total_revenue: number;
    avg_order_value: number;
    events_today: number;
    events_this_week: number;
    active_campaigns: number;
    total_campaigns: number;
    active_automations: number;
    total_segments: number;
    customer_trend: number;
    revenue_trend: number;
    events_trend: number;
  };
  rfm_distribution: Record<string, number>;
  recent_customers: Array<{
    id: number;
    uuid: string;
    first_name: string;
    last_name: string;
    email: string;
    clv_total: number;
    rfm_segment: string | null;
    last_activity_at: string | null;
    created_at: string;
  }>;
  top_customers: Array<{
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    clv_total: number;
    rfm_segment: string | null;
    clv_order_count: number;
  }>;
  revenue_by_month: Array<{ month: string; revenue: number }>;
  campaign_stats: Array<{
    type: string;
    total: number;
    sent: number;
    opened: number;
    clicked: number;
  }>;
  recent_events: Array<{
    id: number;
    event_name: string;
    event_category: string | null;
    monetary_value: number | null;
    page_url: string | null;
    occurred_at: string;
    customer: { id: number; first_name: string; last_name: string; email: string } | null;
  }>;
}

const segmentColors: Record<string, { text: string; bg: string; bar: string }> = {
  Champions: { text: "text-emerald-400", bg: "bg-emerald-400/10", bar: "#34d399" },
  "Loyal Customers": { text: "text-blue-400", bg: "bg-blue-400/10", bar: "#60a5fa" },
  "Potential Loyalists": { text: "text-amber-400", bg: "bg-amber-400/10", bar: "#fbbf24" },
  "At Risk": { text: "text-orange-400", bg: "bg-orange-400/10", bar: "#f97316" },
  Lost: { text: "text-red-400", bg: "bg-red-400/10", bar: "#ef4444" },
  "New Customers": { text: "text-cyan-400", bg: "bg-cyan-400/10", bar: "#22d3ee" },
};

function formatCurrency(value: number) {
  return `€${Number(value || 0).toLocaleString("de-DE", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

function timeAgo(dateStr: string | null) {
  if (!dateStr) return "—";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function TrendBadge({ value, label }: { value: number; label: string }) {
  if (value === 0) return <span className="text-xs text-[#52525B]">{label}</span>;
  const isPositive = value > 0;
  return (
    <span className={`flex items-center gap-0.5 text-xs ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
      {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
      {Math.abs(value)}% {label}
    </span>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<DashboardData>("/dashboard/overview")
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#FAFAFA]" style={{ letterSpacing: "-0.025em" }}>Overview</h1>
          <p className="text-sm text-[#71717A] mt-1">Your CRM at a glance</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5 h-[120px] animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { stats } = data;

  // Prepare chart data
  const rfmChartData = Object.entries(data.rfm_distribution).map(([segment, count]) => ({
    segment: segment.length > 12 ? segment.slice(0, 12) + "…" : segment,
    fullName: segment,
    count,
    fill: segmentColors[segment]?.bar || "#6366F1",
  }));

  const campaignPieData = data.campaign_stats.map((c) => ({
    name: c.type === "email" ? "Email" : c.type === "sms" ? "SMS" : "Call List",
    value: c.total,
    sent: c.sent,
    opened: c.opened,
    color: c.type === "email" ? "#6366F1" : c.type === "sms" ? "#22d3ee" : "#fbbf24",
  }));

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-[#FAFAFA]" style={{ letterSpacing: "-0.025em" }}>
          Overview
        </h1>
        <p className="text-sm text-[#71717A] mt-1">Your CRM at a glance</p>
      </div>

      {/* Primary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Total Customers",
            value: stats.total_customers.toLocaleString(),
            trend: stats.customer_trend,
            trendLabel: "vs last month",
            icon: Users,
            sub: `${stats.active_customers} active (30d)`,
          },
          {
            title: "Total Revenue",
            value: formatCurrency(stats.total_revenue),
            trend: stats.revenue_trend,
            trendLabel: "vs last month",
            icon: ShoppingCart,
            sub: `€${stats.avg_order_value.toFixed(0)} avg. order`,
          },
          {
            title: "Events Today",
            value: stats.events_today.toLocaleString(),
            trend: stats.events_trend,
            trendLabel: "vs yesterday",
            icon: Activity,
            sub: `${stats.events_this_week.toLocaleString()} this week`,
          },
          {
            title: "Active Campaigns",
            value: stats.active_campaigns.toString(),
            trend: 0,
            trendLabel: "",
            icon: Send,
            sub: `${stats.total_campaigns} total`,
          },
        ].map((card) => (
          <div key={card.title} className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[#71717A] uppercase tracking-wider">{card.title}</span>
              <card.icon className="h-4 w-4 text-[#52525B]" />
            </div>
            <p className="text-2xl font-bold text-[#FAFAFA] tabular-nums">{card.value}</p>
            <div className="flex items-center justify-between mt-1">
              <TrendBadge value={card.trend} label={card.trendLabel} />
              <span className="text-[11px] text-[#52525B]">{card.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Segments", value: stats.total_segments, icon: Tag, color: "text-indigo-400" },
          { label: "Automations", value: stats.active_automations, icon: Zap, color: "text-emerald-400" },
          { label: "Avg. Order Value", value: `€${stats.avg_order_value.toFixed(0)}`, icon: TrendingUp, color: "text-amber-400" },
          { label: "Active Customers", value: stats.active_customers, icon: Users, color: "text-cyan-400" },
        ].map((card) => (
          <div key={card.label} className="rounded-xl border border-[#1F1F23] bg-[#111113] p-4">
            <div className="flex items-center gap-2 mb-2">
              <card.icon className={`h-3.5 w-3.5 ${card.color}`} />
              <span className="text-[11px] text-[#71717A] uppercase tracking-wider">{card.label}</span>
            </div>
            <p className="text-lg font-bold text-[#FAFAFA] tabular-nums">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 rounded-xl border border-[#1F1F23] bg-[#111113] p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-[15px] font-semibold text-[#FAFAFA]">Revenue</h3>
              <p className="text-[13px] text-[#71717A]">Monthly revenue trend</p>
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.revenue_by_month} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1F1F23" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "#71717A", fontSize: 12 }} axisLine={{ stroke: "#1F1F23" }} tickLine={false} />
                <YAxis tick={{ fill: "#71717A", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `€${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    return (
                      <div className="rounded-lg border border-[#27272A] bg-[#1A1A1D] px-3 py-2 shadow-lg">
                        <p className="text-[11px] text-[#71717A] mb-0.5">{label}</p>
                        <p className="text-sm font-semibold text-[#FAFAFA] tabular-nums">{formatCurrency(payload[0].value as number)}</p>
                      </div>
                    );
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={2} fill="url(#revenueGrad)" dot={false} activeDot={{ r: 4, fill: "#FAFAFA", stroke: "#6366F1", strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Campaign Overview Pie */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5">
          <div className="mb-5">
            <h3 className="text-[15px] font-semibold text-[#FAFAFA]">Campaigns</h3>
            <p className="text-[13px] text-[#71717A]">By channel type</p>
          </div>
          {campaignPieData.length > 0 ? (
            <div>
              <div className="h-[160px] w-[160px] mx-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={campaignPieData} cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={3} dataKey="value" strokeWidth={0}>
                      {campaignPieData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;
                        const d = payload[0].payload;
                        return (
                          <div className="rounded-lg border border-[#27272A] bg-[#1A1A1D] px-3 py-2 shadow-lg">
                            <p className="text-xs text-[#71717A]">{d.name}</p>
                            <p className="text-sm font-semibold text-[#FAFAFA]">{d.value} campaigns</p>
                            <p className="text-xs text-[#52525B]">{d.sent?.toLocaleString() || 0} sent</p>
                          </div>
                        );
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {campaignPieData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-[#A1A1AA]">{item.name}</span>
                    </div>
                    <span className="text-xs font-medium text-[#FAFAFA] tabular-nums">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[200px] text-sm text-[#52525B]">
              No campaigns yet
            </div>
          )}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Customers + Top Customers */}
        <div className="lg:col-span-2 space-y-4">
          {/* Recent Customers */}
          <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[15px] font-semibold text-[#FAFAFA]">Recent Customers</h3>
                <p className="text-[13px] text-[#71717A]">Latest additions</p>
              </div>
              <button
                onClick={() => router.push("/dashboard/customers")}
                className="text-xs text-[#6366F1] hover:text-[#818CF8] transition-colors"
              >
                View all
              </button>
            </div>
            <div className="space-y-0">
              {data.recent_customers.map((customer) => {
                const initials = `${customer.first_name?.[0] || ""}${customer.last_name?.[0] || ""}`.toUpperCase();
                const style = segmentColors[customer.rfm_segment || ""] || { text: "text-[#71717A]", bg: "bg-[#1F1F23]" };
                return (
                  <div
                    key={customer.id}
                    onClick={() => router.push(`/dashboard/customers/${customer.id}`)}
                    className="flex items-center gap-4 px-3 py-3 -mx-3 rounded-lg hover:bg-[#161618] transition-colors cursor-pointer"
                  >
                    <div className="h-9 w-9 rounded-full bg-[#6366F1]/[0.08] border border-[#6366F1]/[0.12] flex items-center justify-center shrink-0">
                      <span className="text-xs font-semibold text-[#A5B4FC]">{initials}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#FAFAFA] truncate">{customer.first_name} {customer.last_name}</p>
                      <p className="text-xs text-[#71717A] truncate">{customer.email}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-medium text-[#FAFAFA] tabular-nums">{formatCurrency(customer.clv_total)}</p>
                      {customer.rfm_segment && (
                        <span className={`inline-block text-[10px] font-medium px-1.5 py-0.5 rounded-md ${style.text} ${style.bg}`}>
                          {customer.rfm_segment}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#52525B] w-12 text-right shrink-0">{timeAgo(customer.created_at)}</span>
                  </div>
                );
              })}
              {data.recent_customers.length === 0 && (
                <p className="text-sm text-[#52525B] text-center py-8">No customers yet</p>
              )}
            </div>
          </div>

          {/* Top Customers by Revenue */}
          {data.top_customers.length > 0 && (
            <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5">
              <div className="mb-4">
                <h3 className="text-[15px] font-semibold text-[#FAFAFA]">Top Customers</h3>
                <p className="text-[13px] text-[#71717A]">Highest lifetime value</p>
              </div>
              <div className="space-y-0">
                {data.top_customers.map((customer, i) => {
                  const initials = `${customer.first_name?.[0] || ""}${customer.last_name?.[0] || ""}`.toUpperCase();
                  return (
                    <div
                      key={customer.id}
                      onClick={() => router.push(`/dashboard/customers/${customer.id}`)}
                      className="flex items-center gap-4 px-3 py-3 -mx-3 rounded-lg hover:bg-[#161618] transition-colors cursor-pointer"
                    >
                      <span className="text-xs text-[#52525B] w-5 text-right tabular-nums">#{i + 1}</span>
                      <div className="h-9 w-9 rounded-full bg-[#6366F1]/[0.08] border border-[#6366F1]/[0.12] flex items-center justify-center shrink-0">
                        <span className="text-xs font-semibold text-[#A5B4FC]">{initials}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#FAFAFA] truncate">{customer.first_name} {customer.last_name}</p>
                        <p className="text-xs text-[#52525B]">{customer.clv_order_count} orders</p>
                      </div>
                      <span className="text-sm font-bold text-emerald-400 tabular-nums">{formatCurrency(customer.clv_total)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* RFM Segment Chart + Activity Feed */}
        <div className="space-y-4">
          {/* RFM Segments */}
          <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5">
            <div className="mb-5">
              <h3 className="text-[15px] font-semibold text-[#FAFAFA]">RFM Segments</h3>
              <p className="text-[13px] text-[#71717A]">Customer distribution</p>
            </div>
            {rfmChartData.length > 0 ? (
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rfmChartData} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
                    <CartesianGrid stroke="#1F1F23" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="segment" tick={{ fill: "#71717A", fontSize: 10 }} axisLine={{ stroke: "#1F1F23" }} tickLine={false} interval={0} angle={-30} textAnchor="end" height={50} />
                    <YAxis tick={{ fill: "#71717A", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;
                        return (
                          <div className="rounded-lg border border-[#27272A] bg-[#1A1A1D] px-3 py-2 shadow-lg">
                            <p className="text-[11px] text-[#71717A] mb-0.5">{payload[0].payload.fullName}</p>
                            <p className="text-sm font-semibold text-[#FAFAFA] tabular-nums">{payload[0].value} customers</p>
                          </div>
                        );
                      }}
                      cursor={{ fill: "rgba(255,255,255,0.02)" }}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={36}>
                      {rfmChartData.map((entry, i) => (
                        <Cell key={i} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-sm text-[#52525B] text-center py-8">No segment data</p>
            )}
          </div>

          {/* Activity Feed */}
          <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5">
            <div className="mb-4">
              <h3 className="text-[15px] font-semibold text-[#FAFAFA]">Recent Activity</h3>
              <p className="text-[13px] text-[#71717A]">Live event feed</p>
            </div>
            <div className="space-y-0">
              {data.recent_events.map((event) => (
                <div key={event.id} className="flex items-start gap-3 px-2 py-2.5 -mx-2 rounded-lg hover:bg-[#161618] transition-colors">
                  <div className="h-7 w-7 rounded-lg bg-[#1F1F23] flex items-center justify-center shrink-0 mt-0.5">
                    {event.event_name === "pageview" ? <Globe className="h-3.5 w-3.5 text-[#52525B]" /> :
                     event.monetary_value ? <ShoppingCart className="h-3.5 w-3.5 text-emerald-400" /> :
                     <Activity className="h-3.5 w-3.5 text-[#52525B]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#FAFAFA] truncate">
                      {event.customer ? `${event.customer.first_name} ${event.customer.last_name}` : "Anonymous"}
                    </p>
                    <p className="text-[11px] text-[#52525B] truncate">
                      {event.event_name}
                      {event.monetary_value ? ` · ${formatCurrency(event.monetary_value)}` : ""}
                    </p>
                  </div>
                  <span className="text-[10px] text-[#52525B] shrink-0">{timeAgo(event.occurred_at)}</span>
                </div>
              ))}
              {data.recent_events.length === 0 && (
                <p className="text-xs text-[#52525B] text-center py-4">No recent events</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
