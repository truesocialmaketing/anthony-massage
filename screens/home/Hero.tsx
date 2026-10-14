"use client";

import type { HeroExperienceEngine } from "@/lib/experience/useHeroExperience";

import { INFO } from "@/constants";

import HeroStage from "./hero/HeroStage";
import PhaseStrip from "./hero/PhaseStrip";

const Hero = ({ engine }: { engine: HeroExperienceEngine }) => {
  return (
    <header
      ref={engine.heroRef as React.RefObject<HTMLElement>}
      className="exp-hero"
    >
      {/* Anthony's handover headline (v39 <title>). Keyword coverage lives in
          the title tag, meta description and structured data instead (7.2). */}
      <h1 className="sr-only">{INFO.BUSINESS_NAME} — Imagine feeling different.</h1>

      <HeroStage engine={engine} />
      <PhaseStrip engine={engine} />
    </header>
  );
};

export default Hero;
