"use client";

import * as React from "react";

import {
  type BoardRect,
  FRAME_COUNT,
  LIGHT_IN,
  LIGHT_OUT,
  PHASE_CAPTIONS,
  TIMELINE,
  WISP_COUNT,
  captionIndexFor,
  clamp01,
  computeBloom,
  computeFrameStates,
  computeLifeMask,
  computeSweep,
  computeWisp,
  easeInOut,
  measureBoardRect,
} from "./engine";

type ImgRefs = React.MutableRefObject<(HTMLImageElement | null)[]>;

function applyFrameStates(refs: ImgRefs, progress: number) {
  const states = computeFrameStates(progress, FRAME_COUNT);
  refs.current.forEach((img, i) => {
    if (!img) return;
    img.style.opacity = String(states[i].opacity);
    img.style.zIndex = String(states[i].zIndex);
  });
}

const FRAMES_READY_CAP_MS = 5000;

export function useHeroExperience() {
  const heroRef = React.useRef<HTMLElement | null>(null);
  const stageRef = React.useRef<HTMLDivElement | null>(null);
  const boardColorRef = React.useRef<HTMLDivElement | null>(null);
  const streetBloomRef = React.useRef<HTMLDivElement | null>(null);
  const spillRef = React.useRef<HTMLDivElement | null>(null);

  const sweepRef = React.useRef<SVGSVGElement | null>(null);
  const sweepGlowRef = React.useRef<SVGPathElement | null>(null);
  const sweepCoreRef = React.useRef<SVGPathElement | null>(null);
  const sweepRib1Ref = React.useRef<SVGPathElement | null>(null);
  const sweepRib2Ref = React.useRef<SVGPathElement | null>(null);

  const waveFrontierRef = React.useRef<HTMLDivElement | null>(null);
  const wispRefs = React.useRef<(SVGPathElement | null)[]>([]);

  const gFrameRefs = React.useRef<(HTMLImageElement | null)[]>([]);
  const cFrameRefs = React.useRef<(HTMLImageElement | null)[]>([]);
  const sFrameRefs = React.useRef<(HTMLImageElement | null)[]>([]);

  const sectionRefs = React.useRef<(HTMLElement | null)[]>([]);

  const [captionIndex, setCaptionIndex] = React.useState(0);
  const [captionText, setCaptionText] = React.useState<string>(PHASE_CAPTIONS[0]);
  const [captionVisible, setCaptionVisible] = React.useState(true);
  const [replayVisible, setReplayVisible] = React.useState(false);
  const [hintVisible, setHintVisible] = React.useState(false);

  const state = React.useRef({
    t0: null as number | null,
    manual: false,
    replayShown: false,
    cur: { sweep: 0, life: 0, unf: 0, bloom: 0, fr: 0 },
    tgt: { sweep: 0, life: 0, unf: 0, bloom: 0, fr: 0 },
    vh: 800,
    heroH: 800,
    scrollGlow: 0,
    lastScrollY: 0,
    capIdx: -1,
    rafId: 0,
    BR: null as BoardRect | null,
    wispFrame: 0,
    framesReady: false,
  });

  const goToPhase = React.useCallback((k: number) => {
    const s = state.current;
    s.manual = true;
    const p = k / (FRAME_COUNT - 1);
    s.tgt.sweep = k === 0 ? 0 : 1;
    s.tgt.life = p;
    s.tgt.unf = p;
    s.tgt.bloom = k >= 2 ? (k === 3 ? 1 : 0.5) : 0;
    s.tgt.fr = k === FRAME_COUNT - 1 ? 1 : 0;
    s.replayShown = true;
    setReplayVisible(true);
  }, []);

  const replay = React.useCallback(() => {
    const s = state.current;
    s.manual = false;
    s.replayShown = false;
    s.t0 = null;
    setReplayVisible(false);
  }, []);

  React.useEffect(() => {
    const s = state.current;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const measure = () => {
      s.vh = window.innerHeight;
      s.heroH = heroRef.current?.offsetHeight ?? s.vh;
    };

    const measureBoard = () => {
      const stageEl = stageRef.current;
      const anyFrame = gFrameRefs.current[0];
      if (!stageEl || !anyFrame) {
        s.BR = null;
        return;
      }
      const rect = stageEl.getBoundingClientRect();
      const fit = getComputedStyle(anyFrame).objectFit;
      s.BR = measureBoardRect({ width: rect.width, height: rect.height }, fit);
      if (s.BR && sweepRef.current) {
        sweepRef.current.style.left = `${s.BR.x}px`;
        sweepRef.current.style.top = `${s.BR.y}px`;
        sweepRef.current.style.width = `${s.BR.w}px`;
        sweepRef.current.style.height = `${s.BR.h}px`;
      }
      if (s.BR && spillRef.current) {
        spillRef.current.style.left = `${s.BR.x - s.BR.w * 0.42}px`;
        spillRef.current.style.top = `${s.BR.y + s.BR.h - s.BR.h * 0.02}px`;
        spillRef.current.style.width = `${s.BR.w * 1.4}px`;
        spillRef.current.style.height = `${Math.max(s.BR.sh - (s.BR.y + s.BR.h) + s.BR.h * 0.55, s.BR.h * 1.3)}px`;
      }
    };

    measure();
    measureBoard();
    window.addEventListener("resize", measure);
    window.addEventListener("resize", measureBoard);
    window.addEventListener("orientationchange", measureBoard);
    const firstFrame = gFrameRefs.current[0];
    if (firstFrame && !firstFrame.complete) firstFrame.addEventListener("load", measureBoard);
    const loadTimer = window.setTimeout(() => {
      measure();
      measureBoard();
    }, 250);

    const teardown = () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("resize", measureBoard);
      window.removeEventListener("orientationchange", measureBoard);
      if (firstFrame) firstFrame.removeEventListener("load", measureBoard);
      window.clearTimeout(loadTimer);
    };

    if (prefersReduced) {
      applyFrameStates(gFrameRefs, 1);
      applyFrameStates(cFrameRefs, 1);
      applyFrameStates(sFrameRefs, 1);
      if (boardColorRef.current) {
        boardColorRef.current.style.maskImage = "none";
        boardColorRef.current.style.webkitMaskImage = "none";
      }
      const bloom = computeBloom(1, s.BR);
      if (streetBloomRef.current) {
        streetBloomRef.current.style.maskImage = bloom.maskImage;
        streetBloomRef.current.style.webkitMaskImage = bloom.maskImage;
      }
      if (spillRef.current) spillRef.current.style.opacity = "0";
      if (sweepRef.current) sweepRef.current.style.opacity = "0";
      if (waveFrontierRef.current) waveFrontierRef.current.style.display = "none";
      setHintVisible(true);
      setReplayVisible(false);
      setCaptionIndex(FRAME_COUNT - 1);
      setCaptionText(PHASE_CAPTIONS[FRAME_COUNT - 1]);
      sectionRefs.current.forEach((el) => el?.classList.add("lit"));
      return teardown;
    }

    applyFrameStates(gFrameRefs, 0);
    applyFrameStates(cFrameRefs, 0);
    applyFrameStates(sFrameRefs, 0);
    if (boardColorRef.current) {
      const mask = computeLifeMask(0, s.BR);
      boardColorRef.current.style.maskImage = mask;
      boardColorRef.current.style.webkitMaskImage = mask;
    }

    // Hold the timeline on its opening frame until every hero image has
    // decoded. Otherwise, on a cold or slow connection, a later frame can
    // finish loading mid-crossfade and pop in — which reads as a blink.
    // Capped so a stalled image never freezes the hero.
    const heroImages = [...gFrameRefs.current, ...cFrameRefs.current, ...sFrameRefs.current].filter(
      (img): img is HTMLImageElement => !!img
    );
    let readyCapTimer = 0;
    Promise.race([
      Promise.all(heroImages.map((img) => img.decode().catch(() => undefined))),
      new Promise((resolve) => {
        readyCapTimer = window.setTimeout(resolve, FRAMES_READY_CAP_MS);
      }),
    ]).then(() => {
      s.framesReady = true;
    });

    const loop = (now: number) => {
      if (s.framesReady && s.t0 === null) s.t0 = now;
      const t = s.t0 === null ? 0 : (now - s.t0) / 1000;
      const scrollY = window.scrollY || 0;

      const moved = Math.abs(scrollY - s.lastScrollY);
      if (moved > 1.5) s.scrollGlow = Math.min(1, s.scrollGlow + 0.14);
      else s.scrollGlow *= 0.92;
      if (s.scrollGlow < 0.01) s.scrollGlow = 0;
      s.lastScrollY = scrollY;

      if (!s.manual) {
        const autoGlow = Math.sin(Math.PI * clamp01(s.cur.fr));
        s.scrollGlow = Math.max(s.scrollGlow, autoGlow);

        s.cur.sweep = easeInOut((t - TIMELINE.sweepA) / (TIMELINE.sweepB - TIMELINE.sweepA));
        s.cur.life = easeInOut((t - TIMELINE.lifeA) / (TIMELINE.lifeB - TIMELINE.lifeA));
        s.cur.unf = easeInOut((t - TIMELINE.unfA) / (TIMELINE.unfB - TIMELINE.unfA));
        s.cur.bloom = easeInOut((t - TIMELINE.bloomA) / (TIMELINE.bloomB - TIMELINE.bloomA));
        s.cur.fr = easeInOut((t - TIMELINE.frA) / (TIMELINE.frB - TIMELINE.frA));
      } else {
        (Object.keys(s.cur) as (keyof typeof s.cur)[]).forEach((k) => {
          s.cur[k] += (s.tgt[k] - s.cur[k]) * 0.07;
        });
      }

      const sweep = computeSweep(s.cur.sweep, now * 0.004);
      if (sweepRef.current) sweepRef.current.style.opacity = String(sweep.opacity);
      sweepGlowRef.current?.setAttribute("d", sweep.glow);
      sweepCoreRef.current?.setAttribute("d", sweep.core);
      sweepRib1Ref.current?.setAttribute("d", sweep.rib1);
      sweepRib2Ref.current?.setAttribute("d", sweep.rib2);

      if (boardColorRef.current) {
        const lifeV = clamp01((s.cur.sweep - LIGHT_IN) / (LIGHT_OUT - LIGHT_IN));
        const mask = computeLifeMask(lifeV, s.BR);
        boardColorRef.current.style.maskImage = mask;
        boardColorRef.current.style.webkitMaskImage = mask;
      }

      applyFrameStates(gFrameRefs, s.cur.unf);
      applyFrameStates(cFrameRefs, s.cur.unf);
      applyFrameStates(sFrameRefs, s.cur.unf);

      const bloom = computeBloom(s.cur.bloom, s.BR);
      if (streetBloomRef.current) {
        streetBloomRef.current.style.maskImage = bloom.maskImage;
        streetBloomRef.current.style.webkitMaskImage = bloom.maskImage;
      }
      if (spillRef.current) spillRef.current.style.opacity = String(bloom.spillOpacity);

      const idx = captionIndexFor(s.cur.unf);
      if (idx !== s.capIdx) {
        s.capIdx = idx;
        setCaptionVisible(false);
        window.setTimeout(() => {
          setCaptionText(PHASE_CAPTIONS[idx]);
          setCaptionVisible(true);
        }, 300);
        setCaptionIndex(idx);
      }
      if (s.cur.unf > 0.9) setHintVisible(true);

      const frontDocRaw = s.heroH + s.cur.fr * s.vh * 0.3;
      const atBottom = scrollY + s.vh >= document.body.scrollHeight - 2;
      const frontDoc = atBottom
        ? scrollY + s.vh
        : Math.max(frontDocRaw, Math.min(scrollY + s.vh * 0.72, s.heroH + document.body.scrollHeight));

      for (let i = 0; i < sectionRefs.current.length; i++) {
        const el = sectionRefs.current[i];
        if (!el) continue;
        const trigger = el.offsetTop + el.offsetHeight * 0.28;
        el.classList.toggle("lit", frontDoc > trigger);
      }

      const docHeight = document.body.scrollHeight;
      const distanceToEnd = docHeight - frontDoc;
      const flareRel = 1 - clamp01(distanceToEnd / (s.vh * 0.55));
      const flare = Math.sin(Math.PI * clamp01(flareRel));

      if (waveFrontierRef.current) {
        const restingOpacity = atBottom ? 0.85 : 0;
        waveFrontierRef.current.style.opacity = String(Math.max(s.scrollGlow, flare * 0.9, restingOpacity));
      }

      const updateWispGeometry = s.wispFrame % 2 === 0;
      s.wispFrame++;
      const wispPhase = now * 0.0016 * 1.4;
      for (let w = 0; w < WISP_COUNT; w++) {
        const el = wispRefs.current[w];
        if (!el) continue;
        const wisp = computeWisp(w, wispPhase, flare);
        if (updateWispGeometry) el.setAttribute("d", wisp.d);
        el.style.opacity = String(wisp.opacity);
      }

      if (!s.replayShown && (t > TIMELINE.frB + 0.4 || s.manual)) {
        s.replayShown = true;
        setReplayVisible(true);
      }

      s.rafId = requestAnimationFrame(loop);
    };

    s.rafId = requestAnimationFrame(loop);

    return () => {
      teardown();
      window.clearTimeout(readyCapTimer);
      cancelAnimationFrame(s.rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const registerSection = React.useCallback(
    (index: number) => (el: HTMLElement | null) => {
      sectionRefs.current[index] = el;
    },
    []
  );

  const registerFrame = React.useCallback(
    (refs: ImgRefs, index: number) => (el: HTMLImageElement | null) => {
      refs.current[index] = el;
    },
    []
  );

  const registerWisp = React.useCallback(
    (index: number) => (el: SVGPathElement | null) => {
      wispRefs.current[index] = el;
    },
    []
  );

  return {
    heroRef,
    stageRef,
    boardColorRef,
    streetBloomRef,
    spillRef,
    sweepRef,
    sweepGlowRef,
    sweepCoreRef,
    sweepRib1Ref,
    sweepRib2Ref,
    waveFrontierRef,
    registerGrayFrame: (i: number) => registerFrame(gFrameRefs, i),
    registerColorFrame: (i: number) => registerFrame(cFrameRefs, i),
    registerStreetFrame: (i: number) => registerFrame(sFrameRefs, i),
    registerWisp,
    registerSection,
    captionIndex,
    captionText,
    captionVisible,
    replayVisible,
    hintVisible,
    goToPhase,
    replay,
  };
}

export type HeroExperienceEngine = ReturnType<typeof useHeroExperience>;
