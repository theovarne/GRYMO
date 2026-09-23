import test from "node:test";
import assert from "node:assert/strict";
import { generateGenome, mutateTraits, mutationProbability, rarity } from "../dist/index.js";

test("kinship increases per-locus mutation odds", () => {
  assert.equal(mutationProbability(0), 0.04);
  assert.equal(mutationProbability(0.25), 0.295);
  assert.equal(mutationProbability(0.5), 0.55);
  assert.throws(() => mutationProbability(0.51), RangeError);
});

test("mutation is deterministic and does not alter its input", () => {
  const founder = generateGenome("741190");
  const original = JSON.stringify(founder);
  const a = mutateTraits(founder.phenotype, founder.behaviour, "event", 0.5);
  const b = mutateTraits(founder.phenotype, founder.behaviour, "event", 0.5);
  assert.deepEqual(a, b);
  assert.equal(JSON.stringify(founder), original);
  assert.ok(a.events.length > 0);
});

test("rarity is a local visual score, not a market signal", () => {
  const score = rarity(generateGenome("741190"));
  assert.ok(score.score >= 0 && score.score <= 100);
  assert.ok(["common", "weird", "cursed", "abomination"].includes(score.tier));
});
