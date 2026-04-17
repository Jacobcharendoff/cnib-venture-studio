"use client";

import type { ReactNode } from "react";

interface PhaseIconProps {
  phase: string;
  size?: number;
  className?: string;
}

export default function PhaseIcon({ phase, size = 40, className = "" }: PhaseIconProps) {
  const icons: Record<string, ReactNode> = {
    discover: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <circle cx="18" cy="18" r="11" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <circle cx="18" cy="18" r="5" stroke="currentColor" strokeWidth="2" />
        <line x1="26" y1="26" x2="35" y2="35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="18" cy="18" r="1.5" fill="currentColor" />
      </svg>
    ),
    validate: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <path d="M20 4L5 11v9c0 8.5 6.3 16.5 15 18.5 8.7-2 15-10 15-18.5v-9L20 4z" stroke="currentColor" strokeWidth="1.5" opacity="0.25" />
        <path d="M14 20l4 4 8-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    build: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <rect x="4" y="22" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.5" opacity="0.25" />
        <rect x="14" y="14" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="2" />
        <rect x="24" y="6" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.5" opacity="0.25" />
      </svg>
    ),
    sell: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
        <path d="M20 8v24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M15 15c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5 2.2-5 5 2.2 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    grow: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <rect x="5" y="26" width="7" height="10" rx="1.5" fill="currentColor" opacity="0.15" />
        <rect x="16" y="18" width="7" height="18" rx="1.5" fill="currentColor" opacity="0.3" />
        <rect x="27" y="10" width="7" height="26" rx="1.5" fill="currentColor" opacity="0.5" />
        <path d="M34 4l-6 6m6-6h-5m5 0v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    launch: (
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <path d="M20 4c-5 7-7 14-7 21h14c0-7-2-14-7-21z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="20" cy="19" r="2.5" fill="currentColor" opacity="0.5" />
        <path d="M13 25c-3 1-6 1-7.5 2.5M27 25c3 1 6 1 7.5 2.5" stroke="currentColor" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
        <path d="M15 31l-1.5 6 6.5-3 6.5 3-1.5-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.4" />
      </svg>
    ),
  };

  const icon = icons[phase];
  if (!icon) return null;

  return (
    <span className={`inline-flex items-center justify-center ${className}`} aria-hidden="true">
      {icon}
    </span>
  );
}
