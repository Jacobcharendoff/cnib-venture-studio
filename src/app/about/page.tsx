import Link from "next/link";
import type { Metadata } from "next";
import { FadeIn, Stagger, StaggerItem } from "@/components/Animate";

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
            <p className="caption text-cnib-yellow">Your instructor</p>
          </div>
          <h1 className="hero-heading text-white mb-8">
            Jacob Charendoff
          </h1>
          <p className="body-large max-w-2xl" style={{ color: "var(--text-on-dark-muted)" }}>
            A legally blind entrepreneur who didn&rsquo;t start with connections
            or capital — just curiosity, resilience, and a bias for action.
          </p>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────── */}
      <section className="section-yellow" aria-label="Career highlights">
        <div className="content-max py-12 sm:py-16">
          <div className="stat-grid text-center">
            {highlights.map((h) => (
              <div key={h.label}>
                <p className="stat-number text-cnib-black">{h.value}</p>
                <p className="stat-label text-cnib-black/70 mt-2">{h.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story ─────────────────────────────────────────────── */}
      <section className="section-padding bg-white" aria-label="Jacob's story">
        <div className="content-narrow">
          <h2 className="section-heading text-cnib-black mb-10">
            Turning adversity into opportunity
          </h2>
          <div className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-cnib-yellow rounded-full hidden sm:block" aria-hidden="true" />
            <div className="sm:pl-8 space-y-6 body-large text-text-secondary">
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
        </div>
      </section>

      {/* ── Why This Program ──────────────────────────────────── */}
      <section className="section-warm section-padding" aria-label="Why this program exists">
        <div className="content-narrow">
          <h2 className="section-heading text-cnib-black mb-10">
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

      {/* ── Experience Grid ───────────────────────────────────── */}
      <section className="mesh-gradient-dark section-padding relative overflow-hidden" aria-label="Where Jacob has built">
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
          <FadeIn>
            <p className="caption text-cnib-yellow mb-4">Experience</p>
            <h2 className="section-heading text-white mb-12">
              Where Jacob has built
            </h2>
          </FadeIn>
          <div className="relative" role="list">
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-cnib-yellow/40 via-cnib-yellow/20 to-transparent" aria-hidden="true" />
            <Stagger className="space-y-2" staggerDelay={0.1}>
              {experiences.map((item) => (
                <StaggerItem key={item}>
                  <div className="relative pl-10 py-3" role="listitem">
                    <span className="absolute left-[9px] top-5 w-3 h-3 rounded-full bg-cnib-yellow/20 border-2 border-cnib-yellow" aria-hidden="true" />
                    <span style={{ color: "var(--text-on-dark)" }} className="text-sm leading-relaxed">
                      {item}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ── CNIB Community ────────────────────────────────────── */}
      <section className="section-padding bg-white" aria-label="CNIB community">
        <div className="content-narrow">
          <h2 className="section-heading text-cnib-black mb-10">
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

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="section-yellow section-padding-sm" aria-label="Call to action">
        <div className="content-narrow text-center">
          <h2 className="section-heading text-cnib-black mb-8">
            Ready to build?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/themes" className="btn-dark">
              Explore the curriculum
            </Link>
            <Link
              href="/toolkit"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-transparent border-2 border-cnib-black text-cnib-black font-bold rounded-full no-underline hover:bg-cnib-black hover:text-cnib-yellow transition-colors"
            >
              Get the toolkit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
