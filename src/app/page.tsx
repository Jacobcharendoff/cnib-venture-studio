import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cnib-blue text-white py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-cnib-orange font-semibold text-sm uppercase tracking-widest mb-4">
            CNIB Venture Pool Program
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Turn Your Idea Into
            <br />
            <span className="text-cnib-orange">Your First Dollar</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            A hands-on, 12-week entrepreneurial program exclusively for CNIB
            Venture Pool members ready to build a business that actually works.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/curriculum"
              className="inline-block bg-cnib-orange hover:bg-cnib-orange-light text-white font-semibold px-8 py-3 rounded-lg transition-colors no-underline text-base"
            >
              View the Curriculum
            </Link>
            <Link
              href="/resources"
              className="inline-block bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-lg transition-colors no-underline text-base border border-white/20"
            >
              Browse Resources
            </Link>
          </div>
        </div>
      </section>

      {/* What You'll Walk Away With */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            What You&rsquo;ll Walk Away With
          </h2>
          <p className="text-center text-text-muted max-w-2xl mx-auto mb-12">
            No buzzwords. No fluff. Just real tools, real structure, and
            real-world outcomes.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "\ud83d\udca1",
                title: "A Validated Idea",
                desc: "Know your idea solves a real problem for real people, backed by customer conversations.",
              },
              {
                icon: "\ud83d\udee0\ufe0f",
                title: "A Minimum Viable Product",
                desc: "A working version of your product or service that you can test in the real world.",
              },
              {
                icon: "\ud83d\udcb0",
                title: "A Pricing & Revenue Model",
                desc: "A pricing strategy and financial model that makes sense for your business.",
              },
              {
                icon: "\ud83c\udf99\ufe0f",
                title: "A Pitch Deck",
                desc: "A compelling 10-slide investor pitch deck and the confidence to deliver it.",
              },
              {
                icon: "\ud83d\udcde",
                title: "Customer Outreach Scripts",
                desc: "Real sales scripts and outreach strategies tested with potential customers.",
              },
              {
                icon: "\ud83d\ude80",
                title: "Confidence to Keep Building",
                desc: "The clarity, skills, and momentum to keep going after the studio ends.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-venture-warm border border-border-light rounded-xl p-6"
              >
                <div className="text-3xl mb-3" aria-hidden="true">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "12 Weekly Sessions",
                desc: "Each 90-minute session introduces key business concepts, real-world case studies, and hands-on assignments that build toward your final pitch.",
              },
              {
                step: "02",
                title: "Worksheets & Podcasts",
                desc: "Every week comes with practical worksheets to clarify your thinking, plus podcast episodes that walk through each concept with real examples.",
              },
              {
                step: "03",
                title: "Final Pitch Showcase",
                desc: "The studio ends with a live pitch to a panel of business leaders, with prizes for finalists and a chance to showcase your business to a broader audience.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-cnib-blue text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Your Instructor */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Meet Your Instructor
          </h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Jacob Charendoff is a legally blind entrepreneur who has built
            businesses across industries \u2014 from luxury hospitality in the
            mountains of Peru to boutique eCommerce brands trusted by global
            music retailers, to AI-powered healthtech platforms that personalize
            care.
          </p>
          <p className="text-text-muted leading-relaxed mb-8">
            This studio isn&rsquo;t based on theory. It&rsquo;s based on
            experience \u2014 raw, real, and full of hard-won lessons. Jacob
            didn&rsquo;t start with connections or capital, just curiosity,
            resilience, and a bias for action.
          </p>
          <Link
            href="/about"
            className="inline-block text-cnib-blue font-semibold hover:text-cnib-orange transition-colors no-underline"
          >
            Read more about Jacob &rarr;
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cnib-blue text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Real business. Real skills. Real outcomes.
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Your first sale is waiting \u2014 let&rsquo;s get to work.
          </p>
          <Link
            href="/resources"
            className="inline-block bg-cnib-orange hover:bg-cnib-orange-light text-white font-semibold px-8 py-3 rounded-lg transition-colors no-underline text-base"
          >
            Get Started with Resources
          </Link>
        </div>
      </section>
    </>
  );
}
