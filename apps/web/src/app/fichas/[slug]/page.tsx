import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
    <article className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-text-muted">
        <Link href="/catalogo" className="no-underline hover:text-text-primary">
          Catálogo
        </Link>
        <span>/</span>
        {ficha.category && (
          <>
            <span className="rounded-[var(--radius-md)] bg-brand-primary px-3 py-1 text-xs font-medium text-surface-card">
              {ficha.category.name}
            </span>
            <span>/</span>
          </>
        )}
        {ficha.area && (
          <span className="rounded-[var(--radius-md)] bg-tag-orange px-3 py-1 text-xs font-medium text-text-primary">
            {ficha.area}
          </span>
        )}
      </nav>

      <h1 className="mb-4 text-2xl font-bold text-text-primary sm:text-3xl">
        {ficha.title}
      </h1>

      {ficha.summary && (
        <p className="mb-6 text-lg text-text-secondary">{ficha.summary}</p>
      )}

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Main content */}
        <div className="min-w-0 flex-1">
          {/* Cover image */}
          {coverUrl && (
            <div className="relative mb-8 aspect-video overflow-hidden rounded-[var(--radius-lg)]">
              <Image
                src={coverUrl}
                alt={ficha.coverImage?.alternativeText ?? ficha.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div className="prose max-w-none">
            {ficha.content && Array.isArray(ficha.content) ? (
              <p className="text-text-secondary">
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
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-text-muted">Especies:</span>
              {ficha.species.map((sp) => (
                <span
                  key={sp.id}
                  className="rounded-full bg-tag-mint px-2.5 py-0.5 text-xs font-medium text-text-primary"
                >
                  {sp.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <aside className="w-full shrink-0 lg:w-72">
          <div className="rounded-[var(--radius-lg)] bg-surface-elevated p-6">
            <h3 className="mb-3 text-sm font-semibold text-text-primary">
              Sobre esta ficha
            </h3>
            <dl className="space-y-2 text-sm">
              {ficha.category && (
                <div>
                  <dt className="text-text-muted">Categoría</dt>
                  <dd className="font-medium text-text-primary">{ficha.category.name}</dd>
                </div>
              )}
              {ficha.level && (
                <div>
                  <dt className="text-text-muted">Nivel</dt>
                  <dd className="font-medium text-text-primary">{ficha.level}</dd>
                </div>
              )}
              {ficha.area && (
                <div>
                  <dt className="text-text-muted">Área</dt>
                  <dd className="font-medium text-text-primary">{ficha.area}</dd>
                </div>
              )}
            </dl>
            <Link
              href="/catalogo"
              className="mt-6 block rounded-[var(--radius-md)] bg-brand-primary px-4 py-2.5 text-center text-sm font-semibold text-surface-card no-underline transition-opacity hover:opacity-90"
            >
              Ver más fichas
            </Link>
          </div>
        </aside>
      </div>

      {/* Related content placeholder */}
      <section className="mt-12 rounded-[var(--radius-lg)] bg-surface-elevated p-8">
        <h2 className="mb-4 text-lg font-semibold text-text-primary">
          Contenido relacionado
        </h2>
        <p className="text-sm text-text-muted">
          Explora más fichas en el{" "}
          <Link href="/catalogo" className="text-brand-secondary hover:text-brand-primary">
            catálogo
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
