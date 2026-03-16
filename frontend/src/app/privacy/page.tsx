"use client";

import { StaticPageLayout } from "@/components/layout/static-page-layout";
import { useI18n } from "@/lib/i18n";

export default function PrivacyPolicyPage() {
  const { t } = useI18n();

  return (
    <StaticPageLayout>
      <div className="space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[#FAFAFA] mb-3">
            {t("Privacy Policy", "Politika privatnosti")}
          </h1>
          <p className="text-sm text-[#71717A]">
            {t("Effective date: March 1, 2026", "Datum stupanja na snagu: 1. ožujka 2026.")}
            {" · "}
            {t("Last updated: March 1, 2026", "Zadnje ažuriranje: 1. ožujka 2026.")}
          </p>
          <p className="mt-4 text-sm text-[#A1A1AA] leading-relaxed max-w-3xl">
            {t(
              `EnterSolutions d.o.o. ("EnterSolutions", "we", "our", or "us") operates EnterCRM, a customer relationship management platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.`,
              `EnterSolutions d.o.o. ("EnterSolutions", "mi", "naš" ili "nas") upravlja platformom EnterCRM za upravljanje odnosima s klijentima. Ova Politika privatnosti objašnjava kako prikupljamo, koristimo, otkrivamo i štitimo vaše podatke kada koristite naš servis.`
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
              t("Information We Collect", "Informacije koje prikupljamo"),
              t("How We Use Your Information", "Kako koristimo vaše podatke"),
              t("Data Sharing and Disclosure", "Dijeljenje i otkrivanje podataka"),
              t("Data Retention", "Čuvanje podataka"),
              t("Your Rights", "Vaša prava"),
              t("International Data Transfers", "Međunarodni prijenosi podataka"),
              t("Children's Privacy", "Privatnost djece"),
              t("Security Measures", "Sigurnosne mjere"),
              t("Changes to This Policy", "Izmjene ove politike"),
              t("Contact Us", "Kontaktirajte nas"),
            ].map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        </div>

        {/* Section 1 */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-4">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("1. Information We Collect", "1. Informacije koje prikupljamo")}
          </h2>

          <div>
            <h3 className="text-sm font-semibold text-[#FAFAFA] mb-2">
              {t("1.1 Information You Provide Directly", "1.1 Podaci koje nam neposredno dajete")}
            </h3>
            <ul className="space-y-1 text-sm text-[#A1A1AA] leading-relaxed list-disc list-inside">
              <li>{t("Account registration details: name, company name, email address, password (hashed)", "Podaci za registraciju: ime, naziv tvrtke, adresa e-pošte, lozinka (hashirana)")}</li>
              <li>{t("Billing and payment information processed by our payment provider", "Podaci o plaćanju koje obrađuje naš davatelj usluga plaćanja")}</li>
              <li>{t("Communications you send us, including support requests and feedback", "Komunikacije koje nam šaljete, uključujući zahtjeve za podršku i povratne informacije")}</li>
              <li>{t("Profile and workspace configuration settings", "Postavke profila i radnog prostora")}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#FAFAFA] mb-2">
              {t("1.2 Customer Data You Import or Collect Through Our Platform", "1.2 Podaci o klijentima koje uvozite ili prikupljate putem naše platforme")}
            </h3>
            <p className="text-sm text-[#A1A1AA] leading-relaxed mb-2">
              {t(
                "When you use EnterCRM to manage your customers, you may upload or generate data about your own end-customers. This may include:",
                "Kada koristite EnterCRM za upravljanje vašim klijentima, možete prenijeti ili generirati podatke o vašim krajnjim klijentima. To može uključivati:"
              )}
            </p>
            <ul className="space-y-1 text-sm text-[#A1A1AA] leading-relaxed list-disc list-inside">
              <li>{t("Names, email addresses, phone numbers and postal addresses", "Imena, adrese e-pošte, telefonski brojevi i poštanske adrese")}</li>
              <li>{t("Purchase history, transaction values, and order counts", "Povijest kupnji, vrijednosti transakcija i broj narudžbi")}</li>
              <li>{t("Behavioural data collected via the EnterCRM JavaScript tracking snippet", "Bihevioralni podaci prikupljeni putem JavaScript skripte za praćenje EnterCRM")}</li>
              <li>{t("Segmentation tags, RFM scores, and CLV estimates generated by our analytics engine", "Oznake segmentacije, RFM ocjene i procjene CLV-a generirane našim analitičkim motorom")}</li>
              <li>{t("Custom attributes and notes added by your team", "Prilagođeni atributi i bilješke koje dodaje vaš tim")}</li>
            </ul>
            <p className="mt-2 text-sm text-[#71717A] leading-relaxed">
              {t(
                "With respect to this data, you act as the data controller and EnterSolutions acts as the data processor. Our Data Processing Agreement governs such processing.",
                "U pogledu ovih podataka, vi nastupate kao voditelj obrade podataka, a EnterSolutions kao izvršitelj obrade. Takva obrada uređena je našim Ugovorom o obradi podataka."
              )}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#FAFAFA] mb-2">
              {t("1.3 Usage and Technical Data", "1.3 Podaci o korištenju i tehnički podaci")}
            </h3>
            <ul className="space-y-1 text-sm text-[#A1A1AA] leading-relaxed list-disc list-inside">
              <li>{t("Log data: IP address, browser type and version, pages visited, time and date of visits, time spent on pages", "Podaci dnevnika: IP adresa, vrsta i verzija preglednika, posjećene stranice, datum i vrijeme posjeta, vrijeme provedeno na stranicama")}</li>
              <li>{t("Device information: operating system, device identifiers", "Podaci o uređaju: operativni sustav, identifikatori uređaja")}</li>
              <li>{t("Feature usage patterns and API call volumes", "Obrasci korištenja funkcionalnosti i volumeni API poziva")}</li>
              <li>{t("Session identifiers and authentication tokens", "Identifikatori sesije i autentifikacijski tokeni")}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#FAFAFA] mb-2">
              {t("1.4 Cookies and Similar Technologies", "1.4 Kolačići i slične tehnologije")}
            </h3>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              {t(
                "We use cookies and similar tracking technologies to operate and improve our service. Please refer to our Cookie Policy for full details on the cookies we deploy, their purpose, and how to manage your preferences.",
                "Koristimo kolačiće i slične tehnologije praćenja za upravljanje i poboljšanje naše usluge. Pogledajte našu Politiku kolačića za potpune detalje o kolačićima koje koristimo, njihovoj svrsi i načinu upravljanja vašim postavkama."
              )}
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-4">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("2. How We Use Your Information", "2. Kako koristimo vaše podatke")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "We process your personal data only where we have a lawful basis to do so. Our purposes and corresponding legal bases are:",
              "Vaše osobne podatke obrađujemo samo kada za to imamo zakonsku osnovu. Naše svrhe i odgovarajuće pravne osnove su:"
            )}
          </p>
          <ul className="space-y-2 text-sm text-[#A1A1AA] leading-relaxed list-disc list-inside">
            <li>
              <span className="text-[#FAFAFA] font-medium">{t("Providing the Service", "Pružanje usluge")}</span>
              {t(": To create and manage your account, deliver EnterCRM features, process payments, and provide technical support. Legal basis: performance of a contract.", ": Za kreiranje i upravljanje vašim računom, isporuku funkcija EnterCRM-a, obradu plaćanja i pružanje tehničke podrške. Pravna osnova: izvršenje ugovora.")}
            </li>
            <li>
              <span className="text-[#FAFAFA] font-medium">{t("Analytics and Service Improvement", "Analitika i poboljšanje usluge")}</span>
              {t(": To understand how users interact with EnterCRM, diagnose technical issues, and develop new features. Legal basis: legitimate interests.", ": Za razumijevanje kako korisnici komuniciraju s EnterCRM-om, dijagnosticiranje tehničkih problema i razvoj novih funkcija. Pravna osnova: legitimni interes.")}
            </li>
            <li>
              <span className="text-[#FAFAFA] font-medium">{t("Communications", "Komunikacija")}</span>
              {t(": To send transactional emails (account confirmations, invoices, security alerts) and, where you have opted in, product updates and newsletters. Legal basis: contract performance and/or consent.", ": Za slanje transakcijskih e-poruka (potvrde računa, računi, sigurnosna upozorenja) i, gdje ste to prihvatili, ažuriranja proizvoda i newslettera. Pravna osnova: izvršenje ugovora i/ili privola.")}
            </li>
            <li>
              <span className="text-[#FAFAFA] font-medium">{t("Security and Fraud Prevention", "Sigurnost i sprječavanje prijevara")}</span>
              {t(": To detect, investigate and prevent fraudulent transactions, unauthorized access, and other illegal activities. Legal basis: legitimate interests and legal obligation.", ": Za otkrivanje, istraživanje i sprječavanje prijevarnih transakcija, neovlaštenog pristupa i drugih nezakonitih aktivnosti. Pravna osnova: legitimni interes i zakonska obveza.")}
            </li>
            <li>
              <span className="text-[#FAFAFA] font-medium">{t("Legal Compliance", "Usklađenost s propisima")}</span>
              {t(": To comply with applicable laws, regulations, legal processes, and government requests. Legal basis: legal obligation.", ": Za usklađenost s primjenjivim zakonima, propisima, pravnim postupcima i zahtjevima nadležnih tijela. Pravna osnova: zakonska obveza.")}
            </li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-4">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("3. Data Sharing and Disclosure", "3. Dijeljenje i otkrivanje podataka")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed font-medium">
            {t(
              "We do not sell, rent, or trade your personal data to third parties for their marketing purposes.",
              "Ne prodajemo, iznajmljujemo niti razmjenjujemo vaše osobne podatke trećim stranama za njihove marketinške svrhe."
            )}
          </p>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t("We may share your data in the following limited circumstances:", "Vaše podatke možemo dijeliti u sljedećim ograničenim okolnostima:")}
          </p>
          <ul className="space-y-2 text-sm text-[#A1A1AA] leading-relaxed list-disc list-inside">
            <li>
              <span className="text-[#FAFAFA] font-medium">{t("Service Providers (Sub-processors)", "Davatelji usluga (pod-izvršitelji obrade)")}</span>
              {t(": We engage trusted third-party companies to perform services on our behalf, including cloud hosting (Google Cloud), email delivery, payment processing, and error monitoring. These providers are contractually bound to process data only on our instructions and in accordance with applicable data protection law.", ": Angažiramo pouzdane treće strane za obavljanje usluga u naše ime, uključujući cloud hosting (Google Cloud), isporuku e-pošte, obradu plaćanja i praćenje grešaka. Ovi pružatelji ugovorom su obvezani obrađivati podatke samo prema našim uputama i u skladu s primjenjivim propisima o zaštiti podataka.")}
            </li>
            <li>
              <span className="text-[#FAFAFA] font-medium">{t("Business Transfers", "Poslovni prijenosi")}</span>
              {t(": If EnterSolutions is involved in a merger, acquisition, or asset sale, your information may be transferred as part of that transaction. We will notify you before your data is transferred and becomes subject to a different privacy policy.", ": Ako je EnterSolutions uključen u spajanje, akviziciju ili prodaju imovine, vaši podaci mogu biti preneseni kao dio te transakcije. Obavijestit ćemo vas prije nego što vaši podaci budu preneseni i postanu podložni drugačijoj politici privatnosti.")}
            </li>
            <li>
              <span className="text-[#FAFAFA] font-medium">{t("Legal Requirements", "Zakonski zahtjevi")}</span>
              {t(": We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court order or government agency).", ": Vaše podatke možemo otkriti ako to zahtijeva zakon ili kao odgovor na valjane zahtjeve javnih tijela (npr. sudski nalog ili vladina agencija).")}
            </li>
            <li>
              <span className="text-[#FAFAFA] font-medium">{t("Protection of Rights", "Zaštita prava")}</span>
              {t(": We may disclose information where we believe it is necessary to investigate, prevent, or take action regarding illegal activities, suspected fraud, or situations involving potential threats to safety.", ": Možemo otkriti podatke kada smatramo da je to potrebno za istragu, sprječavanje ili poduzimanje mjera u vezi s nezakonitim aktivnostima, sumnjom na prijevaru ili situacijama koje uključuju potencijalne prijetnje sigurnosti.")}
            </li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("4. Data Retention", "4. Čuvanje podataka")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "We retain your personal data for as long as necessary to fulfil the purposes described in this policy, unless a longer retention period is required or permitted by law.",
              "Vaše osobne podatke čuvamo onoliko dugo koliko je potrebno za ispunjenje svrha opisanih u ovoj politici, osim ako duže razdoblje čuvanja zahtijeva ili dopušta zakon."
            )}
          </p>
          <ul className="space-y-2 text-sm text-[#A1A1AA] leading-relaxed list-disc list-inside">
            <li>{t("Account data is retained for the duration of your active subscription and for 90 days after account closure to allow for reactivation.", "Podaci računa čuvaju se za vrijeme trajanja vaše aktivne pretplate i 90 dana nakon zatvaranja računa kako bi se omogućila reaktivacija.")}</li>
            <li>{t("Customer data you have processed through EnterCRM will be permanently deleted or returned to you within 30 days of contract termination upon your written request.", "Podaci o klijentima koje ste obrađivali putem EnterCRM-a bit će trajno izbrisani ili vraćeni vama u roku od 30 dana od raskida ugovora na vaš pisani zahtjev.")}</li>
            <li>{t("Financial and billing records are retained for 11 years in accordance with Croatian tax and accounting law.", "Financijska evidencija i zapisi o naplati čuvaju se 11 godina sukladno hrvatskom poreznom i računovodstvenom zakonodavstvu.")}</li>
            <li>{t("Log data for security and fraud detection purposes is retained for up to 12 months.", "Podaci dnevnika za potrebe sigurnosti i otkrivanja prijevara čuvaju se do 12 mjeseci.")}</li>
            <li>{t("Backup copies may persist for up to 60 days after deletion from live systems.", "Sigurnosne kopije mogu se čuvati do 60 dana nakon brisanja iz živih sustava.")}</li>
          </ul>
        </div>

        {/* Section 5 */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-4">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("5. Your Rights", "5. Vaša prava")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "Under the General Data Protection Regulation (GDPR) and applicable Croatian law, you have the following rights regarding your personal data:",
              "Prema Općoj uredbi o zaštiti podataka (GDPR) i primjenjivom hrvatskom zakonu, imate sljedeća prava u pogledu vaših osobnih podataka:"
            )}
          </p>
          <ul className="space-y-2 text-sm text-[#A1A1AA] leading-relaxed list-disc list-inside">
            <li><span className="text-[#FAFAFA] font-medium">{t("Right of Access (Art. 15 GDPR)", "Pravo pristupa (čl. 15 GDPR)")}</span>{t(": You may request a copy of the personal data we hold about you.", ": Možete zatražiti kopiju osobnih podataka koje čuvamo o vama.")}</li>
            <li><span className="text-[#FAFAFA] font-medium">{t("Right to Rectification (Art. 16 GDPR)", "Pravo na ispravak (čl. 16 GDPR)")}</span>{t(": You may ask us to correct inaccurate or incomplete data.", ": Možete zatražiti da ispravimo netočne ili nepotpune podatke.")}</li>
            <li><span className="text-[#FAFAFA] font-medium">{t("Right to Erasure (Art. 17 GDPR)", "Pravo na brisanje (čl. 17 GDPR)")}</span>{t(": You may request the deletion of your personal data where there is no compelling reason for its continued processing.", ": Možete zatražiti brisanje vaših osobnih podataka u slučaju da nema uvjerljivog razloga za nastavak njihove obrade.")}</li>
            <li><span className="text-[#FAFAFA] font-medium">{t("Right to Restriction (Art. 18 GDPR)", "Pravo na ograničenje (čl. 18 GDPR)")}</span>{t(": You may request that we restrict processing of your data in certain circumstances.", ": Možete zatražiti da ograničimo obradu vaših podataka u određenim okolnostima.")}</li>
            <li><span className="text-[#FAFAFA] font-medium">{t("Right to Data Portability (Art. 20 GDPR)", "Pravo na prenosivost podataka (čl. 20 GDPR)")}</span>{t(": You may receive your data in a structured, commonly used, machine-readable format and transmit it to another controller.", ": Možete primiti svoje podatke u strukturiranom, uobičajeno korištenom, strojno čitljivom formatu i prenijeti ih drugom voditelju obrade.")}</li>
            <li><span className="text-[#FAFAFA] font-medium">{t("Right to Object (Art. 21 GDPR)", "Pravo na prigovor (čl. 21 GDPR)")}</span>{t(": You may object to processing based on legitimate interests or for direct marketing purposes.", ": Možete se usprotiviti obradi temeljenoj na legitimnim interesima ili u svrhe izravnog marketinga.")}</li>
            <li><span className="text-[#FAFAFA] font-medium">{t("Right to Withdraw Consent", "Pravo na povlačenje privole")}</span>{t(": Where processing is based on consent, you may withdraw that consent at any time without affecting the lawfulness of prior processing.", ": Gdje se obrada temelji na privoli, možete tu privolu povući u bilo koje vrijeme bez utjecaja na zakonitost prethodne obrade.")}</li>
          </ul>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "To exercise any of these rights, please contact us at privacy@entersolutions.io. We will respond to your request within 30 days. You also have the right to lodge a complaint with the Croatian Personal Data Protection Agency (AZOP) at azop.hr.",
              "Za ostvarivanje bilo kojeg od ovih prava, kontaktirajte nas na privacy@entersolutions.io. Odgovorit ćemo na vaš zahtjev u roku od 30 dana. Također imate pravo podnijeti pritužbu Agenciji za zaštitu osobnih podataka (AZOP) na azop.hr."
            )}
          </p>
        </div>

        {/* Section 6 */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("6. International Data Transfers", "6. Međunarodni prijenosi podataka")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "EnterSolutions is headquartered in Zagreb, Croatia, an EU member state. Your data is primarily stored and processed within the European Economic Area (EEA). Where we transfer personal data outside the EEA, we ensure appropriate safeguards are in place, including:",
              "EnterSolutions ima sjedište u Zagrebu, Hrvatska, državi članici EU. Vaši podaci se primarno pohranjuju i obrađuju unutar Europskog gospodarskog prostora (EGP). Kada prenosimo osobne podatke izvan EGP-a, osiguravamo odgovarajuće zaštitne mjere, uključujući:"
            )}
          </p>
          <ul className="space-y-1 text-sm text-[#A1A1AA] leading-relaxed list-disc list-inside">
            <li>{t("Standard Contractual Clauses (SCCs) approved by the European Commission", "Standardne ugovorne klauzule (SCC) odobrene od strane Europske komisije")}</li>
            <li>{t("Transfers to countries with an adequacy decision from the European Commission", "Prijenosi u zemlje s odlukom o primjerenosti Europske komisije")}</li>
            <li>{t("Binding Corporate Rules where applicable", "Obvezujuća korporativna pravila gdje je primjenjivo")}</li>
          </ul>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "You may request details of the specific safeguards applied to any international transfer by contacting us at privacy@entersolutions.io.",
              "Možete zatražiti detalje o specifičnim zaštitnim mjerama primijenjenim na bilo koji međunarodni prijenos kontaktiranjem nas na privacy@entersolutions.io."
            )}
          </p>
        </div>

        {/* Section 7 */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("7. Children's Privacy", "7. Privatnost djece")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "EnterCRM is a business-to-business service not directed at or intended for use by individuals under the age of 16. We do not knowingly collect personal data from children under 16. If we become aware that we have inadvertently collected personal data from a child under 16, we will take steps to delete such information as promptly as possible. If you believe we may have collected data from a child, please contact us at privacy@entersolutions.io.",
              "EnterCRM je usluga namijenjena poslovnim korisnicima i nije namijenjena osobama mlađim od 16 godina. Ne prikupljamo namjerno osobne podatke djece mlađe od 16 godina. Ako saznamo da smo nehotice prikupili osobne podatke djeteta mlađeg od 16 godina, poduzet ćemo korake za brisanje takvih podataka što je brže moguće. Ako smatrate da smo možda prikupili podatke od djeteta, kontaktirajte nas na privacy@entersolutions.io."
            )}
          </p>
        </div>

        {/* Section 8 */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("8. Security Measures", "8. Sigurnosne mjere")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "We implement appropriate technical and organisational measures to protect your personal data against accidental or unlawful destruction, loss, alteration, unauthorised disclosure, or access. Our measures include, but are not limited to:",
              "Provodimo odgovarajuće tehničke i organizacijske mjere za zaštitu vaših osobnih podataka od slučajnog ili nezakonitog uništenja, gubitka, izmjene, neovlaštenog otkrivanja ili pristupa. Naše mjere uključuju, ali nisu ograničene na:"
            )}
          </p>
          <ul className="space-y-1 text-sm text-[#A1A1AA] leading-relaxed list-disc list-inside">
            <li>{t("Encryption of data in transit using TLS 1.2 or higher", "Šifriranje podataka u prijenosu korištenjem TLS 1.2 ili novijeg")}</li>
            <li>{t("Encryption of sensitive data at rest using AES-256", "Šifriranje osjetljivih podataka u mirovanju korištenjem AES-256")}</li>
            <li>{t("Password hashing using bcrypt with appropriate cost factor", "Hashiranje lozinki korištenjem bcrypt s odgovarajućim faktorom troška")}</li>
            <li>{t("Role-based access controls and principle of least privilege", "Kontrole pristupa temeljene na ulogama i načelo najmanjih privilegija")}</li>
            <li>{t("Regular security assessments and penetration testing", "Redovite sigurnosne procjene i testovi prodiranja")}</li>
            <li>{t("Multi-tenant data isolation ensuring no cross-tenant data access", "Izolacija podataka više zakupaca osiguravajući da nema pristupa podacima između zakupaca")}</li>
            <li>{t("Secure API keys with SHA-256 hashed secrets", "Sigurni API ključevi s SHA-256 hashiranim tajnama")}</li>
          </ul>
          <p className="text-sm text-[#71717A] leading-relaxed">
            {t(
              "No method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee absolute security.",
              "Nijedna metoda prijenosa putem interneta ili elektroničkog pohranjivanja nije 100% sigurna. Dok se trudimo koristiti komercijalno prihvatljiva sredstva za zaštitu vaših podataka, ne možemo garantirati apsolutnu sigurnost."
            )}
          </p>
        </div>

        {/* Section 9 */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("9. Changes to This Policy", "9. Izmjene ove politike")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes, we will notify you by email (using the address associated with your account) and/or by posting a prominent notice on our website at least 30 days before the changes take effect. The updated policy will be identified by a revised effective date at the top of the page.",
              "Ovu Politiku privatnosti možemo povremeno ažurirati kako bi odražavala promjene u našim praksama, tehnologiji, zakonskim zahtjevima ili drugim čimbenicima. Kada napravimo materijalne promjene, obavijestit ćemo vas e-poštom (koristeći adresu povezanu s vašim računom) i/ili objavljivanjem istaknutog obavijesti na našoj web stranici najmanje 30 dana prije stupanja izmjena na snagu. Ažurirana politika bit će identificirana revidiranim datumom stupanja na snagu na vrhu stranice."
            )}
          </p>
        </div>

        {/* Section 10 */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("10. Contact Us", "10. Kontaktirajte nas")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our Data Protection team:",
              "Ako imate pitanja, zabrinutosti ili zahtjeve u pogledu ove Politike privatnosti ili naših praksi obrade podataka, kontaktirajte naš tim za zaštitu podataka:"
            )}
          </p>
          <div className="text-sm text-[#A1A1AA] space-y-1">
            <p className="text-[#FAFAFA] font-medium">EnterSolutions d.o.o.</p>
            <p>Zagreb, {t("Croatia", "Hrvatska")}</p>
            <p>
              {t("Privacy enquiries: ", "Upiti o privatnosti: ")}
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
