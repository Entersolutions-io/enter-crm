import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { I18nProvider } from "@/lib/i18n";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Enter CRM | Know Your Customers. Grow Your Revenue.",
  description:
    "Enterprise-grade CRM platform with real-time tracking, AI-powered analytics, customer segmentation, and multi-channel automation. A product of EnterSolutions.",
  keywords: [
    "CRM",
    "customer analytics",
    "tracking",
    "automation",
    "email marketing",
    "SMS",
    "segmentation",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui, -apple-system, sans-serif" }}
      >
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
