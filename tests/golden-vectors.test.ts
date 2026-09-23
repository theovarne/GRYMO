import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { generateGenome, genomeFingerprint, renderSvg } from "../dist/index.js";
import { stableStringify } from "../dist/deterministic/normalize.js";
const fixture = JSON.parse(readFileSync(new URL("./fixtures/genome-v1.json", import.meta.url), "utf8"));
const sha = (s: string) => createHash("sha256").update(s, "utf8").digest("hex");
for (const vector of fixture.founders) {
  test(`pre-migration golden genome, phenotype and SVG stay identical: ${vector.seed}`, () => {
    const genome = generateGenome(vector.seed);
    assert.equal(genomeFingerprint(genome), vector.fingerprint);
    assert.equal(sha(stableStringify(genome)), vector.genomeSha256);
    assert.equal(sha(stableStringify(genome.phenotype)), vector.phenotypeSha256);
    assert.equal(sha(renderSvg(genome)), vector.svgSha256);
  });
}
