import { createRng } from "../deterministic/rng.js";
import { BEHAVIOUR_LOCI } from "../behaviour/schema.js";
import type { BehaviourGenome, Phenotype } from "../genome/schema.js";
import { round } from "../genome/traits.js";

export function blendContinuous(mother: Phenotype, father: Phenotype, seed: string): Omit<Phenotype, "palette" | "eyes" | "fangs" | "warts"> {
  const draw = createRng(`${seed}:blend:visual`);
  const blend = (a: number, b: number, range: number) => round((a + b) / 2 + (draw() - 0.5) * range * 0.1);
  return {
    eye_size: blend(mother.eye_size, father.eye_size, 1.2),
    eye_spread: blend(mother.eye_spread, father.eye_spread, 1),
    snout: blend(mother.snout, father.snout, 1.2),
    ears: { size: blend(mother.ears.size, father.ears.size, 0.8), droop: blend(mother.ears.droop, father.ears.droop, 1) },
    brow: blend(mother.brow, father.brow, 60),
    skull: blend(mother.skull, father.skull, 0.7)
  };
}

export function blendBehaviour(mother: BehaviourGenome, father: BehaviourGenome, seed: string): BehaviourGenome {
  const draw = createRng(`${seed}:blend:behaviour`);
  const result = {} as BehaviourGenome;
  for (const locus of BEHAVIOUR_LOCI) result[locus] = round((mother[locus] + father[locus]) / 2 + (draw() - 0.5) * 0.1);
  return result;
}
