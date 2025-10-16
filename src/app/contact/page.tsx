// src/app/contact/page.tsx
export const metadata = {
  title: "Get in Touch | BlueNord",
  description:
    "Contact details for BlueNord offices in Copenhagen, London and Oslo, plus Investor Relations.",
};

export default function ContactPage() {
  const brandBlue = "#0A1C7C";
  const accent = "#98F18B";

  return (
    <main className="mx-auto max-w-6xl px-4 pb-24">
      {/* Header band (simple, image-free to avoid optimizer issues) */}
      <section className="relative isolate mt-6 mb-12 overflow-hidden rounded-2xl border border-neutral-200">
        <div className="relative px-6 py-14 md:px-10 md:py-16">
          <h1
            className="text-4xl md:text-5xl font-semibold tracking-tight"
            style={{ color: brandBlue }}
          >
            Get in Touch
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="grid gap-10 md:grid-cols-2 mb-10">
        <div />
        <div className="text-[17px] leading-relaxed" style={{ color: brandBlue }}>
          <p className="mb-4">
            We would love to hear from you. Please reach out to our offices listed below
            if you would like to get in touch with us. You are able to stay updated via
            our press releases; please see subscription details at the bottom of this
            page.
          </p>
          <p>Follow us on LinkedIn for updates and posts.</p>
        </div>
      </section>

      {/* Offices + IR */}
      <section className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        {/* Copenhagen */}
        <div>
          <h2 className="mb-2 text-2xl font-semibold" style={{ color: brandBlue }}>
            Copenhagen
          </h2>
          <div className="mb-4 h-[2px] w-16" style={{ backgroundColor: accent }} />
          <address className="not-italic leading-7 text-neutral-900">
            <a
              href="https://maps.apple.com/?address=Lyngbyvej%202,%20Vibenshus,%202100%20K%C3%B8benhavn,%20Denmark"
              className="underline decoration-[1px] underline-offset-2 hover:opacity-80"
              target="_blank"
              rel="noreferrer"
            >
              Lyngbyvej 2
            </a>
            <br />
            Vibenshuset
            <br />
            2100 Copenhagen Ø
            <br />
            Denmark
            <br />
            <a
              href="mailto:post@bluenord.com"
              className="mt-2 inline-block underline decoration-[1px] underline-offset-2 text-[#0A1C7C] hover:opacity-80"
            >
              post@bluenord.com
            </a>
          </address>
        </div>

        {/* London */}
        <div>
          <h2 className="mb-2 text-2xl font-semibold" style={{ color: brandBlue }}>
            London
          </h2>
          <div className="mb-4 h-[2px] w-16" style={{ backgroundColor: accent }} />
          <address className="not-italic leading-7 text-neutral-900">
            20 Balderton Street
            <br />
            London
            <br />
            W1K 6TL
            <br />
            <a
              href="mailto:post@bluenord.com"
              className="mt-2 inline-block underline decoration-[1px] underline-offset-2 text-[#0A1C7C] hover:opacity-80"
            >
              post@bluenord.com
            </a>
          </address>
        </div>

        {/* Oslo */}
        <div>
          <h2 className="mb-2 text-2xl font-semibold" style={{ color: brandBlue }}>
            Oslo
          </h2>
          <div className="mb-4 h-[2px] w-16" style={{ backgroundColor: accent }} />
          <address className="not-italic leading-7 text-neutral-900">
            <a
              href="https://maps.apple.com/?address=Nedre%20Vollgate%203,%200158%20Oslo,%20Norway"
              className="underline decoration-[1px] underline-offset-2 hover:opacity-80"
              target="_blank"
              rel="noreferrer"
            >
              Nedre Vollgate 3
            </a>
            <br />
            0158 Oslo
            <br />
            Norway
            <br />
            <a
              href="tel:+4722336000"
              className="mt-2 inline-block underline decoration-[1px] underline-offset-2 text-[#0A1C7C] hover:opacity-80"
            >
              +47 22 33 60 00
            </a>
            <br />
            <a
              href="mailto:post@bluenord.com"
              className="mt-1 inline-block underline decoration-[1px] underline-offset-2 text-[#0A1C7C] hover:opacity-80"
            >
              post@bluenord.com
            </a>
          </address>
        </div>

        {/* Investor Relations */}
        <div>
          <h2 className="mb-2 text-2xl font-semibold" style={{ color: brandBlue }}>
            Investor Relations
          </h2>
          <div className="mb-4 h-[2px] w-16" style={{ backgroundColor: accent }} />
          <p className="leading-7 text-neutral-900">
            <span className="font-semibold">Cathrine Torgersen</span>
            <br />
            EVP Investor Relations &amp; ESG
            <br />
            <a
              href="mailto:ct@bluenord.com"
              className="mt-2 inline-block underline decoration-[1px] underline-offset-2 text-[#0A1C7C] hover:opacity-80"
            >
              ct@bluenord.com
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}