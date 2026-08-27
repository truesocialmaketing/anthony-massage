import { generateMetadata } from "@/utils/generateMetadata";
import { generateJsonLd } from "@/utils/generateSchema";

import { Routes } from "@/constants/routes";
import { CONDITIONS_PAGE } from "@/constants/interiorPages";

import JsonLd from "@/components/json-ld";

import InteriorPage from "@/screens/interior/InteriorPage";

const title = "Conditions";
const description = CONDITIONS_PAGE.lead.title;
const path = Routes.CONDITIONS;

export const metadata = generateMetadata({ title, description, path });

const jsonLd = generateJsonLd({ type: "WebPage", title, description, path });

export default function ConditionsPage() {
  return (
    <>
      <JsonLd schemas={[jsonLd]} />
      <InteriorPage {...CONDITIONS_PAGE} />
    </>
  );
}
