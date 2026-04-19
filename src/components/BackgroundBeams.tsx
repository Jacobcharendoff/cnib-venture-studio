"use client";

import { motion } from "framer-motion";

interface BackgroundBeamsProps {
  className?: string;
}

export default function BackgroundBeams({ className = "" }: BackgroundBeamsProps) {
  const beams = [
    { x1: "10%", y1: "0%", x2: "35%", y2: "100%", delay: 0, duration: 8, opacity: 0.04 },
    { x1: "25%", y1: "0%", x2: "55%", y2: "100%", delay: 1.5, duration: 10, opacity: 0.03 },
    { x1: "50%", y1: "0%", x2: "70%", y2: "100%", delay: 3, duration: 12, opacity: 0.05 },
    { x1: "70%", y1: "0%", x2: "45%", y2: "100%", delay: 2, duration: 9, opacity: 0.03 },
    { x1: "85%", y1: "0%", x2: "15%", y2: "100%", delay: 4, duration: 11, opacity: 0.04 },
    { x1: "40%", y1: "0%", x2: "80%", y2: "100%", delay: 0.5, duration: 14, opacity: 0.02 },
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--cnib-yellow)" stopOpacity="0" />
            <stop offset="30%" stopColor="var(--cnib-yellow)" stopOpacity="1" />
            <stop offset="70%" stopColor="var(--cnib-yellow)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--cnib-yellow)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {beams.map((beam, i) => (
          <motion.line
            key={i}
            x1={beam.x1}
            y1={beam.y1}
            x2={beam.x2}
            y2={beam.y2}
            stroke="url(#beam-gradient)"
            strokeWidth="1"
            opacity={beam.opacity}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0, beam.opacity, 0],
            }}
            transition={{
              duration: beam.duration,
              delay: beam.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Ambient glow orbs */}
      <motion.div
        className="absolute w-64 h-64 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,241,0,0.04), transparent 70%)",
          left: "20%",
          top: "30%",
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 15, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-48 h-48 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,241,0,0.03), transparent 70%)",
          right: "15%",
          bottom: "20%",
        }}
        animate={{
          x: [0, -25, 15, 0],
          y: [0, 20, -10, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
