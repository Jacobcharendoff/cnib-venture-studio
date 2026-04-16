import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Venture Studio",
  description:
    "Meet Jacob Charendoff — legally blind entrepreneur, builder, and your Venture Studio instructor.",
};

const highlights = [
  { value: "10+", label: "Years building businesses" },
  { value: "7-figure", label: "Exits across industries" },
  { value: "3", label: "Continents worked across" },
  { value: "1", label: "Shared community" },
];

const experiences = [
  "Luxury hospitality — mountains of Peru",
  "Boutique eCommerce — trusted by global music retailers",
  "AI-powered healthtech — personalized care platforms",
  "Remote team leadership across North and South America",
  "Bootstrapped ventures with global distribution",
  "Proud CNIB community member",
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="section-dark section-padding pt-32 sm:pt-40">
        <div className="content-max">
          <p className="caption text-cnib-yellow mb-4">Your instructor</p>
          <h1 className="hero-heading text-white mb-6">
            Jacob Charendoff
          </h1>
          <p className="body-large text-white/50 max-w-2xl">
            A legally blind entrepreneur who didn&rsquo;t start with connections
            or capital — just curiosity, resilience, and a bias for action.
          </p>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────── */}
      <section className="section-yellow py-10 sm:py-14">
        <div className="content-max">
          <div className="stat-grid text-center">
            {highlights.map((h) => (
              <div key={h.label}>
                <p className="stat-number text-cnib-black">{h.value}</p>
                <p className="stat-label text-cnib-black/60">{h.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story ─────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="content-narrow">
          <h2 className="section-heading text-cnib-black mb-8">
            Turning adversity into opportunity
          </h2>
          <div className="space-y-6 body-large text-text-secondary">
            <p>
              Jacob has built businesses across industries — from luxury
              hospitality in the mountains of Peru to boutique eCommerce brands
              trusted by global music retailers, to AI-powered healthtech
              platforms that personalize care.
            </p>
            <p>
              His journey is raw, real, and full of hard-won lessons. Over the
              past decade, he&rsquo;s taken impossible ideas and turned them into
              revenue-generating ventures with global reach and seven-figure
              exits.
            </p>
            <p>
              Along the way, he&rsquo;s led remote teams, built from the ground
              up, and learned how to create clarity in chaos. His unique
              perspective — shaped by a lifelong visual impairment — has allowed
              him to think differently, innovate beyond limitations, and inspire
              others to take bold action.
            </p>
          </div>
        </div>
      </section>

      {/* ── Why This Program ──────────────────────────────── */}
      <section className="section-warm section-padding">
        <div className="content-narrow">
          <h2 className="section-heading text-cnib-black mb-8">
            Why this program exists
          </h2>
          <div className="space-y-6 body-large text-text-secondary">
            <p>
              This studio isn&rsquo;t based on theory. It&rsquo;s based on
              experience — and it&rsquo;s built to help you do the same.
            </p>
            <p>
              Jacob&rsquo;s expertise spans business strategy, startup launches
              and exits, operational innovation, and team development. As your
              instructor, he brings practical, hands-on insights rooted in
              real-world experience.
            </p>
            <p>
              Through this program, Jacob demonstrates how resilience,
              creativity, and vision can be leveraged to turn ideas into
              successful ventures. His story is a blueprint for entrepreneurs
              looking to break barriers, redefine success, and build thriving
              businesses in any industry.
            </p>
          </div>
        </div>
      </section>

      {/* ── Experience Grid ───────────────────────────────── */}
      <section className="section-dark section-padding">
        <div className="content-max">
          <p className="caption text-cnib-yellow mb-4">Experience</p>
          <h2 className="section-heading text-white mb-12">
            Where Jacob has built
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {experiences.map((item) => (
              <div
                key={item}
                className="bg-cnib-dark/50 border border-white/5 rounded-xl px-6 py-5 flex items-start gap-3"
              >
                <span className="text-cnib-yellow mt-0.5" aria-hidden="true">
                  &#9656;
                </span>
                <span className="text-white/70 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CNIB Community ────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="content-narrow">
          <h2 className="section-heading text-cnib-black mb-8">
            A unique opportunity for the CNIB community
          </h2>
          <div className="space-y-6 body-large text-text-secondary">
            <p>
              This program is more than a structured course — it&rsquo;s a
              unique opportunity for CNIB entrepreneurs to learn from another
              CNIB community member who has successfully built businesses.
            </p>
            <p>
              By combining proven frameworks, hands-on assignments, and
              real-world case studies, participants develop a business and gain
              the confidence to turn their vision into reality. With a strong
              emphasis on practical execution and peer learning, this program
              provides a collaborative environment where CNIB entrepreneurs can
              develop, refine, and launch their businesses.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="section-yellow section-padding">
        <div className="content-narrow text-center">
          <h2 className="section-heading text-cnib-black mb-6">
            Ready to build?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/themes" className="btn-dark">
              Explore the curriculum
            </Link>
            <Link
              href="/toolkit"
              className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border-2 border-cnib-black text-cnib-black font-bold rounded-full no-underline hover:bg-cnib-black hover:text-cnib-yellow transition-colors"
            >
              Get the toolkit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
