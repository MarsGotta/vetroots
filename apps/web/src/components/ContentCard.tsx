import Image from "next/image";
import Link from "next/link";
import { strapiMediaUrl } from "@/lib/strapi";
import type { StrapiMedia, Category, Level, Area } from "@/lib/types";

interface ContentCardProps {
  title: string;
  slug: string;
  href: string;
  image: StrapiMedia | null;
  category: Category | null;
  level: Level | null;
  area: Area | null;
  description?: string | null;
}

const levelLabels: Record<Level, string> = {
  basico: "Básico",
  intermedio: "Intermedio",
  avanzado: "Avanzado",
};

const tagColors: Record<string, string> = {
  category: "bg-tag-pink text-text-primary",
  level: "bg-tag-peach text-text-primary",
  area: "bg-tag-mint text-text-primary",
};

export default function ContentCard({
  title,
  href,
  image,
  category,
  level,
  description,
  area,
}: ContentCardProps) {
  const imageUrl = strapiMediaUrl(image);

  return (
    <Link href={href} className="group block no-underline">
      <article className="overflow-hidden rounded-[var(--radius-lg)] border border-border-subtle bg-surface-card transition-shadow hover:shadow-lg">
        {/* Square image (1:1) */}
        <div className="relative aspect-square bg-surface-placeholder">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={image?.alternativeText ?? title}
              fill
              className="object-cover transition-transform group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-text-muted">
              Sin imagen
            </div>
          )}

          {/* Bookmark icon */}
          <div className="absolute right-3 top-3 rounded-full bg-surface-card/80 p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
            <svg className="h-4 w-4 text-text-secondary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
            </svg>
          </div>
        </div>

        <div className="p-4">
          {/* Pastel tag badges */}
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {category && (
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${tagColors.category}`}>
                {category.name}
              </span>
            )}
            {level && (
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${tagColors.level}`}>
                {levelLabels[level]}
              </span>
            )}
            {area && (
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${tagColors.area}`}>
                {area}
              </span>
            )}
          </div>

          <h3 className="text-base font-semibold text-text-primary group-hover:text-brand-secondary">
            {title}
          </h3>
          {description && (
            <p className="mt-1 line-clamp-2 text-sm text-text-secondary">
              {description}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}
