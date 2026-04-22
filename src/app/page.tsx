'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { MODULES } from '@/lib/course-data';
import { StepRing, ModuleVisual } from '@/components/CardVisuals';

const MODULE_COLORS: Record<string, string> = {
  discover: '#2997FF',
  design: '#5AC8FA',
  money: '#c9a800',
  brand: '#BF5AF2',
  sell: '#FF453A',
  launch: '#30D158',
};

const MODULE_DELIVERABLES: Record<string, string> = {
  discover: 'A validated opportunity and customer profile',
  design: 'A minimum viable offer designed around your life',
  money: 'A pricing model and financial plan that works',
  brand: 'A name, story, and digital presence',
  sell: 'Your first real paying customer',
  launch: 'A launch plan and growth foundation',
};

// ── Animation Hooks & Components ──

function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function AnimateIn({
  children,
  variant = 'fade-up',
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  variant?: 'fade-up' | 'fade-in' | 'scale-in' | 'slide-left' | 'slide-right';
  delay?: number;
  className?: string;
}) {
  const { ref, isVisible } = useInView();

  const baseStyles: React.CSSProperties = {
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    opacity: isVisible ? 1 : 0,
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    'fade-up': { transform: isVisible ? 'translateY(0)' : 'translateY(40px)' },
    'fade-in': { transform: 'none' },
    'scale-in': { transform: isVisible ? 'scale(1)' : 'scale(0.9)' },
    'slide-left': { transform: isVisible ? 'translateX(0)' : 'translateX(40px)' },
    'slide-right': { transform: isVisible ? 'translateX(0)' : 'translateX(-40px)' },
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...baseStyles, ...variantStyles[variant] }}
    >
      {children}
    </div>
  );
}

function FloatingParticles({ count = 20, color = '#2997FF' }: { count?: number; color?: string }) {
  const particles = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * -20,
    }))
  ).current;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: color,
            opacity: 0.3,
            animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ── FAQ ──

const FAQ_ITEMS = [
  {
    q: 'Do I need a business idea already?',
    a: "No. The first module is entirely about finding one. You'll figure out who you want to help, what problem you can solve, and whether people would actually pay for it.",
  },
  {
    q: "What if I've never run a business before?",
    a: "That's exactly who this is for. Every concept is explained from scratch. No MBA, no prior experience, no jargon. If you can follow a recipe, you can follow this course.",
  },
  {
    q: 'How much time does it take?',
    a: 'About 2 hours per week. Each lesson is 15 minutes of reading, plus time to work through the deliverable. No live sessions, no deadlines. Go at your own pace.',
  },
  {
    q: "Is it really free? What's the catch?",
    a: "No catch. CNIB funds this as part of their mission to expand economic opportunity for Canadians with sight loss. No credit card, no trial period, no upsell. Every lesson and template is yours.",
  },
  {
    q: 'Will it work with my screen reader?',
    a: 'Yes. The entire platform was built accessible-first, not retrofitted. It works with JAWS, NVDA, VoiceOver, ZoomText, and other assistive technology.',
  },
  {
    q: 'What kind of businesses can I start?',
    a: "Consulting, coaching, freelance services, digital products, online tutoring, local services. The framework works for any business where you're solving a problem for people. You don't need to build an app or raise funding.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left text-base sm:text-lg font-semibold text-white hover:text-blue-400 transition-colors"
        aria-expanded={open}
      >
        <span>{q}</span>
        <span
          className="text-2xl text-gray-500 ml-4 flex-shrink-0 transition-transform duration-300"
          style={{ transform: open ? 'rotate(45deg)' : 'none' }}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '300px' : '0', opacity: open ? 1 : 0 }}
      >
        <p className="pb-6 text-gray-400 leading-relaxed text-sm sm:text-base">{a}</p>
      </div>
    </div>
  );
}

// ── Page ──

export default function Home() {
  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      <Nav />

      <main id="main-content" className="pt-20">
        {/* ===== HERO ===== */}
        <section
          className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-20 sm:px-8 overflow-hidden"
          aria-labelledby="hero-headline"
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.35 }}>
            <div
              className="absolute w-[700px] h-[700px] rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, #2997FF, #5AC8FA, #c9a800, #BF5AF2, #FF453A, #30D158, #2997FF)',
                filter: 'blur(120px)',
                animation: 'spin 12s linear infinite',
              }}
            />
          </div>
          <FloatingParticles count={25} color="#2997FF" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(0deg, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div
              className="mb-8 sm:mb-12 inline-flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm"
              style={{ animation: 'fade-in-down 0.8s ease forwards' }}
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full" style={{ animation: 'pulse-glow 2s ease-in-out infinite' }} />
              <span className="text-xs sm:text-sm font-medium text-white">Free for Canadians with sight loss</span>
            </div>

            <h1
              id="hero-headline"
              className="text-[clamp(3rem,10vw,8rem)] font-black tracking-tighter leading-none mb-6 text-white"
              style={{ animation: 'fade-in-up 0.8s ease 0.2s both' }}
            >
              Build something.{' '}
              <span
                className="font-light"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #5AC8FA, #BF5AF2)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                On your terms.
              </span>
            </h1>

            <p
              className="text-base sm:text-xl text-gray-400 mb-12 sm:mb-16 max-w-2xl mx-auto leading-relaxed"
              style={{ animation: 'fade-in-up 0.8s ease 0.4s both' }}
            >
              A free, self-paced course that takes you from business idea to first paying customer in 6 weeks.
              24 lessons built accessible-first for blind and low-vision Canadians.
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
              style={{ animation: 'fade-in-up 0.8s ease 0.6s both' }}
            >
              <Link
                href="/auth"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-all active:scale-95 w-full sm:w-auto text-center overflow-hidden"
              >
                <span className="relative z-10">Start the course &rarr;</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link
                href="#curriculum"
                className="px-6 sm:px-8 py-3 sm:py-4 text-white font-semibold rounded-full border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all backdrop-blur-sm active:scale-95 w-full sm:w-auto text-center"
              >
                See what&apos;s inside
              </Link>
            </div>
          </div>

          <div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden sm:flex flex-col items-center gap-4"
            style={{ animation: 'bounce 2s infinite' }}
          >
            <div className="w-8 h-12 rounded-full border border-white/30 flex items-center justify-center">
              <div className="w-1 h-2 bg-white/50 rounded-full" style={{ animation: 'scroll-dot 2s ease-in-out infinite' }} />
            </div>
          </div>
        </section>

        {/* ===== THE STAT ===== */}
        <section className="relative bg-black py-20 sm:py-28 px-6 sm:px-8 overflow-hidden" aria-labelledby="stat-heading">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <AnimateIn variant="scale-in">
              <div
                id="stat-heading"
                className="text-[clamp(5rem,15vw,10rem)] font-black leading-none mb-4"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #2997FF, #BF5AF2, #FF453A)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  animation: 'gradient-shift 4s ease infinite',
                  backgroundSize: '200% auto',
                }}
              >
                54%
              </div>
              <p className="text-lg sm:text-2xl text-gray-400 max-w-2xl mx-auto">
                of Canadians with sight loss are employed. This course is for the other 46% who decided to stop waiting and start building.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* ===== WHO THIS IS FOR ===== */}
        <section className="bg-[#111] py-20 sm:py-28 px-6 sm:px-8" aria-labelledby="audience-heading">
          <div className="max-w-5xl mx-auto">
            <AnimateIn className="mb-12 sm:mb-16 text-center">
              <h2 id="audience-heading" className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
                You&apos;re in the right place if...
              </h2>
            </AnimateIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'You have an idea but no roadmap',
                  desc: "You keep coming back to this business idea but have no clue where to start. You don't have an MBA. You don't need one. This course gives you the step-by-step.",
                  color: '#2997FF',
                },
                {
                  title: "The job market isn't working",
                  desc: "You're capable. You're qualified. But the callbacks dry up when sight loss enters the picture. You want income you control, not income that depends on someone else saying yes.",
                  color: '#BF5AF2',
                },
                {
                  title: 'You need flexibility',
                  desc: "A 9-to-5 doesn't fit your life right now. You want to build something around your schedule, your energy, your terms.",
                  color: '#30D158',
                },
              ].map((item, i) => (
                <AnimateIn key={i} delay={i * 0.12}>
                  <div
                    className="h-full p-6 sm:p-8 rounded-2xl bg-white/[0.03] transition-all duration-300 hover:-translate-y-1"
                    style={{ borderLeft: `3px solid ${item.color}` }}
                  >
                    <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{item.desc}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHAT YOU'LL WALK AWAY WITH ===== */}
        <section className="bg-black py-20 sm:py-28 px-6 sm:px-8" aria-labelledby="outcomes-heading">
          <div className="max-w-5xl mx-auto">
            <AnimateIn className="mb-12 sm:mb-16 text-center">
              <h2 id="outcomes-heading" className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
                After 24 lessons, here&apos;s what you&apos;ll have.
              </h2>
              <p className="text-lg text-gray-500">Not theory. Not certificates. Real things you built yourself.</p>
            </AnimateIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-12">
              {[
                {
                  num: '01',
                  title: 'A validated business idea',
                  desc: "You'll know exactly who you're helping, what problem you're solving, and that real people would pay for it. Not a guess. Validated.",
                  color: '#2997FF',
                },
                {
                  num: '02',
                  title: 'A real financial plan',
                  desc: 'Pricing that pays you, costs you can see coming, and a clear picture of what you need to launch. One page, not fifty.',
                  color: '#c9a800',
                },
                {
                  num: '03',
                  title: 'A brand and online presence',
                  desc: 'A name, a story, and a simple digital presence. Professional enough that strangers take you seriously.',
                  color: '#BF5AF2',
                },
                {
                  num: '04',
                  title: 'Your first paying customer',
                  desc: 'Not hypothetical. Not "potential leads." A real person who paid real money for something you built during this course.',
                  color: '#30D158',
                },
              ].map((item, i) => (
                <AnimateIn key={i} delay={i * 0.1}>
                  <div className="flex gap-5 p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
                      style={{ backgroundColor: `${item.color}15`, color: item.color }}
                    >
                      {item.num}
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>

            <AnimateIn variant="fade-in" delay={0.3}>
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-500">
                <span>24 lessons</span>
                <span className="w-1 h-1 rounded-full bg-gray-700" />
                <span>6 modules</span>
                <span className="w-1 h-1 rounded-full bg-gray-700" />
                <span>42 downloadable templates</span>
                <span className="w-1 h-1 rounded-full bg-gray-700" />
                <span>~2 hours/week</span>
                <span className="w-1 h-1 rounded-full bg-gray-700" />
                <span>6 weeks total</span>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section className="bg-white text-black py-20 sm:py-28 px-6 sm:px-8" aria-labelledby="process-heading">
          <div className="max-w-5xl mx-auto">
            <AnimateIn className="text-center mb-16 sm:mb-20">
              <h2 id="process-heading" className="text-3xl sm:text-5xl font-black tracking-tight mb-4">How it works</h2>
              <p className="text-lg text-gray-500">No classrooms. No group projects. No scheduling headaches.</p>
            </AnimateIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
              {[
                { num: '01', title: 'Sign up', desc: 'Name, email, done. Takes 30 seconds. Works with screen readers from the first click.', color: '#2997FF' },
                { num: '02', title: 'Learn at your pace', desc: '15-minute lessons you read on your own time. No live sessions, no deadlines, no group work.', color: '#c9a800' },
                { num: '03', title: 'Build as you go', desc: 'Every lesson ends with a real deliverable. Templates, worksheets, frameworks. Your business takes shape as you learn.', color: '#30D158' },
                { num: '04', title: 'Make your first sale', desc: "The finish line isn't a certificate. It's revenue. Module 5 walks you through getting your first paying customer.", color: '#BF5AF2' },
              ].map((step, i) => (
                <AnimateIn key={step.num} delay={i * 0.12}>
                  <div className="text-center">
                    <StepRing number={step.num} color={step.color} delay={i * 0.2} />
                    <h3 className="text-lg font-black mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CURRICULUM ===== */}
        <section id="curriculum" className="bg-black py-20 sm:py-28 px-6 sm:px-8" aria-labelledby="curriculum-heading">
          <div className="max-w-5xl mx-auto">
            <AnimateIn className="mb-12 sm:mb-16 text-center">
              <h2 id="curriculum-heading" className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
                Six modules. Each one builds on the last.
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Every module ends with a real deliverable. By Module 6, you&apos;ll have a business, not just knowledge.
              </p>
            </AnimateIn>

            <div className="space-y-4">
              {MODULES.map((module, idx) => {
                const color = MODULE_COLORS[module.slug] || '#2997FF';
                const deliverable = MODULE_DELIVERABLES[module.slug] || '';
                return (
                  <AnimateIn key={module.slug} delay={idx * 0.06}>
                    <div
                      className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-6 sm:p-8 rounded-2xl transition-all duration-300 hover:bg-white/[0.03]"
                      style={{ border: `1px solid ${color}15` }}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black text-black flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                          style={{ backgroundColor: color }}
                        >
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                        <div>
                          <h3 className="text-xl font-black tracking-tight" style={{ color }}>
                            {module.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-0.5">
                            {module.lessons.length} lessons &middot; {module.subtitle}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 sm:max-w-xs">
                        <ModuleVisual slug={module.slug} color={color} />
                        <p className="text-sm text-gray-400">&rarr; {deliverable}</p>
                      </div>
                    </div>
                  </AnimateIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== DESIGNED FOR YOU ===== */}
        <section className="bg-[#111] py-20 sm:py-28 px-6 sm:px-8" aria-labelledby="design-heading">
          <div className="max-w-5xl mx-auto">
            <AnimateIn className="mb-12 sm:mb-16 text-center">
              <h2 id="design-heading" className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
                Designed for how you actually learn.
              </h2>
            </AnimateIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  title: 'Accessible-first',
                  desc: 'Screen readers, magnification, assistive tech. Not bolted on after the fact. Every lesson, template, and download works with JAWS, NVDA, VoiceOver, and ZoomText from day one.',
                  color: '#2997FF',
                },
                {
                  title: 'Self-paced',
                  desc: '15-minute lessons. No Zoom calls, no group projects, no fixed schedule. Open a lesson when you have time, pick up where you left off. The course works around your life.',
                  color: '#BF5AF2',
                },
                {
                  title: 'Project-based',
                  desc: "You're not watching lectures and taking quizzes. Every lesson ends with a real deliverable: a worksheet, a template, a plan. You build your business as you learn.",
                  color: '#30D158',
                },
              ].map((item, i) => (
                <AnimateIn key={i} delay={i * 0.12}>
                  <div
                    className="group rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 h-full"
                    style={{
                      background: `linear-gradient(135deg, ${item.color}08 0%, rgba(255,255,255,0.01) 100%)`,
                      border: `1px solid ${item.color}20`,
                    }}
                  >
                    <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}80)` }} />
                    <div className="p-8">
                      <h3 className="text-xl font-black text-white mb-3">{item.title}</h3>
                      <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{item.desc}</p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ===== LESSON PREVIEW ===== */}
        <section
          className="bg-[#0A0A0A] py-20 sm:py-28 px-6 sm:px-8 border-t border-b border-white/5"
          aria-labelledby="preview-heading"
        >
          <div className="max-w-4xl mx-auto">
            <AnimateIn className="text-center mb-12 sm:mb-16">
              <h2 id="preview-heading" className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
                See what a lesson looks like.
              </h2>
              <p className="text-base sm:text-lg text-gray-500">No signup required. This is Lesson 1.</p>
            </AnimateIn>

            <AnimateIn variant="scale-in" delay={0.15}>
              <div
                className="group rounded-2xl overflow-hidden bg-white/[0.03] transition-all duration-500"
                style={{ border: '1px solid rgba(41, 151, 255, 0.15)' }}
              >
                <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #2997FF, #5AC8FA, #2997FF)' }} />
                <div className="p-6 sm:p-8 border-b border-white/10 flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: '#2997FF20', color: '#2997FF' }}
                  >
                    01
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">Who Do You Want to Help?</p>
                    <p className="text-gray-500 text-sm">Module 1: DISCOVER &middot; 15 minutes</p>
                  </div>
                </div>
                <div className="p-6 sm:p-10 space-y-5 text-gray-300 leading-relaxed">
                  <p className="text-base sm:text-lg">
                    Every business starts with a person. Not a product, not an app, not a website. A person with a problem
                    they&apos;d pay to solve.
                  </p>
                  <p className="text-base sm:text-lg">
                    In this lesson, you&apos;ll stop thinking about &quot;business ideas&quot; and start thinking about
                    people. Specifically: who do you already understand better than most? What community are you part of?
                    What problems have you solved in your own life that other people are still stuck on?
                  </p>
                  <p className="text-sm text-gray-500 italic">
                    The full lesson continues with exercises, examples, and a downloadable worksheet...
                  </p>
                </div>
                <div className="p-6 sm:p-8 border-t border-white/10 flex justify-center">
                  <Link
                    href="/auth"
                    className="group/btn relative px-6 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-all active:scale-95 text-sm overflow-hidden"
                  >
                    <span className="relative z-10">Sign up to read the full lesson</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  </Link>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="bg-black py-20 sm:py-28 px-6 sm:px-8" aria-labelledby="faq-heading">
          <div className="max-w-3xl mx-auto">
            <AnimateIn className="mb-12 text-center">
              <h2 id="faq-heading" className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Common questions
              </h2>
            </AnimateIn>
            <div>
              {FAQ_ITEMS.map((item, i) => (
                <FAQItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ===== FINAL CTA ===== */}
        <section className="relative bg-black py-20 sm:py-28 px-6 sm:px-8 overflow-hidden" aria-labelledby="final-cta-heading">
          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(41, 151, 255, 0.15) 0%, transparent 70%)',
              filter: 'blur(40px)',
              animation: 'pulse-slow 5s ease-in-out infinite',
            }}
          />
          <FloatingParticles count={15} color="#2997FF" />
          <AnimateIn variant="scale-in">
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <h2 id="final-cta-heading" className="text-4xl sm:text-7xl font-black text-white tracking-tight mb-2">
                You&apos;ve waited{' '}
                <span
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #2997FF, #BF5AF2)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  long enough.
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto">
                24 lessons. 42 templates. Your first paying customer. All free. The only thing left is starting.
              </p>
              <Link
                href="/auth"
                className="group relative inline-block px-8 sm:px-12 py-4 sm:py-5 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-all active:scale-95 text-lg overflow-hidden"
              >
                <span className="relative z-10">Start the course &rarr;</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>
          </AnimateIn>
        </section>
      </main>

      <Footer />

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes bounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-10px); } }
        @keyframes scroll-dot { 0%, 100% { transform: translateY(-4px); opacity: 0; } 50% { transform: translateY(4px); opacity: 1; } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fade-in-down { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 4px #3b82f6, 0 0 8px #3b82f6; } 50% { box-shadow: 0 0 8px #3b82f6, 0 0 20px #3b82f6, 0 0 30px #3b82f680; } }
        @keyframes pulse-slow { 0%, 100% { transform: scale(1); opacity: 0.15; } 50% { transform: scale(1.1); opacity: 0.25; } }
        @keyframes gradient-shift { 0% { background-position: 0% center; } 50% { background-position: 100% center; } 100% { background-position: 0% center; } }
        @keyframes float-particle { 0%, 100% { transform: translate(0, 0); opacity: 0.2; } 25% { transform: translate(10px, -20px); opacity: 0.4; } 50% { transform: translate(-5px, -40px); opacity: 0.2; } 75% { transform: translate(15px, -20px); opacity: 0.35; } }
      `}</style>
    </div>
  );
}
