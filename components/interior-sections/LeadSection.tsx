"use client";

import { useReveal } from "@/lib/experience/useReveal";

interface LeadSectionProps {
  eyebrow: string;
  title: string;
  paragraphs: string[];
}

const LeadSection = ({ eyebrow, title, paragraphs }: LeadSectionProps) => {
  const reveal = useReveal<HTMLElement>();

  return (
    <section
      ref={reveal}
      id="intro"
      className="exp-section exp-reveal"
    >
      <div className="exp-interior-body exp-interior-body-lead">
        <div className="exp-section-inner">
          <p className="exp-eyebrow">{eyebrow}</p>
          <h2 className="exp-lead-title">{title}</h2>
          {paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadSection;
