"use client";

import { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Show when scrolling down past hero (400px), hide when scrolling up
    if (latest > 400) {
      setPastHero(true);
      if (latest > previous) {
        setVisible(true); // scrolling down
      } else {
        setVisible(false); // scrolling up
      }
    } else {
      setPastHero(false);
      setVisible(false);
    }
  });

  // Don't render on desktop — this is mobile only
  // CSS handles the md:hidden but we still need the animation logic

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      initial={{ y: 100 }}
      animate={{ y: visible && pastHero ? 0 : 100 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { type: "spring", damping: 25, stiffness: 300 }
      }
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="bg-[var(--accent)] shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
        <a
          href="tel:832-605-6239"
          className="flex items-center justify-center gap-3 py-4 px-6 text-white font-bold text-lg"
        >
          <motion.div
            animate={
              prefersReducedMotion
                ? {}
                : {
                    scale: [1, 1.15, 1],
                  }
            }
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </motion.div>
          Call Now — (832) 605-6239
        </a>
      </div>
    </motion.div>
  );
}
