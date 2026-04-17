"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { phases, getModulesByPhase, getAvailableModules } from "@/data/modules";
import type { Module } from "@/data/modules";

// ── Progress persistence ────────────────────────────────────
const STORAGE_KEY = "vs-progress";

function loadProgress(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveProgress(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // localStorage unavailable — silent fail
  }
}

// ── Helpers ─────────────────────────────────────────────
function getNextModule(completedIds: string[], allModules: Module[]): Module | null {
  return allModules.find((m) => !completedIds.includes(m.id)) ?? null;
}

function getPhaseProgress(phaseId: string, completedIds: string[]) {
  const mods = getModulesByPhase(phaseId);
  const done = mods.filter((m) => completedIds.includes(m.id)).length;
  return { total: mods.length, done, percent: mods.length ? Math.round((done / mods.length) * 100) : 0 };
}

// ── Circular progress ring ──────────────────────────────────
function ProgressRing({
  percent,
  size = 200,
  stroke = 10,
}: {
  percent: number;
  size?: number;
  stroke?: number;
}) {
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={`${percent}% complete`}
      className="block"
    >
      {/* Background ring */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={stroke}
      />
      {/* Progress arc */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--cnib-yellow)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)" }}
      />
      {/* Center text */}
      <text
        x="50%"
        y="46%"
        dominantBaseline="central"
        textAnchor="middle"
        fill="white"
        fontSize={size * 0.22}
        fontWeight="700"
        fontFamily="var(--font-display)"
      >
        {percent}%
      </text>
      <text
        x="50%"
        y="62%"
        dominantBaseline="central"
        textAnchor="middle"
        fill="rgba(255,255,255,0.5)"
        fontSize={size * 0.075}
        fontWeight="600"
        fontFamily="var(--font-body)"
        letterSpacing="0.1em"
      >
        COMPLETE
      </text>
    </svg>
  );
}

// ── Checkmark icon ────────────────────────────────────────
function CheckIcon({ checked }: { checked: boolean }) {
  return (
    <span
      className="flex items-center justify-center rounded-full shrink-0 transition-all duration-300"
      style={{
        width: 28,
        height: 28,
        background: checked ? "var(--cnib-yellow)" : "rgba(255,255,255,0.06)",
        border: checked ? "none" : "2px solid rgba(255,255,255,0.15)",
      }}
      aria-hidden="true"
    >
      {checked && (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2.5 7.5L5.5 10.5L11.5 3.5"
            stroke="var(--cnib-black)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}

// ── Small phase progress bar ────────────────────────────────
function PhaseBar({ percent, label }: { percent: number; label: string }) {
  return (
    <div
      className="w-full h-1.5 rounded-full overflow-hidden"
      style={{ background: "rgba(255,255,255,0.08)" }}
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{
          width: `${percent}%`,
          background: percent === 100 ? "var(--cnib-yellow)" : "var(--cnib-yellow-dim)",
        }}
      />
    </div>
  );
}

// ── Page ────────────────────────────────────────────────
export default function ProgressPage() {
  const allModules = getAvailableModules();
  const totalModules = allModules.length;

  const [completed, setCompleted] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    setCompleted(loadProgress());
    setHydrated(true);
  }, []);

  const toggle = useCallback(
    (id: string, title: string) => {
      setCompleted((prev) => {
        const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
        saveProgress(next);
        const wasDone = prev.includes(id);
        setAnnouncement(
          wasDone
            ? `${title} marked as incomplete. ${prev.length - 1} of ${totalModules} modules done.`
            : `${title} marked as complete. ${prev.length + 1} of ${totalModules} modules done.`
        );
        return next;
      });
    },
    [totalModules],
  );

  const overallPercent = totalModules ? Math.round((completed.length / totalModules) * 100) : 0;
  const nextModule = getNextModule(completed, allModules);

  // Don't flash content before hydration
  if (!hydrated) {
    return (
      <div className="mesh-gradient-dark min-h-screen">
        <div className="pt-32 pb-20 content-max text-center">
          <p style={{ color: "var(--text-on-dark-muted)" }}>Loading your progress\u2026</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Screen reader announcements for toggle actions */}
      <div className="sr-only" role="status" aria-live="polite">
        {announcement}
      </div>

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="mesh-gradient-hero relative overflow-hidden pt-32 sm:pt-40 pb-20" aria-label="Your progress overview">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
          aria-hidden="true"
        />
        <div className="content-max relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            {/* Ring */}
            <div className="shrink-0">
              <ProgressRing percent={overallPercent} size={220} stroke={12} />
            </div>

            {/* Copy */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <span className="glow-dot" aria-hidden="true" />
                <p className="caption text-cnib-yellow">Your journey</p>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
                {completed.length === 0
                  ? "Let\u2019s get started."
                  : completed.length === totalModules
                  ? "You made it."
                  : "Keep going."}
              </h1>

              <p
                className="body-large max-w-xl mb-8"
                style={{ color: "var(--text-on-dark-muted)" }}
              >
                {completed.length === 0
                  ? "Track your way through all 18 modules. Check off each one as you finish."
                  : completed.length === totalModules
                  ? "Every module complete. You\u2019ve built everything you need to pitch your business."
                  : `${completed.length} of ${totalModules} modules done. ${totalModules - completed.length} to go.`}
              </p>

              {/* Stats row */}
              <div className="flex items-center justify-center md:justify-start gap-10" role="group" aria-label="Progress statistics">
                <div>
                  <p className="text-3xl font-bold text-cnib-yellow">{completed.length}</p>
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-on-dark-muted)" }}>
                    Completed
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">{totalModules - completed.length}</p>
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-on-dark-muted)" }}>
                    Remaining
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">
                    {phases.filter((p) => getPhaseProgress(p.id, completed).percent === 100).length}/{phases.length}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-on-dark-muted)" }}>
                    Phases done
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Continue CTA ────────────────────────────────── */}
      {nextModule && (
        <section className="section-yellow py-6" aria-label="Continue learning">
          <div className="content-max flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M7 4l6 6-6 6" stroke="var(--cnib-black)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-sm font-semibold text-cnib-black">
                Up next: <span className="font-bold">{nextModule.title}</span>
                <span className="font-normal opacity-70"> \u2014 Phase {nextModule.phase.number}: {nextModule.phase.name}</span>
              </p>
            </div>
            <Link href={`/themes/${nextModule.id}`} className="btn-dark text-sm whitespace-nowrap">
              Continue learning
            </Link>
          </div>
        </section>
      )}

      {/* ── Phase breakdown ─────────────────────────────── */}
      {phases.map((phase, idx) => {
        const mods = getModulesByPhase(phase.id);
        const pp = getPhaseProgress(phase.id, completed);
        const isDark = idx % 2 === 0;

        return (
          <section
            key={phase.id}
            className={`py-16 sm:py-20 relative overflow-hidden ${isDark ? "mesh-gradient-dark" : ""}`}
            style={!isDark ? { background: "var(--cnib-charcoal)" } : undefined}
            aria-label={`Phase ${phase.number}: ${phase.name} \u2014 ${pp.done} of ${pp.total} complete`}
          >
            {isDark && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
                  backgroundSize: "60px 60px",
                }}
                aria-hidden="true"
              />
            )}

            <div className="content-max relative z-10">
              {/* Phase header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="glow-dot" aria-hidden="true" />
                    <span className="eyebrow text-cnib-yellow">Phase {phase.number}</span>
                    {pp.percent === 100 && (
                      <span className="badge text-xs">Complete</span>
                    )}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {phase.name}
                  </h2>
                  <p className="text-sm mt-1" style={{ color: "var(--text-on-dark-muted)" }}>
                    {phase.tagline}
                  </p>
                </div>
                <p className="text-sm font-semibold text-white tabular-nums whitespace-nowrap">
                  {pp.done} / {pp.total}
                </p>
              </div>

              <PhaseBar percent={pp.percent} label={`Phase ${phase.number}: ${phase.name} progress`} />

              {/* Module checklist */}
              <ul className="mt-8 space-y-3" role="list">
                {mods.map((mod, modIdx) => {
                  const isDone = completed.includes(mod.id);
                  // Running module number within the full curriculum
                  const globalIndex =
                    phases
                      .slice(0, idx)
                      .reduce((acc, p) => acc + getModulesByPhase(p.id).length, 0) +
                    modIdx +
                    1;

                  return (
                    <li key={mod.id}>
                      <div
                        className="flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-300 group"
                        style={{
                          background: isDone ? "rgba(255,241,0,0.06)" : "rgba(255,255,255,0.03)",
                          border: `1px solid ${isDone ? "rgba(255,241,0,0.15)" : "rgba(255,255,255,0.06)"}`,
                        }}
                      >
                        {/* Toggle button */}
                        <button
                          onClick={() => toggle(mod.id, mod.title)}
                          aria-label={isDone ? `Mark \"${mod.title}\" as incomplete` : `Mark \"${mod.title}\" as complete`}
                          className="cursor-pointer bg-transparent border-none p-0"
                          style={{ minWidth: 28, minHeight: 28 }}
                        >
                          <CheckIcon checked={isDone} />
                        </button>

                        {/* Module info */}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/themes/${mod.id}`}
                            className="no-underline group/link"
                          >
                            <p
                              className={`text-base font-semibold transition-colors truncate ${
                                isDone ? "line-through opacity-60" : ""
                              }`}
                              style={{ color: isDone ? "var(--text-on-dark-muted)" : "white" }}
                            >
                              <span className="text-cnib-yellow-dim font-mono text-sm mr-2" aria-hidden="true">
                                {String(globalIndex).padStart(2, "0")}
                              </span>
                              <span className="group-hover/link:text-cnib-yellow group-focus-visible/link:text-cnib-yellow transition-colors">
                                {mod.title}
                              </span>
                            </p>
                          </Link>
                          <p className="text-xs mt-0.5 truncate" style={{ color: "var(--text-on-dark-muted)" }}>
                            {mod.subtitle}
                          </p>
                        </div>

                        {/* Arrow to module — decorative duplicate, remove from tab order */}
                        <Link
                          href={`/themes/${mod.id}`}
                          className="shrink-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity"
                          aria-hidden="true"
                          tabIndex={-1}
                        >
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M7 4l6 6-6 6" stroke="var(--cnib-yellow)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        );
      })}

      {/* ── Bottom CTA ──────────────────────────────────── */}
      <section className="section-yellow section-padding-sm">
        <div className="content-narrow text-center">
          <h2 className="section-heading text-cnib-black mb-4">
            {completed.length === totalModules ? "You\u2019re ready to pitch." : "Every module counts."}
          </h2>
          <p className="body-large text-cnib-black/70 mb-8">
            {completed.length === totalModules
              ? "You\u2019ve completed the entire curriculum. Time to take your business to the world."
              : "Work through each module at your own pace. Check them off as you go \u2014 they\u2019ll stay saved right here."}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/themes" className="btn-dark">
              Browse all modules
            </Link>
            {completed.length > 0 && completed.length < totalModules && (
              <button
                onClick={() => {
                  if (window.confirm("This will reset all your progress. Are you sure?")) {
                    setCompleted([]);
                    saveProgress([]);
                    setAnnouncement("All progress has been reset.");
                  }
                }}
                className="text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer bg-transparent border-none"
                style={{ color: "var(--cnib-black)", opacity: 0.7 }}
              >
                Reset progress
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
