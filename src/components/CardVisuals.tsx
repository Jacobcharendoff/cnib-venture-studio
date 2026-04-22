'use client';

import { useEffect, useRef, useState } from 'react';

// ── Accessibility Radar Visual ──
// Animated concentric rings pulsing outward like a radar scan
export function AccessibilityVisual() {
  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden" aria-hidden="true">
      {/* Pulsing rings */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border border-blue-500/30"
          style={{
            width: `${(i + 1) * 60}px`,
            height: `${(i + 1) * 60}px`,
            animation: `radar-pulse 3s ease-out ${i * 0.5}s infinite`,
          }}
        />
      ))}
      {/* Center eye icon */}
      <div className="relative z-10 w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center" style={{ boxShadow: '0 0 30px rgba(41, 151, 255, 0.3)' }}>
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="#2997FF" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </div>
      {/* Scan line */}
      <div
        className="absolute h-px w-full bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"
        style={{ animation: 'scan-line 3s ease-in-out infinite' }}
      />
      <style>{`
        @keyframes radar-pulse {
          0% { transform: scale(0.3); opacity: 0.6; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        @keyframes scan-line {
          0%, 100% { transform: translateY(-30px); opacity: 0; }
          50% { transform: translateY(30px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ── CNIB Heritage Visual ──
// Animated circular progress ring with "100+" years
export function HeritageVisual() {
  const { ref, isVisible } = useSimpleInView();

  return (
    <div ref={ref} className="relative w-full h-40 flex items-center justify-center" aria-hidden="true">
      <svg width="120" height="120" viewBox="0 0 120 120" className="transform -rotate-90">
        {/* Background ring */}
        <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(191, 90, 242, 0.1)" strokeWidth="6" />
        {/* Animated progress ring */}
        <circle
          cx="60" cy="60" r="50" fill="none" stroke="url(#purple-gradient)" strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="314"
          strokeDashoffset={isVisible ? '0' : '314'}
          style={{ transition: 'stroke-dashoffset 2s ease-out' }}
        />
        <defs>
          <linearGradient id="purple-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#BF5AF2" />
            <stop offset="100%" stopColor="#5AC8FA" />
          </linearGradient>
        </defs>
      </svg>
      {/* Center text */}
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-black text-white">100+</span>
        <span className="text-xs text-purple-400 font-medium uppercase tracking-wider">Years</span>
      </div>
      {/* Orbiting dot */}
      <div
        className="absolute w-2 h-2 rounded-full bg-purple-400"
        style={{
          animation: 'orbit 4s linear infinite',
          boxShadow: '0 0 10px #BF5AF2',
        }}
      />
      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(50px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}

// ── Price Comparison Visual ──
// Animated bar chart: competitors vs. $0
export function PriceVisual() {
  const { ref, isVisible } = useSimpleInView();

  const bars = [
    { label: 'Them', price: 499, height: 70, color: 'rgba(255, 255, 255, 0.1)' },
    { label: 'Them', price: 299, height: 50, color: 'rgba(255, 255, 255, 0.08)' },
    { label: 'Them', price: 799, height: 90, color: 'rgba(255, 255, 255, 0.12)' },
    { label: 'TVC', price: 0, height: 4, color: '#30D158', isUs: true },
  ];

  return (
    <div ref={ref} className="relative w-full h-40 flex items-end justify-center gap-4 px-4 pb-6 pt-2" aria-hidden="true">
      {bars.map((bar, i) => (
        <div key={i} className="flex flex-col items-center gap-2 flex-1">
          {/* Price label */}
          <span className={`text-xs font-bold ${bar.isUs ? 'text-green-400' : 'text-gray-600'}`}>
            ${bar.price}
          </span>
          {/* Bar */}
          <div
            className="w-full rounded-t-lg transition-all duration-1000 ease-out"
            style={{
              height: isVisible ? `${bar.height}px` : '0px',
              backgroundColor: bar.color,
              transitionDelay: `${i * 0.15}s`,
              boxShadow: bar.isUs ? '0 0 20px rgba(48, 209, 88, 0.4)' : 'none',
            }}
          />
          {/* Label */}
          <span className={`text-[10px] font-semibold uppercase tracking-wider ${bar.isUs ? 'text-green-400' : 'text-gray-600'}`}>
            {bar.label}
          </span>
        </div>
      ))}
      {/* Zero line */}
      <div className="absolute bottom-6 left-0 right-0 h-px bg-white/5" />
    </div>
  );
}

// ── Step Progress Ring ──
// Circular ring for "How it works" steps
export function StepRing({ number, color, delay = 0 }: { number: string; color: string; delay?: number }) {
  const { ref, isVisible } = useSimpleInView();

  return (
    <div ref={ref} className="relative w-20 h-20 mx-auto mb-5">
      <svg width="80" height="80" viewBox="0 0 80 80" className="transform -rotate-90">
        {/* Background */}
        <circle cx="40" cy="40" r="34" fill="none" stroke={`${color}15`} strokeWidth="3" />
        {/* Animated arc */}
        <circle
          cx="40" cy="40" r="34" fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="213"
          strokeDashoffset={isVisible ? '53' : '213'}
          style={{ transition: `stroke-dashoffset 1.2s ease-out ${delay}s` }}
        />
      </svg>
      {/* Number */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-black" style={{ color }}>{number}</span>
      </div>
    </div>
  );
}

// ── Mini Chart for Module Cards ──
// Small animated line chart that draws in
export function MiniChart({ color, pattern = 'up' }: { color: string; pattern?: 'up' | 'wave' | 'spike' }) {
  const { ref, isVisible } = useSimpleInView();

  const paths: Record<string, string> = {
    up: 'M0,40 Q15,35 25,30 T50,20 T75,10 T100,5',
    wave: 'M0,25 Q15,10 30,25 T60,25 T90,15 T100,10',
    spike: 'M0,35 L20,30 L40,35 L55,10 L70,20 L85,5 L100,8',
  };

  return (
    <div ref={ref} className="w-16 h-8 flex-shrink-0" aria-hidden="true">
      <svg viewBox="0 0 100 45" className="w-full h-full" preserveAspectRatio="none">
        <path
          d={paths[pattern]}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="200"
          strokeDashoffset={isVisible ? '0' : '200'}
          style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
        />
        {/* Glow version underneath */}
        <path
          d={paths[pattern]}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.2"
          strokeDasharray="200"
          strokeDashoffset={isVisible ? '0' : '200'}
          style={{ transition: 'stroke-dashoffset 1.5s ease-out', filter: 'blur(3px)' }}
        />
      </svg>
    </div>
  );
}

// Simple inView hook (avoids importing from page)
function useSimpleInView() {
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
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
