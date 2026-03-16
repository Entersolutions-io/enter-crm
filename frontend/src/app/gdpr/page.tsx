"use client";

import { StaticPageLayout } from "@/components/layout/static-page-layout";
import { useI18n } from "@/lib/i18n";

export default function GDPRPage() {
  const { t } = useI18n();

  return (
    <StaticPageLayout>
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#FAFAFA] tracking-tight" style={{ letterSpacing: "-0.02em" }}>
          {t("GDPR Compliance", "GDPR usklađenost")}
        </h1>
        <p className="text-sm text-[#71717A] mt-3">{t("Effective: March 1, 2026", "Na snazi od: 1. ožujka 2026.")}</p>
        <p className="mt-4 text-sm text-[#A1A1AA] leading-relaxed max-w-3xl">
          {t(
            `EnterSolutions d.o.o. ("EnterSolutions") is committed to protecting personal data in compliance with the General Data Protection Regulation (EU) 2016/679 ("GDPR"). This page outlines how we ensure compliance as both a data controller and data processor.`,
            `EnterSolutions d.o.o. ("EnterSolutions") posvećen je zaštiti osobnih podataka u skladu s Općom uredbom o zaštiti podataka (EU) 2016/679 ("GDPR"). Ova stranica opisuje kako osiguravamo usklađenost kao voditelj obrade i izvršitelj obrade podataka.`
          )}
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">{t("Our Commitment to GDPR", "Naša obveza prema GDPR-u")}</h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">{t("As a company headquartered in Zagreb, Croatia (an EU member state), EnterSolutions is fully subject to GDPR. We have implemented comprehensive data protection measures across our organization, products, and services. Our CRM platform is designed with privacy by design and by default principles.", "Kao tvrtka sa sjedištem u Zagrebu, Hrvatska (država članica EU), EnterSolutions u potpunosti podliježe GDPR-u. Implementirali smo sveobuhvatne mjere zaštite podataka u cijeloj organizaciji, proizvodima i uslugama. Naša CRM platforma dizajnirana je s načelima privatnosti po dizajnu i prema zadanim postavkama.")}</p>
        </section>

        <section className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">{t("Legal Bases for Processing", "Pravne osnove za obradu")}</h2>
          <div className="space-y-3">
            {[
              { tEn: "Consent (Art. 6(1)(a))", tHr: "Privola (čl. 6(1)(a))", dEn: "For marketing communications, cookie tracking, and optional analytics. Consent can be withdrawn at any time.", dHr: "Za marketinške komunikacije, praćenje kolačića i opcionalne analitike. Privola se može povući u bilo kojem trenutku." },
              { tEn: "Contractual Necessity (Art. 6(1)(b))", tHr: "Ugovorna nužnost (čl. 6(1)(b))", dEn: "For providing the EnterCRM service, managing accounts, processing payments, and core functionality.", dHr: "Za pružanje usluge EnterCRM, upravljanje računima, obradu plaćanja i osnovnu funkcionalnost." },
              { tEn: "Legitimate Interest (Art. 6(1)(f))", tHr: "Legitimni interes (čl. 6(1)(f))", dEn: "For service improvement, security monitoring, fraud prevention, and internal analytics.", dHr: "Za poboljšanje usluge, sigurnosni nadzor, sprječavanje prijevara i internu analitiku." },
              { tEn: "Legal Obligation (Art. 6(1)(c))", tHr: "Pravna obveza (čl. 6(1)(c))", dEn: "For tax regulations, accounting requirements, and lawful government requests.", dHr: "Za porezne propise, računovodstvene zahtjeve i zakonite zahtjeve vlade." },
            ].map((item) => (
              <div key={item.tEn} className="rounded-lg bg-[#0A0A0B] border border-[#1F1F23] p-4">
                <h3 className="text-sm font-medium text-[#FAFAFA] mb-1">{t(item.tEn, item.tHr)}</h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">{t(item.dEn, item.dHr)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">{t("Data Subject Rights (Articles 15-22)", "Prava ispitanika (članci 15-22)")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { en: "Right of Access (Art. 15) — Obtain a copy of your personal data", hr: "Pravo pristupa (čl. 15) — Dobijte kopiju vaših osobnih podataka" },
              { en: "Right to Rectification (Art. 16) — Correct inaccurate data", hr: "Pravo na ispravak (čl. 16) — Ispravite netočne podatke" },
              { en: "Right to Erasure (Art. 17) — Request deletion of your data", hr: "Pravo na brisanje (čl. 17) — Zatražite brisanje vaših podataka" },
              { en: "Right to Restriction (Art. 18) — Restrict processing", hr: "Pravo na ograničenje (čl. 18) — Ograničite obradu" },
              { en: "Right to Data Portability (Art. 20) — Receive data in machine-readable format", hr: "Pravo na prenosivost podataka (čl. 20) — Primite podatke u strojno čitljivom formatu" },
              { en: "Right to Object (Art. 21) — Object to processing", hr: "Pravo na prigovor (čl. 21) — Prigovorite obradi" },
              { en: "Rights Related to Automated Decisions (Art. 22)", hr: "Prava vezana uz automatizirane odluke (čl. 22)" },
              { en: "Right to Withdraw Consent at any time", hr: "Pravo na povlačenje privole u bilo kojem trenutku" },
            ].map((right) => (
              <div key={right.en} className="rounded-lg bg-[#0A0A0B] border border-[#1F1F23] p-3">
                <p className="text-xs text-[#A1A1AA] leading-relaxed">{t(right.en, right.hr)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">{t("Sub-processors", "Pod-izvršitelji obrade")}</h2>
          <div className="space-y-2">
            {[
              { name: "Google Cloud Platform", loc: "EU (Belgium)", purpose: { en: "Infrastructure & hosting", hr: "Infrastruktura i hosting" } },
              { name: "Stripe", loc: "EU/US (SCCs)", purpose: { en: "Payment processing", hr: "Obrada plaćanja" } },
              { name: "SendGrid (Twilio)", loc: "EU/US (SCCs)", purpose: { en: "Email delivery", hr: "Dostava emaila" } },
              { name: "Cloudflare", loc: "Global", purpose: { en: "CDN & DDoS protection", hr: "CDN i DDoS zaštita" } },
              { name: "Sentry", loc: "EU (Frankfurt)", purpose: { en: "Error monitoring", hr: "Praćenje grešaka" } },
            ].map((sub) => (
              <div key={sub.name} className="flex items-center justify-between rounded-lg bg-[#0A0A0B] border border-[#1F1F23] px-4 py-3">
                <span className="text-sm text-[#FAFAFA] font-medium">{sub.name}</span>
                <div className="flex items-center gap-4 text-xs text-[#71717A]">
                  <span>{t(sub.purpose.en, sub.purpose.hr)}</span>
                  <span>{sub.loc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">{t("International Data Transfers", "Međunarodni prijenosi podataka")}</h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">{t("Your data is primarily stored within the EEA. When transfers outside the EEA are necessary, we use Standard Contractual Clauses (SCCs) approved by the European Commission to ensure adequate protection.", "Vaši podaci primarno se pohranjuju unutar EGP-a. Kada su prijenosi izvan EGP-a potrebni, koristimo Standardne ugovorne klauzule (SCC) odobrene od Europske komisije za osiguranje odgovarajuće zaštite.")}</p>
        </section>

        <section className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">{t("Data Breach Notification", "Obavijest o povredi podataka")}</h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">{t("In the event of a personal data breach, we will notify the Croatian Personal Data Protection Agency (AZOP) within 72 hours (Article 33 GDPR), notify affected data subjects without undue delay if the breach poses high risk (Article 34 GDPR), and document all breaches in our internal register.", "U slučaju povrede osobnih podataka, obavijestit ćemo Agenciju za zaštitu osobnih podataka (AZOP) u roku od 72 sata (članak 33. GDPR-a), obavijestiti pogođene ispitanike bez nepotrebnog odgađanja ako povreda predstavlja visoki rizik (članak 34. GDPR-a) te dokumentirati sve povrede u internom registru.")}</p>
        </section>

        <section className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">{t("Supervisory Authority", "Nadzorno tijelo")}</h2>
          <div className="rounded-lg bg-[#0A0A0B] border border-[#1F1F23] p-4 text-sm text-[#A1A1AA] space-y-1">
            <p className="font-medium text-[#FAFAFA]">Agencija za zaštitu osobnih podataka (AZOP)</p>
            <p>Fra Grge Martića 14, 10000 Zagreb, Croatia</p>
            <p>azop.hr</p>
          </div>
          <p className="text-sm text-[#A1A1AA] mt-3">{t("You have the right to lodge a complaint with AZOP or any other EU supervisory authority.", "Imate pravo podnijeti pritužbu AZOP-u ili bilo kojem drugom nadzornom tijelu EU.")}</p>
        </section>

        <section className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">{t("Contact", "Kontakt")}</h2>
          <div className="rounded-lg bg-[#0A0A0B] border border-[#1F1F23] p-4 text-sm text-[#A1A1AA] space-y-1">
            <p>Email: <a href="mailto:privacy@entersolutions.io" className="text-[#6366F1] hover:text-[#818CF8]">privacy@entersolutions.io</a></p>
            <p>{t("Address", "Adresa")}: EnterSolutions d.o.o., Zagreb, Croatia</p>
          </div>
          <p className="text-xs text-[#71717A] mt-3">{t("We will respond to requests within 30 days.", "Odgovorit ćemo na zahtjeve u roku od 30 dana.")}</p>
        </section>
      </div>
    </StaticPageLayout>
  );
}
