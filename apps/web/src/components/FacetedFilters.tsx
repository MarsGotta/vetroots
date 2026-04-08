"use client";

import type { FacetFilters, SearchContentType } from "@/lib/meilisearch";
import type { Area, Level } from "@/lib/types";

interface FacetedFiltersProps {
  filters: FacetFilters;
  onChange: (filters: FacetFilters) => void;
  facetDistribution?: Record<string, Record<string, number>>;
}

const AREA_LABELS: Record<Area, string> = {
  anatomia: "Anatomía",
  fisiologia: "Fisiología",
  patologia: "Patología",
  farmacologia: "Farmacología",
  cirugia: "Cirugía",
  nutricion: "Nutrición",
  otro: "Otro",
};

const LEVEL_LABELS: Record<Level, string> = {
  basico: "Básico",
  intermedio: "Intermedio",
  avanzado: "Avanzado",
};

const CONTENT_TYPE_LABELS: Record<SearchContentType, string> = {
  ficha: "Fichas",
  poster: "Pósters",
  video: "Videos",
};

export default function FacetedFilters({
  filters,
  onChange,
  facetDistribution,
}: FacetedFiltersProps) {
  function toggleFilter<K extends keyof FacetFilters>(
    key: K,
    value: string
  ) {
    const current = (filters[key] as string[] | undefined) ?? [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: next.length ? next : undefined });
  }

  const speciesFacet = facetDistribution?.["species.name"] ?? {};
  const areaFacet = facetDistribution?.["area"] ?? {};
  const levelFacet = facetDistribution?.["level"] ?? {};

  const hasAnyFilter =
    filters.species?.length ||
    filters.area?.length ||
    filters.level?.length ||
    filters.contentType?.length;

  return (
    <div className="space-y-5">
      {hasAnyFilter ? (
        <button
          type="button"
          onClick={() => onChange({})}
          className="text-sm text-vetroots-400 hover:text-vetroots-300"
        >
          Limpiar filtros
        </button>
      ) : null}

      {/* Content type */}
      <FilterGroup title="Tipo de contenido">
        {(Object.entries(CONTENT_TYPE_LABELS) as [SearchContentType, string][]).map(
          ([key, label]) => (
            <FilterChip
              key={key}
              label={label}
              active={filters.contentType?.includes(key) ?? false}
              onClick={() => toggleFilter("contentType", key)}
            />
          )
        )}
      </FilterGroup>

      {/* Area */}
      <FilterGroup title="Área">
        {(Object.entries(AREA_LABELS) as [Area, string][]).map(([key, label]) => {
          const count = areaFacet[key];
          return (
            <FilterChip
              key={key}
              label={label}
              count={count}
              active={filters.area?.includes(key) ?? false}
              onClick={() => toggleFilter("area", key)}
            />
          );
        })}
      </FilterGroup>

      {/* Level */}
      <FilterGroup title="Nivel">
        {(Object.entries(LEVEL_LABELS) as [Level, string][]).map(([key, label]) => {
          const count = levelFacet[key];
          return (
            <FilterChip
              key={key}
              label={label}
              count={count}
              active={filters.level?.includes(key) ?? false}
              onClick={() => toggleFilter("level", key)}
            />
          );
        })}
      </FilterGroup>

      {/* Species — dynamic from facet distribution */}
      {Object.keys(speciesFacet).length > 0 && (
        <FilterGroup title="Especie">
          {Object.entries(speciesFacet)
            .sort(([, a], [, b]) => b - a)
            .map(([name, count]) => (
              <FilterChip
                key={name}
                label={name}
                count={count}
                active={filters.species?.includes(name) ?? false}
                onClick={() => toggleFilter("species", name)}
              />
            ))}
        </FilterGroup>
      )}
    </div>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-sm transition-colors ${
        active
          ? "border-vetroots-500 bg-vetroots-900/50 text-vetroots-300"
          : "border-border-subtle bg-surface-card text-text-secondary hover:border-vetroots-700 hover:text-text-primary"
      }`}
    >
      {label}
      {count != null && (
        <span className="ml-1 text-xs text-text-muted">({count})</span>
      )}
    </button>
  );
}
