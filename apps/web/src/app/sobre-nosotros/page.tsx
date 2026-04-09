import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAboutPage, strapiMediaUrl } from "@/lib/strapi";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Sobre Nosotros",
  description: "Conoce a Vetroots y a su creadora.",
};

export default async function SobreNosotrosPage() {
  let about = null;
  try {
    const res = await getAboutPage();
    about = res.data;
  } catch {
    // CMS may not be running yet
  }

  const luPhotoUrl = about?.luPhoto ? strapiMediaUrl(about.luPhoto) : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-12 text-center text-2xl font-bold text-text-primary sm:text-3xl">
        {about?.title ?? "Sobre Nosotros"}
      </h1>

      {/* Two-column: text + rotated image card */}
      <div className="flex flex-col items-center gap-12 md:flex-row md:items-start">
        {/* Text */}
        <div className="flex-1">
          {about?.content || about?.luBio ? (
            <div className="prose max-w-none">
              <p className="text-text-secondary">
                Contenido disponible desde Strapi.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-lg text-text-secondary">
                Vetroots es un catálogo educativo veterinario creado para
                estudiantes y profesionales de la medicina veterinaria.
              </p>
              <p className="text-text-secondary">
                Nuestro objetivo es proporcionar recursos educativos de alta
                calidad, organizados y accesibles, para facilitar el aprendizaje
                continuo en ciencias veterinarias.
              </p>
            </div>
          )}
        </div>

        {/* Rotated image card with green shadow */}
        <div className="relative flex-shrink-0">
          <div className="relative h-72 w-56 -rotate-3 overflow-hidden rounded-[var(--radius-lg)] border border-border-subtle bg-surface-card shadow-xl sm:h-80 sm:w-64">
            {luPhotoUrl ? (
              <Image
                src={luPhotoUrl}
                alt="Lu"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-text-muted">
                Foto
              </div>
            )}
          </div>
          {/* Decorative green shadow */}
          <div className="absolute inset-0 -z-10 translate-x-3 translate-y-3 -rotate-3 rounded-[var(--radius-lg)] bg-brand-secondary/20" />
        </div>
      </div>

      {/* Profile section */}
      <section className="mt-16">
        <h2 className="mb-8 text-center text-xl font-semibold text-text-primary">
          Nuestro equipo
        </h2>
        <div className="flex justify-center">
          <div className="text-center">
            <div className="mx-auto mb-3 h-[120px] w-[120px] overflow-hidden rounded-full border-2 border-border-subtle bg-surface-placeholder">
              {luPhotoUrl ? (
                <Image
                  src={luPhotoUrl}
                  alt="Lu"
                  width={120}
                  height={120}
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-text-muted text-sm">
                  Foto
                </div>
              )}
            </div>
            <h3 className="font-semibold text-text-primary">Lu</h3>
            <p className="text-sm text-text-secondary">Creadora de Vetroots</p>
          </div>
        </div>
      </section>

      {/* CTA section with coral button */}
      <section className="mt-16 text-center">
        <h2 className="text-xl font-semibold text-text-primary">
          Explora nuestro contenido
        </h2>
        <p className="mt-2 text-text-secondary">
          Descubre fichas, pósters y videos para tu formación veterinaria.
        </p>
        <Link
          href="/catalogo"
          className="mt-6 inline-block rounded-[var(--radius-md)] bg-accent-coral px-8 py-3 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
        >
          Ver catálogo
        </Link>
      </section>
    </div>
  );
}
