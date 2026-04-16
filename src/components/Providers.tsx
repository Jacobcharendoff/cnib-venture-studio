"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Global providers — wraps the app in framer-motion's MotionConfig
 * to automatically respect prefers-reduced-motion at the framework level.
 * When the user has reduced motion enabled, all framer-motion animations
 * instantly resolve to their final state (no motion).
 */
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
