import { generateMetadata } from "@/utils/generateMetadata";
import { generateJsonLd } from "@/utils/generateSchema";

import { Routes } from "@/constants/routes";

import JsonLd from "@/components/json-ld";

import TermsConditions from "@/screens/terms-and-conditions";

const title = `Terms and Conditions`;

const description = "";

const path = Routes.TERMS_AND_CONDITIONS;

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

export default function TermsConditionsPage() {
  return (
    <>
      <JsonLd schemas={[jsonLd]} />
      <TermsConditions />
    </>
  );
}
