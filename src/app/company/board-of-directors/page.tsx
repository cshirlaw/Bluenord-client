import Image from "next/image";
import Link from "next/link";
import { promises as fs } from "node:fs";
import path from "node:path";

type BoardMember = {
  name: string;
  role?: string;
  photo?: string;
  bio?: string;
  links?: { linkedin?: string; website?: string };
};

type BoardContent = {
  hero?: { title?: string; image?: string; alt?: string };
  intro?: string;
  members: BoardMember[];
};

async function loadBoard(): Promise<BoardContent> {
  try {
    const file = await fs.readFile(
      path.join(process.cwd(), "src/content/board.json"),
      "utf8"
    );
    const json = JSON.parse(file);
    return {
      hero: json.hero ?? {},
      intro: json.intro ?? "",
      members: Array.isArray(json.members) ? json.members : [],
    };
  } catch {
    return { members: [] };
  }
}

export const dynamic = "force-static";
export const revalidate = 300;

export default async function BoardPage() {
  const data = await loadBoard();
  const hero = data.hero ?? {};
  const members = data.members ?? [];

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16">
      {/* Small spacer so the hero clears the top logo/nav nicely */}
      <div className="pt-4 md:pt-6" />

      {/* Hero (contained full-bleed look within the page container) */}
      <section className="relative isolate -mx-4 mb-10 overflow-hidden rounded-2xl border border-neutral-200 mt-1">
        {hero.image && (
          <Image
            src={hero.image}
            alt={hero.alt ?? ""}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-[#0A1C7C]/85 mix-blend-multiply" />
        <div className="relative px-6 py-14 md:px-10 md:py-16">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
            {hero.title ?? "Our Board of Directors"}
          </h1>
        </div>
      </section>

      {/* Intro */}
      {data.intro && (
        <section className="mb-10">
          <h2 className="sr-only">Overview</h2>
          <p className="text-lg text-neutral-800">{data.intro}</p>
        </section>
      )}

      {/* Members grid */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Board</h2>

        {/* Smaller cards: more columns on larger screens + shorter photo height */}
        <ul className="grid gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {members.map((m, i) => (
            <li
              key={`${m.name}-${i}`}
              className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden"
            >
              {/* Photo — fixed smaller height to reduce overall visual size */}
              <div className="bg-neutral-50 h-40 md:h-44 lg:h-48">
                {m.photo ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={m.photo}
                      alt={m.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center text-neutral-400">
                    No photo
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="p-4 space-y-2">
                <div className="text-base md:text-lg font-semibold text-neutral-900">
                  {m.name}
                </div>
                {m.role && (
                  <div className="text-sm font-medium text-[#0A1C7C]">
                    {m.role}
                  </div>
                )}
                {m.bio && (
                  <p className="text-sm text-neutral-700">{m.bio}</p>
                )}

                {/* Links */}
                {(m.links?.linkedin || m.links?.website) && (
                  <div className="pt-2 flex gap-3">
                    {m.links?.linkedin && (
                      <Link
                        href={m.links.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm text-neutral-700 hover:bg-neutral-50"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                          <path
                            fill="currentColor"
                            d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM4 9h4v12H4zM10 9h3.8v1.7h.05c.53-1.01 1.82-2.07 3.75-2.07 4.01 0 4.75 2.64 4.75 6.06V21h-4v-5.32c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.81V21h-4z"
                          />
                        </svg>
                        LinkedIn
                      </Link>
                    )}
                    {m.links?.website && (
                      <Link
                        href={m.links.website}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm text-neutral-700 hover:bg-neutral-50"
                      >
                        🌐 Website
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}