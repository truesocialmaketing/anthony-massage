import { generateMetadata } from "@/utils/generateMetadata";
import { generateJsonLd } from "@/utils/generateSchema";

import { Routes } from "@/constants/routes";
import { RESOURCES_PAGE } from "@/constants/interiorPages";

import JsonLd from "@/components/json-ld";

import InteriorPage from "@/screens/interior/InteriorPage";

const title = "Resources";
const description = "";
const path = Routes.RESOURCES;

export const metadata = generateMetadata({ title, description, path });

const jsonLd = generateJsonLd({ type: "WebPage", title, description, path });

export default function ResourcesPage() {
  return (
    <>
      <JsonLd schemas={[jsonLd]} />
      <InteriorPage {...RESOURCES_PAGE} />
    </>
  );
}
