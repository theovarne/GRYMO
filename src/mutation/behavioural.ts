import { BEHAVIOUR_LOCI } from "../behaviour/schema.js";
import type { BehaviourGenome } from "../genome/schema.js";

export { BEHAVIOUR_LOCI };
export function mutateBehavioural(behaviour: BehaviourGenome, locus: keyof BehaviourGenome, direction: number): string {
  behaviour[locus] += direction < 0.5 ? -0.18 : 0.18;
  return `behaviour:${locus}`;
}
