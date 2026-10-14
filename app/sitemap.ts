import { MetadataRoute } from "next";

import { INFO } from "@/constants";
import { THERAPIST_PUBLISHED } from "@/constants/interiorPages";
import { Routes } from "@/constants/routes";

const PAGES: { route: Routes; priority: number }[] = [
  { route: Routes.HOME, priority: 1 },
  { route: Routes.APPROACH, priority: 0.8 },
  { route: Routes.YOUR_SESSION, priority: 0.8 },
  { route: Routes.YOUR_BODY, priority: 0.8 },
  { route: Routes.THERAPISTS, priority: 0.7 },
  { route: Routes.THERAPIST_ANTHONY, priority: 0.6 },
  ...(THERAPIST_PUBLISHED["cole-francis"] ? [{ route: Routes.THERAPIST_COLE_FRANCIS, priority: 0.5 }] : []),
  ...(THERAPIST_PUBLISHED["song-ying"] ? [{ route: Routes.THERAPIST_SONG_YING, priority: 0.5 }] : []),
  { route: Routes.BOOK, priority: 0.9 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return PAGES.map(({ route, priority }) => ({
    url: INFO.WEBSITE_URL + route,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority,
  }));
}
