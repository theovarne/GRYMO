import { createRng } from "../deterministic/rng.js";
import { clampBehaviour, clampPhenotype } from "../breeding/clamp.js";
import type { BehaviourGenome, Phenotype } from "../genome/schema.js";
import { BEHAVIOUR_LOCI, mutateBehavioural } from "./behavioural.js";
import { VISUAL_LOCI, mutateVisual } from "./visual.js";

/** A kinship coefficient of 0..0.5 raises per-locus odds from 4% to 55%. */
export function mutationProbability(kinship: number): number {
  if (!Number.isFinite(kinship) || kinship < 0 || kinship > 0.5) throw new RangeError("kinship must be in [0, 0.5]");
  return 0.04 + 1.02 * kinship;
}

export function mutateTraits(phenotype: Phenotype, behaviour: BehaviourGenome, seed: string, kinship = 0): { phenotype: Phenotype; behaviour: BehaviourGenome; events: string[] } {
  const p = structuredClone(phenotype);
  const b = { ...behaviour };
  const draw = createRng(`${seed}:mutation`);
  const probability = mutationProbability(kinship);
  const events: string[] = [];
  for (const locus of VISUAL_LOCI) if (draw() < probability) events.push(mutateVisual(p, locus));
  for (const locus of BEHAVIOUR_LOCI) {
    const hit = draw();
    const direction = draw(); // fixed draw count even without a hit
    if (hit < probability) events.push(mutateBehavioural(b, locus, direction));
  }
  return { phenotype: clampPhenotype(p), behaviour: clampBehaviour(b), events };
}
