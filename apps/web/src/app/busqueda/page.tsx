"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchInput from "@/components/SearchInput";
import FacetedFilters from "@/components/FacetedFilters";
import SearchResultCard from "@/components/SearchResultCard";
import {
  searchContent,
  isMeilisearchHealthy,
  type FacetFilters,
  type SearchResult,
} from "@/lib/meilisearch";

function BusquedaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<FacetFilters>({});
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [healthy, setHealthy] = useState<boolean | null>(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    isMeilisearchHealthy().then(setHealthy);
  }, []);

  const performSearch = useCallback(
    async (q: string, f: FacetFilters) => {
      if (!q.trim() && !hasActiveFilters(f)) {
        setResult(null);
        return;
      }

      const thisRequest = ++requestIdRef.current;
      setLoading(true);
      try {
        const res = await searchContent(q, f);
        if (thisRequest === requestIdRef.current) {
          setResult(res);
        }
      } catch {
        if (thisRequest === requestIdRef.current) {
          setResult(null);
          setHealthy(false);
        }
      } finally {
        if (thisRequest === requestIdRef.current) {
          setLoading(false);
        }
      }
    },
    []
  );

  function handleQueryChange(value: string) {
    setQuery(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    router.replace(`/busqueda?${params.toString()}`, { scroll: false });
    performSearch(value, filters);
  }

  function handleFiltersChange(next: FacetFilters) {
    setFilters(next);
    performSearch(query, next);
  }

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery, filters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (healthy === false) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-2xl font-bold text-text-primary sm:text-3xl">
          Búsqueda
        </h1>
        <div className="rounded-[var(--radius-lg)] border border-border-subtle bg-surface-card p-8 text-center">
          <p className="text-text-secondary">
            El servicio de búsqueda no está disponible en este momento.
          </p>
          <p className="mt-2 text-sm text-text-muted">
            Mientras tanto, explora el contenido desde el{" "}
            <a
              href="/catalogo"
              className="text-brand-secondary hover:text-brand-primary"
            >
              catálogo
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold text-text-primary sm:text-3xl">
        Búsqueda
      </h1>

      <div className="mb-6">
        <SearchInput
          value={query}
          onChange={handleQueryChange}
          autoFocus
          debounceMs={300}
        />
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-64">
          <FacetedFilters
            filters={filters}
            onChange={handleFiltersChange}
            facetDistribution={result?.facetDistribution}
          />
        </aside>

        <div className="min-w-0 flex-1">
          {loading && (
            <div className="py-8 text-center text-text-muted">
              Buscando&hellip;
            </div>
          )}

          {!loading && result && result.hits.length > 0 && (
            <>
              <p className="mb-4 text-sm text-text-muted">
                {result.totalHits} resultado
                {result.totalHits !== 1 ? "s" : ""} en{" "}
                {result.processingTimeMs}ms
              </p>
              <div className="space-y-3">
                {result.hits.map((hit) => (
                  <SearchResultCard
                    key={`${hit._contentType}-${hit.id}`}
                    hit={hit}
                  />
                ))}
              </div>
            </>
          )}

          {!loading && result && result.hits.length === 0 && (
            <div className="rounded-[var(--radius-lg)] border border-border-subtle bg-surface-card p-8 text-center">
              <p className="text-text-secondary">
                No se encontraron resultados para &ldquo;{result.query}
                &rdquo;
              </p>
              <p className="mt-2 text-sm text-text-muted">
                Intenta con otros términos o revisa los filtros activos.
              </p>
            </div>
          )}

          {!loading && !result && (
            <div className="rounded-[var(--radius-lg)] border border-border-subtle bg-surface-card p-8 text-center">
              <p className="text-text-secondary">
                Escribe algo para buscar en fichas, pósters y videos.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BusquedaPage() {
  return (
    <Suspense fallback={null}>
      <BusquedaContent />
    </Suspense>
  );
}

function hasActiveFilters(f: FacetFilters): boolean {
  return Boolean(
    f.species?.length ||
      f.area?.length ||
      f.level?.length ||
      f.contentType?.length
  );
}
