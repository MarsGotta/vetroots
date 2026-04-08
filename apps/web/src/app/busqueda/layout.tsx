import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Búsqueda",
  description:
    "Busca fichas, pósters y videos en el catálogo educativo veterinario.",
};

export default function BusquedaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
