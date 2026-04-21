import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      className="border-t border-white/6 px-6 py-12 sm:px-8 sm:py-16"
      aria-label="Footer"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
        {/* Left side */}
        <div className="text-sm text-gray-500">
          The Venture Collective x CNIB
        </div>

        {/* Right side links */}
        <div className="flex items-center gap-8">
          <Link
            href="/privacy"
            className="text-sm text-gray-500 hover:text-gray-300 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded px-2 py-1"
          >
            Privacy
          </Link>
          <Link
            href="/accessibility"
            className="text-sm text-gray-500 hover:text-gray-300 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded px-2 py-1"
          >
            Accessibility
          </Link>
          <Link
            href="/contact"
            className="text-sm text-gray-500 hover:text-gray-300 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 rounded px-2 py-1"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}