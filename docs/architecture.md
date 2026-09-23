# Architecture

```text
website UI / persistence (separate, pinned consumer)
                     ↓
deterministic → genome → renderer
                  ├────→ behaviour / local labels
                  ↓
            breeding + mutation
                  ↓
             local lineage
                  ↓
          optional chain record utilities
          (local Keccak-256 + ABI encoding)
                  ↓
          EVM registry (proposed, not deployed)
```

Inputs are explicit. Core modules are free of DOM, React, CSS, network, time and process state, and never import the chain layer or an external SDK. The static boundary check guards those imports and common nondeterministic calls. Chain utilities consume core data, use viem for standard synchronous local ABI/Keccak operations and perform no I/O. Ethers is test-only for independent cross-checks.

Examples/tests consume compiled modules from `dist/`. The browser consumes a pinned build; updating GitHub does not update the website. Market simulations and Goblin Speak typography remain UI concerns. A model voice adapter and read-only market adapter remain planned, not functional exports.

The original site preview supplied the trait/hash compatibility baseline. Real inheritance, mutation and ancestry were implemented in this repository. This migration changes only the optional [record layer](robinhood-chain.md), not those algorithms. Full-genome fingerprints remain non-cryptographic; chain commitments are separate. See [integration](browser-lab.md) and [market environment](market-environment.md).
