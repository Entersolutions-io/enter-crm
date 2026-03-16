/* eslint-disable @next/next/no-img-element */
"use client";

import { StaticPageLayout } from "@/components/layout/static-page-layout";
import { useI18n } from "@/lib/i18n";
import { ScrollReveal } from "@/components/effects/scroll-reveal";

type Partner = {
  name: string;
  slug: string;
  logoUrl?: string;
  role: string;
  roleHr: string;
};

type Category = {
  label: string;
  labelHr: string;
  partners: Partner[];
};

const categories: Category[] = [
  {
    label: "Cloud & Infrastructure",
    labelHr: "Oblak i infrastruktura",
    partners: [
      {
        name: "Google Cloud",
        slug: "googlecloud",
        role: "Primary cloud platform for compute, storage, and managed services",
        roleHr: "Primarna cloud platforma za računanje, pohranu i upravljane usluge",
      },
      {
        name: "Amazon Web Services",
        slug: "amazonaws",
        logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
        role: "Redundant cloud infrastructure and global CDN distribution",
        roleHr: "Redundantna cloud infrastruktura i globalna CDN distribucija",
      },
      {
        name: "Microsoft Azure",
        slug: "microsoftazure",
        logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
        role: "Enterprise integrations and hybrid cloud connectivity",
        roleHr: "Enterprise integracije i hibridna cloud povezanost",
      },
      {
        name: "Docker",
        slug: "docker",
        role: "Container runtime for consistent deployments across all environments",
        roleHr: "Container runtime za dosljedna deployanja u svim okruženjima",
      },
      {
        name: "Kubernetes",
        slug: "kubernetes",
        role: "Orchestration layer for scalable, self-healing workloads",
        roleHr: "Sloj orkestracije za skalabilne i samozacjeljujuće workloade",
      },
      {
        name: "Cloudflare",
        slug: "cloudflare",
        role: "Edge network, DDoS protection, and DNS management",
        roleHr: "Edge mreža, DDoS zaštita i upravljanje DNS-om",
      },
    ],
  },
  {
    label: "Frontend",
    labelHr: "Frontend",
    partners: [
      {
        name: "React",
        slug: "react",
        role: "Component model powering the entire CRM user interface",
        roleHr: "Komponentni model koji pokreće cijelo CRM korisničko sučelje",
      },
      {
        name: "Next.js",
        slug: "nextdotjs",
        role: "App Router framework — server components, routing, and optimised builds",
        roleHr: "App Router framework — serverske komponente, routing i optimizirani buildovi",
      },
      {
        name: "TypeScript",
        slug: "typescript",
        role: "Static typing for safer, more maintainable frontend code",
        roleHr: "Statičko tipiziranje za sigurniji i lakše održivi frontend kod",
      },
      {
        name: "Tailwind CSS",
        slug: "tailwindcss",
        role: "Utility-first styling system for the design system",
        roleHr: "Utility-first sustav stiliziranja za dizajn sustav",
      },
      {
        name: "Vue.js",
        slug: "vuedotjs",
        role: "Supported framework for embeddable widget integrations",
        roleHr: "Podržani framework za ugrađene widget integracije",
      },
      {
        name: "Angular",
        slug: "angular",
        role: "Enterprise client integration support and SDK compatibility",
        roleHr: "Enterprise podrška za klijentske integracije i SDK kompatibilnost",
      },
    ],
  },
  {
    label: "Backend",
    labelHr: "Backend",
    partners: [
      {
        name: "Laravel",
        slug: "laravel",
        role: "Core API framework — authentication, queues, and business logic",
        roleHr: "Temeljni API framework — autentifikacija, redovi i poslovna logika",
      },
      {
        name: "Node.js",
        slug: "nodedotjs",
        role: "Real-time event processing and WebSocket gateway",
        roleHr: "Obrada događaja u stvarnom vremenu i WebSocket gateway",
      },
      {
        name: "PHP",
        slug: "php",
        role: "Server-side runtime for the Laravel application layer",
        roleHr: "Server-side runtime za Laravel aplikacijski sloj",
      },
      {
        name: "Python",
        slug: "python",
        role: "Data science pipelines — RFM scoring and CLV modelling",
        roleHr: "Data science procesni tokovi — RFM bodovanje i CLV modeliranje",
      },
      {
        name: "Django",
        slug: "django",
        role: "Analytics microservice layer for heavy computation tasks",
        roleHr: "Mikroservisni sloj analitike za zahtjevne računske zadatke",
      },
      {
        name: "Ruby on Rails",
        slug: "rubyonrails",
        role: "Integration adapters for third-party CRM data migrations",
        roleHr: "Integracijski adapteri za migracije podataka iz vanjskih CRM sustava",
      },
    ],
  },
  {
    label: "Databases",
    labelHr: "Baze podataka",
    partners: [
      {
        name: "PostgreSQL",
        slug: "postgresql",
        role: "Primary relational database for transactional data",
        roleHr: "Primarna relacijska baza za transakcijske podatke",
      },
      {
        name: "MySQL",
        slug: "mysql",
        role: "Legacy data source compatibility and migration support",
        roleHr: "Kompatibilnost s naslijeđenim izvorima podataka i podrška za migracije",
      },
      {
        name: "Redis",
        slug: "redis",
        role: "High-speed caching layer and real-time session storage",
        roleHr: "Brzi sloj predmemoriranja i pohrana sesija u stvarnom vremenu",
      },
      {
        name: "MongoDB",
        slug: "mongodb",
        role: "Flexible document store for raw event and behavioural logs",
        roleHr: "Fleksibilna pohrana dokumenata za sirove događaje i bihevioralne logove",
      },
      {
        name: "Elasticsearch",
        slug: "elasticsearch",
        role: "Full-text search and advanced customer query engine",
        roleHr: "Pretraživanje punog teksta i napredni mehanizam upita korisnika",
      },
      {
        name: "ClickHouse",
        slug: "clickhouse",
        role: "Columnar analytics store for high-volume event aggregation",
        roleHr: "Kolumnarna analitička pohrana za agregaciju velikih količina događaja",
      },
    ],
  },
  {
    label: "Communication",
    labelHr: "Komunikacija",
    partners: [
      {
        name: "Twilio",
        slug: "twilio",
        logoUrl: "https://cdn.jsdelivr.net/gh/gilbarbara/logos@main/logos/twilio-icon.svg",
        role: "SMS and voice channel delivery for automated campaigns",
        roleHr: "Dostava SMS i glasovnih kanala za automatizirane kampanje",
      },
      {
        name: "SendGrid",
        slug: "sendgrid",
        logoUrl: "https://cdn.jsdelivr.net/gh/gilbarbara/logos@main/logos/sendgrid-icon.svg",
        role: "Transactional and bulk email delivery infrastructure",
        roleHr: "Infrastruktura za transakcijsku i masovnu dostavu e-pošte",
      },
      {
        name: "Mailgun",
        slug: "mailgun",
        role: "Programmatic email API with advanced tracking and analytics",
        roleHr: "Programski email API s naprednim praćenjem i analitikom",
      },
      {
        name: "Vonage",
        slug: "vonage",
        role: "International SMS routing and two-factor authentication",
        roleHr: "Međunarodne SMS rute i dvofaktorska autentifikacija",
      },
    ],
  },
  {
    label: "Payments",
    labelHr: "Plaćanja",
    partners: [
      {
        name: "Stripe",
        slug: "stripe",
        role: "Primary payment processor for subscription billing and invoicing",
        roleHr: "Primarni procesor plaćanja za pretplatnu naplatu i fakturiranje",
      },
      {
        name: "PayPal",
        slug: "paypal",
        role: "Alternative checkout and recurring payment integration",
        roleHr: "Alternativna naplata i integracija ponavljajućih plaćanja",
      },
    ],
  },
  {
    label: "Analytics & Monitoring",
    labelHr: "Analitika i nadzor",
    partners: [
      {
        name: "Grafana",
        slug: "grafana",
        role: "Infrastructure dashboards and real-time operational observability",
        roleHr: "Infrastrukturne nadzorne ploče i operativna vidljivost u stvarnom vremenu",
      },
      {
        name: "Datadog",
        slug: "datadog",
        role: "APM, log management, and distributed tracing across all services",
        roleHr: "APM, upravljanje logovima i distribuirano praćenje svih servisa",
      },
      {
        name: "Sentry",
        slug: "sentry",
        role: "Error tracking and performance monitoring for the frontend and API",
        roleHr: "Praćenje grešaka i nadzor performansi za frontend i API",
      },
    ],
  },
  {
    label: "DevOps & Tools",
    labelHr: "DevOps i alati",
    partners: [
      {
        name: "GitHub",
        slug: "github",
        role: "Source control, pull requests, and CI/CD pipeline triggers",
        roleHr: "Upravljanje izvornim kodom, pull requestovi i okidači CI/CD procesnih tokova",
      },
      {
        name: "GitLab",
        slug: "gitlab",
        role: "Self-hosted Git and integrated pipeline runner for enterprise clients",
        roleHr: "Self-hosted Git i integrirani pipeline runner za enterprise klijente",
      },
      {
        name: "Terraform",
        slug: "terraform",
        role: "Infrastructure-as-code for reproducible cloud environment provisioning",
        roleHr: "Infrastruktura-kao-kod za reproducibilno provisioning cloud okruženja",
      },
      {
        name: "Jenkins",
        slug: "jenkins",
        role: "Automated build and deployment pipelines for legacy environments",
        roleHr: "Automatizirani buildovi i deployamenti za naslijeđena okruženja",
      },
    ],
  },
];

function PartnerCard({ partner, delay }: { partner: Partner; delay: number }) {
  const { t } = useI18n();
  const logoSrc = partner.logoUrl
    ? partner.logoUrl
    : `https://cdn.simpleicons.org/${partner.slug}/white`;
  const needsInvert = !!partner.logoUrl;

  return (
    <ScrollReveal delay={delay}>
      <div className="group relative flex flex-col items-center gap-4 rounded-2xl border border-[#1F1F23] bg-[#111113] p-6 text-center transition-all duration-300 hover:border-[#6366F1]/40 hover:bg-[#111113]/80 hover:shadow-[0_0_24px_rgba(99,102,241,0.08)]">
        {/* Logo */}
        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#1F1F23] bg-[#0A0A0B] transition-colors duration-300 group-hover:border-[#6366F1]/30">
          <img
            src={logoSrc}
            alt={partner.name}
            width={28}
            height={28}
            className="h-7 w-7 object-contain opacity-70 transition-opacity duration-300 group-hover:opacity-100"
            style={needsInvert ? { filter: "brightness(0) invert(1)" } : undefined}
            onError={(e) => {
              const el = e.currentTarget;
              el.style.display = "none";
              const fallback = el.parentElement?.querySelector(".logo-fallback") as HTMLElement;
              if (fallback) fallback.style.display = "flex";
            }}
          />
          <span
            className="logo-fallback hidden h-7 w-7 items-center justify-center rounded text-sm font-bold text-[#6366F1]"
          >
            {partner.name.charAt(0)}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-sm font-semibold text-[#FAFAFA]">{partner.name}</h3>

        {/* Role */}
        <p className="text-xs leading-relaxed text-[#71717A]">
          {t(partner.role, partner.roleHr)}
        </p>
      </div>
    </ScrollReveal>
  );
}

export default function PartnersPage() {
  const { t } = useI18n();

  return (
    <StaticPageLayout>
      {/* Hero */}
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mb-20 text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#6366F1]">
              {t("Technology Partners", "Tehnološki partneri")}
            </p>
            <h1
              className="mb-6 text-4xl font-bold tracking-tight text-[#FAFAFA] md:text-6xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              {t("Built on the best", "Izgrađeno na najboljima")}
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#A1A1AA] md:text-lg">
              {t(
                "EnterCRM integrates with industry-leading platforms across every layer of the stack — from cloud infrastructure to communication channels — so your data flows seamlessly and your teams stay in sync.",
                "EnterCRM se integrira s vodećim platformama u industriji na svakom sloju tehničkog stoska — od cloud infrastrukture do komunikacijskih kanala — kako bi vaši podaci tekli besprijekorno i vaši timovi ostali usklađeni."
              )}
            </p>
          </div>
        </ScrollReveal>

        {/* Category Sections */}
        <div className="space-y-20">
          {categories.map((category, categoryIndex) => (
            <section key={category.label}>
              {/* Category Header */}
              <ScrollReveal delay={0.05}>
                <div className="mb-8 flex items-center gap-4">
                  <div className="h-px flex-1 bg-[#1F1F23]" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#52525B]">
                    {t(category.label, category.labelHr)}
                  </span>
                  <div className="h-px flex-1 bg-[#1F1F23]" />
                </div>
              </ScrollReveal>

              {/* Partners Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {category.partners.map((partner, partnerIndex) => (
                  <PartnerCard
                    key={partner.slug}
                    partner={partner}
                    delay={partnerIndex * 0.06 + categoryIndex * 0.02}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <ScrollReveal delay={0.1}>
          <div className="mt-24 rounded-2xl border border-[#1F1F23] bg-[#111113] px-8 py-10 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#6366F1]">
              {t("Missing an integration?", "Nedostaje integracija?")}
            </p>
            <p className="mx-auto max-w-xl text-base text-[#A1A1AA]">
              {t(
                "We continuously expand our partner ecosystem. If you need a specific integration, reach out and we will prioritise it.",
                "Kontinuirano proširujemo naš partnerski ekosustav. Ako trebate određenu integraciju, javite nam se i mi ćemo je prioritizirati."
              )}
            </p>
            <a
              href="/#contact"
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-[#6366F1]/40 bg-[#6366F1]/10 px-5 py-2.5 text-sm font-medium text-[#6366F1] transition-all duration-200 hover:border-[#6366F1]/70 hover:bg-[#6366F1]/20"
            >
              {t("Get in touch", "Kontaktirajte nas")}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </StaticPageLayout>
  );
}
