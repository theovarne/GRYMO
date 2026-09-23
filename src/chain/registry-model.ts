import type { Hex } from "viem";
import type { Genome } from "../genome/schema.js";
import type { ParentRecordIds } from "./types.js";
import { deriveRecordIds, validateRecordId } from "./record-id.js";

/** Local representation of a PROPOSED registry entry. No chain storage exists. */
export interface OrganismRecord {
  organismId: Hex;
  genomeHash: Hex;
  parentA?: Hex;
  parentB?: Hex;
  generation: number;
  mutationFlags: string[];
}

export function buildOrganismRecord(genome: Genome, parents: ParentRecordIds = {}): OrganismRecord {
  if (!Number.isInteger(genome.generation) || genome.generation < 0 || genome.generation > 0xffffffff) throw new RangeError("generation must fit uint32");
  if (genome.origin === "founder" && (genome.generation !== 0 || genome.parents !== null)) throw new TypeError("invalid founder ancestry");
  if (genome.origin === "bred" && (genome.generation === 0 || genome.parents?.length !== 2)) throw new TypeError("invalid bred ancestry");
  if (genome.origin !== "founder" && genome.origin !== "bred") throw new TypeError("invalid organism origin");
  const ids = deriveRecordIds(genome, parents);
  return {
    organismId: ids.organismId, genomeHash: ids.genomeHash,
    ...(parents.parentA === undefined ? {} : { parentA: validateRecordId(parents.parentA), parentB: validateRecordId(parents.parentB!) }),
    generation: genome.generation, mutationFlags: [...genome.mutations]
  };
}
