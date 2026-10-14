"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/utils";

import type { HeroExperienceEngine } from "@/lib/experience/useHeroExperience";
import { useReveal } from "@/lib/experience/useReveal";

import { HOME_EXPERIENCE_FOOTER } from "@/constants/homeExperience";
import { INTERIOR_FOOTER_COPY } from "@/constants/interiorPages";
import { Routes } from "@/constants/routes";

import { Button } from "@/components/ui/button";

interface Props {
  engine?: HeroExperienceEngine;
}

const Footer = ({ engine }: Props) => {
  const pathname = usePathname();
  const reveal = useReveal<HTMLElement>();

  if (!engine && pathname === Routes.HOME) return null;
  // Your Body closes with its own quiet sign-off instead of the footer (v39).
  if (pathname === Routes.YOUR_BODY) return null;

  const isInterior = !engine;
  const override = INTERIOR_FOOTER_COPY[pathname ?? ""];
  const sectionIndex = HOME_EXPERIENCE_FOOTER.position - 1;

  return (
    <footer
      ref={(el) => {
        engine?.registerSection(sectionIndex)(el);
        reveal(el);
      }}
      className={cn(
        "exp-footer exp-reveal group",
        isInterior ? "exp-interior-tone" : `exp-pos-${HOME_EXPERIENCE_FOOTER.position}`
      )}
    >
      <span
        className={cn(
          "mb-[1.2rem] block text-2xs font-medium tracking-[0.32em] uppercase transition-colors duration-2200 ease-exp-release",
          isInterior
            ? "text-[#b9a878]"
            : "text-(--s-eyebrow,var(--color-exp-gold)) group-[.lit]:text-(--s-eyebrow-lit,var(--s-eyebrow))"
        )}
      >
        {isInterior ? "Anthony Massage Works" : HOME_EXPERIENCE_FOOTER.eyebrow}
      </span>
      <h2
        className={cn(
          "mb-[0.7rem] font-display text-[clamp(1.8rem,3.6vw,2.6rem)] font-normal italic transition-colors duration-2200 ease-exp-release",
          isInterior
            ? "text-[#f2e6c9]"
            : "text-(--s-heading,var(--color-exp-olive-deep)) group-[.lit]:text-(--s-heading-lit,var(--s-heading))"
        )}
      >
        {HOME_EXPERIENCE_FOOTER.title}
      </h2>
      <span
        className={cn(
          "mb-[1.9rem] block max-w-120 text-base+",
          isInterior ? "font-[350] text-[#d8cfb4]" : "font-light"
        )}
      >
        {override?.sub ?? HOME_EXPERIENCE_FOOTER.sub}
      </span>

      <Link href={override?.ctaHref ?? Routes.BOOK}>
        <Button
          variant="experience"
          size="experience"
        >
          {override?.cta ?? HOME_EXPERIENCE_FOOTER.cta}
        </Button>
      </Link>

      <span
        className={cn(
          "mt-18 block text-2xs tracking-[0.16em] uppercase",
          isInterior ? "text-[#9d947c] opacity-75" : "opacity-60"
        )}
      >
        {HOME_EXPERIENCE_FOOTER.fine}
      </span>
    </footer>
  );
};

export default Footer;
