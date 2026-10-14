"use client";

import Link from "next/link";

import { useReveal } from "@/lib/experience/useReveal";

import type { Routes } from "@/constants/routes";

interface TherapistSectionProps {
  id: string;
  name: string;
  role: string;
  portrait: string;
  alt: string;
  /** Only passed for therapists whose page is published (see THERAPIST_PUBLISHED). */
  profile?: { line: string; paragraphs: string[]; linkLabel: string; href: Routes };
}

const TherapistSection = ({ id, name, role, portrait, alt, profile }: TherapistSectionProps) => {
  const reveal = useReveal<HTMLElement>();

  return (
    <section
      ref={reveal}
      id={id}
      className="exp-section exp-reveal"
    >
      <div className="exp-interior-body">
        <div className="exp-section-inner">
          <div className="exp-therapist-card">
            <img
              className="exp-therapist-portrait"
              src={portrait}
              width={800}
              height={1000}
              loading="lazy"
              alt={alt}
            />
            <div>
              <h2 className="exp-therapist-name">{name}</h2>
              <p className="exp-therapist-role">{role}</p>
              {profile && (
                <>
                  <p className="exp-therapist-line">{profile.line}</p>
                  {profile.paragraphs.map((text) => (
                    <p key={text}>{text}</p>
                  ))}
                  <p className="exp-therapist-link">
                    <Link href={profile.href}>{profile.linkLabel}</Link>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TherapistSection;
