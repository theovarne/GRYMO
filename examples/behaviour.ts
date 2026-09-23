import { generateGenome, personality } from "../dist/index.js";

const genome = generateGenome("741190");
console.log(JSON.stringify({ behaviour: genome.behaviour, localPersonality: personality(genome.behaviour), note: "No AI/model call or trading." }, null, 2));
