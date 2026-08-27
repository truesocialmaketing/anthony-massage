import { generateMetadata } from "@/utils/generateMetadata";
import { generateJsonLd } from "@/utils/generateSchema";

import { Routes } from "@/constants/routes";
import { BOOK_PAGE } from "@/constants/interiorPages";

import JsonLd from "@/components/json-ld";

import InteriorPage from "@/screens/interior/InteriorPage";

const title = "Book";
const description = BOOK_PAGE.lead.title;
const path = Routes.BOOK;

export const metadata = generateMetadata({ title, description, path });

const jsonLd = generateJsonLd({ type: "WebPage", title, description, path });

export default function BookPage() {
  return (
    <>
      <JsonLd schemas={[jsonLd]} />
      <InteriorPage {...BOOK_PAGE} />
    </>
  );
}
