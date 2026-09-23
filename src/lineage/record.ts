import { genomeFingerprint } from "../genome/fingerprint.js";
import type { Genome } from "../genome/schema.js";

export interface LineageRecord {
  id: string;
  seed: string;
  parents: readonly [string, string] | null;
  generation: number;
}

export type LineageIndex = ReadonlyMap<string, LineageRecord>;

export function recordGenome(genome: Genome): LineageRecord {
  return { id: genomeFingerprint(genome), seed: genome.seed, parents: genome.parents, generation: genome.generation };
}

export function indexLineage(records: readonly LineageRecord[]): LineageIndex {
  const index = new Map<string, LineageRecord>();
  for (const record of records) {
    if (index.has(record.id)) throw new Error(`duplicate lineage ID: ${record.id}`);
    index.set(record.id, record);
  }
  for (const record of records) {
    for (const parent of record.parents ?? []) {
      if (!index.has(parent)) throw new Error(`missing parent record: ${parent}`);
    }
  }
  return index;
}
