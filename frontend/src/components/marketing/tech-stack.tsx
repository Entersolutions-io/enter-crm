"use client";

import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { useI18n } from "@/lib/i18n";

const technologies = [
  { name: "Google Cloud", slug: "googlecloud" },
  { name: "React", slug: "react" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "Laravel", slug: "laravel" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "Redis", slug: "redis" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "Docker", slug: "docker" },
  { name: "Kubernetes", slug: "kubernetes" },
  { name: "Stripe", slug: "stripe" },
];

function TechItem({ name, slug }: { name: string; slug: string }) {
  return (
    <div className="flex items-center gap-4 px-8 py-4 mx-3 shrink-0">
      <div className="h-10 w-10 rounded-xl bg-white/[0.06] flex items-center justify-center shrink-0 p-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://cdn.simpleicons.org/${slug}/white`}
          alt={name}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </div>
      <span className="text-base text-[#A1A1AA] whitespace-nowrap font-medium">
        {name}
      </span>
    </div>
  );
}

export function TechStack() {
  const { t } = useI18n();
  const doubled = [...technologies, ...technologies];

  return (
    <section className="relative py-20 overflow-hidden">
      <ScrollReveal>
        <p className="text-center text-sm text-[#71717A] font-medium tracking-wide uppercase mb-12">
          {t("Powered by industry-leading technology", "Pokreće vodeća industrijska tehnologija")}
        </p>
      </ScrollReveal>

      <div className="relative">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#0A0A0B] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#0A0A0B] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll-left" style={{ width: "fit-content" }}>
          {doubled.map((tech, i) => (
            <TechItem key={`${tech.slug}-${i}`} name={tech.name} slug={tech.slug} />
          ))}
          {doubled.map((tech, i) => (
            <TechItem key={`${tech.slug}-dup-${i}`} name={tech.name} slug={tech.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}
