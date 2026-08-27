import { HERO_BOARD, type BoardBox } from "@/lib/experience/engine";

export type PageHeroVariant = "present" | "rising" | "session" | "arrived" | "compressed" | "entering" | "opening";

export interface PageHeroVariantConfig {
  src: string;
  iso: string;
  spill: string;
  board: BoardBox;
}

export const PAGE_HERO_VARIANTS: Record<PageHeroVariant, PageHeroVariantConfig> = {
  present: {
    src: "/images/hero/frame5.jpg",
    iso: "/images/hero/frame5-iso.jpg",
    spill: "/images/hero/frame5-spill.jpg",
    board: { L: 303, R: 1294, T: 300, B: 679 },
  },
  rising: {
    src: "/images/hero/frame6.jpg",
    iso: "/images/hero/frame6-iso.jpg",
    spill: "/images/hero/frame6-spill.jpg",
    board: { L: 284, R: 1331, T: 300, B: 697 },
  },
  session: {
    src: "/images/hero/frame8.jpg",
    iso: "/images/hero/frame8-iso.jpg",
    spill: "/images/hero/frame8-spill.jpg",
    board: { L: 274, R: 1302, T: 294, B: 686 },
  },
  arrived: {
    src: "/images/hero/frame9.jpg",
    iso: "/images/hero/frame9-iso.jpg",
    spill: "/images/hero/frame9-spill.jpg",
    board: { L: 263, R: 1319, T: 280, B: 688 },
  },
  compressed: {
    src: "/images/hero/frame1.jpg",
    iso: "/images/hero/frame1-iso.jpg",
    spill: "/images/hero/frame1-spill.jpg",
    board: HERO_BOARD,
  },
  entering: {
    src: "/images/hero/frame2.jpg",
    iso: "/images/hero/frame2-iso.jpg",
    spill: "/images/hero/frame2-spill.jpg",
    board: HERO_BOARD,
  },
  opening: {
    src: "/images/hero/frame3.jpg",
    iso: "/images/hero/frame3-iso.jpg",
    spill: "/images/hero/frame3-spill.jpg",
    board: HERO_BOARD,
  },
};
