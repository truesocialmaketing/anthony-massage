"use client";

import { useReveal } from "@/lib/experience/useReveal";

export type DividerBlock =
  | { type: "p"; text: string; spaced?: boolean }
  | { type: "list"; items: string[] }
  | { type: "qa"; items: { q: string; a: string }[] }
  | { type: "schedule" }
  | { type: "email"; email: string; phone?: string };

interface DividerSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  blocks: DividerBlock[];
}

const DividerSection = ({ id, eyebrow, title, blocks }: DividerSectionProps) => {
  const reveal = useReveal<HTMLElement>();

  return (
    <section
      ref={reveal}
      id={id}
      className="exp-section exp-reveal"
    >
      <div className="exp-divider-band">
        <div className="exp-divider-inner">
          <p className="exp-eyebrow">{eyebrow}</p>
          <h2 className="exp-divider-title">{title}</h2>
        </div>
      </div>

      <div className="exp-interior-body">
        <div className="exp-section-inner">
          {blocks.map((block, i) => {
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

            if (block.type === "qa") {
              return (
                <div key={i}>
                  {block.items.map(({ q, a }) => (
                    <p key={q}>
                      <strong>{q}</strong> {a}
                    </p>
                  ))}
                </div>
              );
            }

            if (block.type === "schedule") {
              return (
                <div
                  key={i}
                  className="exp-schedule-placeholder"
                >
                  <p className="exp-schedule-placeholder-text">Your scheduling calendar will live here.</p>
                </div>
              );
            }

            if (block.type === "email") {
              return (
                <div key={i}>
                  <p style={{ marginTop: "1.6rem" }}>
                    Email:{" "}
                    <a
                      href={`mailto:${block.email}`}
                      style={{ color: "inherit" }}
                    >
                      {block.email}
                    </a>
                  </p>
                  {block.phone ? <p>Phone: {block.phone}</p> : null}
                </div>
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
      </div>
    </section>
  );
};

export default DividerSection;
