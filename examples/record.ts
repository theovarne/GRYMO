import { generateGenome } from "../dist/index.js";
import { SOLANA_NETWORK, previewOrganismPda, solanaLineageRecord } from "../dist/chain/solana/index.js";
const genome=generateGenome("741190");
console.log(JSON.stringify({network:SOLANA_NETWORK,record:await solanaLineageRecord(genome),preview:await previewOrganismPda(genome)},null,2));
// No Program ID is configured. The example intentionally produces NO PDA.
