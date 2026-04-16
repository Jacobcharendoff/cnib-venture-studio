import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-cnib-blue-dark text-white/80 mt-auto" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <p className="text-lg font-bold text-white">Venture Studio</p>
            <p className="text-sm text-cnib-orange-light font-medium uppercase tracking-wide mt-1">
              Powered by CNIB
            </p>
            <p className="mt-4 text-sm leading-relaxed">
              Turn your idea into your first dollar. A 12-week entrepreneurial
              program for CNIB Venture Pool members.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/curriculum", label: "Curriculum" },
                { href: "/resources", label: "Resources" },
                { href: "/about", label: "About Jacob" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Accessibility */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Accessibility
            </h3>
            <p className="text-sm leading-relaxed">
              This site is built with accessibility as a core principle. It is
              designed to work with screen readers, keyboard navigation, and
              high-contrast displays. If you encounter any barriers, please
              contact us.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/50">
          <p>
            &copy; {new Date().getFullYear()} Venture Studio. Built by{" "}
            <a
              href="https://www.linkedin.com/in/jacob-charendoff/"
              className="text-white/70 hover:text-white transition-colors underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jacob Charendoff
            </a>
            . Proudly powered by{" "}
            <a
              href="https://www.cnib.ca"
              className="text-white/70 hover:text-white transition-colors underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              CNIB
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
