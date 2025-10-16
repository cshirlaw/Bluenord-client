import { promises as fs } from "node:fs";
import path from "node:path";
import Breadcrumbs from "@/components/Breadcrumbs";

type Person = {
  name: string;
  role?: string;
  photo?: string;
  bio?: string;
};

type BoardContent = {
  hero?: { title?: string; image?: string; alt?: string };
  intro?: string;
  members: Person[];
};

async function loadBoard(): Promise<BoardContent> {
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
}

export const dynamic = "force-static";
export const revalidate = 300;

export default async function BoardPage() {
  const HOME_LABEL = process.env.NEXT_PUBLIC_HOME_LABEL ?? "HomeClient";
  const data = await loadBoard();
  const hero = data.hero ?? {};
  const people = data.members ?? [];

  const crumbs = [
    { label: HOME_LABEL, href: "/" },
    { label: "The Company", href: "/company" },
    { label: "Board of Directors", current: true },
  ] as const;

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16">
      {/* Breadcrumbs */}
      <div className="pt-6">
        <Breadcrumbs items={crumbs as any} />
      </div>

      {/* Hero band (no blue wash) */}
      <section
        className="relative isolate mt-4 mb-10 overflow-hidden rounded-2xl border border-neutral-200"
        style={
          hero.image
            ? {
                backgroundImage: `url('${hero.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        <div className="relative px-6 py-14 md:px-10 md:py-16">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white drop-shadow">
            {hero.title ?? "Our Board of Directors"}
          </h1>
        </div>
      </section>

      {/* Intro */}
      {data.intro ? (
        <section className="mb-8">
          <p className="text-lg text-neutral-800">{data.intro}</p>
        </section>
      ) : null}

      {/* Compact cards that fit photo size */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Board</h2>

        <ul className="flex flex-wrap gap-4">
          {people.map((p) => (
            <li key={p.name} className="w-[240px]">
              <details className="group rounded-xl border border-neutral-200 bg-white shadow-sm text-sm">
                <summary className="list-none cursor-pointer">
                  {/* Photo box (compact) */}
                  <div className="relative aspect-[4/3] bg-white max-h-32 sm:max-h-36 w-full p-1.5 rounded-t-xl overflow-hidden">
                    {p.photo ? (
                      <img
                        src={p.photo}
                        alt={p.name}
                        className="absolute inset-0 h-full w-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                        No photo
                      </div>
                    )}
                  </div>

                  {/* Text (compact) */}
                  <div className="p-3">
                    <div className="text-base font-semibold text-neutral-900">
                      {p.name}
                    </div>
                    {p.role && (
                      <div className="text-xs font-medium text-[#0A1C7C]">
                        {p.role}
                      </div>
                    )}
                    {p.bio && (
                      <div className="pt-1 text-[11px] text-neutral-500">
                        <span className="group-open:hidden">Click to read bio</span>
                        <span className="hidden group-open:inline">Click to close</span>
                      </div>
                    )}
                  </div>
                </summary>

                {p.bio && (
                  <div className="border-t px-4 py-4">
                    <article className="prose prose-neutral max-w-none">
                      {p.bio.split("\n\n").map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </article>
                  </div>
                )}
              </details>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}