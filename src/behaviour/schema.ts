import type { BehaviourGenome } from "../genome/schema.js";
export type { BehaviourGenome };
export const BEHAVIOUR_LOCI = ["greed", "fear", "patience", "risk_tolerance", "herd_instinct", "conviction", "loss_aversion", "volatility_affinity", "drift"] as const satisfies readonly (keyof BehaviourGenome)[];
