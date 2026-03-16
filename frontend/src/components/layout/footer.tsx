"use client";

import Link from "next/link";
import { Github, Mail, MapPin, Globe } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { LanguageSwitcher } from "./language-switcher";
import { Logo } from "@/components/ui/logo";

const socialLinks = [
  { icon: Github, href: "https://github.com/Entersolutions-io", label: "GitHub" },
];

export function Footer() {
  const { t } = useI18n();

  const footerLinks = {
    [t("Product", "Proizvod")]: [
      { name: t("Features", "Značajke"), href: "#features" },
      { name: t("How It Works", "Kako radi"), href: "#how-it-works" },
      { name: "Demo", href: "/login?demo=true" },
      { name: t("Changelog", "Promjene"), href: "/changelog" },
    ],
    [t("Resources", "Resursi")]: [
      { name: t("Documentation", "Dokumentacija"), href: "/docs" },
      { name: "API Reference", href: "/docs/api" },
      { name: t("Developer Guide", "Vodič za programere"), href: "/docs/guide" },
      { name: "Blog", href: "/blog" },
      { name: "Status", href: "/status" },
    ],
    [t("Company", "Tvrtka")]: [
      { name: t("About EnterSolutions", "O EnterSolutions"), href: "https://entersolutions.io" },
      { name: t("Careers", "Karijere"), href: "https://entersolutions.io/careers" },
      { name: t("Contact", "Kontakt"), href: "#contact" },
      { name: t("Partners", "Partneri"), href: "/partners" },
    ],
    [t("Legal", "Pravno")]: [
      { name: t("Privacy Policy", "Politika privatnosti"), href: "/privacy" },
      { name: t("Terms of Service", "Uvjeti korištenja"), href: "/terms" },
      { name: t("Cookie Policy", "Politika kolačića"), href: "/cookies" },
      { name: t("GDPR Compliance", "GDPR usklađenost"), href: "/gdpr" },
      { name: "DPA", href: "/dpa" },
    ],
  };

  return (
    <footer className="border-t border-white/[0.06] bg-[#050506]">
      <div className="mx-auto max-w-6xl px-6">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Logo height={24} />
            <p className="mt-4 text-sm text-[#71717A] leading-relaxed max-w-xs">
              {t(
                "Enterprise-grade CRM platform with real-time tracking, smart segmentation, and multi-channel automation.",
                "CRM platforma poslovne klase s praćenjem u stvarnom vremenu, pametnom segmentacijom i višekanalnom automatizacijom."
              )}
            </p>

            {/* Contact info */}
            <div className="mt-6 space-y-3">
              <a
                href="mailto:info@entersolutions.io"
                className="flex items-center gap-2 text-sm text-[#71717A] hover:text-[#A1A1AA] transition-colors"
              >
                <Mail className="h-4 w-4" />
                info@entersolutions.io
              </a>
              <a
                href="https://entersolutions.io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#71717A] hover:text-[#A1A1AA] transition-colors"
              >
                <Globe className="h-4 w-4" />
                entersolutions.io
              </a>
              <div className="flex items-center gap-2 text-sm text-[#71717A]">
                <MapPin className="h-4 w-4" />
                Zagreb, Croatia
              </div>
            </div>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="h-9 w-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[#71717A] hover:text-white hover:bg-white/[0.08] transition-all duration-200"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-[#FAFAFA] mb-4">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#71717A] hover:text-[#A1A1AA] transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <p className="text-xs text-[#71717A]">
              &copy; {new Date().getFullYear()} EnterSolutions. {t("All rights reserved.", "Sva prava pridržana.")}
            </p>
          </div>
          <p className="text-xs text-[#71717A]">
            {t("This website is a product of", "Ova web stranica je proizvod")}{" "}
            <a
              href="https://entersolutions.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6366F1] hover:text-[#818CF8] transition-colors"
            >
              EnterSolutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
