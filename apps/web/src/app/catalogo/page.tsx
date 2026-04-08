import type { Metadata } from "next";
import ContentCard from "@/components/ContentCard";
import { getFichas, getPosters, getVideos } from "@/lib/strapi";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Explora fichas educativas, pósters y videos veterinarios.",
};

export default async function CatalogoPage() {
  const [fichasRes, postersRes, videosRes] = await Promise.allSettled([
    getFichas(),
    getPosters(),
    getVideos(),
  ]);

  const fichas = fichasRes.status === "fulfilled" ? fichasRes.value.data : [];
  const posters =
    postersRes.status === "fulfilled" ? postersRes.value.data : [];
  const videos = videosRes.status === "fulfilled" ? videosRes.value.data : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-2xl font-bold text-text-primary sm:text-3xl">
        Catálogo
      </h1>

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
    </div>
  );
}
