import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const SECRET = process.env.REVALIDATION_SECRET;

const MODEL_PATHS: Record<string, (slug?: string) => string[]> = {
  ficha: (slug) => [
    ...(slug ? [`/fichas/${slug}`] : []),
    "/catalogo",
    "/",
  ],
  poster: (slug) => [
    ...(slug ? [`/posters/${slug}`] : []),
    "/catalogo",
    "/",
  ],
  video: (slug) => [
    ...(slug ? [`/videos/${slug}`] : []),
    "/catalogo",
    "/",
  ],
  category: () => ["/catalogo", "/"],
  species: () => ["/catalogo"],
  "home-page": () => ["/"],
  "about-page": () => ["/sobre-nosotros"],
};

export async function POST(request: NextRequest) {
  if (!SECRET) {
    return NextResponse.json(
      { error: "REVALIDATION_SECRET not configured" },
      { status: 500 }
    );
  }

  const headerSecret = request.headers.get("x-webhook-secret");
  if (headerSecret !== SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  let body: { model?: string; entry?: { slug?: string } };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const model = body.model;
  if (!model) {
    return NextResponse.json({ error: "Missing model" }, { status: 400 });
  }

  const pathsFn = MODEL_PATHS[model];
  if (!pathsFn) {
    return NextResponse.json({ revalidated: false, message: `Unknown model: ${model}` });
  }

  const paths = pathsFn(body.entry?.slug);
  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({ revalidated: true, paths });
}
