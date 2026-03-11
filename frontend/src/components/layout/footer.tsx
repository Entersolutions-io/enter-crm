import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, MapPin, Globe } from "lucide-react";

const footerLinks = {
  Product: [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Demo", href: "/demo" },
    { name: "Changelog", href: "/changelog" },
  ],
  Resources: [
    { name: "Documentation", href: "/docs" },
    { name: "API Reference", href: "/docs/api" },
    { name: "Developer Guide", href: "/docs/guide" },
    { name: "Blog", href: "/blog" },
    { name: "Status", href: "/status" },
  ],
  Company: [
    { name: "About EnterSolutions", href: "https://entersolutions.io" },
    { name: "Careers", href: "https://entersolutions.io/careers" },
    { name: "Contact", href: "#contact" },
    { name: "Partners", href: "/partners" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "GDPR Compliance", href: "/gdpr" },
    { name: "DPA", href: "/dpa" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/entersolutions", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/entersolutions", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/Entersolutions-io", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#050506]">
      <div className="mx-auto max-w-6xl px-6">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <span className="text-white font-semibold text-lg tracking-tight">
              EnterCRM
            </span>
            <p className="mt-4 text-sm text-[#71717A] leading-relaxed max-w-xs">
              Enterprise-grade CRM platform with real-time tracking, smart
              segmentation, and multi-channel automation.
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
          <p className="text-xs text-[#71717A]">
            &copy; {new Date().getFullYear()} EnterSolutions. All rights reserved.
          </p>
          <p className="text-xs text-[#71717A]">
            This website is a product of{" "}
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
