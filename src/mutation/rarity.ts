import type { Genome } from "../genome/schema.js";

/** A local aesthetic classification; unrelated to tokens, prices, or market value. */
export function rarity(genome: Genome): { score: number; tier: "common" | "weird" | "cursed" | "abomination" } {
  const p = genome.phenotype;
  const score = Math.min(100, Math.round(12 + genome.variants.length * 17 + genome.mutations.length * 3 + Math.abs(1 - p.skull) * 38 + p.fangs * 4 + p.warts * 2));
  const tier = score < 34 ? "common" : score < 58 ? "weird" : score < 80 ? "cursed" : "abomination";
  return { score, tier };
}
