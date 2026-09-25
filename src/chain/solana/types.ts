export interface PdaPreview {
  model: "grymo-organism-pda-v1";
  status: "CANNOT FINALIZE WITHOUT PROGRAM ID" | "DERIVED / NOT ANCHORED";
  programId: string | null;
  genomeFingerprint: string;
  genomeHash: string;
  seedLabel: "organism";
  seedBytes: readonly [number, number];
  pda: string | null;
  bump: number | null;
}
/** Proposed account representation, not a deployed serialization layout. */
export interface SolanaLineageRecord {
  version: 1;
  seed: string;
  generation: number;
  parents: readonly [string, string] | null;
  genomeFingerprint: string;
  genomeHash: string;
  mutationFlags: readonly string[];
  status: "LOCAL ONLY / NOT ANCHORED";
}
