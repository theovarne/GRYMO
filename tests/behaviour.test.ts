import test from "node:test";
import assert from "node:assert/strict";
import { deriveBehaviour, generateGenome, personality } from "../dist/index.js";

test("behaviour is derived from the same seed", () => {
  const b = deriveBehaviour("741190");
  assert.deepEqual(b, generateGenome("741190").behaviour);
  assert.equal(b.fear, 0.97);
  assert.equal(b.conviction, 0.95);
});

test("local personality labels are deterministic, without AI calls", () => {
  assert.deepEqual(personality(deriveBehaviour("741190")), { mood: "alert and hiding", stance: "speaks first" });
});
