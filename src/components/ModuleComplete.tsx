"use client";

import { useState, useEffect } from "react";

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

/** Small checkmark badge that appears on completed module cards */
export default function ModuleComplete({ moduleId }: { moduleId: string }) {
  const [done, setDone] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setDone(load().includes(moduleId));
    setHydrated(true);
  }, [moduleId]);

  if (!hydrated || !done) return null;

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
      style={{
        background: "rgba(34,197,94,0.12)",
        color: "#22C55E",
      }}
      aria-label="Completed"
    >
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path
          d="M2.5 7.5L5.5 10.5L11.5 3.5"
          stroke="#22C55E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Done
    </span>
  );
}
