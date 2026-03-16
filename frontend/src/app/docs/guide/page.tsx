"use client";

import Link from "next/link";
import { StaticPageLayout } from "@/components/layout/static-page-layout";
import { useI18n } from "@/lib/i18n";

// ─── Shared components ────────────────────────────────────────────────────────

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="rounded-lg bg-[#0A0A0B] border border-[#1F1F23] p-4 font-mono text-xs text-[#A1A1AA] overflow-x-auto leading-relaxed whitespace-pre">
      {children}
    </pre>
  );
}

function SectionTitle({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-xl font-semibold text-[#FAFAFA] mt-14 mb-4 scroll-mt-28">
      {children}
    </h2>
  );
}

function SubTitle({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="text-base font-medium text-[#FAFAFA] mt-8 mb-3 scroll-mt-28">
      {children}
    </h3>
  );
}

function StepBadge({ n }: { n: number }) {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#6366F1]/15 text-xs font-semibold text-[#6366F1] border border-[#6366F1]/20 flex-shrink-0">
      {n}
    </span>
  );
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-[#6366F1]/20 bg-[#6366F1]/5 px-4 py-3 text-sm text-[#A1A1AA] leading-relaxed mb-4">
      {children}
    </div>
  );
}

function WarningBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 px-4 py-3 text-sm text-[#A1A1AA] leading-relaxed mb-4">
      {children}
    </div>
  );
}

// ─── Table of contents ────────────────────────────────────────────────────────

const sections = [
  { id: "quickstart", labelEn: "Quick Start", labelHr: "Brzi početak" },
  { id: "tracking", labelEn: "Tracking Snippet", labelHr: "Snippet za praćenje" },
  { id: "auth", labelEn: "Authentication", labelHr: "Autentifikacija" },
  { id: "customers", labelEn: "Working with Customers", labelHr: "Rad s korisnicima" },
  { id: "events", labelEn: "Event Tracking", labelHr: "Praćenje događaja" },
  { id: "segmentation", labelEn: "Segmentation & RFM", labelHr: "Segmentacija i RFM" },
  { id: "campaigns", labelEn: "Creating Campaigns", labelHr: "Izrada kampanja" },
  { id: "automations", labelEn: "Building Automations", labelHr: "Izgradnja automatizacija" },
  { id: "webhooks", labelEn: "Webhooks", labelHr: "Webhookovi" },
  { id: "sdks", labelEn: "SDKs & Libraries", labelHr: "SDK-ovi i biblioteke" },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function DeveloperGuidePage() {
  const { t } = useI18n();

  return (
    <StaticPageLayout>
      <div className="max-w-4xl mx-auto">

        {/* Hero */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1F1F23] bg-[#111113] px-3 py-1 text-xs text-[#71717A] mb-5">
            {t("Developer Guide", "Vodič za programere")}
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-[#FAFAFA] mb-3">
            {t("Developer Guide", "Vodič za programere")}
          </h1>
          <p className="text-[#A1A1AA] text-base leading-relaxed max-w-2xl">
            {t(
              "Step-by-step guide to integrating EnterCRM into your product — from installation to advanced automation workflows.",
              "Korak-po-korak vodič za integraciju EnterCRM-a u vaš proizvod — od instalacije do naprednih automatizacijskih tijek rada."
            )}
          </p>
        </div>

        {/* Table of contents */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5 mb-10">
          <p className="text-xs font-medium text-[#52525B] uppercase tracking-wide mb-3">
            {t("On this page", "Na ovoj stranici")}
          </p>
          <ol className="space-y-1.5">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="flex items-center gap-2 text-sm text-[#71717A] hover:text-[#A1A1AA] transition-colors group"
                >
                  <span className="text-xs text-[#52525B] w-4 text-right group-hover:text-[#6366F1] transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {t(s.labelEn, s.labelHr)}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* ── 1. Quick Start ─────────────────────────────────────────────────── */}
        <SectionTitle id="quickstart">{t("Quick Start Guide", "Vodič za brzi početak")}</SectionTitle>
        <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
          {t(
            "Get up and running with EnterCRM in under 10 minutes. Follow these three steps:",
            "Pokrenite EnterCRM za manje od 10 minuta. Slijedite ova tri koraka:"
          )}
        </p>

        <div className="space-y-4 mb-6">
          {[
            {
              titleEn: "Create your account and workspace",
              titleHr: "Izradite račun i radno okruženje",
              descEn: "Go to entercrm.io and register. You'll be prompted to name your workspace. Each workspace is isolated with its own customers, segments, and campaigns.",
              descHr: "Idite na entercrm.io i registrirajte se. Bit ćete upitani da imenujete radno okruženje. Svako radno okruženje je izolirano s vlastitim korisnicima, segmentima i kampanjama.",
            },
            {
              titleEn: "Generate an API key",
              titleHr: "Generirajte API ključ",
              descEn: "From your dashboard, navigate to Settings → API Keys → Generate Key. Your key starts with eck_ and should be stored securely in your environment variables.",
              descHr: "Iz nadzorne ploče idite na Postavke → API Ključevi → Generiraj ključ. Vaš ključ počinje s eck_ i treba biti pohranjen sigurno u varijablama okruženja.",
            },
            {
              titleEn: "Install the tracking snippet or connect your API",
              titleHr: "Instalirajte snippet za praćenje ili povežite vaš API",
              descEn: "Add the JavaScript snippet to your website for browser-side tracking, or send events directly from your server using the REST API.",
              descHr: "Dodajte JavaScript snippet na svoju web stranicu za praćenje na strani preglednika, ili šaljite događaje izravno s vašeg servera koristeći REST API.",
            },
          ].map((step, i) => (
            <div key={i} className="flex gap-4 rounded-xl border border-[#1F1F23] bg-[#111113] p-4">
              <StepBadge n={i + 1} />
              <div>
                <p className="text-sm font-medium text-[#FAFAFA] mb-1">{t(step.titleEn, step.titleHr)}</p>
                <p className="text-sm text-[#71717A] leading-relaxed">{t(step.descEn, step.descHr)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── 2. Tracking Snippet ────────────────────────────────────────────── */}
        <SectionTitle id="tracking">{t("Installing the Tracking Snippet", "Instalacija snippeta za praćenje")}</SectionTitle>
        <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">
          {t(
            "The EnterCRM JavaScript snippet auto-tracks pageviews and provides a global EnterCRM object for custom events. Add it to the <head> of every page you want to track.",
            "JavaScript snippet EnterCRM automatski prati preglede stranica i pruža globalni objekt EnterCRM za prilagođene događaje. Dodajte ga u <head> svake stranice koju želite pratiti."
          )}
        </p>
        <CodeBlock>{`<!-- Add this to every page you want to track -->
<script>
  (function(e,n,t,r,c,r,m){
    e.EnterCRM = e.EnterCRM || {};
    e.EnterCRM.apiKey = 'eck_YOUR_API_KEY_HERE';
    var s = n.createElement(t);
    s.async = 1;
    s.src = 'https://cdn.entercrm.io/enter-track.js';
    n.head.appendChild(s);
  })(window, document, 'script');
</script>`}</CodeBlock>

        <SubTitle>{t("Identifying customers", "Identifikacija korisnika")}</SubTitle>
        <p className="text-sm text-[#A1A1AA] leading-relaxed mb-3">
          {t(
            "Call EnterCRM.identify() after a user logs in to associate events with a specific customer profile:",
            "Pozovite EnterCRM.identify() nakon što se korisnik prijavi kako biste povezali događaje s određenim profilom korisnika:"
          )}
        </p>
        <CodeBlock>{`// After user login
EnterCRM.identify({
  email: 'user@example.com',
  name: 'Ana Kovač',
  created_at: '2025-06-01'
});`}</CodeBlock>

        <SubTitle>{t("Tracking custom events", "Praćenje prilagođenih događaja")}</SubTitle>
        <CodeBlock>{`// Track any custom event
EnterCRM.track('purchase', {
  amount: 149.99,
  currency: 'EUR',
  product_id: 'prod_abc123',
  product_name: 'Premium Plan'
});

// Track a page view manually (auto-tracked by default)
EnterCRM.page({ url: window.location.href });`}</CodeBlock>

        {/* ── 3. Authentication ──────────────────────────────────────────────── */}
        <SectionTitle id="auth">{t("Authentication", "Autentifikacija")}</SectionTitle>
        <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">
          {t(
            "EnterCRM uses two authentication methods depending on your use case:",
            "EnterCRM koristi dvije metode autentifikacije ovisno o vašem slučaju korištenja:"
          )}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-4">
            <p className="text-sm font-medium text-[#FAFAFA] mb-1.5">
              {t("Bearer Token", "Bearer Token")}
            </p>
            <p className="text-xs text-[#71717A] leading-relaxed">
              {t(
                "Used for user-authenticated requests from your application frontend or backend. Obtained via /auth/login.",
                "Koristi se za korisnički autentificirane zahtjeve iz vašeg aplikacijskog frontenda ili backenda. Dobiva se putem /auth/login."
              )}
            </p>
          </div>
          <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-4">
            <p className="text-sm font-medium text-[#FAFAFA] mb-1.5">
              {t("API Key (eck_...)", "API Ključ (eck_...)")}
            </p>
            <p className="text-xs text-[#71717A] leading-relaxed">
              {t(
                "Used for server-to-server integrations and the JavaScript tracking snippet. Pass via X-API-Key header.",
                "Koristi se za integracije server-prema-serveru i JavaScript snippet za praćenje. Prosljeđuje se putem X-API-Key zaglavlja."
              )}
            </p>
          </div>
        </div>

        <CodeBlock>{`# Obtain a Bearer token
curl -X POST https://api.entercrm.io/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email": "you@company.com", "password": "yourpassword"}'

# Response
{ "token": "eyJ0eXAiOiJKV1Qi...", "user": {...}, "tenant": {...} }

# Use it in subsequent requests
curl https://api.entercrm.io/v1/customers \\
  -H "Authorization: Bearer eyJ0eXAiOiJKV1Qi..."`}</CodeBlock>

        <WarningBox>
          {t(
            "Never expose your Bearer token or API key in client-side code. API keys should only be used in server environments or the tracking snippet (which is limited to event ingestion only).",
            "Nikada ne izlažite vaš Bearer token ili API ključ u kodu na strani klijenta. API ključevi bi trebali biti korišteni samo u server okruženjima ili snippetu za praćenje (koji je ograničen samo na unos događaja)."
          )}
        </WarningBox>

        {/* ── 4. Customers ──────────────────────────────────────────────────── */}
        <SectionTitle id="customers">{t("Working with Customers", "Rad s korisnicima")}</SectionTitle>
        <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">
          {t(
            "Customer profiles are the core entity in EnterCRM. Each customer has RFM scores, CLV metrics, event history, and segment memberships updated automatically.",
            "Profili korisnika su osnovna entiteta u EnterCRM-u. Svaki korisnik ima RFM ocjene, CLV metrike, povijest događaja i članstvo u segmentima koji se automatski ažuriraju."
          )}
        </p>

        <SubTitle>{t("Listing customers", "Popis korisnika")}</SubTitle>
        <CodeBlock>{`curl https://api.entercrm.io/v1/customers?page=1&per_page=25 \\
  -H "Authorization: Bearer <token>"

# Filter by segment
curl "https://api.entercrm.io/v1/customers?segment_id=1" \\
  -H "Authorization: Bearer <token>"

# Search by name or email
curl "https://api.entercrm.io/v1/customers?search=ana" \\
  -H "Authorization: Bearer <token>"`}</CodeBlock>

        <SubTitle>{t("Creating a customer", "Izrada korisnika")}</SubTitle>
        <CodeBlock>{`curl -X POST https://api.entercrm.io/v1/customers \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Marko Horvatić",
    "email": "marko@example.com",
    "phone": "+385921234567",
    "city": "Zagreb",
    "country": "HR"
  }'`}</CodeBlock>

        {/* ── 5. Event Tracking ──────────────────────────────────────────────── */}
        <SectionTitle id="events">{t("Event Tracking", "Praćenje događaja")}</SectionTitle>
        <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">
          {t(
            "Events are the building blocks of customer intelligence in EnterCRM. Every event updates the customer's RFM scores and can trigger automations.",
            "Događaji su temelji korisničke inteligencije u EnterCRM-u. Svaki događaj ažurira RFM ocjene korisnika i može pokrenuti automatizacije."
          )}
        </p>

        <SubTitle>{t("Server-side event tracking", "Praćenje događaja na strani servera")}</SubTitle>
        <CodeBlock>{`# Track a purchase event
curl -X POST https://api.entercrm.io/v1/track/event \\
  -H "X-API-Key: eck_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "customer_email": "marko@example.com",
    "event": "purchase",
    "properties": {
      "amount": 299.99,
      "currency": "EUR",
      "order_id": "ord_0001",
      "items": [
        { "id": "prod_123", "name": "Enterprise Plan", "quantity": 1, "price": 299.99 }
      ]
    }
  }'`}</CodeBlock>

        <SubTitle>{t("Standard event names", "Standardna imena događaja")}</SubTitle>
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1F1F23]">
                <th className="text-left text-xs font-medium text-[#52525B] uppercase tracking-wide px-4 py-2.5">
                  {t("Event", "Događaj")}
                </th>
                <th className="text-left text-xs font-medium text-[#52525B] uppercase tracking-wide px-4 py-2.5">
                  {t("Description", "Opis")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F1F23]">
              {[
                ["purchase", t("Customer completed a purchase", "Korisnik je dovršio kupnju")],
                ["pageview", t("Customer viewed a page", "Korisnik je pregledao stranicu")],
                ["signup", t("Customer created an account", "Korisnik je stvorio račun")],
                ["login", t("Customer logged in", "Korisnik se prijavio")],
                ["add_to_cart", t("Customer added item to cart", "Korisnik je dodao stavku u košaricu")],
                ["checkout_start", t("Customer started checkout", "Korisnik je pokrenuo naplatu")],
                ["subscription", t("Customer subscribed to a plan", "Korisnik se pretplatio na plan")],
                ["refund", t("Customer requested a refund", "Korisnik je zatražio povrat")],
              ].map(([event, desc]) => (
                <tr key={event}>
                  <td className="px-4 py-2.5">
                    <code className="font-mono text-xs text-[#6366F1]">{event}</code>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-[#71717A]">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── 6. Segmentation & RFM ──────────────────────────────────────────── */}
        <SectionTitle id="segmentation">{t("Segmentation & RFM", "Segmentacija i RFM")}</SectionTitle>
        <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">
          {t(
            "EnterCRM uses RFM (Recency, Frequency, Monetary) analysis to automatically score and segment your customers. Scores are recalculated after each event.",
            "EnterCRM koristi RFM (Recency, Frequency, Monetary) analizu za automatsko bodovanje i segmentiranje vaših korisnika. Ocjene se preračunavaju nakon svakog događaja."
          )}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {[
            {
              letter: "R",
              nameEn: "Recency",
              nameHr: "Nedavnost",
              descEn: "How recently did the customer make a purchase? Scored 1–5 (5 = most recent).",
              descHr: "Koliko nedavno je korisnik obavio kupnju? Boduje se 1–5 (5 = najnovije).",
            },
            {
              letter: "F",
              nameEn: "Frequency",
              nameHr: "Učestalost",
              descEn: "How often does the customer purchase? Scored 1–5 (5 = most frequent).",
              descHr: "Koliko često korisnik kupuje? Boduje se 1–5 (5 = najčešće).",
            },
            {
              letter: "M",
              nameEn: "Monetary",
              nameHr: "Novčana vrijednost",
              descEn: "How much has the customer spent in total? Scored 1–5 (5 = highest value).",
              descHr: "Koliko je korisnik ukupno potrošio? Boduje se 1–5 (5 = najveća vrijednost).",
            },
          ].map((dim) => (
            <div key={dim.letter} className="rounded-xl border border-[#1F1F23] bg-[#111113] p-4">
              <div className="text-2xl font-bold text-[#6366F1] mb-1.5">{dim.letter}</div>
              <p className="text-sm font-medium text-[#FAFAFA] mb-1.5">{t(dim.nameEn, dim.nameHr)}</p>
              <p className="text-xs text-[#71717A] leading-relaxed">{t(dim.descEn, dim.descHr)}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">
          {t(
            "The combined RFM score (3–15) determines the segment. EnterCRM maps scores to named segments like Champions (13–15), Loyal Customers (9–12), At Risk (5–8), and Lost (3–4).",
            "Kombinirani RFM rezultat (3–15) određuje segment. EnterCRM mapira ocjene na imenovane segmente poput Champions (13–15), Loyal Customers (9–12), At Risk (5–8) i Lost (3–4)."
          )}
        </p>

        <InfoBox>
          {t(
            "CLV (Customer Lifetime Value) fields — clv_total, clv_predicted, clv_average_order, clv_order_count — are also computed automatically from event data and updated alongside RFM scores.",
            "CLV (Customer Lifetime Value) polja — clv_total, clv_predicted, clv_average_order, clv_order_count — također se automatski računaju iz podataka o događajima i ažuriraju zajedno s RFM ocjenama."
          )}
        </InfoBox>

        <SubTitle>{t("Creating segments via API", "Izrada segmenata putem API-ja")}</SubTitle>
        <CodeBlock>{`curl -X POST https://api.entercrm.io/v1/segments \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "High Value + Recent",
    "description": "Customers who spent over €500 and purchased in last 30 days",
    "color": "#6366f1",
    "filters": {
      "clv_total_min": 500,
      "last_purchase_days_max": 30
    }
  }'`}</CodeBlock>

        {/* ── 7. Campaigns ──────────────────────────────────────────────────── */}
        <SectionTitle id="campaigns">{t("Creating Campaigns", "Izrada kampanja")}</SectionTitle>
        <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">
          {t(
            "Campaigns target a customer segment with email, SMS, or ad messages. The workflow is: create → draft content → review → send or schedule.",
            "Kampanje ciljaju segment korisnika e-mail, SMS ili oglasnim porukama. Tijek rada je: izradi → nacrtaj sadržaj → pregled → pošalji ili zakaži."
          )}
        </p>

        <div className="space-y-3 mb-6">
          {[
            { typeEn: "Email", typeHr: "E-mail", descEn: "HTML email with subject line, from name, and template support.", descHr: "HTML e-mail s predmetom, imenom pošiljatelja i podrškom za predloške.", color: "text-blue-400", bg: "bg-blue-400/10" },
            { typeEn: "SMS", typeHr: "SMS", descEn: "Short text messages sent to customers with valid phone numbers.", descHr: "Kratke tekstualne poruke poslane korisnicima s valjanim brojevima telefona.", color: "text-emerald-400", bg: "bg-emerald-400/10" },
            { typeEn: "Ad Campaign", typeHr: "Oglasna kampanja", descEn: "Sync customer segments to ad platforms (coming soon).", descHr: "Sinkronizirajte segmente korisnika s oglasnim platformama (uskoro).", color: "text-amber-400", bg: "bg-amber-400/10" },
          ].map((ct) => (
            <div key={ct.typeEn} className="flex items-start gap-3 rounded-xl border border-[#1F1F23] bg-[#111113] p-4">
              <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${ct.bg} ${ct.color} flex-shrink-0 mt-0.5`}>
                {t(ct.typeEn, ct.typeHr)}
              </span>
              <p className="text-sm text-[#71717A] leading-relaxed">{t(ct.descEn, ct.descHr)}</p>
            </div>
          ))}
        </div>

        <CodeBlock>{`# Create and immediately send an email campaign
curl -X POST https://api.entercrm.io/v1/campaigns \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Win-Back Offer",
    "type": "email",
    "segment_id": 3,
    "subject": "We miss you — here is 20% off",
    "body": "<p>Hi {{name}},</p><p>Use code BACK20 for 20% off your next order.</p>",
    "from_name": "EnterCRM Team",
    "from_email": "hello@yourcompany.com"
  }'

# Then send it
curl -X POST https://api.entercrm.io/v1/campaigns/12/send \\
  -H "Authorization: Bearer <token>"`}</CodeBlock>

        {/* ── 8. Automations ────────────────────────────────────────────────── */}
        <SectionTitle id="automations">{t("Building Automations", "Izgradnja automatizacija")}</SectionTitle>
        <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">
          {t(
            "Automations are visual workflows triggered by customer events. Use the drag-and-drop builder in your dashboard or define them via the API.",
            "Automatizacije su vizualni tijek rada pokrenuti korisničkim događajima. Koristite graditelj povuci-i-ispusti u vašoj nadzornoj ploči ili ih definirajte putem API-ja."
          )}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { nameEn: "Trigger", nameHr: "Okidač", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20", descEn: "Starts the flow", descHr: "Pokreće tok" },
            { nameEn: "Condition", nameHr: "Uvjet", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20", descEn: "Yes / No branching", descHr: "Da / Ne grananje" },
            { nameEn: "Action", nameHr: "Akcija", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20", descEn: "Send email / SMS", descHr: "Pošalji e-mail / SMS" },
            { nameEn: "Delay", nameHr: "Odgoda", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20", descEn: "Wait before next step", descHr: "Čekaj prije sljedećeg koraka" },
          ].map((node) => (
            <div key={node.nameEn} className={`rounded-xl border ${node.border} ${node.bg} p-3 text-center`}>
              <p className={`text-sm font-medium ${node.color} mb-1`}>{t(node.nameEn, node.nameHr)}</p>
              <p className="text-xs text-[#71717A]">{t(node.descEn, node.descHr)}</p>
            </div>
          ))}
        </div>

        <CodeBlock>{`# Create a welcome automation
curl -X POST https://api.entercrm.io/v1/automations \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Welcome Series",
    "trigger_type": "customer_created",
    "is_active": true
  }'

# Save the flow design
curl -X POST https://api.entercrm.io/v1/automations/1/design \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "nodes": [
      { "id": "t1", "type": "trigger", "data": { "label": "New Customer" }, "position": { "x": 250, "y": 0 } },
      { "id": "a1", "type": "action",  "data": { "label": "Send Welcome Email" }, "position": { "x": 250, "y": 120 } },
      { "id": "d1", "type": "delay",   "data": { "label": "Wait 3 Days" }, "position": { "x": 250, "y": 240 } },
      { "id": "c1", "type": "condition","data": { "label": "Made a Purchase?" }, "position": { "x": 250, "y": 360 } },
      { "id": "a2", "type": "action",  "data": { "label": "Send Reminder" }, "position": { "x": 80, "y": 480 } },
      { "id": "a3", "type": "action",  "data": { "label": "Send Thank You" }, "position": { "x": 420, "y": 480 } }
    ],
    "edges": [
      { "id": "e1", "source": "t1", "target": "a1" },
      { "id": "e2", "source": "a1", "target": "d1" },
      { "id": "e3", "source": "d1", "target": "c1" },
      { "id": "e4", "source": "c1", "target": "a2", "label": "No" },
      { "id": "e5", "source": "c1", "target": "a3", "label": "Yes" }
    ]
  }'`}</CodeBlock>

        {/* ── 9. Webhooks ────────────────────────────────────────────────────── */}
        <SectionTitle id="webhooks">{t("Webhooks", "Webhookovi")}</SectionTitle>
        <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">
          {t(
            "EnterCRM can POST real-time notifications to your server when certain events occur.",
            "EnterCRM može slati POST obavijesti u stvarnom vremenu na vaš server kada se određeni događaji dogode."
          )}
        </p>

        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] overflow-hidden mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1F1F23]">
                <th className="text-left text-xs font-medium text-[#52525B] uppercase tracking-wide px-4 py-2.5">
                  {t("Event", "Događaj")}
                </th>
                <th className="text-left text-xs font-medium text-[#52525B] uppercase tracking-wide px-4 py-2.5">
                  {t("Trigger", "Okidač")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F1F23]">
              {[
                ["customer.created", t("A new customer profile is created", "Stvoren je novi profil korisnika")],
                ["customer.segment_entered", t("Customer enters a segment", "Korisnik ulazi u segment")],
                ["customer.segment_exited", t("Customer leaves a segment", "Korisnik napušta segment")],
                ["campaign.sent", t("A campaign finishes sending", "Kampanja završava slanje")],
                ["automation.triggered", t("An automation workflow is triggered", "Pokrenut je automatizacijski tijek rada")],
              ].map(([event, desc]) => (
                <tr key={event}>
                  <td className="px-4 py-2.5">
                    <code className="font-mono text-xs text-[#6366F1]">{event}</code>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-[#71717A]">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CodeBlock>{`// Example webhook payload
{
  "event": "customer.segment_entered",
  "timestamp": "2026-03-16T10:00:00Z",
  "data": {
    "customer_id": 42,
    "customer_email": "user@example.com",
    "segment_id": 1,
    "segment_name": "Champions"
  }
}

// Verify the webhook signature
const signature = req.headers['x-entercrm-signature'];
const computed = crypto.createHmac('sha256', WEBHOOK_SECRET)
  .update(JSON.stringify(req.body))
  .digest('hex');

if (signature !== computed) {
  return res.status(401).send('Invalid signature');
}`}</CodeBlock>

        {/* ── 10. SDKs ──────────────────────────────────────────────────────── */}
        <SectionTitle id="sdks">{t("SDKs & Libraries", "SDK-ovi i biblioteke")}</SectionTitle>
        <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">
          {t(
            "Official client libraries are in development. In the meantime, use the REST API directly or the JS snippet.",
            "Službene klijentske biblioteke su u razvoju. U međuvremenu koristite REST API izravno ili JS snippet."
          )}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { lang: "JavaScript / TypeScript", statusEn: "Coming Soon", statusHr: "Uskoro" },
            { lang: "PHP", statusEn: "Coming Soon", statusHr: "Uskoro" },
            { lang: "Python", statusEn: "Coming Soon", statusHr: "Uskoro" },
          ].map((sdk) => (
            <div key={sdk.lang} className="rounded-xl border border-[#1F1F23] bg-[#111113] p-4 opacity-60">
              <p className="text-sm font-medium text-[#FAFAFA] mb-1.5">{sdk.lang}</p>
              <span className="inline-flex items-center rounded border border-[#1F1F23] bg-[#0A0A0B] px-2 py-0.5 text-xs text-[#52525B]">
                {t(sdk.statusEn, sdk.statusHr)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-[#1F1F23] bg-[#111113] p-5 text-sm text-[#71717A]">
          {t(
            "Have feedback on this guide? Found an error? ",
            "Imate povratne informacije o ovom vodiču? Pronašli ste grešku? "
          )}
          <Link href="/#contact" className="text-[#6366F1] hover:text-[#818CF8] transition-colors">
            {t("Let us know.", "Javite nam.")}
          </Link>
          {t(" Full API details are in the ", " Potpuni API detalji su u ")}
          <Link href="/docs/api" className="text-[#6366F1] hover:text-[#818CF8] transition-colors">
            {t("API Reference.", "API Referenci.")}
          </Link>
        </div>

      </div>
    </StaticPageLayout>
  );
}
