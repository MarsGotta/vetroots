import type {
  StrapiResponse,
  Ficha,
  Poster,
  Video,
  Category,
  Species,
  HomePage,
  AboutPage,
} from "./types";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

async function fetchStrapi<T>(
  path: string,
  params?: Record<string, string>
): Promise<T> {
  const url = new URL(`/api${path}`, STRAPI_URL);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
  }

  const res = await fetch(url.toString(), {
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Strapi ${path} returned ${res.status}`);
  }

  return res.json() as Promise<T>;
}

/** Fetch with graceful fallback — returns fallback value on any error (network, 4xx, 5xx). */
async function fetchStrapiSafe<T>(
  path: string,
  params: Record<string, string>,
  fallback: T
): Promise<T> {
  try {
    return await fetchStrapi<T>(path, params);
  } catch {
    return fallback;
  }
}

// --- Fichas ---

const EMPTY_LIST: StrapiResponse<never[]> = { data: [], meta: {} };

export async function getFichas(): Promise<StrapiResponse<Ficha[]>> {
  return fetchStrapiSafe<StrapiResponse<Ficha[]>>("/fichas", {
    "populate[coverImage]": "true",
    "populate[category]": "true",
    "populate[species]": "true",
    "populate[tags]": "true",
    "sort": "publishedAt:desc",
    "pagination[pageSize]": "100",
    "status": "published",
  }, EMPTY_LIST as StrapiResponse<Ficha[]>);
}

export async function getFichaBySlug(
  slug: string
): Promise<StrapiResponse<Ficha[]>> {
  return fetchStrapiSafe<StrapiResponse<Ficha[]>>("/fichas", {
    "filters[slug][$eq]": slug,
    "populate[coverImage]": "true",
    "populate[images]": "true",
    "populate[category]": "true",
    "populate[species]": "true",
    "populate[tags]": "true",
    "status": "published",
  }, EMPTY_LIST as StrapiResponse<Ficha[]>);
}

// --- Posters ---

export async function getPosters(): Promise<StrapiResponse<Poster[]>> {
  return fetchStrapiSafe<StrapiResponse<Poster[]>>("/posters", {
    "populate[image]": "true",
    "populate[category]": "true",
    "populate[species]": "true",
    "populate[tags]": "true",
    "sort": "publishedAt:desc",
    "pagination[pageSize]": "100",
    "status": "published",
  }, EMPTY_LIST as StrapiResponse<Poster[]>);
}

export async function getPosterBySlug(
  slug: string
): Promise<StrapiResponse<Poster[]>> {
  return fetchStrapiSafe<StrapiResponse<Poster[]>>("/posters", {
    "filters[slug][$eq]": slug,
    "populate[image]": "true",
    "populate[downloadablePdf]": "true",
    "populate[category]": "true",
    "populate[species]": "true",
    "populate[tags]": "true",
    "status": "published",
  }, EMPTY_LIST as StrapiResponse<Poster[]>);
}

// --- Videos ---

export async function getVideos(): Promise<StrapiResponse<Video[]>> {
  return fetchStrapiSafe<StrapiResponse<Video[]>>("/videos", {
    "populate[thumbnail]": "true",
    "populate[category]": "true",
    "populate[species]": "true",
    "populate[tags]": "true",
    "sort": "publishedAt:desc",
    "pagination[pageSize]": "100",
    "status": "published",
  }, EMPTY_LIST as StrapiResponse<Video[]>);
}

export async function getVideoBySlug(
  slug: string
): Promise<StrapiResponse<Video[]>> {
  return fetchStrapiSafe<StrapiResponse<Video[]>>("/videos", {
    "filters[slug][$eq]": slug,
    "populate[thumbnail]": "true",
    "populate[category]": "true",
    "populate[species]": "true",
    "populate[tags]": "true",
    "status": "published",
  }, EMPTY_LIST as StrapiResponse<Video[]>);
}

// --- Categories ---

export async function getCategories(): Promise<StrapiResponse<Category[]>> {
  return fetchStrapiSafe<StrapiResponse<Category[]>>("/categories", {
    "populate[icon]": "true",
    "sort": "order:asc",
    "pagination[pageSize]": "100",
  }, EMPTY_LIST as StrapiResponse<Category[]>);
}

// --- Species ---

export async function getSpecies(): Promise<StrapiResponse<Species[]>> {
  return fetchStrapiSafe<StrapiResponse<Species[]>>("/species", {
    "populate[icon]": "true",
    "pagination[pageSize]": "100",
  }, EMPTY_LIST as StrapiResponse<Species[]>);
}

// --- Single types ---

const EMPTY_SINGLE = { data: null as never, meta: {} };

export async function getHomePage(): Promise<StrapiResponse<HomePage>> {
  return fetchStrapiSafe<StrapiResponse<HomePage>>("/home-page", {
    "populate[heroImage]": "true",
    "populate[featuredFichas][populate][coverImage]": "true",
    "populate[featuredPosters][populate][image]": "true",
    "status": "published",
  }, EMPTY_SINGLE as unknown as StrapiResponse<HomePage>);
}

export async function getAboutPage(): Promise<StrapiResponse<AboutPage>> {
  return fetchStrapiSafe<StrapiResponse<AboutPage>>("/about-page", {
    "populate[luPhoto]": "true",
    "status": "published",
  }, EMPTY_SINGLE as unknown as StrapiResponse<AboutPage>);
}

// --- Helpers ---

export function strapiMediaUrl(media: { url: string } | null): string | null {
  if (!media?.url) return null;
  if (media.url.startsWith("http")) return media.url;
  return `${STRAPI_URL}${media.url}`;
}
