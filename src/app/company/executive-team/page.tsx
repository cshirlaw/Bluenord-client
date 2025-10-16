import { promises as fs } from "node:fs";
import path from "node:path";
import Breadcrumbs from "@/components/Breadcrumbs";

type ExecPerson = {
  name: string;
  role?: string;
  photo?: string;
  bio?: string;
};

type ExecContent = {
  hero?: { title?: string; image?: string; alt?: string };
  intro?: string;
  members: ExecPerson[];
};

async function loadExec(): Promise<ExecContent> {
  const file = await fs.readFile(
    path.join(process.cwd(), "src/content/executive.json"),
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

export default async function ExecutiveTeamPage() {
  const HOME_LABEL = process.env.NEXT_PUBLIC_HOME_LABEL ?? "HomeClient";
  const data = await loadExec();
  const hero = data.hero ?? {};
  const people = data.members ?? [];

  const crumbs = [
    { label: HOME_LABEL, href: "/" },
    { label: "The Company", href: "/company" },
    { label: "Executive Team", current: true },
  ] as const;

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16">
      {/* Breadcrumbs */}
      <div className="pt-6">
        <Breadcrumbs items={crumbs as any} />
      </div>

            {/* Hero band — same height as Board, no blue overlay */}
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
        {/* match Board hero height via same padding */}
        <div className="relative px-6 py-14 md:px-10 md:py-16">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white drop-shadow">
            {hero.title ?? "Executive Team"}
          </h1>
        </div>
      </section>

      {/* Intro */}
      {data.intro ? (
        <section className="mb-6">
          <p className="text-lg text-neutral-800">{data.intro}</p>
        </section>
      ) : null}

      {/* Cards (match Board layout: 4 columns on large) */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Team</h2>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {people.map((p) => (
            <li key={p.name}>
              <details className="group rounded-2xl border border-neutral-200 bg-white shadow-sm">
                <summary className="list-none cursor-pointer">
                  <div className="rounded-2xl overflow-hidden">
                    {/* Same image box as Board */}
                    <div className="relative aspect-[4/3] bg-white">
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

                    <div className="p-4">
                      <div className="text-lg font-semibold text-neutral-900">
                        {p.name}
                      </div>
                      {p.role && (
                        <div className="text-sm font-medium text-[#0A1C7C]">
                          {p.role}
                        </div>
                      )}
                      {p.bio && (
                        <div className="pt-1 text-xs text-neutral-500">
                          <span className="group-open:hidden">Click to read bio</span>
                          <span className="hidden group-open:inline">Click to close</span>
                        </div>
                      )}
                    </div>
                  </div>
                </summary>

                {p.bio && (
                  <div className="border-t px-4 py-4 sm:px-6">
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