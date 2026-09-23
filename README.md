<p align="center">
  <img src="assets/grymo-mark.png" alt="GRYMO goblin mark" width="128">
</p>

# GRYMO

deterministic organisms with bad genetics.

GRYMO is an experimental generative system where every goblin begins with a seed.

```text
seed → genome → phenotype → behaviour → breeding → mutation → lineage
```

The technical core for [grymo.lol](https://www.grymo.lol/), not a website source dump. Generation, inheritance, kinship, mutations and ancestry are reproducible local functions. Public record publication remains proposed.

## Run it

Requires Node.js 22.18+ (CI uses Node 24). This package is not published to npm. From a checkout:

```sh
npm ci
npm run typecheck
npm run lint
npm test
npm run build
npm run example
npm run example:breed
npm run example:lineage
npm run example:record
```

`npm install` is also supported. It downloads dependencies from the package registry; it does not contact Robinhood Chain, create a wallet, sign a transaction, send funds, or call an AI model. Core GRYMO execution remains local and deterministic. Lint combines strict TypeScript static checks with offline import/call boundary and documentation-link checks; it is not an ESLint configuration.

```ts
import {
  generateGenome, breed, recordGenome, indexLineage,
  genomeFingerprint, renderSvg
} from "./dist/index.js";

const mother = generateGenome("118050");
const father = generateGenome("339201");
const lineage = indexLineage([recordGenome(mother), recordGenome(father)]);
const child = breed(mother, father, "741190", { lineage });

console.log(genomeFingerprint(child));
console.log(renderSvg(child));
```

Run the example commands above, or use this import from the repository root after building. Mutation and behaviour examples remain available as `example:mutation` and `example:behaviour`. The intended package imports are `@theovarne/grymo` and `@theovarne/grymo/chain`; they do not imply an npm release exists.

## The deterministic contract

- `generateGenome(seed)` reconstructs a founder from its normalized seed.
- `breed(mother, father, eventSeed, { lineage })` needs both full parent genomes, the same event seed and ancestry input. A child's display seed alone is insufficient.
- No wall clock, global random source, model call, wallet, RPC or network data affects core outputs.
- Genome Spec v1 retains its original 32-bit UTF-16 trait hashing. `siteSeedFingerprint` preserves the site's display format; `genomeFingerprint` covers the canonical full genome but is **non-cryptographic**. Neither is a security commitment.
- Separate chain functions use EVM Keccak-256 and standard ABI encoding. A proposed record ID is not an address, signature, ownership proof or published record.
- Golden fixtures pin full genomes, phenotypes, fingerprints and SVG bytes for seeds 1, 42, 741190 and 999999. Existing child/breeding and renderer regression tests are preserved.

## Modules

| Layer | What works now |
| --- | --- |
| Genome | Seed normalization, versioned genotype and phenotype |
| Breeding | Deterministic inheritance, blending, jitter and clamping |
| Mutation | Kinship-weighted visual and behavioural mutation |
| Behaviour | Deterministic behaviour vector and local labels; no model adapter |
| Lineage | Local ancestry records, traversal and serialization |
| Renderer | Deterministic SVG specimen; hero artwork is separate |
| Robinhood Chain | Local EVM-compatible record calculations; design-only registry proposal. No deployed contract, token contract, registry write or transaction |

## Architecture

```text
                  SEED
                    ↓
                 GENOME
          ┌─────────┼─────────┐
          ↓         ↓         ↓
         FACE     VOICE     INSTINCT
       (SVG)    (planned)   (vector)
          └─────────┼─────────┘
                    ↓
                 ORGANISM
                    ↓
                 BREEDING
                    ↓
                 LINEAGE
                    ↓
           ROBINHOOD CHAIN REGISTRY
                  (planned)
```

Voice here means a future model interpreting genome constraints, not an implemented AI service. Core modules never import the chain layer; the optional chain layer consumes core data.

## why Robinhood Chain

GRYMO is deterministic. Markets are not. The genome defines the organism. Robinhood Chain provides a public financial environment around which a future adapter can be built; this repository does not currently connect a market feed.

A future registry does not need to store the face. It only needs enough provenance to reconstruct and verify the lineage: **store provenance. recompute phenotype.**

genes are deterministic. markets are not.

GRYMO is an independent experimental project built around Robinhood Chain. No affiliation or endorsement by Robinhood is claimed.

## Status

| Component | Status |
| --- | --- |
| Genome Engine | Functional |
| Breeding Engine | Functional |
| Mutation Engine | Functional |
| Behaviour Genome | Functional |
| Renderer | Functional — revision 2 |
| Local Lineage | Functional |
| Local EVM Record ID utilities | Implemented and tested; proposed codec, not published records |
| Robinhood Chain Adapter | Proposed |
| Registry Contract | Not implemented / NOT DEPLOYED |
| Token Contract | NOT PUBLISHED |
| Market Data Integration | Simulated in the website / planned adapter |

Network metadata: Robinhood Chain mainnet **4663**, testnet **46630**, **ETH** native gas, **EVM**. See [the network definitions and exact record codec](docs/robinhood-chain.md). No contract address is configured.

Read the [architecture](docs/architecture.md), [genome spec](docs/genome-spec.md), [breeding rules](docs/breeding.md), [mutation model](docs/mutations.md), [behaviour](docs/behaviour.md), [lineage model](docs/lineage.md), [renderer notes](docs/renderer.md), [Robinhood Chain proposal](docs/robinhood-chain.md), [market environment](docs/market-environment.md), and [implementation status](docs/status.md).

## Scope and provenance

No wallet is required. No network connection is required for genome generation after installing dependencies. No transaction is signed. No registry contract is currently deployed. No trading, funds management or account integration is included.

The initial core was ported from the vanilla-JavaScript website preview after auditing `gobboo-clone/app.js`. Breeding, mutation and ancestry were then implemented as real local functions. UI, CSS, Goblin Speak typography, hero art and token controls remain separate. The website is version-pinned: this repository's new record codec is **not automatically deployed to the website**. See [browser integration](docs/browser-lab.md).

This is pre-1.0 experimental code. Genome changes require explicit versioning; this chain-only revision does not change Genome Spec v1 or renderer revision 2. Reuse terms await the maintainer's license decision; see [LICENSE](LICENSE). Contributions follow [CONTRIBUTING.md](CONTRIBUTING.md).
