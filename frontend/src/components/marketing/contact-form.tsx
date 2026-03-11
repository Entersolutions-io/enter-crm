"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", company: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left side - info */}
          <ScrollReveal>
            <div>
              <p className="text-sm text-[#6366F1] font-semibold tracking-wide uppercase mb-3">
                Contact
              </p>
              <h2
                className="text-3xl md:text-5xl font-semibold text-[#FAFAFA] tracking-tight mb-6"
                style={{ letterSpacing: "-0.02em" }}
              >
                Get in touch
              </h2>
              <p className="text-[#A1A1AA] leading-relaxed mb-8 max-w-md">
                Interested in Enter CRM for your business? Tell us about your
                needs and our team will get back to you within 24 hours.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                    <Send className="h-4 w-4 text-[#6366F1]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#71717A]">Email us at</p>
                    <a
                      href="mailto:info@entersolutions.io"
                      className="text-sm text-[#FAFAFA] hover:text-[#6366F1] transition-colors"
                    >
                      info@entersolutions.io
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right side - form */}
          <ScrollReveal delay={0.15}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-[#A1A1AA] mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#111113] border border-white/[0.06] text-[#FAFAFA] text-sm placeholder:text-[#71717A] focus:outline-none focus:border-[#6366F1]/50 focus:ring-1 focus:ring-[#6366F1]/25 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-[#A1A1AA] mb-2"
                  >
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#111113] border border-white/[0.06] text-[#FAFAFA] text-sm placeholder:text-[#71717A] focus:outline-none focus:border-[#6366F1]/50 focus:ring-1 focus:ring-[#6366F1]/25 transition-all"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm text-[#A1A1AA] mb-2"
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#111113] border border-white/[0.06] text-[#FAFAFA] text-sm placeholder:text-[#71717A] focus:outline-none focus:border-[#6366F1]/50 focus:ring-1 focus:ring-[#6366F1]/25 transition-all"
                  placeholder="Company name"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm text-[#A1A1AA] mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#111113] border border-white/[0.06] text-[#FAFAFA] text-sm placeholder:text-[#71717A] focus:outline-none focus:border-[#6366F1]/50 focus:ring-1 focus:ring-[#6366F1]/25 transition-all resize-none"
                  placeholder="Tell us about your needs..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white rounded-xl bg-[#6366F1] hover:bg-[#5558E6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {status === "sending" ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>

              {status === "sent" && (
                <div className="flex items-center gap-2 text-sm text-emerald-400">
                  <CheckCircle className="h-4 w-4" />
                  Message sent! We&apos;ll get back to you soon.
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 text-sm text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  Something went wrong. Please email us directly.
                </div>
              )}
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
