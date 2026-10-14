"use client";

import * as React from "react";

import { type BloomField, chunkQuote, createBloomField } from "@/lib/experience/bloomField";

import {
  BLOOM_HINT,
  BLOOM_LABEL,
  BODY_CLOSING_LINES,
  BODY_LIBRARY,
  BODY_REGIONS,
  YOUR_BODY_INTRO,
} from "@/constants/yourBody";

import "./your-body.css";

const STAR_PATH = "M50 4 C54 34 66 46 96 50 C66 54 54 66 50 96 C46 66 34 54 4 50 C34 46 46 34 50 4 Z";

// The accordion is driven imperatively, as in Anthony's v39 page: height
// animates via max-height (fit to scrollHeight, then release to `none` once
// the transition lands so nested panels can grow). The markup below is static,
// so React never fights these class/style changes.
//
// Two fixes over v39's original script:
// - A region that closes now animates shut instead of snapping from `none`
//   to 0. When it sits ABOVE the region being opened it collapses instantly
//   instead, and the scroll position is compensated, so the header you just
//   clicked stays exactly where it was rather than jumping under the nav.
// - Toggling a description no longer re-clips the whole region for the length
//   of the animation (which made every open panel's glow flicker).
const EXPAND_MS = 760; // a touch longer than the CSS max-height transitions

function wireAccordion(root: HTMLElement) {
  const timers = new Map<HTMLElement, number>();
  const cleanups: (() => void)[] = [];
  const regions = Array.from(root.querySelectorAll<HTMLElement>("[data-region]"));

  // one pending "finish" per element, so rapid clicks never race each other
  const after = (el: HTMLElement, fn: () => void) => {
    window.clearTimeout(timers.get(el));
    timers.set(el, window.setTimeout(fn, EXPAND_MS));
  };
  const reflow = (el: HTMLElement) => void el.offsetHeight;

  const expand = (el: HTMLElement, onDone: () => void) => {
    el.style.maxHeight = `${el.scrollHeight}px`;
    after(el, () => {
      el.style.maxHeight = "none";
      onDone();
    });
  };
  const collapse = (el: HTMLElement, animate: boolean) => {
    window.clearTimeout(timers.get(el));
    if (!animate) {
      el.style.transition = "none";
      el.style.maxHeight = "";
      reflow(el);
      el.style.transition = "";
      return;
    }
    // from `none` there is nothing to transition from, so pin the current
    // height first, then let it fall to 0
    el.style.maxHeight = `${el.scrollHeight}px`;
    reflow(el);
    el.style.maxHeight = "";
  };

  const resetDescriptions = (region: HTMLElement) => {
    region.querySelectorAll<HTMLElement>(".yb-rec.active").forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-expanded", "false");
    });
    region.querySelectorAll<HTMLElement>(".yb-understanding").forEach((u) => {
      u.classList.remove("vis");
      collapse(u, false);
    });
  };

  const closeRegion = (region: HTMLElement, animate: boolean) => {
    const body = region.querySelector<HTMLElement>(".yb-region-body")!;
    region.classList.remove("open");
    region.querySelector(".yb-region-head")!.setAttribute("aria-expanded", "false");
    body.classList.remove("open-vis");
    collapse(body, animate);
    if (animate) {
      // tidy the nested descriptions once the region is shut, out of sight
      after(region, () => {
        if (!region.classList.contains("open")) resetDescriptions(region);
      });
    } else {
      resetDescriptions(region);
    }
  };

  const navOffset = () =>
    (parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--exp-nav-h")) || 72) + 16;
  const jumpBy = (dy: number) => window.scrollTo({ top: window.scrollY + dy, behavior: "instant" });

  regions.forEach((region) => {
    const head = region.querySelector<HTMLButtonElement>(".yb-region-head")!;
    const body = region.querySelector<HTMLElement>(".yb-region-body")!;

    const onHead = () => {
      const wasOpen = region.classList.contains("open");
      const topBefore = head.getBoundingClientRect().top;

      regions.forEach((r) => {
        if (r === region || !r.classList.contains("open")) return;
        const isAbove = !!(r.compareDocumentPosition(region) & Node.DOCUMENT_POSITION_FOLLOWING);
        closeRegion(r, !isAbove);
      });
      // keep the clicked header pinned where the visitor's eye already is
      const shift = head.getBoundingClientRect().top - topBefore;
      if (Math.abs(shift) > 0.5) jumpBy(shift);

      if (wasOpen) {
        closeRegion(region, true);
        return;
      }

      region.classList.add("open");
      head.setAttribute("aria-expanded", "true");
      expand(body, () => body.classList.add("open-vis"));

      // if the header is tucked under the fixed nav, bring it into view
      const top = head.getBoundingClientRect().top;
      if (top < navOffset()) window.scrollTo({ top: window.scrollY + top - navOffset(), behavior: "smooth" });
    };
    head.addEventListener("click", onHead);
    cleanups.push(() => head.removeEventListener("click", onHead));
  });

  root.querySelectorAll<HTMLElement>("[data-rec]").forEach((item) => {
    const btn = item.querySelector<HTMLButtonElement>(".yb-rec")!;
    const panel = item.querySelector<HTMLElement>(".yb-understanding")!;
    const region = item.closest<HTMLElement>("[data-region]")!;
    const body = region.querySelector<HTMLElement>(".yb-region-body")!;

    const onRec = () => {
      if (!region.classList.contains("open")) return;
      const open = btn.classList.toggle("active");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      // the region simply grows with its content; never re-clip it
      window.clearTimeout(timers.get(body));
      body.style.maxHeight = "none";
      body.classList.add("open-vis");
      if (open) {
        expand(panel, () => panel.classList.add("vis"));
      } else {
        panel.classList.remove("vis");
        collapse(panel, true);
      }
    };
    btn.addEventListener("click", onRec);
    cleanups.push(() => btn.removeEventListener("click", onRec));
  });

  return () => {
    timers.forEach((id) => window.clearTimeout(id));
    cleanups.forEach((fn) => fn());
  };
}

const YourBody = () => {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const fieldRef = React.useRef<BloomField | null>(null);
  const [quote, setQuote] = React.useState<string | null>(null);

  React.useEffect(() => (rootRef.current ? wireAccordion(rootRef.current) : undefined), []);

  React.useEffect(() => {
    if (!canvasRef.current) return;
    // next/font gives Cormorant Garamond a generated family name; read it back
    // so the particle text is drawn in the same face as the rest of the site.
    const family = getComputedStyle(document.body).getPropertyValue("--font-display").trim();
    const field = createBloomField(canvasRef.current, family ? `${family}, Georgia, serif` : "Georgia, serif");
    fieldRef.current = field;
    return () => field.destroy();
  }, []);

  const open = quote !== null;

  React.useEffect(() => {
    const field = fieldRef.current;
    if (!open) {
      field?.stop();
      return;
    }
    document.body.style.overflow = "hidden";
    field?.setPhrases(chunkQuote(quote));
    field?.start();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setQuote(null);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, quote]);

  return (
    <div className="yb-page">
      <header className="yb-hero">
        <img
          src="/images/hero/your-body-hero.jpg"
          width={1280}
          height={853}
          fetchPriority="high"
          alt=""
        />
      </header>

      <div
        ref={rootRef}
        className="yb-wrap"
      >
        <section className="yb-intro">
          <h1>{YOUR_BODY_INTRO.title}</h1>
          <div className="yb-rule" />
          {YOUR_BODY_INTRO.paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
          <p className="yb-whisper">{YOUR_BODY_INTRO.whisper}</p>
        </section>

        <section
          className="yb-regions"
          id="regions"
        >
          {BODY_REGIONS.map((region) => (
            <div
              key={region.title}
              className="yb-region"
              data-region
            >
              <button
                type="button"
                className="yb-region-head"
                aria-expanded="false"
              >
                <span className="yb-region-ico">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    dangerouslySetInnerHTML={{ __html: region.icon }}
                  />
                </span>
                <span className="yb-region-title">{region.title}</span>
                <span
                  className="yb-region-sign"
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              <div className="yb-region-body">
                <div className="yb-bay">
                  <p className="yb-lvl-label">{region.label}</p>
                  <div className="yb-recognitions">
                    {region.recognitions.map((rec) => (
                      <div
                        key={rec.phrase}
                        data-rec
                      >
                        <button
                          type="button"
                          className="yb-rec"
                          aria-expanded="false"
                        >
                          <span>{rec.phrase}</span>
                          <span
                            className="yb-chev"
                            aria-hidden="true"
                          >
                            &#8964;
                          </span>
                        </button>
                        <div className="yb-understanding">
                          <div className="yb-chamber">
                            <div className="yb-threshold">{rec.threshold}</div>
                            <p className="yb-u-lead">{rec.lead}</p>
                            {rec.paragraphs.map((text) => (
                              <p key={text}>{text}</p>
                            ))}
                          </div>
                          <button
                            type="button"
                            className="yb-bloom-trigger"
                            aria-label={BLOOM_LABEL}
                            onClick={(e) => {
                              e.stopPropagation();
                              setQuote(rec.quote);
                            }}
                          >
                            <svg
                              className="yb-star"
                              viewBox="0 0 100 100"
                              aria-hidden="true"
                            >
                              <path d={STAR_PATH} />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section
          className="yb-library"
          id="library"
          aria-labelledby="lib-title"
        >
          <div className="yb-lib-open">
            <p className="yb-lib-eyebrow">{BODY_LIBRARY.eyebrow}</p>
            <h2
              className="yb-lib-title"
              id="lib-title"
            >
              {BODY_LIBRARY.title}
            </h2>
            <div className="yb-lib-rule" />
            {BODY_LIBRARY.leads.map((text) => (
              <p
                key={text}
                className="yb-lib-lead"
              >
                {text}
              </p>
            ))}
          </div>

          <div className="yb-shelves">
            {BODY_LIBRARY.shelves.map((shelf) => (
              <div
                key={shelf.title}
                className="yb-shelf"
              >
                <div className="yb-shelf-head">
                  <span
                    className="yb-shelf-ico"
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      dangerouslySetInnerHTML={{ __html: shelf.icon }}
                    />
                  </span>
                  <h3 className="yb-shelf-title">{shelf.title}</h3>
                </div>
                <p className="yb-shelf-note">{shelf.note}</p>
                <ul className="yb-topics">
                  {shelf.topics.map((topic) => (
                    <li
                      key={topic.name}
                      className="yb-topic"
                    >
                      <span className="yb-topic-name">{topic.name}</span>
                      <span className="yb-topic-desc">{topic.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="yb-lib-foot">{BODY_LIBRARY.foot}</p>
        </section>

        <div className="yb-closing">
          {BODY_CLOSING_LINES.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
      </div>

      <div
        className={open ? "yb-bloom-overlay open" : "yb-bloom-overlay"}
        role="dialog"
        aria-modal="true"
        aria-label={BLOOM_LABEL}
        aria-hidden={!open}
        onClick={() => setQuote(null)}
      >
        <canvas
          ref={canvasRef}
          className="yb-bloom-gl"
          aria-hidden="true"
        />
        <button
          type="button"
          className="yb-bloom-close"
          aria-label="Close"
          onClick={(e) => {
            e.stopPropagation();
            setQuote(null);
          }}
        >
          &#10005;
        </button>
        <div className="yb-bloom-field">
          <div className="yb-bloom-content">
            <div>{BLOOM_LABEL}</div>
            <p>{quote}</p>
          </div>
        </div>
        <div className="yb-bloom-hint">{BLOOM_HINT}</div>
      </div>
    </div>
  );
};

export default YourBody;
