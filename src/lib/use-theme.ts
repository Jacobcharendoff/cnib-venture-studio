'use client';

import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

export function useTheme(defaultTheme: Theme = 'light') {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = window.localStorage.getItem('tvc-theme') as Theme | null;
      if (stored === 'light' || stored === 'dark') {
        setThemeState(stored);
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try {
      window.localStorage.setItem('tvc-theme', t);
    } catch {
      // localStorage unavailable
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  return {
    theme: mounted ? theme : defaultTheme,
    toggle,
    isDark: (mounted ? theme : defaultTheme) === 'dark',
    mounted,
  };
}
