import { generateMetadata } from "@/utils/generateMetadata";
import { generateJsonLd } from "@/utils/generateSchema";

import { Routes } from "@/constants/routes";

import JsonLd from "@/components/json-ld";

import AboutUs from "@/screens/about-us";

const title = "About Us";
const description = "";
const path = Routes.ABOUT;

export const metadata = generateMetadata({
  title,
  description,
  path,
});

const jsonLd = generateJsonLd({
  type: "AboutPage",
  title,
  description,
  path,
});

export default async function AboutUsPage() {
  return (
    <>
      <JsonLd schemas={[jsonLd]} />
      <AboutUs />
    </>
  );
}
