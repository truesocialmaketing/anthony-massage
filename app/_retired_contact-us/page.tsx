import { generateMetadata } from "@/utils/generateMetadata";
import { generateJsonLd } from "@/utils/generateSchema";

import { Routes } from "@/constants/routes";

import JsonLd from "@/components/json-ld";

import ContactUs from "@/screens/contact-us";

const title = "Contact Us";
const description = "";
const path = Routes.CONTACT;

export const metadata = generateMetadata({
  title,
  description,
  path,
});

const jsonLd = generateJsonLd({
  type: "ContactPage",
  title,
  description,
  path,
});

export default function ContactUsPage() {
  return (
    <>
      <JsonLd schemas={[jsonLd]} />
      <ContactUs />
    </>
  );
}
