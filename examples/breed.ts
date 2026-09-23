import { breed, generateGenome, genomeFingerprint, indexLineage, recordGenome } from "../dist/index.js";

const mother = generateGenome("118050");
const father = generateGenome("339201");
const lineage = indexLineage([recordGenome(mother), recordGenome(father)]);
const child = breed(mother, father, "741190", { lineage });
console.log(JSON.stringify({ child, fingerprint: genomeFingerprint(child), replayEqual: genomeFingerprint(child) === genomeFingerprint(breed(mother, father, "741190", { lineage })) }, null, 2));
