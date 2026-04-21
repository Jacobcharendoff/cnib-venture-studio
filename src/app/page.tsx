'use client';

import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ModuleCard from '@/components/ModuleCard';
import { MODULES } from '@/lib/course-data';

const MODULE_GRADIENTS: Record<string, string> = {
  discover: 'linear-gradient(160deg, #040d1a 0%, #0d3b66 40%, #2997FF 100%)',
  design: 'linear-gradient(160deg, #041a22 0%, #0c5a70 40%, #5AC8FA 100%)',
  money: 'linear-gradient(160deg, #1a1600 0%, #5a4d00 40%, #c9a800 100%)',
  brand: 'linear-gradient(160deg, #120628 0%, #4a1a8f 40%, #BF5AF2 100%)',
  sell: 'linear-gradient(160deg, #1a0505 0%, #7a1a1a 40%, #FF453A 100%)',
  launch: 'linear-gradient(160deg, #041a0a 0%, #1a6b30 40%, #30D158 100%)',
};

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
          {/* Animated conic-gradient orb background */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              opacity: 0.35,
            }}
          >
            <div
              className="absolute w-[700px] h-[700px] rounded-full"
              style={{
                background: `conic-gradient(from 0deg, #2997FF, #5AC8FA, #c9a800, #BF5AF2, #FF453A, #30D158, #2997FF)`,
                filter: 'blur(120px)',
                animation: 'spin 12s linear infinite',
              }}
            />
          </div>

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(0deg, rgba(255,255,255,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="mb-8 sm:mb-12 inline-flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-xs sm:text-sm font-medium text-white">
                Free for Canadians with sight loss
              </span>
            </div>

            {/* Main headline */}
            <h1
              id="hero-headline"
              className="text-[clamp(3rem,10vw,8rem)] font-black tracking-tighter leading-none mb-4 text-white"
            >
              Build something.{' '}
              <span className="text-gray-400 font-light">
                On your terms.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-gray-400 mb-12 sm:mb-16 max-w-2xl mx-auto leading-relaxed">
              You don&apos;t need anyone&apos;s permission to start. 24 free lessons for blind and low-vision Canadians ready to build a real business.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link
                href="/auth"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 w-full sm:w-auto text-center"
              >
                Start the course →
              </Link>
              <Link
                href="#modules"
                className="px-6 sm:px-8 py-3 sm:py-4 text-white font-semibold rounded-full border border-white/20 hover:bg-white/10 transition-all backdrop-blur-sm active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 w-full sm:w-auto text-center"
              >
                Explore modules
              </Link>
            </div>
          </div>

          {/* Scroll indicator - hidden on mobile to avoid overlap */}
          <div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden sm:flex flex-col items-center gap-4"
            style={{
              animation: 'bounce 2s infinite',
            }}
          >
            <div className="w-8 h-12 rounded-full border border-white/30 flex items-center justify-center">
              <div className="w-1 h-2 bg-white/50 rounded-full" />
            </div>
          </div>

          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes bounce {
              0%, 100% { transform: translateX(-50%) translateY(0); }
              50% { transform: translateX(-50%) translateY(-10px); }
            }
          `}</style>
        </section>

        {/* ===== STATS BAR ===== */}
        <section
          className="border-t border-b border-white/10 py-12 sm:py-16 px-6 sm:px-8"
          aria-labelledby="stats-heading"
        >
          <div className="max-w-7xl mx-auto">
            <h2 id="stats-heading" className="sr-only">
              Course statistics
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-24">
              <div className="text-center">
                <div className="text-4xl sm:text-6xl font-black text-white mb-2">
                  24
                </div>
                <p className="text-xs sm:text-sm uppercase tracking-wider text-gray-500 font-medium">
                  Lessons
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl sm:text-6xl font-black text-white mb-2">
                  6
                </div>
                <p className="text-xs sm:text-sm uppercase tracking-wider text-gray-500 font-medium">
                  Modules
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl sm:text-6xl font-black text-white mb-2">
                  42
                </div>
                <p className="text-xs sm:text-sm uppercase tracking-wider text-gray-500 font-medium">
                  Downloadable assets
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl sm:text-6xl font-black text-white mb-2">
                  $0
                </div>
                <p className="text-xs sm:text-sm uppercase tracking-wider text-gray-500 font-medium">
                  Always free
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== OUTCOMES SECTION ===== */}
        <section
          className="bg-white text-black py-20 sm:py-28 px-6 sm:px-8"
          aria-labelledby="outcomes-heading"
        >
          <div className="max-w-7xl mx-auto">
            {/* Heading */}
            <div className="mb-16 sm:mb-20 text-center">
              <h2
                id="outcomes-heading"
                className="text-4xl sm:text-6xl font-black tracking-tight mb-2"
              >
                What you&apos;ll walk away with.
              </h2>
            </div>

            {/* Bento Grid - Tailwind responsive classes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Card 1: Find your people - spans 2 rows on md+ */}
              <div className="rounded-[28px] p-10 sm:p-12 bg-[#F5F5F7] hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-between md:row-span-2">
                <div>
                  <div className="relative mb-8 flex-shrink-0">
                    <svg viewBox="0 0 72 72" className="w-16 h-16 sm:w-20 sm:h-20" fill="none">
                      <circle cx="20" cy="24" r="8" fill="#2997FF" />
                      <circle cx="36" cy="20" r="8" fill="#5AC8FA" />
                      <circle cx="52" cy="24" r="8" fill="#2997FF" />
                      <path d="M 12 40 Q 12 36 20 36 Q 28 36 28 40 L 28 48 Q 28 52 20 52 Q 12 52 12 48 Z" fill="#2997FF" />
                      <path d="M 28 36 Q 28 32 36 32 Q 44 32 44 36 L 44 48 Q 44 52 36 52 Q 28 52 28 48 Z" fill="#5AC8FA" />
                      <path d="M 44 40 Q 44 36 52 36 Q 60 36 60 40 L 60 48 Q 60 52 52 52 Q 44 52 44 48 Z" fill="#2997FF" />
                    </svg>
                    <div className="absolute top-0 right-0 text-[8rem] sm:text-[10rem] font-black text-black opacity-5 leading-none pointer-events-none">
                      01
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black mb-4 tracking-tight">
                    Find people who need what you&apos;ve got
                  </h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    You already know things other people don&apos;t. You&apos;ve solved problems most haven&apos;t thought about. This module helps you find the people who&apos;ll pay for that knowledge and experience.
                  </p>
                </div>
              </div>

              {/* Card 2: Build your offer */}
              <div className="rounded-[28px] p-10 sm:p-12 bg-[#E8F4FF] hover:scale-[1.02] transition-transform duration-300 flex flex-col">
                <div className="relative mb-8 flex-shrink-0">
                  <svg viewBox="0 0 72 72" className="w-16 h-16 sm:w-20 sm:h-20" fill="none">
                    <rect x="12" y="18" width="48" height="36" rx="2" stroke="#5AC8FA" strokeWidth="2" fill="none" />
                    <path d="M 12 28 L 36 18 L 60 28" stroke="#5AC8FA" strokeWidth="2" fill="none" />
                    <line x1="36" y1="18" x2="36" y2="54" stroke="#5AC8FA" strokeWidth="2" />
                  </svg>
                  <div className="absolute top-0 right-0 text-[8rem] sm:text-[10rem] font-black text-black opacity-5 leading-none pointer-events-none">
                    02
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black mb-4 tracking-tight">
                  Design an offer that works for your life
                </h3>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  Build something you can deliver on your schedule. Not a 9-to-5 that needs someone else&apos;s office, someone else&apos;s tools, someone else&apos;s permission.
                </p>
              </div>

              {/* Card 3: Make real money */}
              <div className="rounded-[28px] p-10 sm:p-12 bg-[#FFF8E1] hover:scale-[1.02] transition-transform duration-300 flex flex-col">
                <div className="relative mb-8 flex-shrink-0">
                  <svg viewBox="0 0 72 72" className="w-16 h-16 sm:w-20 sm:h-20" fill="none">
                    <path d="M 36 12 L 36 60 M 28 18 L 44 18 Q 44 24 36 24 Q 28 24 28 30 L 44 30" stroke="#c9a800" strokeWidth="2" fill="none" />
                    <polyline points="18,54 28,42 38,50 54,30" stroke="#c9a800" strokeWidth="2" fill="none" />
                    <circle cx="54" cy="30" r="2" fill="#c9a800" />
                  </svg>
                  <div className="absolute top-0 right-0 text-[8rem] sm:text-[10rem] font-black text-black opacity-5 leading-none pointer-events-none">
                    03
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black mb-4 tracking-tight">
                  Get the money part right
                </h3>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  Price your work so it actually pays you. Figure out what you need to launch, where to find it, and how to stop leaving money on the table.
                </p>
              </div>

              {/* Card 4: Make your first sale - spans both columns on md+ */}
              <div className="rounded-[28px] p-10 sm:p-12 bg-[#1D1D1F] text-white hover:scale-[1.02] transition-transform duration-300 flex flex-col md:col-span-2">
                <div className="relative mb-8 flex-shrink-0">
                  <svg viewBox="0 0 72 72" className="w-16 h-16 sm:w-20 sm:h-20" fill="none">
                    <path d="M 36 12 L 42 36 L 36 42 L 30 36 Z" fill="#30D158" />
                    <path d="M 24 48 L 30 36" stroke="#30D158" strokeWidth="2" />
                    <path d="M 48 48 L 42 36" stroke="#30D158" strokeWidth="2" />
                    <circle cx="20" cy="54" r="4" fill="#30D158" />
                    <circle cx="52" cy="54" r="4" fill="#30D158" />
                    <line x1="36" y1="42" x2="36" y2="60" stroke="#30D158" strokeWidth="2" />
                  </svg>
                  <div className="absolute top-0 right-0 text-[8rem] sm:text-[10rem] font-black text-white opacity-5 leading-none pointer-events-none">
                    04
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black mb-4 tracking-tight">
                  Make your first sale
                </h3>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl">
                  Not a theoretical customer. A real person who pays you real money for something you built. By lesson 24, you&apos;ll have a business, not a business plan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== MODULES SECTION ===== */}
        <section
          id="modules"
          className="bg-black py-20 sm:py-28 px-6 sm:px-8"
          aria-labelledby="modules-heading"
        >
          <div className="max-w-7xl mx-auto">
            {/* Heading */}
            <div className="mb-16 sm:mb-20 text-center">
              <h2
                id="modules-heading"
                className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4"
              >
                The curriculum
              </h2>
              <p className="text-lg sm:text-xl text-gray-500">
                Six modules that take you from &quot;I have an idea&quot; to &quot;I just got paid&quot;
              </p>
            </div>

            {/* Big cards (first 2 modules) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
              {MODULES.slice(0, 2).map((module, idx) => (
                <ModuleCard
                  key={module.slug}
                  module={module}
                  size="big"
                  gradient={MODULE_GRADIENTS[module.slug]}
                  watermarkNumber={String(idx + 1).padStart(2, '0')}
                />
              ))}
            </div>

            {/* Small cards (remaining 4 modules) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {MODULES.slice(2).map((module, idx) => (
                <ModuleCard
                  key={module.slug}
                  module={module}
                  size="small"
                  gradient={MODULE_GRADIENTS[module.slug]}
                  watermarkNumber={String(idx + 3).padStart(2, '0')}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ===== PROCESS SECTION ===== */}
        <section
          id="how-it-works"
          className="bg-black py-20 sm:py-28 px-6 sm:px-8"
          aria-labelledby="process-heading"
        >
          <div className="max-w-7xl mx-auto">
            {/* Heading */}
            <h2
              id="process-heading"
              className="text-4xl sm:text-6xl font-black text-white tracking-tight text-center mb-16 sm:mb-20"
            >
              How it works
            </h2>

            {/* Steps */}
            <div className="flex flex-col sm:flex-row items-stretch justify-between gap-8 sm:gap-6 relative">
              {/* Connecting line background (only on larger screens) */}
              <div
                className="hidden sm:block absolute top-20 left-[10%] right-[10%] h-1 -z-10"
                style={{
                  background: 'linear-gradient(90deg, #2997FF, #c9a800, #30D158, #BF5AF2)',
                  opacity: 0.3,
                }}
              />

              {/* Step 1 */}
              <div className="flex flex-col items-center text-center flex-1">
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-6 relative z-10 border-4"
                  style={{
                    borderColor: '#2997FF',
                    background: 'rgba(41, 151, 255, 0.1)',
                  }}
                >
                  <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="#2997FF" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 110 8 4 4 0 010-8z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-3">
                  Sign up in 30 seconds
                </h3>
                <p className="text-sm sm:text-base text-gray-500">
                  Just your email. Fully accessible. Built to work with screen readers from day one.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center flex-1">
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-6 relative z-10 border-4"
                  style={{
                    borderColor: '#c9a800',
                    background: 'rgba(201, 168, 0, 0.1)',
                  }}
                >
                  <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="#c9a800" strokeWidth="2">
                    <circle cx="12" cy="12" r="1" />
                    <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 0l4.24-4.24M1 12h6m6 0h6m-17.78 7.78l4.24-4.24m5.08 0l4.24 4.24" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-3">
                  Learn when it works for you
                </h3>
                <p className="text-sm sm:text-base text-gray-500">
                  15-minute lessons. No live sessions to schedule around. No group work that depends on someone else&apos;s timeline.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center flex-1">
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-6 relative z-10 border-4"
                  style={{
                    borderColor: '#30D158',
                    background: 'rgba(48, 209, 88, 0.1)',
                  }}
                >
                  <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="#30D158" strokeWidth="2">
                    <polyline points="12 1 22 8 22 16 12 23 2 16 2 8 12 1" />
                    <polyline points="2 8 12 14 22 8" />
                    <polyline points="12 14 12 23" />
                    <polyline points="22 12 12 18 2 12" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-3">
                  Build something real each week
                </h3>
                <p className="text-sm sm:text-base text-gray-500">
                  Every lesson ends with something tangible. Not a reflection exercise. Actual business assets you&apos;ll use.
                </p>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center flex-1">
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-6 relative z-10 border-4"
                  style={{
                    borderColor: '#BF5AF2',
                    background: 'rgba(191, 90, 242, 0.1)',
                  }}
                >
                  <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="#BF5AF2" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-3">
                  Get your first customer
                </h3>
                <p className="text-sm sm:text-base text-gray-500">
                  The finish line isn&apos;t a certificate. It&apos;s a sale.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== MANIFESTO SECTION ===== */}
        <section
          className="relative bg-black py-20 sm:py-28 px-6 sm:px-8 overflow-hidden"
          aria-labelledby="manifesto-quote"
        >
          {/* Background orb */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              opacity: 0.15,
            }}
          >
            <div
              className="absolute w-[600px] h-[600px] rounded-full"
              style={{
                background: `conic-gradient(from 0deg, #BF5AF2, #FF453A, #c9a800, #BF5AF2)`,
                filter: 'blur(150px)',
              }}
            />
          </div>

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <blockquote className="text-2xl sm:text-5xl font-black text-white leading-tight tracking-tight">
              54% of Canadians with sight loss are employed.{' '}
              <span className="text-gray-500 font-light">
                The other 46% were told no.
              </span>{' '}
              This course is for everyone who got{' '}
              <span
                style={{
                  backgroundImage: 'linear-gradient(90deg, #2997FF, #BF5AF2, #FF453A)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                tired of asking
              </span>
              .
            </blockquote>
          </div>
        </section>

        {/* ===== FINAL CTA SECTION ===== */}
        <section
          className="relative bg-black py-20 sm:py-28 px-6 sm:px-8 overflow-hidden"
          aria-labelledby="final-cta-heading"
        >
          {/* Radial glow from bottom */}
          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(41, 151, 255, 0.1) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2
              id="final-cta-heading"
              className="text-4xl sm:text-7xl font-black text-white tracking-tight mb-2"
            >
              You&apos;ve waited{' '}
              <span
                style={{
                  backgroundImage: 'linear-gradient(90deg, #2997FF, #5AC8FA)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                long enough.
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto">
              Every module is free. Every lesson is accessible. The only thing between you and your first dollar is starting.
            </p>

            <Link
              href="/auth"
              className="inline-block px-8 sm:px-12 py-4 sm:py-5 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-all active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 text-lg"
            >
              Start the course →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
