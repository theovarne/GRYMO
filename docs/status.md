# Implementation status and website audit

Audited source: the current local GRYMO site in `gobboo-clone/app.js` and `index.html` on 2026-09-23. The authenticated GitHub connection confirmed `theovarne/GRYMO` was an empty public repository (`size: 0`, default branch `main`) before this initial upload; there were no existing files or commits to overwrite.

| Mechanism | Current site | This package |
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
| Solana | Conditional mint display and PDA text preview | Architecture types only; no deployed program |

`npm install`, `npm test`, `npm run example` work locally. The package has **not** been published to npm. CI and a draft GitHub-release workflow are included but cannot be observed until the repository is connected and pushed. The live website has **not yet been integrated** with this package. Repository description/topics require a separate metadata update and are tracked as pending until verified. These are pending tasks, not completed capabilities.
