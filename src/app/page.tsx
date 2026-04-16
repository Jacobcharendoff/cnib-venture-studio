import Link from "next/link";
import { phases, modules, getModulesByPhase, getAvailableModules } from "@/data/modules";

export default function Home() {
  const availableCount = getAvailableModules().length;

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="section-dark section-padding pt-32 sm:pt-40 relative overflow-hidden">
        {/* Subtle gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,241,0,0.06) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />

        <div className="content-max relative">
          <div className="max-w-4xl">
            <p className="caption text-cnib-yellow mb-6">
              CNIB Venture Studio
            </p>
            <h1 className="hero-heading text-white mb-8">
              Turn your idea
              <br />
              into your{" "}
              <span className="text-cnib-yellow">first dollar.</span>
            </h1>
            <p className="body-large text-white/60 max-w-2xl mb-12">
              An immersive entrepreneurial program for blind and low-vision
              founders. No MBA required. Just a great idea and the will to
              build it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/themes" className="btn-primary">
                Explore the program
              </Link>
              <Link href="/toolkit" className="btn-secondary">
                Browse the toolkit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────── */}
      <section className="section-yellow py-10 sm:py-14">
        <div className="content-max">
          <div className="stat-grid text-center">
            <div>
              <p className="stat-number text-cnib-black">18</p>
              <p className="stat-label text-cnib-black/60">Modules</p>
            </div>
            <div>
              <p className="stat-number text-cnib-black">6</p>
              <p className="stat-label text-cnib-black/60">Phases</p>
            </div>
            <div>
              <p className="stat-number text-cnib-black">90 min</p>
              <p className="stat-label text-cnib-black/60">Per session</p>
            </div>
            <div>
              <p className="stat-number text-cnib-black">$0</p>
              <p className="stat-label text-cnib-black/60">Cost to members</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who This Is For ───────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="content-narrow text-center">
          <p className="caption text-cnib-yellow-dim mb-4">Built for you</p>
          <h2 className="section-heading text-cnib-black mb-8">
            For first-time entrepreneurs who have a great idea — and want to
            know how to make it real.
          </h2>
          <p className="body-large text-text-secondary mb-12">
            You don&rsquo;t need a business degree. You don&rsquo;t need
            investors. You need clarity, structure, and someone who&rsquo;s
            been where you are. This program gives you all three.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
            {[
              {
                title: "Your idea, validated",
                desc: "Learn if your idea solves a real problem — before you spend a dollar building it.",
              },
              {
                title: "Your first revenue model",
                desc: "Build a pricing strategy and financial model that makes your business viable from day one.",
              },
              {
                title: "Your pitch, polished",
                desc: "Walk away with a 10-slide pitch deck and the confidence to deliver it to anyone.",
              },
            ].map((item) => (
              <div key={item.title} className="phase-card bg-cnib-warm">
                <h3 className="text-lg font-bold text-cnib-black mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The 6 Phases ──────────────────────────────────── */}
      <section className="section-dark section-padding">
        <div className="content-max">
          <div className="text-center mb-16">
            <p className="caption text-cnib-yellow mb-4">The journey</p>
            <h2 className="section-heading text-white mb-4">
              6 phases. 18 modules. One clear path.
            </h2>
            <p className="section-subheading text-white/50 max-w-2xl mx-auto">
              Each phase builds on the last, taking you from raw idea to
              investor-ready pitch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {phases.map((p) => {
              const phaseModules = getModulesByPhase(p.id);
              const available = phaseModules.filter(
                (m) => m.title !== "Coming Soon"
              ).length;
              return (
                <Link
                  key={p.id}
                  href={`/themes#${p.id}`}
                  className="phase-card bg-cnib-dark/50 border-white/5 hover:border-cnib-yellow/30 no-underline group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-cnib-yellow font-bold text-2xl font-mono">
                      {String(p.number).padStart(2, "0")}
                    </span>
                    <span className="text-white/20 text-sm">
                      {available}/{phaseModules.length} modules
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cnib-yellow transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-sm text-white/40">{p.tagline}</p>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/themes" className="btn-primary">
              View all {availableCount} modules
            </Link>
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────── */}
      <section className="section-warm section-padding">
        <div className="content-max">
          <div className="text-center mb-16">
            <p className="caption text-cnib-yellow-dim mb-4">How it works</p>
            <h2 className="section-heading text-cnib-black">
              Built around your life, not around a classroom.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                num: "01",
                title: "Live sessions, every two weeks",
                desc: "90-minute bi-weekly sessions with real-world case studies, live discussion, and hands-on assignments. October through May.",
              },
              {
                num: "02",
                title: "Worksheets & podcasts per module",
                desc: "Every module comes with a practical worksheet in accessible .docx format, plus podcast episodes that walk through each concept.",
              },
              {
                num: "03",
                title: "Pitch to a live panel",
                desc: "The program ends with a Final Pitch Showcase — your chance to present your business to mentors and business leaders.",
              },
            ].map((item) => (
              <div key={item.num}>
                <p className="text-cnib-yellow-dim font-bold text-4xl font-mono mb-4">
                  {item.num}
                </p>
                <h3 className="text-lg font-bold text-cnib-black mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Meet Your Instructor ──────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="content-narrow text-center">
          <p className="caption text-cnib-yellow-dim mb-4">Your instructor</p>
          <h2 className="section-heading text-cnib-black mb-8">
            Jacob Charendoff
          </h2>
          <p className="body-large text-text-secondary mb-6">
            A legally blind entrepreneur who has built businesses across
            industries — from luxury hospitality in the mountains of Peru, to
            boutique eCommerce brands trusted by global music retailers, to
            AI-powered healthtech platforms that personalize care.
          </p>
          <p className="text-text-secondary mb-10">
            This program isn&rsquo;t based on theory. It&rsquo;s based on
            experience — raw, real, and full of hard-won lessons. Jacob
            didn&rsquo;t start with connections or capital, just curiosity,
            resilience, and a bias for action.
          </p>
          <Link href="/about" className="btn-dark">
            Read Jacob&rsquo;s story
          </Link>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="section-dark section-padding relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(255,241,0,0.08) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />
        <div className="content-narrow text-center relative">
          <h2 className="section-heading text-white mb-6">
            Your first sale is waiting.
          </h2>
          <p className="body-large text-white/50 mb-10">
            Real business. Real skills. Real outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/themes" className="btn-primary">
              Start learning
            </Link>
            <Link href="/toolkit" className="btn-secondary">
              Get the worksheets
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
