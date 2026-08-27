import { generateMetadata } from "@/utils/generateMetadata";
import { generateJsonLd } from "@/utils/generateSchema";

import { Routes } from "@/constants/routes";
import { WORKING_TOGETHER_PAGE } from "@/constants/interiorPages";

import JsonLd from "@/components/json-ld";

import InteriorPage from "@/screens/interior/InteriorPage";

const title = "Working Together";
const description = WORKING_TOGETHER_PAGE.lead.title;
const path = Routes.WORKING_TOGETHER;

export const metadata = generateMetadata({ title, description, path });

const jsonLd = generateJsonLd({ type: "WebPage", title, description, path });

export default function WorkingTogetherPage() {
  return (
    <>
      <JsonLd schemas={[jsonLd]} />
      <InteriorPage {...WORKING_TOGETHER_PAGE} />
    </>
  );
}
