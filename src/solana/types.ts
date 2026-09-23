/** Design-only account shapes. There is no deployed GRYMO Solana program here. */
export interface ProposedLineageAccount {
  schemaVersion: 1;
  genomeFingerprint: string;
  parentFingerprints: readonly [string, string] | null;
  generation: number;
  genomeUri?: string;
}

export const SOLANA_IMPLEMENTATION_STATUS = "DESIGN_ONLY_NOT_DEPLOYED" as const;
