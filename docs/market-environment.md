# Solana environment — simulated scenarios and read-only telemetry

GENOME + ENVIRONMENT = BEHAVIOURAL RESPONSE. Environment is explicit external input, never an implicit input to the stored genome. Core works offline.

Behaviour fields stay greed, fear, patience, risk_tolerance, herd_instinct, conviction, loss_aversion, volatility_affinity and drift. These are character/instinct traits, not trading signals.

The website exposes SIMULATED network load, DEX activity, liquidity, volatility, priority pressure and slot activity. The existing VOL / LIQ / MOM controls affect local template responses without changing the organism.

Opt-in SOLANA RPC mode reads actual slot, block height, health and recent performance from a fixed mainnet-beta endpoint. These observations do not measure DEX volume, market liquidity, asset volatility or priority fees. Those fields remain SIMULATED even while telemetry is live. Failed, malformed or stale samples must fall back explicitly; never fabricate LIVE measurements.

Future market adapters remain PLANNED. Persist source, timestamps and exact observations for replay; reject stale data and label simulation fallbacks. No wallet, API key, signing, fund management, order placement or trading is part of this package.
