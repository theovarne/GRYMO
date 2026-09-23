import { round, trait } from "../genome/traits.js";
import type { BehaviourGenome } from "./schema.js";

export function deriveBehaviour(seed: string): BehaviourGenome {
  return {
    greed: round(trait(seed, "greed")), fear: round(trait(seed, "fear")),
    patience: round(trait(seed, "patience")), risk_tolerance: round(trait(seed, "risk_tolerance")),
    herd_instinct: round(trait(seed, "herd_instinct")), conviction: round(trait(seed, "conviction")),
    loss_aversion: round(trait(seed, "loss_aversion")),
    volatility_affinity: round(trait(seed, "volatility_affinity")), drift: round(trait(seed, "drift"))
  };
}
