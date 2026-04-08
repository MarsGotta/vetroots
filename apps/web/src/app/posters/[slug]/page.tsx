import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPosterBySlug, getPosters, strapiMediaUrl } from "@/lib/strapi";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const res = await getPosters();
    return res.data.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await getPosterBySlug(slug);
    const poster = res.data[0];
    if (!poster) return { title: "Póster no encontrado" };
    return {
      title: poster.seoTitle ?? poster.title,
      description: poster.seoDescription ?? poster.description ?? undefined,
    };
  } catch {
    return { title: "Póster" };
  }
}

export default async function PosterPage({ params }: PageProps) {
  const { slug } = await params;
  const res = await getPosterBySlug(slug);
  const poster = res.data[0];
  if (!poster) notFound();

  const imageUrl = strapiMediaUrl(poster.image);
  const pdfUrl = strapiMediaUrl(poster.downloadablePdf);

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {poster.category && (
          <span className="rounded-full bg-vetroots-900/50 px-3 py-1 text-xs font-medium text-vetroots-400">
            {poster.category.name}
          </span>
        )}
        {poster.level && (
          <span className="rounded-full bg-earth-900/50 px-3 py-1 text-xs font-medium text-earth-300">
            {poster.level}
          </span>
        )}
      </div>

      <h1 className="mb-4 text-2xl font-bold text-text-primary sm:text-3xl">
        {poster.title}
      </h1>

      {poster.description && (
        <p className="mb-6 text-lg text-text-secondary">{poster.description}</p>
      )}

      {imageUrl && (
        <div className="relative mb-8 overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt={poster.image?.alternativeText ?? poster.title}
            width={poster.image?.width ?? 1200}
            height={poster.image?.height ?? 1600}
            className="w-full"
            priority
          />
        </div>
      )}

      {pdfUrl && (
        <a
          href={pdfUrl}
          download
          className="inline-flex items-center gap-2 rounded-lg bg-vetroots-600 px-6 py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-vetroots-500"
        >
          Descargar PDF
        </a>
      )}

      {poster.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {poster.tags.map((tag) => (
            <span
              key={tag.id}
              className="rounded-full border border-border-subtle px-3 py-1 text-xs text-text-muted"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
