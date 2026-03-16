"use client";

import { StaticPageLayout } from "@/components/layout/static-page-layout";
import { useI18n } from "@/lib/i18n";

export default function CookiePolicyPage() {
  const { t } = useI18n();

  return (
    <StaticPageLayout>
      <div className="space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[#FAFAFA] mb-3">
            {t("Cookie Policy", "Politika kolačića")}
          </h1>
          <p className="text-sm text-[#71717A]">
            {t("Effective date: March 1, 2026", "Datum stupanja na snagu: 1. ožujka 2026.")}
            {" · "}
            {t("Last updated: March 1, 2026", "Zadnje ažuriranje: 1. ožujka 2026.")}
          </p>
          <p className="mt-4 text-sm text-[#A1A1AA] leading-relaxed max-w-3xl">
            {t(
              `This Cookie Policy explains how EnterSolutions d.o.o. ("EnterSolutions", "we", "our", or "us") uses cookies and similar tracking technologies when you visit our website or use the EnterCRM service. This policy should be read alongside our Privacy Policy.`,
              `Ova Politika kolačića objašnjava kako EnterSolutions d.o.o. ("EnterSolutions", "mi", "naš" ili "nas") koristi kolačiće i slične tehnologije praćenja kada posjećujete našu web stranicu ili koristite uslugu EnterCRM. Ovu politiku treba čitati zajedno s našom Politikom privatnosti.`
            )}
          </p>
        </div>

        {/* Table of Contents */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6">
          <h2 className="text-base font-semibold text-[#FAFAFA] mb-4">
            {t("Table of Contents", "Sadržaj")}
          </h2>
          <ol className="space-y-1 text-sm text-[#6366F1] list-decimal list-inside">
            {[
              t("What Are Cookies?", "Što su kolačići?"),
              t("Types of Cookies We Use", "Vrste kolačića koje koristimo"),
              t("Essential Cookies", "Nužni kolačići"),
              t("Analytics Cookies", "Analitički kolačići"),
              t("Functional Cookies", "Funkcionalni kolačići"),
              t("Marketing Cookies", "Marketinški kolačići"),
              t("Third-Party Cookies", "Kolačići trećih strana"),
              t("Cookie List", "Popis kolačića"),
              t("Managing Your Cookie Preferences", "Upravljanje vašim preferencijama kolačića"),
              t("Updates to This Policy", "Ažuriranja ove politike"),
            ].map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        </div>

        {/* Section 1 */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("1. What Are Cookies?", "1. Što su kolačići?")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a website. They are widely used by website owners to make their websites work, improve user experience, and to provide reporting information.",
              "Kolačići su male tekstualne datoteke koje se postavljaju na vaš uređaj (računalo, pametni telefon ili tablet) kada posjetite web stranicu. Vlasnici web stranica ih naširoko koriste kako bi njihove web stranice funkcionirale, poboljšali korisničko iskustvo i pružali izvještajne informacije."
            )}
          </p>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "Cookies set by the website owner (in this case, EnterSolutions) are called \"first-party cookies\". Cookies set by parties other than the website owner are called \"third-party cookies\". Third-party cookies enable third-party features or functionality to be provided on or through the website.",
              "Kolačići koje postavlja vlasnik web stranice (u ovom slučaju, EnterSolutions) nazivaju se \"kolačići prve strane\". Kolačići koje postavljaju strane koje nisu vlasnik web stranice nazivaju se \"kolačići treće strane\". Kolačići trećih strana omogućuju pružanje funkcija ili funkcionalnosti trećih strana na web stranici ili kroz nju."
            )}
          </p>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "In addition to cookies, we may use similar technologies such as web beacons (also called tracking pixels), local storage, and session storage. This policy applies to all such technologies collectively.",
              "Osim kolačića, možemo koristiti slične tehnologije poput web signala (poznati i kao pikseli za praćenje), lokalne pohrane i pohrane sesije. Ova politika primjenjuje se na sve takve tehnologije zajedno."
            )}
          </p>
        </div>

        {/* Section 2 */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("2. Types of Cookies We Use", "2. Vrste kolačića koje koristimo")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "We use four categories of cookies, each serving a distinct purpose. Essential cookies are always active as they are strictly necessary for the service to function. You may control all other categories through our cookie preference centre.",
              "Koristimo četiri kategorije kolačića, svaka s posebnom svrhom. Nužni kolačići su uvijek aktivni jer su strogo neophodni za funkcioniranje usluge. Sve ostale kategorije možete kontrolirati putem našeg centra za preferencije kolačića."
            )}
          </p>
        </div>

        {/* Section 3 */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("3. Essential Cookies", "3. Nužni kolačići")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "Essential cookies (also known as strictly necessary cookies) are required for the core functionality of EnterCRM and our website. Without these cookies, the service cannot be provided. They include:",
              "Nužni kolačići (poznati i kao strogo neophodni kolačići) potrebni su za osnovnu funkcionalnost EnterCRM-a i naše web stranice. Bez ovih kolačića, usluga se ne može pružati. Uključuju:"
            )}
          </p>
          <ul className="space-y-2 text-sm text-[#A1A1AA] leading-relaxed list-disc list-inside">
            <li>
              <span className="text-[#FAFAFA] font-medium">{t("Authentication cookies", "Kolačići autentifikacije")}</span>
              {t(": Maintain your logged-in session so you do not need to re-authenticate on every page visit.", ": Održavaju vašu prijavljenu sesiju tako da se ne trebate ponovno autentificirati pri svakom posjetu stranice.")}
            </li>
            <li>
              <span className="text-[#FAFAFA] font-medium">{t("Security cookies", "Sigurnosni kolačići")}</span>
              {t(": Protect against cross-site request forgery (CSRF) attacks and other security threats.", ": Štite od napada krivotvorenja zahtjeva između web mjesta (CSRF) i drugih sigurnosnih prijetnji.")}
            </li>
            <li>
              <span className="text-[#FAFAFA] font-medium">{t("Load balancing cookies", "Kolačići raspoređivanja opterećenja")}</span>
              {t(": Ensure requests are directed to the correct server instance in our infrastructure.", ": Osiguravaju da se zahtjevi usmjeravaju na ispravnu instancu poslužitelja u našoj infrastrukturi.")}
            </li>
            <li>
              <span className="text-[#FAFAFA] font-medium">{t("Cookie consent cookies", "Kolačići privole za kolačiće")}</span>
              {t(": Store your cookie preferences so we do not ask for consent on every visit.", ": Pohranjuju vaše preferencije kolačića kako vam ne bismo tražili privolu pri svakom posjetu.")}
            </li>
          </ul>
          <p className="text-sm text-[#71717A] leading-relaxed">
            {t(
              "Legal basis: Legitimate interests / strictly necessary for the performance of the contract. These cookies do not require your consent under applicable EU law.",
              "Pravna osnova: Legitimni interes / stroga nužnost za izvršenje ugovora. Ovi kolačići ne zahtijevaju vašu privolu prema primjenjivom zakonu EU."
            )}
          </p>
        </div>

        {/* Section 4 */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("4. Analytics Cookies", "4. Analitički kolačići")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "Analytics cookies help us understand how visitors interact with our website and application. This information is collected in aggregate form and is used to improve our service. They include:",
              "Analitički kolačići pomažu nam razumjeti kako posjetitelji komuniciraju s našom web stranicom i aplikacijom. Ove informacije prikupljaju se u agregiranom obliku i koriste se za poboljšanje naše usluge. Uključuju:"
            )}
          </p>
          <ul className="space-y-2 text-sm text-[#A1A1AA] leading-relaxed list-disc list-inside">
            <li>
              <span className="text-[#FAFAFA] font-medium">{t("Page view tracking", "Praćenje pregleda stranica")}</span>
              {t(": Recording which pages are visited and how long users spend on them.", ": Snimanje koje se stranice posjećuju i koliko vremena korisnici provode na njima.")}
            </li>
            <li>
              <span className="text-[#FAFAFA] font-medium">{t("Error tracking", "Praćenje grešaka")}</span>
              {t(": Logging JavaScript errors and application exceptions to help us identify and fix bugs.", ": Bilježenje JavaScript grešaka i iznimki aplikacija kako bismo mogli identificirati i ispraviti greške.")}
            </li>
            <li>
              <span className="text-[#FAFAFA] font-medium">{t("Performance monitoring", "Praćenje performansi")}</span>
              {t(": Measuring page load times and API response times to optimise performance.", ": Mjerenje vremena učitavanja stranica i vremena odgovora API-ja radi optimizacije performansi.")}
            </li>
            <li>
              <span className="text-[#FAFAFA] font-medium">{t("Feature usage analytics", "Analitika korištenja funkcija")}</span>
              {t(": Understanding which features are used most frequently to guide product development.", ": Razumijevanje koje se funkcije najčešće koriste za usmjeravanje razvoja proizvoda.")}
            </li>
          </ul>
          <p className="text-sm text-[#71717A] leading-relaxed">
            {t(
              "Legal basis: Consent. These cookies are only set if you accept analytics cookies in our cookie preference centre.",
              "Pravna osnova: Privola. Ovi kolačići postavljaju se samo ako prihvatite analitičke kolačiće u našem centru za preferencije kolačića."
            )}
          </p>
        </div>

        {/* Section 5 */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("5. Functional Cookies", "5. Funkcionalni kolačići")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "Functional cookies enable enhanced functionality and personalisation. They may be set by us or by third-party providers whose services we use. If you do not allow these cookies, some or all of these features may not work properly.",
              "Funkcionalni kolačići omogućuju poboljšanu funkcionalnost i personalizaciju. Možemo ih postaviti mi ili davatelji treće strane čije usluge koristimo. Ako ne dopustite ove kolačiće, neke ili sve ove funkcije možda neće ispravno raditi."
            )}
          </p>
          <ul className="space-y-2 text-sm text-[#A1A1AA] leading-relaxed list-disc list-inside">
            <li>
              <span className="text-[#FAFAFA] font-medium">{t("Language preference cookies", "Kolačići preferencija jezika")}</span>
              {t(": Remember your selected language (English or Croatian) across sessions.", ": Pamte vaš odabrani jezik (engleski ili hrvatski) između sesija.")}
            </li>
            <li>
              <span className="text-[#FAFAFA] font-medium">{t("UI preference cookies", "Kolačići preferencija sučelja")}</span>
              {t(": Store interface settings such as sidebar state, table column configurations, and display density.", ": Pohranjuju postavke sučelja poput stanja bočne trake, konfiguracija stupaca tablice i gustoće prikaza.")}
            </li>
            <li>
              <span className="text-[#FAFAFA] font-medium">{t("Onboarding cookies", "Kolačići uvodnog postupka")}</span>
              {t(": Track which onboarding steps have been completed to avoid showing tutorials repeatedly.", ": Prate koji su koraci uvodnog postupka dovršeni kako bi se izbjeglo ponavljano prikazivanje vodiča.")}
            </li>
          </ul>
          <p className="text-sm text-[#71717A] leading-relaxed">
            {t(
              "Legal basis: Consent. These cookies are only set if you accept functional cookies in our cookie preference centre.",
              "Pravna osnova: Privola. Ovi kolačići postavljaju se samo ako prihvatite funkcionalne kolačiće u našem centru za preferencije kolačića."
            )}
          </p>
        </div>

        {/* Section 6 */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("6. Marketing Cookies", "6. Marketinški kolačići")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "Marketing cookies (also called advertising or targeting cookies) are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third-party advertisers.",
              "Marketinški kolačići (poznati i kao oglašavački ili ciljni kolačići) koriste se za praćenje posjetitelja na web stranicama. Namjera je prikazivanje oglasa koji su relevantni i angažirajući za pojedinog korisnika, a time i vrjedniji za izdavače i oglašivače treće strane."
            )}
          </p>
          <ul className="space-y-2 text-sm text-[#A1A1AA] leading-relaxed list-disc list-inside">
            <li>
              <span className="text-[#FAFAFA] font-medium">{t("Ad tracking cookies", "Kolačići za praćenje oglasa")}</span>
              {t(": Used to measure the effectiveness of advertising campaigns and attribute conversions.", ": Koriste se za mjerenje učinkovitosti reklamnih kampanja i pripisivanje konverzija.")}
            </li>
            <li>
              <span className="text-[#FAFAFA] font-medium">{t("Retargeting cookies", "Kolačići za retargeting")}</span>
              {t(": Allow us to show relevant EnterCRM advertisements to users who have previously visited our website on third-party platforms.", ": Omogućuju nam prikazivanje relevantnih EnterCRM oglasa korisnicima koji su prethodno posjetili našu web stranicu na platformama trećih strana.")}
            </li>
          </ul>
          <p className="text-sm text-[#71717A] leading-relaxed">
            {t(
              "Legal basis: Consent. These cookies are only set if you explicitly accept marketing cookies in our cookie preference centre. You may withdraw consent at any time.",
              "Pravna osnova: Privola. Ovi kolačići postavljaju se samo ako izričito prihvatite marketinške kolačiće u našem centru za preferencije kolačića. Privolu možete povući u bilo koje vrijeme."
            )}
          </p>
        </div>

        {/* Section 7 */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("7. Third-Party Cookies", "7. Kolačići trećih strana")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "Some of the cookies described in this policy are set by third-party service providers we use. These third parties may include:",
              "Neki od kolačića opisanih u ovoj politici postavljaju davatelji usluga trećih strana koje koristimo. Ove treće strane mogu uključivati:"
            )}
          </p>
          <ul className="space-y-1 text-sm text-[#A1A1AA] leading-relaxed list-disc list-inside">
            <li>{t("Cloud infrastructure and CDN providers (e.g., Google Cloud) for performance and availability", "Pružatelji cloud infrastrukture i CDN-a (npr. Google Cloud) za performanse i dostupnost")}</li>
            <li>{t("Payment processors for handling subscription billing", "Procesori plaćanja za upravljanje naplatom pretplate")}</li>
            <li>{t("Error tracking and monitoring services", "Usluge praćenja grešaka i nadzora")}</li>
            <li>{t("Customer support chat services", "Usluge korisničke podrške putem chata")}</li>
          </ul>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "Third-party cookies are subject to the respective privacy policies of those providers. We do not control third-party cookies and cannot access them. We recommend reviewing the privacy policies of any third-party services you interact with.",
              "Kolačići trećih strana podliježu odgovarajućim politikama privatnosti tih pružatelja. Nemamo kontrolu nad kolačićima trećih strana i ne možemo im pristupiti. Preporučujemo da pregledate politike privatnosti svih usluga trećih strana s kojima komunicirate."
            )}
          </p>
        </div>

        {/* Section 8 — Cookie List Table */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-4">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("8. Cookie List", "8. Popis kolačića")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">
            {t(
              "The following table lists the specific cookies currently used on EnterCRM and our marketing website:",
              "Sljedeća tablica navodi specifične kolačiće koji se trenutno koriste na EnterCRM-u i našoj marketinškoj web stranici:"
            )}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1F1F23]">
                  <th className="text-left text-xs font-semibold text-[#71717A] uppercase tracking-wide pb-3 pr-4">
                    {t("Name", "Naziv")}
                  </th>
                  <th className="text-left text-xs font-semibold text-[#71717A] uppercase tracking-wide pb-3 pr-4">
                    {t("Purpose", "Svrha")}
                  </th>
                  <th className="text-left text-xs font-semibold text-[#71717A] uppercase tracking-wide pb-3 pr-4">
                    {t("Duration", "Trajanje")}
                  </th>
                  <th className="text-left text-xs font-semibold text-[#71717A] uppercase tracking-wide pb-3">
                    {t("Type", "Vrsta")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F1F23]">
                {[
                  {
                    name: "entercrm_token",
                    purpose: t("Authentication — stores your session token for API requests", "Autentifikacija — pohranjuje vaš token sesije za API zahtjeve"),
                    duration: t("Session / 30 days", "Sesija / 30 dana"),
                    type: t("Essential", "Nužni"),
                  },
                  {
                    name: "entercrm_locale",
                    purpose: t("Stores your language preference (en or hr)", "Pohranjuje vašu preferenciju jezika (en ili hr)"),
                    duration: t("1 year", "1 godina"),
                    type: t("Functional", "Funkcionalni"),
                  },
                  {
                    name: "entercrm_cookie_consent",
                    purpose: t("Stores your cookie consent preferences", "Pohranjuje vaše preferencije privole za kolačiće"),
                    duration: t("1 year", "1 godina"),
                    type: t("Essential", "Nužni"),
                  },
                  {
                    name: "entercrm_session",
                    purpose: t("Server-side session management for secure operations", "Upravljanje sesijama na strani poslužitelja za sigurne operacije"),
                    duration: t("Session", "Sesija"),
                    type: t("Essential", "Nužni"),
                  },
                  {
                    name: "_analytics_id",
                    purpose: t("Anonymous user identifier for usage analytics and feature tracking", "Anonimni identifikator korisnika za analitiku korištenja i praćenje funkcija"),
                    duration: t("2 years", "2 godine"),
                    type: t("Analytics", "Analitički"),
                  },
                  {
                    name: "_analytics_session",
                    purpose: t("Session-level analytics to group page views into a single visit", "Analitika na razini sesije za grupiranje pregleda stranica u jedan posjet"),
                    duration: t("30 minutes", "30 minuta"),
                    type: t("Analytics", "Analitički"),
                  },
                  {
                    name: "_ad_track",
                    purpose: t("Tracks conversions from paid advertising campaigns", "Prati konverzije iz plaćenih reklamnih kampanja"),
                    duration: t("90 days", "90 dana"),
                    type: t("Marketing", "Marketinški"),
                  },
                  {
                    name: "_retarget_id",
                    purpose: t("Enables retargeting of website visitors on third-party ad platforms", "Omogućuje retargeting posjetitelja web stranice na reklamnim platformama trećih strana"),
                    duration: t("180 days", "180 dana"),
                    type: t("Marketing", "Marketinški"),
                  },
                ].map((row) => (
                  <tr key={row.name}>
                    <td className="py-3 pr-4 font-mono text-xs text-[#6366F1]">{row.name}</td>
                    <td className="py-3 pr-4 text-[#A1A1AA] leading-relaxed">{row.purpose}</td>
                    <td className="py-3 pr-4 text-[#A1A1AA] whitespace-nowrap">{row.duration}</td>
                    <td className="py-3 text-[#A1A1AA]">{row.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 9 */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("9. Managing Your Cookie Preferences", "9. Upravljanje vašim preferencijama kolačića")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "You have several options for controlling or limiting how we and our partners use cookies:",
              "Imate nekoliko mogućnosti za kontrolu ili ograničavanje načina na koji mi i naši partneri koristimo kolačiće:"
            )}
          </p>
          <ul className="space-y-3 text-sm text-[#A1A1AA] leading-relaxed list-disc list-inside">
            <li>
              <span className="text-[#FAFAFA] font-medium">{t("Cookie Preference Centre", "Centar za preferencije kolačića")}</span>
              {t(": When you first visit our website, a cookie banner will appear allowing you to accept or decline non-essential cookies. You can revisit your choices at any time from the cookie settings link in the footer.", ": Kada prvi put posjetite našu web stranicu, pojavit će se banner za kolačiće koji vam omogućuje prihvaćanje ili odbijanje nebitnih kolačića. Možete se u bilo koje vrijeme vratiti na svoje odabire putem veze za postavke kolačića u podnožju stranice.")}
            </li>
            <li>
              <span className="text-[#FAFAFA] font-medium">{t("Browser Controls", "Kontrole preglednika")}</span>
              {t(": Most web browsers allow you to manage cookie settings. You can set your browser to refuse all or certain cookies, or to alert you when websites set or access cookies. The Help section of your browser provides instructions. Note that disabling essential cookies will impair the functionality of EnterCRM.", ": Većina web preglednika omogućuje upravljanje postavkama kolačića. Možete postaviti preglednik da odbija sve ili određene kolačiće, ili da vas upozorava kada web stranice postavljaju ili pristupaju kolačićima. Odjeljak Pomoć vašeg preglednika pruža upute. Imajte na umu da onemogućivanje nužnih kolačića narušava funkcionalnost EnterCRM-a.")}
            </li>
            <li>
              <span className="text-[#FAFAFA] font-medium">{t("Opt-Out Links", "Poveznice za odjavu")}</span>
              {t(": For third-party analytics and advertising cookies, you may use industry opt-out tools such as the Digital Advertising Alliance opt-out at optout.aboutads.info or the Network Advertising Initiative opt-out at optout.networkadvertising.org.", ": Za kolačiće analitike i oglašavanja trećih strana, možete koristiti alate za industrijsku odjavu poput odjave Digital Advertising Alliance na optout.aboutads.info ili odjave Network Advertising Initiative na optout.networkadvertising.org.")}
            </li>
            <li>
              <span className="text-[#FAFAFA] font-medium">{t("Do Not Track", "Ne prati")}</span>
              {t(": Some browsers transmit \"Do Not Track\" (DNT) signals. We currently respond to DNT signals for analytics and marketing cookies by not setting those categories of cookie when a DNT signal is detected.", ": Neki preglednici prenose signale \"Ne prati\" (DNT). Trenutno odgovaramo na DNT signale za analitičke i marketinške kolačiće tako što ne postavljamo te kategorije kolačića kada se otkrije DNT signal.")}
            </li>
          </ul>
        </div>

        {/* Section 10 */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("10. Updates to This Policy", "10. Ažuriranja ove politike")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "We may update this Cookie Policy periodically to reflect changes in the cookies we use or for operational, legal, or regulatory reasons. When we make material changes, we will display a notice on our website and, where appropriate, update the cookie consent banner so that you can review and accept the revised choices.",
              "Ovu Politiku kolačića možemo povremeno ažurirati kako bi odražavala promjene u kolačićima koje koristimo ili iz operativnih, pravnih ili regulatornih razloga. Kada napravimo materijalne promjene, prikazat ćemo obavijest na našoj web stranici i, gdje je to prikladno, ažurirati banner za privolu za kolačiće kako biste mogli pregledati i prihvatiti revidirane odabire."
            )}
          </p>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "For questions about our use of cookies, contact us at privacy@entersolutions.io.",
              "Za pitanja o našem korištenju kolačića, kontaktirajte nas na privacy@entersolutions.io."
            )}
          </p>
          <div className="text-sm text-[#A1A1AA] space-y-1 pt-2">
            <p className="text-[#FAFAFA] font-medium">EnterSolutions d.o.o.</p>
            <p>Zagreb, {t("Croatia", "Hrvatska")}</p>
            <p>
              <a href="mailto:privacy@entersolutions.io" className="text-[#6366F1] hover:underline">
                privacy@entersolutions.io
              </a>
            </p>
          </div>
        </div>
      </div>
    </StaticPageLayout>
  );
}
