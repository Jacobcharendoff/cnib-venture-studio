'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 sm:px-8 sm:py-6"
      style={{
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'saturate(180%) blur(20px)',
      }}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl sm:text-2xl font-black tracking-tight hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded px-2 py-1"
        >
          The Venture Collective
        </Link>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-4 sm:gap-8">
          <Link
            href="/#modules"
            className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded px-2 py-1"
          >
            Modules
          </Link>
          <Link
            href="/#how-it-works"
            className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded px-2 py-1"
          >
            How It Works
          </Link>
          <Link
            href="/auth"
            className="px-4 sm:px-6 py-2 bg-blue-500 text-white text-sm sm:text-base font-semibold rounded-full hover:bg-blue-600 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 active:scale-95"
          >
            Start Learning
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white mt-1.5 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white mt-1.5 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden mt-4 pb-4 border-t border-white/10 pt-4 flex flex-col gap-3">
          <Link
            href="/#modules"
            onClick={() => setMenuOpen(false)}
            className="text-base text-gray-300 hover:text-white transition-colors px-2 py-2 rounded-lg"
          >
            Modules
          </Link>
          <Link
            href="/#how-it-works"
            onClick={() => setMenuOpen(false)}
            className="text-base text-gray-300 hover:text-white transition-colors px-2 py-2 rounded-lg"
          >
            How It Works
          </Link>
          <Link
            href="/auth"
            onClick={() => setMenuOpen(false)}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-all text-center active:scale-95"
          >
            Start Learning
          </Link>
        </div>
      )}
    </nav>
  );
}
