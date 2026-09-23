import { hash32 } from "../deterministic/hash.js";
import { normalizeSeed } from "../deterministic/normalize.js";
import { deriveBehaviour } from "../behaviour/derive.js";
import { round, trait } from "./traits.js";
import type { Genome, Phenotype } from "./schema.js";

/** Website-compatible founder phenotype; no invented parents or lineage depth. */
export function generateGenome(input: string | number): Genome {
  const seed = normalizeSeed(input);
  const phenotype: Phenotype = {
    palette: hash32(`${seed}:palette`) % 9,
    eyes: 1 + hash32(`${seed}:eyes`) % 3,
    eye_size: round(0.6 + trait(seed, "eye_size") * 1.2),
    eye_spread: round(0.5 + trait(seed, "eye_spread")),
    snout: round(0.4 + trait(seed, "snout") * 1.2),
    ears: { size: round(0.7 + trait(seed, "ear_size") * 0.8), droop: round(trait(seed, "droop")) },
    fangs: hash32(`${seed}:fangs`) % 4,
    warts: hash32(`${seed}:warts`) % 7,
    brow: Math.round(-30 + trait(seed, "brow") * 60),
    skull: round(0.7 + trait(seed, "skull") * 0.7)
  };
  const variants: string[] = [];
  if (phenotype.eyes === 3) variants.push("third_eye");
  if (phenotype.fangs === 3) variants.push("reversed_fang");
  if (trait(seed, "skull") < 0.18) variants.push("caved_skull");
  return { v: 1, seed, origin: "founder", parents: null, generation: 0, kinship: null, phenotype, behaviour: deriveBehaviour(seed), variants, mutations: [] };
}
