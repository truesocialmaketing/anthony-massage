import { cn } from "@/utils";

import type { HomeStoryChapter } from "@/constants/homeExperience";

interface StoryChapterProps {
  chapter: HomeStoryChapter;
  sectionRef: (el: HTMLElement | null) => void;
  decoration?: React.ReactNode;
}

const StoryChapter = ({ chapter, sectionRef, decoration }: StoryChapterProps) => (
  <section
    ref={sectionRef}
    id={chapter.id}
    className={cn("exp-section exp-reveal", `exp-pos-${chapter.position}`)}
  >
    {decoration}

    <div className="exp-section-inner">
      <p className="exp-eyebrow">{chapter.eyebrow}</p>
      <h2>{chapter.heading}</h2>

      {chapter.blocks.map((block, i) => {
        if (block.type === "quiet") {
          return (
            <p
              key={i}
              className="exp-quiet"
            >
              {block.text}
            </p>
          );
        }

        if (block.type === "list") {
          return (
            <ul
              key={i}
              className="exp-condition-list"
            >
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        return (
          <p
            key={i}
            style={block.spaced ? { marginTop: "1.6rem" } : undefined}
          >
            {block.text}
          </p>
        );
      })}
    </div>
  </section>
);

export default StoryChapter;
