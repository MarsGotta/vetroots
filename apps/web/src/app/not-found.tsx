import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold text-text-primary">404</h1>
      <p className="mt-2 text-text-secondary">Página no encontrada</p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-vetroots-600 px-6 py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-vetroots-500"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
