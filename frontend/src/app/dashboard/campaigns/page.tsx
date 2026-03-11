"use client";

import { useState, useEffect } from "react";
import { Plus, Mail, MessageSquare, Phone, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";

interface Campaign {
  id: string;
  name: string;
  type: "email" | "sms" | "call_list";
  status: "draft" | "scheduled" | "sending" | "sent" | "paused";
  subject: string | null;
  total_sent: number;
  total_opened: number;
  total_clicked: number;
  scheduled_at: string | null;
  completed_at: string | null;
  created_at: string;
}

const typeIcons = { email: Mail, sms: MessageSquare, call_list: Phone };
const statusColors: Record<string, string> = {
  draft: "bg-[#1F1F23] text-[#71717A] border-[#2A2A2E]",
  scheduled: "bg-blue-400/10 text-blue-400 border-blue-400/20",
  sending: "bg-amber-400/10 text-amber-400 border-amber-400/20",
  sent: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  paused: "bg-orange-400/10 text-orange-400 border-orange-400/20",
};

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<{ data: Campaign[] }>("/campaigns")
      .then((res) => setCampaigns(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#FAFAFA]" style={{ letterSpacing: "-0.025em" }}>
            Campaigns
          </h1>
          <p className="text-sm text-[#71717A] mt-1">
            Create and manage outreach campaigns
          </p>
        </div>
        <button className="h-9 px-4 rounded-lg bg-[#6366F1] hover:bg-[#5558E6] text-white text-sm font-medium transition-colors flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Campaign
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5 animate-pulse">
              <div className="h-4 w-40 bg-[#1F1F23] rounded mb-2" />
              <div className="h-3 w-24 bg-[#1F1F23] rounded" />
            </div>
          ))}
        </div>
      ) : campaigns.length === 0 ? (
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] flex flex-col items-center justify-center py-16">
          <div className="h-12 w-12 rounded-full bg-[#6366F1]/10 flex items-center justify-center mb-4">
            <Send className="h-6 w-6 text-[#6366F1]" />
          </div>
          <p className="text-sm text-[#71717A]">No campaigns yet</p>
          <p className="text-xs text-[#52525B] mt-1">Create your first campaign to reach customers</p>
        </div>
      ) : (
        <div className="space-y-3">
          {campaigns.map((campaign) => {
            const Icon = typeIcons[campaign.type] || Mail;
            return (
              <div
                key={campaign.id}
                className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5 hover:border-[#2A2A2E] transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-[#6366F1]/10 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-[#6366F1]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-[#FAFAFA]">{campaign.name}</h3>
                      {campaign.subject && (
                        <p className="text-xs text-[#52525B] mt-0.5">{campaign.subject}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-4 text-xs text-[#52525B]">
                      <span className="tabular-nums">{campaign.total_sent.toLocaleString()} sent</span>
                      <span className="tabular-nums">{campaign.total_opened.toLocaleString()} opened</span>
                      <span className="tabular-nums">{campaign.total_clicked.toLocaleString()} clicked</span>
                    </div>
                    <Badge variant="outline" className={`text-[10px] uppercase tracking-wider ${statusColors[campaign.status] || ""}`}>
                      {campaign.status}
                    </Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
