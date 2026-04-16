import Link from "next/link";
import type { Metadata } from "next";
import { getAvailableModules } from "@/data/modules";

export const metadata: Metadata = {
  title: "Toolkit | Venture Studio",
  description:
    "Download worksheets, listen to podcasts, and access business tools — all designed for accessibility.",
};

const toolkitResources = [
  {
    id: "elevator-pitch",
    title: "Build Your First Elevator Pitch",
    description:
      "A step-by-step worksheet to help you take your idea and turn it into something simple, clear, and easy to explain in 60–90 seconds.",
    type: "worksheet" as const,
    format: "PDF",
    fileName: "Elevator_Pitch_Worksheet.pdf",
    downloadUrl: "/worksheets/Elevator_Pitch_Worksheet.pdf",
    relatedModule: "entrepreneurial-mindset",
  },
  {
    id: "notebooklm-guide",
    title: "How to Use NotebookLM for Your Pitch",
    description:
      "Organize your thinking, upload strong source material, and generate a podcast-style overview and structured pitch deck using AI.",
    type: "guide" as const,
    format: "PDF",
    fileName: "NotebookLM_Student_Worksheet.pdf",
    downloadUrl: "/worksheets/NotebookLM_Student_Worksheet.pdf",
    relatedModule: "pitch-development",
  },
  {
    id: "homework-guide",
    title: "Course Homework & Task Guide",
    description:
      "Complete weekly homework guide with actionable assignments for each module. Each task takes no more than 60 minutes.",
    type: "guide" as const,
    format: "PDF",
    fileName: "Homework_Task_Guide.pdf",
    downloadUrl: "/worksheets/Homework_Task_Guide.pdf",
  },
];

const typeLabels: Record<string, string> = {
  worksheet: "Worksheet",
  guide: "Guide",
  template: "Template",
  podcast: "Podcast",
};

export default function ToolkitPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
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
          <div className="flex items-center gap-3 mb-6">
            <span className="glow-dot" aria-hidden="true" />
            <p className="caption text-cnib-yellow">Your toolkit</p>
          </div>
          <h1 className="hero-heading text-white mb-8">
            Everything you need.
            <br />
            <span className="text-cnib-yellow">All in one place.</span>
          </h1>
          <p className="body-large max-w-2xl" style={{ color: "var(--text-on-dark-muted)" }}>
            Worksheets, guides, podcasts, and interactive tools — all designed
            for accessibility. Download what you need. Build at your own pace.
          </p>
        </div>
      </section>

      {/* ── Worksheets & Guides ───────────────────────────────── */}
      <section className="section-padding bg-white" aria-label="Downloadable resources">
        <div className="content-max">
          <div className="mb-16">
            <p className="caption text-cnib-yellow-dim mb-3">Downloads</p>
            <h2 className="section-heading text-cnib-black">
              Worksheets &amp; Guides
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolkitResources.map((resource) => (
              <div
                key={resource.id}
                className="premium-card flex flex-col"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="badge">{typeLabels[resource.type]}</span>
                  <span className="text-xs text-text-muted font-medium">{resource.format}</span>
                </div>
                <h3 className="text-lg font-bold text-cnib-black mb-3">
                  {resource.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-1">
                  {resource.description}
                </p>
                <div className="flex items-center gap-4">
                  <a
                    href={resource.downloadUrl}
                    download={resource.fileName}
                    className="btn-primary text-sm py-2.5 px-6"
                    aria-label={`Download ${resource.title}`}
                  >
                    Download
                  </a>
                  {resource.relatedModule && (
                    <Link
                      href={`/themes/${resource.relatedModule}`}
                      className="text-sm text-cnib-blue hover:text-cnib-black no-underline transition-colors font-medium"
                    >
                      View module &rarr;
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Podcasts ──────────────────────────────────────────── */}
      <section className="mesh-gradient-dark section-padding relative overflow-hidden" aria-label="Podcast episodes">
        <div className="content-max relative z-10">
          <div className="mb-16">
            <p className="caption text-cnib-yellow mb-3">Listen &amp; learn</p>
            <h2 className="section-heading text-white">Podcasts</h2>
          </div>

          <div className="glass-card text-center py-16 px-8" style={{ cursor: "default" }}>
            <span className="text-5xl mb-6 block" aria-hidden="true">🎙️</span>
            <h3 className="text-xl font-bold text-white mb-4">Coming Soon</h3>
            <p className="max-w-md mx-auto" style={{ color: "var(--text-on-dark-muted)" }}>
              Podcast episodes walking through each module are in production.
              They&rsquo;ll appear here as they&rsquo;re released — designed to
              complement the live sessions and worksheets.
            </p>
          </div>
        </div>
      </section>

      {/* ── Interactive Tools Preview ─────────────────────────── */}
      <section className="section-warm section-padding" aria-label="Interactive tools">
        <div className="content-max">
          <div className="mb-16">
            <p className="caption text-cnib-yellow-dim mb-3">Build</p>
            <h2 className="section-heading text-cnib-black">
              Interactive Tools
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getAvailableModules()
              .filter((m) => m.interactiveElement)
              .slice(0, 6)
              .map((mod) => (
                <Link
                  key={mod.id}
                  href={`/themes/${mod.id}`}
                  className="premium-card no-underline group"
                >
                  <span className="badge mb-4">
                    {mod.interactiveElement!.type}
                  </span>
                  <h3 className="text-lg font-bold text-cnib-black mb-3 group-hover:text-cnib-blue transition-colors">
                    {mod.interactiveElement!.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {mod.interactiveElement!.description}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* ── Accessibility Note ────────────────────────────────── */}
      <section className="bg-white section-padding-sm" aria-label="Accessibility statement">
        <div className="content-narrow text-center">
          <hr className="divider-gradient mb-12" />
          <h2 className="text-2xl font-bold text-cnib-black mb-5">
            Accessibility First
          </h2>
          <p className="text-text-secondary body-large">
            Every worksheet is available in accessible .docx format — designed
            to work with JAWS, NVDA, VoiceOver, and other screen readers.
            Podcasts provide an audio-first learning path. Interactive tools
            are fully keyboard navigable.
          </p>
        </div>
      </section>
    </>
  );
}
