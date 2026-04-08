import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getFichaBySlug, getFichas, strapiMediaUrl } from "@/lib/strapi";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const res = await getFichas();
    return res.data.map((f) => ({ slug: f.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await getFichaBySlug(slug);
    const ficha = res.data[0];
    if (!ficha) return { title: "Ficha no encontrada" };
    return {
      title: ficha.seoTitle ?? ficha.title,
      description: ficha.seoDescription ?? ficha.summary ?? undefined,
    };
  } catch {
    return { title: "Ficha" };
  }
}

export default async function FichaPage({ params }: PageProps) {
  const { slug } = await params;
  const res = await getFichaBySlug(slug);
  const ficha = res.data[0];
  if (!ficha) notFound();

  const coverUrl = strapiMediaUrl(ficha.coverImage);

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {ficha.category && (
          <span className="rounded-full bg-vetroots-900/50 px-3 py-1 text-xs font-medium text-vetroots-400">
            {ficha.category.name}
          </span>
        )}
        {ficha.level && (
          <span className="rounded-full bg-earth-900/50 px-3 py-1 text-xs font-medium text-earth-300">
            {ficha.level}
          </span>
        )}
        {ficha.area && (
          <span className="rounded-full bg-surface-card px-3 py-1 text-xs font-medium text-text-secondary">
            {ficha.area}
          </span>
        )}
      </div>

      <h1 className="mb-4 text-2xl font-bold text-text-primary sm:text-3xl">
        {ficha.title}
      </h1>

      {ficha.summary && (
        <p className="mb-6 text-lg text-text-secondary">{ficha.summary}</p>
      )}

      {/* Cover image */}
      {coverUrl && (
        <div className="relative mb-8 aspect-video overflow-hidden rounded-lg">
          <Image
            src={coverUrl}
            alt={ficha.coverImage?.alternativeText ?? ficha.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content placeholder — Strapi blocks require a renderer */}
      <div className="prose prose-invert max-w-none">
        {ficha.content && Array.isArray(ficha.content) ? (
          <p className="text-text-secondary">
            {/* TODO: render Strapi blocks content with @strapi/blocks-react-renderer */}
            Contenido disponible. Instalar @strapi/blocks-react-renderer para renderizar.
          </p>
        ) : (
          <p className="text-text-muted">Sin contenido.</p>
        )}
      </div>

      {/* Tags */}
      {ficha.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {ficha.tags.map((tag) => (
            <span
              key={tag.id}
              className="rounded-full border border-border-subtle px-3 py-1 text-xs text-text-muted"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      {/* Species */}
      {ficha.species.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-xs text-text-muted">Especies:</span>
          {ficha.species.map((sp) => (
            <span
              key={sp.id}
              className="text-xs text-text-secondary"
            >
              {sp.name}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
