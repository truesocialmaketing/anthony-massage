import { generateMetadata } from "@/utils/generateMetadata";
import { generateJsonLd } from "@/utils/generateSchema";

import { Routes } from "@/constants/routes";
import { YOUR_SESSION_PAGE } from "@/constants/interiorPages";

import JsonLd from "@/components/json-ld";

import InteriorPage from "@/screens/interior/InteriorPage";

const title = "Your Session";
const description = YOUR_SESSION_PAGE.lead.title;
const path = Routes.YOUR_SESSION;

export const metadata = generateMetadata({ title, description, path });

const jsonLd = generateJsonLd({ type: "WebPage", title, description, path });

export default function YourSessionPage() {
  return (
    <>
      <JsonLd schemas={[jsonLd]} />
      <InteriorPage {...YOUR_SESSION_PAGE} />
    </>
  );
}
