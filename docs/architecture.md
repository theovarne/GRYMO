# Architecture

```text
website lab adapter (UI / persistence, separate)
       │ audited trait/hash compatibility
       ▼
deterministic ──► genome ──► renderer
                      │           │
                      ├──► behaviour / local personality labels
                      │
                      ▼
                breeding + mutation
                      │
                      ▼
                 lineage records
                      │
                      └──► local record IDs → EVM registry proposal (not deployed)
```

All `src/` code is free of DOM, React, CSS, network, time and process state. Inputs are explicit. Examples and tests consume the compiled public API from `dist/`. The browser lab consumes a pinned build of this package, verified by file hashes; website state, market simulation and UI remain separate.

The browser preview's `hash`, `deriveTrait`, trait ranges and tiny SVG provided the compatibility baseline. Breeding, mutation and ancestry were implemented here as new local core functionality, not copied from the site's animated demo. `src/chain` contains local SHA-256 record IDs and proposed EVM record types, never wallet or transaction code. Async Web Crypto is used only for hashing; no clock or network input affects the IDs. See [Robinhood Chain](robinhood-chain.md).
