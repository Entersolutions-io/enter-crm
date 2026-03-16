"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles } from "lucide-react";
import { api } from "@/lib/api";
import { setAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { Logo } from "@/components/ui/logo";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const { t } = useI18n();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("demo") === "true") {
      setEmail("demo@entercrm.io");
      setPassword("password");
    }
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await api<{ token: string; user: unknown; tenant: unknown }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setAuth(data.token, data.user, data.tenant);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  function fillDemo() {
    setEmail("demo@entercrm.io");
    setPassword("password");
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Logo height={28} />
          </Link>
          <p className="text-sm text-[#71717A] mt-2">{t("Sign in to your account", "Prijavite se na svoj račun")}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-red-400/[0.08] border border-red-400/20 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#A1A1AA] mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-10 rounded-lg border border-[#1F1F23] bg-[#111113] px-3 text-sm text-[#FAFAFA] placeholder:text-[#52525B] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition-colors"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#A1A1AA] mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-10 rounded-lg border border-[#1F1F23] bg-[#111113] px-3 text-sm text-[#FAFAFA] placeholder:text-[#52525B] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 rounded-lg bg-[#6366F1] hover:bg-[#5558E6] text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? t("Signing in...", "Prijava...") : t("Sign In", "Prijava")}
          </button>
        </form>

        {/* Demo button */}
        <button
          onClick={fillDemo}
          type="button"
          className="w-full mt-3 h-10 rounded-lg border border-[#1F1F23] bg-[#111113] hover:border-[#6366F1]/30 hover:bg-[#6366F1]/5 text-sm text-[#A1A1AA] hover:text-[#FAFAFA] transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#6366F1]" />
          {t("Try Demo Account", "Isprobajte demo račun")}
        </button>

        <p className="text-center text-sm text-[#71717A] mt-6">
          {t("Interested?", "Zainteresirani?")}{" "}
          <Link href="/#contact" className="text-[#6366F1] hover:text-[#818CF8] transition-colors">
            {t("Contact Us", "Kontaktirajte nas")}
          </Link>
        </p>
      </div>
    </div>
  );
}
