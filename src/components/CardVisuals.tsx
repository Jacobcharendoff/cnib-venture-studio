'use client';

import { useEffect, useRef, useState } from 'react';

// ── Accessibility Radar Visual ──
export function AccessibilityVisual() {
  return (
    <div className="relative w-full h-40 flex items-center justify-center overflow-hidden" aria-hidden="true">
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
      <div className="relative z-10 w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center" style={{ boxShadow: '0 0 30px rgba(41, 151, 255, 0.3)' }}>
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="#2997FF" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </div>
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
export function HeritageVisual() {
  const { ref, isVisible } = useSimpleInView();

  return (
    <div ref={ref} className="relative w-full h-40 flex items-center justify-center" aria-hidden="true">
      <svg width="120" height="120" viewBox="0 0 120 120" className="transform -rotate-90">
        <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(191, 90, 242, 0.1)" strokeWidth="6" />
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
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-black text-white">100+</span>
        <span className="text-xs text-purple-400 font-medium uppercase tracking-wider">Years</span>
      </div>
      <div
        className="absolute w-2 h-2 rounded-full bg-purple-400"
        style={{ animation: 'orbit 4s linear infinite', boxShadow: '0 0 10px #BF5AF2' }}
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
          <span className={`text-xs font-bold ${bar.isUs ? 'text-green-400' : 'text-gray-600'}`}>
            ${bar.price}
          </span>
          <div
            className="w-full rounded-t-lg transition-all duration-1000 ease-out"
            style={{
              height: isVisible ? `${bar.height}px` : '0px',
              backgroundColor: bar.color,
              transitionDelay: `${i * 0.15}s`,
              boxShadow: bar.isUs ? '0 0 20px rgba(48, 209, 88, 0.4)' : 'none',
            }}
          />
          <span className={`text-[10px] font-semibold uppercase tracking-wider ${bar.isUs ? 'text-green-400' : 'text-gray-600'}`}>
            {bar.label}
          </span>
        </div>
      ))}
      <div className="absolute bottom-6 left-0 right-0 h-px bg-white/5" />
    </div>
  );
}

// ── Step Progress Ring ──
export function StepRing({ number, color, delay = 0 }: { number: string; color: string; delay?: number }) {
  const { ref, isVisible } = useSimpleInView();

  return (
    <div ref={ref} className="relative w-20 h-20 mx-auto mb-5">
      <svg width="80" height="80" viewBox="0 0 80 80" className="transform -rotate-90">
        <circle cx="40" cy="40" r="34" fill="none" stroke={`${color}15`} strokeWidth="3" />
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
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-black" style={{ color }}>{number}</span>
      </div>
    </div>
  );
}

// ── Mini Chart for Module Cards ──
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

// ── Per-Module Animated Visuals ──

// DISCOVER: Magnifying glass with scanning pulse
export function DiscoverVisual({ color }: { color: string }) {
  const { ref, isVisible } = useSimpleInView();
  return (
    <div ref={ref} className="relative w-12 h-12 flex items-center justify-center" aria-hidden="true">
      <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
        {/* Pulse rings */}
        <circle cx="20" cy="20" r="16" stroke={color} strokeWidth="1" opacity="0.15">
          <animate attributeName="r" values="12;18;12" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0.05;0.2" dur="3s" repeatCount="indefinite" />
        </circle>
        {/* Glass circle */}
        <circle
          cx="20" cy="20" r="10" stroke={color} strokeWidth="2.5"
          strokeDasharray="63"
          strokeDashoffset={isVisible ? '0' : '63'}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
        {/* Handle */}
        <line
          x1="28" y1="28" x2="38" y2="38" stroke={color} strokeWidth="2.5" strokeLinecap="round"
          strokeDasharray="15"
          strokeDashoffset={isVisible ? '0' : '15'}
          style={{ transition: 'stroke-dashoffset 0.8s ease-out 0.5s' }}
        />
        {/* Sparkle dot */}
        <circle cx="16" cy="16" r="1.5" fill={color} opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

// DESIGN: Pencil with ruler/grid lines
export function DesignVisual({ color }: { color: string }) {
  const { ref, isVisible } = useSimpleInView();
  return (
    <div ref={ref} className="relative w-12 h-12 flex items-center justify-center" aria-hidden="true">
      <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
        {/* Grid dots */}
        {[12, 24, 36].map((x) =>
          [12, 24, 36].map((y) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="1" fill={color} opacity="0.2" />
          ))
        )}
        {/* Pencil body */}
        <path
          d="M10 38L34 14l4 4L14 42z" stroke={color} strokeWidth="2" strokeLinejoin="round"
          strokeDasharray="80"
          strokeDashoffset={isVisible ? '0' : '80'}
          style={{ transition: 'stroke-dashoffset 1.2s ease-out' }}
        />
        {/* Pencil tip */}
        <path
          d="M10 38l-2 6 6-2z" fill={color} opacity={isVisible ? 0.8 : 0}
          style={{ transition: 'opacity 0.5s ease-out 0.8s' }}
        />
        {/* Edit indicator line */}
        <line x1="34" y1="14" x2="38" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite" />
        </line>
      </svg>
    </div>
  );
}

// MONEY: Dollar sign with rising bars
export function MoneyVisual({ color }: { color: string }) {
  const { ref, isVisible } = useSimpleInView();
  return (
    <div ref={ref} className="relative w-12 h-12 flex items-center justify-center" aria-hidden="true">
      <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
        {/* Rising bars behind */}
        {[8, 18, 28, 38].map((x, i) => (
          <rect
            key={x}
            x={x - 3} y={isVisible ? 36 - (i + 1) * 7 : 36} width="6" rx="1.5"
            height={isVisible ? (i + 1) * 7 : 0}
            fill={color}
            opacity={0.12 + i * 0.06}
            style={{ transition: `all 0.8s ease-out ${i * 0.15}s` }}
          />
        ))}
        {/* Dollar sign */}
        <text
          x="24" y="28" textAnchor="middle" fontSize="18" fontWeight="900"
          fill={color}
          opacity={isVisible ? 1 : 0}
          style={{ transition: 'opacity 0.6s ease-out 0.4s' }}
        >$</text>
        {/* Upward arrow */}
        <path
          d="M38 12l4-4 4 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          opacity={isVisible ? 0.7 : 0}
          style={{ transition: 'opacity 0.5s ease-out 0.8s' }}
        />
        <line
          x1="42" y1="8" x2="42" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round"
          strokeDasharray="12"
          strokeDashoffset={isVisible ? '0' : '12'}
          style={{ transition: 'stroke-dashoffset 0.6s ease-out 0.6s' }}
        />
      </svg>
    </div>
  );
}

// BRAND: Color palette / paint drops
export function BrandVisual({ color }: { color: string }) {
  const { ref, isVisible } = useSimpleInView();
  return (
    <div ref={ref} className="relative w-12 h-12 flex items-center justify-center" aria-hidden="true">
      <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
        {/* Palette shape */}
        <path
          d="M24 6C13 6 4 15 4 24c0 9 9 18 20 18 2 0 3-1 3-3 0-1-0.5-1.5-1-2-0.5-0.5-1-1.5-1-2.5 0-2 1.5-3 3-3h4c6 0 12-5 12-12C44 11 35 6 24 6z"
          stroke={color} strokeWidth="2"
          strokeDasharray="120"
          strokeDashoffset={isVisible ? '0' : '120'}
          style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
        />
        {/* Color dots on palette */}
        <circle cx="15" cy="18" r="3" fill={color} opacity={isVisible ? 0.9 : 0} style={{ transition: 'opacity 0.4s ease-out 0.6s' }} />
        <circle cx="22" cy="13" r="3" fill={color} opacity={isVisible ? 0.6 : 0} style={{ transition: 'opacity 0.4s ease-out 0.8s' }} />
        <circle cx="30" cy="15" r="3" fill={color} opacity={isVisible ? 0.4 : 0} style={{ transition: 'opacity 0.4s ease-out 1s' }} />
        <circle cx="34" cy="22" r="3" fill={color} opacity={isVisible ? 0.7 : 0} style={{ transition: 'opacity 0.4s ease-out 1.2s' }} />
        {/* Subtle shimmer */}
        <circle cx="15" cy="18" r="3" fill={color}>
          <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" begin="1s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

// SELL: Target with arrow
export function SellVisual({ color }: { color: string }) {
  const { ref, isVisible } = useSimpleInView();
  return (
    <div ref={ref} className="relative w-12 h-12 flex items-center justify-center" aria-hidden="true">
      <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
        {/* Target rings */}
        <circle
          cx="22" cy="26" r="14" stroke={color} strokeWidth="2" opacity="0.2"
          strokeDasharray="88"
          strokeDashoffset={isVisible ? '0' : '88'}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
        <circle
          cx="22" cy="26" r="9" stroke={color} strokeWidth="2" opacity="0.4"
          strokeDasharray="57"
          strokeDashoffset={isVisible ? '0' : '57'}
          style={{ transition: 'stroke-dashoffset 0.8s ease-out 0.3s' }}
        />
        <circle
          cx="22" cy="26" r="4" fill={color}
          opacity={isVisible ? 0.6 : 0}
          style={{ transition: 'opacity 0.4s ease-out 0.6s' }}
        />
        {/* Arrow hitting bullseye */}
        <line
          x1="38" y1="10" x2="24" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round"
          strokeDasharray="22"
          strokeDashoffset={isVisible ? '0' : '22'}
          style={{ transition: 'stroke-dashoffset 0.5s ease-out 0.8s' }}
        />
        {/* Arrow tip */}
        <path
          d="M38 10l-6 1 5 5z" fill={color}
          opacity={isVisible ? 0.8 : 0}
          style={{ transition: 'opacity 0.3s ease-out 0.8s' }}
        />
        {/* Impact pulse */}
        <circle cx="22" cy="26" r="4" stroke={color} strokeWidth="1" fill="none">
          <animate attributeName="r" values="4;12;4" dur="2.5s" begin="1.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" begin="1.2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

// LAUNCH: Rocket with trail
export function LaunchVisual({ color }: { color: string }) {
  const { ref, isVisible } = useSimpleInView();
  return (
    <div ref={ref} className="relative w-12 h-12 flex items-center justify-center" aria-hidden="true">
      <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
        {/* Rocket body */}
        <path
          d="M24 6c0 0-8 8-8 20h16C32 14 24 6 24 6z"
          stroke={color} strokeWidth="2" strokeLinejoin="round"
          strokeDasharray="60"
          strokeDashoffset={isVisible ? '0' : '60'}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
        {/* Nose cone fill */}
        <path
          d="M24 6c0 0-4 5-6 12h12C28 11 24 6 24 6z"
          fill={color} opacity={isVisible ? 0.15 : 0}
          style={{ transition: 'opacity 0.6s ease-out 0.5s' }}
        />
        {/* Fins */}
        <path
          d="M16 26l-4 8h6z" fill={color} opacity={isVisible ? 0.5 : 0}
          style={{ transition: 'opacity 0.4s ease-out 0.6s' }}
        />
        <path
          d="M32 26l4 8h-6z" fill={color} opacity={isVisible ? 0.5 : 0}
          style={{ transition: 'opacity 0.4s ease-out 0.6s' }}
        />
        {/* Window */}
        <circle
          cx="24" cy="18" r="2.5" stroke={color} strokeWidth="1.5"
          opacity={isVisible ? 0.8 : 0}
          style={{ transition: 'opacity 0.4s ease-out 0.8s' }}
        />
        {/* Exhaust flames */}
        <path d="M20 34l4 8 4-8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <animate attributeName="d" values="M20 34l4 8 4-8;M21 34l3 10 3-10;M20 34l4 8 4-8" dur="0.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0.4;0.8" dur="0.6s" repeatCount="indefinite" />
        </path>
        {/* Trail particles */}
        <circle cx="22" cy="40" r="1" fill={color} opacity="0.3">
          <animate attributeName="cy" values="40;46;40" dur="1s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0;0.4" dur="1s" repeatCount="indefinite" />
        </circle>
        <circle cx="26" cy="42" r="1" fill={color} opacity="0.2">
          <animate attributeName="cy" values="42;48;42" dur="1.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="1.2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

// ── Module Visual Picker ──
export function ModuleVisual({ slug, color }: { slug: string; color: string }) {
  switch (slug) {
    case 'discover': return <DiscoverVisual color={color} />;
    case 'design': return <DesignVisual color={color} />;
    case 'money': return <MoneyVisual color={color} />;
    case 'brand': return <BrandVisual color={color} />;
    case 'sell': return <SellVisual color={color} />;
    case 'launch': return <LaunchVisual color={color} />;
    default: return null;
  }
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
