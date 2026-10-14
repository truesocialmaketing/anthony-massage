import { type InteriorPageData, THERAPIST_PUBLISHED } from "@/constants/interiorPages";

import DividerSection from "@/components/interior-sections/DividerSection";
import LeadSection from "@/components/interior-sections/LeadSection";
import TherapistSection from "@/components/interior-sections/TherapistSection";
import PageHero from "@/components/page-hero";

// Nav/Footer are rendered globally in app/layout.tsx (one Footer instance
// for the whole app) — its per-page copy comes from INTERIOR_FOOTER_COPY,
// keyed by pathname, not from a prop here. See components/layout/Footer.tsx.
const InteriorPage = ({
  srTitle,
  heroVariant,
  heroEyebrow,
  heroCaption,
  heroAriaLabel,
  lead,
  therapists,
  sections,
}: InteriorPageData) => (
  <>
    <PageHero
      srTitle={srTitle}
      eyebrow={heroEyebrow}
      caption={heroCaption}
      ariaLabel={heroAriaLabel}
      variant={heroVariant}
    />

    <LeadSection
      eyebrow={lead.eyebrow}
      title={lead.title}
      paragraphs={lead.paragraphs}
    />

    {/* A therapist whose page isn't published yet shows name, role line and
        portrait only: no link through, and none of the bracketed copy briefs
        from the handover. Filtered here, on the server, so that copy never
        ships to the browser at all. */}
    {therapists?.map(({ id, name, role, portrait, alt, line, paragraphs, linkLabel, href }) => (
      <TherapistSection
        key={id}
        id={id}
        name={name}
        role={role}
        portrait={portrait}
        alt={alt}
        profile={THERAPIST_PUBLISHED[id] ? { line, paragraphs, linkLabel, href } : undefined}
      />
    ))}

    {sections.map((section) => (
      <DividerSection
        key={section.id}
        id={section.id}
        eyebrow={section.eyebrow}
        title={section.title}
        blocks={section.blocks}
      />
    ))}
  </>
);

export default InteriorPage;
