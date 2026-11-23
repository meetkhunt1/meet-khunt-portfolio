/**
 * Case-study hero: the client's site scrolling inside the laptop-in-hand
 * mockup, on a grainy gradient in the brand's own colours.
 *
 * `screen` is a desktop capture of the live site (1200px wide, a few screens
 * tall) that scrolls inside the laptop; `colors` are the gradient stops,
 * picked from the client's site. Cards on /projects keep using
 * `project.image` — this is only for the case-study page.
 *
 * Add an entry here when a new case study is added.
 */

export type CaseStudyHero = {
  screen: { src: string; width: number; height: number };
  /** Gradient stops: top-left, middle, bottom-right */
  colors: [string, string, string];
};

const screen = (slug: string, height: number) => ({
  src: `/projects/screens/${slug}.webp`,
  width: 1200,
  height,
});

export const CASE_STUDY_HERO: Record<string, CaseStudyHero> = {
  replo: { screen: screen("replo", 3750), colors: ["#1e1b4b", "#3b37c9", "#0ea5b7"] },
  "johnson-spinal-care": {
    screen: screen("johnson-spinal-care", 3750),
    colors: ["#0f2a4f", "#24497a", "#c8303c"],
  },
  airbond: { screen: screen("airbond", 3750), colors: ["#0b2740", "#174a6e", "#ef7d1e"] },
  "mumma-mall": { screen: screen("mumma-mall", 3750), colors: ["#3a1570", "#7434b8", "#f4c21b"] },
  "rizzo-photographs": {
    screen: screen("rizzo", 3750),
    colors: ["#0b0b0b", "#3d1512", "#e4572e"],
  },
  "kim-lloyd-fitness": {
    screen: screen("kim-lloyd", 3750),
    colors: ["#1b1f6b", "#1093c9", "#f2c414"],
  },
  "microdot-technologies": {
    screen: screen("microdot", 2695),
    colors: ["#0a1640", "#1e3a8a", "#f2a33a"],
  },
  "athletic-annex": {
    screen: screen("athletic-annex", 3750),
    colors: ["#111827", "#2d3a4f", "#9bd43a"],
  },
  riversol: { screen: screen("riversol", 3750), colors: ["#04232b", "#0b5262", "#4cc3d9"] },
  "jadu-beauty": { screen: screen("jadu-beauty", 3750), colors: ["#141414", "#4a3a28", "#c9a46a"] },
  "luma-nutrition": {
    screen: screen("luma-nutrition", 4228),
    colors: ["#123d26", "#1f6b3e", "#f2a33a"],
  },
  "hume-health": { screen: screen("hume-health", 3750), colors: ["#0b1d3a", "#1d4ed8", "#5fb3f6"] },
  aavilo: { screen: screen("aavilo", 2663), colors: ["#16341f", "#2f6b3a", "#e4c068"] },
  "baby-gains": { screen: screen("baby-gains", 3750), colors: ["#0c0c12", "#1e3a8a", "#3f8cf5"] },
  "hanson-of-sonoma": {
    screen: screen("hanson-of-sonoma", 3750),
    colors: ["#4a1111", "#b3261e", "#f2a08c"],
  },
  "wacky-jackys": {
    screen: screen("wacky-jackys", 3750),
    colors: ["#1c2f86", "#3a35a8", "#d9327a"],
  },
  "kitchen-corner": {
    screen: screen("kitchen-corner", 3750),
    colors: ["#101010", "#21402c", "#86c25f"],
  },
};
