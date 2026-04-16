"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAvailableModules } from "@/data/modules";

const STORAGE_KEY = "vs-progress";

function load(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function ProgressWidget() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const total = getAvailableModules().length;

  useEffect(() => {
    setCompleted(load());
    setHydrated(true);
  }, []);

  // Don't render until hydrated, and only show if user has started
  if (!hydrated || completed.length === 0) return null;

  const percent = Math.round((completed.length / total) * 100);

  return (
    <Link
      href="/progress"
      className="no-underline inline-flex items-center gap-4 px-6 py-3 rounded-full transition-all duration-300 group"
      style={{
        background: "rgba(255,241,0,0.08)",
        border: "1px solid rgba(255,241,0,0.15)",
        minHeight: 48,
      }}
      aria-label={`${completed.length} of ${total} modules done — ${percent}% complete. View your progress.`}
    >
      {/* Mini ring */}
      <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
        <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
        <circle
          cx="18"
          cy="18"
          r="14"
          fill="none"
          stroke="var(--cnib-yellow)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 14}
          strokeDashoffset={2 * Math.PI * 14 - (percent / 100) * 2 * Math.PI * 14}
          transform="rotate(-90 18 18)"
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
        <text
          x="18"
          y="18"
          dominantBaseline="central"
          textAnchor="middle"
          fill="white"
          fontSize="9"
          fontWeight="700"
        >
          {percent}%
        </text>
      </svg>

      <div>
        <p className="text-sm font-semibold text-white group-hover:text-cnib-yellow transition-colors">
          {completed.length}/{total} modules done
        </p>
        <p className="text-xs" style={{ color: "var(--text-on-dark-muted)" }}>
          Continue where you left off <span aria-hidden="true">\u2192</span>
        </p>
      </div>
    </Link>
  );
}
