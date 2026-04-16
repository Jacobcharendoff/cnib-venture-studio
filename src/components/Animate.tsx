"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode, ElementType } from "react";

// ── Shared easing ─────────────────────────────────────────
const ease = [0.25, 0.1, 0.25, 1] as const; // cubic-bezier — smooth, not bouncy

// ── FadeIn ──────────────────────────────────────────────
// Fades + slides up on scroll. Wraps any element.
const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  as?: ElementType;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.6,
  as = "div",
  style,
  ...rest
}: FadeInProps) {
  const Component = motion.create(as as keyof HTMLElementTagNameMap);
  return (
    <Component
      variants={fadeInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, delay, ease }}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </Component>
  );
}

// ── Stagger ─────────────────────────────────────────────
// Parent that staggers children with FadeIn effect.
const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

interface StaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function Stagger({ children, className, staggerDelay = 0.1 }: StaggerProps) {
  return (
    <motion.div
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={staggerChild} className={className}>
      {children}
    </motion.div>
  );
}

// ── ScaleIn ─────────────────────────────────────────────
// Subtle scale + fade for hero elements
export function ScaleIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── SlideIn ─────────────────────────────────────────────
// Slides from left or right
export function SlideIn({
  children,
  className,
  from = "left",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  from?: "left" | "right";
  delay?: number;
}) {
  const x = from === "left" ? -40 : 40;
  return (
    <motion.div
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
