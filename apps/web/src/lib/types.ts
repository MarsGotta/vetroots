// Types matching Strapi v5 schemas

export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  } | null;
}

export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Content types

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
  icon: StrapiMedia | null;
  order: number | null;
}

export interface Species {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  icon: StrapiMedia | null;
}

export interface Tag {
  id: number;
  documentId: string;
  name: string;
  slug: string;
}

export type Area =
  | "anatomia"
  | "fisiologia"
  | "patologia"
  | "farmacologia"
  | "cirugia"
  | "nutricion"
  | "otro";

export type Level = "basico" | "intermedio" | "avanzado";

export interface Ficha {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: unknown[]; // Strapi blocks editor
  summary: string | null;
  coverImage: StrapiMedia;
  images: StrapiMedia[] | null;
  category: Category | null;
  species: Species[];
  area: Area | null;
  level: Level | null;
  tags: Tag[];
  publishedAt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
}

export interface Poster {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string | null;
  image: StrapiMedia;
  downloadablePdf: StrapiMedia | null;
  category: Category | null;
  species: Species[];
  area: Area | null;
  level: Level | null;
  tags: Tag[];
  publishedAt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
}

export interface Video {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string | null;
  videoUrl: string;
  duration: number | null;
  thumbnail: StrapiMedia | null;
  transcription: unknown[] | null; // Strapi blocks editor
  category: Category | null;
  species: Species[];
  area: Area | null;
  level: Level | null;
  tags: Tag[];
  publishedAt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
}

export interface HomePage {
  id: number;
  documentId: string;
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroImage: StrapiMedia | null;
  featuredFichas: Ficha[];
  featuredPosters: Poster[];
}

export interface AboutPage {
  id: number;
  documentId: string;
  title: string | null;
  content: unknown[] | null;
  luBio: unknown[] | null;
  luPhoto: StrapiMedia | null;
}
