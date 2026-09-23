# Changelog

## Unreleased — Robinhood Chain migration (2026-09-24)

- Replaced the old chain adapter proposal with EVM record types and local SHA-256 Record IDs. Removed the pre-1.0 proposed address API; this is an intentional experimental API change.
- Added independent record-hash tests and explicit contract/token/market status documentation.
- Genome v1, breeding, mutation, kinship, lineage replay and renderer revision 2 are unchanged. No contract or trading integration is deployed.

## Unreleased — browser lab integration

- Renderer revision 2 maps every visual locus to SVG geometry; genome v1 golden vectors are unchanged.
- Added renderer sensitivity regression tests and browser recipe/provenance documentation.
- Browser lab integration is implemented; no npm release, model service or registry contract deployment is implied.

## Initial local core preparation

- Audited the live site's local preview and separated compatible founder generation from UI-only simulations.
- Added v1 deterministic genome generation, breeding, mutation, behaviour, lineage and SVG rendering.
- Added golden-vector tests, examples and design-only initial chain architecture notes.
- Documented the unpublished package, unintegrated website, non-cryptographic fingerprints and absent on-chain program.

This entry is not a claim that a GitHub release or npm package has been published.
