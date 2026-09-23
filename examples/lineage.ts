import { breed, generateGenome, indexLineage, recordGenome, serializeLineage, traceLineage } from "../dist/index.js";

const mother = generateGenome("118050");
const father = generateGenome("339201");
const founders = indexLineage([recordGenome(mother), recordGenome(father)]);
const child = breed(mother, father, "741190", { lineage: founders });
const records = indexLineage([...founders.values(), recordGenome(child)]);
console.log(serializeLineage(records));
console.log(JSON.stringify(traceLineage(recordGenome(child).id, records), null, 2));
