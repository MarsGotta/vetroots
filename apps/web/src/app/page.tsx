import Link from "next/link";
import ContentCard from "@/components/ContentCard";
import { getHomePage, getFichas, getCategories } from "@/lib/strapi";

export const revalidate = 3600;

export default async function HomePage() {
  const [homeRes, fichasRes, categoriesRes] = await Promise.allSettled([
    getHomePage(),
    getFichas(),
    getCategories(),
  ]);

  const home = homeRes.status === "fulfilled" ? homeRes.value.data : null;
  const fichas = fichasRes.status === "fulfilled" ? fichasRes.value.data : [];
  const categories =
    categoriesRes.status === "fulfilled" ? categoriesRes.value.data : [];

  const featured = home?.featuredFichas?.length
    ? home.featuredFichas
    : fichas.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border-subtle bg-surface-elevated">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-vetroots-400 sm:text-5xl">
            {home?.heroTitle ?? "Vetroots"}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
            {home?.heroSubtitle ??
              "Catálogo Educativo Veterinario — fichas, pósters y videos para estudiantes y profesionales."}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/catalogo"
              className="rounded-lg bg-vetroots-600 px-6 py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-vetroots-500"
            >
              Explorar catálogo
            </Link>
            <Link
              href="/busqueda"
              className="rounded-lg border border-border-subtle px-6 py-3 text-sm font-semibold text-text-primary no-underline transition-colors hover:border-vetroots-700"
            >
              Buscar
            </Link>
          </div>
        </div>
      </section>

      {/* Featured content */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-xl font-semibold text-text-primary">
            Contenido destacado
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((ficha) => (
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

      {/* Categories */}
      {categories.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-xl font-semibold text-text-primary">
            Categorías
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/catalogo?category=${cat.slug}`}
                className="rounded-lg border border-border-subtle bg-surface-card p-4 no-underline transition-colors hover:border-vetroots-700"
              >
                <h3 className="font-medium text-text-primary">{cat.name}</h3>
                {cat.description && (
                  <p className="mt-1 text-sm text-text-secondary">
                    {cat.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
