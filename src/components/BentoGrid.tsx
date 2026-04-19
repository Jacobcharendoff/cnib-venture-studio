"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface BentoItemProps {
  children: ReactNode;
  className?: string;
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
}

export function BentoItem({ children, className = "", colSpan = 1, rowSpan = 1 }: BentoItemProps) {
  const colClass = colSpan === 2 ? "md:col-span-2" : "col-span-1";
  const rowClass = rowSpan === 2 ? "md:row-span-2" : "row-span-1";

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-2xl p-6 md:p-8 ${colClass} ${rowClass} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -2, transition: { duration: 0.3 } }}
      style={{
        background: "rgba(255, 255, 255, 0.04)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(255,241,0,0.06), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-[1]">{children}</div>
    </motion.div>
  );
}

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export default function BentoGrid({ children, className = "" }: BentoGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 ${className}`}>
      {children}
    </div>
  );
}
