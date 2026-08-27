import PageHero from "@/components/page-hero";
import DividerSection from "@/components/interior-sections/DividerSection";
import LeadSection from "@/components/interior-sections/LeadSection";

import type { InteriorPageData } from "@/constants/interiorPages";

// Nav/Footer are rendered globally in app/layout.tsx (one Footer instance
// for the whole app) — its per-page copy comes from INTERIOR_FOOTER_COPY,
// keyed by pathname, not from a prop here. See components/layout/Footer.tsx.
const InteriorPage = ({ srTitle, heroVariant, heroEyebrow, heroCaption, lead, sections }: InteriorPageData) => (
  <>
    <PageHero
      srTitle={srTitle}
      eyebrow={heroEyebrow}
      caption={heroCaption}
      variant={heroVariant}
      showEyebrow
    />

    <LeadSection
      eyebrow={lead.eyebrow}
      title={lead.title}
      paragraphs={lead.paragraphs}
    />

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
