import { generateMetadata } from "@/utils/generateMetadata";
import { generateJsonLd } from "@/utils/generateSchema";

import { Routes } from "@/constants/routes";
import { YOUR_BODY_INTRO } from "@/constants/yourBody";

import JsonLd from "@/components/json-ld";

import YourBody from "@/screens/your-body";

const title = "Your Body";
const description = YOUR_BODY_INTRO.paragraphs[0];
const path = Routes.YOUR_BODY;

export const metadata = generateMetadata({ title, description, path });

const jsonLd = generateJsonLd({ type: "WebPage", title, description, path });

export default function YourBodyPage() {
  return (
    <>
      <JsonLd schemas={[jsonLd]} />
      <YourBody />
    </>
  );
}
