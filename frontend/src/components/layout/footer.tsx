import Link from "next/link";

const footerLinks = {
  Product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Demo", href: "/demo" },
    { name: "Integrations", href: "#integrations" },
  ],
  Resources: [
    { name: "Documentation", href: "/docs" },
    { name: "API Reference", href: "/docs/api" },
    { name: "Blog", href: "/blog" },
    { name: "Changelog", href: "/changelog" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "#contact" },
    { name: "EnterSolutions", href: "https://entersolutions.io" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "GDPR", href: "/gdpr" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#050506]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-[#FAFAFA] mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
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

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#71717A]">
              This website is a product of{" "}
              <a
                href="https://entersolutions.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6366F1] hover:text-[#818CF8] transition-colors"
              >
                EnterSolutions
              </a>
            </span>
          </div>
          <p className="text-sm text-[#71717A]/60">
            &copy; {new Date().getFullYear()} EnterSolutions. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
