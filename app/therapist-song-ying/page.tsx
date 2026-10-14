import { notFound } from "next/navigation";

import { generateMetadata } from "@/utils/generateMetadata";
import { generateJsonLd } from "@/utils/generateSchema";

import { THERAPIST_PUBLISHED, THERAPIST_SONG_YING_PAGE } from "@/constants/interiorPages";
import { Routes } from "@/constants/routes";

import JsonLd from "@/components/json-ld";

import InteriorPage from "@/screens/interior/InteriorPage";

const title = "Song Ying";
const description = THERAPIST_SONG_YING_PAGE.lead.title;
const path = Routes.THERAPIST_SONG_YING;

const published = THERAPIST_PUBLISHED["song-ying"];

export const metadata = {
  ...generateMetadata({ title, description, path }),
  // keep the built-but-unpublished page out of search until it goes live
  ...(published ? {} : { robots: { index: false, follow: false } }),
};

const jsonLd = generateJsonLd({ type: "WebPage", title, description, path });

export default function TherapistSongYingPage() {
  // Built so it can be switched on later; 404s until then (see THERAPIST_PUBLISHED).
  if (!published) notFound();

  return (
    <>
      <JsonLd schemas={[jsonLd]} />
      <InteriorPage {...THERAPIST_SONG_YING_PAGE} />
    </>
  );
}
