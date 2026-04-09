import Link from "next/link";
import ContentCard from "@/components/ContentCard";
import { getHomePage, getFichas, getCategories } from "@/lib/strapi";

export const revalidate = 3600;

const features = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: "Fichas educativas",
    description: "Contenido estructurado y revisado por profesionales.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
      </svg>
    ),
    title: "Pósters ilustrados",
    description: "Material visual para estudio y consulta rápida.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
    title: "Videos explicativos",
    description: "Aprende con demostraciones y explicaciones en video.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    ),
    title: "Búsqueda avanzada",
    description: "Encuentra contenido por especie, área o nivel.",
  },
];

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
      {/* Hero with rotated card */}
      <section className="relative overflow-hidden bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-16 sm:px-6 sm:py-24 lg:flex-row lg:px-8">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-5xl">
              {home?.heroTitle ?? "Vetroots"}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary lg:mx-0">
              {home?.heroSubtitle ??
                "Catálogo Educativo Veterinario — fichas, pósters y videos para estudiantes y profesionales."}
            </p>
            <div className="mt-8 flex justify-center gap-4 lg:justify-start">
              <Link
                href="/catalogo"
                className="rounded-[var(--radius-md)] bg-brand-primary px-6 py-3 text-sm font-semibold text-surface-card no-underline transition-opacity hover:opacity-90"
              >
                Explorar catálogo
              </Link>
              <Link
                href="/busqueda"
                className="rounded-[var(--radius-md)] border border-border-subtle px-6 py-3 text-sm font-semibold text-text-primary no-underline transition-colors hover:border-brand-primary"
              >
                Buscar
              </Link>
            </div>
          </div>

          {/* Rotated card preview */}
          <div className="relative flex-shrink-0">
            <div className="relative h-64 w-56 rotate-3 overflow-hidden rounded-[var(--radius-lg)] border border-border-subtle bg-surface-card shadow-xl sm:h-80 sm:w-72">
              <div className="flex h-full items-center justify-center bg-surface-placeholder text-text-muted">
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
            </div>
            {/* Decorative circle */}
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-brand-primary/5" />
            <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-accent-coral/10" />
          </div>
        </div>
      </section>

      {/* Feature band */}
      <section className="bg-surface-elevated">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-[var(--radius-md)] bg-surface-card p-6 text-center"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted text-brand-primary">
                  {feature.icon}
                </div>
                <h3 className="text-sm font-semibold text-text-primary">
                  {feature.title}
                </h3>
                <p className="mt-1 text-sm text-text-secondary">
                  {feature.description}
                </p>
              </div>
            ))}
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

      {/* CTA Banner */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-[var(--radius-xl)] bg-brand-primary px-8 py-12 text-center sm:px-16 sm:py-16">
          <h2 className="text-2xl font-bold text-surface-card sm:text-3xl">
            Explora todo el catálogo
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-surface-card/80">
            Fichas, pósters y videos organizados por categoría, especie y nivel
            de dificultad.
          </p>
          <Link
            href="/catalogo"
            className="mt-6 inline-block rounded-[var(--radius-md)] bg-surface-card px-8 py-3 text-sm font-semibold text-brand-primary no-underline transition-opacity hover:opacity-90"
          >
            Ver catálogo completo
          </Link>
        </div>
      </section>

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
                className="rounded-[var(--radius-md)] border border-border-subtle bg-surface-card p-4 no-underline transition-colors hover:border-brand-secondary"
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
