import type { Metadata } from "next";
import ContentCard from "@/components/ContentCard";
import { getFichas, getPosters, getVideos, getCategories } from "@/lib/strapi";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Explora fichas educativas, pósters y videos veterinarios.",
};

export default async function CatalogoPage() {
  const [fichasRes, postersRes, videosRes, categoriesRes] = await Promise.allSettled([
    getFichas(),
    getPosters(),
    getVideos(),
    getCategories(),
  ]);

  const fichas = fichasRes.status === "fulfilled" ? fichasRes.value.data : [];
  const posters =
    postersRes.status === "fulfilled" ? postersRes.value.data : [];
  const videos = videosRes.status === "fulfilled" ? videosRes.value.data : [];
  const categories =
    categoriesRes.status === "fulfilled" ? categoriesRes.value.data : [];

  const totalCount = fichas.length + posters.length + videos.length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-center text-2xl font-bold text-text-primary sm:text-3xl">
        Catálogo
      </h1>

      {/* Search bar (visual — navigates to búsqueda) */}
      <div className="mx-auto mb-8 max-w-xl">
        <a
          href="/busqueda"
          className="flex items-center gap-3 rounded-[var(--radius-lg)] bg-surface-muted px-5 py-4 text-text-muted no-underline transition-colors hover:bg-surface-elevated"
        >
          <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <span className="text-sm">Buscar fichas, pósters, videos&hellip;</span>
        </a>
      </div>

      {/* Category filter pills */}
      {categories.length > 0 && (
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/catalogo?category=${cat.slug}`}
              className="rounded-[var(--radius-md)] bg-surface-elevated px-4 py-2 text-sm font-medium text-text-secondary no-underline transition-colors hover:bg-brand-primary hover:text-surface-card"
            >
              {cat.name}
            </a>
          ))}
        </div>
      )}

      {/* Fichas */}
      {fichas.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 text-lg font-semibold text-text-primary">
            Fichas educativas
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fichas.map((ficha) => (
              <ContentCard
                key={ficha.id}
                title={ficha.title}
                slug={ficha.slug}
                href={`/fichas/${ficha.slug}`}
                image={ficha.coverImage}
                category={ficha.category}
                level={ficha.level}
                area={ficha.area}
                description={ficha.summary}
              />
            ))}
          </div>
        </section>
      )}

      {/* Posters */}
      {posters.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 text-lg font-semibold text-text-primary">
            Pósters
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posters.map((poster) => (
              <ContentCard
                key={poster.id}
                title={poster.title}
                slug={poster.slug}
                href={`/posters/${poster.slug}`}
                image={poster.image}
                category={poster.category}
                level={poster.level}
                area={poster.area}
                description={poster.description}
              />
            ))}
          </div>
        </section>
      )}

      {/* Videos */}
      {videos.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 text-lg font-semibold text-text-primary">
            Videos
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <ContentCard
                key={video.id}
                title={video.title}
                slug={video.slug}
                href={`/videos/${video.slug}`}
                image={video.thumbnail}
                category={video.category}
                level={video.level}
                area={video.area}
                description={video.description}
              />
            ))}
          </div>
        </section>
      )}

      {fichas.length === 0 && posters.length === 0 && videos.length === 0 && (
        <p className="text-center text-text-muted">
          No hay contenido publicado todavía.
        </p>
      )}

      {/* Pagination pill */}
      {totalCount > 0 && (
        <div className="mt-8 flex justify-center">
          <span className="rounded-[var(--radius-md)] bg-surface-elevated px-6 py-2 text-sm font-medium text-text-secondary">
            {totalCount} resultado{totalCount !== 1 ? "s" : ""}
          </span>
        </div>
      )}
    </div>
  );
}
