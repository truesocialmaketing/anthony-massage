"use client";

import * as React from "react";

import { type BoardBox, type BoardRect, computeBloom, computeSweep, easeInOut, measureBoardRect } from "./engine";

// A once-only settle, played on load rather than looped or tied to scroll —
// interior pages inherit the unfolding, they don't replay it. Same technique
// as the reference site's interior.js: the color layer is clipped to the
// board face once (a real hard edge — that's the billboard's own edge, by
// design) and its saturation/brightness/contrast animate *uniformly* across
// the whole board. Only the light-sweep ribbon moves; there's no masked
// "wipe" reveal, because a spatial wipe over art with such an uneven
// saturation distribution (flat text vs. a blazing figure) reads as a hard
// cut no matter how soft the mask's own gradient band is.
const TIMELINE = { sweepA: 0.5, sweepB: 2.7, bloomA: 2.3, bloomB: 3.4 };

function lifeFilter(v: number): string {
  const sat = 0.55 + 0.45 * v;
  const bri = 0.9 + 0.16 * v;
  const con = 1 + 0.05 * v;
  return `saturate(${sat}) brightness(${bri}) contrast(${con})`;
}

export function usePageHeroExperience(board: BoardBox) {
  const heroRef = React.useRef<HTMLElement | null>(null);
  const stageRef = React.useRef<HTMLDivElement | null>(null);
  const frameRef = React.useRef<HTMLImageElement | null>(null);
  const boardColorRef = React.useRef<HTMLDivElement | null>(null);
  const streetBloomRef = React.useRef<HTMLDivElement | null>(null);
  const spillRef = React.useRef<HTMLDivElement | null>(null);

  const sweepRef = React.useRef<SVGSVGElement | null>(null);
  const sweepGlowRef = React.useRef<SVGPathElement | null>(null);
  const sweepCoreRef = React.useRef<SVGPathElement | null>(null);
  const sweepRib1Ref = React.useRef<SVGPathElement | null>(null);
  const sweepRib2Ref = React.useRef<SVGPathElement | null>(null);

  const state = React.useRef({
    BR: null as BoardRect | null,
    t0: null as number | null,
    rafId: 0,
    settled: false,
  });

  React.useEffect(() => {
    const s = state.current;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const measureBoard = () => {
      const stageEl = stageRef.current;
      const anyFrame = frameRef.current;
      if (!stageEl || !anyFrame) {
        s.BR = null;
        return;
      }
      const rect = stageEl.getBoundingClientRect();
      const fit = getComputedStyle(anyFrame).objectFit;
      s.BR = measureBoardRect({ width: rect.width, height: rect.height }, fit, board);
      const br = s.BR;

      if (br && boardColorRef.current) {
        const clip = `inset(${br.y}px ${br.sw - (br.x + br.w)}px ${br.sh - (br.y + br.h)}px ${br.x}px)`;
        boardColorRef.current.style.clipPath = clip;
        boardColorRef.current.style.setProperty("-webkit-clip-path", clip);
        // this layer is confined to the board via clip-path now, not a mask
        // wipe — clear the shared .exp-board-color class's default mask so
        // it doesn't linger and hide the (now-clipped) layer entirely
        boardColorRef.current.style.maskImage = "none";
        boardColorRef.current.style.webkitMaskImage = "none";
      }
      if (br && sweepRef.current) {
        sweepRef.current.style.left = `${br.x}px`;
        sweepRef.current.style.top = `${br.y}px`;
        sweepRef.current.style.width = `${br.w}px`;
        sweepRef.current.style.height = `${br.h}px`;
      }

      // once the settle animation has finished, resizing (or the board image
      // finishing its late load) should still re-apply the final, fully-lit
      // state at the new geometry rather than leaving a stale one in place
      if (s.settled || prefersReduced) {
        applyFrame(1, 1);
      }
    };

    const applyFrame = (sweepP: number, bloomP: number) => {
      const sweep = computeSweep(sweepP, performance.now() * 0.004);
      if (sweepRef.current) sweepRef.current.style.opacity = String(sweep.opacity);
      sweepGlowRef.current?.setAttribute("d", sweep.glow);
      sweepCoreRef.current?.setAttribute("d", sweep.core);
      sweepRib1Ref.current?.setAttribute("d", sweep.rib1);
      sweepRib2Ref.current?.setAttribute("d", sweep.rib2);

      if (boardColorRef.current) boardColorRef.current.style.filter = lifeFilter(sweepP);

      const bloom = computeBloom(bloomP, s.BR);
      if (streetBloomRef.current) {
        streetBloomRef.current.style.maskImage = bloom.maskImage;
        streetBloomRef.current.style.webkitMaskImage = bloom.maskImage;
      }
      if (spillRef.current) spillRef.current.style.opacity = String(bloom.spillOpacity);
    };

    measureBoard();
    window.addEventListener("resize", measureBoard);
    window.addEventListener("orientationchange", measureBoard);
    const frameEl = frameRef.current;
    if (frameEl && !frameEl.complete) frameEl.addEventListener("load", measureBoard);
    const loadTimer = window.setTimeout(measureBoard, 250);

    const teardown = () => {
      window.removeEventListener("resize", measureBoard);
      window.removeEventListener("orientationchange", measureBoard);
      if (frameEl) frameEl.removeEventListener("load", measureBoard);
      window.clearTimeout(loadTimer);
    };

    if (prefersReduced) {
      s.settled = true;
      applyFrame(1, 1);
      if (sweepRef.current) sweepRef.current.style.opacity = "0";
      return teardown;
    }

    applyFrame(0, 0);

    const loop = (now: number) => {
      if (s.t0 === null) s.t0 = now;
      const t = (now - s.t0) / 1000;

      const sweepP = easeInOut((t - TIMELINE.sweepA) / (TIMELINE.sweepB - TIMELINE.sweepA));
      const bloomP = easeInOut((t - TIMELINE.bloomA) / (TIMELINE.bloomB - TIMELINE.bloomA));
      applyFrame(sweepP, bloomP);

      if (t < TIMELINE.bloomB + 0.4) {
        s.rafId = requestAnimationFrame(loop);
      } else {
        s.settled = true;
        applyFrame(1, 1);
      }
    };
    s.rafId = requestAnimationFrame(loop);

    return () => {
      teardown();
      cancelAnimationFrame(s.rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  return {
    heroRef,
    stageRef,
    frameRef,
    boardColorRef,
    streetBloomRef,
    spillRef,
    sweepRef,
    sweepGlowRef,
    sweepCoreRef,
    sweepRib1Ref,
    sweepRib2Ref,
  };
}

export type PageHeroExperienceEngine = ReturnType<typeof usePageHeroExperience>;
