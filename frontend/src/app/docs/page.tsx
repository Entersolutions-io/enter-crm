"use client";

import Link from "next/link";
import { Book, Code, Globe, Users, Send, Zap, ArrowRight, CheckCircle } from "lucide-react";
import { StaticPageLayout } from "@/components/layout/static-page-layout";
import { useI18n } from "@/lib/i18n";

const categories = [
  {
    icon: Book,
    titleEn: "Getting Started",
    titleHr: "Početak",
    descEn: "Setup, installation, and first steps to integrate EnterCRM into your product.",
    descHr: "Postavljanje, instalacija i prvi koraci za integraciju EnterCRM-a u vaš proizvod.",
    href: "/docs/guide",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
  },
  {
    icon: Code,
    titleEn: "API Reference",
    titleHr: "API Referenca",
    descEn: "Complete REST API documentation with request/response examples for every endpoint.",
    descHr: "Potpuna REST API dokumentacija s primjerima zahtjeva i odgovora za svaki endpoint.",
    href: "/docs/api",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
  },
  {
    icon: Globe,
    titleEn: "Tracking Snippet",
    titleHr: "Snippet za Praćenje",
    descEn: "Install the JavaScript snippet to track customer behavior and events on your website.",
    descHr: "Instalirajte JavaScript snippet za praćenje ponašanja korisnika i događaja na vašoj web stranici.",
    href: "/docs/guide#tracking",
    color: "text-indigo-400",
    bg: "bg-indigo-400/10",
    border: "border-indigo-400/20",
  },
  {
    icon: Users,
    titleEn: "Segmentation",
    titleHr: "Segmentacija",
    descEn: "Build dynamic customer segments using RFM analysis, CLV scores, and custom filters.",
    descHr: "Izgradite dinamičke segmente korisnika koristeći RFM analizu, CLV ocjene i prilagođene filtre.",
    href: "/docs/guide#segmentation",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/20",
  },
  {
    icon: Send,
    titleEn: "Campaigns",
    titleHr: "Kampanje",
    descEn: "Send targeted email, SMS, and ad campaigns to your customer segments.",
    descHr: "Šaljite ciljane e-mail, SMS i oglasne kampanje vašim segmentima korisnika.",
    href: "/docs/guide#campaigns",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
  },
  {
    icon: Zap,
    titleEn: "Automations",
    titleHr: "Automatizacije",
    descEn: "Build powerful automation workflows with visual drag-and-drop triggers and actions.",
    descHr: "Izgradite moćne automatizacijske tijek rada s vizualnim povuci-i-ispusti okidačima i akcijama.",
    href: "/docs/guide#automations",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/20",
  },
];

const quickStartSteps = [
  {
    step: "01",
    titleEn: "Create Account & Get API Key",
    titleHr: "Izradite Račun i Dobijte API Ključ",
    descEn: "Register your workspace and generate an API key from the dashboard.",
    descHr: "Registrirajte svoje radno okruženje i generirajte API ključ iz nadzorne ploče.",
    href: "#contact",
  },
  {
    step: "02",
    titleEn: "Install Tracking Snippet",
    titleHr: "Instalirajte Snippet za Praćenje",
    descEn: "Add one line of JavaScript to your website to start collecting customer data.",
    descHr: "Dodajte jedan redak JavaScripta na svoju web stranicu da biste počeli prikupljati podatke o korisnicima.",
    href: "/docs/guide#tracking",
  },
  {
    step: "03",
    titleEn: "Start Automating",
    titleHr: "Počnite s Automatizacijom",
    descEn: "Build your first segment, create a campaign, and launch an automation workflow.",
    descHr: "Izgradite svoj prvi segment, izradite kampanju i pokrenite automatizacijski tijek rada.",
    href: "/docs/guide#automations",
  },
];

export default function DocsPage() {
  const { t } = useI18n();

  return (
    <StaticPageLayout>
      <div className="max-w-4xl mx-auto">

        {/* Hero */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1F1F23] bg-[#111113] px-3 py-1 text-xs text-[#71717A] mb-6">
            <Book className="h-3 w-3" />
            {t("Documentation", "Dokumentacija")}
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-[#FAFAFA] mb-4">
            {t("Documentation", "Dokumentacija")}
          </h1>
          <p className="text-[#A1A1AA] text-lg max-w-xl mx-auto leading-relaxed">
            {t(
              "Everything you need to integrate and use EnterCRM in your product.",
              "Sve što trebate za integraciju i korištenje EnterCRM-a u vašem proizvodu."
            )}
          </p>
        </div>

        {/* Quick Start */}
        <div className="mb-16">
          <h2 className="text-xl font-semibold text-[#FAFAFA] mb-6">
            {t("Quick Start", "Brzi Početak")}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {quickStartSteps.map((item) => (
              <Link
                key={item.step}
                href={item.href}
                className="group rounded-xl border border-[#1F1F23] bg-[#111113] p-5 hover:border-[#2A2A2E] transition-colors"
              >
                <div className="text-xs font-mono text-[#6366F1] mb-3 font-medium">{item.step}</div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm font-medium text-[#FAFAFA] leading-snug">
                    {t(item.titleEn, item.titleHr)}
                  </h3>
                  <ArrowRight className="h-3.5 w-3.5 text-[#52525B] group-hover:text-[#6366F1] transition-colors flex-shrink-0 mt-0.5" />
                </div>
                <p className="text-xs text-[#71717A] leading-relaxed">
                  {t(item.descEn, item.descHr)}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-16">
          <h2 className="text-xl font-semibold text-[#FAFAFA] mb-6">
            {t("Browse Documentation", "Pregledajte Dokumentaciju")}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.titleEn}
                  href={cat.href}
                  className="group rounded-xl border border-[#1F1F23] bg-[#111113] p-5 hover:border-[#2A2A2E] transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 rounded-lg ${cat.bg} border ${cat.border} p-2.5`}>
                      <Icon className={`h-4 w-4 ${cat.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <h3 className="text-sm font-medium text-[#FAFAFA]">
                          {t(cat.titleEn, cat.titleHr)}
                        </h3>
                        <ArrowRight className="h-3.5 w-3.5 text-[#52525B] group-hover:text-[#6366F1] transition-colors flex-shrink-0" />
                      </div>
                      <p className="text-xs text-[#71717A] leading-relaxed">
                        {t(cat.descEn, cat.descHr)}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* What's Included */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 mb-16">
          <h2 className="text-base font-semibold text-[#FAFAFA] mb-4">
            {t("What's Included", "Što je Uključeno")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              t("REST API with 33+ endpoints", "REST API s 33+ endpointa"),
              t("JavaScript tracking snippet", "JavaScript snippet za praćenje"),
              t("RFM & CLV analytics engine", "RFM & CLV analitički motor"),
              t("Multi-channel campaign tools", "Višekanalni alati za kampanje"),
              t("Visual automation builder", "Vizualni graditelj automatizacije"),
              t("Multi-tenant architecture", "Višestanarska arhitektura"),
              t("Webhook notifications", "Webhook obavijesti"),
              t("API key authentication", "Autentifikacija API ključem"),
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-sm text-[#A1A1AA]">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="text-center text-sm text-[#52525B]">
          {t(
            "Can't find what you're looking for? ",
            "Ne možete pronaći što tražite? "
          )}
          <Link href="/#contact" className="text-[#6366F1] hover:text-[#818CF8] transition-colors">
            {t("Contact us", "Kontaktirajte nas")}
          </Link>
        </div>

      </div>
    </StaticPageLayout>
  );
}
