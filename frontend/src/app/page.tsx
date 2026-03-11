"use client";

import { useState, useEffect } from "react";
import { LoadingScreen } from "@/components/effects/loading-screen";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/marketing/hero";
import { TechStack } from "@/components/marketing/tech-stack";
import { Features } from "@/components/marketing/features";
import { BeforeAfter } from "@/components/marketing/before-after";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { DemoPreview } from "@/components/marketing/demo-preview";
import { ContactForm } from "@/components/marketing/contact-form";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen />
      <main
        className={`transition-opacity duration-700 ${loading ? "opacity-0" : "opacity-100"}`}
      >
        <Navbar />
        <Hero />
        <TechStack />
        <Features />
        <BeforeAfter />
        <HowItWorks />
        <DemoPreview />
        <ContactForm />
        <Footer />
      </main>
    </>
  );
}
