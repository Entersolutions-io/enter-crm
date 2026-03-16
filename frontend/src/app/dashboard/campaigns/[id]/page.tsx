"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  MessageSquare,
  Phone,
  Send,
  Eye,
  MousePointerClick,
  UserX,
  AlertTriangle,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  BarChart3,
  Megaphone,
  DollarSign,
  Target,
  Percent,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface AdRates {
  ctr: number;
  cpc: number;
  cpm: number;
  roas: number;
  conversion_rate: number;
  cost_per_conversion: number;
}

interface Campaign {
  id: number;
  name: string;
  type: "email" | "sms" | "call_list" | "ads";
  status: string;
  subject: string | null;
  body_html: string | null;
  body_text: string | null;
  ad_platform: string | null;
  ad_account_id: string | null;
  impressions: number;
  reach: number;
  clicks: number;
  conversions: number;
  ad_spend: number;
  revenue_attributed: number;
  total_recipients: number;
  total_sent: number;
  total_delivered: number;
  total_opened: number;
  total_clicked: number;
  total_bounced: number;
  total_unsubscribed: number;
  total_failed: number;
  scheduled_at: string | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  segment?: { id: number; name: string } | null;
  creator?: { id: number; name: string } | null;
}

interface CampaignMessage {
  id: number;
  customer: { id: number; first_name: string; last_name: string; email: string } | null;
  channel: string;
  to_address: string;
  status: string;
  sent_at: string | null;
  delivered_at: string | null;
  opened_at: string | null;
  clicked_at: string | null;
  failed_at: string | null;
}

interface Rates {
  delivery_rate: number;
  open_rate: number;
  click_rate: number;
  bounce_rate: number;
  unsubscribe_rate: number;
}

const statusColors: Record<string, string> = {
  draft: "bg-[#1F1F23] text-[#71717A] border-[#2A2A2E]",
  scheduled: "bg-blue-400/10 text-blue-400 border-blue-400/20",
  sending: "bg-amber-400/10 text-amber-400 border-amber-400/20",
  sent: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
};

const typeIcons = { email: Mail, sms: MessageSquare, call_list: Phone, ads: Megaphone };

const platformNames: Record<string, string> = {
  google: "Google Ads",
  meta: "Meta Ads",
  tiktok: "TikTok Ads",
  linkedin: "LinkedIn Ads",
  twitter: "X (Twitter) Ads",
};

const messageStatusColors: Record<string, string> = {
  pending: "text-[#71717A]",
  sent: "text-blue-400",
  delivered: "text-cyan-400",
  opened: "text-emerald-400",
  clicked: "text-indigo-400",
  failed: "text-red-400",
  bounced: "text-orange-400",
};

export default function CampaignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [rates, setRates] = useState<Rates | null>(null);
  const [adRates, setAdRates] = useState<AdRates | null>(null);
  const [messages, setMessages] = useState<CampaignMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "recipients" | "content">("overview");

  useEffect(() => {
    if (!params.id) return;
    api<{ campaign: Campaign; rates: Rates; ad_rates: AdRates; messages: CampaignMessage[] }>(`/campaigns/${params.id}`)
      .then((res) => {
        setCampaign(res.campaign);
        setRates(res.rates);
        setAdRates(res.ad_rates || null);
        setMessages(res.messages);
      })
      .catch(() => router.push("/dashboard/campaigns"))
      .finally(() => setLoading(false));
  }, [params.id, router]);

  if (loading || !campaign) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-[#1F1F23] rounded animate-pulse" />
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5 h-28 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const Icon = typeIcons[campaign.type] || Mail;

  // Funnel data for pie chart
  const funnelData = [
    { name: "Opened", value: campaign.total_opened, color: "#34d399" },
    { name: "Clicked", value: campaign.total_clicked, color: "#6366F1" },
    { name: "Bounced", value: campaign.total_bounced, color: "#f97316" },
    { name: "Unsubscribed", value: campaign.total_unsubscribed, color: "#ef4444" },
    { name: "Not Opened", value: Math.max(0, campaign.total_sent - campaign.total_opened - campaign.total_bounced), color: "#27272A" },
  ].filter((d) => d.value > 0);

  // Delivery funnel
  const funnelSteps = [
    { label: "Recipients", value: campaign.total_recipients || campaign.total_sent, icon: Users, color: "#A1A1AA" },
    { label: "Sent", value: campaign.total_sent, icon: Send, color: "#60a5fa" },
    { label: "Delivered", value: campaign.total_delivered, icon: CheckCircle2, color: "#22d3ee" },
    { label: "Opened", value: campaign.total_opened, icon: Eye, color: "#34d399" },
    { label: "Clicked", value: campaign.total_clicked, icon: MousePointerClick, color: "#6366F1" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/dashboard/campaigns")}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-[#71717A] hover:text-[#A1A1AA] hover:bg-[#1F1F23] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#6366F1]/10 flex items-center justify-center shrink-0">
              <Icon className="h-5 w-5 text-[#6366F1]" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-[#FAFAFA] truncate" style={{ letterSpacing: "-0.025em" }}>
                {campaign.name}
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                {campaign.subject && (
                  <span className="text-xs text-[#71717A] truncate">{campaign.subject}</span>
                )}
                {campaign.segment && (
                  <span className="text-xs text-[#52525B]">
                    Target: {campaign.segment.name}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <Badge variant="outline" className={`text-[10px] uppercase tracking-wider ${statusColors[campaign.status] || ""}`}>
          {campaign.status}
        </Badge>
      </div>

      {/* Tab navigation */}
      <div className="flex items-center gap-1 border-b border-[#1F1F23]">
        {(["overview", "recipients", "content"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? "text-[#FAFAFA] border-[#6366F1]"
                : "text-[#71717A] border-transparent hover:text-[#A1A1AA]"
            }`}
          >
            {tab === "overview" ? "Overview" : tab === "recipients" ? "Recipients" : "Content"}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && campaign.type === "ads" && (
        <div className="space-y-6">
          {/* Ad Platform Badge */}
          {campaign.ad_platform && (
            <div className="flex items-center gap-2">
              <Megaphone className="h-4 w-4 text-[#71717A]" />
              <span className="text-sm text-[#A1A1AA]">{platformNames[campaign.ad_platform] || campaign.ad_platform}</span>
              {campaign.ad_account_id && (
                <span className="text-xs text-[#52525B]">Account: {campaign.ad_account_id}</span>
              )}
            </div>
          )}

          {/* Ad KPI Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: "Impressions", value: campaign.impressions.toLocaleString(), icon: Eye, color: "text-blue-400", bg: "bg-blue-400/10" },
              { label: "Reach", value: campaign.reach.toLocaleString(), icon: Users, color: "text-cyan-400", bg: "bg-cyan-400/10" },
              { label: "Clicks", value: campaign.clicks.toLocaleString(), icon: MousePointerClick, color: "text-indigo-400", bg: "bg-indigo-400/10", rate: adRates ? `${adRates.ctr}% CTR` : undefined },
              { label: "Conversions", value: campaign.conversions.toLocaleString(), icon: Target, color: "text-emerald-400", bg: "bg-emerald-400/10", rate: adRates ? `${adRates.conversion_rate}%` : undefined },
              { label: "Ad Spend", value: `€${Number(campaign.ad_spend).toFixed(2)}`, icon: DollarSign, color: "text-amber-400", bg: "bg-amber-400/10" },
              { label: "Revenue", value: `€${Number(campaign.revenue_attributed).toFixed(2)}`, icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-400/10", rate: adRates ? `${adRates.roas}x ROAS` : undefined },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-[#1F1F23] bg-[#111113] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`h-7 w-7 rounded-lg ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`h-3.5 w-3.5 ${stat.color}`} />
                  </div>
                  <span className="text-[10px] text-[#71717A] uppercase tracking-wider">{stat.label}</span>
                </div>
                <p className="text-xl font-bold text-[#FAFAFA] tabular-nums">{stat.value}</p>
                {stat.rate && <p className={`text-xs mt-1 ${stat.color}`}>{stat.rate}</p>}
              </div>
            ))}
          </div>

          {/* Ad Performance Metrics */}
          {adRates && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: "Cost Per Click (CPC)", value: `€${adRates.cpc.toFixed(2)}`, desc: "Average cost per click" },
                { label: "CPM", value: `€${adRates.cpm.toFixed(2)}`, desc: "Cost per 1,000 impressions" },
                { label: "ROAS", value: `${adRates.roas.toFixed(2)}x`, desc: "Return on ad spend" },
                { label: "Cost / Conversion", value: `€${adRates.cost_per_conversion.toFixed(2)}`, desc: "Cost per conversion" },
              ].map((metric) => (
                <div key={metric.label} className="rounded-xl border border-[#1F1F23] bg-[#111113] p-4">
                  <p className="text-xs text-[#71717A] uppercase tracking-wider mb-1">{metric.label}</p>
                  <p className="text-2xl font-bold text-[#FAFAFA] tabular-nums">{metric.value}</p>
                  <p className="text-[11px] text-[#52525B] mt-1">{metric.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Ad Funnel */}
          <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5">
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 className="h-4 w-4 text-[#71717A]" />
              <h3 className="text-[15px] font-semibold text-[#FAFAFA]">Ad Performance Funnel</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: "Impressions", value: campaign.impressions, icon: Eye, color: "#60a5fa" },
                { label: "Reach", value: campaign.reach, icon: Users, color: "#22d3ee" },
                { label: "Clicks", value: campaign.clicks, icon: MousePointerClick, color: "#6366F1" },
                { label: "Conversions", value: campaign.conversions, icon: Target, color: "#34d399" },
              ].map((step, i, arr) => {
                const maxVal = Math.max(...arr.map((s) => s.value), 1);
                const pct = (step.value / maxVal) * 100;
                return (
                  <div key={step.label}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <step.icon className="h-3.5 w-3.5" style={{ color: step.color }} />
                        <span className="text-xs text-[#A1A1AA]">{step.label}</span>
                      </div>
                      <span className="text-xs font-medium text-[#FAFAFA] tabular-nums">{step.value.toLocaleString()}</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#1F1F23] overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: step.color }} />
                    </div>
                    {i > 0 && arr[i - 1].value > 0 && (
                      <p className="text-[10px] text-[#52525B] mt-0.5 text-right">
                        {((step.value / arr[i - 1].value) * 100).toFixed(1)}% conversion
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === "overview" && campaign.type !== "ads" && (
        <div className="space-y-6">
          {/* KPI Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { label: "Sent", value: campaign.total_sent, icon: Send, color: "text-blue-400", bg: "bg-blue-400/10" },
              { label: "Delivered", value: campaign.total_delivered, icon: CheckCircle2, color: "text-cyan-400", bg: "bg-cyan-400/10" },
              { label: "Opened", value: campaign.total_opened, icon: Eye, color: "text-emerald-400", bg: "bg-emerald-400/10", rate: rates?.open_rate },
              { label: "Clicked", value: campaign.total_clicked, icon: MousePointerClick, color: "text-indigo-400", bg: "bg-indigo-400/10", rate: rates?.click_rate },
              { label: "Bounced", value: campaign.total_bounced, icon: AlertTriangle, color: "text-orange-400", bg: "bg-orange-400/10", rate: rates?.bounce_rate },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-[#1F1F23] bg-[#111113] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`h-7 w-7 rounded-lg ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`h-3.5 w-3.5 ${stat.color}`} />
                  </div>
                  <span className="text-xs text-[#71717A] uppercase tracking-wider">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold text-[#FAFAFA] tabular-nums">{stat.value.toLocaleString()}</p>
                {stat.rate !== undefined && (
                  <p className={`text-xs mt-1 ${stat.color}`}>{stat.rate}% rate</p>
                )}
              </div>
            ))}
          </div>

          {/* Delivery Funnel + Engagement Pie */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Delivery Funnel */}
            <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5">
              <div className="flex items-center gap-2 mb-5">
                <BarChart3 className="h-4 w-4 text-[#71717A]" />
                <h3 className="text-[15px] font-semibold text-[#FAFAFA]">Delivery Funnel</h3>
              </div>
              <div className="space-y-3">
                {funnelSteps.map((step, i) => {
                  const maxVal = Math.max(...funnelSteps.map((s) => s.value), 1);
                  const pct = (step.value / maxVal) * 100;
                  return (
                    <div key={step.label}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <step.icon className="h-3.5 w-3.5" style={{ color: step.color }} />
                          <span className="text-xs text-[#A1A1AA]">{step.label}</span>
                        </div>
                        <span className="text-xs font-medium text-[#FAFAFA] tabular-nums">
                          {step.value.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-[#1F1F23] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%`, backgroundColor: step.color }}
                        />
                      </div>
                      {i > 0 && funnelSteps[i - 1].value > 0 && (
                        <p className="text-[10px] text-[#52525B] mt-0.5 text-right">
                          {((step.value / funnelSteps[i - 1].value) * 100).toFixed(1)}% conversion
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Engagement Distribution */}
            <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5">
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp className="h-4 w-4 text-[#71717A]" />
                <h3 className="text-[15px] font-semibold text-[#FAFAFA]">Engagement Distribution</h3>
              </div>
              {funnelData.length > 0 ? (
                <div className="flex items-center gap-6">
                  <div className="h-[200px] w-[200px] shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={funnelData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                          stroke="none"
                        >
                          {funnelData.map((entry, i) => (
                            <Cell key={i} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          content={({ active, payload }) => {
                            if (!active || !payload?.length) return null;
                            const d = payload[0].payload;
                            return (
                              <div className="rounded-lg border border-[#27272A] bg-[#1A1A1D] px-3 py-2 shadow-lg">
                                <p className="text-xs text-[#A1A1AA]">{d.name}</p>
                                <p className="text-sm font-semibold text-[#FAFAFA]">{d.value.toLocaleString()}</p>
                              </div>
                            );
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2 flex-1">
                    {funnelData.map((d) => (
                      <div key={d.name} className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-sm shrink-0" style={{ backgroundColor: d.color }} />
                        <span className="text-xs text-[#A1A1AA] flex-1">{d.name}</span>
                        <span className="text-xs font-medium text-[#FAFAFA] tabular-nums">{d.value.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[200px] text-sm text-[#52525B]">
                  No engagement data yet
                </div>
              )}
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-4">
              <p className="text-xs text-[#71717A] uppercase tracking-wider mb-1">Unsubscribed</p>
              <p className="text-xl font-bold text-[#FAFAFA] tabular-nums">{campaign.total_unsubscribed}</p>
              {rates && <p className="text-xs text-red-400 mt-0.5">{rates.unsubscribe_rate}%</p>}
            </div>
            <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-4">
              <p className="text-xs text-[#71717A] uppercase tracking-wider mb-1">Failed</p>
              <p className="text-xl font-bold text-[#FAFAFA] tabular-nums">{campaign.total_failed}</p>
            </div>
            <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-4">
              <p className="text-xs text-[#71717A] uppercase tracking-wider mb-1">Created</p>
              <p className="text-sm text-[#FAFAFA]">
                {new Date(campaign.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </p>
              {campaign.creator && <p className="text-xs text-[#52525B] mt-0.5">by {campaign.creator.name}</p>}
            </div>
            <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-4">
              <p className="text-xs text-[#71717A] uppercase tracking-wider mb-1">
                {campaign.completed_at ? "Completed" : campaign.scheduled_at ? "Scheduled" : "Started"}
              </p>
              <p className="text-sm text-[#FAFAFA]">
                {campaign.completed_at
                  ? new Date(campaign.completed_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
                  : campaign.started_at
                  ? new Date(campaign.started_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
                  : campaign.scheduled_at
                  ? new Date(campaign.scheduled_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
                  : "—"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recipients Tab */}
      {activeTab === "recipients" && (
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] overflow-hidden">
          <div className="px-5 py-3 border-b border-[#1F1F23]">
            <p className="text-xs text-[#71717A]">{messages.length} recipients shown</p>
          </div>
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Users className="h-8 w-8 text-[#52525B] mb-3" />
              <p className="text-sm text-[#71717A]">No recipients yet</p>
              <p className="text-xs text-[#52525B] mt-1">Recipients will appear here once the campaign is sent</p>
            </div>
          ) : (
            <div className="divide-y divide-[#1F1F23]">
              {messages.map((msg) => (
                <div key={msg.id} className="px-5 py-3 flex items-center justify-between hover:bg-[#1A1A1D] transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-8 w-8 rounded-full bg-[#6366F1]/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-semibold text-[#A5B4FC]">
                        {(msg.customer?.first_name?.[0] || "?").toUpperCase()}
                        {(msg.customer?.last_name?.[0] || "").toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-[#FAFAFA] truncate">
                        {msg.customer ? `${msg.customer.first_name} ${msg.customer.last_name}` : msg.to_address}
                      </p>
                      <p className="text-xs text-[#52525B] truncate">{msg.to_address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="hidden sm:flex items-center gap-3 text-[11px]">
                      {msg.sent_at && <span className="text-blue-400">Sent</span>}
                      {msg.delivered_at && <span className="text-cyan-400">Delivered</span>}
                      {msg.opened_at && <span className="text-emerald-400">Opened</span>}
                      {msg.clicked_at && <span className="text-indigo-400">Clicked</span>}
                      {msg.failed_at && <span className="text-red-400">Failed</span>}
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-[10px] uppercase tracking-wider ${messageStatusColors[msg.status] || "text-[#71717A]"}`}
                    >
                      {msg.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Content Tab */}
      {activeTab === "content" && (
        <div className="space-y-4">
          {campaign.type === "email" && campaign.body_html ? (
            <div className="rounded-xl border border-[#1F1F23] bg-[#111113] overflow-hidden">
              <div className="px-5 py-3 border-b border-[#1F1F23] flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#71717A]" />
                <span className="text-sm font-medium text-[#FAFAFA]">Email Preview</span>
                {campaign.subject && (
                  <span className="text-xs text-[#52525B] ml-2">Subject: {campaign.subject}</span>
                )}
              </div>
              <div className="p-5">
                <div className="rounded-lg border border-[#1F1F23] bg-white p-6 max-w-2xl mx-auto">
                  <div dangerouslySetInnerHTML={{ __html: campaign.body_html }} />
                </div>
              </div>
            </div>
          ) : campaign.body_text ? (
            <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="h-4 w-4 text-[#71717A]" />
                <span className="text-sm font-medium text-[#FAFAFA]">
                  {campaign.type === "sms" ? "SMS" : "Message"} Content
                </span>
              </div>
              {campaign.type === "sms" ? (
                <div className="flex justify-center">
                  <div className="w-[280px] rounded-[2rem] border-2 border-[#2A2A2E] bg-[#0A0A0B] p-3">
                    <div className="rounded-t-2xl bg-[#1A1A1D] px-4 py-2 text-center">
                      <p className="text-[10px] text-[#52525B]">SMS Preview</p>
                    </div>
                    <div className="min-h-[300px] bg-[#0A0A0B] p-4 flex flex-col justify-end">
                      <div className="bg-[#6366F1] rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[220px] ml-auto">
                        <p className="text-sm text-white whitespace-pre-wrap">{campaign.body_text}</p>
                      </div>
                      <p className="text-[10px] text-[#52525B] text-right mt-1">Now</p>
                    </div>
                  </div>
                </div>
              ) : (
                <pre className="text-sm text-[#A1A1AA] whitespace-pre-wrap font-mono bg-[#0A0A0B] rounded-lg p-4 border border-[#1F1F23]">
                  {campaign.body_text}
                </pre>
              )}
            </div>
          ) : (
            <div className="rounded-xl border border-[#1F1F23] bg-[#111113] flex flex-col items-center justify-center py-16">
              <p className="text-sm text-[#71717A]">No content available</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
