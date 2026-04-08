import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-surface-elevated">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <Link
            href="/"
            className="text-lg font-bold text-vetroots-400 no-underline"
          >
            Vetroots
          </Link>
          <p className="text-sm text-text-muted">
            Catálogo Educativo Veterinario
          </p>
        </div>
      </div>
    </footer>
  );
}
