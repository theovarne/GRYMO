# Lineage

`recordGenome()` creates an ID, seed, parent IDs and generation from a full genome. `indexLineage()` requires all referenced parent records and rejects duplicate IDs. `traceLineage()` traverses ancestry and rejects cycles. `serializeLineage()` produces sorted-key, sorted-ID JSON that can be saved locally and round-tripped with `parseLineage()`.

`estimateKinship()` is a bounded **nearest-common-ancestor approximation** over at most eight generations by default. It sums `2^−(motherDepth + fatherDepth + 1)` for the nearest shared ancestor set, capped at 0.5. Full siblings sharing two founders yield 0.25. This is not a complete population-genetics coefficient for complex multiply-connected pedigrees; a rigorous coefficient and ancestry-depth policy are future work.

There is no shared server registry, proof of ownership, on-chain write, or public ancestry database in this release. The website's lineage trace is still a static local UI preview.
