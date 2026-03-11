"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "transition" | "done">(
    "loading"
  );

  const advanceProgress = useCallback(() => {
    setProgress((prev) => {
      if (prev >= 100) return 100;
      const remaining = 100 - prev;
      const increment = Math.max(1, Math.floor(remaining * 0.15));
      return Math.min(prev + increment, 100);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(advanceProgress, 200);
    return () => clearInterval(interval);
  }, [advanceProgress]);

  useEffect(() => {
    if (progress >= 100 && phase === "loading") {
      const timer = setTimeout(() => setPhase("transition"), 400);
      return () => clearTimeout(timer);
    }
  }, [progress, phase]);

  useEffect(() => {
    if (phase === "transition") {
      const timer = setTimeout(() => setPhase("done"), 1200);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="relative flex flex-col items-center gap-4">
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                {phase === "loading" ? (
                  <motion.div
                    key="finding"
                    className="flex items-baseline gap-3"
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <span className="text-white font-semibold tracking-[-0.02em] text-[clamp(1.5rem,5vw,2.5rem)]">
                      Finding Solutions
                    </span>
                    <span className="text-white/50 font-semibold text-[0.5em] tabular-nums">
                      {progress}%
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="enter"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <motion.span
                      className="text-white font-semibold tracking-[-0.02em] text-[clamp(1.5rem,5vw,2.5rem)]"
                      animate={{ scale: [1, 0.9], opacity: [1, 0] }}
                      transition={{
                        duration: 0.6,
                        delay: 0.5,
                        ease: [0.65, 0, 0.35, 1],
                      }}
                    >
                      Enter Solutions
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
