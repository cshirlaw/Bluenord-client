import React from "react";
import Image from "next/image";

type HeroMode = "cover" | "contain";
type HeroSize = "default" | "compact";
type HeroOverlay = "none" | "tint" | "gradient";
type Align = "top" | "center" | "bottom";   // vertical (contain)
type Focus = "top" | "center" | "bottom";   // object-position bias (cover/contain)
type HAlign = "left" | "center";            // horizontal (contain)

export default function PageHero({
  imageSrc,
  image,            // tolerate both names
  imageAlt,
  title,
  intro,
  children,
  mode = "contain",
  size = "compact",
  overlay = "none",
  overlayStrength = 70, // 0–100
  titleBox = false,
  eyebrow,
  align = "center",     // vertical anchor (contain)
  focus = "center",     // object-position bias
  hAlign = "left",      // default LEFT
}: {
  imageSrc?: string;
  image?: string;
  imageAlt?: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
  mode?: HeroMode;
  size?: HeroSize;
  overlay?: HeroOverlay;
  overlayStrength?: number;
  titleBox?: boolean;
  eyebrow?: string;
  align?: Align;
  focus?: Focus;
  hAlign?: HAlign;
}) {
  const src = imageSrc ?? image;

  // Height caps (contain mode)
  const containCap =
    size === "compact"
      ? "h-[14rem] sm:h-[16rem] lg:h-[18rem]"
      : "h-[20rem] sm:h-[22rem] lg:h-[26rem]";

  const pad =
    size === "compact" ? "py-10 sm:py-14 lg:py-16" : "py-14 sm:py-20 lg:py-24";
  const minH =
    size === "compact" ? "min-h-[34vh] sm:min-h-[40vh]" : "min-h-[46vh] sm:min-h-[52vh]";

  // Overlay helpers
  const deepRGB = "10,42,106"; // #0A2A6A
  const clamped = Math.max(0, Math.min(100, overlayStrength)) / 100;
  const tintStyle = { backgroundColor: `rgba(${deepRGB}, ${clamped})` };
  const gradientStyle = {
    backgroundImage: `linear-gradient(180deg,
      rgba(${deepRGB}, ${clamped}) 0%,
      rgba(${deepRGB}, ${Math.max(0, clamped - 0.3)}) 40%,
      rgba(${deepRGB}, 0) 100%)`,
  };

  // Alignment helpers
  const vAlign =
    align === "bottom" ? "items-end" : align === "top" ? "items-start" : "items-center";
  const hJustify = hAlign === "left" ? "justify-start" : "justify-center";
  const focusClass =
    focus === "bottom" ? "object-bottom" : focus === "top" ? "object-top" : "object-center";

  // ---------- Contain mode (no crop) ----------
  if (mode === "contain") {
    return (
      <section className="relative">
        <div className="relative mx-auto max-w-6xl px-4 pt-6 sm:pt-8">
          {src && (
            <div
              className={[
                "inline-block overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm",
                containCap,
                "max-w-full",
              ].join(" ")}
            >
              <div className={`relative flex h-full w-auto ${vAlign} ${hJustify}`}>
                <Image
                  src={src}
                  alt={imageAlt ?? ""}
                  width={2000}
                  height={1200}
                  className={`max-h-full w-auto object-contain ${focusClass}`}
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  priority
                />
              </div>
            </div>
          )}
        </div>

        <div className="mx-auto max-w-6xl px-4 mt-6 sm:mt-8 pb-6 sm:pb-8">
          {titleBox ? (
            <div className="inline-block rounded-3xl bg-[rgba(10,42,106,0.95)] px-6 py-4 text-white shadow-lg">
              {eyebrow && <p className="text-sm text-[rgba(140,224,255,0.95)]">{eyebrow}</p>}
              <h1 className="mt-1 text-3xl sm:text-5xl font-semibold leading-tight">{title}</h1>
              {intro ? <p className="mt-2 max-w-2xl text-white/90 text-sm sm:text-base">{intro}</p> : null}
            </div>
          ) : (
            <>
              <h1 className="text-3xl sm:text-5xl font-semibold leading-tight">{title}</h1>
              {intro ? <p className="mt-3 max-w-2xl text-gray-700 text-sm sm:text-base">{intro}</p> : null}
            </>
          )}
          {children}
        </div>
      </section>
    );
  }

  // ---------- Cover mode (edge-to-edge) ----------
  // Make the entire background NON-INTERACTIVE so it never blocks clicks below.
  return (
    <section
      className="relative overflow-hidden isolate z-0"
      style={{ pointerEvents: "none" }}
    >
      {src && (
        <Image
          src={src}
          alt={imageAlt ?? ""}
          fill
          priority
          className={`object-cover ${focusClass}`}
        />
      )}

      {overlay !== "none" ? (
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={overlay === "tint" ? tintStyle : gradientStyle}
        />
      ) : (
        <div className="pointer-events-none absolute inset-0 z-0 bg-black/10" />
      )}

      {/* Re-enable clicks ONLY for the hero text block */}
      <div
        className={`relative z-10 mx-auto max-w-6xl px-4 ${pad} ${minH} flex flex-col justify-end`}
        style={{ pointerEvents: "auto" }}
      >
        {titleBox ? (
          <div className="inline-block rounded-3xl bg-[rgba(10,42,106,0.95)] px-6 py-4 text-white shadow-lg">
            {eyebrow && <p className="text-sm text-[rgba(140,224,255,0.95)]">{eyebrow}</p>}
            <h1 className="mt-1 text-3xl sm:text-5xl font-semibold leading-tight">{title}</h1>
            {intro ? <p className="mt-2 max-w-2xl text-white/90 text-sm sm:text-base">{intro}</p> : null}
          </div>
        ) : (
          <>
            <h1 className="text-white text-3xl sm:text-5xl font-semibold leading-tight">{title}</h1>
            {intro ? <p className="mt-3 max-w-2xl text-white/95 text-sm sm:text-base">{intro}</p> : null}
          </>
        )}
        {children}
      </div>
    </section>
  );
}