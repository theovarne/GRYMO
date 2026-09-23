import test from "node:test";
import assert from "node:assert/strict";
import { generateGenome, breed, deriveRecordIds, buildOrganismRecord } from "../dist/index.js";

test("EVM record codec v2 founder fixture stays pinned", () => {
  assert.deepEqual(deriveRecordIds(generateGenome("741190")), {
    codec: "grymo-evm-record-v2-keccak256-abi",
    genomeHash: "0x72579e916b47b57b893b54bb51471e100267da70f863de65d7ecff912bb13db8",
    organismId: "0x405cc13ae2e6a33f04500fcf91e6fcc89fe9b959ab88239f63a224a5d44d3910",
    lineageId: "0x944ecabf70c8a6686e9009e3b3e533ed4c9af4579b69388a12a62292812fde24"
  });
});

test("EVM record codec v2 child and ordered parent fixture stays pinned", () => {
  const mother = generateGenome("118050"), father = generateGenome("339201");
  // Explicitly pins the default conservative-kinship path (no ancestry index supplied).
  const child = breed(mother, father, "741190");
  assert.deepEqual(deriveRecordIds(child, {
    parentA: buildOrganismRecord(mother).organismId,
    parentB: buildOrganismRecord(father).organismId
  }), {
    codec: "grymo-evm-record-v2-keccak256-abi",
    genomeHash: "0x2dfaeaabb75a5ac02f3dd3f0a9bc07693ed7bb43f0b93c15b18da233f0fd0c54",
    organismId: "0x353d330d5b63291d86b09e3884114fb5b99a220feecc24d05847e332b7512910",
    lineageId: "0x08f4cc7e2c9a2ac74f5ed9e745f38510aa63a74a28c173760a534090b01db6f5"
  });
});
