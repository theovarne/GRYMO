import test from "node:test";
import assert from "node:assert/strict";
import { breed, estimateKinship, generateGenome, indexLineage, parseLineage, recordGenome, serializeLineage, traceLineage } from "../dist/index.js";

test("shared founders produce measurable sibling kinship", () => {
  const mother = generateGenome("118050");
  const father = generateGenome("339201");
  const founders = indexLineage([recordGenome(mother), recordGenome(father)]);
  const a = breed(mother, father, "first", { lineage: founders });
  const b = breed(mother, father, "second", { lineage: founders });
  const index = indexLineage([...founders.values(), recordGenome(a), recordGenome(b)]);
  assert.equal(estimateKinship(recordGenome(a).id, recordGenome(b).id, index), 0.25);
  assert.equal(breed(a, b, "third", { lineage: index }).kinship, 0.25);
});

test("lineage serialization and traversal round-trip", () => {
  const mother = generateGenome("118050");
  const father = generateGenome("339201");
  const founders = indexLineage([recordGenome(mother), recordGenome(father)]);
  const child = breed(mother, father, "741190", { lineage: founders });
  const records = indexLineage([...founders.values(), recordGenome(child)]);
  const parsed = parseLineage(serializeLineage(records));
  assert.deepEqual(traceLineage(recordGenome(child).id, parsed).parents.map(node => node.record.id), [recordGenome(mother).id, recordGenome(father).id]);
  assert.throws(() => indexLineage([recordGenome(child)]), /missing parent/);
});
