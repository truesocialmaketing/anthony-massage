import { generateMetadata } from "@/utils/generateMetadata";
import { generateJsonLd } from "@/utils/generateSchema";

import { Routes } from "@/constants/routes";

import JsonLd from "@/components/json-ld";

import Services from "@/screens/services";

const title = "Our Services";
const description = "";
const path = Routes.SERVICES;

export const metadata = generateMetadata({
  title,
  description,
  path,
});

const jsonLd = generateJsonLd({
  type: "WebPage",
  title,
  description,
  path,
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd schemas={[jsonLd]} />
      <Services />
    </>
  );
}
