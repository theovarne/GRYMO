import type { Genome } from "../../genome/schema.js";
import { genomeFingerprint } from "../../genome/fingerprint.js";
import { bytesToHex, genomeCommitment } from "./pda.js";
import type { SolanaLineageRecord } from "./types.js";

export async function solanaLineageRecord(genome: Genome): Promise<SolanaLineageRecord> {
  return {
    version: genome.v, seed: genome.seed, generation: genome.generation,
    parents: genome.parents === null ? null : [...genome.parents],
    genomeFingerprint: genomeFingerprint(genome),
    genomeHash: "sha256:" + bytesToHex(await genomeCommitment(genome)),
    mutationFlags: [...genome.mutations], status: "LOCAL ONLY / NOT ANCHORED"
  };
}
