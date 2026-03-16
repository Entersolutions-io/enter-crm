"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  MessageSquare,
  Phone,
  Send,
  Eye,
  Code,
  Smartphone,
  Loader2,
  Check,
  Users,
  Calendar,
  FileText,
  Sparkles,
  Megaphone,
  DollarSign,
  Target,
  BarChart3,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";

interface Segment {
  id: number;
  name: string;
  type: string;
  customer_count: number;
}

type CampaignType = "email" | "sms" | "call_list" | "ads";
type AdPlatform = "google" | "meta" | "tiktok" | "linkedin" | "twitter";
type Step = "type" | "content" | "audience" | "review";

const AD_PLATFORMS: { id: AdPlatform; name: string; color: string }[] = [
  { id: "google", name: "Google Ads", color: "#4285F4" },
  { id: "meta", name: "Meta Ads", color: "#0668E1" },
  { id: "tiktok", name: "TikTok Ads", color: "#010101" },
  { id: "linkedin", name: "LinkedIn Ads", color: "#0A66C2" },
  { id: "twitter", name: "X (Twitter) Ads", color: "#1DA1F2" },
];

const EMAIL_TEMPLATES = [
  {
    id: "welcome",
    name: "Welcome Email",
    subject: "Welcome to {{company}}!",
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
  <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 16px;">Welcome aboard!</h1>
  <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">We're thrilled to have you join us. Here's what you can expect:</p>
  <ul style="color: #4a4a4a; font-size: 16px; line-height: 1.8;">
    <li>Personalized recommendations based on your interests</li>
    <li>Exclusive offers and early access to new features</li>
    <li>Weekly insights and tips</li>
  </ul>
  <a href="#" style="display: inline-block; margin-top: 20px; padding: 12px 32px; background-color: #6366F1; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">Get Started</a>
  <p style="color: #9a9a9a; font-size: 12px; margin-top: 40px;">If you have any questions, reply to this email.</p>
</div>`,
  },
  {
    id: "promotion",
    name: "Promotional Offer",
    subject: "Special offer just for you!",
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; text-align: center;">
  <p style="color: #6366F1; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Limited Time Offer</p>
  <h1 style="color: #1a1a1a; font-size: 32px; margin-bottom: 16px;">Save 20% Today</h1>
  <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; max-width: 400px; margin: 0 auto 24px;">As a valued customer, we're offering you an exclusive discount on your next purchase.</p>
  <a href="#" style="display: inline-block; padding: 14px 40px; background-color: #6366F1; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">Claim Your Discount</a>
  <p style="color: #9a9a9a; font-size: 13px; margin-top: 32px;">Offer expires in 48 hours. Terms apply.</p>
</div>`,
  },
  {
    id: "winback",
    name: "Win-Back",
    subject: "We miss you!",
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
  <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 16px;">It's been a while...</h1>
  <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">We noticed you haven't visited us recently. We've been making improvements and would love to have you back.</p>
  <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">Here's what's new:</p>
  <div style="background: #f8f8fa; border-radius: 12px; padding: 20px; margin: 20px 0;">
    <p style="color: #1a1a1a; font-weight: 600; margin-bottom: 8px;">New features & improvements</p>
    <p style="color: #6a6a6a; font-size: 14px; line-height: 1.6;">We've added powerful analytics, improved automation workflows, and much more.</p>
  </div>
  <a href="#" style="display: inline-block; margin-top: 8px; padding: 12px 32px; background-color: #6366F1; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">Come Back & Explore</a>
</div>`,
  },
  {
    id: "blank",
    name: "Blank Template",
    subject: "",
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
  <h1 style="color: #1a1a1a;">Your heading here</h1>
  <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">Start writing your email content...</p>
</div>`,
  },
];

const SMS_TEMPLATES = [
  { id: "promo", name: "Promotional", text: "Hi {{name}}! Don't miss our exclusive offer - save 20% on your next purchase. Use code SAVE20 at checkout. Reply STOP to opt out." },
  { id: "reminder", name: "Appointment Reminder", text: "Hi {{name}}, this is a reminder about your upcoming appointment on {{date}}. Reply YES to confirm or call us to reschedule." },
  { id: "update", name: "Status Update", text: "Hi {{name}}, your order #{{order_id}} has been shipped! Track it here: {{link}}. Questions? Reply to this message." },
  { id: "blank", name: "Blank", text: "" },
];

export default function NewCampaignPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("type");
  const [campaignType, setCampaignType] = useState<CampaignType | null>(null);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [bodyHtml, setBodyHtml] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [segmentId, setSegmentId] = useState<number | null>(null);
  const [scheduledAt, setScheduledAt] = useState("");
  const [segments, setSegments] = useState<Segment[]>([]);
  const [saving, setSaving] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<"code" | "preview">("preview");
  const [adPlatform, setAdPlatform] = useState<AdPlatform | null>(null);
  const [adAccountId, setAdAccountId] = useState("");
  const [adBudget, setAdBudget] = useState("");
  const [adHeadline, setAdHeadline] = useState("");
  const [adDescription, setAdDescription] = useState("");
  const [adTargeting, setAdTargeting] = useState("");

  useEffect(() => {
    api<{ data: Segment[] }>("/segments")
      .then((res) => setSegments(res.data))
      .catch(() => {});
  }, []);

  const steps: Step[] = ["type", "content", "audience", "review"];
  const currentStepIndex = steps.indexOf(step);

  const canProceed = () => {
    switch (step) {
      case "type":
        return campaignType !== null && name.trim().length > 0;
      case "content":
        if (campaignType === "email") return subject.trim().length > 0 && bodyHtml.trim().length > 0;
        if (campaignType === "sms") return bodyText.trim().length > 0;
        if (campaignType === "ads") return adPlatform !== null && adHeadline.trim().length > 0;
        return true;
      case "audience":
        return true;
      default:
        return true;
    }
  };

  const handleCreate = async (asDraft = true) => {
    setSaving(true);
    try {
      const payload: Record<string, unknown> = {
        name,
        type: campaignType,
        subject: campaignType === "email" ? subject : null,
        body_html: campaignType === "email" ? bodyHtml : null,
        body_text: bodyText || null,
        segment_id: segmentId,
        scheduled_at: scheduledAt || null,
        ...(campaignType === "ads" ? {
          ad_platform: adPlatform,
          ad_account_id: adAccountId || null,
          ad_spend: adBudget ? parseFloat(adBudget) : null,
          ad_creatives: {
            headline: adHeadline,
            description: adDescription,
          },
          target_audience: adTargeting ? { description: adTargeting } : null,
        } : {}),
      };

      const created = await api<{ id: number }>("/campaigns", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!asDraft && created.id) {
        await api(`/campaigns/${created.id}/send`, { method: "POST" });
      }

      router.push("/dashboard/campaigns");
    } catch {
      setSaving(false);
    }
  };

  const selectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    if (campaignType === "email") {
      const tmpl = EMAIL_TEMPLATES.find((t) => t.id === templateId);
      if (tmpl) {
        setBodyHtml(tmpl.html);
        if (tmpl.subject && !subject) setSubject(tmpl.subject);
      }
    } else if (campaignType === "sms") {
      const tmpl = SMS_TEMPLATES.find((t) => t.id === templateId);
      if (tmpl) setBodyText(tmpl.text);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/dashboard/campaigns")}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-[#71717A] hover:text-[#A1A1AA] hover:bg-[#1F1F23] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-[#FAFAFA]" style={{ letterSpacing: "-0.025em" }}>
            New Campaign
          </h1>
          <p className="text-xs text-[#71717A] mt-0.5">
            Step {currentStepIndex + 1} of {steps.length}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`h-1.5 flex-1 rounded-full transition-colors ${i <= currentStepIndex ? "bg-[#6366F1]" : "bg-[#1F1F23]"}`} />
          </div>
        ))}
      </div>

      {/* Step: Type Selection */}
      {step === "type" && (
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium text-[#FAFAFA] block mb-2">Campaign Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Spring Sale Campaign"
              className="w-full h-10 rounded-lg border border-[#1F1F23] bg-[#111113] px-3 text-sm text-[#FAFAFA] placeholder:text-[#52525B] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition-colors"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#FAFAFA] block mb-3">Campaign Type</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {([
                { type: "email" as CampaignType, icon: Mail, label: "Email Campaign", desc: "Send HTML or plain text emails" },
                { type: "sms" as CampaignType, icon: MessageSquare, label: "SMS Campaign", desc: "Send text messages to customers" },
                { type: "call_list" as CampaignType, icon: Phone, label: "Call List", desc: "Generate a call list for your team" },
                { type: "ads" as CampaignType, icon: Megaphone, label: "Ad Campaign", desc: "Track Google, Meta, TikTok & other ads" },
              ]).map((item) => (
                <button
                  key={item.type}
                  onClick={() => setCampaignType(item.type)}
                  className={`rounded-xl border p-5 text-left transition-all ${
                    campaignType === item.type
                      ? "border-[#6366F1] bg-[#6366F1]/5 ring-1 ring-[#6366F1]"
                      : "border-[#1F1F23] bg-[#111113] hover:border-[#2A2A2E]"
                  }`}
                >
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-3 ${
                    campaignType === item.type ? "bg-[#6366F1]/15" : "bg-[#1F1F23]"
                  }`}>
                    <item.icon className={`h-5 w-5 ${campaignType === item.type ? "text-[#6366F1]" : "text-[#71717A]"}`} />
                  </div>
                  <p className="text-sm font-medium text-[#FAFAFA]">{item.label}</p>
                  <p className="text-xs text-[#52525B] mt-0.5">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step: Content */}
      {step === "content" && campaignType === "email" && (
        <div className="space-y-4">
          {/* Subject */}
          <div>
            <label className="text-sm font-medium text-[#FAFAFA] block mb-2">Subject Line</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter email subject..."
              className="w-full h-10 rounded-lg border border-[#1F1F23] bg-[#111113] px-3 text-sm text-[#FAFAFA] placeholder:text-[#52525B] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition-colors"
            />
          </div>

          {/* Templates */}
          {!selectedTemplate && (
            <div>
              <label className="text-sm font-medium text-[#FAFAFA] block mb-3">
                <Sparkles className="h-4 w-4 inline mr-1.5 text-[#6366F1]" />
                Start with a template
              </label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {EMAIL_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => selectTemplate(tmpl.id)}
                    className="rounded-xl border border-[#1F1F23] bg-[#111113] p-4 text-left hover:border-[#2A2A2E] transition-colors group"
                  >
                    <div className="h-16 rounded-lg bg-[#0A0A0B] border border-[#1F1F23] mb-3 overflow-hidden">
                      <div className="h-full w-full scale-[0.25] origin-top-left" style={{ width: "400%" }}>
                        <div dangerouslySetInnerHTML={{ __html: tmpl.html }} />
                      </div>
                    </div>
                    <p className="text-xs font-medium text-[#FAFAFA] group-hover:text-[#6366F1] transition-colors">{tmpl.name}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Editor + Preview */}
          {(selectedTemplate || bodyHtml) && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-[#FAFAFA]">Email Content</label>
                <div className="flex items-center gap-1 rounded-lg bg-[#1A1A1D] border border-[#27272A] p-0.5 text-[12px]">
                  <button
                    onClick={() => setPreviewMode("code")}
                    className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-colors ${
                      previewMode === "code" ? "bg-[#111113] text-[#FAFAFA] font-medium" : "text-[#71717A] hover:text-[#A1A1AA]"
                    }`}
                  >
                    <Code className="h-3 w-3" /> Code
                  </button>
                  <button
                    onClick={() => setPreviewMode("preview")}
                    className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-colors ${
                      previewMode === "preview" ? "bg-[#111113] text-[#FAFAFA] font-medium" : "text-[#71717A] hover:text-[#A1A1AA]"
                    }`}
                  >
                    <Eye className="h-3 w-3" /> Preview
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Code Editor */}
                <div className={`${previewMode === "preview" ? "hidden lg:block" : ""}`}>
                  <div className="rounded-xl border border-[#1F1F23] bg-[#0A0A0B] overflow-hidden">
                    <div className="px-3 py-2 border-b border-[#1F1F23] flex items-center gap-2">
                      <Code className="h-3.5 w-3.5 text-[#52525B]" />
                      <span className="text-[11px] text-[#52525B] uppercase tracking-wider">HTML Editor</span>
                    </div>
                    <textarea
                      value={bodyHtml}
                      onChange={(e) => setBodyHtml(e.target.value)}
                      rows={20}
                      spellCheck={false}
                      className="w-full bg-transparent text-sm text-[#A1A1AA] font-mono p-4 focus:outline-none resize-none leading-relaxed"
                      placeholder="<div>Write your HTML here...</div>"
                    />
                  </div>
                </div>

                {/* Live Preview */}
                <div className={`${previewMode === "code" ? "hidden lg:block" : ""}`}>
                  <div className="rounded-xl border border-[#1F1F23] bg-[#111113] overflow-hidden">
                    <div className="px-3 py-2 border-b border-[#1F1F23] flex items-center gap-2">
                      <Eye className="h-3.5 w-3.5 text-[#52525B]" />
                      <span className="text-[11px] text-[#52525B] uppercase tracking-wider">Email Preview</span>
                    </div>
                    {/* Browser-like chrome */}
                    <div className="px-3 py-2 border-b border-[#1F1F23] bg-[#0E0E10]">
                      <div className="flex items-center gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/40" />
                        <div className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]/40" />
                        <div className="h-2.5 w-2.5 rounded-full bg-[#22c55e]/40" />
                        <div className="flex-1 mx-3 h-6 rounded-md bg-[#1F1F23] flex items-center px-2">
                          <span className="text-[10px] text-[#52525B]">mail.example.com</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white min-h-[400px] max-h-[600px] overflow-auto">
                      {bodyHtml ? (
                        <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
                      ) : (
                        <div className="flex items-center justify-center h-[400px] text-sm text-gray-400">
                          Your email preview will appear here
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Plain text version */}
              <div className="mt-4">
                <label className="text-xs text-[#71717A] block mb-1.5">Plain Text Version (optional)</label>
                <textarea
                  value={bodyText}
                  onChange={(e) => setBodyText(e.target.value)}
                  rows={3}
                  placeholder="Plain text fallback for email clients that don't support HTML..."
                  className="w-full rounded-lg border border-[#1F1F23] bg-[#111113] p-3 text-sm text-[#A1A1AA] placeholder:text-[#52525B] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition-colors resize-none"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step: Content - SMS */}
      {step === "content" && campaignType === "sms" && (
        <div className="space-y-4">
          {/* Templates */}
          {!selectedTemplate && (
            <div>
              <label className="text-sm font-medium text-[#FAFAFA] block mb-3">
                <Sparkles className="h-4 w-4 inline mr-1.5 text-[#6366F1]" />
                Start with a template
              </label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {SMS_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => selectTemplate(tmpl.id)}
                    className="rounded-xl border border-[#1F1F23] bg-[#111113] p-4 text-left hover:border-[#2A2A2E] transition-colors"
                  >
                    <MessageSquare className="h-4 w-4 text-[#52525B] mb-2" />
                    <p className="text-xs font-medium text-[#FAFAFA]">{tmpl.name}</p>
                    <p className="text-[11px] text-[#52525B] mt-0.5 line-clamp-2">{tmpl.text || "Empty message"}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SMS Editor + Phone Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Editor */}
            <div>
              <label className="text-sm font-medium text-[#FAFAFA] block mb-2">Message Content</label>
              <textarea
                value={bodyText}
                onChange={(e) => setBodyText(e.target.value)}
                rows={8}
                maxLength={640}
                placeholder="Type your SMS message..."
                className="w-full rounded-lg border border-[#1F1F23] bg-[#111113] p-3 text-sm text-[#FAFAFA] placeholder:text-[#52525B] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition-colors resize-none"
              />
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-[#52525B]">
                  Variables: {"{{name}}"}, {"{{email}}"}, {"{{company}}"}
                </p>
                <p className={`text-xs tabular-nums ${bodyText.length > 160 ? "text-amber-400" : "text-[#52525B]"}`}>
                  {bodyText.length}/160 {bodyText.length > 160 && `(${Math.ceil(bodyText.length / 160)} segments)`}
                </p>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="flex justify-center">
              <div className="w-[280px]">
                <div className="rounded-[2.5rem] border-[3px] border-[#2A2A2E] bg-[#0A0A0B] overflow-hidden shadow-2xl">
                  {/* Phone notch */}
                  <div className="flex justify-center pt-2 pb-1 bg-[#0A0A0B]">
                    <div className="h-5 w-28 rounded-full bg-[#1F1F23]" />
                  </div>
                  {/* Status bar */}
                  <div className="px-6 py-1 flex items-center justify-between">
                    <span className="text-[10px] text-[#71717A]">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="h-2.5 w-4 rounded-sm border border-[#71717A]">
                        <div className="h-full w-3/4 bg-[#71717A] rounded-sm" />
                      </div>
                    </div>
                  </div>
                  {/* Messages header */}
                  <div className="px-4 py-3 border-b border-[#1F1F23] text-center">
                    <p className="text-xs text-[#71717A]">Messages</p>
                    <p className="text-sm font-medium text-[#FAFAFA] mt-0.5">{name || "Your Company"}</p>
                  </div>
                  {/* Messages area */}
                  <div className="min-h-[350px] bg-[#0A0A0B] p-4 flex flex-col justify-end">
                    {bodyText ? (
                      <>
                        <div className="bg-[#1F1F23] rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[220px]">
                          <p className="text-sm text-[#FAFAFA] whitespace-pre-wrap break-words">{bodyText}</p>
                        </div>
                        <p className="text-[10px] text-[#52525B] mt-1">Now</p>
                      </>
                    ) : (
                      <p className="text-xs text-[#52525B] text-center">Your message will appear here</p>
                    )}
                  </div>
                  {/* Phone home indicator */}
                  <div className="flex justify-center py-2 bg-[#0A0A0B]">
                    <div className="h-1 w-24 rounded-full bg-[#2A2A2E]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step: Content - Call List */}
      {step === "content" && campaignType === "call_list" && (
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-[#6366F1]/10 flex items-center justify-center">
              <Phone className="h-5 w-5 text-[#6366F1]" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#FAFAFA]">Call List Campaign</h3>
              <p className="text-xs text-[#52525B]">A list of customers to call will be generated based on your audience selection</p>
            </div>
          </div>
          <div>
            <label className="text-xs text-[#71717A] block mb-1.5">Call Script / Notes (optional)</label>
            <textarea
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
              rows={6}
              placeholder="Add talking points or a call script for your team..."
              className="w-full rounded-lg border border-[#1F1F23] bg-[#0A0A0B] p-3 text-sm text-[#A1A1AA] placeholder:text-[#52525B] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition-colors resize-none"
            />
          </div>
        </div>
      )}

      {/* Step: Content - Ads */}
      {step === "content" && campaignType === "ads" && (
        <div className="space-y-6">
          {/* Platform selection */}
          <div>
            <label className="text-sm font-medium text-[#FAFAFA] block mb-3">Ad Platform</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {AD_PLATFORMS.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => setAdPlatform(platform.id)}
                  className={`rounded-xl border p-4 text-center transition-all ${
                    adPlatform === platform.id
                      ? "border-[#6366F1] bg-[#6366F1]/5 ring-1 ring-[#6366F1]"
                      : "border-[#1F1F23] bg-[#111113] hover:border-[#2A2A2E]"
                  }`}
                >
                  <div
                    className="h-8 w-8 rounded-lg mx-auto mb-2 flex items-center justify-center"
                    style={{ backgroundColor: `${platform.color}15` }}
                  >
                    <Megaphone className="h-4 w-4" style={{ color: platform.color }} />
                  </div>
                  <p className="text-xs font-medium text-[#FAFAFA]">{platform.name}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Ad content */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#FAFAFA] block mb-2">Ad Headline</label>
                <input
                  value={adHeadline}
                  onChange={(e) => setAdHeadline(e.target.value)}
                  maxLength={90}
                  placeholder="Write a compelling headline..."
                  className="w-full h-10 rounded-lg border border-[#1F1F23] bg-[#111113] px-3 text-sm text-[#FAFAFA] placeholder:text-[#52525B] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition-colors"
                />
                <p className="text-xs text-[#52525B] mt-1 text-right">{adHeadline.length}/90</p>
              </div>

              <div>
                <label className="text-sm font-medium text-[#FAFAFA] block mb-2">Ad Description</label>
                <textarea
                  value={adDescription}
                  onChange={(e) => setAdDescription(e.target.value)}
                  rows={4}
                  maxLength={300}
                  placeholder="Describe your offer or product..."
                  className="w-full rounded-lg border border-[#1F1F23] bg-[#111113] p-3 text-sm text-[#FAFAFA] placeholder:text-[#52525B] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition-colors resize-none"
                />
                <p className="text-xs text-[#52525B] mt-1 text-right">{adDescription.length}/300</p>
              </div>

              <div>
                <label className="text-sm font-medium text-[#FAFAFA] block mb-2">
                  <Target className="h-4 w-4 inline mr-1.5 text-[#71717A]" />
                  Target Audience Description
                </label>
                <textarea
                  value={adTargeting}
                  onChange={(e) => setAdTargeting(e.target.value)}
                  rows={3}
                  placeholder="e.g. Males 25-45, interested in technology, urban areas..."
                  className="w-full rounded-lg border border-[#1F1F23] bg-[#111113] p-3 text-sm text-[#A1A1AA] placeholder:text-[#52525B] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#71717A] block mb-1.5">Ad Account ID (optional)</label>
                  <input
                    value={adAccountId}
                    onChange={(e) => setAdAccountId(e.target.value)}
                    placeholder="act_123456789"
                    className="w-full h-9 rounded-lg border border-[#1F1F23] bg-[#111113] px-3 text-sm text-[#FAFAFA] placeholder:text-[#52525B] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#71717A] block mb-1.5">Daily Budget (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={adBudget}
                    onChange={(e) => setAdBudget(e.target.value)}
                    placeholder="50.00"
                    className="w-full h-9 rounded-lg border border-[#1F1F23] bg-[#111113] px-3 text-sm text-[#FAFAFA] placeholder:text-[#52525B] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Ad Preview */}
            <div>
              <label className="text-sm font-medium text-[#FAFAFA] block mb-2">Ad Preview</label>
              <div className="rounded-xl border border-[#1F1F23] bg-[#111113] overflow-hidden">
                {/* Search ad preview */}
                {(adPlatform === "google" || !adPlatform) && (
                  <div className="p-5 space-y-4">
                    <p className="text-[10px] text-[#52525B] uppercase tracking-wider">Google Search Ad Preview</p>
                    <div className="rounded-lg bg-white p-4 space-y-1">
                      <p className="text-[11px] text-gray-500">Ad · yourwebsite.com</p>
                      <p className="text-[#1a0dab] text-base font-medium hover:underline cursor-pointer">
                        {adHeadline || "Your Ad Headline Here"}
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {adDescription || "Your ad description will appear here. Write something compelling to attract clicks."}
                      </p>
                    </div>
                  </div>
                )}

                {/* Social ad preview */}
                {(adPlatform === "meta" || adPlatform === "tiktok" || adPlatform === "linkedin" || adPlatform === "twitter") && (
                  <div className="p-5 space-y-4">
                    <p className="text-[10px] text-[#52525B] uppercase tracking-wider">
                      {AD_PLATFORMS.find((p) => p.id === adPlatform)?.name} Preview
                    </p>
                    <div className="rounded-lg border border-[#2A2A2E] bg-[#0A0A0B] overflow-hidden">
                      <div className="px-4 py-3 flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-[#6366F1]/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-[#A5B4FC]">ES</span>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-[#FAFAFA]">{name || "Your Company"}</p>
                          <p className="text-[10px] text-[#52525B]">Sponsored</p>
                        </div>
                      </div>
                      <div className="h-40 bg-[#1F1F23] flex items-center justify-center">
                        <BarChart3 className="h-8 w-8 text-[#52525B]" />
                      </div>
                      <div className="px-4 py-3">
                        <p className="text-sm font-medium text-[#FAFAFA]">{adHeadline || "Your headline"}</p>
                        <p className="text-xs text-[#71717A] mt-1 line-clamp-2">
                          {adDescription || "Your description here"}
                        </p>
                      </div>
                      <div className="px-4 py-2 border-t border-[#1F1F23]">
                        <button className="w-full py-1.5 rounded-lg bg-[#6366F1] text-xs font-medium text-white">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Budget info */}
                {adBudget && (
                  <div className="px-5 py-3 border-t border-[#1F1F23]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#71717A]">Daily Budget</span>
                      <span className="text-[#FAFAFA] font-medium">€{parseFloat(adBudget).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs mt-1">
                      <span className="text-[#71717A]">Est. Monthly</span>
                      <span className="text-[#FAFAFA] font-medium">€{(parseFloat(adBudget) * 30).toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step: Audience */}
      {step === "audience" && (
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium text-[#FAFAFA] block mb-3">
              <Users className="h-4 w-4 inline mr-1.5 text-[#71717A]" />
              Target Segment
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <button
                onClick={() => setSegmentId(null)}
                className={`rounded-xl border p-4 text-left transition-all ${
                  segmentId === null
                    ? "border-[#6366F1] bg-[#6366F1]/5 ring-1 ring-[#6366F1]"
                    : "border-[#1F1F23] bg-[#111113] hover:border-[#2A2A2E]"
                }`}
              >
                <Users className="h-5 w-5 text-[#71717A] mb-2" />
                <p className="text-sm font-medium text-[#FAFAFA]">All Customers</p>
                <p className="text-xs text-[#52525B] mt-0.5">Send to everyone</p>
              </button>
              {segments.map((seg) => (
                <button
                  key={seg.id}
                  onClick={() => setSegmentId(seg.id)}
                  className={`rounded-xl border p-4 text-left transition-all ${
                    segmentId === seg.id
                      ? "border-[#6366F1] bg-[#6366F1]/5 ring-1 ring-[#6366F1]"
                      : "border-[#1F1F23] bg-[#111113] hover:border-[#2A2A2E]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-[10px]">{seg.type}</Badge>
                    <span className="text-xs text-[#52525B] tabular-nums">{seg.customer_count} customers</span>
                  </div>
                  <p className="text-sm font-medium text-[#FAFAFA]">{seg.name}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-[#FAFAFA] block mb-2">
              <Calendar className="h-4 w-4 inline mr-1.5 text-[#71717A]" />
              Schedule (optional)
            </label>
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="w-full max-w-xs h-10 rounded-lg border border-[#1F1F23] bg-[#111113] px-3 text-sm text-[#FAFAFA] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition-colors [color-scheme:dark]"
            />
            <p className="text-xs text-[#52525B] mt-1">Leave empty to save as draft</p>
          </div>
        </div>
      )}

      {/* Step: Review */}
      {step === "review" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-[#1F1F23] bg-[#111113] divide-y divide-[#1F1F23]">
            {[
              { label: "Name", value: name },
              { label: "Type", value: campaignType === "ads" ? `Ad Campaign (${AD_PLATFORMS.find(p => p.id === adPlatform)?.name || adPlatform})` : campaignType },
              ...(campaignType === "ads" ? [
                { label: "Headline", value: adHeadline || "—" },
                { label: "Daily Budget", value: adBudget ? `€${parseFloat(adBudget).toFixed(2)}` : "—" },
                { label: "Targeting", value: adTargeting || "Not specified" },
              ] : [
                { label: "Subject", value: subject || "—" },
              ]),
              { label: "Audience", value: segmentId ? segments.find((s) => s.id === segmentId)?.name : "All Customers" },
              { label: "Schedule", value: scheduledAt ? new Date(scheduledAt).toLocaleString() : "Save as draft" },
              ...(campaignType !== "ads" ? [
                { label: "Content", value: campaignType === "email" ? `${bodyHtml.length} chars HTML` : `${bodyText.length} chars text` },
              ] : []),
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between px-5 py-3">
                <span className="text-xs text-[#71717A] uppercase tracking-wider">{row.label}</span>
                <span className="text-sm text-[#FAFAFA]">{row.value}</span>
              </div>
            ))}
          </div>

          {/* Content preview */}
          {campaignType === "email" && bodyHtml && (
            <div className="rounded-xl border border-[#1F1F23] bg-[#111113] overflow-hidden">
              <div className="px-4 py-2 border-b border-[#1F1F23]">
                <span className="text-xs text-[#52525B]">Email Preview</span>
              </div>
              <div className="bg-white max-h-[300px] overflow-auto">
                <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
              </div>
            </div>
          )}

          {campaignType === "sms" && bodyText && (
            <div className="flex justify-center">
              <div className="w-[240px] rounded-[2rem] border-2 border-[#2A2A2E] bg-[#0A0A0B] p-3">
                <div className="px-4 py-2 text-center border-b border-[#1F1F23]">
                  <p className="text-[10px] text-[#52525B]">SMS Preview</p>
                </div>
                <div className="min-h-[200px] p-4 flex flex-col justify-end">
                  <div className="bg-[#1F1F23] rounded-2xl rounded-tl-sm px-3 py-2 max-w-[200px]">
                    <p className="text-xs text-[#FAFAFA] whitespace-pre-wrap">{bodyText}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-[#1F1F23]">
        <button
          onClick={() => {
            const prev = steps[currentStepIndex - 1];
            if (prev) setStep(prev);
          }}
          disabled={currentStepIndex === 0}
          className="h-9 px-4 rounded-lg border border-[#1F1F23] text-sm text-[#71717A] hover:text-[#A1A1AA] hover:border-[#2A2A2E] transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <div className="flex items-center gap-2">
          {step === "review" ? (
            <>
              <button
                onClick={() => handleCreate(true)}
                disabled={saving}
                className="h-9 px-4 rounded-lg border border-[#1F1F23] text-sm text-[#71717A] hover:text-[#A1A1AA] hover:border-[#2A2A2E] transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
                Save as Draft
              </button>
              <button
                onClick={() => handleCreate(false)}
                disabled={saving}
                className="h-9 px-4 rounded-lg bg-[#6366F1] hover:bg-[#5558E6] text-white text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Send Now
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                const next = steps[currentStepIndex + 1];
                if (next) setStep(next);
              }}
              disabled={!canProceed()}
              className="h-9 px-4 rounded-lg bg-[#6366F1] hover:bg-[#5558E6] text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Next <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
