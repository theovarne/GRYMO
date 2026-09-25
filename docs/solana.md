# GRYMO × Solana

GRYMO derives organisms from seeds. Solana derives program-controlled addresses from seeds. Two deterministic systems, different layers: one creates creatures; the other can give their history an address.

**PDA MODEL: PROPOSED. PROGRAM: NOT DEPLOYED. PUBLIC REGISTRY: NOT DEPLOYED. TOKEN MINT: NOT PUBLISHED.**

The optional local utilities are real code, not an onchain implementation. No Program ID, mint, wallet, signing key or publication transaction is configured. A future deployment requires a separate review and explicit configuration.

## Local core and public layer

```text
LOCAL CORE (functional, offline)
seed + genome version + full ordered breeding history
  → genome → phenotype / behaviour → breeding / mutation → local lineage

SOLANA LAYER (proposed)
canonical full genome → SHA-256 commitment → organism PDA
  → future program-owned account → verifiable ancestry
```

The chain does not store the face. Store provenance; recompute phenotype. The core package root has no SDK/network dependency. Import optional utilities from `./dist/chain/solana/index.js` after building, or the intended package subpath `@theovarne/grymo/chain` (npm publication is pending).

## Exact proposed PDA model

```text
canonical = stableStringify(fullGenome)
genomeHash = SHA256(UTF8(canonical))          # exactly 32 raw bytes
seeds = [UTF8("organism"), genomeHash]       # 8 bytes, 32 bytes
[pda, bump] = getProgramDerivedAddress({programAddress, seeds})
```

The full canonical genome includes version, seed, ordered parent fingerprints, generation, kinship, phenotype, behaviour, variants and mutation events. Object keys are sorted recursively; array ordering is preserved. Number and string encoding follows the existing JavaScript Genome v1 serializer, not a new cross-language canonicalization standard. Test vectors pin exact bytes and hashes. No hex string or short fingerprint is used as a raw 32-byte seed. Full-genome hashing handles long Unicode seed inputs without exceeding the per-seed byte limit.

Solana Kit performs the canonical-bump search and off-curve check. PDA derivation incorporates seed bytes, program address and the protocol derivation marker; it is not `hash(seed)`. Each seed is at most 32 bytes. The model uses only two application seeds, leaving room for the bump. Derivation alone does not create an account. See the [official PDA derivation documentation](https://solana.com/docs/core/pda/pda-derivation).

## Four distinct identifiers

| Identifier | Meaning |
| --- | --- |
| Genome display fingerprint | Existing non-cryptographic full-genome ID, unchanged for compatibility |
| Genome SHA-256 commitment | Full 32-byte canonical-genome digest, displayed as `sha256:…` |
| Organism PDA | Base58 program-controlled address derived under a particular Program ID |
| Token mint | Separate base58 address of a real token mint, currently unpublished |

Never relabel the old display fingerprint as SHA-256. A wallet public key, mint address, Program ID and PDA are not interchangeable, even when all use 32-byte base58 address encoding. A transaction signature has a different byte length and is validated separately.

## Preview and status

`previewOrganismPda(genome)` returns the commitment and seed model, with null Program ID, PDA and bump plus `CANNOT FINALIZE WITHOUT PROGRAM ID`.

`deriveOrganismPda(genome, programId)` derives a real mathematical PDA for an explicitly supplied valid Program ID. It performs no RPC and cannot establish deployment, account existence or publication. The returned preview status is `DERIVED / NOT ANCHORED`, never `ONCHAIN`. Test-only official documentation fixtures are not GRYMO deployment configuration.

```sh
npm run example:record
```

This default example deliberately produces no PDA because the project has no Program ID. Do not fill configuration with a sample or system address to make the UI look complete.

## Account data proposal

A future organism account may store version, seed, parent PDAs, generation, full genome commitment, mutation flags and canonical bump. `solanaLineageRecord()` is a **local representation**; its `parents` are existing local fingerprints, not finalized parent PDA references or an onchain binary layout.

Before implementation, replay and verify each parent's complete genome, derive its PDA under the same program, validate immutable parent accounts and generation, then define precise size limits and serialization. This model currently commits the existing Genome v1 parent fingerprints, which are not cryptographic: ancestry authenticity therefore cannot be inferred from the commitment alone. A reviewed public provenance layer must validate complete ancestry and bind cryptographic parent references, without silently changing Core v1 outputs.

Authorization, account ownership, immutable writes, canonical bump verification, parent validation, replay/version boundaries and transaction events must be designed and tested in a real program before deployment. No executable program or public ancestry verification service is claimed here. Do not store SVG, model voice or the entire genome in token metadata.

## Network and telemetry

Network: Solana mainnet-beta. Public RPC: `https://api.mainnet-beta.solana.com`. Explorer: `https://explorer.solana.com`.

The website's opt-in read-only proxy permits only `getSlot`, `getBlockHeight`, `getHealth` and `getRecentPerformanceSamples`. Successful measurements are labelled LIVE RPC with their observation time; failures/malformed or expired samples fall back to SIMULATED. These calls do not supply DEX volume, asset liquidity, volatility or priority fees. Those scenarios remain simulated. Public endpoints can rate-limit; unavailable service is not evidence of a chain outage. See [RPC methods](https://solana.com/docs/rpc/http) and [market scope](market-environment.md).

## Wallet and token scope

Generation, breeding, rendering, sharing and local verification require no wallet. Wallet Standard is a future publication boundary, not a fake connect modal. No current code signs or sends transactions.

A future ordinary fungible token should use the standard Token Program unless concrete product requirements justify extensions. Token-2022 metadata/extensions require deliberate pre-initialization planning; no transfer tax, fee, dividend or hook is included. Token mint state is separate from the lineage program. The only valid future mint will be configured explicitly after verification; old network addresses are not reused.

## Compatibility

Genome Spec v1 remains DRAFT / freeze pending. Seeds 1, 42, 741190 and 999999 retain identical genomes, phenotypes, fingerprints and renderer revision 2 output. Breeding and mutation algorithms are untouched. Existing local recipes and exports remain replayable. The previous chain-only API is retired; no silent identifier conversion or false publication claim is made.
