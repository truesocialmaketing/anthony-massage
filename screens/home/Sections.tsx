"use client";
import type { HeroExperienceEngine } from "@/lib/experience/useHeroExperience";
import { useReveal } from "@/lib/experience/useReveal";

import { HOME_EXPERIENCE_SECTIONS } from "@/constants/homeExperience";

import StoryChapter from "./chapters/StoryChapter";
import SpillCascade from "./sections/SpillCascade";

const Sections = ({ engine }: { engine: HeroExperienceEngine }) => {
  const reveal = useReveal<HTMLElement>();

  const sectionRef = (index: number) => (el: HTMLElement | null) => {
    engine.registerSection(index)(el);
    reveal(el);
  };

  return (
    <>
      {HOME_EXPERIENCE_SECTIONS.map((chapter, i) => (
        <StoryChapter
          key={chapter.id}
          chapter={chapter}
          sectionRef={sectionRef(i)}
          decoration={i === 0 ? <SpillCascade /> : undefined}
        />
      ))}
    </>
  );
};

export default Sections;
