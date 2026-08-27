import { generateMetadata } from "@/utils/generateMetadata";
import { generateJsonLd } from "@/utils/generateSchema";

import { Routes } from "@/constants/routes";

import JsonLd from "@/components/json-ld";

import ThankYouPage from "@/screens/thank-you";

const title = "Thank You";
const description = "Your message has been sent successfully. We'll get back to you as soon as possible.";

const path = Routes.THANK_YOU;

export const metadata = generateMetadata({
  title,
  description,
  path,
  noIndex: true,
});

const jsonLd = generateJsonLd({
  type: "WebPage",
  title,
  description,
  path,
});

export default function thankYou() {
  return (
    <>
      <JsonLd schemas={[jsonLd]} />
      <ThankYouPage />
    </>
  );
}
