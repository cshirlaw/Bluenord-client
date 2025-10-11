import React from "react";
import Image from "next/image";

type HeroMode = "cover" | "contain";
type HeroSize = "default" | "compact";

export default function PageHero({
  imageSrc,
  image,            // tolerate both names
  imageAlt,
  title,
  intro,
  children,
  mode = "contain", // default to contain (no crop, white-first)
  size = "default",
}: {
  imageSrc?: string;
  image?: string;
  imageAlt?: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
  mode?: HeroMode;
  size?: HeroSize;
}) {
  const src = imageSrc ?? image;

  // ---------- Contain mode (no crop) ----------
  if (mode === "contain") {
    return (
      <section className="relative">
        <div className="relative mx-auto max-w-6xl px-4 pt-6 sm:pt-8">
          <div className="absolute left-4 top-4 z-10">
            <Image
              src="/images/nordblue-2-1.png"
              alt="BlueNord"
              width={120}
              height={32}
              className="h-8 w-auto drop-shadow"
              priority
            />
          </div>
          {src && (
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <Image
                src={src}
                alt={imageAlt ?? ""}
                width={2000}
                height={1200}
                className="mx-auto h-auto w-full object-contain"
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
              />
            </div>
          )}
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-6 sm:pb-8">
          <h1 className="text-3xl sm:text-5xl font-semibold leading-tight">{title}</h1>
          {intro ? (
            <p className="mt-3 max-w-2xl text-gray-700 text-sm sm:text-base">{intro}</p>
          ) : null}
          {children}
        </div>
      </section>
    );
  }

  // ---------- Cover mode (edge-to-edge) ----------
  const pad =
    size === "compact" ? "py-10 sm:py-14 lg:py-16" : "py-14 sm:py-20 lg:py-24";
  const minH =
    size === "compact" ? "min-h-[34vh] sm:min-h-[40vh]" : "min-h-[46vh] sm:min-h-[52vh]";

  return (
    <section className="relative overflow-hidden">
      {src && (
        <Image
          src={src}
          alt={imageAlt ?? ""}
          fill
          priority
          className="object-cover object-center md:object-top"
        />
      )}
      {/* keep overlay extremely light to preserve “white” aesthetic */}
      <div className="absolute inset-0 bg-black/10" />

      <div className="absolute left-4 top-4 z-10">
        <Image
          src="/images/nordblue-2-1.png"
          alt="BlueNord"
          width={120}
          height={32}
          className="h-8 w-auto drop-shadow"
          priority
        />
      </div>

      <div
        className={`relative mx-auto max-w-6xl px-4 ${pad} ${minH} flex flex-col justify-end`}
      >
        <h1 className="text-white text-3xl sm:text-5xl font-semibold leading-tight">
          {title}
        </h1>
        {intro ? (
          <p className="mt-3 max-w-2xl text-white/95 text-sm sm:text-base">
            {intro}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}