"use client";

import { StaticPageLayout } from "@/components/layout/static-page-layout";
import { useI18n } from "@/lib/i18n";

const entries = [
  {
    version: "1.2.0",
    date: "2026-03-10",
    tag: "Feature",
    tagColor: "bg-[#6366F1]/10 text-[#6366F1] border-[#6366F1]/20",
    titleEn: "Ad Campaign Tracking",
    titleHr: "Praćenje reklamnih kampanja",
    itemsEn: [
      "Google Ads, Meta Ads, TikTok, LinkedIn, and Twitter ad campaign support",
      "Detailed ad analytics: impressions, clicks, conversions, CPC, CPM, CTR, ROAS",
      "Revenue attribution for ad campaigns",
      "Platform-specific campaign creation wizard",
    ],
    itemsHr: [
      "Podrška za Google Ads, Meta Ads, TikTok, LinkedIn i Twitter reklamne kampanje",
      "Detaljna analitika reklama: prikazi, klikovi, konverzije, CPC, CPM, CTR, ROAS",
      "Atribucija prihoda za reklamne kampanje",
      "Čarobnjak za kreiranje kampanja specifičan za platformu",
    ],
  },
  {
    version: "1.1.0",
    date: "2026-03-05",
    tag: "Feature",
    tagColor: "bg-[#6366F1]/10 text-[#6366F1] border-[#6366F1]/20",
    titleEn: "Visual Automation Builder",
    titleHr: "Vizualni graditelj automatizacije",
    itemsEn: [
      "Drag-and-drop workflow builder with React Flow",
      "4 node types: Trigger, Condition, Action, Delay",
      "Save and activate automations via API",
      "Interactive edges with add/delete controls",
    ],
    itemsHr: [
      "Graditelj tijeka rada s povuci-i-pusti uz React Flow",
      "4 vrste čvorova: Okidač, Uvjet, Akcija, Odgoda",
      "Spremanje i aktiviranje automatizacija putem API-ja",
      "Interaktivni rubovi s kontrolama dodavanja/brisanja",
    ],
  },
  {
    version: "1.0.0",
    date: "2026-02-28",
    tag: "Release",
    tagColor: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
    titleEn: "Initial Release",
    titleHr: "Početno izdanje",
    itemsEn: [
      "Customer tracking engine with JS snippet and API bridge",
      "RFM analysis and customer segmentation (125+ segments)",
      "Email, SMS, and call list campaigns",
      "Real-time analytics dashboard",
      "Multi-tenant SaaS architecture",
      "GDPR-compliant data handling",
    ],
    itemsHr: [
      "Motor za praćenje kupaca s JS isječkom i API mostom",
      "RFM analiza i segmentacija kupaca (125+ segmenata)",
      "Email, SMS i kampanje s listama poziva",
      "Nadzorna ploča za analitiku u stvarnom vremenu",
      "Višekorisničko SaaS arhitektura",
      "Rukovanje podacima usklađeno s GDPR-om",
    ],
  },
];

export default function ChangelogPage() {
  const { t } = useI18n();

  return (
    <StaticPageLayout>
      <div className="mb-12">
        <h1
          className="text-3xl md:text-4xl font-bold text-[#FAFAFA] tracking-tight"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("Changelog", "Promjene")}
        </h1>
        <p className="text-[#71717A] mt-3">
          {t(
            "Track the latest updates and improvements to EnterCRM.",
            "Pratite najnovija ažuriranja i poboljšanja EnterCRM-a."
          )}
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#1F1F23]" />

        <div className="space-y-10">
          {entries.map((entry) => (
            <div key={entry.version} className="relative pl-8">
              {/* Timeline dot */}
              <div className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-[#1F1F23] bg-[#111113]">
                <div className="absolute inset-[3px] rounded-full bg-[#6366F1]" />
              </div>

              <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full border ${entry.tagColor}`}>
                    {entry.tag}
                  </span>
                  <span className="text-xs text-[#52525B] font-mono">v{entry.version}</span>
                  <span className="text-xs text-[#52525B]">{entry.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-[#FAFAFA] mb-3">
                  {t(entry.titleEn, entry.titleHr)}
                </h3>
                <ul className="space-y-2">
                  {(t(entry.itemsEn.join("|"), entry.itemsHr.join("|"))).split("|").map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#A1A1AA]">
                      <span className="text-[#6366F1] mt-1.5 shrink-0">&#8226;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StaticPageLayout>
  );
}
