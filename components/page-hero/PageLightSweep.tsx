import type { PageHeroExperienceEngine } from "@/lib/experience/usePageHeroExperience";

const PageLightSweep = ({ engine }: { engine: PageHeroExperienceEngine }) => {
  return (
    <svg
      ref={engine.sweepRef}
      className="pointer-events-none absolute inset-auto z-6 h-auto w-auto opacity-0 mix-blend-screen"
      aria-hidden="true"
      preserveAspectRatio="none"
      viewBox="0 0 400 300"
    >
      <defs>
        <linearGradient
          id="expPageSweepGrad"
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >
          <stop
            offset="0%"
            stopColor="#fff8d6"
            stopOpacity="0"
          />
          <stop
            offset="42%"
            stopColor="#ffefb8"
            stopOpacity="0.2"
          />
          <stop
            offset="50%"
            stopColor="#fffdf2"
            stopOpacity="0.4"
          />
          <stop
            offset="58%"
            stopColor="#ffefb8"
            stopOpacity="0.2"
          />
          <stop
            offset="100%"
            stopColor="#fff8d6"
            stopOpacity="0"
          />
        </linearGradient>
        <filter
          id="expPageSweepGlow"
          x="-40%"
          y="-40%"
          width="180%"
          height="180%"
        >
          <feGaussianBlur
            stdDeviation="9"
            result="b"
          />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#expPageSweepGlow)">
        <path
          ref={engine.sweepGlowRef}
          fill="url(#expPageSweepGrad)"
          opacity="0.2"
        />
        <path
          ref={engine.sweepCoreRef}
          fill="url(#expPageSweepGrad)"
          opacity="0.46"
        />
        <path
          ref={engine.sweepRib1Ref}
          fill="#fffdf2"
          opacity="0.16"
        />
        <path
          ref={engine.sweepRib2Ref}
          fill="#ffe9a8"
          opacity="0.12"
        />
      </g>
    </svg>
  );
};

export default PageLightSweep;
