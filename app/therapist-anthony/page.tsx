import { generateMetadata } from "@/utils/generateMetadata";
import { generateJsonLd } from "@/utils/generateSchema";

import { THERAPIST_ANTHONY_PAGE } from "@/constants/interiorPages";
import { Routes } from "@/constants/routes";

import JsonLd from "@/components/json-ld";

import InteriorPage from "@/screens/interior/InteriorPage";

const title = "Anthony";
const description = THERAPIST_ANTHONY_PAGE.lead.title;
const path = Routes.THERAPIST_ANTHONY;

export const metadata = generateMetadata({ title, description, path });

const jsonLd = generateJsonLd({ type: "WebPage", title, description, path });

export default function TherapistAnthonyPage() {
  return (
    <>
      <JsonLd schemas={[jsonLd]} />
      <InteriorPage {...THERAPIST_ANTHONY_PAGE} />
    </>
  );
}
