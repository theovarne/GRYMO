# Changelog

## Unreleased — EVM ABI record codec v2 (2026-09-24)

### Changed

- Superseded the earlier SHA-256 preview with domain-separated Keccak-256 / standard ABI record IDs and cryptographic genome commitments. Parent references are explicit record IDs.
- Added Robinhood Chain mainnet/testnet metadata, local registry model, offline record example, independent SDK checks, static lint and expanded CI.
- Updated registry, market-environment, security and browser-version boundary documentation. No contract or website deployment is included.

### Unchanged

- Genome Spec v1 and all core source algorithms.
- Four pinned founder genome/phenotype/fingerprint/SVG vectors, existing child vectors, breeding, mutation, kinship, local lineage and renderer revision 2.


## Earlier migration — SHA-256 preview (superseded by codec v2)

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
- Documented the unpublished package, unintegrated website, non-cryptographic fingerprints and absent registry contract.

This entry is not a claim that a GitHub release or npm package has been published.
