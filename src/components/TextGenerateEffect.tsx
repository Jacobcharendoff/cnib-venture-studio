"use client";

import { motion } from "framer-motion";

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

  return (
    <motion.span
      className={`inline ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: staggerDelay }}
    >
      {words.map((word, i) => {
        const cleanWord = word.toLowerCase().replace(/[^a-z]/g, "");
        const isHighlight = highlightWords.some(
          (hw) => cleanWord === hw.toLowerCase().replace(/[^a-z]/g, "")
        );
        return (
          <motion.span
            key={`${word}-${i}`}
            className={`inline-block ${isHighlight ? highlightClassName : ""}`}
            style={{ marginRight: "0.25em" }}
            variants={{
              hidden: { opacity: 0, y: 6 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration,
                  ease: [0.25, 0.1, 0.25, 1],
                },
              },
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
