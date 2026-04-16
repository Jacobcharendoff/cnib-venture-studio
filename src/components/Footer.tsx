import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="border-t border-white/[0.06]"
      style={{ background: "var(--cnib-black)", color: "var(--text-on-dark-muted)" }}
      role="contentinfo"
    >
      <div className="content-max py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <p className="text-cnib-yellow font-bold text-lg tracking-tight">
              Venture Studio
            </p>
            <p
              className="text-xs font-semibold tracking-[0.15em] uppercase mt-1"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Powered by CNIB
            </p>
            <p className="mt-5 text-sm leading-relaxed max-w-xs">
              Turn your idea into your first dollar. An immersive entrepreneurial
              program for blind and low-vision founders.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="eyebrow mb-5" style={{ color: "rgba(255,255,255,0.35)" }}>
              Navigate
            </h3>
            <ul className="space-y-2.5" role="list">
              {[
                { href: "/themes", label: "Themes" },
                { href: "/toolkit", label: "Toolkit" },
                { href: "/about", label: "About" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-cnib-yellow transition-colors no-underline"
                    style={{ color: "var(--text-on-dark-muted)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Accessibility */}
          <div>
            <h3 className="eyebrow mb-5" style={{ color: "rgba(255,255,255,0.35)" }}>
              Accessibility
            </h3>
            <p className="text-sm leading-relaxed">
              This platform is built with accessibility at its core — screen
              reader compatible, keyboard navigable, and designed for everyone.
              All worksheets are provided in accessible .docx format.
            </p>
          </div>
        </div>

        <hr className="divider-gradient my-12" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
          <p>
            &copy; {new Date().getFullYear()} Venture Studio. Built by{" "}
            <a
              href="https://www.linkedin.com/in/jacob-charendoff/"
              className="hover:text-cnib-yellow transition-colors underline"
              style={{ color: "var(--text-on-dark-muted)" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Jacob Charendoff
            </a>
          </p>
          <a
            href="https://www.cnib.ca"
            className="hover:text-cnib-yellow transition-colors underline text-xs"
            style={{ color: "var(--text-on-dark-muted)" }}
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
