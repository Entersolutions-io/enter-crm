"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 200);
  });

  return (
    <motion.header
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <nav className="flex items-center justify-between w-full max-w-6xl rounded-2xl px-6 py-3 bg-[#0A0A0B]/80 backdrop-blur-xl border border-white/[0.06]">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-white font-semibold text-lg tracking-tight">
            EnterCRM
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm text-[#A1A1AA] hover:text-white transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-[#A1A1AA] hover:text-white transition-colors duration-200 hidden sm:block"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white rounded-xl bg-[#6366F1] hover:bg-[#5558E6] transition-colors duration-200"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
