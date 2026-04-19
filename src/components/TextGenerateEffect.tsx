"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface TextGenerateEffectProps {
  children: string;
  className?: string;
  highlightWords?: string[];
  highlightClassName?: string;
  staggerDelay?: number;
  duration?: number;
}

export default function TextGenerateEffect({
  children,
  className = "",
  highlightWords = [],
  highlightClassName = "text-cnib-yellow",
  staggerDelay = 0.04,
  duration = 0.5,
}: TextGenerateEffectProps) {
  const words = children.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      filter: "blur(8px)",
      y: 6,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.span
      className={`inline ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {words.map((word, i) => {
        const isHighlight = highlightWords.some(
          (hw) => word.toLowerCase().replace(/[^a-z]/g, "") === hw.toLowerCase()
        );
        return (
          <motion.span
            key={`${word}-${i}`}
            variants={child}
            className={`inline-block mr-[0.25em] ${isHighlight ? highlightClassName : ""}`}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
