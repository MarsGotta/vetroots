import { MeiliSearch } from "meilisearch";

const MEILISEARCH_HOST =
  process.env.NEXT_PUBLIC_MEILISEARCH_HOST ?? "http://localhost:7700";
const MEILISEARCH_SEARCH_KEY =
  process.env.NEXT_PUBLIC_MEILISEARCH_SEARCH_KEY ?? "";

export const searchClient = new MeiliSearch({
  host: MEILISEARCH_HOST,
  apiKey: MEILISEARCH_SEARCH_KEY,
});

export const SEARCH_INDEXES = {
  ficha: "ficha",
  poster: "poster",
  video: "video",
} as const;

export type SearchContentType = keyof typeof SEARCH_INDEXES;

export interface SearchHit {
  id: number;
  title: string;
  slug: string;
  summary?: string | null;
  description?: string | null;
  area?: string | null;
  level?: string | null;
  category?: { name: string; slug: string } | null;
  species?: Array<{ name: string; slug: string }>;
  tags?: Array<{ name: string; slug: string }>;
  _contentType: SearchContentType;
}

export interface FacetFilters {
  species?: string[];
  area?: string[];
  level?: string[];
  contentType?: SearchContentType[];
}

export interface SearchResult {
  hits: SearchHit[];
  totalHits: number;
  query: string;
  processingTimeMs: number;
  facetDistribution?: Record<string, Record<string, number>>;
}

/**
 * Search across all content indexes (ficha, poster, video).
 * Uses the public search-only API key — safe for client-side.
 */
export async function searchContent(
  query: string,
  filters: FacetFilters = {},
  limit = 20,
  offset = 0
): Promise<SearchResult> {
  const indexesToSearch = filters.contentType?.length
    ? filters.contentType
    : (Object.keys(SEARCH_INDEXES) as SearchContentType[]);

  const filterExpressions = buildFilterExpressions(filters);

  const results = await Promise.all(
    indexesToSearch.map(async (indexName) => {
      try {
        const index = searchClient.index(indexName);
        const result = await index.search<Omit<SearchHit, "_contentType">>(
          query,
          {
            limit,
            offset,
            filter: filterExpressions,
            facets: ["species.name", "area", "level"],
            attributesToHighlight: ["title", "summary", "description"],
          }
        );
        return {
          hits: result.hits.map((hit) => ({
            ...hit,
            _contentType: indexName,
          })),
          estimatedTotalHits: result.estimatedTotalHits ?? 0,
          processingTimeMs: result.processingTimeMs ?? 0,
          facetDistribution: result.facetDistribution ?? {},
        };
      } catch {
        // Graceful degradation when an index is unavailable
        return {
          hits: [],
          estimatedTotalHits: 0,
          processingTimeMs: 0,
          facetDistribution: {},
        };
      }
    })
  );

  const allHits = results.flatMap((r) => r.hits);
  const totalHits = results.reduce((sum, r) => sum + r.estimatedTotalHits, 0);
  const maxProcessingTime = Math.max(...results.map((r) => r.processingTimeMs));

  // Merge facet distributions across indexes
  const mergedFacets: Record<string, Record<string, number>> = {};
  for (const result of results) {
    for (const [facetKey, facetValues] of Object.entries(
      result.facetDistribution
    )) {
      if (!mergedFacets[facetKey]) {
        mergedFacets[facetKey] = {};
      }
      for (const [value, count] of Object.entries(facetValues)) {
        mergedFacets[facetKey][value] =
          (mergedFacets[facetKey][value] ?? 0) + count;
      }
    }
  }

  return {
    hits: allHits,
    totalHits,
    query,
    processingTimeMs: maxProcessingTime,
    facetDistribution: mergedFacets,
  };
}

function buildFilterExpressions(filters: FacetFilters): string[] {
  const expressions: string[] = [];

  if (filters.species?.length) {
    const speciesFilter = filters.species
      .map((s) => `species.name = "${escapeFilterValue(s)}"`)
      .join(" OR ");
    expressions.push(`(${speciesFilter})`);
  }

  if (filters.area?.length) {
    const areaFilter = filters.area
      .map((a) => `area = "${escapeFilterValue(a)}"`)
      .join(" OR ");
    expressions.push(`(${areaFilter})`);
  }

  if (filters.level?.length) {
    const levelFilter = filters.level
      .map((l) => `level = "${escapeFilterValue(l)}"`)
      .join(" OR ");
    expressions.push(`(${levelFilter})`);
  }

  return expressions;
}

function escapeFilterValue(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

/**
 * Check if Meilisearch is reachable. Used for graceful degradation.
 */
export async function isMeilisearchHealthy(): Promise<boolean> {
  try {
    const health = await searchClient.health();
    return health.status === "available";
  } catch {
    return false;
  }
}

export function contentTypeHref(
  contentType: SearchContentType,
  slug: string
): string {
  switch (contentType) {
    case "ficha":
      return `/fichas/${slug}`;
    case "poster":
      return `/posters/${slug}`;
    case "video":
      return `/videos/${slug}`;
  }
}

export function contentTypeLabel(contentType: SearchContentType): string {
  switch (contentType) {
    case "ficha":
      return "Ficha";
    case "poster":
      return "Póster";
    case "video":
      return "Video";
  }
}
