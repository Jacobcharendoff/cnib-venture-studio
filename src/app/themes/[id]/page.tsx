import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { modules, getModuleById, getModulesByPhase } from "@/data/modules";
import CompletionToggle from "@/components/CompletionToggle";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return modules
    .filter((m) => m.title !== "Coming Soon")
    .map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const mod = getModuleById(id);
  if (!mod) return { title: "Module Not Found" };
  return {
    title: `${mod.title} | Venture Studio`,
    description: mod.outcome,
  };
}

// WCAG AA compliant: all label text ≥ 4.5:1 contrast against card background
const exampleLabels = {
  bad: { text: "What doesn\u2019t work", color: "#991B1B", accent: "#EF4444", bg: "#FEF2F2", border: "#FECACA" },
  good: { text: "Getting warmer", color: "#92400E", accent: "#F59E0B", bg: "#FFFBEB", border: "#FDE68A" },
  great: { text: "This is the standard", color: "#166534", accent: "#22C55E", bg: "#F0FDF4", border: "#BBF7D0" },
};

export default async function ModulePage({ params }: PageProps) {
  const { id } = await params;
  const mod = getModuleById(id);

  if (!mod || mod.title === "Coming Soon") {
    notFound();
  }

  const phaseModules = getModulesByPhase(mod.phase.id).filter(
    (m) => m.title !== "Coming Soon"
  );
  const currentIndex = modules.findIndex((m) => m.id === id);
  const moduleNumber = modules.filter((m) => m.title !== "Coming Soon").findIndex((m) => m.id === id) + 1;
  const totalModules = modules.filter((m) => m.title !== "Coming Soon").length;
  const prevModule =
    currentIndex > 0
      ? modules
          .slice(0, currentIndex)
          .reverse()
          .find((m) => m.title !== "Coming Soon")
      : null;
  const nextModule =
    currentIndex < modules.length - 1
      ? modules
          .slice(currentIndex + 1)
          .find((m) => m.title !== "Coming Soon")
      : null;

  return (
    <article aria-label={`Module ${moduleNumber}: ${mod.title}`}>
      {/* ── Module Hero ─────────────────────────────────────── */}
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
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm" style={{ color: "var(--text-on-dark-muted)" }}>
              <li>
                <Link href="/themes" className="no-underline transition-colors hover:text-white focus-visible:text-white" style={{ color: "var(--text-on-dark-muted)" }}>
                  All Themes
                </Link>
              </li>
              <li aria-hidden="true" className="select-none">/</li>
              <li>
                <Link href="/themes" className="no-underline transition-colors hover:text-white focus-visible:text-white" style={{ color: "var(--text-on-dark-muted)" }}>
                  Phase {mod.phase.number}: {mod.phase.name}
                </Link>
              </li>
              <li aria-hidden="true" className="select-none">/</li>
              <li aria-current="page" className="text-white font-medium truncate max-w-[200px]">
                {mod.title}
              </li>
            </ol>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <span className="glow-dot" aria-hidden="true" />
            <span className="badge badge-outline">
              Module {moduleNumber} of {totalModules} &middot; Phase {mod.phase.number}: {mod.phase.name}
            </span>
          </div>

          {/* Progress bar */}
          <div className="mb-8" role="progressbar" aria-valuenow={moduleNumber} aria-valuemin={1} aria-valuemax={totalModules} aria-label={`Module ${moduleNumber} of ${totalModules}`}>
            <div className="w-full max-w-xs h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
              <div className="h-full rounded-full bg-cnib-yellow transition-all" style={{ width: `${(moduleNumber / totalModules) * 100}%` }} />
            </div>
          </div>

          <h1 className="hero-heading text-white mb-6">{mod.title}</h1>
          <p className="section-subheading max-w-2xl mb-10" style={{ color: "var(--text-on-dark-muted)" }}>
            {mod.subtitle}
          </p>

          {/* Stats */}
          {mod.stats && mod.stats.length > 0 && (
            <div className="flex flex-wrap gap-10 mt-12 pt-10 border-t border-white/10" role="group" aria-label="Module statistics">
              {mod.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="stat-number text-cnib-yellow" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                    {stat.value}
                  </p>
                  <p className="stat-label mt-2" style={{ color: "var(--text-on-dark-muted)" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── What You'll Learn ─────────────────────────────── */}
      <section className="section-padding bg-white" aria-label="What you will learn">
        <div className="content-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-cnib-black mb-6">
                What you&rsquo;ll learn
              </h2>
              <p className="body-large text-text-secondary mb-10">
                {mod.description}
              </p>

              <div className="bg-cnib-warm rounded-2xl p-8 mb-12 border border-border-light">
                <h3 className="text-lg font-bold text-cnib-black mb-3">
                  Learning Outcome
                </h3>
                <p className="text-text-secondary leading-relaxed">{mod.outcome}</p>
              </div>

              {/* Frameworks */}
              {mod.frameworks.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-lg font-bold text-cnib-black mb-5">
                    Frameworks &amp; Models
                  </h3>
                  <ul className="space-y-3" role="list">
                    {mod.frameworks.map((fw) => (
                      <li
                        key={fw}
                        className="flex items-start gap-3 text-text-secondary"
                      >
                        <span className="text-cnib-yellow-on-light mt-1.5 shrink-0" aria-hidden="true">
                          &#9656;
                        </span>
                        <span>{fw}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Case Study */}
              <div className="relative pl-6 mb-12">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-cnib-yellow rounded-full" aria-hidden="true" />
                <h3 className="text-lg font-bold text-cnib-black mb-3">
                  Case Study: {mod.caseStudy.company}
                </h3>
                <p className="text-text-secondary leading-relaxed">{mod.caseStudy.insight}</p>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1" aria-label="Module tools and navigation">
              {/* Interactive Tool */}
              {mod.interactiveElement && (
                <div className="premium-card mb-8">
                  <span className="badge mb-4">
                    {mod.interactiveElement.type}
                  </span>
                  <h3 className="text-lg font-bold text-cnib-black mb-3">
                    {mod.interactiveElement.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                    {mod.interactiveElement.description}
                  </p>
                  <span className="text-sm text-text-muted italic">
                    Interactive tool coming soon
                  </span>
                </div>
              )}

              {/* Phase Navigation */}
              <div className="rounded-2xl border border-border-light p-8">
                <h3 className="eyebrow text-text-muted mb-5">
                  Phase {mod.phase.number}: {mod.phase.name}
                </h3>
                <nav aria-label="Modules in this phase">
                  <ul className="space-y-1" role="list">
                    {phaseModules.map((pm) => (
                      <li key={pm.id}>
                        <Link
                          href={`/themes/${pm.id}`}
                          className={`block px-4 py-3 rounded-lg text-sm no-underline transition-colors ${
                            pm.id === mod.id
                              ? "bg-cnib-yellow/10 text-cnib-black font-bold"
                              : "text-text-secondary hover:bg-surface-elevated hover:text-cnib-black focus-visible:bg-surface-elevated focus-visible:text-cnib-black"
                          }`}
                          aria-current={pm.id === mod.id ? "page" : undefined}
                        >
                          {pm.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Real-World Examples (Bad / Good / Great) ────────── */}
      {mod.realWorldExamples && mod.realWorldExamples.length > 0 && (
        <section className="section-warm section-padding" aria-label="Real-world examples">
          <div className="content-max">
            <div className="text-center mb-16">
              <p className="caption text-cnib-yellow-on-light mb-4">See the difference</p>
              <h2 className="section-heading text-cnib-black">
                What does this look like in practice?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mod.realWorldExamples.map((example) => {
                const style = exampleLabels[example.label];
                return (
                  <div
                    key={example.label}
                    className="rounded-2xl p-8 relative overflow-hidden"
                    style={{
                      background: style.bg,
                      border: `1px solid ${style.border}`,
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-[3px]"
                      style={{ background: style.accent }}
                      aria-hidden="true"
                    />
                    <span
                      className="inline-block text-xs font-bold tracking-widest uppercase mb-5 px-3 py-1.5 rounded-full"
                      style={{ color: style.color, background: `${style.accent}18` }}
                    >
                      {style.text}
                    </span>
                    <h3 className="text-base font-bold text-cnib-black mb-4 leading-snug">
                      {example.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {example.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Key Takeaway ────────────────────────────────── */}
      {mod.keyTakeaway && (
        <section className="bg-white section-padding-sm" aria-label="Key takeaway">
          <div className="content-narrow text-center">
            <div className="relative inline-block">
              <div className="absolute -left-6 -top-4 text-6xl font-bold text-cnib-yellow/20 select-none" aria-hidden="true">
                &ldquo;
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-cnib-black leading-snug tracking-tight">
                {mod.keyTakeaway}
              </p>
              <div className="absolute -right-4 -bottom-6 text-6xl font-bold text-cnib-yellow/20 select-none" aria-hidden="true">
                &rdquo;
              </div>
            </div>
            <p className="eyebrow text-text-muted mt-8">Key takeaway</p>
          </div>
        </section>
      )}

      {/* ── Assignment ──────────────────────────────────── */}
      <section className="mesh-gradient-dark section-padding-sm relative overflow-hidden" aria-label="Your assignment">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
          aria-hidden="true"
        />
        <div className="content-narrow relative z-10">
          <div className="glass-card text-center" style={{ cursor: "default" }}>
            <p className="caption text-cnib-yellow mb-6">Your assignment</p>
            <p className="text-lg sm:text-xl font-medium leading-relaxed" style={{ color: "var(--text-on-dark)" }}>
              {mod.assignment}
            </p>
          </div>

          {/* Completion toggle */}
          <div className="mt-10">
            <CompletionToggle
              moduleId={mod.id}
              moduleTitle={mod.title}
              nextModuleId={nextModule?.id}
              nextModuleTitle={nextModule?.title}
            />
          </div>
        </div>
      </section>

      {/* ── Prev / Next Navigation ──────────────────────── */}
      <nav className="bg-cnib-warm py-10 border-t border-border-light" aria-label="Module navigation">
        <div className="content-max flex flex-col sm:flex-row justify-between gap-6">
          {prevModule ? (
            <Link
              href={`/themes/${prevModule.id}`}
              className="text-cnib-black no-underline hover:text-cnib-blue focus-visible:text-cnib-blue transition-colors group"
            >
              <span className="eyebrow text-text-muted">
                Previous
              </span>
              <p className="text-lg font-bold mt-1 group-hover:translate-x-[-4px] transition-transform">
                <span aria-hidden="true">&larr;</span> {prevModule.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {nextModule ? (
            <Link
              href={`/themes/${nextModule.id}`}
              className="text-cnib-black no-underline hover:text-cnib-blue focus-visible:text-cnib-blue transition-colors text-right group"
            >
              <span className="eyebrow text-text-muted">
                Next
              </span>
              <p className="text-lg font-bold mt-1 group-hover:translate-x-1 transition-transform">
                {nextModule.title} <span aria-hidden="true">&rarr;</span>
              </p>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </nav>
    </article>
  );
}
