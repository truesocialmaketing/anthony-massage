"use client";

import { cn } from "@/utils";

import { usePageHeroExperience } from "@/lib/experience/usePageHeroExperience";

import { PAGE_HERO_VARIANTS, type PageHeroVariant } from "@/constants/pageHero";

import Title from "@/components/title";

const HERO_FRAME_WIDTH = 1672;
const HERO_FRAME_HEIGHT = 941;

type PageHeroProps = {
  srTitle: string;
  eyebrow: string;
  caption: string;
  variant?: PageHeroVariant;
  className?: string;
  /** Show the small uppercase eyebrow above the caption (hidden by default). */
  showEyebrow?: boolean;
};

const PageHero = ({ srTitle, eyebrow, caption, variant = "arrived", className, showEyebrow = false }: PageHeroProps) => {
  const { src, iso, spill, board } = PAGE_HERO_VARIANTS[variant];
  const engine = usePageHeroExperience(board);

  return (
    <header
      ref={engine.heroRef as React.RefObject<HTMLElement>}
      className={cn("exp-hero exp-page-hero", showEyebrow && "exp-page-hero--titled", className)}
    >
      <h1 className="sr-only">{srTitle}</h1>

      <div
        ref={engine.stageRef}
        className="exp-stage"
        role="img"
        aria-label={caption}
      >
        <div className="absolute inset-0 z-1 grayscale brightness-82 contrast-103">
          <img
            ref={engine.frameRef}
            className="exp-frame object-cover opacity-100"
            src={src}
            width={HERO_FRAME_WIDTH}
            height={HERO_FRAME_HEIGHT}
            loading="eager"
            fetchPriority="high"
            alt=""
          />
        </div>

        <div
          ref={engine.boardColorRef}
          className="exp-board-color absolute inset-0"
        >
          <img
            className="exp-frame object-cover opacity-100"
            src={iso}
            width={HERO_FRAME_WIDTH}
            height={HERO_FRAME_HEIGHT}
            loading="eager"
            fetchPriority="high"
            alt=""
          />
        </div>

        <div
          ref={engine.streetBloomRef}
          className="exp-street-bloom absolute inset-0"
        >
          <img
            className="exp-frame object-cover opacity-100"
            src={spill}
            width={HERO_FRAME_WIDTH}
            height={HERO_FRAME_HEIGHT}
            alt=""
          />
        </div>

        <div
          ref={engine.spillRef}
          className="exp-light-spill"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute inset-0 shadow-[inset_0_0_160px_rgba(0,0,0,0.42)]"
          aria-hidden="true"
        />
      </div>

      <div className="exp-phase-strip">
        <Title
          variant="exp"
          subTitle={eyebrow}
        />
        <p className="exp-phase-caption exp-page-hero-caption-line">{caption}</p>
      </div>
    </header>
  );
};

export default PageHero;
