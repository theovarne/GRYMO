import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { generateGenome, breed, genomeFingerprint, deriveRecordIds, ROBINHOOD_CHAIN } from "../dist/index.js";
import { stableStringify } from "../dist/deterministic/normalize.js";

test("local record ids replay and match independent SHA-256 implementation", async () => {
  const g = generateGenome("741190");
  const hash = (x: unknown) => "0x" + createHash("sha256").update(stableStringify(x), "utf8").digest("hex");
  const a = await deriveRecordIds(g), b = await deriveRecordIds(structuredClone(g));
  assert.deepEqual(a, b);
  assert.equal(a.genomeHash, hash(g));
  assert.equal(a.organismId, hash(["grymo:organism:v1", g.v, g.seed, genomeFingerprint(g), a.genomeHash]));
  assert.equal(a.lineageId, hash(["grymo:lineage:v1", g.parents, a.organismId]));
  assert.match(a.organismId, /^0x[0-9a-f]{64}$/);
  assert.notEqual(a.organismId, (await deriveRecordIds(generateGenome("741191"))).organismId);
  assert.equal(ROBINHOOD_CHAIN.chainId, 4663);
});
test("child record commits to full genome and ordered ancestry without changing the organism", async () => {
  const g = breed(generateGenome("118050"), generateGenome("339201"), "741190");
  const before = JSON.stringify(g), a = await deriveRecordIds(g);
  assert.equal(JSON.stringify(g), before);
  const changed = structuredClone(g); changed.parents = [g.parents![1], g.parents![0]];
  assert.notEqual((await deriveRecordIds(changed)).lineageId, a.lineageId);
  changed.phenotype.skull += .01;
  assert.notEqual((await deriveRecordIds(changed)).genomeHash, a.genomeHash);
});
