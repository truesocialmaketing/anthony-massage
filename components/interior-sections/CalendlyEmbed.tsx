"use client";

import { useRef } from "react";
import Script from "next/script";

import { calendlyEmbedUrl } from "@/constants/booking";

declare global {
  interface Window {
    Calendly?: { initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void };
  }
}

// widget.js only scans the page on first load, so returning to Book via
// client-side navigation left the box empty. Draw it on every mount instead.
const CalendlyEmbed = ({ url }: { url: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  const draw = () => {
    const el = ref.current;
    if (!el || !window.Calendly) return;
    el.innerHTML = "";
    window.Calendly.initInlineWidget({ url: calendlyEmbedUrl(url), parentElement: el });
  };

  return (
    <>
      <div
        ref={ref}
        className="calendly-inline-widget"
        data-auto-load="false"
        style={{ width: "100%", height: 700 }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onReady={draw}
      />
    </>
  );
};

export default CalendlyEmbed;
