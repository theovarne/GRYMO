# Implementation status and website audit

Audited source: the current local GRYMO site in `gobboo-clone/app.js` and `index.html` on 2026-09-23. The authenticated GitHub connection confirmed `theovarne/GRYMO` was an empty public repository (`size: 0`, default branch `main`) before this initial upload; there were no existing files or commits to overwrite.

| Mechanism | Site at initial audit (historical) | This package |
| --- | --- | --- |
| Seed → phenotype / behaviour | Actual local `hash`, `deriveTrait`, `genomePreview` | Implemented, website-compatible founder values |
| Main Goblin image | Static brand PNG | Not included as generated output; logo asset only |
| Small procedural preview | Local SVG `innerHTML` | Pure SVG string renderer |
| Breeding | UI trace with fixed parents, hash-derived child number | Real inherit / blend / mutate / clamp function |
| Kinship | Slider; no ancestry lookup | Local record-based nearest-common-ancestor estimate |
| Mutation | Seed labels and slider-driven visual preview | Deterministic per-locus mutation events |
| Lineage | Hard-coded trace and temporary counters | Local records, traversal and JSON serialization |
| Goblin Speak | DOM typography transformation | Deliberately excluded; presentation only |
| AI voice | Local text preview, no model call | Local labels only; no model adapter |
| Market environment | Simulated time bucket, no external market data | Excluded |
| Former chain adapter (historical) | Conditional token display and address text preview | Superseded by local record IDs and the EVM registry proposal |

`npm install`, `npm test`, `npm run example` work locally. The package has **not** been published to npm. CI is running on GitHub and passed on the current main branch. The draft GitHub-release workflow is present but has not been triggered. A browser lab adapter has now been implemented against the core modules, with replayable local births, recipe validation and renderer revision 2. See `browser-lab.md`; deployment verification is separate from this historical audit. The requested repository Description, homepage and all ten Topics have been configured and verified. npm publication, a license choice and any registry contract deployment remain pending—not completed capabilities.

## Robinhood Chain migration — 2026-09-24

The network narrative now targets Robinhood Chain (EVM, 4663, ETH). Local Record ID derivation is implemented and tested. Registry contract: **NOT DEPLOYED**. Token contract: **NOT PUBLISHED**. Market and Stock Tokens feeds: **SIMULATED / NOT CONNECTED**. Optional network telemetry is read-only and does not drive the market model. Genome, breeding, mutation, ancestry and renderer algorithms remain unchanged. No trading or account integration. See [the exact preview codec and planned contract boundary](robinhood-chain.md).
