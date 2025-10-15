import Image from "next/image";
import { promises as fs } from "node:fs";
import path from "node:path";
import Breadcrumbs from "@/components/Breadcrumbs";

type ExecMember = {
  name: string;
  role?: string;
  photo?: string;
  bio?: string;
  links?: { linkedin?: string; website?: string };
};

type ExecContent = {
  hero?: { title?: string; image?: string; alt?: string };
  intro?: string;
  members: ExecMember[];
};

async function loadExec(): Promise<ExecContent> {
  try {
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
  } catch {
    return { members: [] };
  }
}

export const dynamic = "force-static";
export const revalidate = 300;

export default async function ExecutiveTeamPage() {
  const HOME_LABEL = process.env.NEXT_PUBLIC_HOME_LABEL ?? "HomeClient";
  const data = await loadExec();
  const hero = data.hero ?? {};
  const members = data.members ?? [];

  const crumbs = [
    { label: HOME_LABEL, href: "/" },
    { label: "The Company", href: "/company" },
    { label: "Executive Team", current: true },
  ] as const;

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16">
      {/* Top breadcrumbs */}
      <div className="pt-6">
        <Breadcrumbs items={crumbs as any} />
      </div>

      {/* Compact hero band under the brand logo */}
      <section className="relative isolate mt-4 mb-10 overflow-hidden rounded-2xl border border-neutral-200">
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
        <div className="absolute inset-0 bg-[#0A1C7C]/80 mix-blend-multiply" />
        <div className="relative px-6 py-10 md:px-10">
          <h1 className="text-2xl md:text-4xl font-semibold tracking-tight text-white">
            {hero.title ?? "Executive Team"}
          </h1>
        </div>
      </section>

      {/* Intro */}
      {data.intro && (
        <section className="mb-8">
          <p className="text-lg text-neutral-800">{data.intro}</p>
        </section>
      )}

      {/* Members – compact cards (smaller than Board) */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Team</h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m, i) => (
            <li
              key={`${m.name}-${i}`}
              className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden"
            >
              {/* Smaller photo area */}
              <div className="h-40 md:h-48 bg-neutral-50">
                {m.photo ? (
                  <Image
                    src={m.photo}
                    alt={m.name}
                    width={800}
                    height={600}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-neutral-400">
                    No photo
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="p-4 space-y-1.5">
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
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}