import Link from "next/link";
import type { Metadata } from "next";
import { phases, getModulesByPhase, getAvailableModules } from "@/data/modules";
import { FadeIn, Stagger, StaggerItem } from "@/components/Animate";
import PhaseIcon from "@/components/PhaseIcon";
import ModuleComplete from "@/components/ModuleComplete";

export const metadata: Metadata = {
  title: "Themes | Venture Studio",
  description:
    "Explore the 18-module curriculum organized across 6 phases \u2014 from discovering your idea to pitching it live.",
};

export default function ThemesPage() {
  const available = getAvailableModules();

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="mesh-gradient-hero relative overflow-hidden section-padding pt-32 sm:pt-40">
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
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-3 mb-6">
              <span className="glow-dot" aria-hidden="true" />
              <p className="caption text-cnib-yellow">The curriculum</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="hero-heading text-white mb-8">
              6 phases.
              <br />
              <span className="text-cnib-yellow">18 modules.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.35}>
            <p className="body-large max-w-2xl" style={{ color: "var(--text-on-dark-muted)" }}>
              Each phase builds on the last. Each module gives you something
              concrete \u2014 a tool, a framework, a deliverable. By the end,
              you&rsquo;ll have everything you need to pitch your business.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Phase Sections ────────────────────────────────── */}
      {phases.map((phase, phaseIndex) => {
        const phaseModules = getModulesByPhase(phase.id);
        const isDark = phaseIndex % 2 === 0;

        return (
          <section
            key={phase.id}
            id={phase.id}
            className={`section-padding relative overflow-hidden ${
              isDark ? "mesh-gradient-dark" : "bg-white"
            }`}
            aria-label={`Phase ${phase.number}: ${phase.name}`}
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
              {/* Phase Header */}
              <FadeIn>
                <div className="flex items-start gap-6 mb-16">
                  <span
                    className="number-accent hidden sm:block"
                    aria-hidden="true"
                    style={!isDark ? { WebkitTextStroke: "1.5px var(--cnib-yellow-dim)", opacity: 0.25 } : undefined}
                  >
                    {String(phase.number).padStart(2, "0")}
                  </span>
                  <div className="pt-2 sm:pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      {isDark && <span className="glow-dot" aria-hidden="true" />}
                      <span className={`eyebrow ${isDark ? "text-cnib-yellow" : "text-cnib-yellow-on-light"}`}>
                        Phase {phase.number}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <PhaseIcon phase={phase.id} size={32} className={isDark ? "text-cnib-yellow" : "text-cnib-yellow-dim"} />
                      <h2
                        className={`text-3xl sm:text-4xl font-bold tracking-tight ${
                          isDark ? "text-white" : "text-cnib-black"
                        }`}
                      >
                        {phase.name}
                      </h2>
                    </div>
                    <p
                      className="text-lg"
                      style={{ color: isDark ? "var(--text-on-dark-muted)" : "var(--text-secondary)" }}
                    >
                      {phase.tagline}
                    </p>
                    <div
                      className="h-0.5 rounded-full mt-4"
                      style={{
                        background: "linear-gradient(90deg, var(--cnib-yellow), transparent)",
                        width: `${((phaseIndex + 1) / phases.length) * 100}%`,
                        opacity: 0.4,
                      }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </FadeIn>

              {/* Module Cards */}
              <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
                {phaseModules.map((mod) => {
                  const isComingSoon = mod.title === "Coming Soon";

                  if (isComingSoon) {
                    return (
                      <StaggerItem key={mod.id}>
                        <div
                          className={`rounded-2xl p-8 border ${
                            isDark
                              ? "bg-white/[0.03] border-white/[0.06]"
                              : "bg-surface-elevated border-border-light"
                          }`}
                        >
                          <span
                            className={`badge ${isDark ? "badge-outline" : ""} mb-4`}
                          >
                            Coming Soon
                          </span>
                          <p
                            className="text-sm"
                            style={{ color: isDark ? "var(--text-on-dark-muted)" : "var(--text-muted)" }}
                          >
                            New module being developed. Check back soon.
                          </p>
                        </div>
                      </StaggerItem>
                    );
                  }

                  return (
                    <StaggerItem key={mod.id}>
                      <Link
                        href={`/themes/${mod.id}`}
                        className={`group no-underline block h-full ${
                          isDark ? "glass-card" : "premium-card"
                        }`}
                      >
                        {/* Completion badge */}
                        <div className="flex items-center justify-between mb-1">
                          <div /> {/* spacer */}
                          <ModuleComplete moduleId={mod.id} />
                        </div>

                        <h3
                          className={`text-xl font-bold mb-3 transition-colors ${
                            isDark
                              ? "text-white group-hover:text-cnib-yellow"
                              : "text-cnib-black group-hover:text-cnib-blue"
                          }`}
                        >
                          {mod.title}
                        </h3>
                        <p
                          className="text-sm mb-4"
                          style={{ color: isDark ? "var(--text-on-dark-muted)" : "var(--text-secondary)" }}
                        >
                          {mod.subtitle}
                        </p>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: isDark ? "var(--text-on-dark-muted)" : "var(--text-muted)" }}
                        >
                          {mod.outcome}
                        </p>

                        {mod.stats && mod.stats.length > 0 && (
                          <div className={`flex gap-6 mt-6 pt-6 border-t ${
                            isDark ? "border-white/[0.06]" : "border-border-light"
                          }`}>
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
                                  className="text-xs"
                                  style={{ color: isDark ? "var(--text-on-dark-muted)" : "var(--text-muted)" }}
                                >
                                  {stat.label}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className={`card-hover-reveal mt-4 pt-4 border-t ${
                          isDark ? "border-white/[0.06]" : "border-border-light"
                        }`}>
                          <span className={`text-sm font-semibold ${isDark ? "text-cnib-yellow" : "text-cnib-blue"}`}>
                            View module <span aria-hidden="true">&rarr;</span>
                          </span>
                        </div>
                      </Link>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </div>
          </section>
        );
      })}

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="section-yellow section-padding-sm">
        <div className="content-narrow text-center">
          <FadeIn>
            <h2 className="section-heading text-cnib-black mb-6">
              Ready to start?
            </h2>
            <p className="body-large text-cnib-black/70 mb-10">
              Grab the worksheets, listen to the podcasts, and follow along at
              your own pace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/toolkit" className="btn-dark">
                Go to the Toolkit
              </Link>
              <Link href="/progress" className="btn-dark" style={{ background: "transparent", border: "2px solid var(--cnib-black)", color: "var(--cnib-black)" }}>
                Track your progress
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
