/** Explicit parent record references, not display fingerprints. */
export interface ParentRecordIds {
  parentA?: string;
  parentB?: string;
}
export interface OrganismIdInput {
  genomeVersion: number;
  seed: string | number;
  genomeHash: string;
}
export const CHAIN_IMPLEMENTATION_STATUS = "PROPOSED_EVM_REGISTRY_NOT_DEPLOYED" as const;
