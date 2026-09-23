# Market environment — simulated / planned

Genes are deterministic. Markets are not. A market snapshot is **external input**, never an implicit input to genome generation, breeding, mutation or SVG rendering. Core organisms must work completely offline.

The website's current environment is **SIMULATED**. VOL / LIQ / MOM controls affect a local character response. Optional block/gas telemetry is network observation, not an asset price, volatility estimate or real liquidity feed. The core package does not fetch it. AI voice interprets personality; it is not an execution layer.

Behaviour fields keep their existing schema names:

```text
greed, fear, patience, risk_tolerance, herd_instinct,
conviction, loss_aversion, volatility_affinity, drift
```

## Future adapter boundary — design only

```ts
interface MarketEnvironment {
  source: string;
  observedAt: string;
  mode: "SIMULATED" | "READ_ONLY";
  volatility: number;
  liquidity: number;
  momentum: number;
}
interface MarketEnvironmentAdapter {
  snapshot(): Promise<MarketEnvironment>;
}
```

These interfaces illustrate a future integration, not exported functional adapters. `LocalSimulatedEnvironment` is a proposed class name; the existing browser uses its own local simulation functions. `RobinhoodMarketEnvironment` is **PLANNED / NOT IMPLEMENTED**. The official [Stock Token APIs](https://docs.robinhood.com/chain/stock-token-apis/) may be evaluated for assets, prices and corporate actions. Verify the current official API path, availability, permissions and terms before building an adapter; none is connected here.

Persist source, timestamp, units and the exact snapshot for replay. Reject stale/malformed data, clearly label simulation fallbacks, and never convert a network failure into invented measurements. Future observations must not alter a stored genome. There is no order placement, account connection, signing, fund management or trading MCP integration.
