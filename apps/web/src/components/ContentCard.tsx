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

export default function ContentCard({
  title,
  href,
  image,
  category,
  level,
  description,
}: ContentCardProps) {
  const imageUrl = strapiMediaUrl(image);

  return (
    <Link href={href} className="group block no-underline">
      <article className="overflow-hidden rounded-lg border border-border-subtle bg-surface-card transition-colors hover:border-vetroots-700">
        <div className="relative aspect-[4/3] bg-surface-elevated">
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
        </div>
        <div className="p-4">
          <div className="mb-2 flex items-center gap-2">
            {category && (
              <span className="rounded-full bg-vetroots-900/50 px-2 py-0.5 text-xs font-medium text-vetroots-400">
                {category.name}
              </span>
            )}
            {level && (
              <span className="rounded-full bg-earth-900/50 px-2 py-0.5 text-xs font-medium text-earth-300">
                {levelLabels[level]}
              </span>
            )}
          </div>
          <h3 className="text-base font-semibold text-text-primary group-hover:text-vetroots-400">
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
