# Architecture

Local Core: deterministic → genome → phenotype / behaviour → breeding + mutation → lineage.

Optional public layer: canonical genome → SHA-256 commitment → proposed organism PDA → future public account.

Core modules never import the chain layer, Solana Kit, UI, network clients or process state. Inputs remain explicit; no clock, wallet, RPC or model call affects generation, breeding, mutation or renderer output. The import/call boundary lint enforces this separation.

The root package exports only Core. The optional package subpath ./chain exports src/chain/solana. Solana Kit computes canonical-bump PDAs locally; derivation does not allocate an account or authenticate ancestry. The website consumes pinned Core plus a bundled optional PDA utility. UI persistence, language transformation and simulated environment remain separate.

The genome fingerprint is the unchanged non-cryptographic v1 content ID. The proposed PDA uses a separate full 32-byte SHA-256 canonical-genome commitment, not that short display fingerprint. See [Solana proposal](solana.md), [browser integration](browser-lab.md), and [market scope](market-environment.md).
