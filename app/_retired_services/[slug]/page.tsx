import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { generateJsonLd } from "@/utils/generateSchema";

import { INFO } from "@/constants";
import { META_DATA } from "@/constants/meta";
import { Routes } from "@/constants/routes";
import services from "@/constants/services";

import JsonLd from "@/components/json-ld";

import SingleServicePage from "@/screens/services/SingleServicePage";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  const url = `${INFO.WEBSITE_URL}${Routes.SERVICES}/${slug}`;

  return {
    title: `${service.title} | Services | ${INFO.BUSINESS_NAME}`,
    description: service.description,

    metadataBase: new URL(INFO.WEBSITE_URL),

    alternates: {
      canonical: url,
    },

    openGraph: {
      ...META_DATA.openGraph,
      title: `${service.title} | Services | ${INFO.BUSINESS_NAME}`,
      description: service.description,
      url,
      images: service.imgSrc ? [service.imgSrc] : META_DATA?.openGraph?.images,
    },

    twitter: {
      ...META_DATA.twitter,
      title: `${service.title} | Services | ${INFO.BUSINESS_NAME}`,
      description: service.description,
      images: service.imgSrc ? [service.imgSrc] : META_DATA?.twitter?.images,
    },
  };
}

export default async function SingleService({ params }: Props) {
  const { slug } = await params;

  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  const path = `${Routes.SERVICES}/${slug}`;

  const jsonLd = generateJsonLd({
    type: "ItemPage",
    title: service.title,
    description: service.description,
    path,
  });

  return (
    <>
      <JsonLd schemas={[jsonLd]} />

      <SingleServicePage service={service} />
    </>
  );
}
