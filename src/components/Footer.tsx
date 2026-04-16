import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-cnib-black text-white/60 border-t border-white/5" role="contentinfo">
      <div className="content-max py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <p className="text-cnib-yellow font-bold text-lg">Venture Studio</p>
            <p className="text-white/30 text-xs font-medium tracking-widest uppercase mt-1">
              Powered by CNIB
            </p>
            <p className="mt-4 text-sm leading-relaxed max-w-xs">
              Turn your idea into your first dollar. An immersive entrepreneurial
              program for blind and low-vision founders.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
              Navigate
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/themes", label: "Themes" },
                { href: "/toolkit", label: "Toolkit" },
                { href: "/about", label: "About" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-cnib-yellow transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Accessibility */}
          <div>
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
              Accessibility
            </h3>
            <p className="text-sm leading-relaxed">
              This platform is built with accessibility at its core — screen
              reader compatible, keyboard navigable, and designed for everyone.
              All worksheets are provided in accessible .docx format.
            </p>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <p>
            &copy; {new Date().getFullYear()} Venture Studio. Built by{" "}
            <a
              href="https://www.linkedin.com/in/jacob-charendoff/"
              className="text-white/50 hover:text-cnib-yellow transition-colors underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jacob Charendoff
            </a>
          </p>
          <a
            href="https://www.cnib.ca"
            className="text-white/50 hover:text-cnib-yellow transition-colors underline text-xs"
            target="_blank"
            rel="noopener noreferrer"
          >
            cnib.ca
          </a>
        </div>
      </div>
    </footer>
  );
}
