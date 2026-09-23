import { stableStringify } from "../deterministic/normalize.js";
import { genomeFingerprint } from "../genome/fingerprint.js";
import type { Genome } from "../genome/schema.js";

/** SHA-256 over UTF-8 canonical JSON. Local preview, NOT an address or ownership proof. */
async function digest(value: unknown): Promise<string> {
  const bytes = new TextEncoder().encode(stableStringify(value));
  return "0x" + Array.from(new Uint8Array(await globalThis.crypto.subtle.digest("SHA-256", bytes)), b => b.toString(16).padStart(2, "0")).join("");
}

/** Domain-separated v1 preview codec; a future contract must explicitly adopt/test it. */
export async function deriveRecordIds(genome: Genome) {
  const genomeHash = await digest(genome);
  const fingerprint = genomeFingerprint(genome);
  const organismId = await digest(["grymo:organism:v1", genome.v, genome.seed, fingerprint, genomeHash]);
  const lineageId = await digest(["grymo:lineage:v1", genome.parents, organismId]);
  return { codec: "grymo-record-v1-sha256" as const, genomeHash, organismId, lineageId };
}
