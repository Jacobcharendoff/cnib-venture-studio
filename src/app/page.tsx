import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero — Apple-style, big type, tons of whitespace */}
      <section className="bg-cnib-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-40 text-center">
          <h1 className="hero-heading">
            Turn your idea into
            <br />
            <span className="text-cnib-yellow">your first dollar.</span>
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            A 12-week entrepreneurial program exclusively for CNIB Venture Pool members.
          </p>
        </div>
      </section>

      {/* Intro text — editorial, minimal */}
      <section className="py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-heading text-center">
            Real tools. Real structure.
            <br />
            <span className="text-text-secondary">Real outcomes.</span>
          </p>
          <p className="mt-8 text-center text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
            Whether you&rsquo;re selling a product, a service, or something still forming, 
            this studio will help you test your idea, build your first offer, and make your first sale.
          </p>
        </div>
      </section>

      {/* What you walk away with — clean grid */}
      <section className="bg-cnib-warm py-24 sm:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading text-center mb-16">
            What you&rsquo;ll walk away with
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "A Validated Idea", desc: "Know your idea solves a real problem for real people, backed by customer conversations." },
              { title: "A Minimum Viable Product", desc: "A working version of your product or service that you can test in the real world." },
              { title: "A Revenue Model", desc: "A pricing strategy and financial model that makes sense for your business." },
              { title: "A Pitch Deck", desc: "A compelling 10-slide investor pitch deck and the confidence to deliver it." },
              { title: "Sales Scripts", desc: "Real outreach strategies tested with potential customers." },
              { title: "Momentum", desc: "The clarity, skills, and confidence to keep building after the studio ends." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-8 border border-border-light">
                <h3 className="text-base font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — numbered, simple */}
      <section className="py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading text-center mb-16">
            How it works
          </h2>
          <div className="space-y-12">
            {[
              { step: "01", title: "12 weekly sessions", desc: "Each 90-minute session introduces business concepts, real-world case studies, and hands-on assignments." },
              { step: "02", title: "Worksheets & podcasts", desc: "Practical materials to clarify your thinking, plus audio walkthroughs with real examples." },
              { step: "03", title: "Final pitch showcase", desc: "Present to a panel of business leaders, with prizes for finalists and a chance to launch your business." },
            ].map((item) => (
              <div key={item.step} className="flex gap-8 items-start">
                <span className="flex-shrink-0 text-4xl font-bold text-cnib-yellow/80 tabular-nums">{item.step}</span>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor — editorial bio */}
      <section className="bg-cnib-black text-white py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-cnib-yellow text-sm font-medium uppercase tracking-widest mb-6">Your Instructor</p>
          <h2 className="section-heading mb-8">
            Jacob Charendoff
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-4">
            Legally blind entrepreneur. Businesses across industries &mdash; from luxury hospitality in Peru to AI-powered healthtech platforms.
          </p>
          <p className="text-white/60 text-lg leading-relaxed mb-10">
            This studio isn&rsquo;t based on theory. It&rsquo;s based on a decade of building, failing, and figuring it out.
          </p>
          <Link
            href="/about"
            className="text-cnib-yellow text-sm font-medium hover:text-cnib-yellow-soft transition-colors no-underline"
          >
            Read more &rarr;
          </Link>
        </div>
      </section>

      {/* Bottom CTA — understated */}
      <section className="py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-heading mb-6">
            Your first sale is waiting.
          </h2>
          <p className="text-text-secondary text-lg mb-10">
            Explore the curriculum and start building.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/curriculum"
              className="inline-block bg-cnib-black text-white font-medium px-8 py-3.5 rounded-full transition-colors hover:bg-cnib-dark no-underline text-sm"
            >
              View Curriculum
            </Link>
            <Link
              href="/resources"
              className="inline-block bg-transparent text-cnib-black border border-border-light font-medium px-8 py-3.5 rounded-full transition-colors hover:bg-cnib-warm no-underline text-sm"
            >
              Browse Resources
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
