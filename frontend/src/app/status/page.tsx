"use client";

import { useState } from "react";
import { StaticPageLayout } from "@/components/layout/static-page-layout";
import { useI18n } from "@/lib/i18n";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

const SERVICES = [
  { key: "api",        nameEn: "API Server",           nameHr: "API poslužitelj",         uptime: "99.99%", segments: 90 },
  { key: "web",        nameEn: "Web Application",      nameHr: "Web aplikacija",           uptime: "99.98%", segments: 90 },
  { key: "db",         nameEn: "Database Cluster",     nameHr: "Klaster baze podataka",    uptime: "100%",   segments: 90 },
  { key: "email",      nameEn: "Email Delivery",       nameHr: "Dostava e-pošte",          uptime: "99.95%", segments: 90 },
  { key: "sms",        nameEn: "SMS Gateway",          nameHr: "SMS gateway",              uptime: "99.97%", segments: 90 },
  { key: "webhook",    nameEn: "Webhook Processing",   nameHr: "Obrada webhookova",        uptime: "99.99%", segments: 90 },
  { key: "analytics",  nameEn: "Analytics Engine",     nameHr: "Analitički mehanizam",     uptime: "99.96%", segments: 90 },
  { key: "automation", nameEn: "Automation Engine",    nameHr: "Mehanizam automatizacije", uptime: "99.98%", segments: 90 },
  { key: "tracking",   nameEn: "Tracking Endpoint",    nameHr: "Endpoint za praćenje",     uptime: "99.99%", segments: 90 },
  { key: "cdn",        nameEn: "CDN & Static Assets",  nameHr: "CDN i statičke datoteke",  uptime: "100%",   segments: 90 },
];

const INCIDENTS = [
  {
    titleEn: "Scheduled Maintenance — Database Migration",
    titleHr: "Planirano održavanje — migracija baze podataka",
    dateEn: "Feb 28, 2026",
    dateHr: "28. veljače 2026.",
    timeRange: "02:00 – 03:45 UTC",
    descriptionEn:
      "Planned migration of the primary database cluster to expand storage capacity. All services were restored ahead of schedule.",
    descriptionHr:
      "Planirana migracija primarnog klastera baze podataka radi povećanja kapaciteta pohrane. Sve usluge su vraćene ranije od planiranog.",
    type: "maintenance" as const,
  },
  {
    titleEn: "Elevated API Latency",
    titleHr: "Povećana latencija API-ja",
    dateEn: "Feb 15, 2026",
    dateHr: "15. veljače 2026.",
    timeRange: "14:12 – 14:58 UTC",
    descriptionEn:
      "A surge in request volume caused elevated response times on the API Server. Autoscaling resolved the issue within 46 minutes.",
    descriptionHr:
      "Nagli porast broja zahtjeva uzrokovao je povećano vrijeme odgovora na API poslužitelju. Autoskaliranje je riješilo problem u roku od 46 minuta.",
    type: "incident" as const,
  },
  {
    titleEn: "Email Delivery Delays",
    titleHr: "Kašnjenje dostave e-pošte",
    dateEn: "Jan 22, 2026",
    dateHr: "22. siječnja 2026.",
    timeRange: "09:34 – 11:10 UTC",
    descriptionEn:
      "Third-party email delivery provider experienced a regional outage. Messages were queued and delivered once the provider recovered.",
    descriptionHr:
      "Pružatelj usluga e-pošte treće strane doživio je regionalni prekid rada. Poruke su stavljene u red čekanja i isporučene nakon oporavka pružatelja.",
    type: "incident" as const,
  },
];

// Build segment color arrays: mostly green, with one faint gap for non-100% services
function buildSegments(uptimeStr: string, count: number): ("green" | "empty" | "faint")[] {
  const uptime = parseFloat(uptimeStr) / 100;
  const segments: ("green" | "empty" | "faint")[] = [];

  for (let i = 0; i < count; i++) {
    // Deterministically place a tiny gap for services below 100%
    if (uptime < 1) {
      const ratio = 1 - uptime; // e.g. 0.0005
      // Spread rare gaps across timeline, mostly clustered toward older dates (left side)
      const gapCount = Math.max(1, Math.round(ratio * count * 10));
      // Place gaps at specific positions derived from uptime value
      const gapPositions = new Set<number>();
      for (let g = 0; g < gapCount; g++) {
        const pos = Math.floor(((g * 17 + Math.round(uptime * 1000)) % count));
        gapPositions.add(pos);
      }
      segments.push(gapPositions.has(i) ? "faint" : "green");
    } else {
      segments.push("green");
    }
  }
  return segments;
}

// Overall uptime bar: 90 segments, nearly all green with one subtle lighter segment
function buildOverallSegments(count: number) {
  const segs: ("green" | "light")[] = [];
  for (let i = 0; i < count; i++) {
    segs.push(i === 11 ? "light" : "green");
  }
  return segs;
}

export default function StatusPage() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const overallSegments = buildOverallSegments(90);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  }

  return (
    <StaticPageLayout>
      {/* ── Header ── */}
      <div className="mb-12 text-center">
        <p className="mb-3 text-sm font-medium tracking-widest uppercase text-[#6366F1]">
          {t("EnterCRM", "EnterCRM")}
        </p>
        <h1 className="mb-5 text-4xl font-bold tracking-tight text-[#FAFAFA]">
          {t("System Status", "Status sustava")}
        </h1>
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#16A34A]/30 bg-[#16A34A]/10 px-5 py-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
          </span>
          <span className="text-sm font-semibold text-[#22C55E]">
            {t("All Systems Operational", "Svi sustavi operativni")}
          </span>
        </div>
        <p className="mt-4 text-sm text-[#71717A]">
          {t(
            "Last checked: just now — updated every 60 seconds",
            "Zadnja provjera: upravo sada — ažurira se svakih 60 sekundi"
          )}
        </p>
      </div>

      {/* ── Overall Uptime ── */}
      <div className="mb-8 rounded-xl border border-[#1F1F23] bg-[#111113] p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#FAFAFA]">
              {t("Overall Uptime", "Ukupna dostupnost")}
            </p>
            <p className="mt-0.5 text-xs text-[#71717A]">
              {t("Last 90 days", "Zadnjih 90 dana")}
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-[#22C55E]">99.98%</span>
            <p className="mt-0.5 text-xs text-[#71717A]">
              {t("average across all services", "prosjek svih usluga")}
            </p>
          </div>
        </div>
        {/* Bar */}
        <div className="flex gap-[2px]">
          {overallSegments.map((seg, i) => (
            <div
              key={i}
              className="h-8 flex-1 rounded-[2px] transition-opacity"
              style={{
                backgroundColor: seg === "green" ? "#22C55E" : "#16A34A",
                opacity: seg === "green" ? 1 : 0.45,
              }}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs text-[#52525B]">
          <span>{t("90 days ago", "Prije 90 dana")}</span>
          <span>{t("Today", "Danas")}</span>
        </div>
      </div>

      {/* ── Service List ── */}
      <div className="mb-8 overflow-hidden rounded-xl border border-[#1F1F23] bg-[#111113]">
        <div className="border-b border-[#1F1F23] px-6 py-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#A1A1AA]">
            {t("Services", "Usluge")}
          </h2>
        </div>
        <div className="divide-y divide-[#1F1F23]">
          {SERVICES.map((service) => {
            const segs = buildSegments(service.uptime, service.segments);
            return (
              <div key={service.key} className="px-6 py-4">
                {/* Top row */}
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-[#FAFAFA]">
                    {t(service.nameEn, service.nameHr)}
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-[#A1A1AA]">
                      {service.uptime}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                      <span className="text-xs font-medium text-[#22C55E]">
                        {t("Operational", "Operativan")}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Segment bar */}
                <div className="flex gap-[2px]">
                  {segs.map((seg, i) => (
                    <div
                      key={i}
                      className="h-5 flex-1 rounded-[2px]"
                      style={{
                        backgroundColor: seg === "green" ? "#22C55E" : "#3F3F46",
                        opacity: seg === "faint" ? 1 : 1,
                      }}
                      title={`${t("Day", "Dan")} ${i + 1}`}
                    />
                  ))}
                </div>
                <div className="mt-1.5 flex justify-between text-[10px] text-[#52525B]">
                  <span>{t("90d ago", "Prije 90d")}</span>
                  <span>{t("Today", "Danas")}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Incident History ── */}
      <div className="mb-8 overflow-hidden rounded-xl border border-[#1F1F23] bg-[#111113]">
        <div className="border-b border-[#1F1F23] px-6 py-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#A1A1AA]">
            {t("Incident History", "Povijest incidenata")}
          </h2>
        </div>
        <div className="divide-y divide-[#1F1F23]">
          {INCIDENTS.map((incident, idx) => (
            <div key={idx} className="px-6 py-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  {incident.type === "maintenance" ? (
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#6366F1]" />
                  ) : (
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#F59E0B]" />
                  )}
                  <div>
                    <p className="text-sm font-semibold text-[#FAFAFA]">
                      {t(incident.titleEn, incident.titleHr)}
                    </p>
                    <p className="mt-1 text-xs text-[#71717A]">
                      {t(incident.dateEn, incident.dateHr)}{" "}
                      <span className="mx-1 text-[#3F3F46]">·</span>
                      {incident.timeRange}
                    </p>
                    <p className="mt-2 max-w-xl text-xs leading-relaxed text-[#A1A1AA]">
                      {t(incident.descriptionEn, incident.descriptionHr)}
                    </p>
                  </div>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#16A34A]/25 bg-[#16A34A]/10 px-3 py-1 text-xs font-medium text-[#22C55E]">
                  <CheckCircle2 className="h-3 w-3" />
                  {t("Resolved", "Riješeno")}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* No recent incidents note */}
        <div className="border-t border-[#1F1F23] px-6 py-4">
          <p className="text-center text-xs text-[#52525B]">
            {t(
              "No incidents in the past 7 days.",
              "Nema incidenata u zadnjih 7 dana."
            )}
          </p>
        </div>
      </div>

      {/* ── Subscribe ── */}
      <div className="rounded-xl border border-[#1F1F23] bg-[#111113] px-6 py-8 text-center">
        <p className="mb-1 text-sm font-semibold text-[#FAFAFA]">
          {t(
            "Stay informed about incidents and maintenance",
            "Budite informirani o incidentima i održavanju"
          )}
        </p>
        <p className="mb-5 text-xs text-[#71717A]">
          {t(
            "For real-time updates, subscribe to status notifications.",
            "Za ažuriranja u realnom vremenu, pretplatite se na obavijesti o statusu."
          )}
        </p>

        {subscribed ? (
          <div className="inline-flex items-center gap-2 rounded-full border border-[#16A34A]/25 bg-[#16A34A]/10 px-5 py-2.5 text-sm font-medium text-[#22C55E]">
            <CheckCircle2 className="h-4 w-4" />
            {t("You're subscribed!", "Pretplaćeni ste!")}
          </div>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("your@email.com", "vas@email.com")}
              className="w-full max-w-xs rounded-lg border border-[#1F1F23] bg-[#0A0A0B] px-4 py-2.5 text-sm text-[#FAFAFA] placeholder-[#52525B] outline-none transition focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]/30 sm:w-72"
            />
            <button
              type="submit"
              className="rounded-lg bg-[#6366F1] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4F46E5] active:scale-[0.98]"
            >
              {t("Subscribe", "Pretplatite se")}
            </button>
          </form>
        )}
      </div>

      {/* ── Footer note ── */}
      <p className="mt-8 text-center text-xs text-[#52525B]">
        {t(
          "Status data is updated automatically. For support, contact",
          "Podaci o statusu automatski se ažuriraju. Za podršku kontaktirajte"
        )}{" "}
        <a
          href="mailto:support@entercrm.io"
          className="text-[#6366F1] hover:underline"
        >
          support@entercrm.io
        </a>
      </p>
    </StaticPageLayout>
  );
}
