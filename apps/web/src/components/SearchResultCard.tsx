import Link from "next/link";
import {
  contentTypeHref,
  contentTypeLabel,
  type SearchHit,
} from "@/lib/meilisearch";

const levelLabels: Record<string, string> = {
  basico: "Básico",
  intermedio: "Intermedio",
  avanzado: "Avanzado",
};

interface SearchResultCardProps {
  hit: SearchHit;
}

export default function SearchResultCard({ hit }: SearchResultCardProps) {
  const href = contentTypeHref(hit._contentType, hit.slug);
  const description = hit.summary ?? hit.description;

  return (
    <Link href={href} className="group block no-underline">
      <article className="rounded-[var(--radius-lg)] border border-border-subtle bg-surface-card p-4 transition-shadow hover:shadow-md">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-tag-pink px-2.5 py-0.5 text-xs font-medium text-text-primary">
            {contentTypeLabel(hit._contentType)}
          </span>
          {hit.category?.name && (
            <span className="rounded-full bg-tag-peach px-2.5 py-0.5 text-xs font-medium text-text-primary">
              {hit.category.name}
            </span>
          )}
          {hit.level && (
            <span className="rounded-full bg-tag-mint px-2.5 py-0.5 text-xs font-medium text-text-primary">
              {levelLabels[hit.level] ?? hit.level}
            </span>
          )}
        </div>
        <h3 className="text-base font-semibold text-text-primary group-hover:text-brand-secondary">
          {hit.title}
        </h3>
        {description && (
          <p className="mt-1 line-clamp-2 text-sm text-text-secondary">
            {description}
          </p>
        )}
        {hit.species && hit.species.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {hit.species.map((s) => (
              <span
                key={s.slug}
                className="rounded-full bg-surface-elevated px-2 py-0.5 text-xs text-text-muted"
              >
                {s.name}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}
