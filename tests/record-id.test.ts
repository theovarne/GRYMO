import test from "node:test";
import assert from "node:assert/strict";
import { AbiCoder, keccak256 as ethersKeccak, toUtf8Bytes } from "ethers";
import { keccak256 } from "viem/utils";
import { breed, generateGenome, genomeFingerprint, renderSvg } from "../dist/index.js";
import { stableStringify } from "../dist/deterministic/normalize.js";
import { ROBINHOOD_CHAIN, ROBINHOOD_CHAIN_TESTNET, deriveGenomeHash, deriveRecordIds, deriveOrganismId, deriveLineageId, encodeOrganismIdInput, buildOrganismRecord, ZERO_RECORD_ID } from "../dist/chain/index.js";
const abi = AbiCoder.defaultAbiCoder();
const g = generateGenome("741190");
const input = () => ({ genomeVersion: g.v, seed: g.seed, genomeHash: deriveGenomeHash(g) });

test("Keccak primitive matches the Ethereum empty-input vector (not SHA3-256)", () => {
  assert.equal(keccak256("0x"), "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470");
  assert.equal(keccak256("0x"), ethersKeccak(toUtf8Bytes("")));
});
test("organism ABI bytes and Keccak match an independent SDK", () => {
  const genomeHash = ethersKeccak(abi.encode(["string", "string"], ["GRYMO_GENOME_COMMITMENT_V1", stableStringify(g)]));
  assert.equal(deriveGenomeHash(g), genomeHash);
  const encoded = abi.encode(["string", "uint32", "string", "bytes32"], ["GRYMO_ORGANISM_RECORD_V2", g.v, g.seed, genomeHash]);
  assert.equal(encodeOrganismIdInput(input()), encoded);
  assert.equal(deriveOrganismId(input()), ethersKeccak(encoded));
});
test("same input replays; distinct seeds, versions and full-genome commitments separate IDs", () => {
  const a = input(); assert.equal(deriveOrganismId(a), deriveOrganismId({ ...a }));
  assert.equal(deriveOrganismId({ ...a, seed: " 741190 " }), deriveOrganismId(a));
  assert.notEqual(deriveOrganismId({ ...a, seed: "42" }), deriveOrganismId(a));
  assert.notEqual(deriveOrganismId({ ...a, genomeVersion: 2 }), deriveOrganismId(a));
  const changed = structuredClone(g); changed.phenotype.skull += .01;
  assert.notEqual(deriveRecordIds(changed).organismId, deriveRecordIds(g).organismId);
});
test("canonical key order is stable; array order and well-formed Unicode remain significant", () => {
  const reordered = Object.fromEntries(Object.entries(g).reverse()) as typeof g;
  assert.equal(deriveGenomeHash(g), deriveGenomeHash(reordered));
  assert.equal(deriveOrganismId({ ...input(), seed: "哥布林 🧬" }), deriveOrganismId({ ...input(), seed: "哥布林 🧬" }));
  assert.notEqual(deriveOrganismId({ ...input(), seed: "é" }), deriveOrganismId({ ...input(), seed: "e\u0301" }));
  assert.throws(() => deriveOrganismId({ ...input(), seed: "\ud800" }));
  assert.throws(() => deriveOrganismId({ ...input(), seed: "\udc00" }));
});
test("lineage uses ordered bytes32 parent RECORD IDs; founders have zero sentinels", () => {
  const a = buildOrganismRecord(generateGenome("118050")).organismId;
  const b = buildOrganismRecord(generateGenome("339201")).organismId;
  const id = deriveRecordIds(g).organismId;
  assert.equal(deriveLineageId(a, b, id), ethersKeccak(abi.encode(["string", "bytes32", "bytes32", "bytes32"], ["GRYMO_LINEAGE_RECORD_V2", a, b, id])));
  assert.notEqual(deriveLineageId(a, b, id), deriveLineageId(b, a, id));
  assert.equal(deriveLineageId(undefined, undefined, id), ethersKeccak(abi.encode(["string", "bytes32", "bytes32", "bytes32"], ["GRYMO_LINEAGE_RECORD_V2", ZERO_RECORD_ID, ZERO_RECORD_ID, id])));
  assert.throws(() => deriveLineageId(a, undefined, id));
  assert.throws(() => deriveLineageId(genomeFingerprint(g), genomeFingerprint(g), id));
});
test("malformed, zero and address-shaped identifiers and out-of-range versions are rejected", () => {
  for (const genomeHash of ["", "0x1234", "0x" + "ab".repeat(20), ZERO_RECORD_ID, "0x" + "gg".repeat(32)]) assert.throws(() => deriveOrganismId({ ...input(), genomeHash }));
  for (const genomeVersion of [0, -1, 1.1, NaN, 2 ** 32]) assert.throws(() => deriveOrganismId({ ...input(), genomeVersion }));
  assert.throws(() => deriveOrganismId({ ...input(), seed: " " }));
});
test("local proposed records preserve genome data and require explicit child parent references", () => {
  const mother = generateGenome("118050"), father = generateGenome("339201"), child = breed(mother, father, "741190");
  const before = JSON.stringify(child);
  assert.throws(() => buildOrganismRecord(child));
  const parents = { parentA: buildOrganismRecord(mother).organismId, parentB: buildOrganismRecord(father).organismId };
  const a = buildOrganismRecord(child, parents), b = buildOrganismRecord(child, parents);
  assert.deepEqual(a, b);assert.equal(a.generation, child.generation);
  assert.deepEqual(a.mutationFlags, child.mutations);a.mutationFlags.push("test-only");assert.equal(JSON.stringify(child), before);
  assert.throws(() => buildOrganismRecord(g, parents));
  assert.throws(() => buildOrganismRecord({ ...child, generation: -1 }, parents));
  assert.throws(() => buildOrganismRecord({ ...child, generation: 2 ** 32 }, parents));
});
test("metadata distinguishes mainnet and testnet; both use ETH on EVM", () => {
  assert.equal(ROBINHOOD_CHAIN.id, 4663);assert.equal(ROBINHOOD_CHAIN_TESTNET.id, 46630);
  assert.equal(ROBINHOOD_CHAIN.nativeCurrency.symbol, "ETH");assert.equal(ROBINHOOD_CHAIN_TESTNET.nativeCurrency.decimals, 18);
  assert.equal(ROBINHOOD_CHAIN.rpcUrl, "https://rpc.mainnet.chain.robinhood.com/");
  assert.equal(ROBINHOOD_CHAIN.explorer, "https://robinhoodchain.blockscout.com/");
});
test("genome, renderer and local record derivation work without fetch", () => {
  const original = globalThis.fetch;globalThis.fetch = (() => { throw Error("network forbidden"); }) as typeof fetch;
  try {const organism = generateGenome("741190");assert.equal(genomeFingerprint(organism), "9975fe8bf6b86d6cdf94c733f0d63952");assert.ok(renderSvg(organism).startsWith("<svg"));assert.match(deriveRecordIds(organism).organismId, /^0x[0-9a-f]{64}$/);}
  finally {globalThis.fetch = original;}
});
