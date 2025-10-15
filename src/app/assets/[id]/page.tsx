// src/app/assets/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { loadAssets, getPrevNext } from "@/lib/assets";
import AssetOverview from "@/components/AssetOverview";
import VideoEmbed from "@/components/VideoEmbed";

export const revalidate = 60;

export async function generateStaticParams() {
  const { items } = await loadAssets();
  return items.map((i) => ({ id: i.id }));
}

export default async function AssetPage({ params }: { params: { id: string } }) {
  const { items } = await loadAssets();
  const asset = items.find(i => i.id?.toLowerCase() === params.id.toLowerCase());
  if (!asset) return notFound();

  const { prev, next } = getPrevNext(items, asset.id);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold">{asset.name}</h1>
        {asset.image && (
          <div className="mt-4 rounded-2xl overflow-hidden border border-neutral-200">
            <Image
              src={asset.image}
              alt={asset.alt ?? asset.name}
              width={1600}
              height={900}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        )}
      </header>

      <AssetOverview asset={asset} />

      {/* Project video (e.g., Tyra’s Vimeo) */}
      {asset.videoSrc ? (
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Project video</h2>
          <VideoEmbed src={asset.videoSrc} title={`${asset.name} video`} />
        </section>
      ) : null}

      {Array.isArray(asset.photos) && asset.photos.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Gallery</h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {asset.photos.map((p, idx) => (
              <li key={idx} className="overflow-hidden rounded-xl border border-neutral-200">
                <Image
                  src={p.src}
                  alt={p.alt ?? asset.name}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav className="mt-10 flex justify-between gap-4">
        <div>
          {prev && (
            <Link
              href={`/assets/${prev.id}`}
              className="inline-block rounded-xl border px-4 py-2 hover:bg-neutral-50"
            >
              ← {prev.name}
            </Link>
          )}
        </div>
        <div>
          {next && (
            <Link
              href={`/assets/${next.id}`}
              className="inline-block rounded-xl border px-4 py-2 hover:bg-neutral-50"
            >
              {next.name} →
            </Link>
          )}
        </div>
      </nav>
    </main>
  );
}