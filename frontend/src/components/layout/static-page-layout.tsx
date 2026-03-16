"use client";

import { Navbar } from "./navbar";
import { Footer } from "./footer";

export function StaticPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#0A0A0B]">
      <Navbar />
      <div className="pt-28 pb-20 px-6">
        <div className="mx-auto max-w-4xl">{children}</div>
      </div>
      <Footer />
    </main>
  );
}
