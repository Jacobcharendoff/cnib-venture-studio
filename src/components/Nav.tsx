'use client';

import Link from 'next/link';

export default function Nav() {
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

        {/* Links */}
        <div className="flex items-center gap-4 sm:gap-8">
          <Link
            href="#modules"
            className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded px-2 py-1"
          >
            Modules
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded px-2 py-1"
          >
            How It Works
          </Link>
          <Link
            href="/auth"
            className="px-4 sm:px-6 py-2 bg-blue-500 text-white text-sm sm:text-base font-semibold rounded-full hover:bg-blue-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 active:scale-95 transition-transform"
          >
            Start Learning
          </Link>
        </div>
      </div>
    </nav>
  );
}