"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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

function save(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {}
}

interface Props {
  moduleId: string;
  moduleTitle: string;
  nextModuleId?: string;
  nextModuleTitle?: string;
}

export default function CompletionToggle({
  moduleId,
  moduleTitle,
  nextModuleId,
  nextModuleTitle,
}: Props) {
  const [done, setDone] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setDone(load().includes(moduleId));
    setHydrated(true);
  }, [moduleId]);

  if (!hydrated) return null;

  const toggle = () => {
    const prev = load();
    const next = done ? prev.filter((x) => x !== moduleId) : [...prev, moduleId];
    save(next);
    setDone(!done);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={toggle}
        className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold transition-all duration-300 cursor-pointer border-none"
        style={{
          background: done ? "var(--cnib-yellow)" : "rgba(255,255,255,0.08)",
          color: done ? "var(--cnib-black)" : "white",
          border: done ? "none" : "2px solid rgba(255,255,255,0.15)",
        }}
        aria-label={
          done
            ? `Mark "${moduleTitle}" as incomplete`
            : `Mark "${moduleTitle}" as complete`
        }
      >
        {/* Checkmark circle */}
        <span
          className="flex items-center justify-center rounded-full shrink-0 transition-all duration-300"
          style={{
            width: 24,
            height: 24,
            background: done ? "var(--cnib-black)" : "rgba(255,255,255,0.06)",
            border: done ? "none" : "2px solid rgba(255,255,255,0.2)",
          }}
          aria-hidden="true"
        >
          {done && (
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path
                d="M2.5 7.5L5.5 10.5L11.5 3.5"
                stroke="var(--cnib-yellow)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
        {done ? "Completed" : "Mark as complete"}
      </button>

      {/* After completion, show link to next module or progress page */}
      {done && nextModuleId && nextModuleTitle && (
        <Link
          href={`/themes/${nextModuleId}`}
          className="text-sm font-medium no-underline transition-colors"
          style={{ color: "var(--cnib-yellow)" }}
        >
          Next up: {nextModuleTitle} →
        </Link>
      )}
      {done && !nextModuleId && (
        <Link
          href="/progress"
          className="text-sm font-medium no-underline transition-colors"
          style={{ color: "var(--cnib-yellow)" }}
        >
          View your progress →
        </Link>
      )}
    </div>
  );
}
