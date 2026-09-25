import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { address, getProgramDerivedAddress } from "@solana/kit";
import { generateGenome, genomeFingerprint, renderSvg, stableStringify } from "../dist/index.js";
import { genomeCommitment, bytesToHex, previewOrganismPda, deriveOrganismPda, isSolanaAddress, solanaLineageRecord } from "../dist/chain/solana/index.js";

// Official SDK documentation fixture only, never a configured GRYMO deployment.
const fixtureProgram = "11111111111111111111111111111111";
test("canonical PDA SDK matches the official helloWorld fixture", async () => {
  const [pda,bump]=await getProgramDerivedAddress({programAddress:address(fixtureProgram),seeds:["helloWorld"]});
  assert.equal(pda,"46GZzzetjCURsdFPb7rcnspbEMnCBXe9kpjrsZAkKb6X");assert.equal(bump,254);
});
test("missing Program ID never fabricates a PDA, bump or published account",async()=>{
  const p=await previewOrganismPda(generateGenome("741190"));
  assert.equal(p.pda,null);assert.equal(p.bump,null);assert.equal(p.programId,null);
  assert.equal(p.status,"CANNOT FINALIZE WITHOUT PROGRAM ID");assert.deepEqual(p.seedBytes,[8,32]);
});
test("full canonical commitment is independent of display fingerprint",async()=>{
  const g=generateGenome("741190"),before=genomeFingerprint(g);
  assert.equal(bytesToHex(await genomeCommitment(g)),createHash("sha256").update(stableStringify(g)).digest("hex"));
  assert.equal(before,"9975fe8bf6b86d6cdf94c733f0d63952");assert.equal(genomeFingerprint(g),before);
  assert.equal(bytesToHex(await genomeCommitment(g)),bytesToHex(await genomeCommitment(Object.fromEntries(Object.entries(g).reverse()) as typeof g)));
});
test("organism PDA replays; seed/full-genome/program changes distinguish records",async()=>{
  const g=generateGenome("741190"),p=await deriveOrganismPda(g,fixtureProgram);
  assert.deepEqual(await deriveOrganismPda(g,fixtureProgram),p);assert.ok(isSolanaAddress(p.pda));
  assert.notEqual((await deriveOrganismPda(generateGenome("42"),fixtureProgram)).pda,p.pda);
  const changed=structuredClone(g);changed.phenotype.skull+=.01;
  assert.notEqual((await deriveOrganismPda(changed,fixtureProgram)).pda,p.pda);
  assert.notEqual((await deriveOrganismPda(g,"B9Lf9z5BfNPT4d5KMeaBFx8x1G4CULZYR1jA2kmxRDka")).pda,p.pda);
  assert.equal((await previewOrganismPda(g,fixtureProgram)).status,"DERIVED / NOT ANCHORED");
});
test("invalid addresses rejected; long and Unicode genome seeds still use a fixed 32-byte digest",async()=>{
  for(const id of ["","bad","O".repeat(44),"1".repeat(31)])await assert.rejects(()=>deriveOrganismPda(generateGenome("1"),id));
  const p=await deriveOrganismPda(generateGenome("哥布林".repeat(60)),fixtureProgram);assert.ok(isSolanaAddress(p.pda));
});
test("record utility is local, copied and never implies publication",async()=>{
  const original=globalThis.fetch;globalThis.fetch=async()=>{throw Error("offline");};
  try{const g=generateGenome("42"),before=JSON.stringify(g),svg=renderSvg(g),r=await solanaLineageRecord(g);
    assert.equal(r.status,"LOCAL ONLY / NOT ANCHORED");assert.equal(JSON.stringify(g),before);assert.equal(renderSvg(g),svg);
    assert.equal(r.mutationFlags.length,0);await previewOrganismPda(g);
  }finally{globalThis.fetch=original;}
});
