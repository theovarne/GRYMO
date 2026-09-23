import { breed, generateGenome, genomeFingerprint, indexLineage, recordGenome } from "../dist/index.js";
import { ROBINHOOD_CHAIN, buildOrganismRecord, deriveRecordIds } from "../dist/chain/index.js";

const mother = generateGenome("118050");
const father = generateGenome("339201");
const child = breed(mother, father, "741190", { lineage: indexLineage([recordGenome(mother), recordGenome(father)]) });
const parents = { parentA: buildOrganismRecord(mother).organismId, parentB: buildOrganismRecord(father).organismId };
console.log(JSON.stringify({
  network: ROBINHOOD_CHAIN,
  status: "LOCAL PREVIEW / REGISTRY NOT DEPLOYED / TOKEN NOT PUBLISHED",
  genomeFingerprint: genomeFingerprint(child),
  record: buildOrganismRecord(child, parents),
  ids: deriveRecordIds(child, parents)
}, null, 2));
