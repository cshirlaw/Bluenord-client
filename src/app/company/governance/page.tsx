import React from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import GovAccordion, { type GovSection } from "@/components/GovAccordion";

export const metadata = { title: "Corporate Governance | BlueNord" };

export default function GovernancePage() {
  const HOME_LABEL = process.env.NEXT_PUBLIC_HOME_LABEL ?? "HomeClient";

  const sections: GovSection[] = [
    {
      id: "intro",
      title: "Introduction",
      initiallyOpen: true,
      content: (
        <>
          <p>
            BlueNord ASA (“BlueNord” or the “Company”) has made a strong commitment to ensure
            trust in the Company and to enhance shareholder value through efficient decision-making
            and improved communication between the management, the board of directors (the “Board”
            or “board of directors”) and the shareholders of the Company. The Company’s framework
            for corporate governance is intended to decrease business risk, maximise value and
            utilise the Company’s resources in an efficient, sustainable manner, to the benefit of
            shareholders, employees and society at large.
          </p>
          <p>
            The Company will seek to comply with the Norwegian Code of Practice for Corporate
            Governance (the “Corporate Governance Code”), last revised on 14 October 2021 (see
            nues.no). The principal purpose of the Code is to clarify roles of shareholders, the
            board and executive management beyond legislation and ensure effective management and
            control aimed at long-term value creation.
          </p>
          <p>
            The Company is subject to reporting requirements for corporate governance under the
            Accounting Act section 3-3b and Oslo Børs’ Rule Book II section 4.4. The board of
            directors will include a report on corporate governance in each annual report, including
            any deviations from the Code. The framework is reviewed annually by the Board.
          </p>

          <h4>Deviations (Company assessment)</h4>
          <ul>
            <li>
              <strong>Item 3:</strong> The Board has (and expects to have) authorisations to acquire
              own shares and issue new shares. Not all authorisations have separate specific
              purposes; purposes are explained in the GM notices adopting the authorisations.
            </li>
            <li>
              <strong>Item 11:</strong> Options have been granted to Board members through the
              Company’s share option programme (first implemented October 2018 and later extended).
            </li>
            <li>
              <strong>Item 14:</strong> Given the unpredictable nature of takeovers, the Company has
              not pre-adopted detailed takeover guidelines. If a takeover occurs, the Board will
              consider the Code’s recommendations in light of the specific situation.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "implementation",
      title: "Implementation and reporting on corporate governance",
      content: (
        <>
          <p>
            The Board has adopted corporate governance guidelines including Board rules of procedure,
            instructions for the Audit and Remuneration Committees, insider manuals, a disclosure
            manual, ethical guidelines and CSR guidelines.
          </p>
          <p>
            The Company seeks to comply with the Code; the annual report includes a corporate
            governance statement with explanations of any deviations.
          </p>
        </>
      ),
    },
    {
      id: "business-strategy",
      title: "BlueNord’s business and main strategy",
      content: (
        <>
          <p>
            BlueNord is an E&amp;P company focused on value creation through increased recovery,
            supported by a competent organisation, long-term reservoir management and the ability to
            invest and leverage new technology.
          </p>
          <p>
            The Articles of Association (section 3) define the business object as direct and
            indirect ownership/participation in companies and enterprises within exploration,
            production and sale related to oil and gas, and related activities.
          </p>
        </>
      ),
    },
    {
      id: "equity-dividends",
      title: "Equity and dividends",
      content: (
        <>
          <h4>Equity</h4>
          <p>
            Equity and financial strength are assessed in light of objectives, strategy and risk
            profile and are described in the annual report.
          </p>
          <h4>Dividend policy</h4>
          <p>
            No dividends to date. Distributions are not expected prior to completion of the Tyra
            Redevelopment project. In Feb 2024 the Company established a distribution policy for
            2024–2026.
          </p>
          <h4>Share capital increases / new shares</h4>
          <p>
            The GM (25 Apr 2023) granted the Board an authorisation to increase share capital up to
            a defined amount, valid until the 2024 ordinary GM (and no later than 30 June 2024).
          </p>
          <h4>Purchase of own shares</h4>
          <p>
            The Board has been authorised to acquire/dispose of own shares up to a defined nominal
            amount, valid until the 2024 ordinary GM (and no later than 30 June 2024). Holdings as
            of 31 Dec 2023 appear in the annual report.
          </p>
        </>
      ),
    },
    {
      id: "equal-treatment",
      title: "Equal treatment of shareholders & related party transactions",
      content: (
        <>
          <h4>Class of shares</h4>
          <p>One class of shares; all shares carry equal rights.</p>
          <h4>Pre-emption rights</h4>
          <p>
            Statutory pre-emption rights in cash offerings may be set aside by the GM or by the
            Board under an authorisation, with justification disclosed via stock exchange notice.
          </p>
          <h4>Own shares</h4>
          <p>
            Any buy-back would be executed on Oslo Børs or at market prices in line with MAR, with
            transparency and equal treatment objectives.
          </p>
          <h4>Related parties</h4>
          <p>
            Non-immaterial related-party transactions shall be arm’s-length. Where GM approval is
            not required, the Board will consider whether a third-party fairness opinion is
            appropriate.
          </p>
          <h4>Conflicts</h4>
          <p>
            Board rules of procedure include guidelines for notification of any material direct or
            indirect interests in Company transactions.
          </p>
        </>
      ),
    },
    {
      id: "free-shares",
      title: "Freely negotiable shares",
      content: <p>The Company’s shares are freely transferable.</p>,
    },
    {
      id: "general-meetings",
      title: "General Meetings",
      content: (
        <>
          <h4>Notification</h4>
          <p>
            Notice (with supporting information and proxy form) is normally sent and posted on the
            website at least 21 days before the meeting.
          </p>
          <h4>Participation & execution</h4>
          <ul>
            <li>Separate voting for each candidate where appropriate.</li>
            <li>Board and Nomination Committee generally present; auditor attends as required.</li>
            <li>Independent chair considered based on agenda/circumstances.</li>
            <li>
              Proxy forms aim to allow separate voting per agenda item; electronic communication
              facilitated where permitted.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "nomination",
      title: "Nomination Committee",
      content: (
        <p>
          Proposes candidates to the Board and Board remuneration; composition and mandate in Company
          guidelines and annual report.
        </p>
      ),
    },
    {
      id: "board-composition",
      title: "Board of Directors: Composition & independence",
      content: (
        <p>
          Composition shall safeguard independence and broad competence; details on members and
          independence are presented in the annual report / website.
        </p>
      ),
    },
    {
      id: "board-work",
      title: "Work of the Board of Directors",
      content: (
        <p>
          Board rules of procedure and an annual plan cover financial reporting, strategy, risk
          management, HSE, capital structure and more. Annual self-evaluation conducted.
        </p>
      ),
    },
    {
      id: "risk-internal-control",
      title: "Risk management & internal control",
      content: (
        <p>
          Frameworks suited to operations, including financial reporting controls and legal
          compliance. Audit Committee supports Board oversight.
        </p>
      ),
    },
    {
      id: "rem-board",
      title: "Remuneration of the Board of Directors",
      content: (
        <p>
          Determined by the GM; level reflects responsibility, time and Company situation.
          Share-based elements (if any) are disclosed.
        </p>
      ),
    },
    {
      id: "rem-exec",
      title: "Remuneration of the Executive Management",
      content: (
        <p>
          Follows GM-adopted remuneration policy, aligning long-term interests. May include fixed,
          variable and share-based elements, disclosed in the annual report.
        </p>
      ),
    },
    {
      id: "info-comms",
      title: "Information & communications",
      content: (
        <p>
          Based on transparency, equal treatment and timely disclosure under applicable laws and MAR;
          IR ensures consistent market communication.
        </p>
      ),
    },
    {
      id: "takeovers",
      title: "Takeovers",
      content: (
        <p>
          In a takeover situation, the Board will act in the best interests of the Company and all
          shareholders, consider the Code’s recommendations, and may seek an independent fairness
          opinion where relevant.
        </p>
      ),
    },
    {
      id: "auditor",
      title: "Auditor",
      content: (
        <p>
          Elected by the GM. Reports to the Board/Audit Committee on the audit and independence;
          attends Board meetings on audit matters as required.
        </p>
      ),
    },
  ];

  return (
    // isolate + z layer ensures later sections sit above any hero overlays
    <main className="mx-auto max-w-6xl px-4 space-y-12 pb-16 isolate">
      <PageHero
        imageSrc="/images/hero/governance.jpg"
        imageAlt="Corporate Governance"
        title="Corporate Governance"
        intro="High standards, transparency and long-term value creation."
        mode="cover"
        size="compact"
      />

      {/* Wrap everything after the hero in a high z-index & pointer-enabled layer */}
      <div className="relative z-[60] pointer-events-auto">
        {/* Linked breadcrumbs */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:underline">
                {HOME_LABEL}
              </Link>
            </li>
            <li aria-hidden className="opacity-50">›</li>
            <li>
              <Link href="/company" className="hover:underline">
                Company
              </Link>
            </li>
            <li aria-hidden className="opacity-50">›</li>
            <li aria-current="page" className="text-slate-700 font-medium">
              Governance
            </li>
          </ol>
        </nav>

        <Section eyebrow="Overview" title="Framework & Principles">
          <div className="prose prose-slate max-w-none">
            <p>
              BlueNord is committed to maintaining a high standard of corporate governance and
              believes effective governance is essential to its success. Click a topic below to
              reveal the details.
            </p>
          </div>
        </Section>

        <Section eyebrow="Topics" title="Corporate Governance details">
          {/* Extra z and explicit pointer events to beat any overlapping layers */}
          <div className="relative z-[70] pointer-events-auto">
            <GovAccordion sections={sections} allowMultiple />
          </div>
        </Section>
      </div>
    </main>
  );
}