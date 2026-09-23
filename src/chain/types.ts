/** Proposed EVM registry shape. No contract has been deployed. */
export interface ProposedOrganismRecord {
  schemaVersion: 1;
  seed: string;
  genomeHash: string;
  parentA: string | null;
  parentB: string | null;
  generation: number;
  mutationFlags: readonly string[];
}
export const CHAIN_IMPLEMENTATION_STATUS = "LOCAL_PREVIEW_CONTRACT_NOT_DEPLOYED" as const;
export const ROBINHOOD_CHAIN = Object.freeze({
  name: "Robinhood Chain", chainId: 4663, gas: "ETH", vm: "EVM",
  explorer: "https://robinhoodchain.blockscout.com"
});
