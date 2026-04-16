import { resources } from "@/data/curriculum";
import Link from "next/link";

export const metadata = {
  title: "Resources | Venture Studio \u2014 Powered by CNIB",
  description:
    "Download worksheets, listen to podcasts, and access course materials for the CNIB Venture Studio.",
};

const typeStyles: Record<string, { label: string; bg: string; text: string }> =
  {
    worksheet: {
      label: "Worksheet",
      bg: "bg-blue-100",
      text: "text-blue-800",
    },
    podcast: {
      label: "Podcast",
      bg: "bg-orange-100",
      text: "text-orange-800",
    },
    guide: { label: "Guide", bg: "bg-green-100", text: "text-green-800" },
    template: {
      label: "Template",
      bg: "bg-purple-100",
      text: "text-purple-800",
    },
  };

export default function ResourcesPage() {
  const worksheets = resources.filter(
    (r) => r.type === "worksheet" || r.type === "guide" || r.type === "template"
  );

  return (
    <>
      {/* Header */}
      <section className="bg-cnib-blue text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Course Resources
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Download worksheets, listen to podcasts, and access everything you
            need for the Venture Studio program.
          </p>
        </div>
      </section>

      {/* Worksheets & Guides */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-2">Worksheets & Guides</h2>
          <p className="text-text-muted mb-8">
            Practical materials to help you clarify your thinking and build your
            business step by step.
          </p>

          <div className="space-y-4">
            {worksheets.map((resource) => {
              const style = typeStyles[resource.type];
              return (
                <div
                  key={resource.id}
                  className="bg-white border border-border-light rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}
                      >
                        {style.label}
                      </span>
                      {resource.relatedWeek && (
                        <span className="text-xs text-text-muted">
                          Week {resource.relatedWeek}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-semibold mb-1">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {resource.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    {resource.downloadUrl ? (
                      <a
                        href={resource.downloadUrl}
                        download
                        className="inline-flex items-center gap-2 bg-cnib-blue hover:bg-cnib-blue-dark text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors no-underline"
                        aria-label={`Download ${resource.title}`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Download
                      </a>
                    ) : (
                      <span className="text-sm text-text-muted italic">
                        Coming soon
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Podcasts Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-2">Podcasts</h2>
            <p className="text-text-muted mb-8">
              Audio walkthroughs of each worksheet, featuring real-world examples
              and practical advice generated with NotebookLM.
            </p>

            <div className="bg-venture-warm border border-border-light rounded-xl p-8 text-center">
              <div className="text-4xl mb-4" aria-hidden="true">
                \ud83c\udf99\ufe0f
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Podcast Episodes Coming Soon
              </h3>
              <p className="text-sm text-text-muted max-w-md mx-auto leading-relaxed">
                We&rsquo;re producing audio walkthroughs for each worksheet
                using NotebookLM. These will be available to listen to directly
                on this page or download for offline listening.
              </p>
            </div>
          </div>

          {/* Admin note \u2014 hidden from users but useful for Jacob */}
          <div className="mt-16 bg-gray-50 border border-border-light rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-2">
              Adding New Resources
            </h2>
            <p className="text-sm text-text-muted leading-relaxed">
              To add new worksheets or podcasts, place PDF files in the{" "}
              <code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs font-mono">
                /public/worksheets/
              </code>{" "}
              directory and audio files in{" "}
              <code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs font-mono">
                /public/podcasts/
              </code>
              , then update the resources array in{" "}
              <code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs font-mono">
                src/data/curriculum.ts
              </code>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
