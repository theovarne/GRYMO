import test from "node:test";
import assert from "node:assert/strict";
import { breed, generateGenome, indexLineage, recordGenome } from "../dist/index.js";

test("breeding records actual parent content IDs and generation", () => {
  const mother = generateGenome("118050");
  const father = generateGenome("339201");
  const child = breed(mother, father, "741190");
  assert.deepEqual(child.parents, [recordGenome(mother).id, recordGenome(father).id]);
  assert.equal(child.generation, 1);
  assert.equal(child.kinship, null);
  assert.equal(child.origin, "bred");
});

test("lineage-proven unrelated founders receive baseline kinship", () => {
  const mother = generateGenome("118050");
  const father = generateGenome("339201");
  const lineage = indexLineage([recordGenome(mother), recordGenome(father)]);
  assert.equal(breed(mother, father, "741190", { lineage }).kinship, 0);
});

test("recombination produces legal visual and behavioural ranges", () => {
  const child = breed(generateGenome("1"), generateGenome("2"), "3");
  assert.ok(child.phenotype.eyes >= 1 && child.phenotype.eyes <= 3);
  assert.ok(child.phenotype.skull >= 0.7 && child.phenotype.skull <= 1.4);
  for (const value of Object.values(child.behaviour)) assert.ok(value >= 0 && value <= 1);
});
