"use client";

import { useState, useEffect } from "react";
import { LoadingScreen } from "@/components/effects/loading-screen";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/marketing/hero";
import { TechStack } from "@/components/marketing/tech-stack";
import { Features } from "@/components/marketing/features";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Pricing } from "@/components/marketing/pricing";
import { CTASection } from "@/components/marketing/cta-section";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen />
      <main
        className={`transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}
      >
        <Navbar />
        <Hero />
        <TechStack />
        <Features />
        <HowItWorks />
        <Pricing />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}
