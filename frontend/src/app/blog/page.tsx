"use client";

import Link from "next/link";
import { StaticPageLayout } from "@/components/layout/static-page-layout";
import { useI18n } from "@/lib/i18n";

// ─── Types & data ─────────────────────────────────────────────────────────────

type Category =
  | "Product"
  | "Guide"
  | "Tutorial"
  | "Compliance"
  | "Analytics"
  | "Engineering";

interface Post {
  titleEn: string;
  titleHr: string;
  excerptEn: string;
  excerptHr: string;
  date: string;
  dateHr: string;
  category: Category;
  slug: string;
}

const categoryStyles: Record<Category, string> = {
  Product: "bg-indigo-400/10 text-indigo-400 border-indigo-400/20",
  Guide: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  Tutorial: "bg-blue-400/10 text-blue-400 border-blue-400/20",
  Compliance: "bg-amber-400/10 text-amber-400 border-amber-400/20",
  Analytics: "bg-purple-400/10 text-purple-400 border-purple-400/20",
  Engineering: "bg-cyan-400/10 text-cyan-400 border-cyan-400/20",
};

const categoryTranslations: Record<Category, string> = {
  Product: "Proizvod",
  Guide: "Vodič",
  Tutorial: "Tutorial",
  Compliance: "Usklađenost",
  Analytics: "Analitika",
  Engineering: "Inženjering",
};

const posts: Post[] = [
  {
    titleEn: "Introducing EnterCRM: A New Era of Customer Intelligence",
    titleHr: "Predstavljamo EnterCRM: Nova era korisničke inteligencije",
    excerptEn:
      "Today we're launching EnterCRM — a SaaS CRM platform built around real data, not guesswork. Track behaviour, score customers with RFM, and automate your response at scale.",
    excerptHr:
      "Danas lansiramo EnterCRM — SaaS CRM platformu izgrađenu na stvarnim podacima, a ne nagađanju. Pratite ponašanje, bodujte korisnike s RFM-om i automatizirajte odgovor u velikom obimu.",
    date: "March 10, 2026",
    dateHr: "10. ožujka 2026.",
    category: "Product",
    slug: "introducing-entercrm",
  },
  {
    titleEn: "Understanding RFM Analysis for Customer Segmentation",
    titleHr: "Razumijevanje RFM analize za segmentaciju korisnika",
    excerptEn:
      "RFM — Recency, Frequency, Monetary — is a proven framework for ranking customers by value. Learn how EnterCRM computes RFM scores and maps them to actionable segments.",
    excerptHr:
      "RFM — Recency, Frequency, Monetary — provjereni je okvir za rangiranje korisnika po vrijednosti. Saznajte kako EnterCRM izračunava RFM ocjene i mapira ih na segmente koji potiču akciju.",
    date: "March 5, 2026",
    dateHr: "5. ožujka 2026.",
    category: "Guide",
    slug: "rfm-analysis-guide",
  },
  {
    titleEn: "How to Build Multi-Channel Automation Workflows",
    titleHr: "Kako izgraditi višekanalne automatizacijske tijekove",
    excerptEn:
      "A walkthrough of the EnterCRM visual automation builder — creating branching workflows that send email, delay, check conditions, and adapt based on what each customer does.",
    excerptHr:
      "Pregled vizualnog graditelja automatizacija EnterCRM-a — izrada tijekova s grananjem koji šalju e-mail, odgađaju, provjeravaju uvjete i prilagođavaju se na temelju onoga što svaki korisnik radi.",
    date: "February 28, 2026",
    dateHr: "28. veljače 2026.",
    category: "Tutorial",
    slug: "multi-channel-automation",
  },
  {
    titleEn: "GDPR-Compliant Customer Tracking: Best Practices",
    titleHr: "Praćenje korisnika usklađeno s GDPR-om: Najbolje prakse",
    excerptEn:
      "Tracking customer behaviour must respect privacy. This post covers consent management, data minimisation, and how EnterCRM helps you stay compliant with GDPR and ePrivacy.",
    excerptHr:
      "Praćenje ponašanja korisnika mora poštivati privatnost. Ovaj post pokriva upravljanje privolama, minimizaciju podataka i kako EnterCRM pomaže ostati usklađen s GDPR-om i ePrivatnošću.",
    date: "February 20, 2026",
    dateHr: "20. veljače 2026.",
    category: "Compliance",
    slug: "gdpr-tracking",
  },
  {
    titleEn: "Maximizing ROI with Ad Campaign Analytics",
    titleHr: "Maksimizacija ROI-a s analitikom oglasnih kampanja",
    excerptEn:
      "Open rates and click-throughs only tell part of the story. See how combining campaign analytics with CLV data reveals which channels and messages actually drive long-term revenue.",
    excerptHr:
      "Stope otvaranja i klikova govore samo dio priče. Pogledajte kako kombiniranje analitike kampanja s CLV podacima otkriva koji kanali i poruke stvarno donose dugoročne prihode.",
    date: "February 15, 2026",
    dateHr: "15. veljače 2026.",
    category: "Analytics",
    slug: "ad-campaign-analytics",
  },
  {
    titleEn: "The Power of Real-Time Event Tracking",
    titleHr: "Snaga praćenja događaja u stvarnom vremenu",
    excerptEn:
      "Batch imports can't capture the moment a customer adds an item to their cart or abandons checkout. Discover why real-time event streams change what's possible in CRM.",
    excerptHr:
      "Skupni uvozi ne mogu uhvatiti trenutak kada korisnik doda stavku u košaricu ili napusti naplatu. Otkrijte zašto tokovi događaja u stvarnom vremenu mijenjaju što je moguće u CRM-u.",
    date: "February 10, 2026",
    dateHr: "10. veljače 2026.",
    category: "Engineering",
    slug: "real-time-event-tracking",
  },
];

// ─── Post card ────────────────────────────────────────────────────────────────

function PostCard({ post, t }: { post: Post; t: (en: string, hr: string) => string }) {
  const badgeStyle = categoryStyles[post.category];
  const categoryLabelHr = categoryTranslations[post.category];

  return (
    <div className="group rounded-xl border border-[#1F1F23] bg-[#111113] p-6 hover:border-[#2A2A2E] transition-colors flex flex-col">
      {/* Category badge */}
      <div className="mb-4">
        <span
          className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium ${badgeStyle}`}
        >
          {t(post.category, categoryLabelHr)}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base font-medium text-[#FAFAFA] mb-2.5 leading-snug">
        {t(post.titleEn, post.titleHr)}
      </h3>

      {/* Excerpt */}
      <p className="text-sm text-[#71717A] leading-relaxed flex-1 mb-5">
        {t(post.excerptEn, post.excerptHr)}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#1F1F23]">
        <time className="text-xs text-[#52525B]">
          {t(post.date, post.dateHr)}
        </time>
        <Link
          href={`#${post.slug}`}
          className="text-xs text-[#6366F1] hover:text-[#818CF8] transition-colors"
        >
          {t("Read more →", "Pročitaj više →")}
        </Link>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const { t } = useI18n();

  return (
    <StaticPageLayout>
      <div className="max-w-4xl mx-auto">

        {/* Hero */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1F1F23] bg-[#111113] px-3 py-1 text-xs text-[#71717A] mb-6">
            {t("Blog", "Blog")}
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-[#FAFAFA] mb-4">
            {t("Blog", "Blog")}
          </h1>
          <p className="text-[#A1A1AA] text-lg max-w-xl mx-auto leading-relaxed">
            {t(
              "Insights, updates, and guides from the EnterCRM team.",
              "Uvidi, ažuriranja i vodiči od tima EnterCRM-a."
            )}
          </p>
        </div>

        {/* Category filter (decorative — all shown) */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(
            [
              { en: "All", hr: "Sve", active: true },
              { en: "Product", hr: "Proizvod", active: false },
              { en: "Guide", hr: "Vodič", active: false },
              { en: "Tutorial", hr: "Tutorial", active: false },
              { en: "Compliance", hr: "Usklađenost", active: false },
              { en: "Analytics", hr: "Analitika", active: false },
              { en: "Engineering", hr: "Inženjering", active: false },
            ] as { en: string; hr: string; active: boolean }[]
          ).map((cat) => (
            <button
              key={cat.en}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                cat.active
                  ? "border-[#6366F1]/40 bg-[#6366F1]/10 text-[#6366F1]"
                  : "border-[#1F1F23] bg-[#111113] text-[#71717A] hover:border-[#2A2A2E] hover:text-[#A1A1AA]"
              }`}
            >
              {t(cat.en, cat.hr)}
            </button>
          ))}
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 mb-14">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} t={t} />
          ))}
        </div>

        {/* Coming soon notice */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 text-center">
          <p className="text-sm font-medium text-[#FAFAFA] mb-1.5">
            {t("More posts coming soon", "Više postova uskoro")}
          </p>
          <p className="text-sm text-[#71717A] leading-relaxed max-w-sm mx-auto">
            {t(
              "We publish guides, product updates, and engineering deep-dives regularly. Check back soon.",
              "Redovito objavljujemo vodiče, ažuriranja proizvoda i inženjerske analize. Provjerite uskoro."
            )}
          </p>
        </div>

      </div>
    </StaticPageLayout>
  );
}
