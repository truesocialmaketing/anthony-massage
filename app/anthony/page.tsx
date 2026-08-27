import { generateMetadata } from "@/utils/generateMetadata";
import { generateJsonLd } from "@/utils/generateSchema";

import { Routes } from "@/constants/routes";
import { ANTHONY_PAGE } from "@/constants/interiorPages";

import JsonLd from "@/components/json-ld";

import InteriorPage from "@/screens/interior/InteriorPage";

const title = "Meet Anthony";
const description = ANTHONY_PAGE.lead.title;
const path = Routes.ANTHONY;

export const metadata = generateMetadata({ title, description, path });

const jsonLd = generateJsonLd({ type: "WebPage", title, description, path });

export default function AnthonyPage() {
  return (
    <>
      <JsonLd schemas={[jsonLd]} />
      <InteriorPage {...ANTHONY_PAGE} />
    </>
  );
}
