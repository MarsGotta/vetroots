import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/busqueda", label: "Búsqueda" },
  { href: "/sobre-nosotros", label: "Sobre Nosotros" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-surface-elevated">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 no-underline hover:opacity-80 transition-opacity"
            >
              <Image
                src="/vetroots-logo.webp"
                alt="Vetroots"
                width={28}
                height={28}
                className="rounded-full"
              />
              <span className="text-lg font-semibold text-text-primary">
                Vetroots
              </span>
            </Link>
            <p className="max-w-xs text-sm text-text-muted">
              Catálogo Educativo Veterinario — fichas, pósters y videos para
              estudiantes y profesionales.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Navegación
            </h3>
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary no-underline transition-colors hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 border-t border-border-subtle pt-6 text-center text-xs text-text-muted">
          &copy; {new Date().getFullYear()} Vetroots. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
