"use client";

import { StaticPageLayout } from "@/components/layout/static-page-layout";
import { useI18n } from "@/lib/i18n";

export default function DPAPage() {
  const { t } = useI18n();

  return (
    <StaticPageLayout>
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#FAFAFA] tracking-tight" style={{ letterSpacing: "-0.02em" }}>
          {t("Data Processing Agreement", "Ugovor o obradi podataka")}
        </h1>
        <p className="text-sm text-[#71717A] mt-3">{t("Effective: March 1, 2026", "Na snazi od: 1. ožujka 2026.")}</p>
        <p className="mt-4 text-sm text-[#A1A1AA] leading-relaxed max-w-3xl">
          {t(
            `This Data Processing Agreement ("DPA") forms part of the agreement between EnterSolutions d.o.o. ("Processor") and the customer ("Controller") for the use of EnterCRM services. This DPA is entered into pursuant to Article 28 of the GDPR.`,
            `Ovaj Ugovor o obradi podataka ("DPA") čini dio ugovora između EnterSolutions d.o.o. ("Izvršitelj obrade") i kupca ("Voditelj obrade") za korištenje usluga EnterCRM. Ovaj DPA sklopljen je na temelju članka 28. GDPR-a.`
          )}
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">{t("1. Definitions", "1. Definicije")}</h2>
          <div className="space-y-3 text-sm text-[#A1A1AA] leading-relaxed">
            <p><span className="text-[#FAFAFA] font-medium">{t("Controller", "Voditelj obrade")}</span>: {t("The customer who determines the purposes and means of processing personal data through EnterCRM.", "Kupac koji određuje svrhe i sredstva obrade osobnih podataka putem EnterCRM-a.")}</p>
            <p><span className="text-[#FAFAFA] font-medium">{t("Processor", "Izvršitelj obrade")}</span>: {t("EnterSolutions d.o.o., which processes personal data on behalf of the Controller.", "EnterSolutions d.o.o., koji obrađuje osobne podatke u ime Voditelja obrade.")}</p>
            <p><span className="text-[#FAFAFA] font-medium">{t("Personal Data", "Osobni podaci")}</span>: {t("Any information relating to an identified or identifiable natural person processed through the service.", "Sve informacije koje se odnose na identificiranu ili prepoznatljivu fizičku osobu obrađene putem usluge.")}</p>
            <p><span className="text-[#FAFAFA] font-medium">{t("Sub-processor", "Pod-izvršitelj")}</span>: {t("Any third party engaged by the Processor to process personal data on behalf of the Controller.", "Bilo koja treća strana angažirana od Izvršitelja obrade za obradu osobnih podataka u ime Voditelja obrade.")}</p>
          </div>
        </section>

        <section className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">{t("2. Scope and Purpose", "2. Opseg i svrha")}</h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">{t("The Processor shall process personal data only for the purpose of providing the EnterCRM service as described in the main service agreement, including: customer relationship management, event tracking and analytics, customer segmentation and RFM analysis, campaign management and delivery (email, SMS, ads), automation workflow execution, and reporting and analytics.", "Izvršitelj obrade obrađivat će osobne podatke isključivo u svrhu pružanja usluge EnterCRM kako je opisano u glavnom ugovoru o usluzi, uključujući: upravljanje odnosima s klijentima, praćenje događaja i analitiku, segmentaciju kupaca i RFM analizu, upravljanje i isporuku kampanja (email, SMS, reklame), izvršavanje tijekova automatizacije te izvještavanje i analitiku.")}</p>
        </section>

        <section className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">{t("3. Types of Personal Data", "3. Vrste osobnih podataka")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { en: "Contact information (name, email, phone, address)", hr: "Kontakt podaci (ime, email, telefon, adresa)" },
              { en: "Company and employment information", hr: "Podaci o tvrtki i zaposlenju" },
              { en: "Behavioral data (page views, clicks, purchases)", hr: "Podaci o ponašanju (pregledi, klikovi, kupnje)" },
              { en: "Transaction and financial data", hr: "Transakcijski i financijski podaci" },
              { en: "Device and technical data (IP, browser, OS)", hr: "Podaci o uređaju (IP, preglednik, OS)" },
              { en: "Communication data (email opens, SMS delivery)", hr: "Komunikacijski podaci (otvaranje emaila, dostava SMS-a)" },
            ].map((item) => (
              <div key={item.en} className="rounded-lg bg-[#0A0A0B] border border-[#1F1F23] p-3">
                <p className="text-xs text-[#A1A1AA]">{t(item.en, item.hr)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">{t("4. Processor Obligations", "4. Obveze izvršitelja obrade")}</h2>
          <ul className="space-y-2 text-sm text-[#A1A1AA] leading-relaxed">
            {[
              { en: "Process personal data only on documented instructions from the Controller", hr: "Obrađivati osobne podatke samo prema dokumentiranim uputama Voditelja obrade" },
              { en: "Ensure that persons authorized to process data are bound by confidentiality", hr: "Osigurati da osobe ovlaštene za obradu podataka budu vezane obvezom povjerljivosti" },
              { en: "Implement appropriate technical and organizational security measures", hr: "Implementirati odgovarajuće tehničke i organizacijske sigurnosne mjere" },
              { en: "Assist the Controller in responding to data subject requests", hr: "Pomagati Voditelju obrade u odgovaranju na zahtjeve ispitanika" },
              { en: "Notify the Controller without undue delay of any data breach", hr: "Obavijestiti Voditelja obrade bez nepotrebnog odgađanja o svakoj povredi podataka" },
              { en: "Delete or return all personal data upon termination of the agreement", hr: "Izbrisati ili vratiti sve osobne podatke po prestanku ugovora" },
              { en: "Make available all information necessary to demonstrate compliance", hr: "Staviti na raspolaganje sve informacije potrebne za dokazivanje usklađenosti" },
            ].map((item) => (
              <li key={item.en} className="flex items-start gap-2">
                <span className="text-[#6366F1] mt-1 shrink-0">&#8226;</span>
                {t(item.en, item.hr)}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">{t("5. Sub-processing", "5. Pod-obrada")}</h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">{t("The Controller provides general authorization for the Processor to engage sub-processors. The Processor will maintain an up-to-date list of sub-processors and notify the Controller of any intended changes, providing the Controller an opportunity to object. Sub-processors are bound by equivalent data protection obligations.", "Voditelj obrade daje opće ovlaštenje Izvršitelju obrade za angažiranje pod-izvršitelja. Izvršitelj obrade održavat će ažurirani popis pod-izvršitelja i obavijestiti Voditelja obrade o svim planiranim promjenama, pružajući Voditelju obrade mogućnost prigovora. Pod-izvršitelji su vezani jednakovrijednim obvezama zaštite podataka.")}</p>
        </section>

        <section className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">{t("6. Security Measures", "6. Sigurnosne mjere")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { en: "Encryption at rest (AES-256) and in transit (TLS 1.3)", hr: "Enkripcija u mirovanju (AES-256) i u prijenosu (TLS 1.3)" },
              { en: "Role-based access control with least privilege principle", hr: "Kontrola pristupa temeljena na ulogama s načelom najmanjih privilegija" },
              { en: "Regular security assessments and penetration testing", hr: "Redovite sigurnosne procjene i penetracijska testiranja" },
              { en: "Automated backup with point-in-time recovery", hr: "Automatsko sigurnosno kopiranje s oporavkom u određenom trenutku" },
              { en: "Intrusion detection and monitoring systems", hr: "Sustavi za otkrivanje upada i nadzor" },
              { en: "Multi-tenant data isolation at database level", hr: "Izolacija podataka višekorisničkih sustava na razini baze podataka" },
              { en: "Audit logging for all data access and modifications", hr: "Revizijsko bilježenje za sav pristup podacima i izmjene" },
              { en: "Incident response procedures and disaster recovery plan", hr: "Postupci odgovora na incidente i plan oporavka od katastrofe" },
            ].map((item) => (
              <div key={item.en} className="rounded-lg bg-[#0A0A0B] border border-[#1F1F23] p-3">
                <p className="text-xs text-[#A1A1AA]">{t(item.en, item.hr)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">{t("7. Data Breach Notification", "7. Obavijest o povredi podataka")}</h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">{t("The Processor shall notify the Controller without undue delay (and in any event within 72 hours) after becoming aware of a personal data breach. The notification shall include: the nature of the breach, categories and approximate number of affected data subjects, likely consequences, and measures taken or proposed to address the breach.", "Izvršitelj obrade obavijestit će Voditelja obrade bez nepotrebnog odgađanja (a u svakom slučaju u roku od 72 sata) nakon saznanja o povredi osobnih podataka. Obavijest će uključivati: prirodu povrede, kategorije i približan broj pogođenih ispitanika, vjerojatne posljedice te mjere poduzete ili predložene za rješavanje povrede.")}</p>
        </section>

        <section className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">{t("8. Audit Rights", "8. Prava revizije")}</h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">{t("The Controller has the right to conduct audits, including inspections, to verify the Processor's compliance with this DPA. The Processor shall cooperate with such audits and provide all necessary information and access. Audits shall be conducted with reasonable notice and during normal business hours.", "Voditelj obrade ima pravo provoditi revizije, uključujući inspekcije, radi provjere usklađenosti Izvršitelja obrade s ovim DPA-om. Izvršitelj obrade surađivat će s takvim revizijama i pružiti sve potrebne informacije i pristup. Revizije se provode uz razumnu najavu i tijekom redovnog radnog vremena.")}</p>
        </section>

        <section className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">{t("9. Data Return and Deletion", "9. Vraćanje i brisanje podataka")}</h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">{t("Upon termination of the service agreement, the Processor shall, at the Controller's choice, return all personal data or delete all personal data and certify deletion in writing. Data will be retained for a maximum of 30 days after termination to allow for data export, after which it will be permanently deleted from all systems including backups.", "Po prestanku ugovora o usluzi, Izvršitelj obrade će, prema izboru Voditelja obrade, vratiti sve osobne podatke ili izbrisati sve osobne podatke i pisano potvrditi brisanje. Podaci će se zadržati najduže 30 dana nakon prestanka kako bi se omogućio izvoz podataka, nakon čega će biti trajno izbrisani iz svih sustava uključujući sigurnosne kopije.")}</p>
        </section>

        <section className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">{t("10. Term and Governing Law", "10. Trajanje i mjerodavno pravo")}</h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">{t("This DPA shall remain in effect for the duration of the service agreement and for as long as the Processor processes personal data on behalf of the Controller. This DPA is governed by the laws of the Republic of Croatia. Any disputes shall be resolved by the competent courts in Zagreb, Croatia.", "Ovaj DPA ostaje na snazi za vrijeme trajanja ugovora o usluzi i sve dok Izvršitelj obrade obrađuje osobne podatke u ime Voditelja obrade. Ovaj DPA uređen je zakonima Republike Hrvatske. Sporovi se rješavaju pred nadležnim sudovima u Zagrebu, Hrvatska.")}</p>
        </section>

        <section className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">{t("Contact", "Kontakt")}</h2>
          <div className="rounded-lg bg-[#0A0A0B] border border-[#1F1F23] p-4 text-sm text-[#A1A1AA] space-y-1">
            <p>Email: <a href="mailto:legal@entersolutions.io" className="text-[#6366F1] hover:text-[#818CF8]">legal@entersolutions.io</a></p>
            <p>{t("Address", "Adresa")}: EnterSolutions d.o.o., Zagreb, Croatia</p>
          </div>
        </section>
      </div>
    </StaticPageLayout>
  );
}
