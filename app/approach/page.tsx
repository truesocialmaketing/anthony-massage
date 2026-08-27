import { generateMetadata } from "@/utils/generateMetadata";
import { generateJsonLd } from "@/utils/generateSchema";

import { Routes } from "@/constants/routes";
import { APPROACH_PAGE } from "@/constants/interiorPages";

import JsonLd from "@/components/json-ld";

import InteriorPage from "@/screens/interior/InteriorPage";

const title = "Approach";
const description = APPROACH_PAGE.lead.title;
const path = Routes.APPROACH;

export const metadata = generateMetadata({ title, description, path });

const jsonLd = generateJsonLd({ type: "WebPage", title, description, path });

export default function ApproachPage() {
  return (
    <>
      <JsonLd schemas={[jsonLd]} />
      <InteriorPage {...APPROACH_PAGE} />
    </>
  );
}
