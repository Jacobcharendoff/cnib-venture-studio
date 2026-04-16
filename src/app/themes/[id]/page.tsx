import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { modules, getModuleById, getModulesByPhase } from "@/data/modules";

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
    <>
      {/* ── Module Hero ───────────────────────────────────────── */}
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
          <div className="mb-8">
            <Link
              href="/themes"
              className="inline-flex items-center gap-2 text-sm no-underline transition-colors"
              style={{ color: "var(--text-on-dark-muted)" }}
            >
              <span aria-hidden="true">&larr;</span> All Themes
            </Link>
          </div>

          <div className="flex items-center gap-3 mb-8">
            <span className="glow-dot" aria-hidden="true" />
            <span className="badge badge-outline">
              Phase {mod.phase.number}: {mod.phase.name}
            </span>
          </div>

          <h1 className="hero-heading text-white mb-6">{mod.title}</h1>
          <p className="section-subheading max-w-2xl mb-10" style={{ color: "var(--text-on-dark-muted)" }}>
            {mod.subtitle}
          </p>

          {/* Stats */}
          {mod.stats && mod.stats.length > 0 && (
            <div className="flex flex-wrap gap-10 mt-12 pt-10 border-t border-white/10">
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

      {/* ── Module Content ────────────────────────────────────── */}
      <section className="section-padding bg-white" aria-label="Module content">
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
                        <span className="text-cnib-yellow-dim mt-1.5 shrink-0" aria-hidden="true">
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

              {/* Assignment */}
              <div className="mesh-gradient-dark rounded-2xl p-8 relative overflow-hidden">
                <p className="caption text-cnib-yellow mb-4">Your assignment</p>
                <p className="text-lg font-medium" style={{ color: "var(--text-on-dark)" }}>
                  {mod.assignment}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
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
                              : "text-text-secondary hover:bg-surface-elevated hover:text-cnib-black"
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
            </div>
          </div>
        </div>
      </section>

      {/* ── Prev / Next Navigation ────────────────────────────── */}
      <section className="bg-cnib-warm py-10 border-t border-border-light" aria-label="Module navigation">
        <div className="content-max flex flex-col sm:flex-row justify-between gap-6">
          {prevModule ? (
            <Link
              href={`/themes/${prevModule.id}`}
              className="text-cnib-black no-underline hover:text-cnib-blue transition-colors group"
            >
              <span className="eyebrow text-text-muted">
                Previous
              </span>
              <p className="text-lg font-bold mt-1 group-hover:translate-x-[-4px] transition-transform">
                &larr; {prevModule.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {nextModule ? (
            <Link
              href={`/themes/${nextModule.id}`}
              className="text-cnib-black no-underline hover:text-cnib-blue transition-colors text-right group"
            >
              <span className="eyebrow text-text-muted">
                Next
              </span>
              <p className="text-lg font-bold mt-1 group-hover:translate-x-1 transition-transform">
                {nextModule.title} &rarr;
              </p>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
    </>
  );
}
