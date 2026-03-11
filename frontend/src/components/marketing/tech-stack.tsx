"use client";

import { ScrollReveal } from "@/components/effects/scroll-reveal";

const technologies = [
  "Google Cloud",
  "AWS",
  "React",
  "Next.js",
  "Laravel",
  "TypeScript",
  "Tailwind CSS",
  "PostgreSQL",
  "Redis",
  "Node.js",
  "Docker",
  "Kubernetes",
];

function TechItem({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3 px-6 py-3 mx-2 shrink-0">
      <div className="h-8 w-8 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
        <span className="text-xs text-[#71717A] font-medium">
          {name.slice(0, 2).toUpperCase()}
        </span>
      </div>
      <span className="text-sm text-[#71717A] whitespace-nowrap font-medium">
        {name}
      </span>
    </div>
  );
}

export function TechStack() {
  // Double the array for seamless loop
  const doubled = [...technologies, ...technologies];

  return (
    <section className="relative py-20 overflow-hidden">
      <ScrollReveal>
        <p className="text-center text-sm text-[#71717A] font-medium tracking-wide uppercase mb-10">
          Built with industry-leading technology
        </p>
      </ScrollReveal>

      <div className="relative">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0B] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0B] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll-left" style={{ width: "fit-content" }}>
          {doubled.map((tech, i) => (
            <TechItem key={`${tech}-${i}`} name={tech} />
          ))}
          {doubled.map((tech, i) => (
            <TechItem key={`${tech}-dup-${i}`} name={tech} />
          ))}
        </div>
      </div>
    </section>
  );
}
