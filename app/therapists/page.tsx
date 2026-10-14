import { generateMetadata } from "@/utils/generateMetadata";
import { generateJsonLd } from "@/utils/generateSchema";

import { THERAPISTS_PAGE } from "@/constants/interiorPages";
import { Routes } from "@/constants/routes";

import JsonLd from "@/components/json-ld";

import InteriorPage from "@/screens/interior/InteriorPage";

const title = "Therapists";
const description = THERAPISTS_PAGE.lead.title;
const path = Routes.THERAPISTS;

export const metadata = generateMetadata({ title, description, path });

const jsonLd = generateJsonLd({ type: "WebPage", title, description, path });

export default function TherapistsPage() {
  return (
    <>
      <JsonLd schemas={[jsonLd]} />
      <InteriorPage {...THERAPISTS_PAGE} />
    </>
  );
}
