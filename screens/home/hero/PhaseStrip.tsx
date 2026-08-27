import { cn } from "@/utils";

import type { HeroExperienceEngine } from "@/lib/experience/useHeroExperience";

import { PHASE_DOT_LABELS } from "@/constants/homeExperience";

const PhaseStrip = ({ engine }: { engine: HeroExperienceEngine }) => {
  return (
    <div className="exp-phase-strip">
      <p
        className="exp-phase-caption"
        aria-live="polite"
        style={{ opacity: engine.captionVisible ? 1 : 0 }}
      >
        {engine.captionText}
      </p>

      <div className="flex items-center gap-4">
        <div
          className="flex gap-3"
          role="group"
          aria-label="Transformation phases"
        >
          {PHASE_DOT_LABELS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={cn(
                "size-3 cursor-pointer rounded-full border border-exp-gold bg-transparent transition duration-300 hover:scale-125",
                i === engine.captionIndex && "bg-exp-gold"
              )}
              aria-label={label}
              onClick={() => engine.goToPhase(i)}
            />
          ))}
        </div>

        <button
          type="button"
          className={cn(
            "pointer-events-none cursor-pointer rounded-full border border-exp-tan/50 bg-transparent px-3.5 py-1.5 font-experience text-xs tracking-widest text-exp-tan opacity-0 transition duration-500 hover:border-exp-glow hover:text-exp-glow",
            engine.replayVisible && "pointer-events-auto opacity-100"
          )}
          aria-label="Replay the transformation"
          onClick={engine.replay}
        >
          ↺ replay
        </button>
      </div>

      <div
        className={cn(
          "mt-1 flex items-center gap-2.5 text-2xs tracking-[0.18em] text-exp-tan uppercase opacity-0 transition-opacity duration-1000",
          engine.hintVisible && "opacity-85"
        )}
      >
        <span>The light follows you down</span>
        <div className="exp-scroll-line" />
      </div>
    </div>
  );
};

export default PhaseStrip;
