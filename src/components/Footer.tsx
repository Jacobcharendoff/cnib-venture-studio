import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-cnib-black text-white/60 mt-auto" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="text-cnib-yellow font-bold text-lg">Venture Studio</p>
            <p className="text-white/40 text-sm mt-1">Powered by CNIB</p>
            <p className="mt-4 text-sm leading-relaxed">
              A 12-week entrepreneurial program for CNIB Venture Pool members.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">
              Pages
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/curriculum", label: "Curriculum" },
                { href: "/resources", label: "Resources" },
                { href: "/about", label: "About" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors no-underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">
              Accessibility
            </h3>
            <p className="text-sm leading-relaxed">
              This site is designed to work with screen readers, keyboard navigation, and high-contrast displays.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-8 text-center text-sm text-white/30">
          <p>
            &copy; {new Date().getFullYear()} Venture Studio. Built by{" "}
            <a href="https://www.linkedin.com/in/jacob-charendoff/" className="text-white/50 hover:text-white transition-colors underline" target="_blank" rel="noopener noreferrer">Jacob Charendoff</a>
            . Powered by{" "}
            <a href="https://www.cnib.ca" className="text-white/50 hover:text-white transition-colors underline" target="_blank" rel="noopener noreferrer">CNIB</a>.
          </p>
        </div>
      </div>
    </footer>
  );
}
