# Architecture

```text
website app.js (current static UI, separate)
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
                      └──► proposed Solana model (not deployed)
```

All `src/` code is free of DOM, React, CSS, network, time and process state. Inputs are explicit. Examples and tests consume the compiled public API from `dist/`. The site is **not** currently wired to this package; equivalent founder logic is duplicated until a separately tested integration is performed.

The browser preview's `hash`, `deriveTrait`, trait ranges and tiny SVG provided the compatibility baseline. Breeding, mutation and ancestry were implemented here as new local core functionality, not copied from the site's animated demo. `src/solana` deliberately contains only proposed types and seed-part names.
