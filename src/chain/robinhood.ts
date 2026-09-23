const nativeCurrency = Object.freeze({ name: "Ether", symbol: "ETH", decimals: 18 });

/** Metadata only: importing this module never opens a connection. */
export const ROBINHOOD_CHAIN = Object.freeze({
  id: 4663, chainId: 4663, name: "Robinhood Chain", nativeCurrency,
  gas: "ETH", vm: "EVM",
  rpcUrl: "https://rpc.mainnet.chain.robinhood.com/",
  explorer: "https://robinhoodchain.blockscout.com/"
});

export const ROBINHOOD_CHAIN_TESTNET = Object.freeze({
  id: 46630, chainId: 46630, name: "Robinhood Chain Testnet", nativeCurrency,
  gas: "ETH", vm: "EVM",
  rpcUrl: "https://rpc.testnet.chain.robinhood.com/",
  explorer: "https://explorer.testnet.chain.robinhood.com/"
});
