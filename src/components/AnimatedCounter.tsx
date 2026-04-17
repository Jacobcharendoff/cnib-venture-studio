"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export default function AnimatedCounter({
  value,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  // Compute initial display: preserve prefix/suffix, show 0
  const getInitial = (): string => {
    const m = value.match(/(\d+)/);
    if (!m) return value;
    const idx = value.indexOf(m[1]);
    return value.slice(0, idx) + "0" + value.slice(idx + m[1].length);
  };

  const [display, setDisplay] = useState(getInitial);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        observer.disconnect();

        const m = value.match(/(\d+)/);
        if (!m) {
          setDisplay(value);
          return;
        }

        const target = parseInt(m[1], 10);
        if (target === 0) {
          setDisplay(value);
          return;
        }

        const idx = value.indexOf(m[1]);
        const prefix = value.slice(0, idx);
        const suffix = value.slice(idx + m[1].length);
        const duration = 1600;
        let start: number | null = null;

        const tick = (now: number) => {
          if (start === null) start = now;
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out quart
          const eased = 1 - Math.pow(1 - progress, 4);
          setDisplay(`${prefix}${Math.round(eased * target)}${suffix}`);
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
