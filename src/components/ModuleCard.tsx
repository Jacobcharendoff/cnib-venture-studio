'use client';

import Link from 'next/link';
import { StaticModule } from '@/lib/course-data';

interface ModuleCardProps {
  module: StaticModule;
  size: 'big' | 'small';
  gradient: string;
  watermarkNumber: string;
}

const ICON_SVG_MAP: Record<string, React.ReactNode> = {
  discover: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-white">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l4 2" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-white">
      <path d="M12 19l7-7V5a2 2 0 00-2-2H5a2 2 0 00-2 2v7l7 7z" />
      <polyline points="12 12 12 12" />
    </svg>
  ),
  money: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-white">
      <circle cx="12" cy="12" r="1" />
      <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 0l4.24-4.24M1 12h6m6 0h6m-17.78 7.78l4.24-4.24m5.08 0l4.24 4.24" />
    </svg>
  ),
  brand: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-white">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      <circle cx="9" cy="10" r="1" />
      <circle cx="12" cy="10" r="1" />
      <circle cx="15" cy="10" r="1" />
    </svg>
  ),
  sell: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-white">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6m3-3H9" />
    </svg>
  ),
  launch: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-white">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  ),
};

export default function ModuleCard({
  module,
  size,
  gradient,
  watermarkNumber,
}: ModuleCardProps) {
  const isBig = size === 'big';
  const icon = ICON_SVG_MAP[module.slug as keyof typeof ICON_SVG_MAP] || ICON_SVG_MAP.discover;

  const baseClasses = 'relative group rounded-[28px] p-10 overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer';
  const sizeClasses = isBig ? 'min-h-[440px]' : 'min-h-[300px]';

  return (
    <Link href={`/course/${module.slug}`}>
      <div
        className={`${baseClasses} ${sizeClasses} shadow-lg hover:shadow-2xl`}
        style={{
          background: gradient,
          boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
        }}
      >
        {/* Animated background zoom on hover */}
        <div
          className="absolute inset-0 transition-transform duration-300 group-hover:scale-105"
          style={{
            background: gradient,
            zIndex: -1,
          }}
        />

        {/* Content container */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Icon badge */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 sm:mb-8"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {icon}
          </div>

          {/* Text content */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/80 mb-2">
                {module.slug}
              </p>
              <h3 className="text-lg sm:text-2xl font-black text-white mb-2 tracking-tight">
                {module.title}
              </h3>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                {module.subtitle}
              </p>
            </div>

            {/* Metadata */}
            <div className="text-xs sm:text-sm text-white/70 font-medium mt-6">
              {module.lessons.length} lessons · ~{module.lessons.length * 15} min
            </div>
          </div>
        </div>

        {/* Watermark number */}
        <div
          className="absolute top-6 right-6 text-white font-black text-9xl sm:text-[200px] opacity-10 leading-none pointer-events-none"
          aria-hidden="true"
        >
          {watermarkNumber}
        </div>

        {/* ARIA label for accessibility */}
        <span className="sr-only">
          {module.title}: {module.subtitle}. {module.lessons.length} lessons, approximately {module.lessons.length * 15} minutes.
        </span>
      </div>
    </Link>
  );
}