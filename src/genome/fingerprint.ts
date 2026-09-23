import { hash32 } from "../deterministic/hash.js";
import { stableStringify } from "../deterministic/normalize.js";
import type { Genome } from "./schema.js";

/** Website-compatible seed display ID. Not a hash of the full genome. */
export function siteSeedFingerprint(seed: string): string {
  const left = hash32(`${seed}:genome:0`).toString(16).padStart(8, "0");
  const right = hash32(`${seed}:genome:1`).toString(16).padStart(8, "0");
  return `fp: ${left.slice(0, 4)}:${left.slice(4)}:${right.slice(0, 4)}:${right.slice(4)}`;
}

/** Versioned, non-cryptographic content ID. Do not use as a security commitment. */
export function genomeFingerprint(genome: Genome): string {
  const canonical = stableStringify(genome);
  return [0, 1, 2, 3].map(i => hash32(`grymo:v1:${i}:${canonical}`).toString(16).padStart(8, "0")).join("");
}
