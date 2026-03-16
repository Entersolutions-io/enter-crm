"use client";

import { StaticPageLayout } from "@/components/layout/static-page-layout";
import { useI18n } from "@/lib/i18n";

// ─── Badge helpers ───────────────────────────────────────────────────────────

function MethodBadge({ method }: { method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" }) {
  const styles: Record<string, string> = {
    GET: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
    POST: "bg-blue-400/10 text-blue-400 border-blue-400/20",
    PUT: "bg-amber-400/10 text-amber-400 border-amber-400/20",
    PATCH: "bg-amber-400/10 text-amber-400 border-amber-400/20",
    DELETE: "bg-red-400/10 text-red-400 border-red-400/20",
  };
  return (
    <span
      className={`inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide ${styles[method]}`}
    >
      {method}
    </span>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="rounded-lg bg-[#0A0A0B] border border-[#1F1F23] p-4 font-mono text-xs text-[#A1A1AA] overflow-x-auto leading-relaxed whitespace-pre">
      {children}
    </pre>
  );
}

// ─── Endpoint component ───────────────────────────────────────────────────────

interface EndpointProps {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  descEn: string;
  descHr: string;
  curl: string;
  response: string;
  t: (en: string, hr: string) => string;
}

function Endpoint({ method, path, descEn, descHr, curl, response, t }: EndpointProps) {
  return (
    <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5 mb-4">
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <MethodBadge method={method} />
        <code className="font-mono text-sm text-[#FAFAFA]">{path}</code>
      </div>
      <p className="text-sm text-[#71717A] mb-4">{t(descEn, descHr)}</p>

      <div className="space-y-3">
        <div>
          <p className="text-xs font-medium text-[#52525B] uppercase tracking-wide mb-1.5">
            {t("Example Request", "Primjer zahtjeva")}
          </p>
          <CodeBlock>{curl}</CodeBlock>
        </div>
        <div>
          <p className="text-xs font-medium text-[#52525B] uppercase tracking-wide mb-1.5">
            {t("Example Response", "Primjer odgovora")}
          </p>
          <CodeBlock>{response}</CodeBlock>
        </div>
      </div>
    </div>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────

function SectionHeader({ id, titleEn, titleHr, t }: { id: string; titleEn: string; titleHr: string; t: (en: string, hr: string) => string }) {
  return (
    <div id={id} className="flex items-center gap-3 mt-12 mb-5">
      <h2 className="text-lg font-semibold text-[#FAFAFA]">{t(titleEn, titleHr)}</h2>
      <div className="flex-1 h-px bg-[#1F1F23]" />
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ApiReferencePage() {
  const { t } = useI18n();

  return (
    <StaticPageLayout>
      <div className="max-w-4xl mx-auto">

        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1F1F23] bg-[#111113] px-3 py-1 text-xs text-[#71717A] mb-5">
            <span className="font-mono">{"{ }"}</span>
            {t("API Reference", "API Referenca")}
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-[#FAFAFA] mb-3">
            {t("API Reference", "API Referenca")}
          </h1>
          <p className="text-[#A1A1AA] text-base leading-relaxed max-w-2xl">
            {t(
              "Complete reference for the EnterCRM REST API. All endpoints require authentication.",
              "Potpuna referenca za EnterCRM REST API. Svi endpointi zahtijevaju autentifikaciju."
            )}
          </p>
        </div>

        {/* Overview cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-4">
            <p className="text-xs text-[#52525B] uppercase tracking-wide mb-2">
              {t("Base URL", "Osnovna URL")}
            </p>
            <code className="font-mono text-sm text-[#6366F1]">https://api.entercrm.io/v1</code>
          </div>
          <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-4">
            <p className="text-xs text-[#52525B] uppercase tracking-wide mb-2">
              {t("Rate Limit", "Ograničenje zahtjeva")}
            </p>
            <p className="font-mono text-sm text-[#FAFAFA]">1,000 {t("req / min", "zaht / min")}</p>
          </div>
          <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-4">
            <p className="text-xs text-[#52525B] uppercase tracking-wide mb-2">
              {t("Response Format", "Format odgovora")}
            </p>
            <p className="font-mono text-sm text-[#FAFAFA]">JSON</p>
          </div>
        </div>

        {/* Authentication explanation */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5 mb-8">
          <h2 className="text-base font-semibold text-[#FAFAFA] mb-3">
            {t("Authentication", "Autentifikacija")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">
            {t(
              "EnterCRM supports two authentication methods: Bearer tokens (for user sessions) and API keys (for server-to-server integrations).",
              "EnterCRM podržava dvije metode autentifikacije: Bearer tokene (za korisničke sesije) i API ključeve (za integracije server-prema-serveru)."
            )}
          </p>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-medium text-[#52525B] uppercase tracking-wide mb-1.5">
                {t("Bearer Token (user session)", "Bearer Token (korisnička sesija)")}
              </p>
              <CodeBlock>{`Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...`}</CodeBlock>
            </div>
            <div>
              <p className="text-xs font-medium text-[#52525B] uppercase tracking-wide mb-1.5">
                {t("API Key (server-to-server)", "API Ključ (server-prema-serveru)")}
              </p>
              <CodeBlock>{`X-API-Key: eck_your_api_key_here`}</CodeBlock>
            </div>
          </div>
        </div>

        {/* Pagination note */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-5 mb-4">
          <h2 className="text-base font-semibold text-[#FAFAFA] mb-3">
            {t("Pagination", "Straničenje")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">
            {t(
              "List endpoints return paginated results. Use the page and per_page query parameters to navigate.",
              "Endpointi za liste vraćaju straničene rezultate. Koristite page i per_page parametre upita za navigaciju."
            )}
          </p>
          <CodeBlock>{`GET /customers?page=1&per_page=25&sort=created_at&order=desc

// Response envelope
{
  "data": [...],
  "meta": {
    "current_page": 1,
    "per_page": 25,
    "total": 342,
    "last_page": 14
  }
}`}</CodeBlock>
        </div>

        {/* ── Authentication endpoints ─────────────────────────────────── */}
        <SectionHeader id="auth" titleEn="Authentication" titleHr="Autentifikacija" t={t} />

        <Endpoint
          method="POST"
          path="/auth/login"
          descEn="Authenticate a user and return a Bearer token for subsequent requests."
          descHr="Autentificirajte korisnika i vratite Bearer token za naknadne zahtjeve."
          curl={`curl -X POST https://api.entercrm.io/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "demo@entercrm.io",
    "password": "password"
  }'`}
          response={`{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 1,
    "name": "Demo User",
    "email": "demo@entercrm.io",
    "created_at": "2026-01-15T10:00:00Z"
  },
  "tenant": {
    "id": 1,
    "name": "Demo Workspace",
    "slug": "demo"
  }
}`}
          t={t}
        />

        <Endpoint
          method="POST"
          path="/auth/register"
          descEn="Register a new user and workspace. Returns a token on success."
          descHr="Registrirajte novog korisnika i radno okruženje. Vraća token pri uspjehu."
          curl={`curl -X POST https://api.entercrm.io/v1/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Jane Smith",
    "email": "jane@company.com",
    "password": "secret123",
    "workspace_name": "Company Workspace"
  }'`}
          response={`{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 42,
    "name": "Jane Smith",
    "email": "jane@company.com"
  },
  "tenant": {
    "id": 12,
    "name": "Company Workspace",
    "slug": "company-workspace"
  }
}`}
          t={t}
        />

        <Endpoint
          method="POST"
          path="/auth/logout"
          descEn="Revoke the current Bearer token. The token will be invalidated immediately."
          descHr="Opozvati trenutni Bearer token. Token će biti odmah nevažeći."
          curl={`curl -X POST https://api.entercrm.io/v1/auth/logout \\
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."`}
          response={`{
  "message": "Logged out successfully."
}`}
          t={t}
        />

        {/* ── Customers ────────────────────────────────────────────────── */}
        <SectionHeader id="customers" titleEn="Customers" titleHr="Korisnici" t={t} />

        <Endpoint
          method="GET"
          path="/customers"
          descEn="List all customers in the workspace with optional filters and pagination."
          descHr="Prikažite sve korisnike u radnom okruženju s opcionalnim filtrima i straničenjem."
          curl={`curl https://api.entercrm.io/v1/customers?page=1&per_page=25 \\
  -H "Authorization: Bearer <token>"`}
          response={`{
  "data": [
    {
      "id": 1,
      "name": "Ana Kovač",
      "email": "ana.kovac@example.com",
      "phone": "+385911234567",
      "rfm_score": 14,
      "rfm_segment": "Champions",
      "clv_total": 4850.00,
      "clv_predicted": 6200.00,
      "last_seen_at": "2026-03-10T14:22:00Z",
      "created_at": "2025-06-01T08:00:00Z"
    }
  ],
  "meta": { "current_page": 1, "per_page": 25, "total": 342, "last_page": 14 }
}`}
          t={t}
        />

        <Endpoint
          method="GET"
          path="/customers/{id}"
          descEn="Retrieve full profile of a single customer including events and CLV metrics."
          descHr="Dohvatite potpuni profil jednog korisnika uključujući događaje i CLV metrike."
          curl={`curl https://api.entercrm.io/v1/customers/1 \\
  -H "Authorization: Bearer <token>"`}
          response={`{
  "id": 1,
  "name": "Ana Kovač",
  "email": "ana.kovac@example.com",
  "rfm_score": 14,
  "rfm_segment": "Champions",
  "clv_total": 4850.00,
  "clv_predicted": 6200.00,
  "clv_average_order": 242.50,
  "clv_order_count": 20,
  "events_count": 87,
  "segments": ["Champions", "High Value", "Recent Buyers"]
}`}
          t={t}
        />

        <Endpoint
          method="POST"
          path="/customers"
          descEn="Create a new customer profile in the workspace."
          descHr="Izradite novi profil korisnika u radnom okruženju."
          curl={`curl -X POST https://api.entercrm.io/v1/customers \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Marko Horvatić",
    "email": "marko@example.com",
    "phone": "+385921234567",
    "city": "Zagreb",
    "country": "HR"
  }'`}
          response={`{
  "id": 343,
  "name": "Marko Horvatić",
  "email": "marko@example.com",
  "phone": "+385921234567",
  "city": "Zagreb",
  "country": "HR",
  "created_at": "2026-03-16T09:41:00Z"
}`}
          t={t}
        />

        <Endpoint
          method="PUT"
          path="/customers/{id}"
          descEn="Update an existing customer profile. Only provided fields are updated."
          descHr="Ažurirajte postojeći profil korisnika. Ažuriraju se samo navedena polja."
          curl={`curl -X PUT https://api.entercrm.io/v1/customers/343 \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{ "city": "Split", "phone": "+385981234567" }'`}
          response={`{
  "id": 343,
  "name": "Marko Horvatić",
  "email": "marko@example.com",
  "city": "Split",
  "phone": "+385981234567",
  "updated_at": "2026-03-16T10:05:00Z"
}`}
          t={t}
        />

        {/* ── Events / Tracking ────────────────────────────────────────── */}
        <SectionHeader id="tracking" titleEn="Events (Tracking)" titleHr="Događaji (Praćenje)" t={t} />

        <Endpoint
          method="POST"
          path="/track/event"
          descEn="Track a custom event for a customer. Use your API key for server-side event tracking."
          descHr="Pratite prilagođeni događaj za korisnika. Koristite API ključ za praćenje događaja na strani servera."
          curl={`curl -X POST https://api.entercrm.io/v1/track/event \\
  -H "X-API-Key: eck_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "customer_email": "ana.kovac@example.com",
    "event": "purchase",
    "properties": {
      "amount": 149.99,
      "currency": "EUR",
      "product_id": "prod_abc123",
      "product_name": "Premium Plan"
    }
  }'`}
          response={`{
  "recorded": true,
  "event_id": "evt_9f8e7d6c5b4a3210",
  "customer_id": 1
}`}
          t={t}
        />

        <Endpoint
          method="POST"
          path="/track/pageview"
          descEn="Track a pageview event. Usually sent automatically by the JS tracking snippet."
          descHr="Pratite događaj pregleda stranice. Obično se automatski šalje JS snippetom za praćenje."
          curl={`curl -X POST https://api.entercrm.io/v1/track/pageview \\
  -H "X-API-Key: eck_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "customer_email": "ana.kovac@example.com",
    "url": "https://yoursite.com/pricing",
    "referrer": "https://google.com",
    "user_agent": "Mozilla/5.0..."
  }'`}
          response={`{
  "recorded": true,
  "event_id": "evt_0a1b2c3d4e5f6789"
}`}
          t={t}
        />

        {/* ── Segments ─────────────────────────────────────────────────── */}
        <SectionHeader id="segments" titleEn="Segments" titleHr="Segmenti" t={t} />

        <Endpoint
          method="GET"
          path="/segments"
          descEn="List all customer segments defined in the workspace."
          descHr="Prikažite sve segmente korisnika definirane u radnom okruženju."
          curl={`curl https://api.entercrm.io/v1/segments \\
  -H "Authorization: Bearer <token>"`}
          response={`{
  "data": [
    {
      "id": 1,
      "name": "Champions",
      "description": "High RFM score customers who purchase frequently",
      "color": "#34d399",
      "customers_count": 48,
      "created_at": "2026-01-01T00:00:00Z"
    },
    {
      "id": 2,
      "name": "At Risk",
      "description": "Previously loyal customers who haven't engaged recently",
      "color": "#fbbf24",
      "customers_count": 23
    }
  ]
}`}
          t={t}
        />

        <Endpoint
          method="GET"
          path="/segments/{id}"
          descEn="Get a segment with its full customer list and filter criteria."
          descHr="Dohvatite segment s potpunim popisom korisnika i kriterijima filtra."
          curl={`curl https://api.entercrm.io/v1/segments/1 \\
  -H "Authorization: Bearer <token>"`}
          response={`{
  "id": 1,
  "name": "Champions",
  "filters": {
    "rfm_score_min": 12,
    "purchase_count_min": 10
  },
  "customers_count": 48,
  "customers": [
    { "id": 1, "name": "Ana Kovač", "rfm_score": 14, "clv_total": 4850.00 },
    { "id": 7, "name": "Ivan Blažević", "rfm_score": 13, "clv_total": 3920.00 }
  ]
}`}
          t={t}
        />

        {/* ── Campaigns ────────────────────────────────────────────────── */}
        <SectionHeader id="campaigns" titleEn="Campaigns" titleHr="Kampanje" t={t} />

        <Endpoint
          method="GET"
          path="/campaigns"
          descEn="List all campaigns with their status and delivery statistics."
          descHr="Prikažite sve kampanje s njihovim statusom i statistikama dostave."
          curl={`curl https://api.entercrm.io/v1/campaigns \\
  -H "Authorization: Bearer <token>"`}
          response={`{
  "data": [
    {
      "id": 1,
      "name": "March Newsletter",
      "type": "email",
      "status": "sent",
      "total_sent": 1240,
      "total_opened": 682,
      "total_clicked": 213,
      "open_rate": 55.0,
      "click_rate": 17.2,
      "sent_at": "2026-03-01T10:00:00Z"
    }
  ]
}`}
          t={t}
        />

        <Endpoint
          method="POST"
          path="/campaigns"
          descEn="Create a new email, SMS, or ad campaign targeting a specific segment."
          descHr="Izradite novu e-mail, SMS ili oglasnu kampanju koja cilja određeni segment."
          curl={`curl -X POST https://api.entercrm.io/v1/campaigns \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Spring Sale",
    "type": "email",
    "segment_id": 1,
    "subject": "Exclusive offer for our best customers",
    "body": "<h1>Spring Sale</h1><p>Use code SPRING25 for 25% off.</p>",
    "scheduled_at": "2026-03-20T09:00:00Z"
  }'`}
          response={`{
  "id": 8,
  "name": "Spring Sale",
  "type": "email",
  "status": "scheduled",
  "segment_id": 1,
  "scheduled_at": "2026-03-20T09:00:00Z",
  "created_at": "2026-03-16T11:00:00Z"
}`}
          t={t}
        />

        <Endpoint
          method="GET"
          path="/campaigns/{id}"
          descEn="Get campaign detail with full analytics breakdown."
          descHr="Dohvatite detalje kampanje s potpunom analitičkom razradom."
          curl={`curl https://api.entercrm.io/v1/campaigns/1 \\
  -H "Authorization: Bearer <token>"`}
          response={`{
  "id": 1,
  "name": "March Newsletter",
  "type": "email",
  "status": "sent",
  "segment": { "id": 1, "name": "Champions" },
  "total_sent": 1240,
  "total_opened": 682,
  "total_clicked": 213,
  "total_bounced": 14,
  "total_unsubscribed": 3,
  "open_rate": 55.0,
  "click_rate": 17.2,
  "messages": [
    { "id": 1, "customer_id": 1, "status": "opened", "opened_at": "2026-03-01T10:12:00Z" }
  ]
}`}
          t={t}
        />

        <Endpoint
          method="POST"
          path="/campaigns/{id}/send"
          descEn="Trigger immediate sending of a draft or scheduled campaign."
          descHr="Pokrenite trenutno slanje skice ili zakazane kampanje."
          curl={`curl -X POST https://api.entercrm.io/v1/campaigns/8/send \\
  -H "Authorization: Bearer <token>"`}
          response={`{
  "campaign_id": 8,
  "status": "sending",
  "queued_messages": 48,
  "message": "Campaign is being sent to 48 customers."
}`}
          t={t}
        />

        {/* ── Automations ──────────────────────────────────────────────── */}
        <SectionHeader id="automations" titleEn="Automations" titleHr="Automatizacije" t={t} />

        <Endpoint
          method="GET"
          path="/automations"
          descEn="List all automation workflows with their active status and trigger types."
          descHr="Prikažite sve automatizacijske tijek rada s njihovim aktivnim statusom i vrstama okidača."
          curl={`curl https://api.entercrm.io/v1/automations \\
  -H "Authorization: Bearer <token>"`}
          response={`{
  "data": [
    {
      "id": 1,
      "name": "Welcome Series",
      "trigger_type": "customer_created",
      "is_active": true,
      "steps_count": 5,
      "total_enrolled": 342,
      "created_at": "2026-01-10T00:00:00Z"
    }
  ]
}`}
          t={t}
        />

        <Endpoint
          method="POST"
          path="/automations"
          descEn="Create a new automation workflow with a name and trigger type."
          descHr="Izradite novi automatizacijski tijek rada s imenom i vrstom okidača."
          curl={`curl -X POST https://api.entercrm.io/v1/automations \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Win-Back Campaign",
    "trigger_type": "customer_inactive",
    "trigger_config": { "inactive_days": 60 },
    "is_active": false
  }'`}
          response={`{
  "id": 4,
  "name": "Win-Back Campaign",
  "trigger_type": "customer_inactive",
  "is_active": false,
  "steps_count": 0,
  "created_at": "2026-03-16T12:00:00Z"
}`}
          t={t}
        />

        <Endpoint
          method="POST"
          path="/automations/{id}/design"
          descEn="Save the visual flow design (nodes and edges) of an automation."
          descHr="Spremite vizualni dizajn toka (čvorovi i rubovi) automatizacije."
          curl={`curl -X POST https://api.entercrm.io/v1/automations/4/design \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "nodes": [
      { "id": "1", "type": "trigger", "data": { "label": "Customer Inactive" }, "position": { "x": 250, "y": 50 } },
      { "id": "2", "type": "action", "data": { "label": "Send Email", "email_template": "win-back-1" }, "position": { "x": 250, "y": 180 } }
    ],
    "edges": [
      { "id": "e1-2", "source": "1", "target": "2" }
    ]
  }'`}
          response={`{
  "automation_id": 4,
  "saved": true,
  "nodes_count": 2,
  "edges_count": 1
}`}
          t={t}
        />

        {/* ── API Keys ─────────────────────────────────────────────────── */}
        <SectionHeader id="api-keys" titleEn="API Keys" titleHr="API Ključevi" t={t} />

        <Endpoint
          method="GET"
          path="/api-keys"
          descEn="List all API keys for the workspace. Secret values are masked after creation."
          descHr="Prikažite sve API ključeve za radno okruženje. Tajne vrijednosti su maskirane nakon izrade."
          curl={`curl https://api.entercrm.io/v1/api-keys \\
  -H "Authorization: Bearer <token>"`}
          response={`{
  "data": [
    {
      "id": 1,
      "name": "Production Server",
      "key": "eck_your_api_key_here",
      "last_used_at": "2026-03-15T18:30:00Z",
      "created_at": "2026-01-01T00:00:00Z"
    }
  ]
}`}
          t={t}
        />

        <Endpoint
          method="POST"
          path="/api-keys"
          descEn="Generate a new API key. The full key is only shown once — store it securely."
          descHr="Generirajte novi API ključ. Cijeli ključ se prikazuje samo jednom — pohranite ga sigurno."
          curl={`curl -X POST https://api.entercrm.io/v1/api-keys \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{ "name": "Staging Server" }'`}
          response={`{
  "id": 2,
  "name": "Staging Server",
  "key": "eck_your_api_key_here",
  "created_at": "2026-03-16T12:30:00Z",
  "note": "This is the only time the full key will be shown."
}`}
          t={t}
        />

        {/* Footer note */}
        <div className="mt-12 rounded-xl border border-[#1F1F23] bg-[#111113] p-5 text-sm text-[#71717A]">
          {t(
            "All timestamps are in ISO 8601 format (UTC). Monetary values are in Euro (€). For questions or to report API issues, ",
            "Svi vremenski žigovi su u ISO 8601 formatu (UTC). Novčane vrijednosti su u eurima (€). Za pitanja ili prijavu problema s API-jem, "
          )}
          <a href="/#contact" className="text-[#6366F1] hover:text-[#818CF8] transition-colors">
            {t("contact support.", "kontaktirajte podršku.")}
          </a>
        </div>

      </div>
    </StaticPageLayout>
  );
}
