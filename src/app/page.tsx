'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { MODULES } from '@/lib/course-data';
import { AccessibilityVisual, HeritageVisual, PriceVisual, StepRing, MiniChart, ModuleVisual } from '@/components/CardVisuals';

const MODULE_COLORS: Record<string, string> = {
  discover: '#2997FF',
  design: '#5AC8FA',
  money: '#c9a800',
  brand: '#BF5AF2',
  sell: '#FF453A',
  launch: '#30D158',
};

const MODULE_DELIVERABLES: Record<string, string> = {
  discover: 'A validated opportunity statement and customer profile you can actually use',
  design: "A minimum viable offer designed around your life, not someone else's schedule",
  money: 'A pricing model that pays you and a clear picture of what you need to launch',
  brand: 'A name, a story, and a digital presence that looks like you mean business',
  sell: 'Your first paying customer. Not hypothetical. Real.',
  launch: 'A launch plan, feedback system, and the foundation to keep growing',
};

const MODULE_CHARTS: Record<string, 'up' | 'wave' | 'spike'> = {
  discover: 'wave',
  design: 'up',
  money: 'spike',
  brand: 'wave',
  sell: 'up',
  launch: 'spike',
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

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const { ref, isVisible } = useInView();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 1500;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, target]);

  return (
    <div ref={ref} className="text-4xl sm:text-6xl font-black text-white mb-2">
      {isVisible ? `${count}${suffix}` : `0${suffix}`}
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

export default function Home() {
  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      <Nav />

      <main id="main-content" className="pt-20">
        {/* ===== HERO SECTION ===== */}
        <section
          className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-20 sm:px-8 overflow-hidden"
          aria-labelledby="hero-headline"
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.35 }}>
            <div className="absolute w-[700px] h-[700px] rounded-full" style={{ background: `conic-gradient(from 0deg, #2997FF, #5AC8FA, #c9a800, #BF5AF2, #FF453A, #30D158, #2997FF)`, filter: 'blur(120px)', animation: 'spin 12s linear infinite' }} />
          </div>
          <FloatingParticles count={30} color="#2997FF" />
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(0deg, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="mb-8 sm:mb-12 inline-flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm" style={{ animation: 'fade-in-down 0.8s ease forwards' }}>
              <span className="w-2 h-2 bg-blue-500 rounded-full" style={{ animation: 'pulse-glow 2s ease-in-out infinite' }} />
              <span className="text-xs sm:text-sm font-medium text-white">Free for Canadians with sight loss</span>
            </div>
            <h1 id="hero-headline" className="text-[clamp(3rem,10vw,8rem)] font-black tracking-tighter leading-none mb-6 text-white" style={{ animation: 'fade-in-up 0.8s ease 0.2s both' }}>
              Build something.{' '}
              <span className="font-light" style={{ backgroundImage: 'linear-gradient(90deg, #5AC8FA, #BF5AF2)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>On your terms.</span>
            </h1>
            <p className="text-base sm:text-xl text-gray-400 mb-12 sm:mb-16 max-w-2xl mx-auto leading-relaxed" style={{ animation: 'fade-in-up 0.8s ease 0.4s both' }}>
              24 lessons that take you from &quot;I have an idea&quot; to your first paying customer. Built specifically for blind and low-vision Canadians who are done waiting for permission.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6" style={{ animation: 'fade-in-up 0.8s ease 0.6s both' }}>
              <Link href="/auth" className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 w-full sm:w-auto text-center overflow-hidden">
                <span className="relative z-10">Start the course &rarr;</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link href="#curriculum" className="px-6 sm:px-8 py-3 sm:py-4 text-white font-semibold rounded-full border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all backdrop-blur-sm active:scale-95 w-full sm:w-auto text-center">
                See what you&apos;ll learn
              </Link>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden sm:flex flex-col items-center gap-4" style={{ animation: 'bounce 2s infinite' }}>
            <div className="w-8 h-12 rounded-full border border-white/30 flex items-center justify-center">
              <div className="w-1 h-2 bg-white/50 rounded-full" style={{ animation: 'scroll-dot 2s ease-in-out infinite' }} />
            </div>
          </div>
        </section>

        {/* ===== THE PROBLEM ===== */}
        <section className="relative bg-black py-20 sm:py-28 px-6 sm:px-8 overflow-hidden" aria-labelledby="problem-heading">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.12 }}>
            <div className="absolute w-[600px] h-[600px] rounded-full" style={{ background: `conic-gradient(from 0deg, #BF5AF2, #FF453A, #c9a800, #BF5AF2)`, filter: 'blur(150px)', animation: 'spin 20s linear infinite reverse' }} />
          </div>
          <FloatingParticles count={15} color="#BF5AF2" />
          <div className="max-w-4xl mx-auto relative z-10">
            <AnimateIn variant="scale-in" className="text-center mb-12 sm:mb-16">
              <div id="problem-heading" className="text-[clamp(5rem,15vw,10rem)] font-black leading-none mb-4" style={{ backgroundImage: 'linear-gradient(90deg, #2997FF, #BF5AF2, #FF453A)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', animation: 'gradient-shift 4s ease infinite', backgroundSize: '200% auto' }}>54%</div>
              <p className="text-lg sm:text-2xl text-gray-400 max-w-2xl mx-auto">of Canadians with sight loss are employed. The other 46% were told no.</p>
            </AnimateIn>
            <div className="max-w-3xl mx-auto space-y-6 text-base sm:text-lg text-gray-400 leading-relaxed">
              <AnimateIn delay={0.1}><p>You know what that looks like. Interviews where someone realizes you can&apos;t see and the energy in the room changes. Applications that go nowhere. Being told you&apos;re &quot;inspiring&quot; but not getting the callback.</p></AnimateIn>
              <AnimateIn delay={0.2}><p>This course exists because waiting for someone else to give you a shot is a losing strategy. The fastest path to income, independence, and respect is building something yourself. And you already have everything you need to start.</p></AnimateIn>
              <AnimateIn delay={0.3}><p className="text-white font-semibold text-lg sm:text-xl">So we built a course that takes you there. Step by step. Lesson by lesson. From &quot;I have an idea&quot; to your first paying customer.</p></AnimateIn>
            </div>
          </div>
        </section>

        {/* ===== STATS BAR ===== */}
        <section className="relative border-t border-b border-white/10 py-12 sm:py-16 px-6 sm:px-8 overflow-hidden" aria-labelledby="stats-heading">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-green-500/5" />
          <div className="max-w-7xl mx-auto relative z-10">
            <h2 id="stats-heading" className="sr-only">Course statistics</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-24">
              <AnimateIn delay={0} className="text-center"><AnimatedCounter target={24} /><p className="text-xs sm:text-sm uppercase tracking-wider text-gray-500 font-medium">Lessons</p></AnimateIn>
              <AnimateIn delay={0.15} className="text-center"><AnimatedCounter target={6} /><p className="text-xs sm:text-sm uppercase tracking-wider text-gray-500 font-medium">Modules</p></AnimateIn>
              <AnimateIn delay={0.3} className="text-center"><AnimatedCounter target={42} /><p className="text-xs sm:text-sm uppercase tracking-wider text-gray-500 font-medium">Downloadable assets</p></AnimateIn>
              <AnimateIn delay={0.45} className="text-center">
                <div className="text-4xl sm:text-6xl font-black text-white mb-2"><span style={{ backgroundImage: 'linear-gradient(90deg, #30D158, #5AC8FA)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>$0</span></div>
                <p className="text-xs sm:text-sm uppercase tracking-wider text-gray-500 font-medium">Always free</p>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* ===== DETAILED CURRICULUM ===== */}
        <section id="curriculum" className="relative bg-black py-20 sm:py-28 px-6 sm:px-8" aria-labelledby="curriculum-heading">
          <FloatingParticles count={10} color="#5AC8FA" />
          <div className="max-w-7xl mx-auto relative z-10">
            <AnimateIn className="mb-16 sm:mb-20 text-center">
              <h2 id="curriculum-heading" className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4">Everything you&apos;ll learn.</h2>
              <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto">Six modules. 24 lessons. Each one is 15 minutes and ends with something tangible you&apos;ll actually use.</p>
            </AnimateIn>

            <div className="space-y-8 sm:space-y-12">
              {MODULES.map((module, idx) => {
                const color = MODULE_COLORS[module.slug] || '#2997FF';
                const deliverable = MODULE_DELIVERABLES[module.slug] || '';
                const chartPattern = MODULE_CHARTS[module.slug] || 'up';

                return (
                  <AnimateIn key={module.slug} delay={idx * 0.08}>
                    <div className="group rounded-[28px] overflow-hidden transition-all duration-500" style={{ background: `linear-gradient(135deg, ${color}08 0%, rgba(255,255,255,0.01) 100%)`, border: `1px solid ${color}20` }}>
                      {/* Gradient top bar */}
                      <div className="h-1 w-full transition-all duration-500 group-hover:h-1.5" style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }} />
                      <div className="p-8 sm:p-12">
                        {/* Module header */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-8">
                          <div className="flex items-center gap-4 sm:gap-6 flex-1">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-black text-black flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" style={{ backgroundColor: color, boxShadow: `0 0 30px ${color}40` }}>
                              {String(idx + 1).padStart(2, '0')}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color }}>{module.title}</h3>
                              <p className="text-base sm:text-lg text-gray-400 mt-1">{module.subtitle}</p>
                            </div>
                          </div>
                          {/* Module icon + Mini chart */}
                          <div className="flex items-center gap-3">
                            <ModuleVisual slug={module.slug} color={color} />
                            <MiniChart color={color} pattern={chartPattern} />
                          </div>
                        </div>

                        {/* Lesson list */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
                          {module.lessons.map((lesson) => (
                            <div key={lesson.slug} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] transition-all duration-300 hover:translate-x-1" style={{ borderLeft: `2px solid ${color}30` }}>
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5" style={{ backgroundColor: `${color}20`, color }}>{lesson.globalNumber}</div>
                              <div>
                                <p className="text-white font-semibold text-sm sm:text-base">{lesson.title}</p>
                                <p className="text-gray-500 text-xs sm:text-sm mt-1">{lesson.estimatedMinutes} min</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Deliverable */}
                        <div className="flex items-start gap-3 p-4 sm:p-5 rounded-xl border transition-all duration-300 group-hover:scale-[1.01]" style={{ borderColor: `${color}30`, backgroundColor: `${color}08` }}>
                          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          <p className="text-sm sm:text-base text-gray-300"><span className="font-semibold text-white">What you&apos;ll have:</span> {deliverable}</p>
                        </div>
                      </div>
                    </div>
                  </AnimateIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== THE JOURNEY ===== */}
        <section className="bg-white text-black py-20 sm:py-28 px-6 sm:px-8" aria-labelledby="journey-heading">
          <div className="max-w-5xl mx-auto">
            <AnimateIn className="mb-16 sm:mb-20 text-center">
              <h2 id="journey-heading" className="text-4xl sm:text-6xl font-black tracking-tight mb-4">From idea to income.</h2>
              <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto">Here&apos;s what six weeks looks like when you stop waiting and start building.</p>
            </AnimateIn>
            <div className="relative">
              <div className="hidden sm:block absolute left-8 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, #2997FF, #5AC8FA, #c9a800, #BF5AF2, #FF453A, #30D158)' }} />
              <div className="space-y-10 sm:space-y-12">
                {[
                  { week: 'Week 1', title: 'Figure out who needs you', desc: 'You already know things other people don\'t. This week you\'ll find the specific people who\'d pay for that knowledge and figure out if the problem is real.', color: '#2997FF' },
                  { week: 'Week 2', title: 'Design something you can deliver', desc: 'Not a business plan. An actual offer you can sell next month. Designed around your life, your schedule, your tools.', color: '#5AC8FA' },
                  { week: 'Week 3', title: 'Get the money part right', desc: 'Price it so it actually pays you. Figure out what you need to launch and where to find it. Stop guessing, start knowing.', color: '#c9a800' },
                  { week: 'Week 4', title: 'Build a brand that means something', desc: 'Pick a name. Write your story. Set up a simple digital presence that makes people take you seriously.', color: '#BF5AF2' },
                  { week: 'Week 5', title: 'Find customers and close the deal', desc: 'Learn outreach that doesn\'t feel sleazy. Have real conversations. Get to the ask. Make your first sale.', color: '#FF453A' },
                  { week: 'Week 6', title: 'Launch and keep going', desc: 'Ship it publicly. Collect feedback. Build the systems that let you grow without burning out.', color: '#30D158' },
                ].map((item, i) => (
                  <AnimateIn key={i} variant="slide-right" delay={i * 0.1}>
                    <div className="flex gap-6 sm:gap-8 items-start group">
                      <div className="flex-shrink-0 relative z-10">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" style={{ backgroundColor: item.color, boxShadow: `0 0 20px ${item.color}30` }}>
                          {item.week.replace('Week ', 'W')}
                        </div>
                      </div>
                      <div className="pt-1">
                        <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-2">{item.title}</h3>
                        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== BUILT DIFFERENT ===== */}
        <section className="relative bg-black py-20 sm:py-28 px-6 sm:px-8 overflow-hidden" aria-labelledby="different-heading">
          <FloatingParticles count={12} color="#30D158" />
          <div className="max-w-7xl mx-auto relative z-10">
            <AnimateIn className="mb-16 sm:mb-20 text-center">
              <h2 id="different-heading" className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4">This isn&apos;t another business course.</h2>
              <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto">There are thousands of entrepreneurship programs. Here&apos;s why this one is different.</p>
            </AnimateIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <AnimateIn delay={0}>
                <div className="group rounded-[28px] overflow-hidden transition-all duration-500 hover:-translate-y-2 h-full" style={{ background: 'linear-gradient(135deg, rgba(41, 151, 255, 0.08) 0%, rgba(41, 151, 255, 0.02) 100%)', border: '1px solid rgba(41, 151, 255, 0.2)' }}>
                  <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #2997FF, #5AC8FA)' }} />
                  <div className="p-8 sm:p-10">
                    <AccessibilityVisual />
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-3 tracking-tight mt-6">Accessible from scratch</h3>
                    <p className="text-base text-gray-400 leading-relaxed">
                      Not retrofitted. Not &quot;we added alt text.&quot; Every lesson, every template, every download was built to work with screen readers, magnification, and assistive tech from day one.
                    </p>
                  </div>
                </div>
              </AnimateIn>

              <AnimateIn delay={0.15}>
                <div className="group rounded-[28px] overflow-hidden transition-all duration-500 hover:-translate-y-2 h-full" style={{ background: 'linear-gradient(135deg, rgba(191, 90, 242, 0.08) 0%, rgba(191, 90, 242, 0.02) 100%)', border: '1px solid rgba(191, 90, 242, 0.2)' }}>
                  <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #BF5AF2, #5AC8FA)' }} />
                  <div className="p-8 sm:p-10">
                    <HeritageVisual />
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-3 tracking-tight mt-6">Backed by CNIB</h3>
                    <p className="text-base text-gray-400 leading-relaxed">
                      CNIB has served the blind and low-vision community in Canada for over 100 years. This course is part of a larger mission: proving that sight loss is not a barrier to building something real.
                    </p>
                  </div>
                </div>
              </AnimateIn>

              <AnimateIn delay={0.3}>
                <div className="group rounded-[28px] overflow-hidden transition-all duration-500 hover:-translate-y-2 h-full" style={{ background: 'linear-gradient(135deg, rgba(48, 209, 88, 0.08) 0%, rgba(48, 209, 88, 0.02) 100%)', border: '1px solid rgba(48, 209, 88, 0.2)' }}>
                  <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #30D158, #5AC8FA)' }} />
                  <div className="p-8 sm:p-10">
                    <PriceVisual />
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-3 tracking-tight mt-6">Free. No catch.</h3>
                    <p className="text-base text-gray-400 leading-relaxed">
                      Not a free trial. Not freemium. Not &quot;free but upgrade for the good stuff.&quot; Every lesson, every template, every asset is yours. No credit card, no paywall, no upsell.
                    </p>
                  </div>
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section id="how-it-works" className="relative bg-[#111] py-20 sm:py-28 px-6 sm:px-8 overflow-hidden" aria-labelledby="process-heading">
          <div className="max-w-5xl mx-auto relative z-10">
            <AnimateIn>
              <h2 id="process-heading" className="text-4xl sm:text-6xl font-black text-white tracking-tight text-center mb-16 sm:mb-20">How it works</h2>
            </AnimateIn>

            <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 w-3/4 h-px" style={{ background: 'linear-gradient(90deg, #2997FF30, #c9a80030, #30D15830, #BF5AF230)' }} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
              {[
                { num: '01', title: 'Sign up in 30 seconds', desc: 'Name, email, go. Works with screen readers from the first click.', color: '#2997FF' },
                { num: '02', title: 'Learn on your schedule', desc: '15-minute lessons. No live sessions. No group work. Just you and the material, whenever it works.', color: '#c9a800' },
                { num: '03', title: 'Build something real', desc: 'Every lesson ends with a deliverable. Templates, worksheets, frameworks. Stuff you\'ll use, not busywork.', color: '#30D158' },
                { num: '04', title: 'Get your first customer', desc: 'The finish line isn\'t a certificate. It\'s a sale.', color: '#BF5AF2' },
              ].map((step, i) => (
                <AnimateIn key={step.num} delay={i * 0.12}>
                  <div className="group text-center">
                    <StepRing number={step.num} color={step.color} delay={i * 0.2} />
                    <h3 className="text-lg sm:text-xl font-black text-white mb-2">{step.title}</h3>
                    <p className="text-sm sm:text-base text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* ===== MANIFESTO / QUOTE ===== */}
        <section className="relative bg-black py-24 sm:py-32 px-6 sm:px-8 overflow-hidden" aria-labelledby="manifesto-quote">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.15 }}>
            <div className="absolute w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, #2997FF 0%, transparent 70%)', filter: 'blur(80px)', animation: 'pulse-slow 4s ease-in-out infinite' }} />
          </div>
          <AnimateIn variant="scale-in">
            <div className="max-w-3xl mx-auto text-center relative z-10">
              <blockquote>
                <p id="manifesto-quote" className="text-2xl sm:text-4xl font-black text-white leading-tight tracking-tight mb-8">
                  &quot;The biggest disability in the world is being told you can&apos;t. This course is for everyone who got{' '}
                  <span className="font-light" style={{ backgroundImage: 'linear-gradient(90deg, #5AC8FA, #BF5AF2)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>tired of asking</span>{' '}
                  and decided to build their own answer.&quot;
                </p>
              </blockquote>
              <div className="text-gray-500 text-sm sm:text-base">The Venture Collective, a CNIB initiative</div>
            </div>
          </AnimateIn>
        </section>

        {/* ===== LESSON PREVIEW ===== */}
        <section className="relative bg-[#0A0A0A] py-20 sm:py-28 px-6 sm:px-8 border-t border-b border-white/5 overflow-hidden" aria-labelledby="preview-heading">
          <div className="max-w-4xl mx-auto relative z-10">
            <AnimateIn className="text-center mb-12 sm:mb-16">
              <h2 id="preview-heading" className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">Here&apos;s what Lesson 1 looks like.</h2>
              <p className="text-base sm:text-lg text-gray-500">No signup required to see what you&apos;re getting.</p>
            </AnimateIn>
            <AnimateIn variant="scale-in" delay={0.15}>
              <div className="group rounded-[28px] overflow-hidden bg-white/[0.03] hover:border-blue-500/30 transition-all duration-500" style={{ border: '1px solid rgba(41, 151, 255, 0.15)' }}>
                <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #2997FF, #5AC8FA, #2997FF)' }} />
                <div className="p-6 sm:p-8 border-b border-white/10 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: '#2997FF20', color: '#2997FF', boxShadow: '0 0 20px #2997FF20' }}>01</div>
                  <div>
                    <p className="text-white font-bold text-lg">Who Do You Want to Help?</p>
                    <p className="text-gray-500 text-sm">Module 1: DISCOVER &middot; 15 minutes</p>
                  </div>
                </div>
                <div className="p-6 sm:p-10 space-y-5 text-gray-300 leading-relaxed">
                  <p className="text-base sm:text-lg">Every business starts with a person. Not a product, not an app, not a website. A person with a problem they&apos;d pay to solve.</p>
                  <p className="text-base sm:text-lg">In this lesson, you&apos;ll stop thinking about &quot;business ideas&quot; and start thinking about people. Specifically: who do you already understand better than most? What community are you part of? What problems have you solved in your own life that other people are still stuck on?</p>
                  <p className="text-sm text-gray-500 italic">The full lesson continues with exercises, examples, and a downloadable worksheet...</p>
                </div>
                <div className="p-6 sm:p-8 border-t border-white/10 flex justify-center">
                  <Link href="/auth" className="group/btn relative px-6 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-all active:scale-95 text-sm overflow-hidden">
                    <span className="relative z-10">Sign up to read the full lesson</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  </Link>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* ===== FINAL CTA ===== */}
        <section className="relative bg-black py-20 sm:py-28 px-6 sm:px-8 overflow-hidden" aria-labelledby="final-cta-heading">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(41, 151, 255, 0.15) 0%, transparent 70%)', filter: 'blur(40px)', animation: 'pulse-slow 5s ease-in-out infinite' }} />
          <FloatingParticles count={20} color="#2997FF" />
          <AnimateIn variant="scale-in">
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <h2 id="final-cta-heading" className="text-4xl sm:text-7xl font-black text-white tracking-tight mb-2">
                You&apos;ve waited{' '}
                <span style={{ backgroundImage: 'linear-gradient(90deg, #2997FF, #BF5AF2)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>long enough.</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto">24 lessons. 42 downloadable assets. Your first paying customer. All free. The only thing between you and your first dollar is starting.</p>
              <Link href="/auth" className="group relative inline-block px-8 sm:px-12 py-4 sm:py-5 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-all active:scale-95 text-lg overflow-hidden">
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
