import { resources } from "@/data/curriculum";

export const metadata = {
  title: "Resources | Venture Studio",
  description: "Download worksheets, listen to podcasts, and access course materials.",
};

const typeStyles: Record<string, { label: string; bg: string; text: string }> = {
  worksheet: { label: "Worksheet", bg: "bg-cnib-yellow/20", text: "text-cnib-black" },
  podcast: { label: "Podcast", bg: "bg-cnib-black", text: "text-white" },
  guide: { label: "Guide", bg: "bg-cnib-warm", text: "text-cnib-black" },
  template: { label: "Template", bg: "bg-cnib-warm", text: "text-cnib-black" },
};

export default function ResourcesPage() {
  const worksheets = resources.filter(
    (r) => r.type === "worksheet" || r.type === "guide" || r.type === "template"
  );

  return (
    <>
      <section className="py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="hero-heading">Resources</h1>
          <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Worksheets, guides, and audio walkthroughs to support your journey through the Venture Studio.
          </p>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Worksheets & Guides</h2>

          <div className="space-y-0">
            {worksheets.map((resource) => {
              const style = typeStyles[resource.type];
              return (
                <div
                  key={resource.id}
                  className="py-8 border-b border-border-light flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${style.bg} ${style.text}`}>
                        {style.label}
                      </span>
                      {resource.relatedWeek && (
                        <span className="text-xs text-text-secondary font-mono">Week {String(resource.relatedWeek).padStart(2, '0')}</span>
                      )}
                    </div>
                    <h3 className="text-base font-semibold mb-1">{resource.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{resource.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {resource.downloadUrl ? (
                      <a
                        href={resource.downloadUrl}
                        download
                        className="inline-flex items-center gap-2 bg-cnib-black hover:bg-cnib-dark text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors no-underline"
                        aria-label={`Download ${resource.title}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download
                      </a>
                    ) : (
                      <span className="text-sm text-text-secondary">Coming soon</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-8">Podcasts</h2>
            <div className="bg-cnib-warm border border-border-light rounded-2xl p-10 text-center">
              <h3 className="text-lg font-semibold mb-3">Coming Soon</h3>
              <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
                Audio walkthroughs for each worksheet, generated with NotebookLM. Listen directly on this page or download for offline listening.
              </p>
            </div>
          </div>

          <div className="mt-20 bg-cnib-warm rounded-2xl p-8">
            <h2 className="text-base font-semibold mb-2">Adding New Resources</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Place PDF files in <code className="bg-white px-1.5 py-0.5 rounded text-xs font-mono">/public/worksheets/</code> and audio files in <code className="bg-white px-1.5 py-0.5 rounded text-xs font-mono">/public/podcasts/</code>, then update the resources array in <code className="bg-white px-1.5 py-0.5 rounded text-xs font-mono">src/data/curriculum.ts</code>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
