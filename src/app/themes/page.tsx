import Link from "next/link";
import type { Metadata } from "next";
import { phases, modules, getModulesByPhase, getAvailableModules } from "@/data/modules";

export const metadata: Metadata = {
  title: "Themes | Venture Studio",
  description:
    "Explore the 18-module curriculum organized across 6 phases — from discovering your idea to pitching it live.",
};

export default function ThemesPage() {
  const available = getAvailableModules();

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="section-dark section-padding pt-32 sm:pt-40">
        <div className="content-max">
          <p className="caption text-cnib-yellow mb-4">The curriculum</p>
          <h1 className="hero-heading text-white mb-6">
            6 phases.
            <br />
            <span className="text-cnib-yellow">18 modules.</span>
          </h1>
          <p className="body-large text-white/50 max-w-2xl">
            Each phase builds on the last. Each module gives you something
            concrete — a tool, a framework, a deliverable. By the end,
            you&rsquo;ll have everything you need to pitch your business.
          </p>
        </div>
      </section>

      {/* ── Phase Sections ────────────────────────────────── */}
      {phases.map((phase) => {
        const phaseModules = getModulesByPhase(phase.id);
        const isDark = phase.number % 2 === 0;

        return (
          <section
            key={phase.id}
            id={phase.id}
            className={`section-padding ${isDark ? "section-dark" : "bg-white"}`}
          >
            <div className="content-max">
              {/* Phase Header */}
              <div className="flex items-start gap-6 mb-12">
                <span
                  className={`text-5xl sm:text-6xl font-bold font-mono ${
                    isDark ? "text-cnib-yellow" : "text-cnib-yellow-dim"
                  }`}
                >
                  {String(phase.number).padStart(2, "0")}
                </span>
                <div>
                  <h2
                    className={`text-3xl sm:text-4xl font-bold mb-2 ${
                      isDark ? "text-white" : "text-cnib-black"
                    }`}
                  >
                    {phase.name}
                  </h2>
                  <p
                    className={`text-lg ${
                      isDark ? "text-white/40" : "text-text-secondary"
                    }`}
                  >
                    {phase.tagline}
                  </p>
                </div>
              </div>

              {/* Module Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {phaseModules.map((mod) => {
                  const isComingSoon = mod.title === "Coming Soon";

                  if (isComingSoon) {
                    return (
                      <div
                        key={mod.id}
                        className={`rounded-2xl p-8 border ${
                          isDark
                            ? "bg-white/5 border-white/5"
                            : "bg-surface-elevated border-border-light"
                        }`}
                      >
                        <span
                          className={`badge ${isDark ? "badge-dark" : ""} mb-4`}
                        >
                          Coming Soon
                        </span>
                        <p
                          className={`text-sm ${
                            isDark ? "text-white/30" : "text-text-muted"
                          }`}
                        >
                          New module being developed. Check back soon.
                        </p>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={mod.id}
                      href={`/themes/${mod.id}`}
                      className={`group rounded-2xl p-8 border transition-all no-underline ${
                        isDark
                          ? "bg-cnib-dark/50 border-white/5 hover:border-cnib-yellow/30"
                          : "bg-white border-border-light hover:border-cnib-yellow hover:shadow-lg"
                      }`}
                    >
                      <h3
                        className={`text-xl font-bold mb-2 transition-colors ${
                          isDark
                            ? "text-white group-hover:text-cnib-yellow"
                            : "text-cnib-black group-hover:text-cnib-blue"
                        }`}
                      >
                        {mod.title}
                      </h3>
                      <p
                        className={`text-sm mb-4 ${
                          isDark ? "text-white/40" : "text-text-secondary"
                        }`}
                      >
                        {mod.subtitle}
                      </p>
                      <p
                        className={`text-sm leading-relaxed ${
                          isDark ? "text-white/30" : "text-text-muted"
                        }`}
                      >
                        {mod.outcome}
                      </p>

                      {mod.stats && mod.stats.length > 0 && (
                        <div className="flex gap-6 mt-6 pt-6 border-t border-white/5">
                          {mod.stats.slice(0, 2).map((stat) => (
                            <div key={stat.label}>
                              <p
                                className={`text-lg font-bold ${
                                  isDark ? "text-cnib-yellow" : "text-cnib-black"
                                }`}
                              >
                                {stat.value}
                              </p>
                              <p
                                className={`text-xs ${
                                  isDark ? "text-white/30" : "text-text-muted"
                                }`}
                              >
                                {stat.label}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="section-yellow section-padding">
        <div className="content-narrow text-center">
          <h2 className="section-heading text-cnib-black mb-6">
            Ready to start?
          </h2>
          <p className="body-large text-cnib-black/60 mb-10">
            Grab the worksheets, listen to the podcasts, and follow along at
            your own pace.
          </p>
          <Link href="/toolkit" className="btn-dark">
            Go to the Toolkit
          </Link>
        </div>
      </section>
    </>
  );
}
