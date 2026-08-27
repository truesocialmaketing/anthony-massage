"use client";
import type { HeroExperienceEngine } from "@/lib/experience/useHeroExperience";
import { useReveal } from "@/lib/experience/useReveal";

import { HOME_EXPERIENCE_SECTIONS } from "@/constants/homeExperience";

import StoryChapter from "./chapters/StoryChapter";
import SpillCascade from "./sections/SpillCascade";

// Reverted per client direction: Home now mirrors the reference site's own
// 8 short story-chapters (see HOME_EXPERIENCE_SECTIONS) rather than the
// expanded local-SEO section set below. That version is kept, unused, in
// case the business sections are wanted again later.
//
// import Faq from "./sections/Faq";
// import OurApproach from "./sections/OurApproach";
// import Philosophy from "./sections/Philosophy";
// import Services from "./sections/Services";
// import Testimonials from "./sections/Testimonials";
// import Welcome from "./sections/Welcome";
// import WhyChooseUs from "./sections/WhyChooseUs";
//
// const Sections = ({ engine }: { engine: HeroExperienceEngine }) => {
//   const reveal = useReveal<HTMLElement>();
//
//   const sectionRef = (index: number) => (el: HTMLElement | null) => {
//     engine.registerSection(index)(el);
//     reveal(el);
//   };
//
//   return (
//     <>
//       <Welcome sectionRef={sectionRef(0)} />
//       <Philosophy sectionRef={sectionRef(1)} />
//       <OurApproach sectionRef={sectionRef(2)} />
//       <Services sectionRef={sectionRef(5)} />
//       <WhyChooseUs sectionRef={sectionRef(7)} />
//       <Testimonials sectionRef={sectionRef(11)} />
//       <Faq sectionRef={sectionRef(12)} />
//     </>
//   );
// };

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
