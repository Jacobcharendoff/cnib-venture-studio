"use client";

import { motion } from "framer-motion";

export default function HeroVisual() {
  const rings = [
    { r: 300, sw: 0.5, opacity: 0.04, da: "50 100", dur: 45, dir: 1 },
    { r: 240, sw: 1, opacity: 0.06, da: "80 40 20 40", dur: 35, dir: -1 },
    { r: 180, sw: 1.5, opacity: 0.09, da: "40 25", dur: 25, dir: 1 },
    { r: 130, sw: 1, opacity: 0.12, da: "100 30 15 30", dur: 30, dir: -1 },
    { r: 80, sw: 2, opacity: 0.16, da: "25 35", dur: 18, dir: 1 },
  ];

  return (
    <div
      className="absolute pointer-events-none hidden lg:block"
      style={{
        right: "-5%",
        top: "50%",
        transform: "translateY(-50%)",
      }}
      aria-hidden="true"
    >
      {/* Soft glow behind rings */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,241,0,0.06) 0%, rgba(255,241,0,0.02) 35%, transparent 65%)",
        }}
      />

      <svg
        width="660"
        height="660"
        viewBox="-330 -330 660 660"
        className="relative"
      >
        {/* Animated concentric rings */}
        {rings.map((ring, i) => (
          <motion.circle
            key={i}
            cx="0"
            cy="0"
            r={ring.r}
            fill="none"
            stroke="var(--cnib-yellow)"
            strokeWidth={ring.sw}
            opacity={ring.opacity}
            strokeDasharray={ring.da}
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: ring.dir * ring.r * Math.PI * 2 }}
            transition={{
              duration: ring.dur,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Static inner ring */}
        <circle
          cx="0"
          cy="0"
          r="40"
          fill="none"
          stroke="var(--cnib-yellow)"
          strokeWidth="0.75"
          opacity="0.15"
        />

        {/* Center glow */}
        <circle cx="0" cy="0" r="6" fill="var(--cnib-yellow)" opacity="0.2" />
        <circle cx="0" cy="0" r="2" fill="var(--cnib-yellow)" opacity="0.5" />

        {/* Accent dots around the inner ring */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const dist = 130;
          return (
            <motion.circle
              key={`dot-${i}`}
              cx={Math.cos(rad) * dist}
              cy={Math.sin(rad) * dist}
              r="2.5"
              fill="var(--cnib-yellow)"
              initial={{ opacity: 0.08 }}
              animate={{ opacity: [0.08, 0.25, 0.08] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
