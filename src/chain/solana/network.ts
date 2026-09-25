/** Metadata only; no client or connection is created on import. */
export const SOLANA_NETWORK = Object.freeze({
  name: "Solana", cluster: "mainnet-beta", nativeGas: "SOL",
  rpcUrl: "https://api.mainnet-beta.solana.com",
  explorer: "https://explorer.solana.com"
});
export const SOLANA_STATUS = "PROPOSED_PROGRAM_NOT_DEPLOYED" as const;
