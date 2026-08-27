import { generateMetadata } from "@/utils/generateMetadata";
import { generateJsonLd } from "@/utils/generateSchema";

import { Routes } from "@/constants/routes";

import JsonLd from "@/components/json-ld";

import PrivacyPolicy from "@/screens/privacy-policy";

const title = "Privacy Policy";
const description = "";

const path = Routes.PRIVACY_POLICY;

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

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd schemas={[jsonLd]} />
      <PrivacyPolicy />
    </>
  );
}
