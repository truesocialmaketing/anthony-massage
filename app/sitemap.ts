import { MetadataRoute } from "next";

import { INFO } from "@/constants";
import { Routes } from "@/constants/routes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: INFO.WEBSITE_URL + Routes.HOME,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: INFO.WEBSITE_URL + Routes.APPROACH,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: INFO.WEBSITE_URL + Routes.CONDITIONS,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: INFO.WEBSITE_URL + Routes.YOUR_SESSION,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: INFO.WEBSITE_URL + Routes.WORKING_TOGETHER,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: INFO.WEBSITE_URL + Routes.RESOURCES,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: INFO.WEBSITE_URL + Routes.BOOK,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.9,
    },
    {
      url: INFO.WEBSITE_URL + Routes.ANTHONY,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
}
