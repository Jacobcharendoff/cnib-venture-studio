import { weeks } from "@/data/curriculum";

export const metadata = {
  title: "Curriculum | Venture Studio \u2014 Powered by CNIB",
  description:
    "12-week curriculum covering everything from idea validation to your final pitch showcase.",
};

export default function CurriculumPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-cnib-blue text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">
            12-Week Curriculum
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Each 90-minute weekly session introduces key business concepts,
            real-world case studies, and hands-on assignments that build toward
            your final pitch.
          </p>
        </div>
      </section>

      {/* Week Cards */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {weeks.map((week) => (
              <article
                key={week.number}
                className="bg-white border border-border-light rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-cnib-blue text-white rounded-xl flex flex-col items-center justify-center">
                    <span className="text-[10px] uppercase font-medium leading-none">
                      Week
                    </span>
                    <span className="text-lg font-bold leading-none mt-0.5">
                      {week.number}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl font-semibold mb-2">
                      {week.title}
                    </h2>
                    <p className="text-text-muted text-sm leading-relaxed mb-4">
                      {week.outcome}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                      <div className="bg-venture-warm rounded-lg p-3">
                        <p className="font-medium text-cnib-blue text-xs uppercase tracking-wide mb-1">
                          Frameworks
                        </p>
                        <p className="text-text-muted text-xs leading-relaxed">
                          {week.frameworks}
                        </p>
                      </div>
                      <div className="bg-venture-warm rounded-lg p-3">
                        <p className="font-medium text-cnib-blue text-xs uppercase tracking-wide mb-1">
                          Case Study
                        </p>
                        <p className="text-text-muted text-xs leading-relaxed">
                          {week.caseStudy}
                        </p>
                      </div>
                      <div className="bg-venture-warm rounded-lg p-3">
                        <p className="font-medium text-cnib-blue text-xs uppercase tracking-wide mb-1">
                          Assignment
                        </p>
                        <p className="text-text-muted text-xs leading-relaxed">
                          {week.assignment}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pitch Week */}
          <div className="mt-10 bg-cnib-blue text-white rounded-xl p-6 sm:p-8">
            <h2 className="text-xl font-bold mb-3">
              \ud83c\udfaf Final Pitch Showcase
            </h2>
            <p className="text-white/80 leading-relaxed mb-4">
              The final Pitch Showcase operates like a Shark Tank-style format.
              Each entrepreneur gets 5 minutes to present their business case,
              followed by 5 minutes of Q&A with a panel of seasoned investors,
              business leaders, and industry professionals.
            </p>
            <p className="text-white/80 leading-relaxed">
              The winning entrepreneur receives a financial investment to help
              launch their business, with runners-up receiving mentorship and
              networking opportunities.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
