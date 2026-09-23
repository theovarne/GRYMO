import { hash32 } from "../deterministic/hash.js";
import { normalizeSeed } from "../deterministic/normalize.js";
import { genomeFingerprint } from "../genome/fingerprint.js";
import type { Genome } from "../genome/schema.js";
import type { LineageIndex } from "../lineage/record.js";
import { mutateTraits } from "../mutation/mutate.js";
import { blendBehaviour, blendContinuous } from "./blend.js";
import { estimateKinship } from "./kinship.js";
import { inheritDiscrete } from "./inherit.js";

export interface BreedOptions { lineage?: LineageIndex }

/** Pure recombination. A child needs both parent genomes plus the event seed to replay. */
export function breed(mother: Genome, father: Genome, input: string | number, options: BreedOptions = {}): Genome {
  if (mother.v !== 1 || father.v !== 1) throw new Error("unsupported genome schema");
  const eventSeed = normalizeSeed(input);
  const motherId = genomeFingerprint(mother);
  const fatherId = genomeFingerprint(father);
  const childSeed = String(hash32(`${mother.seed}:${father.seed}:${eventSeed}`));
  const kinship = options.lineage ? estimateKinship(motherId, fatherId, options.lineage) : null;
  const discrete = inheritDiscrete(mother.phenotype, father.phenotype, childSeed);
  const continuous = blendContinuous(mother.phenotype, father.phenotype, childSeed);
  const phenotype = { ...discrete, ...continuous };
  const behaviour = blendBehaviour(mother.behaviour, father.behaviour, childSeed);
  const result = mutateTraits(phenotype, behaviour, childSeed, kinship ?? 0);
  const variants = new Set<string>();
  if (result.phenotype.eyes === 3) variants.add("third_eye");
  if (result.phenotype.fangs === 3) variants.add("reversed_fang");
  if (result.phenotype.skull < 0.83) variants.add("caved_skull");
  for (const event of result.events) if (!event.startsWith("behaviour:")) variants.add(event);
  return {
    v: 1, seed: childSeed, origin: "bred", parents: [motherId, fatherId],
    generation: Math.max(mother.generation, father.generation) + 1, kinship,
    phenotype: result.phenotype, behaviour: result.behaviour,
    variants: [...variants].sort(), mutations: result.events
  };
}
