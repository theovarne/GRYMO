# Changelog

## Unreleased — Solana-native public lineage model (2026-09-26)

Changed: replaced the previous chain-only preview with a proposed Solana organism-PDA model, canonical SHA-256 commitment and Solana Kit canonical-bump derivation. Missing Program IDs produce no PDA. Added network metadata, local account representation, example and SDK fixtures. Removed obsolete chain modules and their tests; updated documentation and status boundaries.

Unchanged: Genome Spec v1, four founder golden vectors, child/breeding vectors, inheritance, mutation, kinship, local ancestry, display fingerprints and renderer revision 2. No program, public registry, mint, wallet or transaction was deployed. Core remains entirely offline.

## Earlier unreleased work

- Separated the website's founder/hash logic into a local technical core; added real breeding, kinship, mutation and ancestry.
- Renderer revision 2 made every visual locus affect SVG geometry while retaining Genome v1.
- Added independent replay, browser integration, golden fixtures, static boundary lint and CI examples.
- Replaced the README mascot with the maintainer's supplied transparent seated Goblin at 150px. That asset remains unchanged.

Earlier chain-proposal details remain available in Git history; they are not the current architecture. No npm publication or tagged release is implied by these entries.
