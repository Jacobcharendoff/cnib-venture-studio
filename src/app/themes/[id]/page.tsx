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
      {/* ── Module Hero ─────────────────────────────────────── */}
      <section className="section-dark section-padding pt-32 sm:pt-40">
        <div className="content-max">
          <div className="mb-8">
            <Link
              href="/themes"
              className="text-white/30 hover:text-cnib-yellow text-sm no-underline transition-colors"
            >
              &larr; All Themes
            </Link>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="badge badge-dark">
              Phase {mod.phase.number}: {mod.phase.name}
            </span>
          </div>

          <h1 className="hero-heading text-white mb-4">{mod.title}</h1>
          <p className="section-subheading text-white/40 mb-8 max-w-2xl">
            {mod.subtitle}
          </p>

          {/* Stats */}
          {mod.stats && mod.stats.length > 0 && (
            <div className="flex flex-wrap gap-10 mt-12 pt-10 border-t border-white/10">
              {mod.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="stat-number text-cnib-yellow">{stat.value}</p>
                  <p className="stat-label text-white/40 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Module Content ────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="content-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-cnib-black mb-6">
                What you&rsquo;ll learn
              </h2>
              <p className="body-large text-text-secondary mb-8">
                {mod.description}
              </p>

              <div className="bg-cnib-warm rounded-2xl p-8 mb-10">
                <h3 className="text-lg font-bold text-cnib-black mb-2">
                  Learning Outcome
                </h3>
                <p className="text-text-secondary">{mod.outcome}</p>
              </div>

              {/* Frameworks */}
              {mod.frameworks.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-lg font-bold text-cnib-black mb-4">
                    Frameworks & Models
                  </h3>
                  <div className="space-y-3">
                    {mod.frameworks.map((fw) => (
                      <div
                        key={fw}
                        className="flex items-start gap-3 text-text-secondary"
                      >
                        <span className="text-cnib-yellow-dim mt-1" aria-hidden="true">
                          &#9656;
                        </span>
                        <span>{fw}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Case Study */}
              <div className="border-l-4 border-cnib-yellow pl-6 mb-10">
                <h3 className="text-lg font-bold text-cnib-black mb-2">
                  Case Study: {mod.caseStudy.company}
                </h3>
                <p className="text-text-secondary">{mod.caseStudy.insight}</p>
              </div>

              {/* Assignment */}
              <div className="bg-cnib-black rounded-2xl p-8">
                <p className="caption text-cnib-yellow mb-3">Your assignment</p>
                <p className="text-white text-lg">{mod.assignment}</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Interactive Tool */}
              {mod.interactiveElement && (
                <div className="bg-surface-elevated rounded-2xl p-8 mb-8">
                  <span className="badge mb-4">
                    {mod.interactiveElement.type}
                  </span>
                  <h3 className="text-lg font-bold text-cnib-black mb-2">
                    {mod.interactiveElement.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-6">
                    {mod.interactiveElement.description}
                  </p>
                  <span className="text-sm text-text-muted italic">
                    Interactive tool coming soon
                  </span>
                </div>
              )}

              {/* Phase Navigation */}
              <div className="rounded-2xl border border-border-light p-8">
                <h3 className="text-sm font-bold text-text-muted uppercase tracking-widest mb-4">
                  Phase {mod.phase.number}: {mod.phase.name}
                </h3>
                <div className="space-y-2">
                  {phaseModules.map((pm) => (
                    <Link
                      key={pm.id}
                      href={`/themes/${pm.id}`}
                      className={`block px-4 py-3 rounded-lg text-sm no-underline transition-colors ${
                        pm.id === mod.id
                          ? "bg-cnib-yellow/10 text-cnib-black font-bold"
                          : "text-text-secondary hover:bg-surface-elevated hover:text-cnib-black"
                      }`}
                    >
                      {pm.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Prev / Next Navigation ──────────────────────── */}
      <section className="bg-cnib-warm py-10">
        <div className="content-max flex flex-col sm:flex-row justify-between gap-6">
          {prevModule ? (
            <Link
              href={`/themes/${prevModule.id}`}
              className="text-cnib-black no-underline hover:text-cnib-blue transition-colors"
            >
              <span className="text-xs text-text-muted uppercase tracking-widest">
                Previous
              </span>
              <p className="text-lg font-bold">&larr; {prevModule.title}</p>
            </Link>
          ) : (
            <div />
          )}
          {nextModule ? (
            <Link
              href={`/themes/${nextModule.id}`}
              className="text-cnib-black no-underline hover:text-cnib-blue transition-colors text-right"
            >
              <span className="text-xs text-text-muted uppercase tracking-widest">
                Next
              </span>
              <p className="text-lg font-bold">{nextModule.title} &rarr;</p>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
    </>
  );
}
