import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getVideoBySlug, getVideos } from "@/lib/strapi";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const res = await getVideos();
    return res.data.map((v) => ({ slug: v.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await getVideoBySlug(slug);
    const video = res.data[0];
    if (!video) return { title: "Video no encontrado" };
    return {
      title: video.seoTitle ?? video.title,
      description: video.seoDescription ?? video.description ?? undefined,
    };
  } catch {
    return { title: "Video" };
  }
}

function getEmbedUrl(videoUrl: string): string | null {
  try {
    const url = new URL(videoUrl);

    // YouTube
    if (url.hostname.includes("youtube.com") || url.hostname.includes("youtu.be")) {
      let videoId: string | null = null;
      if (url.hostname.includes("youtu.be")) {
        videoId = url.pathname.slice(1);
      } else {
        videoId = url.searchParams.get("v");
      }
      if (videoId) {
        return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`;
      }
    }

    // Vimeo
    if (url.hostname.includes("vimeo.com")) {
      const match = url.pathname.match(/\/(\d+)/);
      if (match) {
        return `https://player.vimeo.com/video/${match[1]}`;
      }
    }

    return videoUrl;
  } catch {
    return null;
  }
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default async function VideoPage({ params }: PageProps) {
  const { slug } = await params;
  const res = await getVideoBySlug(slug);
  const video = res.data[0];
  if (!video) notFound();

  const embedUrl = getEmbedUrl(video.videoUrl);

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {video.category && (
          <span className="rounded-full bg-vetroots-900/50 px-3 py-1 text-xs font-medium text-vetroots-400">
            {video.category.name}
          </span>
        )}
        {video.level && (
          <span className="rounded-full bg-earth-900/50 px-3 py-1 text-xs font-medium text-earth-300">
            {video.level}
          </span>
        )}
        {video.duration && (
          <span className="text-xs text-text-muted">
            {formatDuration(video.duration)}
          </span>
        )}
      </div>

      <h1 className="mb-4 text-2xl font-bold text-text-primary sm:text-3xl">
        {video.title}
      </h1>

      {video.description && (
        <p className="mb-6 text-lg text-text-secondary">{video.description}</p>
      )}

      {/* Video embed */}
      {embedUrl ? (
        <div className="relative mb-8 aspect-video overflow-hidden rounded-lg bg-black">
          <iframe
            src={embedUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      ) : (
        <a
          href={video.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-8 inline-block rounded-lg bg-vetroots-600 px-6 py-3 text-sm font-semibold text-white no-underline"
        >
          Ver video
        </a>
      )}

      {video.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {video.tags.map((tag) => (
            <span
              key={tag.id}
              className="rounded-full border border-border-subtle px-3 py-1 text-xs text-text-muted"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
