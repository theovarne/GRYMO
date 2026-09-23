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

## Current package status

Genome, breeding, mutation, behaviour, renderer revision 2 and local lineage are functional. No npm package has been published. The browser adapter is a separately pinned consumer; [browser integration](browser-lab.md) identifies its older record codec. The initial audit above is historical, not a description of every current website feature.

| Chain component | Actual status |
| --- | --- |
| Network metadata | Defined locally for mainnet 4663 / testnet 46630, ETH, EVM |
| Keccak/ABI record utility | Implemented locally; codec v2, proposed registry format |
| Chain adapter / registry | Proposed; no Solidity implementation, NOT DEPLOYED |
| Token contract | NOT PUBLISHED |
| Market / Stock Token data | Simulated in website; external adapter PLANNED / NOT CONNECTED |
| Wallet / transactions / trading | Not implemented and not required |

CI runs typecheck, compiler/boundary lint, tests, build and all examples. Consult the [Actions results](https://github.com/theovarne/GRYMO/actions) for the exact commit's outcome rather than treating this document as a permanent passing badge. Release automation creates drafts on version tags; it does not publish npm or deploy contracts.

Repository Description and homepage remain the technical description and grymo.lol. Topics are separate GitHub metadata, not controlled by Git commits. During this migration audit the old network topic was still present; changing it requires repository administration access. Do not infer a successful Topics update from the source-code migration.

See [the exact codec and future contract boundary](robinhood-chain.md) and [market scope](market-environment.md). No live market feed or chain publication is claimed.
