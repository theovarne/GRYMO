# GRYMO × Robinhood Chain

GRYMO derives organisms deterministically from seeds. Robinhood Chain provides an EVM-compatible public environment where lineage records may eventually be published. The chain does not render the organism; it only needs enough provenance to verify where that organism came from.

**Status: PROPOSED EVM REGISTRY. NOT DEPLOYED.** Local record calculations are implemented. There is no Solidity implementation, registry write, wallet connection, transaction, deployed registry address or published token contract in this package.

## Networks

| Field | Mainnet | Testnet |
| --- | --- | --- |
| Name | Robinhood Chain | Robinhood Chain Testnet |
| Chain ID | 4663 | 46630 |
| Native gas | ETH (18 decimals) | ETH (18 decimals) |
| VM | EVM | EVM |
| RPC | https://rpc.mainnet.chain.robinhood.com/ | https://rpc.testnet.chain.robinhood.com/ |
| Explorer | https://robinhoodchain.blockscout.com/ | https://explorer.testnet.chain.robinhood.com/ |

Robinhood Chain is an EVM-compatible Arbitrum-based Layer 2, not Ethereum mainnet. Definitions follow [Robinhood's official connection documentation](https://docs.robinhood.com/chain/connecting/). Public RPC is rate-limited; production workloads should select a suitable provider. Exported objects are metadata, not network clients. Empty `GRYMO_REGISTRY_ADDRESS` is intentional. No private key is required. The core does not load `.env`.

## Local data → proposed record

```text
CORE LOCAL DATA                     PROPOSED EVM RECORD
seed                                organismId
genome version                      genomeHash
ordered parents             →       parentA / parentB
generation                          generation
mutation flags                      mutationFlags
genome fingerprint                  (separate display identifier)
```

`OrganismRecord` in `src/chain/registry-model.ts` is a local representation. Its `parentA` and `parentB` are full parent **record IDs**, never short genome fingerprints. Founder records omit both; bred records require both. `buildOrganismRecord` checks origin/generation consistency and copies mutation flags; it does not authenticate ancestry or prove that a supplied parent ID corresponds to a genome. The caller must rebuild and verify parent records. Future registry validation must enforce parent existence, generation, immutable records and a reviewed provenance/replay policy.

## Fingerprint, commitment and record ID are different

- `genomeFingerprint(genome)`: unchanged 32-hex-character, non-cryptographic display/content fingerprint. It is **not SHA-256**; relabelling it would break both accuracy and compatibility.
- `deriveGenomeHash(genome)`: new 32-byte Keccak commitment to canonical full-genome data.
- `deriveOrganismId(input)`: new 32-byte ID for the proposed organism record.
- `deriveLineageId(parentA, parentB, organismId)`: new 32-byte ID for ordered ancestry references.

These are not 20-byte EVM contract addresses and do not prove ownership, authenticity, registration or scientific correctness. Hashes alone cannot validate an organism's origin.

## Exact versioned codec

Codec: `grymo-evm-record-v2-keccak256-abi`. Uses Ethereum **Keccak-256**, not NIST SHA3-256, and standard `abi.encode`, not packed encoding. Implemented with viem; tests compare ABI bytes and hashes with ethers independently.

```text
genomeHash = keccak256(abi.encode(
  string("GRYMO_GENOME_COMMITMENT_V1"),
  string(stableStringify(fullGenome))
))

organismId = keccak256(abi.encode(
  string("GRYMO_ORGANISM_RECORD_V2"),
  uint32(genomeVersion),
  string(normalizeSeed(seed)),
  bytes32(genomeHash)
))

lineageId = keccak256(abi.encode(
  string("GRYMO_LINEAGE_RECORD_V2"),
  bytes32(parentA or zero),
  bytes32(parentB or zero),
  bytes32(organismId)
))
```

Including the full-genome commitment avoids collapsing distinct breeding histories with the same display seed. Domain tags separate record types. Seed normalization is unchanged (string conversion and trimming; empty seeds rejected); there is no Unicode normalization. Unpaired UTF-16 surrogates are rejected by the record encoder to avoid UTF-8 replacement collisions. Genome versions are positive uint32. IDs/commitments are nonzero bytes32; zero is reserved only for both absent founder parents. Parent ordering is significant.

Canonical genome JSON uses the existing `stableStringify`: lexicographically sorted object keys, preserved array order, JavaScript JSON number/string representation. It is the Genome v1 codec, **not a claim of general RFC 8785 compliance**. Other-language implementations must match these bytes and the golden fixtures. A contract can consume a reviewed commitment; it would not reconstruct this JSON on-chain.

IDs are content identifiers, deliberately not bound to a chain ID or registry address. Identical data gives the same ID on mainnet/testnet. Any future signature/authorization scheme must separately bind chain ID and verifying contract to prevent replay. No signing implementation is provided.

## Local example

```sh
npm run example:record
```

The example derives two founder records, breeds a child using local ancestry and supplies the ordered parent record IDs. All computation is offline. Missing parents are errors, not substituted fingerprints. Record references are syntax-checked, not cryptographically linked to the provided ancestry by this helper.

## Future registry boundary

Store provenance. Recompute phenotype. A future registry may map organism IDs to genome commitments, parents, generation and mutation flags. Do not store SVG, AI voice or full genome JSON on-chain. This document is a design proposal, not compilable Solidity. No `contracts/` directory or contract test suite is claimed.

Before deployment: specify authorization and ancestry validation, make existing records immutable, verify generations, define events, implement and test a real Solidity contract, audit it, then publish actual addresses. Token trading, fees, dividends and account custody are outside this repository's scope. Explorer address links must only be created once a real deployment exists.

## Migration compatibility

The earlier pre-1.0 SHA-256 JSON preview was not an EVM ABI codec. Version 2 supersedes it and intentionally changes **chain record IDs only**. The old `ProposedOrganismRecord` type and `record-model.ts` API are replaced. `deriveRecordIds` is now synchronous and needs explicit parent record IDs for children. Never silently convert an old ID: replay the genome, then rebuild its parents and record under the new codec.

Genome Spec v1, fingerprint functions, inheritance, mutation, local lineage and renderer revision 2 are unchanged. The browser remains pinned to its prior build until a separate integration is tested; see [browser integration](browser-lab.md). Market feeds are [simulated/planned](market-environment.md), not a dependency of the genome engine.
