"use client";

import { StaticPageLayout } from "@/components/layout/static-page-layout";
import { useI18n } from "@/lib/i18n";

export default function TermsOfServicePage() {
  const { t } = useI18n();

  return (
    <StaticPageLayout>
      <div className="space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[#FAFAFA] mb-3">
            {t("Terms of Service", "Uvjeti korištenja")}
          </h1>
          <p className="text-sm text-[#71717A]">
            {t("Effective date: March 1, 2026", "Datum stupanja na snagu: 1. ožujka 2026.")}
            {" · "}
            {t("Last updated: March 1, 2026", "Zadnje ažuriranje: 1. ožujka 2026.")}
          </p>
          <p className="mt-4 text-sm text-[#A1A1AA] leading-relaxed max-w-3xl">
            {t(
              `Please read these Terms of Service ("Terms") carefully before using EnterCRM. By accessing or using the service, you agree to be bound by these Terms. If you do not agree, do not use the service.`,
              `Pažljivo pročitajte ove Uvjete korištenja ("Uvjeti") prije korištenja EnterCRM-a. Pristupanjem ili korištenjem usluge pristajete biti vezani ovim Uvjetima. Ako se ne slažete, nemojte koristiti uslugu.`
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
              t("Acceptance of Terms", "Prihvaćanje uvjeta"),
              t("Description of Service", "Opis usluge"),
              t("Account Registration and Responsibilities", "Registracija računa i odgovornosti"),
              t("Acceptable Use Policy", "Politika prihvatljivog korištenja"),
              t("Intellectual Property", "Intelektualno vlasništvo"),
              t("Payment Terms", "Uvjeti plaćanja"),
              t("Service Availability and SLA", "Dostupnost usluge i SLA"),
              t("Limitation of Liability", "Ograničenje odgovornosti"),
              t("Indemnification", "Odšteta"),
              t("Termination", "Raskid"),
              t("Governing Law", "Mjerodavno pravo"),
              t("Dispute Resolution", "Rješavanje sporova"),
              t("Changes to Terms", "Izmjene uvjeta"),
            ].map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        </div>

        {/* Section 1 */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("1. Acceptance of Terms", "1. Prihvaćanje uvjeta")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "These Terms constitute a legally binding agreement between you (\"User\", \"you\", or \"your\") and EnterSolutions d.o.o., a company incorporated under the laws of the Republic of Croatia with its registered office in Zagreb, Croatia (\"EnterSolutions\", \"we\", \"our\", or \"us\").",
              "Ovi Uvjeti predstavljaju pravno obvezujući sporazum između vas (\"Korisnik\", \"vi\" ili \"vaš\") i EnterSolutions d.o.o., tvrtke registrirane prema zakonima Republike Hrvatske sa sjedištem u Zagrebu, Hrvatska (\"EnterSolutions\", \"mi\", \"naš\" ili \"nas\")."
            )}
          </p>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "By creating an account, clicking \"I Agree\", or otherwise accessing or using EnterCRM, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you are entering into these Terms on behalf of a company or other legal entity, you represent that you have authority to bind that entity.",
              "Kreiranjem računa, klikom na \"Slažem se\" ili na drugi način pristupanjem ili korištenjem EnterCRM-a, potvrđujete da ste pročitali, razumjeli i pristajete biti vezani ovim Uvjetima i našom Politikom privatnosti. Ako prihvaćate ove Uvjete u ime tvrtke ili drugog pravnog subjekta, izjavljujete da imate ovlast obvezati taj subjekt."
            )}
          </p>
        </div>

        {/* Section 2 */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("2. Description of Service", "2. Opis usluge")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "EnterCRM is a cloud-based customer relationship management (CRM) platform provided by EnterSolutions as a software-as-a-service (SaaS). The service includes:",
              "EnterCRM je cloud-based platforma za upravljanje odnosima s klijentima (CRM) koju pruža EnterSolutions kao softver kao usluga (SaaS). Usluga uključuje:"
            )}
          </p>
          <ul className="space-y-1 text-sm text-[#A1A1AA] leading-relaxed list-disc list-inside">
            <li>{t("Customer data management including contact records, transaction history, and behavioural profiles", "Upravljanje podacima o klijentima uključujući kontaktne zapise, povijest transakcija i bihevioralne profile")}</li>
            <li>{t("Website and application tracking via JavaScript snippet and API integrations", "Praćenje web stranica i aplikacija putem JavaScript skripte i API integracija")}</li>
            <li>{t("Analytics engine including RFM (Recency, Frequency, Monetary) scoring and Customer Lifetime Value (CLV) calculations", "Analitički motor uključujući RFM (Nedavnost, Učestalost, Monetarna vrijednost) ocjenjivanje i izračune Customer Lifetime Value (CLV)")}</li>
            <li>{t("Customer segmentation tools based on behavioural and transactional data", "Alati za segmentaciju klijenata temeljeni na bihevioralnim i transakcijskim podacima")}</li>
            <li>{t("Automated campaign and communication workflows (email, SMS, call lists)", "Automatizirani tijek rada kampanja i komunikacija (e-pošta, SMS, pozivne liste)")}</li>
            <li>{t("Visual automation builder for creating multi-step customer journeys", "Vizualni builder automatizacije za kreiranje višekoračnih putovanja klijenata")}</li>
            <li>{t("API access and management for third-party integrations", "API pristup i upravljanje za integracije s trećim stranama")}</li>
          </ul>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "We reserve the right to modify, suspend, or discontinue any part of the service at any time with reasonable notice. We will not be liable to you or any third party for any modification, suspension, or discontinuance of the service.",
              "Zadržavamo pravo izmjene, obustave ili ukidanja bilo kojeg dijela usluge u bilo koje vrijeme uz razumnu najavu. Nećemo biti odgovorni vama ni bilo kojoj trećoj strani za bilo kakvu izmjenu, obustavu ili ukidanje usluge."
            )}
          </p>
        </div>

        {/* Section 3 */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("3. Account Registration and Responsibilities", "3. Registracija računa i odgovornosti")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "To access EnterCRM, you must register for an account. You agree to:",
              "Za pristup EnterCRM-u morate registrirati račun. Pristajete na:"
            )}
          </p>
          <ul className="space-y-2 text-sm text-[#A1A1AA] leading-relaxed list-disc list-inside">
            <li>{t("Provide accurate, current, and complete information during registration and keep it updated", "Pružanje točnih, aktualnih i potpunih informacija tijekom registracije i njihovo ažuriranje")}</li>
            <li>{t("Maintain the confidentiality of your account credentials and not share them with unauthorised persons", "Čuvanje povjerljivosti vaših vjerodajnica za pristup računu i nedijeljenje s neovlaštenim osobama")}</li>
            <li>{t("Immediately notify us of any suspected unauthorised use of your account at legal@entersolutions.io", "Odmah nas obavijestiti o bilo kakvoj sumnjivoj neovlaštenoj upotrebi vašeg računa na legal@entersolutions.io")}</li>
            <li>{t("Accept full responsibility for all activities occurring under your account", "Prihvaćanje pune odgovornosti za sve aktivnosti koje se odvijaju na vašem računu")}</li>
            <li>{t("Not register more than one account per organisation without our prior written consent", "Ne registrirati više od jednog računa po organizaciji bez našeg prethodnog pisanog pristanka")}</li>
          </ul>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "You must be at least 18 years of age to create an account. By registering, you represent and warrant that you meet this requirement.",
              "Morate imati najmanje 18 godina da biste kreirali račun. Registracijom izjavljujete i jamčite da ispunjavate ovaj zahtjev."
            )}
          </p>
        </div>

        {/* Section 4 */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("4. Acceptable Use Policy", "4. Politika prihvatljivog korištenja")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t("You agree to use EnterCRM only for lawful purposes and in accordance with these Terms. You must not:", "Pristajete koristiti EnterCRM samo u zakonite svrhe i u skladu s ovim Uvjetima. Ne smijete:")}
          </p>
          <ul className="space-y-1 text-sm text-[#A1A1AA] leading-relaxed list-disc list-inside">
            <li>{t("Use the service to process data in violation of applicable data protection laws, including the GDPR", "Koristiti uslugu za obradu podataka u suprotnosti s primjenjivim zakonima o zaštiti podataka, uključujući GDPR")}</li>
            <li>{t("Send unsolicited commercial communications (spam) using the platform's messaging tools", "Slati neželjene komercijalne komunikacije (spam) korištenjem alata za slanje poruka na platformi")}</li>
            <li>{t("Attempt to probe, scan, or test the vulnerability of the service or circumvent any security measures", "Pokušavati ispitivati, skenirati ili testirati ranjivost usluge ili zaobići bilo koje sigurnosne mjere")}</li>
            <li>{t("Reverse engineer, decompile, or disassemble any part of the service", "Obrnuto inženjering, dekompajliranje ili rastavljanje bilo kojeg dijela usluge")}</li>
            <li>{t("Reproduce, copy, sell, resell, or exploit access to the service without our express written authorisation", "Reproducirati, kopirati, prodavati, preprodavati ili iskorišćavati pristup usluzi bez naše izričite pisane autorizacije")}</li>
            <li>{t("Use the service to store or transmit malicious code, viruses, or any software designed to damage or disrupt systems", "Koristiti uslugu za pohranjivanje ili prijenos zlonamjernog koda, virusa ili bilo kojeg softvera namijenjenog oštećivanju ili ometanju sustava")}</li>
            <li>{t("Access the service using automated means (bots, scrapers) in a manner that imposes an unreasonable load on our infrastructure", "Pristupati usluzi korištenjem automatiziranih sredstava (botovi, scraper) na način koji nameće nerazumno opterećenje naše infrastrukture")}</li>
            <li>{t("Use the service in any way that violates applicable local, national, or international law or regulation", "Koristiti uslugu na bilo koji način koji krši primjenjive lokalne, nacionalne ili međunarodne zakone ili propise")}</li>
          </ul>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "We reserve the right to suspend or terminate your access immediately and without notice if you breach this Acceptable Use Policy.",
              "Zadržavamo pravo odmah i bez prethodne najave obustaviti ili prekinuti vaš pristup ako prekršite ovu Politiku prihvatljivog korištenja."
            )}
          </p>
        </div>

        {/* Section 5 */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("5. Intellectual Property", "5. Intelektualno vlasništvo")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "EnterCRM, including all software, documentation, visual designs, trademarks, service marks, trade names, and other intellectual property rights in the service, are owned by or licensed to EnterSolutions. Nothing in these Terms transfers any such rights to you.",
              "EnterCRM, uključujući sav softver, dokumentaciju, vizualne dizajne, zaštitne znakove, oznake usluga, trgovačka imena i ostala prava intelektualnog vlasništva u usluzi, vlasništvo su EnterSolutionsa ili su licencirani tvrtki EnterSolutions. Ništa u ovim Uvjetima ne prenosi takva prava na vas."
            )}
          </p>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, revocable licence to access and use EnterCRM solely for your internal business purposes during the term of your subscription.",
              "Podložno ovim Uvjetima, dajemo vam ograničenu, neekskluzivnu, neprenosivu, opozivnu licencu za pristup i korištenje EnterCRM-a isključivo za vaše interne poslovne svrhe za trajanja vaše pretplate."
            )}
          </p>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "You retain all rights to the data you upload to or generate using EnterCRM (\"Customer Data\"). You grant us a limited licence to process Customer Data solely to provide and improve the service. We do not claim ownership of your Customer Data.",
              "Zadržavate sva prava na podatke koje učitate ili generirate korištenjem EnterCRM-a (\"Podaci klijenta\"). Dajete nam ograničenu licencu za obradu Podataka klijenta isključivo radi pružanja i poboljšanja usluge. Ne polažemo pravo vlasništva na vaše Podatke klijenta."
            )}
          </p>
        </div>

        {/* Section 6 */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("6. Payment Terms", "6. Uvjeti plaćanja")}
          </h2>
          <ul className="space-y-2 text-sm text-[#A1A1AA] leading-relaxed list-disc list-inside">
            <li>{t("EnterCRM is offered on a subscription basis. Subscription fees are charged in Euro (€) and are billed in advance on a monthly or annual basis, as selected during sign-up.", "EnterCRM se nudi na temelju pretplate. Naknade za pretplatu naplaćuju se u eurima (€) i fakturiraju se unaprijed na mjesečnoj ili godišnjoj osnovi, kako je odabrano pri prijavi.")}</li>
            <li>{t("All fees are exclusive of value-added tax (VAT) and any other applicable taxes, which will be added at the applicable rate.", "Sve naknade ne uključuju porez na dodanu vrijednost (PDV) i sve ostale primjenjive poreze, koji će biti dodani po primjenjivoj stopi.")}</li>
            <li>{t("Subscriptions automatically renew at the end of each billing period unless you cancel before the renewal date.", "Pretplate se automatski obnavljaju na kraju svakog razdoblja naplate osim ako ne otkažete prije datuma obnove.")}</li>
            <li>{t("If payment fails, we may suspend your access to the service with 7 days' notice. Continued failure to pay may result in termination.", "Ako plaćanje ne uspije, možemo obustaviti vaš pristup usluzi s obavijesti od 7 dana. Trajni neuspjeh plaćanja može rezultirati raskidom.")}</li>
            <li>{t("We do not offer refunds for partial subscription periods except as required by applicable law or as stated in our refund policy.", "Ne nudimo povrate za djelomična razdoblja pretplate osim ako to zahtijeva primjenjivo pravo ili kako je navedeno u našoj politici povrata.")}</li>
            <li>{t("We reserve the right to change our pricing with 30 days' written notice. Price changes will not apply to the current billing period.", "Zadržavamo pravo promjene naših cijena uz pisanu najavu od 30 dana. Promjene cijena neće se primijeniti na tekuće razdoblje naplate.")}</li>
          </ul>
        </div>

        {/* Section 7 */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("7. Service Availability and SLA", "7. Dostupnost usluge i SLA")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "We target a monthly uptime of 99.5% for EnterCRM, excluding scheduled maintenance windows. Scheduled maintenance will be announced at least 48 hours in advance where possible.",
              "Cilj nam je mjesečna dostupnost od 99,5% za EnterCRM, isključujući planirane prozore za održavanje. O planiranom održavanju bit ćete obaviješteni najmanje 48 sati unaprijed gdje je to moguće."
            )}
          </p>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "In the event of service disruption, we will communicate status updates through our status page. Service credits may be available for extended outages as detailed in the applicable service level agreement for your subscription tier.",
              "U slučaju poremećaja usluge, ažuriranja statusa komunicirat ćemo putem naše stranice statusa. Uslužni krediti mogu biti dostupni za produljene prekide rada kako je detaljno opisano u primjenjivom sporazumu o razini usluge za vašu razinu pretplate."
            )}
          </p>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "THE SERVICE IS PROVIDED ON AN \"AS IS\" AND \"AS AVAILABLE\" BASIS. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE.",
              "USLUGA SE PRUŽA NA OSNOVI \"KAKVA JE\" I \"KAKO JE DOSTUPNA\". NE JAMČIMO DA ĆE USLUGA BITI NEPREKINUTA, BEZ GREŠAKA ILI POTPUNO SIGURNA."
            )}
          </p>
        </div>

        {/* Section 8 */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("8. Limitation of Liability", "8. Ograničenje odgovornosti")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ENTERSOLUTIONS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, LOSS OF DATA, LOSS OF GOODWILL, SERVICE INTERRUPTION, OR THE COST OF SUBSTITUTE SERVICES, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF ENTERCRM.",
              "U MAKSIMALNOJ MJERI DOPUŠTENOJ PRIMJENJIVIM ZAKONOM, ENTERSOLUTIONS NEĆE BITI ODGOVORAN ZA BILO KAKVU NEIZRAVNU, SLUČAJNU, POSEBNU, POSLJEDIČNU ILI KAZNENU ŠTETU, UKLJUČUJUĆI ALI NE OGRANIČAVAJUĆI SE NA GUBITAK DOBITI, GUBITAK PODATAKA, GUBITAK UGLEDA, PREKID USLUGE ILI TROŠKOVE ZAMJENSKIH USLUGA, KOJI NASTAJU IZ ILI U VEZI S VAŠIM KORIŠTENJEM ENTERCRM-A."
            )}
          </p>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "IN NO EVENT SHALL ENTERSOLUTIONS'S TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR YOUR USE OF THE SERVICE EXCEED THE TOTAL AMOUNT OF FEES PAID BY YOU TO ENTERSOLUTIONS IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.",
              "NI U JEDNOM SLUČAJU UKUPNA ODGOVORNOST ENTERSOLUTIONSA PREMA VAMA ZA SVE ZAHTJEVE KOJI PROIZLAZE IZ ILI SU POVEZANI S OVIM UVJETIMA ILI VAŠIM KORIŠTENJEM USLUGE NEĆE PREMAŠITI UKUPNI IZNOS NAKNADA KOJE STE VI PLATILI ENTERSOLUTIONSU U DVANAEST (12) MJESECI KOJI PRETHODE ZAHTJEVU."
            )}
          </p>
          <p className="text-sm text-[#71717A] leading-relaxed">
            {t(
              "Some jurisdictions do not allow the exclusion or limitation of certain types of damages. In such jurisdictions, our liability is limited to the greatest extent permitted by law.",
              "Neke jurisdikcije ne dopuštaju isključenje ili ograničenje određenih vrsta štete. U takvim jurisdikcijama naša odgovornost ograničena je u najvećoj mjeri dopuštenoj zakonom."
            )}
          </p>
        </div>

        {/* Section 9 */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("9. Indemnification", "9. Odšteta")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "You agree to indemnify, defend, and hold harmless EnterSolutions and its officers, directors, employees, agents, and successors from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or in any way connected with: (a) your access to or use of EnterCRM; (b) your violation of these Terms; (c) your violation of any third-party right, including intellectual property rights or privacy rights; or (d) any claim that your Customer Data caused damage to a third party.",
              "Pristajete nadoknaditi, braniti i zaštititi EnterSolutions i njegove službenike, direktore, zaposlenike, agente i nasljednike od i protiv svih zahtjeva, obveza, šteta, gubitaka i troškova (uključujući razumne pravne naknade) koji nastaju iz ili su na bilo koji način povezani s: (a) vašim pristupom ili korištenjem EnterCRM-a; (b) vašim kršenjem ovih Uvjeta; (c) vašim kršenjem prava treće strane, uključujući prava intelektualnog vlasništva ili prava na privatnost; ili (d) bilo kojim zahtjevom da su vaši Podaci klijenta uzrokovali štetu trećoj strani."
            )}
          </p>
        </div>

        {/* Section 10 */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("10. Termination", "10. Raskid")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "Either party may terminate the subscription agreement at any time. You may cancel your subscription through the account settings page or by contacting us at legal@entersolutions.io. Cancellation takes effect at the end of the current billing period.",
              "Bilo koja strana može raskinuti ugovor o pretplati u bilo koje vrijeme. Možete otkazati svoju pretplatu putem stranice postavki računa ili kontaktiranjem nas na legal@entersolutions.io. Otkazivanje stupa na snagu na kraju tekućeg razdoblja naplate."
            )}
          </p>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "We may terminate or suspend your account immediately, without prior notice or liability, if: (a) you breach these Terms or our Acceptable Use Policy; (b) we are required to do so by law; (c) we have reason to believe your account has been compromised; or (d) we decide to discontinue the service.",
              "Možemo odmah raskinuti ili obustaviti vaš račun, bez prethodne najave ili odgovornosti, ako: (a) prekršite ove Uvjete ili našu Politiku prihvatljivog korištenja; (b) to zahtijeva zakon; (c) imamo razloga vjerovati da je vaš račun kompromitiran; ili (d) odlučimo ukinuti uslugu."
            )}
          </p>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "Upon termination, your right to access the service ceases immediately. We will retain your Customer Data for 30 days after termination to allow data export. After this period, your data will be permanently deleted unless required by law.",
              "Po raskidu, vaše pravo pristupa usluzi odmah prestaje. Čuvat ćemo vaše Podatke klijenta 30 dana nakon raskida kako bi se omogućio izvoz podataka. Nakon ovog razdoblja, vaši podaci bit će trajno obrisani osim ako to zahtijeva zakon."
            )}
          </p>
        </div>

        {/* Section 11 */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("11. Governing Law", "11. Mjerodavno pravo")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "These Terms shall be governed by and construed in accordance with the laws of the Republic of Croatia, without regard to its conflict of law provisions. The United Nations Convention on Contracts for the International Sale of Goods does not apply to these Terms.",
              "Ovi Uvjeti uređuju se i tumače u skladu sa zakonima Republike Hrvatske, bez primjene odredbi o sukobu zakona. Konvencija Ujedinjenih naroda o ugovorima o međunarodnoj prodaji robe ne primjenjuje se na ove Uvjete."
            )}
          </p>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "For users located in the European Union, nothing in these Terms limits your rights under applicable EU consumer protection law.",
              "Za korisnike koji se nalaze u Europskoj uniji, ništa u ovim Uvjetima ne ograničava vaša prava prema primjenjivom zakonu EU o zaštiti potrošača."
            )}
          </p>
        </div>

        {/* Section 12 */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("12. Dispute Resolution", "12. Rješavanje sporova")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "In the event of any dispute, claim, or controversy arising out of or relating to these Terms or the use of EnterCRM, the parties shall first attempt to resolve the matter through good-faith negotiation. Either party must provide written notice of the dispute to the other party, and the parties will have 30 days to resolve the matter informally.",
              "U slučaju spora, zahtjeva ili kontroverze koji nastaju iz ili su povezani s ovim Uvjetima ili korištenjem EnterCRM-a, strane će prvo pokušati riješiti stvar kroz pregovore u dobroj vjeri. Bilo koja strana mora drugoj strani dostaviti pisanu obavijest o sporu, a strane će imati 30 dana za neformalno rješavanje problema."
            )}
          </p>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "If the dispute cannot be resolved informally, it shall be submitted to the exclusive jurisdiction of the competent courts in Zagreb, Croatia.",
              "Ako se spor ne može riješiti neformalno, bit će podnesen isključivoj nadležnosti nadležnih sudova u Zagrebu, Hrvatska."
            )}
          </p>
        </div>

        {/* Section 13 */}
        <div className="rounded-xl border border-[#1F1F23] bg-[#111113] p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[#FAFAFA] mb-3">
            {t("13. Changes to Terms", "13. Izmjene uvjeta")}
          </h2>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "We reserve the right to modify these Terms at any time. When we make material changes, we will notify you by email and/or by displaying a prominent notice within the service at least 30 days before the changes take effect. Your continued use of EnterCRM after the effective date of the revised Terms constitutes your acceptance of the changes.",
              "Zadržavamo pravo izmjene ovih Uvjeta u bilo koje vrijeme. Kada napravimo materijalne izmjene, obavijestit ćemo vas e-poštom i/ili prikazivanjem istaknutog obavijesti unutar usluge najmanje 30 dana prije stupanja izmjena na snagu. Vaše daljnje korištenje EnterCRM-a nakon datuma stupanja na snagu revidiranih Uvjeta predstavlja vaše prihvaćanje izmjena."
            )}
          </p>
          <p className="text-sm text-[#A1A1AA] leading-relaxed">
            {t(
              "For questions about these Terms, contact us at legal@entersolutions.io.",
              "Za pitanja o ovim Uvjetima, kontaktirajte nas na legal@entersolutions.io."
            )}
          </p>
          <div className="text-sm text-[#A1A1AA] space-y-1 pt-2">
            <p className="text-[#FAFAFA] font-medium">EnterSolutions d.o.o.</p>
            <p>Zagreb, {t("Croatia", "Hrvatska")}</p>
            <p>
              <a href="mailto:legal@entersolutions.io" className="text-[#6366F1] hover:underline">
                legal@entersolutions.io
              </a>
            </p>
          </div>
        </div>
      </div>
    </StaticPageLayout>
  );
}
