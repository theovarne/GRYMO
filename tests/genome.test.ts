import test from "node:test";
import assert from "node:assert/strict";
import { generateGenome, normalizeSeed, siteSeedFingerprint } from "../dist/index.js";

test("website-compatible founder traits", () => {
  const genome = generateGenome("741190");
  assert.equal(genome.v, 1);
  assert.equal(genome.origin, "founder");
  assert.equal(genome.parents, null);
  assert.equal(genome.generation, 0);
  assert.deepEqual(genome.phenotype, { palette: 7, eyes: 2, eye_size: 0.68, eye_spread: 1.33, snout: 0.96, ears: { size: 1.44, droop: 0.51 }, fangs: 2, warts: 0, brow: 13, skull: 0.87 });
  assert.deepEqual(genome.mutations, []);
});

test("invalid seeds are rejected rather than silently replaced", () => {
  assert.equal(normalizeSeed(" 741190 "), "741190");
  assert.throws(() => normalizeSeed(""), RangeError);
  assert.throws(() => normalizeSeed(Number.NaN), RangeError);
  assert.notEqual(siteSeedFingerprint("741190"), siteSeedFingerprint("741191"));
});
