import { BEHAVIOUR_LOCI } from "../behaviour/schema.js";
import type { BehaviourGenome, Phenotype } from "../genome/schema.js";
import { clamp, round } from "../genome/traits.js";

export function clampPhenotype(p: Phenotype): Phenotype {
  return {
    palette: clamp(Math.round(p.palette), 0, 8), eyes: clamp(Math.round(p.eyes), 1, 3),
    eye_size: round(clamp(p.eye_size, 0.6, 1.8)), eye_spread: round(clamp(p.eye_spread, 0.5, 1.5)),
    snout: round(clamp(p.snout, 0.4, 1.6)),
    ears: { size: round(clamp(p.ears.size, 0.7, 1.5)), droop: round(clamp(p.ears.droop, 0, 1)) },
    fangs: clamp(Math.round(p.fangs), 0, 3), warts: clamp(Math.round(p.warts), 0, 6),
    brow: clamp(Math.round(p.brow), -30, 30), skull: round(clamp(p.skull, 0.7, 1.4))
  };
}

export function clampBehaviour(b: BehaviourGenome): BehaviourGenome {
  const result = { ...b };
  for (const locus of BEHAVIOUR_LOCI) result[locus] = round(clamp(result[locus], 0, 1));
  return result;
}
