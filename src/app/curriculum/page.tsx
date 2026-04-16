import { weeks } from "@/data/curriculum";

export const metadata = {
  title: "Curriculum | Venture Studio",
  description: "12-week curriculum covering everything from idea validation to your final pitch showcase.",
};

export default function CurriculumPage() {
  return (
    <>
      <section className="py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-cnib-yellow text-sm font-medium uppercase tracking-widest mb-4 bg-cnib-black inline-block px-3 py-1 rounded-full">12 Weeks</p>
          <h1 className="hero-heading mt-4">Curriculum</h1>
          <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Each 90-minute session introduces key business concepts, real-world case studies, and assignments that build toward your final pitch.
          </p>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-0">
            {weeks.map((week) => (
              <article
                key={week.number}
                className="py-10 border-b border-border-light"
              >
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="text-sm font-mono text-text-secondary tabular-nums">Week {String(week.number).padStart(2, '0')}</span>
                  <h2 className="text-xl font-semibold">{week.title}</h2>
                </div>
                <p className="text-text-secondary leading-relaxed mb-6">{week.outcome}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="bg-cnib-warm rounded-lg p-4">
                    <p className="font-medium text-xs uppercase tracking-wide mb-1.5">Frameworks</p>
                    <p className="text-text-secondary text-sm leading-relaxed">{week.frameworks}</p>
                  </div>
                  <div className="bg-cnib-warm rounded-lg p-4">
                    <p className="font-medium text-xs uppercase tracking-wide mb-1.5">Case Study</p>
                    <p className="text-text-secondary text-sm leading-relaxed">{week.caseStudy}</p>
                  </div>
                  <div className="bg-cnib-warm rounded-lg p-4">
                    <p className="font-medium text-xs uppercase tracking-wide mb-1.5">Assignment</p>
                    <p className="text-text-secondary text-sm leading-relaxed">{week.assignment}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 bg-cnib-black text-white rounded-2xl p-10 text-center">
            <p className="text-cnib-yellow text-sm font-medium uppercase tracking-widest mb-4">Final Event</p>
            <h2 className="text-2xl font-bold mb-4">Pitch Showcase</h2>
            <p className="text-white/60 leading-relaxed max-w-xl mx-auto">
              A Shark Tank-style format. Each entrepreneur presents their business case to a panel of investors, business leaders, and industry professionals. The winning entrepreneur receives a financial investment to help launch their business.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
