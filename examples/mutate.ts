import { generateGenome, mutateTraits, mutationProbability } from "../dist/index.js";

const founder = generateGenome("741190");
const result = mutateTraits(founder.phenotype, founder.behaviour, "example-event", 0.25);
console.log(JSON.stringify({ probabilityPerLocus: mutationProbability(0.25), events: result.events, phenotype: result.phenotype, behaviour: result.behaviour }, null, 2));
