"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  MessageSquare,
  Phone,
  Globe,
  Tag,
  Calendar,
  Activity,
  TrendingUp,
  ShoppingCart,
  Eye,
  MousePointerClick,
  Clock,
  Zap,
  Send,
  User,
  Building,
  Hash,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";

interface Segment {
  id: number;
  name: string;
  type: string;
}

interface CustomerEvent {
  id: number;
  event_name: string;
  event_category: string | null;
  monetary_value: number | null;
  page_url: string | null;
  source: string | null;
  occurred_at: string;
}

interface CampaignMessage {
  id: number;
  channel: string;
  to_address: string;
  status: string;
  sent_at: string | null;
  delivered_at: string | null;
  opened_at: string | null;
  clicked_at: string | null;
  failed_at: string | null;
  campaign: { id: number; name: string; type: string; status: string } | null;
}

interface AutomationLog {
  id: number;
  status: string;
  created_at: string;
  automation: { id: number; name: string } | null;
}

interface Customer {
  id: number;
  uuid: string;
  email: string;
  phone: string | null;
  first_name: string;
  last_name: string;
  company_name: string | null;
  external_id: string | null;
  tags: string[];
  properties: Record<string, unknown>;
  rfm_segment: string | null;
  rfm_score: number | null;
  recency_score: number | null;
  frequency_score: number | null;
  monetary_score: number | null;
  clv_total: number;
  clv_predicted: number | null;
  clv_average_order: number | null;
  clv_order_count: number;
  total_events: number;
  first_seen_at: string | null;
  last_seen_at: string | null;
  last_activity_at: string | null;
  is_subscribed_email: boolean;
  is_subscribed_sms: boolean;
  created_at: string;
  segments: Segment[];
  events: CustomerEvent[];
}

const segmentColors: Record<string, string> = {
  champions: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  loyal: "bg-blue-400/10 text-blue-400 border-blue-400/20",
  potential: "bg-amber-400/10 text-amber-400 border-amber-400/20",
  "at risk": "bg-orange-400/10 text-orange-400 border-orange-400/20",
  lost: "bg-red-400/10 text-red-400 border-red-400/20",
  new: "bg-violet-400/10 text-violet-400 border-violet-400/20",
};

function getSegmentStyle(segment: string | null) {
  if (!segment) return "bg-[#1F1F23] text-[#71717A] border-[#2A2A2E]";
  const key = segment.toLowerCase();
  for (const [k, v] of Object.entries(segmentColors)) {
    if (key.includes(k)) return v;
  }
  return "bg-[#1F1F23] text-[#A1A1AA] border-[#2A2A2E]";
}

function formatCurrency(value: number) {
  return `€${Number(value || 0).toLocaleString("de-DE", { minimumFractionDigits: 2 })}`;
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function formatDateTime(dateStr: string | null) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
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
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

const messageStatusIcon: Record<string, { icon: typeof Send; color: string }> = {
  pending: { icon: Clock, color: "text-[#71717A]" },
  sent: { icon: Send, color: "text-blue-400" },
  delivered: { icon: Mail, color: "text-cyan-400" },
  opened: { icon: Eye, color: "text-emerald-400" },
  clicked: { icon: MousePointerClick, color: "text-indigo-400" },
  failed: { icon: Mail, color: "text-red-400" },
  bounced: { icon: Mail, color: "text-orange-400" },
};

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [campaignMessages, setCampaignMessages] = useState<CampaignMessage[]>([]);
  const [automationLogs, setAutomationLogs] = useState<AutomationLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "campaigns" | "events" | "automations">("overview");

  useEffect(() => {
    if (!params.id) return;
    api<{ customer: Customer; campaign_messages: CampaignMessage[]; automation_logs: AutomationLog[] }>(`/customers/${params.id}`)
      .then((res) => {
        setCustomer(res.customer);
        setCampaignMessages(res.campaign_messages);
        setAutomationLogs(res.automation_logs);
      })
      .catch(() => router.push("/dashboard/customers"))
      .finally(() => setLoading(false));
  }, [params.id, router]);

  if (loading || !customer) {
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

  const initials = `${customer.first_name?.[0] || ""}${customer.last_name?.[0] || ""}`.toUpperCase();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <button
          onClick={() => router.push("/dashboard/customers")}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-[#71717A] hover:text-[#A1A1AA] hover:bg-[#1F1F23] transition-colors mt-1"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex items-start gap-4 flex-1">
          <div className="h-14 w-14 rounded-2xl bg-[#6366F1]/10 border border-[#6366F1]/15 flex items-center justify-center shrink-0">
            <span className="text-lg font-bold text-[#A5B4FC]">{initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-[#FAFAFA]" style={{ letterSpacing: "-0.025em" }}>
              {customer.first_name} {customer.last_name}
            </h1>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="text-sm text-[#71717A] flex items-center gap-1">
                <Mail className="h-3.5 w-3.5" /> {customer.email}
              </span>
              {customer.phone && (
                <span className="text-sm text-[#71717A] flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5" /> {customer.phone}
                </span>
              )}
              {customer.company_name && (
                <span className="text-sm text-[#71717A] flex items-center gap-1">
                  <Building className="h-3.5 w-3.5" /> {customer.company_name}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className={`text-xs font-medium ${getSegmentStyle(customer.rfm_segment)}`}>
                {customer.rfm_segment || "Unscored"}
              </Badge>
              {customer.is_subscribed_email && (
                <Badge variant="outline" className="text-[10px] bg-emerald-400/10 text-emerald-400 border-emerald-400/20">Email Subscribed</Badge>
              )}
              {customer.is_subscribed_sms && (
                <Badge variant="outline" className="text-[10px] bg-blue-400/10 text-blue-400 border-blue-400/20">SMS Subscribed</Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Spend", value: formatCurrency(customer.clv_total), icon: ShoppingCart, color: "text-emerald-400" },
          { label: "Orders", value: customer.clv_order_count.toString(), icon: Hash, color: "text-blue-400" },
          { label: "Avg. Order", value: formatCurrency(customer.clv_average_order || 0), icon: TrendingUp, color: "text-amber-400" },
          { label: "Total Events", value: customer.total_events.toLocaleString(), icon: Activity, color: "text-indigo-400" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-[#1F1F23] bg-[#111113] p-4">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
              <span className="text-xs text-[#71717A] uppercase tracking-wider">{stat.label}</span>
            </div>
            <p className="text-xl font-bold text-[#FAFAFA] tabular-nums">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tab navigation */}
      <div className="flex items-center gap-1 border-b border-[#1F1F23]">
        {([
          { key: "overview", label: "Overview" },
          { key: "campaigns", label: `Campaigns (${campaignMessages.length})` },
          { key: "events", label: `Events (${customer.events?.length || 0})` },
          { key: "automations", label: `Automations (${automationLogs.length})` },
        ] as const).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab.key
                ? "text-[#FAFAFA] border-[#6366F1]"
                : "text-[#71717A] border-transparent hover:text-[#A1A1AA]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Customer Info */}
          <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5 space-y-4">
            <h3 className="text-[15px] font-semibold text-[#FAFAFA] flex items-center gap-2">
              <User className="h-4 w-4 text-[#71717A]" /> Customer Details
            </h3>
            <div className="space-y-3">
              {[
                { label: "External ID", value: customer.external_id || "—" },
                { label: "First Seen", value: formatDate(customer.first_seen_at) },
                { label: "Last Seen", value: customer.last_seen_at ? timeAgo(customer.last_seen_at) : "—" },
                { label: "Last Activity", value: customer.last_activity_at ? timeAgo(customer.last_activity_at) : "—" },
                { label: "Created", value: formatDate(customer.created_at) },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between">
                  <span className="text-xs text-[#71717A]">{row.label}</span>
                  <span className="text-sm text-[#FAFAFA]">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RFM Analysis */}
          <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5 space-y-4">
            <h3 className="text-[15px] font-semibold text-[#FAFAFA] flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#71717A]" /> RFM Analysis
            </h3>
            <div className="space-y-3">
              {[
                { label: "Recency Score", value: customer.recency_score, max: 5, color: "#34d399" },
                { label: "Frequency Score", value: customer.frequency_score, max: 5, color: "#60a5fa" },
                { label: "Monetary Score", value: customer.monetary_score, max: 5, color: "#fbbf24" },
              ].map((score) => (
                <div key={score.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#71717A]">{score.label}</span>
                    <span className="text-xs font-medium text-[#FAFAFA] tabular-nums">{score.value ?? "—"}/5</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#1F1F23] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${((score.value || 0) / score.max) * 100}%`, backgroundColor: score.color }}
                    />
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between pt-2 border-t border-[#1F1F23]">
                <span className="text-xs text-[#71717A]">RFM Score</span>
                <span className="text-sm font-bold text-[#FAFAFA] tabular-nums">{customer.rfm_score || "—"}</span>
              </div>
              {customer.clv_predicted && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#71717A]">Predicted CLV</span>
                  <span className="text-sm font-medium text-emerald-400">{formatCurrency(customer.clv_predicted)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Segments */}
          <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5 space-y-3">
            <h3 className="text-[15px] font-semibold text-[#FAFAFA] flex items-center gap-2">
              <Tag className="h-4 w-4 text-[#71717A]" /> Segments
            </h3>
            {customer.segments?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {customer.segments.map((seg) => (
                  <Badge key={seg.id} variant="outline" className="text-xs">
                    {seg.name}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#52525B]">Not assigned to any segments</p>
            )}

            {customer.tags?.length > 0 && (
              <>
                <h4 className="text-xs text-[#71717A] uppercase tracking-wider pt-2">Tags</h4>
                <div className="flex flex-wrap gap-1.5">
                  {customer.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-md bg-[#1F1F23] text-xs text-[#A1A1AA]">
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Subscription Status */}
          <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5 space-y-3">
            <h3 className="text-[15px] font-semibold text-[#FAFAFA] flex items-center gap-2">
              <Send className="h-4 w-4 text-[#71717A]" /> Communication Preferences
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#A1A1AA] flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Email
                </span>
                <Badge variant="outline" className={`text-[10px] ${customer.is_subscribed_email ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/20" : "bg-red-400/10 text-red-400 border-red-400/20"}`}>
                  {customer.is_subscribed_email ? "Subscribed" : "Unsubscribed"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#A1A1AA] flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" /> SMS
                </span>
                <Badge variant="outline" className={`text-[10px] ${customer.is_subscribed_sms ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/20" : "bg-red-400/10 text-red-400 border-red-400/20"}`}>
                  {customer.is_subscribed_sms ? "Subscribed" : "Unsubscribed"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Campaigns Tab */}
      {activeTab === "campaigns" && (
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] overflow-hidden">
          {campaignMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Send className="h-8 w-8 text-[#52525B] mb-3" />
              <p className="text-sm text-[#71717A]">No campaign interactions</p>
              <p className="text-xs text-[#52525B] mt-1">This customer hasn&apos;t received any campaigns yet</p>
            </div>
          ) : (
            <div className="divide-y divide-[#1F1F23]">
              {campaignMessages.map((msg) => {
                const statusMeta = messageStatusIcon[msg.status] || messageStatusIcon.pending;
                const StatusIcon = statusMeta.icon;
                return (
                  <div
                    key={msg.id}
                    onClick={() => msg.campaign && router.push(`/dashboard/campaigns/${msg.campaign.id}`)}
                    className="px-5 py-4 hover:bg-[#1A1A1D] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                          msg.channel === "email" ? "bg-blue-400/10" : msg.channel === "sms" ? "bg-emerald-400/10" : "bg-[#1F1F23]"
                        }`}>
                          {msg.channel === "email" ? <Mail className="h-4 w-4 text-blue-400" /> :
                           msg.channel === "sms" ? <MessageSquare className="h-4 w-4 text-emerald-400" /> :
                           <Phone className="h-4 w-4 text-[#71717A]" />}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-[#FAFAFA] truncate">
                            {msg.campaign?.name || "Unknown Campaign"}
                          </p>
                          <p className="text-xs text-[#52525B]">
                            {msg.to_address} · {msg.channel}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="hidden sm:flex items-center gap-2 text-[11px]">
                          {msg.sent_at && <span className="text-blue-400">Sent {timeAgo(msg.sent_at)}</span>}
                          {msg.opened_at && <span className="text-emerald-400">Opened</span>}
                          {msg.clicked_at && <span className="text-indigo-400">Clicked</span>}
                        </div>
                        <StatusIcon className={`h-4 w-4 ${statusMeta.color}`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Events Tab */}
      {activeTab === "events" && (
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] overflow-hidden">
          {!customer.events?.length ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Activity className="h-8 w-8 text-[#52525B] mb-3" />
              <p className="text-sm text-[#71717A]">No events recorded</p>
            </div>
          ) : (
            <div className="divide-y divide-[#1F1F23]">
              {customer.events.map((event) => (
                <div key={event.id} className="px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-8 w-8 rounded-lg bg-[#1F1F23] flex items-center justify-center shrink-0">
                      {event.event_name === "pageview" ? <Globe className="h-4 w-4 text-[#71717A]" /> :
                       event.monetary_value ? <ShoppingCart className="h-4 w-4 text-emerald-400" /> :
                       <Activity className="h-4 w-4 text-[#52525B]" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-[#FAFAFA] font-medium truncate">{event.event_name}</p>
                      <div className="flex items-center gap-2">
                        {event.event_category && (
                          <span className="text-xs text-[#52525B]">{event.event_category}</span>
                        )}
                        {event.page_url && (
                          <span className="text-xs text-[#52525B] truncate max-w-[200px]">{event.page_url}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {event.monetary_value && (
                      <span className="text-sm font-medium text-emerald-400 tabular-nums">
                        {formatCurrency(event.monetary_value)}
                      </span>
                    )}
                    <span className="text-xs text-[#52525B]">{timeAgo(event.occurred_at)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Automations Tab */}
      {activeTab === "automations" && (
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] overflow-hidden">
          {automationLogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Zap className="h-8 w-8 text-[#52525B] mb-3" />
              <p className="text-sm text-[#71717A]">No automation history</p>
            </div>
          ) : (
            <div className="divide-y divide-[#1F1F23]">
              {automationLogs.map((log) => (
                <div key={log.id} className="px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                      log.status === "completed" ? "bg-emerald-400/10" : log.status === "failed" ? "bg-red-400/10" : "bg-amber-400/10"
                    }`}>
                      <Zap className={`h-4 w-4 ${
                        log.status === "completed" ? "text-emerald-400" : log.status === "failed" ? "text-red-400" : "text-amber-400"
                      }`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#FAFAFA]">{log.automation?.name || "Unknown"}</p>
                      <p className="text-xs text-[#52525B]">Status: {log.status}</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#52525B]">{formatDateTime(log.created_at)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
