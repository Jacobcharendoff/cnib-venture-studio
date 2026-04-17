import Link from "next/link";
import { phases, getModulesByPhase, getAvailableModules } from "@/data/modules";
import { FadeIn, Stagger, StaggerItem, ScaleIn } from "@/components/Animate";
import ProgressWidget from "@/components/ProgressWidget";
import HeroVisual from "@/components/HeroVisual";
import CursorGlow from "@/components/CursorGlow";
import PhaseIcon from "@/components/PhaseIcon";
import AnimatedCounter from "@/components/AnimatedCounter";

export default function Home() {
  const availableCount = getAvailableModules().length;

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <CursorGlow>
      <section className="mesh-gradient-hero relative overflow-hidden min-h-[100svh] flex items-center">
        {/* Drifting dot grid */}
        <div
          className="absolute inset-0 pointer-events-none dot-grid-drift"
          aria-hidden="true"
        />

        {/* Mobile simplified glow (replaces full iris on small screens) */}
        <div
          className="absolute top-1/3 right-0 w-48 h-48 rounded-full lg:hidden pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,241,0,0.1), transparent 70%)" }}
          aria-hidden="true"
        />

        {/* Animated iris rings */}
        <HeroVisual />

        {/* Yellow accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px] gradient-line"
          aria-hidden="true"
        />

        <div className="content-max relative z-10 py-32 sm:py-40">
          <div className="max-w-5xl">
            <FadeIn delay={0.1}>
              <div className="flex items-center gap-3 mb-8">
                <span className="glow-dot" aria-hidden="true" />
                <p className="caption text-cnib-yellow">
                  CNIB Venture Studio
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="hero-heading text-white mb-8">
                Turn your idea
                <br />
                into your{" "}
                <span className="text-cnib-yellow">first dollar.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.35}>
              <p className="body-large max-w-2xl mb-14" style={{ color: "var(--text-on-dark-muted)" }}>
                An immersive entrepreneurial program for blind and low-vision
                founders. No MBA required. Just a great idea and the will to
                build it.
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/themes" className="btn-primary pulse-glow">
                  Explore the program
                </Link>
                <Link href="/toolkit" className="btn-secondary">
                  Browse the toolkit
                </Link>
              </div>
            </FadeIn>

            {/* Progress widget — only visible if user has started */}
            <FadeIn delay={0.6}>
              <ProgressWidget />
            </FadeIn>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{ background: "linear-gradient(transparent, var(--cnib-yellow))" }}
          aria-hidden="true"
        />
      </section>
      </CursorGlow>

      {/* ── Stats Bar ───────────────────────────────────────────── */}
      <section className="section-yellow" aria-label="Program highlights">
        <div className="content-max py-12 sm:py-16">
          <Stagger className="stat-grid text-center" staggerDelay={0.08}>
            {[
              { value: "18", label: "Modules" },
              { value: "6", label: "Phases" },
              { value: "90 min", label: "Per Session" },
              { value: "$0", label: "Cost to Members" },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <p className="stat-number text-cnib-black">
                  <AnimatedCounter value={stat.value} />
                </p>
                <p className="stat-label text-cnib-black/70 mt-2">{stat.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Who This Is For ─────────────────────────────────── */}
      <section className="section-padding bg-white" aria-label="Who this program is for">
        <div className="content-narrow text-center">
          <FadeIn>
            <p className="caption text-cnib-yellow-on-light mb-6">Built for you</p>
            <h2 className="section-heading text-cnib-black mb-8">
              For first-time entrepreneurs who have a great idea &mdash; and want to
              know how to make it real.
            </h2>
            <p className="body-large text-text-secondary mb-16">
              You don&rsquo;t need a business degree. You don&rsquo;t need
              investors. You need clarity, structure, and someone who&rsquo;s
              been where you are. This program gives you all three.
            </p>
          </FadeIn>

          <Stagger className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left" staggerDelay={0.12}>
            {[
              {
                num: "01",
                title: "Your idea, validated",
                desc: "Learn if your idea solves a real problem \u2014 before you spend a dollar building it.",
              },
              {
                num: "02",
                title: "Your first revenue model",
                desc: "Build a pricing strategy and financial model that makes your business viable from day one.",
              },
              {
                num: "03",
                title: "Your pitch, polished",
                desc: "Walk away with a 10-slide pitch deck and the confidence to deliver it to anyone.",
              },
            ].map((item) => (
              <StaggerItem key={item.num}>
                <div className="premium-card">
                  <span className="eyebrow text-cnib-yellow-on-light block mb-3">
                    {item.num}
                  </span>
                  <h3 className="text-lg font-bold text-cnib-black mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Section divider */}
      <div className="relative h-px" aria-hidden="true">
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent, rgba(255,241,0,0.3), transparent)" }} />
      </div>

      {/* ── The 6 Phases ────────────────────────────────────── */}
      <section className="mesh-gradient-dark section-padding relative overflow-hidden" aria-label="Program phases">
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
          <FadeIn className="text-center mb-20">
            <p className="caption text-cnib-yellow mb-6">The journey</p>
            <h2 className="section-heading text-white mb-6">
              6 phases. 18 modules.
              <br />
              <span style={{ color: "var(--text-on-dark-muted)" }}>One clear path.</span>
            </h2>
            <p className="section-subheading max-w-2xl mx-auto" style={{ color: "var(--text-on-dark-muted)" }}>
              Each phase builds on the last, taking you from raw idea to
              investor-ready pitch.
            </p>
          </FadeIn>

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
            {phases.map((p) => {
              const phaseModules = getModulesByPhase(p.id);
              const available = phaseModules.filter(
                (m) => m.title !== "Coming Soon"
              ).length;
              return (
                <StaggerItem key={p.id}>
                  <Link
                    href={`/themes#${p.id}`}
                    className="glass-card no-underline group block h-full"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <PhaseIcon phase={p.id} size={36} className="text-cnib-yellow" />
                        <span className="relative inline-flex items-center justify-center w-12 h-12">
                          <span className="absolute inset-0 rounded-full border-2 border-cnib-yellow/20 bg-cnib-yellow/5" aria-hidden="true" />
                          <span className="relative text-cnib-yellow font-bold text-xl font-mono tracking-tighter">
                            {String(p.number).padStart(2, "0")}
                          </span>
                        </span>
                      </div>
                      <span className="eyebrow" style={{ color: "var(--text-on-dark-muted)" }}>
                        {available}/{phaseModules.length} modules
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cnib-yellow transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-on-dark-muted)" }}>
                      {p.tagline}
                    </p>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>

          <FadeIn className="text-center mt-16">
            <Link href="/themes" className="btn-primary">
              View all {availableCount} modules
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── How It Works ────────────────────────────────────── */}
      <section className="section-warm section-padding" aria-label="How the program works">
        <div className="content-max">
          <FadeIn className="text-center mb-20">
            <p className="caption text-cnib-yellow-on-light mb-6">How it works</p>
            <h2 className="section-heading text-cnib-black">
              Built around your life,
              <br />
              not around a classroom.
            </h2>
          </FadeIn>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-12" staggerDelay={0.15}>
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
                desc: "The program ends with a Final Pitch Showcase \u2014 your chance to present your business to mentors and business leaders.",
              },
            ].map((item) => (
              <StaggerItem key={item.num}>
                <span className="number-accent block mb-4" aria-hidden="true">
                  {item.num}
                </span>
                <h3 className="text-xl font-bold text-cnib-black mb-4">
                  {item.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {item.desc}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Meet Your Instructor ────────────────────────────── */}
      <section className="section-padding bg-white" aria-label="Meet your instructor">
        <div className="content-narrow">
          <FadeIn className="text-center mb-12">
            <p className="caption text-cnib-yellow-on-light mb-6">Your instructor</p>
            <h2 className="section-heading text-cnib-black mb-8">
              Jacob Charendoff
            </h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="relative">
              <span className="quote-decoration -top-12 -left-6 hidden sm:block" aria-hidden="true">&ldquo;</span>
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-cnib-yellow rounded-full" aria-hidden="true" />
              <div className="pl-8 space-y-6">
                <p className="body-large text-text-secondary">
                  A legally blind entrepreneur who has built businesses across
                  industries &mdash; from luxury hospitality in the mountains of Peru, to
                  boutique eCommerce brands trusted by global music retailers, to
                  AI-powered healthtech platforms that personalize care.
                </p>
                <p className="text-text-secondary">
                  This program isn&rsquo;t based on theory. It&rsquo;s based on
                  experience &mdash; raw, real, and full of hard-won lessons. Jacob
                  didn&rsquo;t start with connections or capital, just curiosity,
                  resilience, and a bias for action.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn className="text-center mt-12" delay={0.25}>
            <Link href="/about" className="btn-dark">
              Read Jacob&rsquo;s story
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Section divider */}
      <div className="relative h-px" aria-hidden="true">
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent, rgba(255,241,0,0.2), transparent)" }} />
      </div>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <CursorGlow>
      <section className="mesh-gradient-dark section-padding relative overflow-hidden" aria-label="Call to action">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 50% at 50% 100%, rgba(255,241,0,0.1) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />
        <div className="content-narrow text-center relative z-10">
          <ScaleIn>
            <p className="caption text-cnib-yellow mb-6">Start now</p>
            <h2 className="section-heading text-white mb-6">
              Your first sale is waiting.
            </h2>
            <p className="body-large mb-12" style={{ color: "var(--text-on-dark-muted)" }}>
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
          </ScaleIn>
        </div>
      </section>
      </CursorGlow>
    </>
  );
}
