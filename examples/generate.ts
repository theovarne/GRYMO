import { generateGenome, genomeFingerprint, renderSvg, siteSeedFingerprint } from "../dist/index.js";

const genome = generateGenome("741190");
console.log(JSON.stringify({ genome, websiteSeedFingerprint: siteSeedFingerprint(genome.seed), contentFingerprint: genomeFingerprint(genome), svg: renderSvg(genome) }, null, 2));
