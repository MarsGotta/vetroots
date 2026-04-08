import type { Metadata } from "next";
import Image from "next/image";
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
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-2xl font-bold text-text-primary sm:text-3xl">
        {about?.title ?? "Sobre Nosotros"}
      </h1>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Photo */}
        <div className="md:col-span-1">
          {luPhotoUrl ? (
            <Image
              src={luPhotoUrl}
              alt="Lu"
              width={400}
              height={400}
              className="rounded-lg object-cover"
            />
          ) : (
            <div className="flex aspect-square items-center justify-center rounded-lg bg-surface-card text-text-muted">
              Foto
            </div>
          )}
        </div>

        {/* Bio */}
        <div className="md:col-span-2">
          {about?.content || about?.luBio ? (
            <div className="prose prose-invert max-w-none">
              {/* TODO: render Strapi blocks content */}
              <p className="text-text-secondary">
                Contenido disponible desde Strapi.
              </p>
            </div>
          ) : (
            <p className="text-text-secondary">
              Vetroots es un catálogo educativo veterinario creado para
              estudiantes y profesionales de la medicina veterinaria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
