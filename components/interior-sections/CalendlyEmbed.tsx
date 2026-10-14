"use client";

import Script from "next/script";

import { calendlyEmbedUrl } from "@/constants/booking";

const CalendlyEmbed = ({ url }: { url: string }) => (
  <>
    <div
      className="calendly-inline-widget"
      data-url={calendlyEmbedUrl(url)}
      style={{ minWidth: 320, height: 700 }}
    />
    <Script
      src="https://assets.calendly.com/assets/external/widget.js"
      strategy="lazyOnload"
    />
  </>
);

export default CalendlyEmbed;
