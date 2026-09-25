# Implementation status

| Component | Status |
| --- | --- |
| Genome / Breeding / Mutation | Functional, unchanged Genome v1 |
| Behaviour Genome / Renderer | Functional, unchanged renderer revision 2 |
| Local Lineage | Functional |
| Solana PDA Model | Proposed; local SDK derivation is implemented and tested |
| Solana Program | NOT DEPLOYED |
| Public Registry | NOT DEPLOYED |
| Token Mint | NOT PUBLISHED |
| Wallet / transactions | Not implemented; not required for Core |
| Market / DEX inputs | SIMULATED; no live market integration |
| Model voice | Planned; website has a local template |
| npm release | Not published |

The browser lab is a version-pinned consumer; see [browser integration](browser-lab.md). Website publishing is separate from GitHub commits. [Actions](https://github.com/theovarne/GRYMO/actions) reports validation for each commit, not an unconditional guarantee.

Historical audit: the original website supplied founder trait/hash compatibility and a tiny SVG preview; initial breeding traces, ancestry counters and kinship controls were UI demonstrations. Real local inheritance, mutation, lineage and replay were subsequently implemented in this package. Goblin Speak remains presentation only.

Genome Spec v1 remains DRAFT / freeze pending. No algorithm or golden vector was changed by the current chain-layer migration. A future change to trait derivation, PRNG, breeding, mutation or serialization requires an explicit version boundary, never silent changes to v1 records.
