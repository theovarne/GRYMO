import { createRng } from "../deterministic/rng.js";
import type { Phenotype } from "../genome/schema.js";

export function inheritDiscrete(mother: Phenotype, father: Phenotype, childSeed: string): Pick<Phenotype, "palette" | "eyes" | "fangs" | "warts"> {
  const draw = createRng(`${childSeed}:inherit`);
  return {
    palette: draw() < 0.5 ? mother.palette : father.palette,
    eyes: draw() < 0.5 ? mother.eyes : father.eyes,
    fangs: draw() < 0.5 ? mother.fangs : father.fangs,
    warts: draw() < 0.5 ? mother.warts : father.warts
  };
}
