"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import HeaderSearchBar from "./HeaderSearchBar";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/busqueda", label: "Búsqueda" },
  { href: "/sobre-nosotros", label: "Sobre Nosotros" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-surface/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 no-underline hover:opacity-80 transition-opacity"
        >
          <Image
            src="/vetroots-logo.webp"
            alt="Vetroots"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-lg font-semibold tracking-tight text-text-primary">
            Vetroots
          </span>
        </Link>

        {/* Centered nav links — desktop */}
        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-text-secondary no-underline transition-colors hover:text-text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side — search, theme toggle, CTA, mobile burger */}
        <div className="flex items-center gap-3">
          <HeaderSearchBar />
          <ThemeToggle />

          <Link
            href="/catalogo"
            className="hidden rounded-[var(--radius-md)] bg-brand-primary px-5 py-2 text-sm font-semibold text-surface-card no-underline transition-opacity hover:opacity-90 md:inline-block"
          >
            Explorar
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-text-secondary"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile slide-out */}
      {mobileOpen && (
        <div className="border-t border-border-subtle bg-surface md:hidden">
          <ul className="mx-auto max-w-7xl space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium text-text-secondary no-underline transition-colors hover:bg-surface-elevated hover:text-text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/catalogo"
                onClick={() => setMobileOpen(false)}
                className="mt-2 block rounded-[var(--radius-md)] bg-brand-primary px-3 py-2 text-center text-sm font-semibold text-surface-card no-underline transition-opacity hover:opacity-90"
              >
                Explorar catálogo
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
