"use client";

import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/effects/scroll-reveal";

const technologies = [
  { name: "Google Cloud", icon: "/logos/google-cloud.svg" },
  { name: "AWS", icon: "/logos/aws.svg" },
  { name: "React", icon: "/logos/react.svg" },
  { name: "Next.js", icon: "/logos/nextjs.svg" },
  { name: "Laravel", icon: "/logos/laravel.svg" },
  { name: "TypeScript", icon: "/logos/typescript.svg" },
  { name: "Tailwind CSS", icon: "/logos/tailwind.svg" },
  { name: "PostgreSQL", icon: "/logos/postgresql.svg" },
  { name: "Redis", icon: "/logos/redis.svg" },
  { name: "Node.js", icon: "/logos/nodejs.svg" },
];

function TechItem({ name, icon }: { name: string; icon: string }) {
  return (
    <div className="group relative flex items-center gap-3 px-6 py-3 mx-4">
      {/* Placeholder - replace with actual SVG logos later */}
      <div className="h-8 w-8 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0 group-hover:bg-white/[0.12] transition-colors duration-300">
        <span className="text-xs text-white/40 group-hover:text-white/80 transition-colors font-medium">
          {name.slice(0, 2)}
        </span>
      </div>
      <span className="text-sm text-white/30 group-hover:text-white/70 transition-colors duration-300 whitespace-nowrap font-medium">
        {name}
      </span>
    </div>
  );
}

export function TechStack() {
  return (
    <section className="relative py-20 overflow-hidden">
      <ScrollReveal>
        <p className="text-center text-sm text-white/40 font-medium tracking-wide uppercase mb-10">
          Built with industry-leading technology
        </p>
      </ScrollReveal>

      {/* Infinite scroll carousel */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0B] to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0B] to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden">
          <div className="flex animate-scroll">
            {[...technologies, ...technologies].map((tech, i) => (
              <TechItem key={`${tech.name}-${i}`} name={tech.name} icon={tech.icon} />
            ))}
          </div>
          <div className="flex animate-scroll" aria-hidden>
            {[...technologies, ...technologies].map((tech, i) => (
              <TechItem key={`${tech.name}-dup-${i}`} name={tech.name} icon={tech.icon} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
