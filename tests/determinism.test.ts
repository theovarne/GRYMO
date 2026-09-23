import test from "node:test";
import assert from "node:assert/strict";
import { breed, generateGenome, genomeFingerprint, hash32, indexLineage, recordGenome, renderSvg, siteSeedFingerprint } from "../dist/index.js";

test("website hash and seed fingerprint stay pinned", () => {
  assert.equal(hash32("741190:palette"), hash32("741190:palette"));
  assert.equal(siteSeedFingerprint("741190"), "fp: d240:dc25:3e89:0aaa");
});

test("founder has a golden content fingerprint and SVG", () => {
  const first = generateGenome("741190");
  const second = generateGenome("741190");
  assert.deepEqual(first, second);
  assert.equal(genomeFingerprint(first), "9975fe8bf6b86d6cdf94c733f0d63952");
  assert.equal(renderSvg(first), renderSvg(second));
});

test("same parents and event seed yield byte-identical child", () => {
  const mother = generateGenome("118050");
  const father = generateGenome("339201");
  const lineage = indexLineage([recordGenome(mother), recordGenome(father)]);
  const first = breed(mother, father, "741190", { lineage });
  const second = breed(mother, father, "741190", { lineage });
  assert.equal(JSON.stringify(first), JSON.stringify(second));
  assert.equal(first.seed, "1832587265");
  assert.equal(genomeFingerprint(first), "4292b6b61c10c7c1e625f61de0338c66");
});
