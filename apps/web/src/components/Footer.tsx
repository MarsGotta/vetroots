import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-surface-elevated">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
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
          <p className="text-sm text-text-muted">
            Catálogo Educativo Veterinario
          </p>
        </div>
      </div>
    </footer>
  );
}
