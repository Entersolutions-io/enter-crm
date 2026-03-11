"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"counting" | "swap" | "fadeout" | "done">("counting");

  const tick = useCallback(() => {
    setProgress((prev) => {
      if (prev >= 100) return 100;
      const step = Math.random() * 4 + 2; // 2-6 per tick
      return Math.min(Math.round(prev + step), 100);
    });
  }, []);

  // Fast counting: every 40-60ms
  useEffect(() => {
    if (phase !== "counting") return;
    const interval = setInterval(tick, 50);
    return () => clearInterval(interval);
  }, [tick, phase]);

  // When 100% reached, wait a beat then swap text
  useEffect(() => {
    if (progress >= 100 && phase === "counting") {
      const t = setTimeout(() => setPhase("swap"), 200);
      return () => clearTimeout(t);
    }
  }, [progress, phase]);

  // After swap animation, fade out
  useEffect(() => {
    if (phase === "swap") {
      const t = setTimeout(() => setPhase("fadeout"), 700);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // After fade out, done
  useEffect(() => {
    if (phase === "fadeout") {
      const t = setTimeout(() => setPhase("done"), 500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="relative flex flex-col items-center"
            animate={
              phase === "fadeout"
                ? { scale: 0.92, opacity: 0 }
                : { scale: 1, opacity: 1 }
            }
            transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="relative overflow-hidden h-[60px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {(phase === "counting") && (
                  <motion.div
                    key="finding"
                    className="flex items-baseline gap-3"
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.65, 0, 0.35, 1] }}
                  >
                    <span
                      className="text-white font-semibold tracking-[-0.02em]"
                      style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)" }}
                    >
                      Finding Solutions
                    </span>
                    <span
                      className="text-white/40 font-semibold tabular-nums"
                      style={{ fontSize: "clamp(0.75rem, 2vw, 1rem)" }}
                    >
                      {progress}%
                    </span>
                  </motion.div>
                )}
                {(phase === "swap" || phase === "fadeout") && (
                  <motion.div
                    key="enter"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.28, ease: [0.65, 0, 0.35, 1] }}
                  >
                    <span
                      className="text-white font-semibold tracking-[-0.02em]"
                      style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)" }}
                    >
                      Enter Solutions
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
    </AnimatePresence>
  );
}
