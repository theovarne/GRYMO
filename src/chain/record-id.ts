import { encodeAbiParameters, keccak256 } from "viem/utils";
import type { Hex } from "viem";
import { normalizeSeed, stableStringify } from "../deterministic/normalize.js";
import type { Genome } from "../genome/schema.js";
import type { ParentRecordIds, OrganismIdInput } from "./types.js";

export const RECORD_ID_CODEC = "grymo-evm-record-v2-keccak256-abi" as const;
export const ZERO_RECORD_ID: Hex = `0x${"00".repeat(32)}`;
const ORGANISM_DOMAIN = "GRYMO_ORGANISM_RECORD_V2";
const LINEAGE_DOMAIN = "GRYMO_LINEAGE_RECORD_V2";
const GENOME_DOMAIN = "GRYMO_GENOME_COMMITMENT_V1";

/** Bytes32, never a 20-byte contract address or the short display fingerprint. */
export function validateRecordId(value: string): Hex {
  if (typeof value !== "string" || !/^0x[0-9a-fA-F]{64}$/.test(value) || value.toLowerCase() === ZERO_RECORD_ID) {
    throw new TypeError("expected a nonzero 32-byte record ID or commitment");
  }
  return value.toLowerCase() as Hex;
}

export function encodeOrganismIdInput(input: OrganismIdInput): Hex {
  if (!Number.isInteger(input.genomeVersion) || input.genomeVersion < 1 || input.genomeVersion > 0xffffffff) {
    throw new RangeError("genome version must be a positive uint32");
  }
  const seed = normalizeSeed(input.seed);
  // UTF-8 must not silently replace unpaired UTF-16 surrogates.
  if ([...seed].some(c => c.length === 1 && c.charCodeAt(0) >= 0xd800 && c.charCodeAt(0) <= 0xdfff)) {
    throw new TypeError("record seed must be well-formed Unicode");
  }
  return encodeAbiParameters(
    [{ type: "string" }, { type: "uint32" }, { type: "string" }, { type: "bytes32" }],
    [ORGANISM_DOMAIN, input.genomeVersion, seed, validateRecordId(input.genomeHash)]
  );
}

/** Proposed EVM content ID. Pure local calculation, no transaction or ownership claim. */
export function deriveOrganismId(input: OrganismIdInput): Hex {
  return keccak256(encodeOrganismIdInput(input));
}

export function deriveLineageId(parentA: string | undefined, parentB: string | undefined, organismId: string): Hex {
  if ((parentA === undefined) !== (parentB === undefined)) throw new TypeError("supply both parent record IDs or neither");
  return keccak256(encodeAbiParameters(
    [{ type: "string" }, { type: "bytes32" }, { type: "bytes32" }, { type: "bytes32" }],
    [LINEAGE_DOMAIN, parentA === undefined ? ZERO_RECORD_ID : validateRecordId(parentA),
      parentB === undefined ? ZERO_RECORD_ID : validateRecordId(parentB), validateRecordId(organismId)]
  ));
}

/** Cryptographic commitment is distinct from the unchanged non-cryptographic genomeFingerprint. */
export function deriveGenomeHash(genome: Genome): Hex {
  return keccak256(encodeAbiParameters([{ type: "string" }, { type: "string" }], [GENOME_DOMAIN, stableStringify(genome)]));
}

/** Bred records need actual parent RECORD IDs; never pad display fingerprints into bytes32. */
export function deriveRecordIds(genome: Genome, parents: ParentRecordIds = {}) {
  const hasParents = parents.parentA !== undefined || parents.parentB !== undefined;
  if (genome.origin === "bred" && (!parents.parentA || !parents.parentB)) throw new TypeError("bred record requires both parent record IDs");
  if (genome.origin === "founder" && hasParents) throw new TypeError("founder record cannot have parent record IDs");
  const genomeHash = deriveGenomeHash(genome);
  const organismId = deriveOrganismId({ genomeVersion: genome.v, seed: genome.seed, genomeHash });
  const lineageId = deriveLineageId(parents.parentA, parents.parentB, organismId);
  return { codec: RECORD_ID_CODEC, genomeHash, organismId, lineageId };
}
