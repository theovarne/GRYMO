# Solana lineage proposal — not deployed

`src/solana` contains only an account type and proposed seed labels. `proposedLineageSeedParts()` does not derive a Solana PDA, because that would require a chosen program ID, agreed byte encoding, bump search and deployed program. No program ID, address, wallet flow, transaction, RPC, mint or on-chain registry is provided here.

A future on-chain lineage account might contain schema version, a cryptographically secure genome commitment, two parent commitments, generation and an optional off-chain genome URI. The current 128-bit non-cryptographic `genomeFingerprint()` must **not** be used as that commitment. Before deployment, define a canonical binary codec and cryptographic hash, parent-ownership rules, authorization, immutable/revisable fields, rent/storage model, and test vectors against an actual Solana program.

Proposed account namespace: `grymo / lineage / <commitment>`. This is architectural shorthand, not a valid PDA or an announcement of deployment. See [status.md](status.md) for the current boundary.
