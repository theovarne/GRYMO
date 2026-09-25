import { address, getProgramDerivedAddress, isAddress } from "@solana/kit";
import { stableStringify } from "../../deterministic/normalize.js";
import { genomeFingerprint } from "../../genome/fingerprint.js";
import type { Genome } from "../../genome/schema.js";
import type { PdaPreview } from "./types.js";

export const isSolanaAddress = (value: unknown): value is string => typeof value === "string" && isAddress(value);

/** SHA-256 of canonical Genome v1 JSON. The old display fingerprint is unchanged. */
export async function genomeCommitment(genome: Genome): Promise<Uint8Array> {
  const bytes = new TextEncoder().encode(stableStringify(genome));
  return new Uint8Array(await crypto.subtle.digest("SHA-256", bytes));
}
export const bytesToHex = (bytes: Uint8Array): string => Array.from(bytes, byte => byte.toString(16).padStart(2, "0")).join("");

/** Pure local derivation via Solana Kit's canonical-bump search. Does NOT create an account. */
export async function deriveOrganismPda(genome: Genome, programId: string) {
  if (!isSolanaAddress(programId)) throw new TypeError("A valid 32-byte base58 Program ID is required");
  const hash = await genomeCommitment(genome);
  const [pda, bump] = await getProgramDerivedAddress({
    programAddress: address(programId),
    seeds: [new TextEncoder().encode("organism"), hash]
  });
  return { pda, bump, genomeHash: "sha256:" + bytesToHex(hash) };
}

export async function previewOrganismPda(genome: Genome, programId = ""): Promise<PdaPreview> {
  const genomeHash = "sha256:" + bytesToHex(await genomeCommitment(genome));
  const preview: PdaPreview = {
    model: "grymo-organism-pda-v1", status: "CANNOT FINALIZE WITHOUT PROGRAM ID",
    programId: null, genomeFingerprint: genomeFingerprint(genome), genomeHash,
    seedLabel: "organism", seedBytes: [8, 32], pda: null, bump: null
  };
  if (!programId) return preview;
  return { ...preview, ...await deriveOrganismPda(genome, programId), programId, status: "DERIVED / NOT ANCHORED" };
}
