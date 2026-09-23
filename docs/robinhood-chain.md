# GRYMO × Robinhood Chain

GRYMO derives organisms deterministically from seeds and breeding history. Robinhood Chain provides an EVM-compatible public environment for financial applications and real-world assets. GRYMO is an independent project, not an official project or partner of Robinhood Chain.

Genes remain deterministic. Markets do not. The model interprets the genome; the market tests the instinct. AI voice remains a character layer, not an autonomous trader.

## Current boundary

| Component | Status |
| --- | --- |
| Registry contract | **NOT DEPLOYED** |
| Token contract | **NOT PUBLISHED** |
| Public registry | **PENDING** |
| Market / Stock Tokens integration | **SIMULATED / NOT CONNECTED** |
| Network telemetry | Optional **READ-ONLY**, not market data |
| Trading / account connection / execution | **DISABLED** |
| Local deterministic record ID | **IMPLEMENTED**, preview only |

GRYMO does not require the chain to render organisms. A future registry would preserve seed, genome version, parents, generation, a cryptographic genome commitment and mutation flags. Reconstruct face, behaviour and local voice preview offchain. Bred organisms require the parent genomes and versioned breeding recipe, not just a numeric display seed.

## Network configuration

Robinhood Chain mainnet: chain ID **4663**, gas **ETH**, VM **EVM**. Explorer: [Robinhood Chain Blockscout](https://robinhoodchain.blockscout.com). Reference: [official connection documentation](https://docs.robinhood.com/chain/connecting/). Testnet is a separate network (46630); never publish its addresses as mainnet contracts.

The website starts with empty contract / transaction configuration. Only an independently verified 20-byte `0x` contract address or 32-byte transaction hash should be configured. Configuring an address is not an onchain verification or an ownership attestation. Old network token addresses are not reused.

## Implemented local record preview

`deriveRecordIds(genome)` is asynchronous only because it uses Web Crypto SHA-256; it makes no requests and changes no genome. It returns 32-byte hex IDs, **not contract addresses**.

The exact preview codec is `grymo-record-v1-sha256`:

```text
H(value) = 0x + lowercase hex SHA-256(UTF-8(stableStringify(value)))
genomeHash = H(full canonical genome)
organismId = H(["grymo:organism:v1", genome.v, genome.seed,
                genomeFingerprint(genome), genomeHash])
lineageId  = H(["grymo:lineage:v1", genome.parents, organismId])
```

`stableStringify` sorts object keys recursively and retains array order; founders use null parents, children use ordered parent fingerprints. The full genome hash prevents reliance on the existing non-cryptographic display fingerprint alone. Record IDs provide content integrity, not authenticity, ownership, authorization or evidence of publication. Tests compare the Web Crypto output with an independent Node SHA-256 calculation. A contract implementation and interoperable binary codec are **not implemented**.

## Proposed Solidity architecture — not deployed

```solidity
struct OrganismRecord {
    bytes32 genomeHash;
    bytes32 parentA;
    bytes32 parentB;
    uint32 generation;
}
// Proposed registry index, not executable/deployed code:
mapping(bytes32 => OrganismRecord) records;
```

Before implementation, define canonical encoding, secure parent commitments, seed/version/mutation storage, authorization, duplicate handling, ancestry availability, costs and cross-language vectors. Existing 128-bit display fingerprints must not become security-critical parent commitments. No wallet, signing, deployment, transaction builder or financial permission is included here.

Future read-only Stock Tokens assets/prices/corporate-actions data could inform environment controls, with explicit source and freshness labels. No such feed or trading MCP is connected now. Network block/gas telemetry must never be presented as asset volatility, liquidity or returns.
