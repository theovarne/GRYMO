import test from "node:test";
import assert from "node:assert/strict";
import { generateGenome, renderSvg } from "../dist/index.js";

test("renderer respects one, two and three eyes", () => {
  const founder = generateGenome("741190");
  for (const count of [1, 2, 3]) {
    const genome = { ...founder, phenotype: { ...founder.phenotype, eyes: count } };
    const svg = renderSvg(genome);
    assert.equal((svg.match(/fill="#f7f8e9" stroke="#10150d" stroke-width="3"/g) ?? []).length, count);
    assert.equal((svg.match(/r="2.5" fill="#10150d"/g) ?? []).length, count);
    assert.ok(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg"'));
  }
});
