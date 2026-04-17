"use client";

import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/themes", label: "Themes" },
  { href: "/progress", label: "Progress" },
  { href: "/toolkit", label: "Toolkit" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  /* Close menu on Escape — return focus to trigger button */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    },
    [menuOpen],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  /* Focus first link when mobile menu opens */
  useEffect(() => {
    if (menuOpen && menuRef.current) {
      const firstLink = menuRef.current.querySelector("a");
      requestAnimationFrame(() => firstLink?.focus());
    }
  }, [menuOpen]);

  /* Close menu on route change */
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06]"
      style={{
        background: "rgba(10, 10, 10, 0.85)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
      }}
      role="banner"
    >
      <div className="content-max">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 no-underline group"
            aria-label="Venture Studio home"
          >
            <span className="text-cnib-yellow font-bold text-lg tracking-tight">
              Venture Studio
            </span>
            <span
              className="text-xs font-semibold tracking-[0.15em] uppercase hidden sm:inline"
              style={{ color: "var(--text-on-dark-subtle)" }}
            >
              CNIB
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-0.5"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors no-underline nav-link ${
                  isActive(link.href) ? "nav-link-active" : ""
                }`}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-cnib-yellow rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button — 44×44 minimum touch target */}
          <button
            ref={menuButtonRef}
            className="md:hidden p-2.5 rounded-lg transition-colors text-white flex items-center justify-center"
            style={{
              background: menuOpen ? "rgba(255,255,255,0.1)" : "transparent",
              minWidth: 44,
              minHeight: 44,
            }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav — slides from right */}
        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 top-16 md:hidden z-40"
                style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
                onClick={() => setMenuOpen(false)}
                aria-hidden="true"
              />
              <motion.nav
                key="panel"
                ref={menuRef}
                id="mobile-menu"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed top-16 right-0 bottom-0 w-72 md:hidden z-50 border-l border-white/[0.06]"
                style={{
                  background: "rgba(10,10,10,0.95)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                }}
                aria-label="Mobile navigation"
              >
                <div className="p-6 space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors no-underline nav-link ${
                        isActive(link.href) ? "nav-link-active" : ""
                      }`}
                      style={{ minHeight: 44 }}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
