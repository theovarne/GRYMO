# Browser lab integration

The website adapter consumes this public core: generation, breeding, kinship, mutation, lineage IDs and SVG rendering. It is not a separate genome implementation.

## Renderer revision 2

Genome schema v1 and its golden fingerprints are unchanged. SVG output now responds to every visual locus, including ear size/droop, eye size/spread, brow, snout, exact wart and fang counts. Render hashes therefore differ from renderer revision 1. Pin both genome and renderer versions for visual reconstruction.

## Provenance

A founder is reproducible from its normalized seed. A bred organism requires ordered parent genomes, their ancestry and the event seed. A child numeric seed alone is insufficient. The browser stores compact, topologically ordered recipes and verifies imports by replaying them. Fingerprints are non-cryptographic integrity checks, not authenticity, ownership or security proofs.

## Boundaries

Local browser colonies are not global populations. The browser voice is a deterministic template, not an LLM call. Environment-fit scores are illustrative simulations, never returns. Optional Robinhood Chain block/gas telemetry is read-only and separate from simulated markets; no registry contract, token deployment, wallet connection or transaction execution is provided by this core. The deployed browser at core commit `9c8d1f5` still uses its previous SHA-256 preview codec; those IDs are not published chain records. Model adapters and on-chain lineage remain planned.

## Repository codec v2 is not a website deployment

This repository now supplies standard Keccak-256 / ABI EVM record IDs. The website remains pinned to its earlier build: its preview IDs and the new record IDs must not be compared or silently substituted. A separate website integration must vendor the new chain utilities/dependencies, reconstruct ordered parent record references and test stored-recipe compatibility before switching codecs. No website deployment is included in this repository migration. Genome Spec v1 and renderer revision 2 remain identical.
