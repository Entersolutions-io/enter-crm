/* eslint-disable @next/next/no-img-element */
"use client";

import { useI18n, type Locale } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const next: Locale = locale === "en" ? "hr" : "en";

  return (
    <button
      onClick={() => setLocale(next)}
      className="h-8 w-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:bg-white/[0.08] transition-all duration-200"
      title={locale === "en" ? "Switch to Croatian" : "Switch to English"}
    >
      <img
        src={`https://flagcdn.com/w40/${next === "hr" ? "hr" : "gb"}.png`}
        srcSet={`https://flagcdn.com/w80/${next === "hr" ? "hr" : "gb"}.png 2x`}
        alt={next === "hr" ? "Hrvatski" : "English"}
        width={20}
        height={15}
        className="rounded-[2px] object-cover"
      />
    </button>
  );
}
